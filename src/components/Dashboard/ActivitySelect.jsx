import { Menu, MenuItem } from '@mui/material'
import React from 'react'

const ActivitySelect = ({ open, handleClose, anchorEl, setSortType }) => {
    return (
        <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
                style: {
                    width: '100%',
                    color: '#000',
                },
            }}
        >
            <MenuItem>
                <button
                    className='w-full h-full text-left'
                    value='Last 7 Days'
                    onClick={(event) => {
                        setSortType(1)
                        handleClose(event)
                    }}
                >
                    Last 7 Days
                </button>
            </MenuItem>
            <MenuItem>
                <button
                    className='w-full h-full text-left'
                    value='Last 1 Month'
                    onClick={(event) => {
                        setSortType(2)
                        handleClose(event)
                    }}
                >
                    Last 1 Month
                </button>
            </MenuItem>
            <MenuItem>
                <button
                    className='w-full h-full text-left'
                    value='Last 3 Months'
                    onClick={(event) => {
                        setSortType(3)
                        handleClose(event)
                    }}
                >
                    Last 3 Months
                </button>
            </MenuItem>
            <MenuItem>
                <button
                    className='w-full h-full text-left'
                    value='Last 1 Year'
                    onClick={(event) => {
                        setSortType(4)
                        handleClose(event)
                    }}
                >
                    Last 1 Year
                </button>
            </MenuItem>
        </Menu>
    )
}

export default ActivitySelect
