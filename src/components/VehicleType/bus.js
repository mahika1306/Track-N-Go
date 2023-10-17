// import React, { useState } from 'react';
// import { initializeApp } from 'firebase/app';
// import { getFirestore, doc, setDoc, getDoc, collection, where, query, getDocs } from 'firebase/firestore';

// import "./busstyle.css"
// const firebaseConfig = {
//   apiKey: "AIzaSyBLzMDDfd1hTNvat7-q3TuLfz0iRs5nFlw",
//   authDomain: "final-bus-traking.firebaseapp.com",
//   databaseURL: "https://final-bus-traking-default-rtdb.firebaseio.com",
//   projectId: "final-bus-traking",
//   storageBucket: "final-bus-traking.appspot.com",
//   messagingSenderId: "672447756097",
//   appId: "1:672447756097:web:049420c8c40ea3940d53c0",
//   measurementId: "G-9N0BE3D56N"
// };

// const app = initializeApp(firebaseConfig);
// const firestore = getFirestore(app);

// function BusPage() {
//   const [busDetails, setBusDetails] = useState({ plateNumber: '' });
//   const [journeyDetails, setJourneyDetails] = useState({
//     journeyPlateId: '',
//     source: '',
//     intermediateStations: [],
//     destination: '',
//   });
//   const [driverDetails, setDriverDetails] = useState({
//     phoneNumber: '',
//     name: '',
//     place: '',
//   });

//   const handleBusInputChange = (e) => {
//     const { name, value } = e.target;
//     setBusDetails({ ...busDetails, [name]: value });
//   };

//   const handleJourneyInputChange = (e) => {
//     const { name, value } = e.target;
//     setJourneyDetails({ ...journeyDetails, [name]: value });
//   };

//   const handleDriverInputChange = (e) => {
//     const { name, value } = e.target;
//     setDriverDetails({ ...driverDetails, [name]: value });
//   };


//   const checkUniqueID = async (collectionName, fieldName, uniqueID) => {
//     const q = query(collection(firestore, collectionName), where(fieldName, '==', uniqueID));
//     const querySnapshot = await getDocs(q);
//     return querySnapshot.empty;
//   };

//   const addDataToFirestore = async () => {
//     try {
//       // Check if unique IDs exist before adding data
//       const isBusIDUnique = await checkUniqueID('busDetails', 'plateNumber', busDetails.plateNumber);
//       const isJourneyIDUnique = await checkUniqueID('journeyDetails', 'journeyPlateId', journeyDetails.journeyPlateId);
//       const isDriverIDUnique = await checkUniqueID('driverDetails', 'phoneNumber', driverDetails.phoneNumber);

//       if (!isBusIDUnique) {
//         alert('Bus ID already exists');
//         return;
//       }

//       if (!isJourneyIDUnique) {
//         alert('Journey ID already exists');
//         return;
//       }

//       if (!isDriverIDUnique) {
//         alert('Driver ID already exists');
//         return;
//       }

//       // Add data to Firestore
//       await setDoc(doc(firestore, 'busDetails', busDetails.plateNumber), busDetails);
//       await setDoc(doc(firestore, 'journeyDetails', journeyDetails.journeyPlateId), journeyDetails);
//       await setDoc(doc(firestore, 'driverDetails', driverDetails.phoneNumber), driverDetails);

//       console.log('Data added to Firestore successfully');
//     } catch (error) {
//       console.error('Error adding data to Firestore: ', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Bus Page</h2>
//       <div>
//         <h3>Bus Details</h3>
//         <input
//           type="text"
//           name="plateNumber"
//           value={busDetails.plateNumber}
//           onChange={handleBusInputChange}
//           placeholder="Plate Number"
//         />
//       </div>
//       <div>
//         <h3>Journey Details</h3>
//         <input
//           type="text"
//           name="journeyPlateId"
//           value={journeyDetails.journeyPlateId}
//           onChange={handleJourneyInputChange}
//           placeholder="Journey Plate ID"
//         />
//         <input
//           type="text"
//           name="source"
//           value={journeyDetails.source}
//           onChange={handleJourneyInputChange}
//           placeholder="Source"
//         />
//         <input
//           type="text"
//           name="destination"
//           value={journeyDetails.destination}
//           onChange={handleJourneyInputChange}
//           placeholder="Destination"
//         />
//       </div>
//       <div>
//         <h3>Driver Details</h3>
//         <input
//           type="text"
//           name="phoneNumber"
//           value={driverDetails.phoneNumber}
//           onChange={handleDriverInputChange}
//           placeholder="Phone Number (Unique ID)"
//         />
//         <input
//           type="text"
//           name="name"
//           value={driverDetails.name}
//           onChange={handleDriverInputChange}
//           placeholder="Name"
//         />
//         <input
//           type="text"
//           name="place"
//           value={driverDetails.place}
//           onChange={handleDriverInputChange}
//           placeholder="Place"
//         />
//       </div>
//       <div>
//         <button onClick={addDataToFirestore}>Add Data to Firestore</button>
//       </div>
//     </div>
//   );
// }

