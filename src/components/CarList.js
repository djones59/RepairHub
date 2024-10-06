import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Grid from '@mui/material/Grid2/index.js';
import ConfirmDialog from './ConfirmDialog.js';

const CarList = ({ cars, fetchCars }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null); // Track selected car ID for deletion

  const handleOpenDialog = (carId) => {
    setSelectedCarId(carId); // Set the selected car ID
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedCarId(null); // Clear selected car ID
  };

  const handleDelete = (carId) => {
    window.electronAPI.deleteCar(carId); // Call the deleteCar function with the correct carId
    fetchCars();
    handleCloseDialog();
  };

  return (
    <div>
      <Grid
        container
        spacing={2}
        direction="column"
        style={{ justifyContent: 'center', alignItems: 'center', minHeight: '615px' }}
      >
        <h2 style={{ color: 'white', fontFamily: '"Fjalla One", sans-serif' }}>My Cars</h2>
        <Grid style={{ flexGrow: 1,minHeight: '560px',height: '100%', backgroundColor: '#333', padding: '10px',borderRadius: '8px',width: '100%',}}>
          <ul
            style={{
              listStyle: 'none',
              padding: '0',
              margin: '0',
              maxHeight: '545px',
              overflowY: 'auto',
              scrollbarWidth: 'thin',
              scrollbarColor: '#888 #333',
            }}
            className="car-list"
          >
            {cars.length === 0 ? (
              <li style={{ color: 'white', fontFamily: '"Fjalla One", sans-serif' }}>No cars found</li>
            ) : (
              cars.map((car, index) => (
                <AnimatePresence key={car.id}>
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '10px',
                      backgroundColor: '#555',
                      borderRadius: '8px',
                      color: 'white',
                      width: '100%',
                      minWidth: '200px',
                      maxWidth: '340px',
                      overflow: 'hidden',
                      padding: '10px',
                    }}
                  >
                    <div style={{ marginLeft: '10px', fontFamily: '"Fjalla One", sans-serif' }}>
                      {car.make} {car.model}, {car.year}
                      <ul
                        style={{
                          marginTop: '5px',
                          fontFamily: '"Fjalla One", sans-serif',
                          listStyleType: 'disc',
                          marginLeft: '6px',
                        }}
                      >
                        <li>{car.curr_mileage} miles</li>
                        <li>Purchased: {car.date_issued}</li>
                      </ul>
                    </div>
                    <button
                      className="custom-delete-button"
                      onClick={() => handleOpenDialog(car.id)} // Pass the correct car ID to the dialog
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
                      }}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{
                          fontSize: '30px',
                          padding: '5px',
                          border: 'none',
                        }}
                      >
                        delete
                      </span>
                    </button>
                  </motion.li>
                </AnimatePresence>
              ))
            )}
          </ul>
        </Grid>
      </Grid>

      <ConfirmDialog
        open={open}
        title="Delete Car"
        message="Are you sure you want to delete this car?"
        onConfirm={() => handleDelete(selectedCarId)} // Use the stored car ID
        onCancel={handleCloseDialog}
      />
  </div>
  );
};

export default CarList;
