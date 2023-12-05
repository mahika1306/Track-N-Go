

// import React, { useState } from 'react';
// import { initializeApp } from 'firebase/app';
// import { getFirestore, doc, setDoc, getDoc, collection, where, query, getDocs } from 'firebase/firestore';
// import axios from 'axios';


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
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [suggestions, setSuggestions] = useState([]);
//   const [destinationSuggestions, setDestinationSuggestions] = useState([]);
 

//   const [inputValue, setInputValue] = useState('');

//   const handleBusInputChange = (e) => {
//     const { name, value } = e.target;
//     setBusDetails({ ...busDetails, [name]: value });
//   };
 

//     const handleJourneyInputChange = async (e) => {
//       const { name, value } = e.target;
//       setJourneyDetails({ ...journeyDetails, [name]: value });
//       setInputValue(value);
//       try {
//         const response = await axios.get(
//           `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json`,
//           {
//             params: {
//               access_token: 'pk.eyJ1IjoidXRrMTIzIiwiYSI6ImNsbnl2cmRicDB5NXcyaXFtNG11dzcwemoifQ.TnZtihEi0MMNGJLyVHoUhQ',
//             },
//           }
//         );

//         // Extract suggestions from the response
//         const newSuggestions = response.data.features.map((feature) => ({
//           name: feature.place_name,
//           // Add other relevant information as needed
//         }));
//         //setSuggestions(newSuggestions);
//         if (name === 'source') {
//           setSuggestions(newSuggestions);
//         } else if (name === 'destination') {
//           setDestinationSuggestions(newSuggestions);
//         }
//       } catch (error) {
//         console.error('Error fetching suggestions:', error.message);
//       }
//     };


  
  

//     const handleDriverInputChange = (e) => {
//       const { name, value } = e.target;
//       setDriverDetails({ ...driverDetails, [name]: value });
//     };
//     const addIntermediateStation = () => {
//       // Add an intermediate station to the array
//       setJourneyDetails({
//         ...journeyDetails,
//         intermediateStations: [...journeyDetails.intermediateStations, ''],
//       });
//     };
//     const handleIntermediateStationChange = (e, index) => {
//       // Update the intermediate station at the specified index
//       const updatedIntermediateStations = [...journeyDetails.intermediateStations];
//       updatedIntermediateStations[index] = e.target.value;
//       setJourneyDetails({
//         ...journeyDetails,
//         intermediateStations: updatedIntermediateStations,
//       });
//     };
//     const removeIntermediateStation = (index) => {
//       // Remove an intermediate station from the array
//       const updatedIntermediateStations = [...journeyDetails.intermediateStations];
//       updatedIntermediateStations.splice(index, 1);
//       setJourneyDetails({
//         ...journeyDetails,
//         intermediateStations: updatedIntermediateStations,
//       });
//     };

//     const handleSuggestionClick = (suggestion, inputName) => {
      
//       if (inputName === 'source') {
//         setJourneyDetails({ ...journeyDetails, source: suggestion.name });
//       } else if (inputName === 'destination') {
//         setJourneyDetails({ ...journeyDetails, destination: suggestion.name });
//       }
//       setSuggestions([]); // Clear suggestions after selection
//       setDestinationSuggestions([]); // Clear suggestions after selection
//     };


//     const checkUniqueID = async (collectionName, fieldName, uniqueID) => {
//       const q = query(collection(firestore, collectionName), where(fieldName, '==', uniqueID));
//       const querySnapshot = await getDocs(q);
//       return querySnapshot.empty;
//     };

//     const addDataToFirestore = async () => {
//       try {
//         // Check if unique IDs exist before adding data
//         const isBusIDUnique = await checkUniqueID('busDetails', 'plateNumber', busDetails.plateNumber);
//         const isJourneyIDUnique = await checkUniqueID('journeyDetails', 'journeyPlateId', journeyDetails.journeyPlateId);
//         const isDriverIDUnique = await checkUniqueID('driverDetails', 'phoneNumber', driverDetails.phoneNumber);

//         if (!isBusIDUnique) {
//           alert('Bus ID already exists');
//           return;
//         }

//         if (!isJourneyIDUnique) {
//           alert('Journey ID already exists');
//           return;
//         }

