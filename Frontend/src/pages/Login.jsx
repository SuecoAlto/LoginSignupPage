import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({}); // Clear the form
        toast.success("Login successful! Welcome back.");
        navigate("/"); // Redirect user to home page
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
    <div
      data-theme="sunset"
      className="flex justify-center items-center h-screen"
    >
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Login</h2>
          <form onSubmit={loginUser}>
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
                Login
              </button>
            </div>
          </form>
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="link link-primary">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
