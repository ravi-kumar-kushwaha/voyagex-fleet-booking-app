import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../utils/Loader";

const ViewBooking = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAllBookings = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/booking/user-bookings`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setData(response.data.data);
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Internal Server error. Please try again.";
        alert(message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllBookings();
  }, []);

  if (loading) {
    return <div><Loader/></div>;
  }
  const handleCancledBooking = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirmCancel) return;
    try {
      setLoading(true);
      const response = await axios.put(
        `${BASE_URL}/booking/cancel-booking/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        alert(response.data.message);
        navigate("/canceled-bookings");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Internal Server error. Please try again.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-4xl font-bold text-center mt-2">Your Bookings</h1>
      <p className="text-center text-2xl text-gray-500 mt-1">
        Here you can view all{" "}
        <span className="font-semibold">{data?.length || 0}</span> of your
        bookings.
      </p>
      <div className="text-center mt-5">
        <Link
          to="/canceled-bookings"
          className="text-lg text-primary underline hover:text-primary/80 transition"
        >
          Click here to see all canceled bookings
        </Link>
      </div>

      <div className="flex flex-wrap justify-center  text-gray-700 mt-10 p-10 gap-6">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((item) => (
            <div
              className="w-[360px] p-6 border border-amber-100 rounded-[10px_0_10px_0] shadow-lg bg-white"
              key={item._id}
            >
              <div className="mb-3">
                <h2 className="text-lg font-semibold">
                  Vehicle Name:{" "}
                  <span className="font-normal">{item.vehicleId?.name}</span>
                </h2>
                <p>Capacity: {item.vehicleId?.capacityKg} Kg</p>
                <p>Tyres: {item.vehicleId?.tyres}</p>
              </div>
              <div className="mb-3">
                <p>From Pincode: {item.fromPincode}</p>
                <p>To Pincode: {item.toPincode}</p>
                <p>Start: {new Date(item.startTime).toLocaleString()}</p>
                <p>End: {new Date(item.endTime).toLocaleString()}</p>
                <p>Duration: {item.estimatedRideDurationHours} hrs</p>
                <p>
                  Status: <span className="capitalize">{item.status}</span>
                </p>
              </div>
              <div>
                <p>
                  Booked On: {new Date(item.createdAt).toDateString()} at{" "}
                  {new Date(item.createdAt).toLocaleTimeString()}
                </p>
              </div>
              <div className="flex justify-center mt-7">
                <button
                  className="btn btn-primary text-xl px-4 py-2 rounded-lg"
                  onClick={() => handleCancledBooking(item._id)}
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No bookings found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewBooking;