//         if (!isDriverIDUnique) {
//           alert('Driver ID already exists');
//           return;
//         }

//         // Add data to Firestore
//         await setDoc(doc(firestore, 'busDetails', busDetails.plateNumber), busDetails);
//         await setDoc(doc(firestore, 'journeyDetails', journeyDetails.journeyPlateId), journeyDetails);
//         await setDoc(doc(firestore, 'driverDetails', driverDetails.phoneNumber), driverDetails);

//         console.log('Data added to Firestore successfully');
//         setSuccessMessage('Data added successfully');
//         setBusDetails({ plateNumber: '' });
//         setJourneyDetails({
//           journeyPlateId: '',
//           source: '',
//           intermediateStations: [],
//           destination: '',
//         });
//         setDriverDetails({
//           phoneNumber: '',
//           name: '',
//           place: '',
//         });

//       } catch (error) {
//         console.error('Error adding data to Firestore: ', error);
//       }
//     };

//     return (
//       <div className="bus">
//         <h2>Bus Page</h2>
//         <div>
//           <h3>Bus Details</h3>
//           <input
//             type="text"
//             name="plateNumber"
//             value={busDetails.plateNumber}
//             onChange={handleBusInputChange}
//             placeholder="Plate Number"
//           />
//         </div>
//         <div>
//           <h3>Journey Details</h3>
//           <input
//             type="text"
//             name="journeyPlateId"
//             value={journeyDetails.journeyPlateId}
//             onChange={handleJourneyInputChange}
//             placeholder="Journey Plate ID"
//           />
//           <input
//             type="text"
//             name="source"
//             value={journeyDetails.source}
//             onChange={(e) => handleJourneyInputChange(e)}
//             placeholder="Source"
//           />
//           {/* Render suggestions here */}
//           <ul>
//             {suggestions.map((suggestion, index) => (
//               <li key={index} onClick={() => handleSuggestionClick(suggestion,'source')}>{suggestion.name}</li>
//             ))}
//           </ul>
//           {journeyDetails.intermediateStations.map((station, index) => (
//             <div key={index}>
//               <input
//                 type="text"
//                 value={station}
//                 onChange={(e) => handleIntermediateStationChange(e, index)}
//                 placeholder="Intermediate Station"
//               />
//               <button className='intBtn' onClick={() => removeIntermediateStation(index)}>Remove</button>
//             </div>
//           ))}
//           <button className='intBtn' onClick={addIntermediateStation}>Add Intermediate Station</button>

//           <input
//             type="text"
//             name="destination"
//             value={journeyDetails.destination}
//             onChange={handleJourneyInputChange}
//             placeholder="Destination"
//           />
//           <ul>
//             {destinationSuggestions.map((destinationSuggestion, index) => (
//               <li key={index} onClick={() => handleSuggestionClick(destinationSuggestion,'destination')}>{destinationSuggestion.name}</li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <h3>Driver Details</h3>
//           <input
//             type="text"
//             name="phoneNumber"
//             value={driverDetails.phoneNumber}
//             onChange={handleDriverInputChange}
//             placeholder="Phone Number (Unique ID)"
//           />
//           <input
//             type="text"
//             name="name"
//             value={driverDetails.name}
//             onChange={handleDriverInputChange}
//             placeholder="Name"
//           />
//           <input
//             type="text"
//             name="place"
//             value={driverDetails.place}
//             onChange={handleDriverInputChange}
//             placeholder="Place"
//           />
//         </div>
//         <div>
//           <button className='subBtn' onClick={addDataToFirestore}>Submit</button>
//           {successMessage && <p>{successMessage}</p>}
//         </div>
//       </div>
//     );
//           };
          
//   export default BusPage;




