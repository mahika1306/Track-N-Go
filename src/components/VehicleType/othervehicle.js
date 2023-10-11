import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, collection, where, query, getDocs } from 'firebase/firestore';

import "./busstyle.css"
const firebaseConfig = {
  apiKey: "AIzaSyBLzMDDfd1hTNvat7-q3TuLfz0iRs5nFlw",
  authDomain: "final-bus-traking.firebaseapp.com",
  databaseURL: "https://final-bus-traking-default-rtdb.firebaseio.com",
  projectId: "final-bus-traking",
  storageBucket: "final-bus-traking.appspot.com",
  messagingSenderId: "672447756097",
  appId: "1:672447756097:web:049420c8c40ea3940d53c0",
  measurementId: "G-9N0BE3D56N"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

function Othervehicle() {
  const [busDetails, setBusDetails] = useState({ plateNumber: '' });
  const [driverDetails, setDriverDetails] = useState({
    phoneNumber: '',
    name: '',
    place: '',
  });

  const handleBusInputChange = (e) => {
    const { name, value } = e.target;
    setBusDetails({ ...busDetails, [name]: value });
  };

  const handleDriverInputChange = (e) => {
    const { name, value } = e.target;
    setDriverDetails({ ...driverDetails, [name]: value });
  };

  const checkUniqueID = async (collectionName, fieldName, uniqueID) => {
    const q = query(collection(firestore, collectionName), where(fieldName, '==', uniqueID));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  };

  const addDataToFirestore = async () => {
    try {
      // Check if unique IDs exist before adding data
      const isBusIDUnique = await checkUniqueID('busDetails', 'plateNumber', busDetails.plateNumber);
      const isDriverIDUnique = await checkUniqueID('driverDetails', 'phoneNumber', driverDetails.phoneNumber);

      if (!isBusIDUnique) {
        alert('Bus ID already exists');
        return;
      }
      if (!isDriverIDUnique) {
        alert('Driver ID already exists');
        return;
      }

      // Add data to Firestore
      await setDoc(doc(firestore, 'busDetails', busDetails.plateNumber), busDetails);
      await setDoc(doc(firestore, 'driverDetails', driverDetails.phoneNumber), driverDetails);

      console.log('Data added to Firestore successfully');
    } catch (error) {
      console.error('Error adding data to Firestore: ', error);
    }
  };

  return (
    <div>
      <h2>Other Vehicle Details</h2>
      <div>
        <h3>Vehicle Details</h3>
        <input
          type="text"
          name="plateNumber"
          value={busDetails.plateNumber}
          onChange={handleBusInputChange}
          placeholder="Plate Number"
        />
      </div>
      <div>
        <h3>Driver Details</h3>
        <input
          type="text"
          name="phoneNumber"
          value={driverDetails.phoneNumber}
          onChange={handleDriverInputChange}
          placeholder="Phone Number (Unique ID)"
        />
        <input
          type="text"
          name="name"
          value={driverDetails.name}
          onChange={handleDriverInputChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="place"
          value={driverDetails.place}
          onChange={handleDriverInputChange}
          placeholder="Place"
        />
      </div>
      <div>
        <button onClick={addDataToFirestore}>Add Data to Firestore</button>
      </div>
    </div>
  );
}

export default Othervehicle;
