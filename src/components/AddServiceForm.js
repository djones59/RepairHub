import React, { useState } from 'react';
import Grid from '@mui/material/Grid2/index.js';
import Button from '@mui/material/Button/index.js';
import videoBackground from '../videos/background_blurred.mp4';
import { motion ,AnimatePresence} from 'framer-motion';
import TextField from '@mui/material/TextField/index.js';
import DateInputField from './DateInputField.js';
const AddServiceForm = ({
    location, setLocation,
    date, setDate,
    mileage, setMileage,
    repairs,setRepairs,
}) => {
    const [description, setDescription] = useState(''); // State to store current repair input
    const [cost, setCost] = useState('');
    
    const handleSubmitRepar = (e) =>{
        e.preventDefault();
        if (description && cost) {
            // Add the new repair to the array
            setRepairs([...repairs, { description, cost }]);

            // Log the new state of the repairs array
            console.log('Updated repairs:', [...repairs, { description, cost }]);

            // Reset the fields
            setDescription('');
            setCost('');
        } else {
            alert('Please fill out all fields');
  }
    }
    const handleDeleteRepair = (index) => {
        // Create a new array without the repair at the specified index
        const updatedRepairs = repairs.filter((_, i) => i !== index);
        // Update the repairs state with the new array
        setRepairs(updatedRepairs);
    }

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <video autoPlay loop muted id="background-blurred-video">
            <source src={videoBackground} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <Grid  key = "main"  container direction="column" spacing = {2}  style = {{paddingLeft: '20px'}}>
            <h1 style={{  fontSize: '24px', color: 'white'}}> Enter Service Details</h1>
                <Grid key = "first form?" style = {{paddingTop: '33px'}}>
                    <Grid container spacing={2}  >
                        <Grid item xs={12} style = {{maxWidth: '200px'}}>
                            <TextField
                                id="location"
                                name="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                fullWidth
                                autoComplete="off" 
                                placeholder='Location'
                                required
                                sx={{
                                    backgroundColor: '#979292',
                                    borderRadius: '8px',
                                    color: 'white',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            border: 'none', // Remove the border
                                        },
                                        },
                                }}
                                inputProps={{
                                    style: { color: 'white' },
                                }}
                                slotProps={{
                                    input: {
                                    style: { color: '#e7d7d7', backgroundColor: '#333', borderRadius: '5px' },
                                    },
                                    inputLabel: {
                                    style: { color: 'white' },
                                    },
                                }}/>
                        </Grid>
                        <Grid item xs={12} style = {{maxWidth: '200px'}}>
                            <DateInputField 
                                date ={date}
                                setDate = {setDate}
                                sx={{
                                    //borderRadius: '8px',
                                    color: 'white',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            border: 'none', // Remove the border
                                        },
                                    },
                                }}
                                slotProps={{
                                    input: {
                                        style: { color: '#e7d7d7', backgroundColor: '#333', borderRadius: '5px' },
                                    },
                                    inputLabel: {
                                        style: { color: 'white' },
                                    },
                                }}/>
                        </Grid>
                        <Grid item xs={12} style = {{maxWidth: '200px'}}>
                            <TextField
                                id="mileage"
                                name="mileage"
                                value={mileage}
                                onChange={(e) => setMileage(e.target.value)}
                                fullWidth
                                required
                                autoComplete="off" 
                                placeholder='Mileage'
                                sx={{
                                    backgroundColor: '#979292',
                                    borderRadius: '8px',
                                    color: 'white',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            border: 'none', // Remove the border
                                        },
                                        },
                                }}
                                slotProps={{
                                    input: {
                                        style: { color: '#e7d7d7', backgroundColor: '#333', borderRadius: '5px' },
                                    },
                                    inputLabel: {
                                        style: { color: 'white' },
                                    },
                                }}/>
                        </Grid>
                    </Grid>
                </Grid>
                    <form onSubmit = {handleSubmitRepar} style={{ height: '100%', overflowY: 'auto', width: '100%', minHeight: '300px' }}>
                        <Grid container spacing={2} style = {{ paddingLeft: '20px' ,flexGrow: 1, height: '100%' , backgroundColor: '#333', padding: '10px', borderRadius: '8px', height: '100%', width: '100%', maxHeight: '600px'  }} >
                            <ul style = {{listStyle: 'none', padding: '0', margin: '0' ,minHeight: '300px', maxHeight: '300px', overflowY: 'auto', scrollbarWidth: 'thin',scrollbarColor: '#888 #333' }}className="repair-list">
                                {repairs.length === 0 ? (
                                    <li style = {{color: 'white'}}>Add Some Repairs!</li>
                                ) : (
                                    repairs.map((repair, index) => (
                                    <AnimatePresence>
                                    <motion.li
                                    initial={{ opacity: 0}}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
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
                                    }}> 
                                        <div style ={{marginLeft: '20px' , marginRight: '20px' }}> {repair.description} : ${repair.cost}</div>
                                        <button className="custom-delete-button" 
                                            onClick={() =>{ handleDeleteRepair(index);} }
                                            style={{ 
                                                backgroundColor: '#444', 
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
                                                color: 'gray',
                                                fontSize: '30px',
                                                padding: '5px',
                                                border: '0px solid gray'
                                                }}> delete
                                            </span>
                                        </button>
                                    </motion.li>
                                    </AnimatePresence>
                                    ))
                                    )}
                                </ul>
                        </Grid>
                        <Grid container spacing={2} style = {{paddingTop : '20px' }} >
                            <Grid item xs={12} style = {{minWidth: '300px'}}>
                                <TextField
                                    id="Description"
                                    name="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    fullWidth
                                    required
                                    autoComplete="off" 
                                    placeholder='Description'
                                    sx={{
                                        backgroundColor: '#979292',
                                        borderRadius: '8px',
                                        color: 'white',
                                        '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            border: 'none', // Remove the border
                                        },
                                        },
                                    }}
                                    slotProps={{
                                        input: {
                                            style: { color: '#e7d7d7', backgroundColor: '#333', borderRadius: '5px' },
                                        },
                                        inputLabel: {
                                            style: { color: 'white' },
                                        },
                                    }}/>
                            </Grid>
                            <Grid item xs={12} style = {{maxWidth: '100px'}}>
                                <TextField
                                    id="Cost"
                                    name="Cost"
                                    value={cost}
                                    onChange={(e) => setCost(e.target.value)}
                                    fullWidth
                                    required
                                    autoComplete="off" 
                                    placeholder='Cost'
                                    sx={{
                                        backgroundColor: '#979292',
                                        borderRadius: '8px',
                                        color: 'white',
                                        '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            border: 'none', // Remove the border
                                        },
                                        },
                                    }}
                                    slotProps={{
                                        input: {
                                            style: { color: '#e7d7d7', backgroundColor: '#333', borderRadius: '5px' },
                                        },
                                        inputLabel: {
                                            style: { color: 'white' },
                                        },
                                    }}/>
                            </Grid>
                            <Grid item xs={3}md = {2} > 
                                <Button  style={{ alignSelf: 'flex-end', marginTop: 'auto' }} type="submit" variant="contained" color="primary">
                                    Add Repair
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid >
      </motion.div>
    )


}

export default AddServiceForm;