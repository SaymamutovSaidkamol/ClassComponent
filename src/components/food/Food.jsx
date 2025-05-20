import axios from "axios";
import React, { Component } from "react";
import FoodItems from "./FoodItems";
// rafce
// rcc

export default class Food extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    axios
      .get("https://dummyjson.com/recipes")
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((err) => {
        this.setState({ error: err.response });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return this.state.error ? (
      <div>
        <p className="text-center text-red-500">Someting went wrong</p>
      </div>
    ) : (
      <div>
        <h1>Food</h1>
        <FoodItems data={this.state.data?.recipes}/>
        {this.state.loading && <p className="text-center">Loading...</p>}
      </div>
    );
  }
}
