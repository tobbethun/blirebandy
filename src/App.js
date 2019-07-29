import React, { Component } from "react";
import boll from "./bandyboll.png";
import * as firebase from "firebase";
import "./App.css";
import BandyList from "./BandyList";
import Register from "./Register";
import nextMonday from "./utils";

class App extends Component {
  state = {};
  componentDidMount() {
    var config = {
      apiKey: "AIzaSyAJaBOBZYaiuvBlBGgqKXhhHqXj6Rq2Jkg",
      authDomain: "blirebandy.firebaseapp.com",
      databaseURL: "https://blirebandy.firebaseio.com",
      projectId: "blirebandy",
      storageBucket: "blirebandy.appspot.com",
      messagingSenderId: "596009125589"
    };
    firebase.initializeApp(config);
    const fb = firebase.database().ref(nextMonday());
    fb.on("value", snapshot => {
      if (snapshot.exists()) {
        this.setState(snapshot.val());
        if (snapshot.val().yes === undefined) {
          fb.update({ yes: [] });
        }
        if (snapshot.val().no === undefined) {
          fb.update({ no: [] });
        }
      } else {
        firebase
          .database()
          .ref(nextMonday())
          .set({
            yes: [""],
            no: [""]
          });
      }
    });
    if(localStorage.getItem("monday") < nextMonday()) {
      localStorage.removeItem("bandyPlayer");
      localStorage.removeItem("monday");
    }
  }
  handleChange = e => {
    this.setState({ name: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    if(!this.state.name) return
    const fb = firebase.database().ref(nextMonday());
    const newData = this.state[e.target.name];
    newData.push(this.state.name);
    const data = { [e.target.name]: newData };
    fb.update(data);
    localStorage.setItem("bandyPlayer", this.state.name);
    localStorage.setItem("monday", nextMonday());
    this.setState({ name: "" });
  };

  remove = (index, name) => {
    const fb = firebase.database().ref(nextMonday());
    var array = this.state[name];
    index = array.indexOf(index);
    if (index > -1) {
      array.splice(index, 1);
    }
    const data = { [name]: array };
    fb.update(data);
    localStorage.removeItem("bandyPlayer"); 
  };

  render() {
    const { yes, no } = this.state;
    console.log(yes);
    const user = localStorage.getItem("bandyPlayer");
    console.log('yes', yes && yes.length);
    const tooMany = yes && yes.length > 10;
    return (    
      <div className="App">
        <header className="App-header">
          <h3>Bandy {nextMonday()} kl 20.00</h3>
          {!user && !tooMany && (
            <Register
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              name={this.state.name}
            /> 
          )}
          {tooMany && (
          <div className="too-many">
            <h4>Tyvärr är vi fulltaliga.</h4>
            <h4>Ta en löprunda istället tjockis!</h4>
          </div> 
          )}
          {yes && (
            <BandyList
              participants={yes}
              className="yes"
              remove={this.remove}
            />
          )}
          {no && (
            <BandyList 
              participants={no} 
              className="no" 
              remove={this.remove} 
            />
          )}
          <img src={boll} className="App-logo App-logo__left" alt="logo" />
          <img src={boll} className="App-logo App-logo__right" alt="logo" />
        </header>
      </div>
    
    );
  }
}

export default App;
