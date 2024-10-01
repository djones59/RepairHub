import { motion } from 'framer-motion';
import videoBackground from '../videos/background_blurred.mp4';
import './AddCarForm.css';
import React, { useState } from 'react';
import FormLabel from '@mui/material/FormLabel/index.js';
import Grid from '@mui/material/Grid2/index.js';
import TextField from '@mui/material/TextField/index.js';
import Button from '@mui/material/Button/index.js';
import DateInputField from './DateInputField.js';
import GlowingTextField from './GlowingTextField.js'

const AddCarForm = ({ fetchCars , handleSnackbarOpen}) => {
    const [carMake, setCarMake] = useState('');
    const [carModel, setCarModel] = useState('');
    const [carDate, setCarDate] = useState('');
    const [carMile, setCarMile] = useState('');
    const [carYear, setCarYear] = useState('');

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

            handleSnackbarOpen(`${carModel}- ${carYear} added successfully!`)
        })
        .catch((err) => {
            console.error('Error inserting car data:', err);
        });
    };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <video autoPlay loop muted id="background-blurred-video">
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Grid container direction="column" alignItems="flex-start" style={{ paddingTop: '50px' , paddingLeft: '10%' }}>
        <Grid item xs={6} style={{ textAlign: 'center'  }}>
          <h1 style={{  fontSize: '24px', color: 'white'}}>Enter Car Details</h1>
          <form onSubmit={handleSubmit}>
            <Grid  container spacing={3} direction="column" >
              <Grid item xs={12}>
                <FormLabel htmlFor="car-make" required sx = {{color: 'white'}}> Make </FormLabel>
                <TextField
                  value={carMake}
                  onChange={(e) => setCarMake(e.target.value)}
                  fullWidth
                  required
                  sx={{
                    color: 'white',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            border: 'none', // Remove the border
                        },
                      },
                  }}
                  slotProps={{
                    input: {
                      style: { color: '#e7d7d7', backgroundColor: '#333' },
                    },
                    inputLabel: {
                      style: { color: 'white' },
                    },
                  }}/>
              </Grid>
              <Grid item xs={12}>
                <FormLabel htmlFor="car-model" required sx = {{color: 'white'}}> Model </FormLabel>
                <TextField
                  id="car-model"
                  name="car-model"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  fullWidth
                  required
                  sx={{
                    color: 'white',
                    '& input': {
                      textAlign: 'center', // Center the input text
                      fontSize: '20px'
                    },
                  }}
                  slotProps={{
                    input: {
                      style: { color: '#e7d7d7', backgroundColor: '#333'},
                    },
                    inputLabel: {
                      style: { color: 'white' },
                    },
                  }}/>
              </Grid>
              <Grid item xs={12}>
                <FormLabel htmlFor="car-year" required sx = {{color: 'white'}}> Year </FormLabel>
                <TextField
                  id="car-year"
                  name="car-yar"
                  value={carYear}
                  onChange={(e) => setCarYear(e.target.value)}
                  fullWidth
                  required
                  sx={{
                    '& input': {
                      textAlign: 'center', // Center the input text
                      fontSize: '20px'
                    },
                  }}
                  slotProps={{
                    input: {
                      style: { color: '#e7d7d7', backgroundColor: '#333' },
                    },
                    inputLabel: {
                      style: { color: 'white' },
                    },
                  }}/>
              </Grid>
              <Grid item xs={12}>
                <FormLabel htmlFor="car-mile" required sx = {{color: 'white'}}> Mileage </FormLabel>
                <TextField
                  id="car-mile"
                  name="car-mile"
                  value={carMile}
                  onChange={(e) => setCarMile(e.target.value)}
                  fullWidth
                  required
                  sx={{
                    '& input': {
                    textAlign: 'center', 
                    fontSize: '20px'
                  },
                  }}
                  slotProps={{
                    input: {
                      style: { color: '#e7d7d7', backgroundColor: '#333'},
                    },
                    inputLabel: {
                      style: { color: 'white' },
                    },
                  }}/>
              </Grid>
              <Grid item xs={12}>
                <FormLabel htmlFor="car-date" required sx = {{color: 'white'}}> Date Puchased </FormLabel>
                <DateInputField 
                  date={carDate} 
                  setDate={setCarDate} 
                  sx={{
                    textAlign: 'center', 
                    '& input': {
                      textAlign: 'center', 
                      fontSize: '20px'
                    },
                  }}
                  slotProps={{
                    input: {
                      style: {color: 'white' , backgroundColor: '#333' } 
                    }, // Style for the text inside the input
                    disableUnderline: true,
                  }}
                  />
              </Grid>
            </Grid>
            <Grid container justifyContent="center" alignItems="center" style={{ paddingTop: '30px' }}>
              <Button style={{ alignSelf: 'flex-end', marginTop: 'auto' }} type="submit" variant="contained" color="primary">
                Add Car
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
  </motion.div>
);
};

    

export default AddCarForm;