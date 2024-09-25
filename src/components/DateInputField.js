import InputMask from 'react-input-mask';
import TextField from '@mui/material/TextField/index.js';

const DateInputField = ({ date, setDate , label, textFieldProps, slotProps, sx }) => {
  return (
    <InputMask
      mask="99/99/9999" // Mask for date format
      value={date}
      onChange={(e) => setDate(e.target.value)} // Update state on input change // Placeholder for date format
      alwaysShowMask={false}
    >
      {() => (
        <TextField
            {...slotProps}
            fullWidth
            required
            label={label}
            placeholder="MM/DD/YYYY"
            {...textFieldProps}  // << Here you spread any custom TextField props passed from outside
            slotProps={{
            inputComponent: InputMask,
            ...slotProps,  // << Spread other input-related props
            }}
            sx={{...sx}}
        />
      )}
    </InputMask>
  );
};

export default DateInputField