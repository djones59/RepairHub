//add-service housing componenet
import React ,{useState} from 'react';
import Grid from '@mui/material/Grid2/index.js';
import AddServiceForm from './AddServiceForm.js';
import CarListCheck from './CarListCheck.js'

const AddService = ({cars ,handleSnackbarOpen}) => {
    //saves data for add service form
    const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const [mileage, setMileage] = useState('')
    // saves data for the list of repairs
    const [repairs, setRepairs] = useState([]);
    // for car list checkbox selected car
    const [selectedCar, setSelectedCar] = useState(null);

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

    return (
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
    );
};

export default AddService