//add-car housing component AddCar.js
import React  from 'react';
import Grid from '@mui/material/Grid2/index.js';
import AddCarForm from './AddCarForm.js';
import CarList from './CarList.js';

const AddCar = ({ cars,fetchCars, handleSnackbarOpen}) => {
    
    return (
        <Grid key="main" container direction="row" spacing={3} style={{ paddingRight: '50px', minHeight: '80px', maxHeight: '800px' }}>
            <Grid item xs={12} md={7} style = {{marginLeft: '200px' , WebkitAppRegion: 'no-drag'}}  >
                <AddCarForm fetchCars={fetchCars} handleSnackbarOpen = {handleSnackbarOpen} />
            </Grid>
            <Grid item xs={12} md={5} style={{ WebkitAppRegion: 'no-drag', paddingTop: '50px' ,borderRadius: '8px',width: '100%', maxWidth: '400px',height: 'auto', minHeight: '600px', marginLeft: '70px', }}>
                <CarList cars={cars} fetchCars={fetchCars} />
            </Grid>
        </Grid>
    );
};
export default AddCar