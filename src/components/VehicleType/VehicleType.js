import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function VehicleType() {
  return (
    <>
      <div>
        <h1>Vehicle Types</h1>
        <Link to="../bus">
          <button>Bus</button>
        </Link>
        <Link to="../Othervehicle">
          <button>Other Vehicles</button>
        </Link>
      </div>
    </>
  );
}

export default VehicleType;
