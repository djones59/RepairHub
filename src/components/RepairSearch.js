import React ,{useState, useEffect} from 'react';
import Grid from '@mui/material/Grid2/index.js';
import TextField from '@mui/material/TextField/index.js';
import Button from '@mui/material/Button/index.js';
import InputAdornment from '@mui/material/InputAdornment/index.js';
import Select from '@mui/material/Select/index.js';
import MenuItem from '@mui/material/MenuItem/index.js';
import { motion , AnimatePresence} from 'framer-motion';
import DateInputField from './DateInputField.js';

const RepairSearch = ({searchResults}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [selectedOption, setSelectedOption] = useState('search-all');
    const [date, setDate] = useState(''); 
    const [filteredResults, setFilteredResults] = useState([]);
    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase();

        const filtered = searchResults.filter(service => {
            if (selectedOption === 'Date') {
                return service.date === date; // Match service date with the selected date
            } else if (selectedOption === 'Location') {
                return service.location.toLowerCase().includes(lowercasedQuery);
            } else if (selectedOption === 'Description') {
                return service.repairs.some(repair =>
                    repair.description.toLowerCase().includes(lowercasedQuery)
                );
            } else if (selectedOption === 'Price') {
                const min = parseFloat(priceRange.min) || 0;
                const max = parseFloat(priceRange.max) || Infinity;
                return service.total_cost >= min && service.total_cost <= max;
            }
            return true; // Default: show all results
        });

        setFilteredResults(filtered);
    }, [searchQuery, priceRange, date, selectedOption, searchResults]);
       /*
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
        setSearchResults(dummyServices)    */ 

    return(
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Grid container direction="column" spacing={2}>
        <h1 style={{ color: 'white' }}>Search Repairs</h1>
        <Grid container direction="row">
          <Grid item style={{ maxWidth: '150px' }}>
            {/* Dropdown Menu */}
            <Select
              style={{ backgroundColor: '#333', color: 'white' }}
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              displayEmpty
              fullWidth
            >
              <MenuItem value="search-all">Search All</MenuItem>
              <MenuItem value="Description">Description</MenuItem>
              <MenuItem value="Price">Price</MenuItem>
              <MenuItem value="Location">Location</MenuItem>
              <MenuItem value="Date">Date</MenuItem>
              {/* Add more options here as needed */}
            </Select>
          </Grid>
          {selectedOption === 'Price' ? (
            <>
            <Grid item>
                <TextField
                    variant="outlined"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })} // Update min price
                  
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment  position="start" style={{ color: 'white' }}>$</InputAdornment>,
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                            style: {  color: '#e7d7d7', backgroundColor: '#333', borderRadius: '5px' },
                        },
                        inputLabel: {
                            style: { color: 'white' },
                        },
                    }}
                />
            </Grid>
            <Grid item style={{ alignSelf: 'center' }}>
                <span style={{ color: 'white' ,fontSize: '20px'}}>to</span>
            </Grid>
            <Grid item>
                <TextField
                    variant="outlined"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })} // Update max price
                  
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment style={{ color: 'white' }} position="start">$</InputAdornment>,
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                            style: {  color: '#e7d7d7', backgroundColor: '#333', borderRadius: '5px' },
                        },
                        inputLabel: {
                            style: { color: 'white' },
                        },
                    }}
                />
            </Grid>
            </>
            ) : selectedOption === 'Date' ? (
                <Grid item style={{ minWidth: '400px' }}>
                    {/* Date Input Field for Date option */}
                    <DateInputField
                        date={date}
                        setDate={setDate}
                        label="Enter Date"
                        textFieldProps={{ style: { backgroundColor: '#333', color: 'white' } }}
                        sx={{ borderRadius: '5px' }}
                    />
                </Grid>
            ) : (
                <Grid item style={{ minWidth: '400px' }}>
                    {/* Single Search Box for non-Price and non-Date options */}
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery dynamically
                        fullWidth
                        style={{
                            backgroundColor: '#333',
                            color: '#e7d7d7',
                            borderRadius: '5px',
                        }}
                        InputLabelProps={{ style: { color: 'white' } }}
                    />
                </Grid>
            )}
        </Grid>

        <Grid item justifyContent="center" alignItems="center" style={{ borderRadius: '8px', height: '100%', padding: '10px', minWidth: '400px', minHeight: '500px', maxHeight: '500px', backgroundColor: '#333' }}>
          {/* Unordered List for Search Results */}
          <AnimatePresence>
            <motion.ul
              style={{ listStyle: 'none', padding: '0', margin: '0', overflowY: 'auto' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredResults.length > 0 ? (
                filteredResults.map((service, index) => (
                  <motion.li
                    key={service.id}
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    style={{ margin: index === 0 ? '0 0 5px 0' : '5px 0', backgroundColor: '#888', padding: '10px', borderRadius: '8px' ,overflow: 'hidden',}}
                  >
                    {/* Service Details */}
                    <strong>Service {service.id}: {service.date} at {service.location}</strong>
                    <p>Total Cost: ${service.total_cost} | Mileage: {service.mileage}</p>

                    {/* Inner Loop: Loop through the array of repairs associated with this service */}
                    <ul>
                      {service.repairs.length > 0 ? (
                        service.repairs.map((repair, idx) => (
                          <li key={idx}>- {repair.description}: ${repair.cost}</li>
                        ))
                      ) : (
                        <li>No repairs found for this service</li>
                      )}
                    </ul>
                  </motion.li>
                ))
              ) : (
                <motion.li
                  key="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: 'white' }}
                >
                  No results found
                </motion.li>
              )}
            </motion.ul>
          </AnimatePresence>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default RepairSearch
