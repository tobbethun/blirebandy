import React, { Component } from "react";
import "./Bandylist.css";

class BandyList extends Component {
  render() {
    const user = localStorage.getItem("bandyPlayer");
    const { participants, className } = this.props;
    console.log('participants', participants);
    return (
      <div className={`bandylist ${className}`}>
        {participants.length > 1 &&
        <h3>{participants.length -1 } {className === "yes" ? "Kommer" : "Kommer inte"}</h3>
        }
        <ul>
          {participants.map((item, index) => (
            <li key={index} className="bandylist-item">{item} {item === user && <span className="bandylist-remove" name={index} onClick={() => this.props.remove(item, className)}>Ta bort</span>}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default BandyList;
