import { Menu, MenuItem } from '@mui/material'
import React from 'react'

const TopSelect = ({
    open,
    handleClose,
    anchorEl,
    setSortType,
    setActive,
    isWalletLogin,
    userInfo,
}) => {
    return (
        <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            // MenuListProps={{
            //     'aria-labelledby': 'basic-button',
            // }}
            style={{
                width: '100%',
            }}
        >
            <MenuItem>
                <button
                    className='w-full h-full text-left text-xl'
                    value='Ongoing'
                    onClick={(event) => {
                        setSortType(1)
                        handleClose(event)
                        setActive(1)
                    }}
                >
                    Ongoing
                </button>
            </MenuItem>
            {isWalletLogin && !userInfo?.isAdmin && (
                <MenuItem>
                    <button
                        className='w-full h-full text-left text-xl'
                        value='Partcipated'
                        onClick={(event) => {
                            setSortType(2)
                            handleClose(event)
                            setActive(2)
                        }}
                    >
                        Partcipated
                    </button>
                </MenuItem>
            )}
            {!userInfo?.isAdmin && (
                <MenuItem>
                    <button
                        className='w-full h-full text-left text-xl'
                        value='Expired'
                        onClick={(event) => {
                            setSortType(3)
                            setActive(3)
                            handleClose(event)
                        }}
                    >
                        Expired
                    </button>
                </MenuItem>
            )}
            {userInfo?.isAdmin && (
                <MenuItem>
                    <button
                        className='w-full h-full text-left text-xl'
                        value='Completed'
                        onClick={(event) => {
                            setSortType(4)
                            setActive(4)
                            handleClose(event)
                        }}
                    >
                        Completed
                    </button>
                </MenuItem>
            )}
        </Menu>
    )
}

export default TopSelect
