import React ,{useState} from 'react';
import { motion } from 'framer-motion';
import Grid from '@mui/material/Grid2/index.js';
import Checkbox from '@mui/material/Checkbox/index.js';
import SmoothGlassButton from './SmoothGlassButton.js';
const CarListCheck = ({cars,selectedCar, setSelectedCar, handleAddService, handleSnackbarOpen}) => {
    const handleCarSelect = (carId) => {
        if (selectedCar === carId) {
          setSelectedCar(null); // Uncheck if the same car is clicked
        } else {
          setSelectedCar(carId); // Select the car
        }
      };
      
      
  return (
    <div >
      <Grid container spacing={3} direction="column" style = {{justifyContent: 'center', alignItems: 'center' ,minHeight: '565px'}}>
        <h2 className="car-list-header" style={{ color: 'white',fontFamily: '"Fjalla One", sans-serif' }}>My Cars</h2>
        <Grid style={{ flexGrow: 1, marginTop: '15px', height: '100%' , backgroundColor: '#333', padding: '10px', borderRadius: '8px', height: '100%', overflowY: 'auto', width: '100%', minHeight: '470px'  }}>
            <ul style = {{listStyle: 'none', padding: '0', margin: '0' ,maxHeight: '447px', overflowY: 'auto', scrollbarWidth: 'thin',scrollbarColor: '#888 #333'}}className="car-list">
                {cars.length === 0 ? (
                <li style={{ color: 'white' ,fontFamily: '"Fjalla One", sans-serif'}}>No cars found</li>) 
                : (cars.map((car, index) => (
                    <li
                    key={index}
                    style={{
                        fontFamily: '"Fjalla One", sans-serif',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '10px',
                        backgroundColor: selectedCar === car.id ? '#444' : '#555', // Grey out unselected cars
                        borderRadius: '8px',
                        color: 'white',
                        width: '100%',
                        overflow: 'hidden',
                        opacity: selectedCar === null || selectedCar === car.id ? 1 : 0.5, // Grey out unselected cars visually
                        cursor: selectedCar === null || selectedCar === car.id ? 'pointer' : 'not-allowed', // Disable interaction for other cars
                    }}
                    >
                     <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                        {/* Disable the checkbox if a different car is selected */}
                        <Checkbox
                            checked={selectedCar === car.id}
                            disabled={selectedCar !== null && selectedCar !== car.id}
                            onChange={() => handleCarSelect(car.id)}
                            style={{ color: 'white' }}
                        />
                        {/* Car information */}
                        <span style={{ marginLeft: '10px' }}>{car.make} {car.model}, {car.year}</span>
                    </div>
                </li>
                 ))
               )}
            </ul>
        </Grid>
        <SmoothGlassButton onClick={() => {
            if (selectedCar) {
              handleAddService(selectedCar); // Call handleAddService with the selected car ID
            }else{
              handleSnackbarOpen('Pease select a car.')
            }
            }} style={{ marginTop: 'auto' ,fontFamily: '"Fjalla One", sans-serif'}} type="submit" variant="contained" color="primary">
                Submit Service
        </SmoothGlassButton>
      </Grid>
    </div>
  );
};

export default CarListCheck;
