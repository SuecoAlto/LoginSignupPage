import { useContext } from "react";
import { UserContext } from "../context/userContext";

export default function Dashboard() {
  const { user } = useContext(UserContext); // Get the logged in user
  return (
    <div className="p-4">
      <h1>Profile Page</h1>
      {!!user && ( // Only show this if 'user' is not null
        <div className="card w-96 bg-base-100 shadow-xl m-4">
          <div className="card-body">
            <h2 className="card-title">Profile Information</h2>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
