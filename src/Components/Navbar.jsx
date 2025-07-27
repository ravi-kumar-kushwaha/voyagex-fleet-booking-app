import React from "react";
import Logo from "./Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("userDetails"));
const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="navbar text-gray-700 bg-white shadow-md px-6 sticky top-0 z-50">
      <div className="flex-1">
        <Link to='/'>
        <Logo className="w-16 h-16 hover:scale-105 transition-transform" />
        </Link>
      </div>
      {token ? (
        <>
      <nav className="flex px-6 gap-4 items-center">
        <ul className="flex gap-8">
          <li>
            <Link
              to="/add-vehicle"
              className={`nav-link ${
                isActive("/add-vehicle")
                  ? "text-blue-600 underline decoration-blue-700 gap-2"
                  : "text-gray-500 hover:text-gray-700 hover:underline decoration-gray-900"
              }`}
            >
              Add Vehicle
            </Link>
          </li>
          <li>
            <Link
              to="/bookings"
              className={`nav-link ${
                isActive("/bookings")
                  ? "text-blue-600 underline decoration-blue-700 gap-2"
                  : "text-gray-500 hover:text-gray-700 hover:underline decoration-gray-900"
              }`}
            >
              View Bookings
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex-none px-4 ml-6">
       
          <div className="flex gap-3 items-center justify-center">
          <h1 className="text-xl font-semibold text-gray-800">
            <Link to="/"> {user?.name} </Link>
            </h1>
          <button
            className="btn text-xl btn-primary rounded-full px-7 py-3"
            onClick={handleLogout}
          >
            Logout
          </button>
          </div>
      </div>
      </>
      )
      : (
        <button className="btn text-xl btn-primary rounded-full px-7 py-3">
        <Link to="/login"> Login </Link>
       </button>
      )}
    </div>
  );
};

export default Navbar;
