import React, { Component } from "react";
import "./Bandylist.css";

class BandyList extends Component {
  render() {
    const user = localStorage.getItem("user");
    const { participants, className } = this.props;
    return (
      <div className={`bandylist ${className}`}>
        <h3>{className === "yes" ? "Kommer" : "Kommer inte"}</h3>
        <ul>
          {participants.map((item, index) => (
            <li key={index}>{item} {item === user && <span name={index} onClick={() => this.props.remove(item, className)}>Ta bort</span>}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default BandyList;
