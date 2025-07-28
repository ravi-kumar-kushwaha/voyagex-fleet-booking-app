import React from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../utils/Loader";
const BookVehicle = () => {
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem("userDetails"));
  const userId = user?._id;
  const navigate = useNavigate();

  const param = useParams();
  const vehicleId = param.id;
  const [data, setData] = useState({
    customerId: "",
    vehicleId: "",
    startTime: "",
    fromPincode: "",
    toPincode: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const startDate = new Date(data.startTime);
  const now = new Date();

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!isNaN(startDate.getTime()) && startDate <= now) {
      alert("Please select future date");
      setLoading(false);
      return;
    }

    if (!/^\d{6}$/.test(data?.fromPincode) || !/^\d{6}$/.test(data?.toPincode)) {
      alert("Invalid pincode format. Pincodes must be exactly 6 digits");
      setLoading(false);
      return;
   }

   if (data?.fromPincode === data?.toPincode) {
     alert("You cannot book vehicle for Same Pincode!");
     setLoading(false);
     return;
   }

    const bookingDetails = {
      customerId: userId,
      vehicleId: vehicleId,
      startTime: new Date(data.startTime).toISOString(),
      fromPincode: data.fromPincode,
      toPincode: data.toPincode,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/booking/book-vehicle/${vehicleId}`,
        bookingDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    
      if (response?.data?.success) {
        alert(response.data.message);
        setData({
          startTime: "",
          fromPincode: "",
          toPincode: "",
        });
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
        const message = error.response?.data?.message || error?.message;
      alert(message);
    }finally{
      setLoading(false);
    }
  };

  if (loading) {
    return <div><Loader/></div>;
  }

  return (
    <div className="flex flex-col items-center justify-center max-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 fixed top-20 inset-0 z-50">
      <div className="text-center">
        <h1 className="text-5xl font-semibold px-10 py-2">
          Book Your Vehicle.
        </h1>
      </div>
      <div className="flex flex-col items-center justify-between gap-8 px-6 py-4 flex-wrap m-10 w-full">
        <div className="flex flex-col  gap-3 w-[50%]">
          <label
            htmlFor="startTime"
            className="block text-xl font-medium leading-6 text-white"
          >
            Start Time
          </label>
          <input
            id="startTime"
            name="startTime"
            onChange={handleChange}
            value={data.startTime}
            type="datetime-local"
            placeholder="Select Start Time"
            className="input input-bordered text-primary input-primary w-full rounded-lg px-6"
          />
        </div>

        <div className="flex flex-col gap-3 w-[50%]">
          <label
            htmlFor="fromPincode"
            className="block text-xl font-medium leading-6 text-white"
          >
            From Pincode
          </label>
          <input
            type="number"
            name="fromPincode"
            onChange={handleChange}
            value={data.fromPincode}
            id="fromPincode"
            placeholder="From pincode"
            className="input input-bordered text-primary input-primary w-full rounded-lg px-6"
          />
        </div>

        <div className="flex flex-col gap-3 w-[50%]">
          <label
            htmlFor="toPincode"
            className="block text-xl font-medium leading-6 text-white"
          >
            To Pincode
          </label>
          <input
            type="number"
            name="toPincode"
            onChange={handleChange}
            value={data.toPincode}
            id="toPincode"
            placeholder="To pincode"
            className="input input-bordered text-primary input-primary w-full  rounded-lg px-6"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-6 mt-2 w-[50%]">
          <button
            type="submit"
            onClick={handleBooking}
            className="btn btn-primary mt-1 rounded-lg text-sm px-4  py-3 w-full"
          >
            Confirm Booking
          </button>
          <p className="text-sm text-center mt-6">
          <Link to="/" className="text-primary hover:underline">
            Back to Home →
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
};

export default BookVehicle;
