import InputMask from 'react-input-mask';
import GlowingTextField from './GlowingTextField.js'

const DateInputField = ({ date, setDate , slotProps, sx }) => {
  return (
    <InputMask
      mask="99/99/9999" // Mask for date format
      value={date}
      onChange={(e) => setDate(e.target.value)} 
      maskChar={null}
    >
      {() => (
        <GlowingTextField
            fullWidth
            required
            placeholder="MM/DD/YYYY"
            slotProps={{
              inputComponent: InputMask,
              ...slotProps,  // << Spread other input-related props
            }}
            sx={{
              ...sx
            }}
        />
      )}
    </InputMask>
  );
};

export default DateInputField