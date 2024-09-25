// src/App.js
import HomePage from './components/homePage.js';
import AddCarForm from './components/AddCarForm.js';
import CarList from './components/CarList.js';
import React, {useEffect, useState } from 'react';
import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomeButton from './components/homeButton.js';
import AddServiceForm from './components/AddServiceForm.js';
import CarListCheck from './components/CarListCheck.js'
import Grid from '@mui/material/Grid2/index.js';
import Snackbar from '@mui/material/Snackbar/index.js'
import Slide from '@mui/material/Slide/index.js';
function App() {
  //saves data for cars
  const [cars, setCars] = useState([]);
  //saves data for add service form
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [mileage, setMileage] = useState('')
  // saves data for the list of repairs
  const [repairs, setRepairs] = useState([]);
  // for car list checkbox selected car
  const [selectedCar, setSelectedCar] = useState(null);
  
  // sliding message code here
  const [open, setOpen] = useState(false); // For snackbar open state
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Message for snackbar
  const SlideTransition = (props) => {
    return <Slide {...props} direction="left" />;
  };
  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setOpen(true);
  };
 
  // retive cars from sql database
  const fetchCars = async () => {
    try {
      const result = await window.electronAPI.getAllCars();
      setCars(result); // Update state with fetched cars
    } catch (err) {
      console.error('Error fetching cars:', err);
    }
  };
  // handles the add service 
  const handleAddService = async (carId) => {
      if (!location || !date || !mileage || repairs.length === 0) {
        alert("Please fill in all fields and add at least one repair.");
        return;
      }
      // Get total cost of repairs
      const totalCost = repairs.reduce((accumulator, repair) => {
        return accumulator + parseFloat(repair.cost);
      }, 0);
      const serviceData = {
        carId,
        location,
        date,
        mileage,
        repairs: repairs,
        totalCost,
      };

      console.log("Service Data:", serviceData);

      try {
        await window.electronAPI.addService(serviceData);
        setLocation('');
        setDate('');
        setMileage('');
        setRepairs([]);
        setSelectedCar(null)
        setSnackbarMessage(`Service at ${location} on ${date} added successfully!`);
        setOpen(true); 

      } catch (error) {
        console.error("Error adding service to database:", error);
        setSnackbarMessage('Failed to add service.');
        setOpen(true); 
      }
  };
  useEffect(() => {
    fetchCars();  // Fetch cars when the app loads
  }, []);
  return (
    <Router>
      <div className = "app" style={{ WebkitAppRegion: 'drag'}} >
        <HomeButton />
        <div className="window-controls" style={{ WebkitAppRegion: 'no-drag'}}>
          <button style={{ WebkitAppRegion: 'no-drag'}} className="window-btn" id="minimize-btn" onClick={() => window.electronAPI.minimizeWindow()}>
            <span className="material-symbols-outlined">minimize</span>
          </button>
          <button  style={{ WebkitAppRegion: 'no-drag'}}className="window-btn" id="maximize-btn" onClick={() => window.electronAPI.toggleMaximizeWindow()}>
          <span className="material-symbols-outlined">select_window</span>
          </button>
          <button style={{ WebkitAppRegion: 'no-drag'}} className="window-btn" id="close-btn" onClick={() => window.electronAPI.closeWindow()}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <Routes>
          <Route  path="/" element={<HomePage />} />
          <Route path="/add-car"
            element={
              <Grid key="main" container direction="row" spacing={3} style={{paddingTop: '50px' , paddingRight: '50px' }}>
                <Grid item xs={12} md={7} style = {{marginLeft: '200px' , WebkitAppRegion: 'no-drag'}}  >
                  <AddCarForm fetchCars={fetchCars} handleSnackbarOpen = {handleSnackbarOpen} />
                </Grid>
                <Grid item xs={12} md={5} style={{ WebkitAppRegion: 'no-drag', paddingTop: '50px' ,borderRadius: '8px',width: '100%', maxWidth: '400px',height: 'auto', minHeight: '600px', marginLeft: '70px', }}>
                  <CarList cars={cars} fetchCars={fetchCars} />
                </Grid>
               </Grid>}/>
          <Route path="*" element={<h1>Page Not Found</h1>} /> 
          <Route path= "/add-service" 
            element = {
              <Grid key="main" container direction="row" spacing={3} style={{ marginLeft: '50px', paddingTop: '50px' , paddingRight: '50px'}}>
                {/* Service Form Section */}
                <Grid item xs={12} md={7} style = {{ WebkitAppRegion: 'no-drag', maxWidth: '700px'}}  >
                  <div className="service-form">
                    <AddServiceForm 
                      location={location}
                      setLocation={setLocation}
                      date={date}
                      setDate={setDate}
                      mileage={mileage}
                      setMileage={setMileage}
                      repairs={repairs}
                      setRepairs={setRepairs}
                    />
                  </div>
                </Grid>
                {/* Car List Section */}
                <Grid item xs={12} md={5} style={{ WebkitAppRegion: 'no-drag', borderRadius: '8px',width: '100%', maxWidth: '400px',height: 'auto', minHeight: '600px', marginLeft: '50px', }} >
                  <div className="list-section" >
                    <CarListCheck cars={cars} selectedCar = {selectedCar} setSelectedCar = {setSelectedCar} handleAddService={handleAddService} handleSnackbarOpen = {handleSnackbarOpen}/>
                  </div>
                </Grid>
              </Grid>
               
            }/>
        </Routes>
        <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            TransitionComponent={SlideTransition}
            message={snackbarMessage}
            autoHideDuration={4000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
         />
      </div>
    </Router>
  );
}

export default App;