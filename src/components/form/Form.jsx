import React, { Component } from "react";

export default class Form extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      users: JSON.parse(localStorage.getItem("users")) || [],
      updateUser: null
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let newUser = {
      id: new Date().getTime(),
      fname: this.state.fname,
      lname: this.state.lname,
    };
    this.setState({ users: [...this.state.users, newUser] });

    this.state.fname = "";
    this.state.lname = "";

    console.log(newUser);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.users !== this.state.users) {
      localStorage.setItem("users", JSON.stringify(this.state.users));
    }
    if (prevState.updateUser !== this.state.updateUser) {
        this.setState({fname: this.state.updateUser.fname, lname: this.state.updateUser.lname})
    }
  }

  handleDelete = (id) => {
    this.setState({
      users: this.state.users.filter((users) => users.id !== id),
    });
  };

  render() {
    return (
      <>
        <div className="mt-5 ml-10 flex gap-2">
          <form onSubmit={this.handleSubmit} action="">
            <input
              type="text"
              className="border"
              value={this.state.fname}
              onChange={(e) => this.setState({ fname: e.target.value })}
            />
            <input
              type="text"
              className="border"
              value={this.state.lname}
              onChange={(e) => this.setState({ lname: e.target.value })}
            />
            <button className="border">create</button>
          </form>
        </div>

        <div className="container mx-auto grid grid-cols-5 mt-5">
          {this.state.users?.map((item) => (
            <div
              key={item.id}
              className="border w-[200px] h-[100px] flex flex-col justify-center items-center gap-2 px-2 py-2"
            >
              <div className="h-[100px] bg-black border w-full"></div>
              <div>
                <h1 className=" w-full text-center bg-black-200">
                  <strong>First Name: </strong>
                  {item.fname}
                </h1>
                <h2 className=" w-full text-center bg-black-200">
                  <strong>Last Name: </strong>
                  {item.lname}
                </h2>
              </div>
              <button
                className="border py-1 px-2"
                onClick={() => this.handleUpdate(item)}
              >
                delete
              </button>
              <button
                className="border py-1 px-2"
                onClick={() => this.setState({updateUser: user})}
              >
                update
              </button>
            </div>
          ))}
        </div>
      </>
    );
  }
}
