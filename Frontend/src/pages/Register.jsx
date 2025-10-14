// Frontend/src/pages/Register.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";



export default function Register() {
  const navigate = useNavigate();
  // State to hold form data
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // Function that runs when the form is submitted
  const registerUser = async (e) => {
    e.preventDefault(); // Prevent page reload

    const { name, email, phone, password } = data;
    try {
      // Send a POST request to our backend
      const response = await axios.post("/register", {
        name,
        email,
        phone, 
        password,
      });

      // Handle the response from the server
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({  
          name: '',
          email: '',
          phone: '',
          password: '',
        });
        toast.success("Registration successful! Welcome!");
        navigate("/login"); // Redirect user to login page
      }
    } catch (error) {
  if (error.response && error.response.data && error.response.data.error) {
    toast.error(error.response.data.error);
  } else {
    toast.error("Something went wrong. Please try again.");
  }
  console.log(error);
}
  };

  return (
    <div data-theme="sunset" className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Register</h2>
          <form onSubmit={registerUser}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter name..."
                className="input input-bordered"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter email..."
                className="input input-bordered"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="tel"
                placeholder="Enter phone number..."
                className="input input-bordered"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter password..."
                className="input input-bordered"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
