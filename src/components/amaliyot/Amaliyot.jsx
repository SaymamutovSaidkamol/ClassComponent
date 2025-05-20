import axios from "axios";
import React, { Component } from "react";
import { data } from "react-router-dom";

export default class Amaliyot extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      start: false,
      stop: false,
      data: [],
      deleteData: [],
    };
    this.timer = null;
  }

  handleStart = () => {
    this.timer = setInterval(() => {
      this.setState({ count: this.state.count + 1 });
    }, 1000);
  };

  handleStop = () => {
    this.setState({ stop: !this.state.stop.true });
    if (this.state.stop) {
      clearInterval(this.timer);
    }
  };

  componentDidMount() {
    axios
      .get("https://6764223a52b2a7619f5b899a.mockapi.io/Coutry")
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {});
  }

  handleDeleted = (id) => {
    axios
      .delete(`https://6764223a52b2a7619f5b899a.mockapi.io/Coutry/${id}`)
      .then((res) => {
        this.setState({
          data: this.state.data.filter((prev) => prev.id != res.data.id),
        });
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {});
  };

  render() {
    return (
      <>
        <div className="bg-gray-400 w-[150px] flex flex-col justify-center items-center gap-2 mt-5 mx-auto px-2 py-2">
          <h1 className="text-2xl border w-full text-center shadow-2xl border-white">
            {this.state.count}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => this.handleStart()}
              className="bg-white rounded-[5px] py-2 px-2 hover:bg-gray-300 cursor-pointer"
            >
              start
            </button>
            <button
              onClick={() => this.handleStop()}
              className="bg-white rounded-[5px] py-2 px-2 hover:bg-gray-300 cursor-pointer"
            >
              stop
            </button>
          </div>
        </div>

        <div className="container mx-auto border mt-5 grid grid-cols-4 gap-4">
          {this.state.data?.map((item) => (
            <div key={item.id} className="w-[200px]">
              <div>
                <img src={item.image} alt="" />
              </div>
              <div>
                <h3>{item.name}</h3>
              </div>
              <button
                className="border w-full text-center bg-red-600 text-white"
                onClick={() => this.handleDeleted(item.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </>
    );
  }
}
