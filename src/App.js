import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import VehicleType from "./components/VehicleType/VehicleType";
import BusPage from "./components/VehicleType/bus";
import Othervehicle from "./components/VehicleType/Othervehicle"; 

import { auth } from "./firebase";
import "./App.css";
import "./components/VehicleType/busstyle.css"
function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);

  return (
    <div className="App">
      <Router>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/VehicleType" element={<VehicleType />} />
          <Route path="/Bus" element={<BusPage />}/>
          <Route path="/Othervehicle" element={<Othervehicle />} />
          <Route path="/" element={<Home name={userName} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