import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, collection, where, query, getDocs } from 'firebase/firestore';
import axios from 'axios';


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
  const [suggestions, setSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [intermediateStationSuggestions, setIntermediateStationSuggestions] = useState([]);
 

  const [inputValue, setInputValue] = useState('');

  const handleBusInputChange = (e) => {
    const { name, value } = e.target;
    setBusDetails({ ...busDetails, [name]: value });
  };
 

    const handleJourneyInputChange = async (e) => {
      const { name, value } = e.target;
      setJourneyDetails({ ...journeyDetails, [name]: value });
      setInputValue(value);
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json`,
          {
            params: {
              access_token: 'pk.eyJ1IjoidXRrMTIzIiwiYSI6ImNsbnl2cmRicDB5NXcyaXFtNG11dzcwemoifQ.TnZtihEi0MMNGJLyVHoUhQ',
            },
          }
        );

        // Extract suggestions from the response
        const newSuggestions = response.data.features.map((feature) => ({
          name: feature.place_name,
          // Add other relevant information as needed
        }));
        //setSuggestions(newSuggestions);
        if (name === 'source') {
          setSuggestions(newSuggestions);
        } else if (name === 'destination') {
          setDestinationSuggestions(newSuggestions);
        }else if (name === 'intermediateStations') {
          setIntermediateStationSuggestions(newSuggestions);
        }

      } catch (error) {
        console.error('Error fetching suggestions:', error.message);
      }
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
    const handleIntermediateStationChange = async(e, index) => {
      // Update the intermediate station at the specified index
      const { value } = e.target;
  const updatedIntermediateStations = [...journeyDetails.intermediateStations];
  updatedIntermediateStations[index] = value;
      // const updatedIntermediateStations = [...journeyDetails.intermediateStations];
      // updatedIntermediateStations[index] = e.target.value;
      // setJourneyDetails({
      //   ...journeyDetails,
      //   intermediateStations: updatedIntermediateStations,
      // });
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json`,
          {
            params: {
              access_token: 'pk.eyJ1IjoidXRrMTIzIiwiYSI6ImNsbnl2cmRicDB5NXcyaXFtNG11dzcwemoifQ.TnZtihEi0MMNGJLyVHoUhQ',
            },
          }
        );
        const intermediateSuggestions = response.data.features.map((feature) => ({
          name: feature.place_name,
          // Add other relevant information as needed
        }));
    
        // Update intermediateStationSuggestions for the current index
        setIntermediateStationSuggestions((prevSuggestions) => {
          const newSuggestions = [...prevSuggestions];
          newSuggestions[index] = intermediateSuggestions;
          return newSuggestions;
    });
  } catch (error) {
    console.error('Error fetching suggestions for intermediate station:', error.message);
  }
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

    const handleSuggestionClick = (suggestion, inputName) => {
      
      if (inputName === 'source') {
        setJourneyDetails({ ...journeyDetails, source: suggestion.name });
      } else if (inputName === 'destination') {
        setJourneyDetails({ ...journeyDetails, destination: suggestion.name });
      }
      setSuggestions([]); // Clear suggestions after selection
      setDestinationSuggestions([]); // Clear suggestions after selection
    };
    const handleIntermediateSuggestionClick = (suggestion, index) => {
      // Handle intermediate station suggestion click
      // Similar to handleSuggestionClick but for intermediate stations
      const updatedIntermediateStations = [...journeyDetails.intermediateStations];
      updatedIntermediateStations[index] = suggestion.name;
  
      setJourneyDetails({
        ...journeyDetails,
        intermediateStations: updatedIntermediateStations,
      });
  
      setIntermediateStationSuggestions([]); // Clear suggestions after selection
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
            onChange={(e) => handleJourneyInputChange(e)}
            placeholder="Source"
          />
          {/* Render suggestions here */}
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion,'source')}>{suggestion.name}</li>
            ))}
          </ul>
          {journeyDetails.intermediateStations.map((station, index) => (
            <div key={index}>
              <input
                type="text"
                value={station}
                onChange={(e) => handleIntermediateStationChange(e, index)}
                placeholder="Intermediate Station"
              />
              <ul>
            {intermediateStationSuggestions[index] &&
              intermediateStationSuggestions[index].map((suggestion, suggestionIndex) => (
                <li key={suggestionIndex} onClick={() => handleIntermediateSuggestionClick(suggestion, index)}>
                  {suggestion.name}
                </li>
              ))}
          </ul>
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
          <ul>
            {destinationSuggestions.map((destinationSuggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(destinationSuggestion,'destination')}>{destinationSuggestion.name}</li>
            ))}
          </ul>
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
          };
          
  export default BusPage;


