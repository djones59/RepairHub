import React ,{useState, useEffect} from 'react';
import Grid from '@mui/material/Grid2/index.js';
import InputAdornment from '@mui/material/InputAdornment/index.js';
import { motion , AnimatePresence} from 'framer-motion';
import DateInputField from './DateInputField.js';
import ConfirmDialog from './ConfirmDialog.js';
import GlowingTextField from './GlowingTextField.js'
import GlowingSelect from './GlowingSelect.js';


const RepairSearch = ({searchResults, handleDelete}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [selectedOption, setSelectedOption] = useState('search-all');
    const [date, setDate] = useState(''); 
    const [filteredResults, setFilteredResults] = useState([]);

    //for delete button hovering
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [open, setOpen] = useState(false);
    //for the dialog box when delete car button is pressed
    const handleOpenDialog = () => {
      setOpen(true);
    };
    const handleCloseDialog = () => {
      setOpen(false);
    };

    const handleKeyDown = (e) => {
        // Allow numbers, backspace, and delete
        if (
          (e.key >= '0' && e.key <= '9') || // Allow number keys
          e.key === 'Backspace' || // Allow backspace
          e.key === 'Delete' || // Allow delete
          e.key === 'ArrowLeft' || // Allow arrow left
          e.key === 'ArrowRight' // Allow arrow right
        ) {
          return;
        }
        e.preventDefault(); // Prevent all other key inputs
      };
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
      <Grid container direction="column" spacing={2}>
        <h1 style={{ color: 'white',fontFamily: '"Fjalla One", sans-serif' }}>Search Repairs</h1>
        <Grid container direction="row">
          <Grid item style={{ maxWidth: '150px' }}>
            {/* Dropdown Menu */}
            <GlowingSelect
              sx = {{ '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none'
                },
              },}}
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              >
            </GlowingSelect>
          </Grid>
          {selectedOption === 'Price' ? (
            <>
            <Grid item>
                <GlowingTextField
                    variant="outlined"
                    value={priceRange.min}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })} // Update min price
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <span style={{ color: 'white' }}>$</span>
                          </InputAdornment>
                        ),
                      }}
                    sx = {{
                        fontFamily: '"Fjalla One", sans-serif',
                        maxWidth: '100px',
                        backgroundColor: '#333',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              border: 'none', 
                              borderRadius: '8px',
                            },
                        },
                        input: {color: '#e7d7d7'}, 
                    }}
                />
            </Grid>
            <Grid item style={{ alignSelf: 'center' }}>
                <span style={{ color: 'white' ,fontSize: '20px'}}>to</span>
            </Grid>
            <Grid item>
                <GlowingTextField
                    variant="outlined"
                    value={priceRange.max}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })} // Update max price
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <span style={{ color: 'white' }}>$</span>
                          </InputAdornment>
                        ),
                      }}
                    sx = {{
                        fontFamily: '"Fjalla One", sans-serif',
                        maxWidth: '100px',
                        backgroundColor: '#333',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              border: 'none', 
                              borderRadius: '8px',
                            },
                        },
                        input: {color: '#e7d7d7'}, 
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
                        sx={{
                            color: 'white',
                            maxWidth: '100px',
                            minWidth: '100px',
                            '& input': {
                              backgroundColor: '#333' ,
                              color: '#e7d7d7',
                              fontFamily: '"Fjalla One", sans-serif',
                              borderRadius: '8px',
                              fontSize: '16px',
                              
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  border: 'none', 
                                  borderRadius: '8px',
                                },
                              },
                          }}
                    />
                </Grid>
            ) : (
                <Grid item style={{ minWidth: '400px' }}>
                    {/* Single Search Box for non-Price and non-Date options */}
                    <GlowingTextField
                        placeholder ="Search"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery dynamically
                        fullWidth
                        sx={{
                            color: 'white',
                            '& input': {
                              backgroundColor: '#333' ,
                              color: '#e7d7d7',
                              fontFamily: '"Fjalla One", sans-serif',
                              borderRadius: '8px',
                              fontSize: '16px'
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  border: 'none', 
                                  borderRadius: '8px',
                                },
                              },
                          }}
                    />
                </Grid>
            )}
        </Grid>

        <Grid item justifyContent="center" alignItems="center" style={{ borderRadius: '8px', height: '100%', padding: '10px', minWidth: '400px', minHeight: '500px', maxHeight: '500px', backgroundColor: '#333' }}>
          {/* Unordered List for Search Results */}
          <AnimatePresence>
            <motion.ul
              style={{ listStyle: 'none', padding: '0', margin: '0', overflowY: 'auto',maxHeight: '480px',scrollbarWidth: 'thin',scrollbarColor: '#888 #333' }}
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
                    style={{ margin: index === 0 ? '0 0 5px 0' : '5px 0', backgroundColor: '#555', padding: '10px', borderRadius: '8px' ,overflow: 'hidden', display: 'flex', justifyContent: 'space-between',alignItems: 'flex-start',}}
                  >
                    {/* Service Details */}
                    <div style={{ flexGrow: 1 }}>  {/* This div wraps the service details and repairs */}
                        <strong style={{ fontFamily: '"Fjalla One", sans-serif', color: ' #f0f0f0' }}>
                        {service.model}, {service.year}: {service.date} at {service.location}
                        </strong>
                        <p style={{ fontFamily: '"Fjalla One", sans-serif', color: ' #f0f0f0' ,marginBottom: '5px',marginTop: '5px' }}>
                            Total Cost: ${service.total_cost} | Mileage: {service.mileage}
                        </p>
                        <ul style={{ fontFamily: '"Fjalla One", sans-serif', color: ' #f0f0f0', }}>
                            {service.repairs.length > 0 ? (
                                service.repairs.map((repair, idx) => (
                                <li key={idx}>- {repair.description}: ${repair.cost}</li>
                                ))
                            ) : (
                                <li style={{ color: '#f0f0f0', fontFamily: '"Fjalla One", sans-serif' }}>
                                No repairs found for this service
                                </li>
                            )}
                        </ul>
                    </div>
                    {/* button for deleting service */}
                    <button className="custom-delete-button" 
                      tabIndex={open ? -1 : 0}
                      onClick={() => handleOpenDialog()} 
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      style={{ 
                        color: hoveredIndex === index ? '#B22222' : 'white',
                        transition: 'color 0.4s ease',
                        backgroundColor: 'transparent', 
                        border: 'none', 
                        cursor: 'pointer',
                        padding: '10px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 'auto', 
                        
                      }}>
                      <span className="material-symbols-outlined" 
                        style={{
                          fontSize: '30px',
                          padding: '5px',
                          border: 'none'
                        }}> delete
                      </span>
                      
                    </button>
                    <ConfirmDialog
                        open={open}
                        title="Delete Service"
                        message="Are you sure you want to delete this service? This will delete every repair associated with this service."
                        onConfirm={async () => {
                            await handleDelete(service.id);
                            handleCloseDialog();
                        }}
                        onCancel={handleCloseDialog}
                      />
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
  );
};

export default RepairSearch
