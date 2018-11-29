import React, { Component } from "react";
import boll from "./bandyboll.png";
import * as firebase from "firebase";
import "./App.css";
import BandyList from "./BandyList";
import Register from "./Register";
import nextMonday from "./utils";
import { equal } from "assert";

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
      if(snapshot.exists()) {
        this.setState(snapshot.val());
        if(snapshot.val().yes === undefined) {
          fb.update({"no": [ ]});
        }
        if(snapshot.val().no === undefined) {
          fb.update({"no": [ ]});
        }
      }
      else {
        fb.set({
          "yes": [ ],
          "no": [ ]
      });
      }
    });
  }
  handleChange = e => {
    this.setState({ name: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const fb = firebase.database().ref(nextMonday());
    const newData = this.state[e.target.name];
    newData.push(this.state.name);
    const data = { [e.target.name]: newData };
    fb.update(data);
    localStorage.setItem("user", this.state.name);
    this.setState({name: ""});
  };

  remove = (index, name) => {
    const fb = firebase.database().ref(nextMonday());
    var array = this.state[name];
        var index = array.indexOf(index);
        if (index > -1) {
          array.splice(index, 1);
        }
        const data = { [name]: array};
        fb.update(data);
  };

  render() {
    const { yes, no } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={boll} className="App-logo" alt="logo" />
          <Register
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            name={this.state.name}
          />
          {yes && <BandyList participants={yes} className="yes" remove={this.remove} />}
          {no && <BandyList participants={no} className="no" remove={this.remove} />}
        </header>
      </div>
    );
  }
}

export default App;
