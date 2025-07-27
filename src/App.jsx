import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import BookVehicle from "./Pages/BookVehicle";
import AddVehicle from "./Pages/AddVehicle";
import ViewBooking from "./Pages/ViewBooking";
import WhyChooseUs from "./Components/WhyChooseUs";
import Home from "./Components/Home";
import GetAllCancledBooking from "./Pages/GetAllCancledBooking";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/add-vehicle"
              element={token ? <AddVehicle /> : <Login />}
            />
            <Route
              path="/bookings"
              element={token ? <ViewBooking /> : <Login />}
            />
            <Route
              path="/book-vehicle/:id"
              element={token ? <BookVehicle /> : <Login />}
            />
            <Route
              path="/canceled-bookings"
              element={token ? <GetAllCancledBooking /> : <Login />}
            />
          </Routes>
        </main>

        <WhyChooseUs />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
