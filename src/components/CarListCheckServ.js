import { motion } from 'framer-motion';
import videoBackground from '../videos/background_blurred.mp4';
import React ,{useState,useEffect} from 'react';
import Grid from '@mui/material/Grid2/index.js';
import Checkbox from '@mui/material/Checkbox/index.js';
const CarListCheckServ = ({cars, selectedCars, setSelectedCars}) => {
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
    <div>
      <video autoPlay loop muted id="background-blurred-video">
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Grid container spacing={1} direction="column" style = {{ justifyContent: 'center', alignItems: 'center' ,minHeight: '600px'}}>
        <h2 style={{ fontSize: '30px',color: 'white',fontFamily: '"Fjalla One", sans-serif' }}>My Cars</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <Grid container justifyContent="center" alignItems="center" style = {{ backgroundColor: '#333',marginTop: '10px',padding: '6px', borderRadius: '8px',}}>
          <Checkbox
            checked={isAllSelected}
            indeterminate={selectedCars.length > 0 && !isAllSelected} // Indeterminate if some but not all cars are selected
            onChange={handleCheckAll}
            style={{ color: 'white' }}
          />
          <label style={{ color: 'white' ,marginRight: 15}}>Select All</label>
        </Grid>
        </div>
        <Grid style={{minHeight: '502px', flexGrow: 1, backgroundColor: '#333', padding: '10px', borderRadius: '8px', height: '100%', overflowY: 'auto', width: '100%', maxHeight: '500px' ,marginTop: '10px' }}>
            <ul style = {{listStyle: 'none', padding: '0', margin: '0' ,maxHeight: '480px', overflowY: 'auto', scrollbarWidth: 'thin',scrollbarColor: '#888 #333'}}className="car-list">
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
                        backgroundColor: '#555', 
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
                        <span style={{ marginLeft: '10px',fontFamily: '"Fjalla One", sans-serif' }}>{car.make} {car.model}, {car.year}</span>
                    </div>
                </li>
                 ))
               )}
            </ul>
        </Grid>
      </Grid>
    </div>
 );
};

export default CarListCheckServ;