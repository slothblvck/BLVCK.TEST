import { Menu, MenuItem } from '@mui/material'
import React from 'react'

const styles = {
    button: `w-full h-full text-left text`,
}

const NftTypeSelect = ({
    open,
    handleClose,
    anchorEl,
    setActive,
    userInfo,
}) => {
    return (
        <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            style={{ width: '100%' }}
            // MenuListProps={{
            //     'aria-labelledby': 'basic-button',
            // }}
            // style={{
            //     width: '100%',
            // }}
        >
            <MenuItem>
                <button
                    className={styles.button}
                    value='All Items'
                    onClick={(event) => {
                        // setSortType('All Items')
                        handleClose(event)
                        setActive(-1)
                    }}
                >
                    All Items
                </button>
            </MenuItem>
            <MenuItem>
                <button
                    className={styles.button}
                    value='Raffle'
                    onClick={(event) => {
                        // setSortType('Raffle')
                        handleClose(event)
                        setActive(0)
                    }}
                >
                    Raffle
                </button>
            </MenuItem>
            <MenuItem>
                <button
                    className={styles.button}
                    value='Whitelisted'
                    onClick={(event) => {
                        // setSortType('Whitelisted')
                        handleClose(event)
                        setActive(1)
                    }}
                >
                    Whitelisted
                </button>
            </MenuItem>
            <MenuItem>
                <button
                    className={styles.button}
                    value='Items'
                    onClick={(event) => {
                        // setSortType('Items')
                        handleClose(event)
                        setActive(3)
                    }}
                >
                    Items
                </button>
            </MenuItem>
            {!userInfo.isAdmin && (
                <MenuItem>
                    <button
                        className={styles.button}
                        value='You WON'
                        onClick={(event) => {
                            // setSortType('Items')
                            handleClose(event)
                            setActive(4)
                        }}
                    >
                        You WON
                    </button>
                </MenuItem>
            )}
        </Menu>
    )
}

export default NftTypeSelect
