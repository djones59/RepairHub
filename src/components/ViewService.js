import React ,{useState, useEffect} from 'react';
import Grid from '@mui/material/Grid2/index.js';
import RepairSearch from './RepairSearch.js'
import CarListCheckServ from './CarListCheckServ.js';

const ViewService = ({cars, handleSnackbarOpen}) => {
    const [selectedCars, setSelectedCars] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const reloadSearchResults = async () => {
        try {
           
          const services = await window.electronAPI.getAllServices();
          const resultsWithRepairs = await Promise.all(
            services.map(async (service) => {
              const repairs = await window.electronAPI.getAllRepairs(service.id);
              return {
                ...service,
                repairs,
              };
            })
          );
    
          const filteredServices = selectedCars.length > 0
            ? resultsWithRepairs.filter((service) => selectedCars.includes(service.car_id))
            : [];
         
            const dummyServices = [
                {
                  id: 1,
                  car_id: 101,
                  date: "02/12/2019",
                  total_cost: 150,
                  mileage: 160000,
                  location: "Smith Chevy",
                  repairs: [
                    { id: 1, description: "Oil change", cost: 50 },
                    { id: 2, description: "Brakes", cost: 100 },
                  ]
                },
                {
                  id: 2,
                  car_id: 101,
                  date: "02/12/2015",
                  total_cost: 440,
                  mileage: 160000,
                  location: "Smith Chevy",
                  repairs: [
                    { id: 3, description: "Oil change", cost: 50 },
                    { id: 4, description: "Tire Replacement", cost: 200 },
                    { id: 5, description: "Battery Replacement", cost: 190 },
                  ]
                },
                {
                  id: 3,
                  car_id: 102,
                  date: "03/05/2018",
                  total_cost: 220,
                  mileage: 80000,
                  location: "Quick Lube",
                  repairs: [
                    { id: 6, description: "Transmission Flush", cost: 150 },
                    { id: 7, description: "Coolant Replacement", cost: 70 },
                  ]
                },
                {
                  id: 4,
                  car_id: 103,
                  date: "06/10/2017",
                  total_cost: 500,
                  mileage: 120000,
                  location: "Auto Repair Hub",
                  repairs: [
                    { id: 8, description: "Brake Pads", cost: 150 },
                    { id: 9, description: "Suspension Work", cost: 350 },
                  ]
                },
                {
                  id: 5,
                  car_id: 104,
                  date: "09/12/2016",
                  total_cost: 100,
                  mileage: 45000,
                  location: "Smith Chevy",
                  repairs: [
                    { id: 10, description: "Oil change", cost: 50 },
                    { id: 11, description: "Wiper Replacement", cost: 50 },
                  ]
                },
                {
                  id: 6,
                  car_id: 105,
                  date: "10/21/2019",
                  total_cost: 300,
                  mileage: 90000,
                  location: "Auto Repair Hub",
                  repairs: [
                    { id: 12, description: "Battery Replacement", cost: 150 },
                    { id: 13, description: "Brake Fluid Replacement", cost: 150 },
                  ]
                },
                {
                  id: 7,
                  car_id: 106,
                  date: "12/15/2018",
                  total_cost: 220,
                  mileage: 100000,
                  location: "Quick Lube",
                  repairs: [
                    { id: 14, description: "Tire Replacement", cost: 220 },
                  ]
                },
                {
                  id: 8,
                  car_id: 107,
                  date: "01/09/2020",
                  total_cost: 180,
                  mileage: 65000,
                  location: "AutoFix Garage",
                  repairs: [
                    { id: 15, description: "Brake Pads", cost: 90 },
                    { id: 16, description: "Oil change", cost: 90 },
                  ]
                },
                {
                  id: 9,
                  car_id: 108,
                  date: "05/25/2017",
                  total_cost: 100,
                  mileage: 50000,
                  location: "Smith Chevy",
                  repairs: [
                    { id: 17, description: "Air Filter Replacement", cost: 50 },
                    { id: 18, description: "Oil change", cost: 50 },
                  ]
                },
                {
                  id: 10,
                  car_id: 109,
                  date: "08/08/2021",
                  total_cost: 600,
                  mileage: 70000,
                  location: "Auto Repair Hub",
                  repairs: [
                    { id: 19, description: "Timing Belt Replacement", cost: 600 },
                  ]
                }
             ];
          setSearchResults(filteredServices);
          //setSearchResults(dummyServices);
          
         
        } catch (error) {
          console.error("Error fetching services or repairs:", error);
        }
      };
    useEffect(() => {
        reloadSearchResults();
    }, [selectedCars]);

    const handleDelete = async (serviceId) => {
        try {
            await window.electronAPI.deleteService(serviceId);
            // Re-fetch and filter services after deleting a service
            reloadSearchResults();
          } catch (error) {
            console.error("Error deleting service:", error);
          }
        
    }
    return (
        <Grid container direction="row"  style = {{marginLeft: '60px'}}>
            <Grid item xs={12} md={7} style = {{ WebkitAppRegion: 'no-drag', minWidth: '700px',borderRadius: '8px', marginTop: '30px'}} >
                <RepairSearch  searchResults = {searchResults} handleSnackbarOpen = {handleSnackbarOpen} handleDelete = {handleDelete}/>
            </Grid>
            <Grid item xs={12} md={5} style={{ WebkitAppRegion: 'no-drag',marginTop: '22px', borderRadius: '8px',width: '100%', maxWidth: '400px',height: 'auto', minHeight: '600px', marginLeft: '50px' }}>
                <CarListCheckServ cars = {cars} selectedCars = {selectedCars} setSelectedCars = {setSelectedCars}  />
            </Grid>
        </Grid>
    );
};

export default ViewService