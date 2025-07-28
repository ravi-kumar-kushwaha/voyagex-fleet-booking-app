import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../utils/Loader";

const AddVehicle = () => {
  const [data, setData] = useState({
    name: "",
    capacityKg: "",
    tyres: "",
  });
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
    
    if (!data.name || !data.capacityKg || !data.tyres) {
        alert("All fields are required");
        setLoading(false);
        return;
      }
    
      if(data.capacityKg < 1 || data.capacityKg > 50000){
        setErrorMsg("Capacity must be between 1 and 50000");
        setLoading(false);
        return;
      }
    
      if(data.tyres < 2 || data.tyres > 18){
        setErrorMsg("Tyres must be between 2 and 18");
        setLoading(false);
        return;
      }
      
    try {
      const response = await axios.post(`${BASE_URL}/vehicles/add-vehicle`, data,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        alert(response.data.message);
        setData({
            name: "",
            capacityKg: "",
            tyres: "",
        });
        navigate("/");
      } else {
        setErrorMsg(response.data.message || "Something went wrong while adding new vehicle.");
      }
    } catch (error) {
      setErrorMsg(error?.response?.data?.message || "Internal Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div><Loader/></div>;
  }

  return (
    <div className="flex fixed items-center justify-center max-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900  top-20 inset-0 z-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">Add Vehicle</h1>

        {errorMsg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
            {errorMsg}
          </div>
        )}

        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          placeholder="Enter Vehicle Name"
          className="p-3 text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        <input
          type="number"
          name="capacityKg"
          value={data.capacityKg}
          onChange={handleChange}
          placeholder="Enter Vehicle Capacity in Kg"
          className="p-3 text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        <input
          type="number"
          name="tyres"
          value={data.tyres}
          onChange={handleChange}
          placeholder="Enter No of Tyres"
          className="p-3 text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        <button
          type="submit"
          className="p-3 btn btn-primary text-white rounded-lg font-semibold transition-all duration-200 disabled:opacity-50"
        >
          {loading ? "Adding Vehicle..." : "Add Vehicle"}
        </button>

        <p className="text-sm text-center text-gray-600">
          <Link to="/" className="text-blue-500 hover:underline">
            Back to Home →
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AddVehicle;
