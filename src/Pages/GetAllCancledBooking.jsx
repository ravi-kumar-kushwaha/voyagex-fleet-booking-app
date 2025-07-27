import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../utils/Loader';
const GetAllCancledBooking = () => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log("data", data);
    useEffect(() => {
      const fetchAllBookings = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${BASE_URL}/booking/user-cancelled-bookings`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          console.log("response", response.data.data);
          if(response?.data?.success){
            setData(response.data.data);
          }
          
        } catch (error) {
          const message = error?.response?.data?.message || error?.message || "Internal Server error. Please try again.";
          alert(message);
        }finally{
          setLoading(false);
        }
      };
      fetchAllBookings();
    }, []);

    if (loading) {
        return <div><Loader/></div>;
      }

    return (
        <div className="flex flex-col items-center justify-center mt-10">
          <h1 className="text-4xl font-bold text-center mt-2">Your all Cancled Bookings</h1>
          <p className="text-center text-2xl text-gray-500 mt-1">
            Here you can view all{" "}
            <span className="font-semibold">{data?.length || 0}</span> of your Cancled bookings.
          </p>
          <div className="flex flex-wrap items-center justify-center text-gray-700 mt-10 p-10 gap-6">
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item) => (
                <div
                  className="w-full md:w-[45%] lg:w-[30%] border border-amber-100 p-6 rounded-md shadow-lg bg-white"
                  key={item._id}
                >
                  <div className="mb-3">
                    <h2 className="text-lg font-semibold">
                      Vehicle Name:{" "}
                      <span className="font-normal">{item?.vehicleId?.name}</span>
                    </h2>
                    <p>Capacity: {item?.vehicleId?.capacityKg} Kg</p>
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
}

export default GetAllCancledBooking
