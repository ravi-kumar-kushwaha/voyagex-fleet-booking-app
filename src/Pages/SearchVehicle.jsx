import { useEffect, useState } from "react";
import axios from "axios";
import AvailableVehicle from "./AvailableVehicle";
import Loader from "../utils/Loader";
import { Link } from "react-router-dom";

const SearchVehicle = () => {
  const token = localStorage.getItem("token");
  const BASE_URL = import.meta.env.VITE_API_URL;

  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [searchCriteriaData, setSearchCriteriaData] = useState(null); 
  console.log("searchCriteriaData", searchCriteriaData)
  const [loading, setLoading] = useState(false);

  const [searchData, setSearchData] = useState({
    startTime: "",
    fromPincode: "",
    toPincode: "",
    capacityRequired: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getAvailableVehicles = async (searchParams) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/vehicles/available`, {
        params: searchParams,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error fetching vehicles:", error?.response?.data?.message || error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const startDate = new Date(searchData.startTime);
    const now = new Date();

    if (!isNaN(startDate.getTime()) && startDate <= now) {
      alert("Please select a future date and time");
      setLoading(false);
      return;
    }

    if (
      !/^\d{6}$/.test(searchData?.fromPincode) ||
      !/^\d{6}$/.test(searchData?.toPincode)
    ) {
      alert("Invalid pincode format. Pincodes must be exactly 6 digits");
      setLoading(false);
      return;
    }

    if (searchData?.fromPincode === searchData?.toPincode) {
      alert("No Vehicles Available for Same Pincode!");
      setLoading(false);
      return;
    }

    if (
      searchData?.capacityRequired < 1 ||
      searchData?.capacityRequired > 50000
    ) {
      alert("Capacity must be between 1 and 50000");
      setLoading(false);
      return;
    }

    const searchParamData = {
      startTime: startDate.toISOString(),
      fromPincode: searchData.fromPincode,
      toPincode: searchData.toPincode,
      capacityRequired: parseInt(searchData.capacityRequired, 10),
    };

    try {
      const response = await getAvailableVehicles(searchParamData);
      const availableVehicles =
        response?.data?.data?.availableVehicles || response?.data?.data;

      if (!availableVehicles || availableVehicles.length === 0) {
        alert(
          response?.data?.message ||
            "No vehicles found matching capacity requirements"
        );
        return;
      }

      setAvailableVehicles(availableVehicles);
      setSearchCriteriaData(response);
      alert(response?.data?.message);

      setSearchData({
        startTime: "",
        fromPincode: "",
        toPincode: "",
        capacityRequired: "",
      });
    } catch (error) {
      console.error("Search error:", error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        error?.response?.message ||
        "Failed to search vehicles. Please try again.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="text-center">
          <h1 className="text-5xl font-semibold px-10 py-2">
            Search And Book Your Vehicle.
          </h1>
        </div>
        <div className="flex flex-row gap-3 px-6 py-4 flex-wrap mt-10">
          <div className="flex flex-col gap-1 w-[20%]">
            <label
              htmlFor="startTime"
              className="block text-sm font-medium leading-6 text-white"
            >
              Start Time
            </label>
            <input
              id="startTime"
              name="startTime"
              onChange={handleChange}
              value={searchData.startTime}
              type="datetime-local"
              placeholder="Select Start Time"
              className="input input-bordered input-primary w-full"
            />
          </div>

          <div className="flex flex-col gap-1 w-[20%]">
            <label
              htmlFor="fromPincode"
              className="block text-sm font-medium leading-6 text-white"
            >
              From Pincode
            </label>
            <input
              type="number"
              name="fromPincode"
              onChange={handleChange}
              value={searchData.fromPincode}
              id="fromPincode"
              placeholder="From pincode"
              className="input input-bordered input-primary w-full"
            />
          </div>

          <div className="flex flex-col gap-1 w-[20%]">
            <label
              htmlFor="toPincode"
              className="block text-sm font-medium leading-6 text-white"
            >
              To Pincode
            </label>
            <input
              type="number"
              name="toPincode"
              onChange={handleChange}
              value={searchData.toPincode}
              id="toPincode"
              placeholder="To pincode"
              className="input input-bordered input-primary w-full"
            />
          </div>

          <div className="flex flex-col gap-1 w-[20%]">
            <label
              htmlFor="capacityRequired"
              className="block text-sm font-medium leading-6 text-white"
            >
              Capacity In (kg)
            </label>
            <input
              type="number"
              name="capacityRequired"
              onChange={handleChange}
              value={searchData.capacityRequired}
              id="capacityRequired"
              placeholder="Capacity required (kg)"
              className="input input-bordered input-primary w-full"
            />
          </div>

          <div className="flex items-end ">
            {token ? (
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary mt-4"
              >
                Search
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary mt-4"
              >
                <Link to="/login">
                Search
                </Link>
              </button>
            )}
          </div>
        </div>
      </div>

      {!searchCriteriaData || searchCriteriaData.length === 0 ? (
        ""
      ) : (
        <div>
          <hr className="border-t border-gray-600 w-full mt-10 mb-5" />
          <div>
            <div className="text-center items-center justify-center px-6 py-4">
              <h1 className="text-3xl font-semibold ">
                {searchCriteriaData?.data?.message} for the given search criteria{" "}
              </h1>
            </div>
            <div className="flex text-center items-center justify-center px-6 py-4 gap-6">
              <h1>
                <span className="font-bold">Start Time:</span>{" "}
                {new Date(
                  searchCriteriaData?.data?.data?.searchCriteria?.startTime
                ).toLocaleString()}
              </h1>
              <h1>
                <span className="font-bold">End Time:</span>{" "}
                {new Date(
                  searchCriteriaData?.data?.data?.searchCriteria?.endTime
                ).toLocaleString()}
              </h1>
              <h1>
                <span className="font-bold">From Pincode:</span>{" "}
                {searchCriteriaData?.data?.data?.searchCriteria?.fromPincode}
              </h1>
              <h1>
                <span className="font-bold">To Pincode:</span>{" "}
                {searchCriteriaData?.data?.data?.searchCriteria?.toPincode}
              </h1>
              <h1>
                <span className="font-bold">Capacity Required:</span>{" "}
                {searchCriteriaData?.data?.data?.searchCriteria?.capacityRequired}Kg
              </h1>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center mt-10 p-10 ">
        {Array.isArray(availableVehicles) &&
          availableVehicles.map((data) => (
            <AvailableVehicle key={data._id} data={data} />
          ))}
      </div>
    </>
  );
};

export default SearchVehicle;
