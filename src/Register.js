import React, { Component } from 'react';
import './Register.css';

class Register extends Component {   
    render() {
        return (
            <div className="registerContainer">
                <input className="register" placeholder="namn" onChange={this.props.handleChange} value={this.props.name ? this.props.name : ""} required />
                <button onClick={this.props.handleSubmit} name="yes" className="registerButton">Jag kommer</button>
                <button onClick={this.props.handleSubmit} name="no" className="registerButton decline">Jag kommer inte</button>                    
            </div>
        );
    }
}


export default Register;