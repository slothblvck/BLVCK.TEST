import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import { WalletConnectContext } from '../../hooks/WalletLogin'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    }
}

const DiscordRoleSelect = ({ personName, setPersonName }) => {
    const theme = useTheme()
    const { roles } = React.useContext(WalletConnectContext)

    const handleChange = (event) => {
        const {
            target: { value },
        } = event
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        )
    }

    // console.log(personName)

    return (
        <div className='discord__ROLE__LIMIT text-white border w-full rounded border-lightBlue mt-2 relative'>
            <FormControl
                sx={{
                    width: '100%',
                    borderColor: 'white',
                    '&.MuiOutlinedInput-root': {
                        borderColor: 'white',
                    },
                    '&.before': {
                        borderColor: 'white',
                    },
                }}
                style={{ width: '100%', position: 'relative' }}
            >
                <Select
                    labelId='demo-multiple-chip-label'
                    id='demo-multiple-chip'
                    multiple
                    value={personName}
                    onChange={handleChange}
                    className='focus:outline-none focus:border-none'
                    // input={
                    //     <OutlinedInput id='select-multiple-chip' label='Chip' />
                    // }
                    sx={{
                        borderColor: 'white',
                        color: 'white',
                        '&:focus': {
                            backgroundColor: '#242730',
                        },
                    }}
                    renderValue={(selected) => (
                        <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                        >
                            {selected.map((value) => (
                                <Chip
                                    key={value}
                                    label={value}
                                    sx={{
                                        color: 'white',
                                        background:
                                            'linear-gradient(28.99deg, #0F0F10 0.84%, #212227 92.25%)',
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {roles?.map((name) => {
                        if (name.name === '@everyone') return null
                        return (
                            <MenuItem
                                key={name.name}
                                value={name.name}
                                style={getStyles(name.name, personName, theme)}
                                sx={{ borderColor: 'white' }}
                            >
                                {name.name}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </div>
    )
}

export default DiscordRoleSelect
