import { motion } from 'framer-motion';
import videoBackground from '../videos/background_blurred.mp4';
import React ,{useState,useEffect} from 'react';
import Grid from '@mui/material/Grid2/index.js';
import Button from '@mui/material/Button/index.js';
import Checkbox from '@mui/material/Checkbox/index.js';

const CarListCheckServ = ({cars , selectedCars, setSelectedCars}) => {
  // function for adding car to list
  const handleCarSelect = (carId) => {
    if (selectedCars.includes(carId)){
        // filter selected car out of list if it already is in the list
        setSelectedCars(selectedCars.filter(id => id !== carId));
    }else {
        // add it to the list if not in it already
        setSelectedCars([...selectedCars, carId])
    }
  }
  const isAllSelected = selectedCars.length === cars.length && cars.length > 0;
  // Handle "Check All" toggle
  const handleCheckAll = () => {
    
    if (isAllSelected) {
      // If all cars are selected, deselect all
      setSelectedCars([]);
    } else {
      // Otherwise, select all cars
      setSelectedCars(cars.map(car => car.id));
    }
  };
  // Automatically select all cars when the component first loads
  useEffect(() => {
    if (cars.length > 0) {
      setSelectedCars(cars.map(car => car.id)); // Select all car IDs by default
    }
  }, [cars, setSelectedCars]);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <video autoPlay loop muted id="background-blurred-video">
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Grid container spacing={1} direction="column" style = {{ justifyContent: 'center', alignItems: 'center' ,minHeight: '600px'}}>
        <h2 className="car-list-header" style={{ color: 'white' }}>My Cars</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <Grid container justifyContent="center" alignItems="center" style = {{ backgroundColor: '#333',padding: '10px', borderRadius: '8px',}}>
          <Checkbox
            checked={isAllSelected}
            indeterminate={selectedCars.length > 0 && !isAllSelected} // Indeterminate if some but not all cars are selected
            onChange={handleCheckAll}
            style={{ color: 'white' }}
          />
          <label style={{ color: 'white' ,marginRight: 15}}>Select All</label>
        </Grid>
        </div>
        <Grid style={{ flexGrow: 1, backgroundColor: '#333', padding: '10px', borderRadius: '8px', height: '100%', overflowY: 'auto', width: '100%', maxHeight: '600px'  }}>
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
                        backgroundColor: '#888', 
                        borderRadius: '8px',
                        color: 'white',
                        width: '100%',
                        overflow: 'hidden',
                    }}
                    >
                     <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                        <Checkbox
                            checked={selectedCars.includes(car.id)}
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
      </Grid>
    </motion.div>
 );
};

export default CarListCheckServ;