// export default BusPage;
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

function BusPage() {
  const [busDetails, setBusDetails] = useState({ plateNumber: '' });
  const [journeyDetails, setJourneyDetails] = useState({
    journeyPlateId: '',
    source: '',
    intermediateStations: [],
    destination: '',
  });
  const [driverDetails, setDriverDetails] = useState({
    phoneNumber: '',
    name: '',
    place: '',
  });
  const [successMessage, setSuccessMessage] = useState(null);

  const handleBusInputChange = (e) => {
    const { name, value } = e.target;
    setBusDetails({ ...busDetails, [name]: value });
  };

  const handleJourneyInputChange = (e) => {
    const { name, value } = e.target;
    setJourneyDetails({ ...journeyDetails, [name]: value });
  };

  const handleDriverInputChange = (e) => {
    const { name, value } = e.target;
    setDriverDetails({ ...driverDetails, [name]: value });
  };
  const addIntermediateStation = () => {
    // Add an intermediate station to the array
    setJourneyDetails({
      ...journeyDetails,
      intermediateStations: [...journeyDetails.intermediateStations, ''],
    });
  };
  const handleIntermediateStationChange = (e, index) => {
    // Update the intermediate station at the specified index
    const updatedIntermediateStations = [...journeyDetails.intermediateStations];
    updatedIntermediateStations[index] = e.target.value;
    setJourneyDetails({
      ...journeyDetails,
      intermediateStations: updatedIntermediateStations,
    });
  };
  const removeIntermediateStation = (index) => {
    // Remove an intermediate station from the array
    const updatedIntermediateStations = [...journeyDetails.intermediateStations];
    updatedIntermediateStations.splice(index, 1);
    setJourneyDetails({
      ...journeyDetails,
      intermediateStations: updatedIntermediateStations,
    });
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
      const isJourneyIDUnique = await checkUniqueID('journeyDetails', 'journeyPlateId', journeyDetails.journeyPlateId);
      const isDriverIDUnique = await checkUniqueID('driverDetails', 'phoneNumber', driverDetails.phoneNumber);

      if (!isBusIDUnique) {
        alert('Bus ID already exists');
        return;
      }

      if (!isJourneyIDUnique) {
        alert('Journey ID already exists');
        return;
      }

      if (!isDriverIDUnique) {
        alert('Driver ID already exists');
        return;
      }

      // Add data to Firestore
      await setDoc(doc(firestore, 'busDetails', busDetails.plateNumber), busDetails);
      await setDoc(doc(firestore, 'journeyDetails', journeyDetails.journeyPlateId), journeyDetails);
      await setDoc(doc(firestore, 'driverDetails', driverDetails.phoneNumber), driverDetails);

      console.log('Data added to Firestore successfully');
      setSuccessMessage('Data added successfully');
      setBusDetails({ plateNumber: '' });
      setJourneyDetails({
        journeyPlateId: '',
        source: '',
        intermediateStations: [],
        destination: '',
      });
      setDriverDetails({
        phoneNumber: '',
        name: '',
        place: '',
      });
      
    } catch (error) {
      console.error('Error adding data to Firestore: ', error);
    }
  };

  return (
    <div className="bus">
      <h2>Bus Page</h2>
      <div>
        <h3>Bus Details</h3>
        <input
          type="text"
          name="plateNumber"
          value={busDetails.plateNumber}
          onChange={handleBusInputChange}
          placeholder="Plate Number"
        />
      </div>
      <div>
        <h3>Journey Details</h3>
        <input
          type="text"
          name="journeyPlateId"
          value={journeyDetails.journeyPlateId}
          onChange={handleJourneyInputChange}
          placeholder="Journey Plate ID"
        />
        <input
          type="text"
          name="source"
          value={journeyDetails.source}
          onChange={handleJourneyInputChange}
          placeholder="Source"
        />
        {journeyDetails.intermediateStations.map((station, index) => (
          <div key={index}>
            <input
              type="text"
              value={station}
              onChange={(e) => handleIntermediateStationChange(e, index)}
              placeholder="Intermediate Station"
            />
            <button className='intBtn' onClick={() => removeIntermediateStation(index)}>Remove</button>
          </div>
        ))}
        <button className='intBtn' onClick={addIntermediateStation}>Add Intermediate Station</button>

        <input
          type="text"
          name="destination"
          value={journeyDetails.destination}
          onChange={handleJourneyInputChange}
          placeholder="Destination"
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
        <button className='subBtn' onClick={addDataToFirestore}>Submit</button>
        {successMessage && <p>{successMessage}</p>}
      </div>
    </div>
  );
}

export default BusPage;
