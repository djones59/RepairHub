import React ,{useState, useEffect} from 'react';
import Grid from '@mui/material/Grid2/index.js';
import RepairSearch from './RepairSearch.js'
import CarListCheckServ from './CarListCheckServ.js';

const ViewService = ({cars}) => {
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
          
          setSearchResults(filteredServices);
        } catch (error) {
          console.error("Error fetching services or repairs:", error);
        }
      };
    useEffect(() => {
        reloadSearchResults();
    }, [selectedCars]);
    return (
        <Grid container direction="row"  style = {{marginLeft: '60px'}}>
            <Grid item xs={12} md={7} style = {{ WebkitAppRegion: 'no-drag', minWidth: '700px',borderRadius: '8px', marginTop: '30px'}} >
                <RepairSearch  searchResults = {searchResults}/>
            </Grid>
            <Grid item xs={12} md={5} style={{ WebkitAppRegion: 'no-drag',marginTop: '30px', borderRadius: '8px',width: '100%', maxWidth: '400px',height: 'auto', minHeight: '600px', marginLeft: '50px', border: '1px solid blue' }}>
                <CarListCheckServ cars = {cars} selectedCars = {selectedCars} setSelectedCars = {setSelectedCars}  />
            </Grid>
        </Grid>
    );
};

export default ViewService