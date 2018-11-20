import React, { Component } from 'react';
import './Register.css';

class Register extends Component {
    state = { name: "" };
    handleChange = (e) => {
        this.setState({name: e.target.value});
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.name + " | " + e.target.name);
    }
    render() {
        return (
            <div>
                <input className="register" placeholder="namn" onChange={this.handleChange} />
                <button onClick={this.handleSubmit} name="yes" className="registerButton">Jag kommer</button>
                <button onClick={this.handleSubmit} name="no" className="registerButton decline">Jag kommer inte</button>                    
            </div>
        );
    }
}

export default Register;