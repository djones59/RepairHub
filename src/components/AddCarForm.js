import { motion } from 'framer-motion';
import videoBackground from '../videos/background_blurred.mp4';
import './AddCarForm.css';
import React, { useState } from 'react';
import FormLabel from '@mui/material/FormLabel/index.js';
import Grid from '@mui/material/Grid2/index.js';
import DateInputField from './DateInputField.js';
import GlowingTextField from './GlowingTextField.js'
import SmoothGlassButton from './SmoothGlassButton.js';
const AddCarForm = ({ fetchCars , handleSnackbarOpen}) => {
    const [carMake, setCarMake] = useState('');
    const [carModel, setCarModel] = useState('');
    const [carDate, setCarDate] = useState('');
    const [carMile, setCarMile] = useState('');
    const [carYear, setCarYear] = useState('');

    const restrictToFourDigits = (inputValue) => {
      // Remove all non-numeric characters
      inputValue = inputValue.replace(/\D/g, '');
      
      // Limit the input to 4 digits
      return inputValue.slice(0, 4);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        //If all fields are not filled out, send alert
        if (!carMake || !carModel || !carDate || !carMile || !carYear) {
            console.error('All fields are required');
            handleSnackbarOpen('All fields are required')
            return;
        }
        const carData = {
            make: carMake,
            model: carModel,
            dateIssued: carDate,
            currMileage: carMile,
            year: carYear,
        };
        // Send data to the main process via ipcRenderer
        window.electronAPI.insertCar(carData)
        .then(() => {
            fetchCars(); 
            // clear the form
            setCarMake('');
            setCarModel('');
            setCarDate('');
            setCarMile('');
            setCarYear('');

            handleSnackbarOpen(`${carModel} - ${carYear} added successfully!`)
        })
        .catch((err) => {
            console.error('Error inserting car data:', err);
        });
    };
  return (
    <div >
      <video autoPlay loop muted id="background-blurred-video">
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Grid container direction="column" alignItems="flex-start" style={{paddingTop: '50px' , paddingLeft: '10%' }}>
        <Grid item xs={6} style={{ textAlign: 'center'  }}>
          <h1 style={{  fontSize: '24px', color: 'white', fontFamily: '"Fjalla One", sans-serif'}}>Enter Car Details</h1>
          <form onSubmit={handleSubmit}>
            <Grid  container spacing={3} direction="column" >
              <Grid item xs={12}>
                <FormLabel htmlFor="car-make" required sx = {{color: 'white', fontFamily: '"Fjalla One", sans-serif'}}> Make </FormLabel>
                <GlowingTextField
                  value={carMake}
                  onChange={(e) => setCarMake(e.target.value)}
                  fullWidth
                  required
                  sx={{
                    color: 'white',
                    '& input': {
                      textAlign: 'center', 
                      backgroundColor: '#333' ,
                      color: '#e7d7d7',
                      fontFamily: '"Fjalla One", sans-serif',
                      borderRadius: '8px',
                      fontSize: '20px'
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          border: 'none', 
                          borderRadius: '8px',
                        },
                      },
                  }}
                  />
              </Grid>
              <Grid item xs={12}>
                <FormLabel htmlFor="car-model" required sx = {{color: 'white', fontFamily: '"Fjalla One", sans-serif'}}> Model </FormLabel>
                <GlowingTextField
                  id="car-model"
                  name="car-model"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  fullWidth
                  required
                  sx={{
                    color: 'white',
                    '& input': {
                      textAlign: 'center', 
                      backgroundColor: '#333' ,
                      color: '#e7d7d7',
                      fontFamily: '"Fjalla One", sans-serif',
                      borderRadius: '8px',
                      fontSize: '20px'
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          border: 'none', 
                          borderRadius: '8px',
                        },
                      },
                  }}/>
              </Grid>
              <Grid item xs={12}>
                <FormLabel htmlFor="car-year" required sx = {{color: 'white', fontFamily: '"Fjalla One", sans-serif'}}> Year </FormLabel>
                <GlowingTextField
                  id="car-year"
                  name="car-yar"
                  value={carYear}
                  onChange={(e) => {
                    const restrictedYear = restrictToFourDigits(e.target.value);
                    setCarYear(restrictedYear); // Set the restricted year in the state
                  }}
                  fullWidth
                  required
                  sx={{
                    color: 'white',
                    '& input': {
                      textAlign: 'center', 
                      backgroundColor: '#333' ,
                      color: '#e7d7d7',
                      fontFamily: '"Fjalla One", sans-serif',
                      borderRadius: '8px',
                      fontSize: '20px'
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          border: 'none', 
                          borderRadius: '8px',
                        },
                      },
                  }}/>
              </Grid>
              <Grid item xs={12}>
                <FormLabel htmlFor="car-mile" required sx = {{color: 'white', fontFamily: '"Fjalla One", sans-serif'}}> Mileage </FormLabel>
                <GlowingTextField
                  id="car-mile"
                  name="car-mile"
                  value={carMile}
                  onChange={(e) => {
                    // format to add commas while typing and restricting input
                    let inputValue = e.target.value;
                    inputValue = inputValue.replace(/[^0-9]/g, '');
                    const formattedValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    setCarMile(formattedValue); 
                  }}
                  fullWidth
                  required
                  sx={{
                    color: 'white',
                    '& input': {
                      textAlign: 'center', 
                      backgroundColor: '#333' ,
                      color: '#e7d7d7',
                      fontFamily: '"Fjalla One", sans-serif',
                      borderRadius: '8px',
                      fontSize: '20px'
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          border: 'none', 
                          borderRadius: '8px',
                        },
                      },
                  }}/>
              </Grid>
              <Grid item xs={12}>
                <FormLabel htmlFor="car-date" required sx = {{color: 'white', fontFamily: '"Fjalla One", sans-serif'}}> Date Puchased </FormLabel>
                <DateInputField 
                  date={carDate} 
                  setDate={setCarDate} 
                  sx={{
                    color: 'white',
                    '& input': {
                      textAlign: 'center', 
                      backgroundColor: '#333' ,
                      color: '#e7d7d7',
                      fontFamily: '"Fjalla One", sans-serif',
                      borderRadius: '8px',
                      fontSize: '20px'
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          border: 'none', 
                          borderRadius: '8px',
                        },
                      },
                  }}
                  />
              </Grid>
            </Grid>
            <Grid container justifyContent="center" alignItems="center" style={{ paddingTop: '30px' }}>
            <SmoothGlassButton onClick={handleSubmit}>
              Add Car
            </SmoothGlassButton>
            </Grid>
          </form>
        </Grid>
      </Grid>
  </div>
);
};

    

export default AddCarForm;