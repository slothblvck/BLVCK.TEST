import { Checkbox } from '@mui/material'
const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const CheckBox = ({ checked, setChecked }) => {
    return (
        <Checkbox
            {...label}
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            sx={{
                color: '#242730',
                '&.Mui-checked': {
                    color: '#FFF',
                },
            }}
        />
    )
}

export default CheckBox
