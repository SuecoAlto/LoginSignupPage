import { useState, useContext } from "react"; // 1. Import useContext
import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../context/userContext"; // 2. Import UserContext

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // 3. Get setUser
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data: responseData } = await axios.post("/login", {
        // Rename variable here
        email,
        password,
      });

      if (responseData.error) {
        toast.error(responseData.error);
      } else {
        setData({ email: "", password: "" }); // Reset form correctly
        setUser(responseData.user); // 4. UPDATE THE GLOBAL STATE!
        toast.success("Login successful! Welcome back.");
        navigate("/"); // 5. Navigate to dashboard
      }
    } catch (error) {
      // Error handling remains the same
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
