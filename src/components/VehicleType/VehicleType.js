import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import "./vehicle.css"
function VehicleType() {
  return (
    <>
      <div>
        <h4>Choose Your Vehicle</h4>
        <Link to="../bus">
          <button>Bus</button>
        </Link>
        <Link to="../Othervehicle">
          <button>Others</button>
        </Link>
      </div>
    </>
  );
}

export default VehicleType;
