import { Menu, MenuItem } from '@mui/material'
import React from 'react'

const LogoutDropdown = ({ open, handleClose, anchorEl, logout }) => {
    return (
        <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
                style: {
                    width: 'inherit',
                    color: '#fff',
                },
            }}
        >
            <MenuItem>
                <button
                    className='w-full h-full text-left text-lg'
                    onClick={() => {
                        logout()
                        handleClose()
                    }}
                >
                    Logout
                </button>
            </MenuItem>
        </Menu>
    )
}

export default LogoutDropdown
