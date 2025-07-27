import React from "react";
import { useNavigate } from "react-router-dom";
const AvailableVehicle = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-start text-gray-700 justify-center border border-amber-100 p-6 rounded-lg shadow-md m-4 bg-white max-w-md w-full">
    <h1 className="text-xl font-semibold mb-2 mt-2">
      Vehicle Name: <span className="font-normal">{data.name}</span>
    </h1>
    <p className="text-lg mb-1">
      Capacity: <span className="font-medium">{data.capacityKg} Kg</span>
    </p>
    <p className="text-lg mb-1">
      Tyres: <span className="font-medium">{data.tyres}</span>
    </p>
    <p className="text-lg mb-4">
      Estimated Ride Duration: <span className="font-medium">{data.estimatedRideDurationHours} hours</span>
    </p>
    <div className="flex justify-center w-full mt-4">
      <button
        onClick={() => navigate(`/book-vehicle/${data._id}`)}
        className="btn btn-primary rounded-full text-lg px-6 py-2"
      >
        Book Now
      </button>
    </div>
  </div>
  
  );
};

export default AvailableVehicle;
