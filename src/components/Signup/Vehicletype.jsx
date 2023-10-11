import React from "react";
import { Link } from "react-router-dom";

const VehicleTypeSelection = () => {
  return (
    <div>
      <h1>Select Vehicle Type</h1>
      <Link to="/bus-details">Bus</Link>
      <Link to="/other-vehicle-details">Other Vehicle</Link>
    </div>
  );
};

export default VehicleTypeSelection;
