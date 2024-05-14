import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logUserOut } from "../actions/userActions";
import toast from "react-hot-toast";
import { FaFolder } from "react-icons/fa";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogoutUser = async () => {
    await logUserOut(dispatch);

    navigate("/login");

    toast.success("Logged out successfully", {
      icon: "✅",
    });
  };
  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <input type="checkbox" />
        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
        <ul className="menu-items">
          <li>
            <Link to="/dashboard">Folders</Link>
          </li>

          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link onClick={handleLogoutUser} to="#">
              Logout
            </Link>
          </li>
        </ul>
        <h1 
        style={{
          display:"flex",
          alignItems:"center",
          gap:"10px"
        }}
        className="logo">Folder App<FaFolder style={{
          color:"yellow",
          marginTop:".5rem"
        }} /> </h1>
      </div>
    </nav>
  );
};

export default Navbar;
