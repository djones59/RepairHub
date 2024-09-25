import React ,{ useState }from 'react';
import { motion } from 'framer-motion';
import Grid from '@mui/material/Grid2/index.js';
import ConfirmDialog from './ConfirmDialog.js';

const CarList = ({cars, fetchCars}) => {

  //for delete button hovering
  const [hoveredIndex, setHoveredIndex] = useState(null);

  //for the dialog box when delete car button is pressed
  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  //delete button handler
  const handleDelete = (carId) => {
    window.electronAPI.deleteCar(carId); // Call the deleteCar function with carId as the argument
    fetchCars();
    handleCloseDialog()
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Grid container spacing={3} direction="column"  style = {{justifyContent: 'center', alignItems: 'center' , minHeight: '615px'}}>
        <h2 style={{ color: 'white' }}>My Cars</h2>
        <Grid style={{ flexGrow: 1, height: '100%' , backgroundColor: '#333', padding: '10px', borderRadius: '8px', height: '100%', width: '100%'  }}>
            <ul style = {{listStyle: 'none', padding: '0', margin: '0' , maxHeight: '510px', overflowY: 'auto', scrollbarWidth: 'thin',scrollbarColor: '#888 #333'}}className="car-list">
              {cars.length === 0 ? (
                <li style = {{color: 'white'}}>No cars found</li>
              ) : (
                cars.map((car, index) => (
                  <li key={index} 
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
                  }}> 
                    <div style ={{marginLeft: '20px'}}>{car.make} {car.model}, {car.year}</div>
                    <button className="custom-delete-button" 
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
                        title="Delete Car"
                        message="Are you sure you want to delete this car?"
                        onConfirm={() => handleDelete(car.id)}
                        onCancel={handleCloseDialog}
                      />
                  </li>
                ))
              )}
            </ul>
          </Grid>
        </Grid>
    </motion.div>
    
  );
};

export default CarList;
