import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext); // Get global user data

  const logoutUser = async () => {
    try {
      await axios.get("/logout"); // Call our logout endpoint
      setUser(null); // Reset user state globally
      toast.success("You have been logged out.");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed.");
    }
  };

  return (
    <nav className="p-4 bg-base-200 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Welcome
      </Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span>Welcome, {user.name}!</span>
            <Link to="/dashboard" className="btn btn-ghost">
              Profile
            </Link>
            <button onClick={logoutUser} className="btn btn-error">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
