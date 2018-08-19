import React, { Component } from "react";

const orientation = {
  NORTH: { x: 0, y: 1 },
  SOUTH: { x: 0, y: -1 },
  WEST: { x: -1, y: 0 },
  EAST: { x: 1, y: 0 }
};

// Used to get direction for output
const direction = {
  x: {
    "0": {
      y: {
        "1": "NORTH",
        "-1": "SOUTH"
      }
    },
    "1": {
      y: {
        "0": "EAST"
      }
    },
    "-1": {
      y: {
        "0": "WEST"
      }
    }
  }
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
    if (
      this.state.location !== null &&
      this.state.location !== prevState.location
    ) {
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
          const x = parseInt(inputLine[1]),
            y = parseInt(inputLine[2]),
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
      if (this.state.placed) {
        if (command === "MOVE") {
          console.log("MOVE");
          const moveX = this.state.facing.x;
          const moveY = this.state.facing.y;
          // Make sure the robot won't fall off the table
          const nextX = this.state.location.x + moveX;
          const nextY = this.state.location.y + moveY;
          if (nextX > -1 && nextX < 6 && nextY > -1 && nextY < 6) {
            // Good to go
            this.setState({ location: { x: nextX, y: nextY } });
          } else {
            console.log("Not a valid move");
          }
        } else if (command === "LEFT") {
          console.log("LEFT");
          const x = this.state.facing.x;
          const y = this.state.facing.y;
          this.setState({ facing: { x: -y, y: x } });
        } else if (command === "RIGHT") {
          console.log("RIGHT");
          const x = this.state.facing.x;
          const y = this.state.facing.y;
          this.setState({ facing: { x: y, y: -x } });
        } else if (command === "REPORT") {
          // Need to print to screen somewhere
          const location = this.state.location;
          console.log(
            `Output: ${location.x},${location.y},${
              direction.x[this.state.facing.x.toString()].y[
                this.state.facing.y.toString()
              ]
            }`
          );
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
