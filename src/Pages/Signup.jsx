import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../utils/Loader";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    } else {
      navigate("/signup");
    }
  }, []);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    if (!data.name || !data.email || !data.password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }

    if (!data.email.includes("@") || !data.email.includes(".")) {
      setErrorMsg("Invalid email format");
      setLoading(false);
      return;
    }

    if (data.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/user/register`, data);

      if (response.data.success) {
        alert(`${response.data.data.name} Signup successfully`);
        setData({
          name: "",
          email: "",
          password: "",
        });
        navigate("/login");
      } else {
        setErrorMsg(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Server error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center max-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 fixed top-20 inset-0 z-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">Signup</h1>

        {errorMsg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
            {errorMsg}
          </div>
        )}

        <input
          type="textl"
          name="name"
          value={data.name}
          onChange={handleChange}
          placeholder="Enter your email"
          className="p-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="p-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="p-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-200 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Signup..." : "Signup"}
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
