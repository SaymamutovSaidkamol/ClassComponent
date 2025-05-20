import React, { Component } from "react";

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      count: 1,
      bool: false,
      data: null,
    };
  }

  handleIncrement = () => {
    console.log("ok");
    this.setState({ count: this.state.count + 1 });
  };

  handle_decrement = () => {
    if (this.state.count !== 0) {
    }
  };
  render() {
    return (
      <header className="p-6 bg-blue-500 text-white py-2 px-2">
        <h2>Header {this.state.count}</h2>
        <button onClick={this.handleIncrement} className="border py-2 px-2">
          increment
        </button>
        <button
          className="border disabled:opacity-50 py-2 px-2"
          onClick={() => {
            this.setState({ count: this.state.count - 1 });
          }}
          disabled={this.state.count <= 0}
        >
          decrement
        </button>
        <button className="border py-2 px-2" onClick={() => this.setState({ count: 0 })}>
          reset
        </button>
        <button
          className="border py-2 px-2"
          onClick={() => this.setState({ bool: !this.state.bool })}
        >
          Show more
        </button>
        {this.state.bool && (
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci,
            eveniet porro, minus id omnis dolore natus reprehenderit mollitia
            exercitationem labore at ab aliquam voluptatum? Odit excepturi
            praesentium et laborum harum?
          </p>
        )}
      </header>
    );
  }
}
