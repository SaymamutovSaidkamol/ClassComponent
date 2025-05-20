import React, { Component } from "react";

export default class FoodItems extends Component {
  render() {
    return (
      <div>
        <h3>FoodItems</h3>
        <div className="grid grid-cols-4 gap-2">
          {this.props.data?.map((item) => (
            <div className="w-[200px] h-full">
              <div className="">
                <img src={item.image} alt="" />
              </div>
              <div className="">
                <h1>{item.name}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
