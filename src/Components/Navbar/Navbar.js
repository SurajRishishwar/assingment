import { useAuth } from "../../Context/authContext";
import "./Navbar.css";
export const Navbar = () => {
  const { user, logoutUser } = useAuth();
  return (
    <nav className="navbar">
      <h4>Video Recorder</h4>
      <div>
        <span>Welcome, {user?.username}</span>{" "}
        <button onClick={logoutUser}>Logout</button>
      </div>
    </nav>
  );
};
