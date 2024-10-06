// src/App.js
//components imports
import HomePage from './components/homePage.js';
import BlurFadeTransition from './components/BlurFadeTransition.js';
import HomeButton from './components/homeButton.js';
import ViewService from './components/ViewService.js';
import AddCar from './components/AddCar.js'
import AddService from './components/AddService.js'
import Layout from './components/Layout.js'; 

import React, {useState,useEffect } from 'react';
import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import Snackbar from '@mui/material/Snackbar/index.js'
import Slide from '@mui/material/Slide/index.js';

function App() {
  //saves data for cars
  const [cars, setCars] = useState([]);
  
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
  //
  useEffect(() => {
    fetchCars();  // Fetch cars when the app loads
  }, []);
  return (
    <Router>
      <Layout>
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
          <Route path="/" element={ 
              <BlurFadeTransition>
                <HomePage />
              </BlurFadeTransition>
            } />
          <Route path="/add-car"
            element={
              
                <AddCar handleSnackbarOpen = {handleSnackbarOpen} cars = {cars} setCars = {setCars} fetchCars = {fetchCars}/>
            }/>
          <Route path="*" element={<h1>Page Not Found</h1>} /> 
          <Route path= "/add-service" 
            element = {
                <AddService cars = {cars} fetchCars = {fetchCars} handleSnackbarOpen = {handleSnackbarOpen} setSnackbarMessage  = {setSnackbarMessage} setOpen={setOpen}/>
            }/>
          <Route path= "/view-repairs" 
            element = {
                <ViewService cars = {cars} handleSnackbarOpen = {handleSnackbarOpen} setSnackbarMessage = {setSnackbarMessage}/>
            }>
          </Route>
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
      </Layout>
    </Router>
  );
}

export default App;