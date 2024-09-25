import React ,{useState} from 'react';
import { motion } from 'framer-motion';
import Grid from '@mui/material/Grid2/index.js';
import Button from '@mui/material/Button/index.js';
import Checkbox from '@mui/material/Checkbox/index.js';

const CarListCheck = ({cars, selectedCar, setSelectedCar, handleAddService, handleSnackbarOpen}) => {
    const handleCarSelect = (carId) => {
        if (selectedCar === carId) {
          setSelectedCar(null); // Uncheck if the same car is clicked
        } else {
          setSelectedCar(carId); // Select the car
        }
      };
 
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Grid container spacing={3} direction="column" style = {{ justifyContent: 'center', alignItems: 'center' ,minHeight: '600px'}}>
        <h2 className="car-list-header" style={{ color: 'white' }}>My Cars</h2>
        <Grid style={{ flexGrow: 1, height: '100%' , backgroundColor: '#333', padding: '10px', borderRadius: '8px', height: '100%', overflowY: 'auto', width: '100%', maxHeight: '600px'  }}>
            <ul style = {{listStyle: 'none', padding: '0', margin: '0' ,maxHeight: '510px', overflowY: 'auto', scrollbarWidth: 'thin',scrollbarColor: '#888 #333'}}className="car-list">
                {cars.length === 0 ? (
                <li style={{ color: 'white' }}>No cars found</li>) 
                : (cars.map((car, index) => (
                    <li
                    key={index}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '10px',
                        backgroundColor: selectedCar === car.id ? '#444' : '#888', // Grey out unselected cars
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
        <Button onClick={() => {
            if (selectedCar) {
              handleAddService(selectedCar.id); // Call handleAddService with the selected car ID
            }else{
              handleSnackbarOpen('Pease select a car.')
            }
            }} style={{ marginTop: 'auto' }} type="submit" variant="contained" color="primary">
                Submit Service
        </Button>
      </Grid>
    </motion.div>
  );
};

export default CarListCheck;
