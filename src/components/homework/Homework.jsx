import axios from "axios";
import React, { Component } from "react";
import { IoClose } from "react-icons/io5";

export default class Homework extends Component {
  constructor() {
    super();
    this.state = {
      createModal: false,
      updateModal: false,
      data: [],
      error: null,
      formData: {
        // name: "",
        // age: "",
        // city: "",
        // price: "",
        // image: "",
      },
      preview: null,
    };
  }

  handleModal = () => {
    this.setState({ createModal: !this.state.createModal });
  };

  componentDidMount() {
    axios
      .get("https://6764223a52b2a7619f5b899a.mockapi.io/Coutry")
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((err) => {
        this.state.error(err.response);
      })
      .finally(() => {});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.formData);

    axios
      .post(
        "https://6764223a52b2a7619f5b899a.mockapi.io/Coutry",
        this.state.formData
      )
      .then((res) => {
        this.setState((prevState) => ({ data: [...prevState.data, res.data] }));
      })
      .catch((err) => {
        this.setState({ error: err.response });
      })
      .finally();
  };

  handleDelete = (id) => {
    axios
      .delete(`https://6764223a52b2a7619f5b899a.mockapi.io/Coutry/${id}`)
      .then((res) => {
        this.setState({
          data: this.state.data.filter((prev) => prev.id != res.data.id),
        });
      })
      .catch((err) => {
        this.setState({ error: err.response });
      })
      .finally();
  };

  render() {
    const { preview } = this.state;
    return (
      <>
        <div className="container mt-10 mx-auto flex justify-between ">
          <button
            onClick={() => this.handleModal()}
            className="bg-[#08ec3a] text-white px-5 py-2 rounded-[5px] cursor-pointer hover:bg-[rgb(140,240,137)]"
          >
            Create
          </button>
          <button
            onClick={() => this.handleModal()}
            className="bg-[#03ee80] text-white px-5 py-2 rounded-[5px] cursor-pointer hover:bg-[#87f5c2] "
          >
            Update
          </button>
        </div>

        <div className="container grid grid-cols-5 gap-5 mx-auto mt-10">
          {this.state.data?.map((item) => (
            <div
              key={item.id}
              className="flex flex-col py-2 px-2 bg-amber-100 text-[#5a5858] rounded-[5px] h-full justify-between"
            >
              <div className="h-[180px] overflow-hidden rounded-[5px]">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col items-center mt-2 gap-1">
                <h1 className="text-2xl font-bold">{item.name}</h1>
                <h3 className="text-[18px] font-bold">{item.age} age</h3>
                <h3 className="font-bold">{item.price} 000 USD</h3>
                <h3 className="font-bold">{item.city}</h3>
              </div>
              <div className="flex justify-between mt-3 gap-2">
                <button className="w-1/2 bg-yellow-300 hover:bg-yellow-400 text-white py-1 rounded-[5px]">
                  Update
                </button>
                <button
                  onClick={() => {
                    this.handleDelete(item.id);
                  }}
                  className="w-1/2 bg-red-400 hover:bg-red-500 text-white py-1 rounded-[5px]"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {this.state.createModal && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] z-[999] flex justify-center items-center">
            <div className="bg-white shadow-2xl w-[500px] rounded-[10px] relative p-6">
              <form
                onSubmit={this.handleSubmit}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">Name</label>
                  <input
                    type="text"
                    placeholder="name..."
                    onChange={(e) => {
                      this.setState({
                        formData: {
                          ...this.state.formData,
                          name: e.target.value,
                        },
                      });
                    }}
                    className="px-3 py-2 border rounded-[5px] outline-none"
                  />
                  <label className="font-semibold">Age</label>
                  <input
                    type="number"
                    placeholder="age..."
                    className="px-3 py-2 border rounded-[5px] outline-none"
                    onChange={(e) => {
                      this.setState({
                        formData: {
                          ...this.state.formData,
                          age: e.target.value,
                        },
                      });
                    }}
                  />
                  <label className="font-semibold">Commanda name</label>
                  <input
                    type="text"
                    placeholder="commanda..."
                    className="px-3 py-2 border rounded-[5px] outline-none"
                    onChange={(e) => {
                      this.setState({
                        formData: {
                          ...this.state.formData,
                          comanda: e.target.value,
                        },
                      });
                    }}
                  />
                  <label className="font-semibold">City name</label>
                  <input
                    type="text"
                    placeholder="commanda..."
                    className="px-3 py-2 border rounded-[5px] outline-none"
                    onChange={(e) => {
                      this.setState({
                        formData: {
                          ...this.state.formData,
                          city: e.target.value,
                        },
                      });
                    }}
                  />
                  <label className="font-semibold">Price</label>
                  <input
                    type="number"
                    placeholder="price..."
                    className="px-3 py-2 border rounded-[5px] outline-none"
                    onChange={(e) => {
                      this.setState({
                        formData: {
                          ...this.state.formData,
                          price: e.target.value,
                        },
                      });
                    }}
                  />
                  <label className="font-semibold">Image</label>
                  <input
                    type="file"
                    className="px-3 py-2 border rounded-[5px] outline-none"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file && file.type.startsWith("image/")) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          this.setState({
                            formData: {
                              ...this.state.formData,
                              image: reader.result, // base64 ni saqlaymiz
                            },
                            preview: reader.result,
                          });
                        };
                        reader.readAsDataURL(file);
                      } else {
                        this.setState({
                          formData: {
                            ...this.state.formData,
                            image: "",
                          },
                          preview: null,
                        });
                      }
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gray-300 hover:bg-gray-400 rounded-[5px] py-2 mt-4"
                >
                  Submit
                </button>
              </form>
              <IoClose
                className="absolute top-2 right-2 text-3xl text-red-600 hover:text-red-800 cursor-pointer"
                onClick={this.handleModal}
              />
            </div>
          </div>
        )}
      </>
    );
  }
}
