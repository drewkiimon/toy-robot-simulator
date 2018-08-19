import React, { Component } from "react";

const orientation = {
  NORTH: { x: 0, y: 1 },
  SOUTH: { x: 0, y: -1 },
  WEST: { x: -1, y: 0 },
  EAST: { x: 1, y: 0 }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      location: null,
      facing: { x: 0, y: 0 },
      placed: false
    };

    this.handlePress = this.handlePress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevState) {
    if (this.state.location !== null) {
      console.log("component", this.state);
    }
  }

  handlePress(event) {
    if (event.key === "Enter") {
      // Looking for a key command
      const inputLine = this.state.value.split(/[\s,]+/);
      var command = inputLine[0];
      // The starting command
      if (command === "PLACE") {
        console.log("PLACE");
        // Make sure we have all 4 arguments
        if (inputLine.length === 4) {
          const x = inputLine[1],
            y = inputLine[2],
            f = inputLine[3];
          // Is PLACE location valid?
          if (x > -1 && x < 6 && y > -1 && y < 6) {
            const facing = orientation[f];
            this.setState({ location: { x, y }, facing, placed: true });
          } else {
            console.log("Not on board");
          }
        }
        // Need to alert user they have an incorrect line
        else {
          console.log("Place is wrong");
        }
      }
      // If the robot is not on the board, no actions can be taken
      if (this.place) {
        if (command === "MOVE") {
          console.log("MOVE");
        } else if (command === "LEFT") {
          console.log("LEFT");
        } else if (command === "RIGHT") {
          console.log("RIGHT");
        } else if (command === "REPORT") {
          this.setState({
            location: null,
            facing: { x: 0, y: 0 },
            place: false
          });
          console.log("REPORT");
        }
      }
      this.setState({ value: "" });
    }
  }

  handleChange(event) {
    const value = event.target.value.toUpperCase();
    this.setState({ value });
  }

  render() {
    return (
      <div>
        <input
          onKeyPress={this.handlePress}
          onChange={this.handleChange}
          value={this.state.value}
        />
      </div>
    );
  }
}

export default App;
