import { Popover } from '@mui/material'
import React, { useContext } from 'react'
import { useState } from 'react'
import styles from './UserPopover.module.css'
import { WalletConnectContext } from '../../../hooks/WalletLogin'
import { useNavigate } from 'react-router-dom'

const UserPopover = ({
    id,
    open,
    handleClose,
    anchorEl,
    setLogoutModal,
    bottomOpen,
}) => {
    let navigate = useNavigate()
    const [select, setSelect] = useState(-1)
    const { userInfo } = useContext(WalletConnectContext)

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: bottomOpen ? 'top' : 'bottom',
                horizontal: bottomOpen ? 'left' : 'right',
            }}
            transformOrigin={{
                vertical: bottomOpen ? 'bottom' : 'top',
                horizontal: bottomOpen ? 'center' : 'right',
            }}
            sx={bottomOpen ? { top: '-10px' } : { top: '10px' }}
        >
            <div className={`${styles.popover_wrapper}`}>
                {/* <PopRow
                    text={'Notifications'}
                    selected={select === 1}
                    id={1}
                    setSelect={setSelect}
                    notification={12}
                /> */}
                {/* <div className={styles.divider}></div> */}
                {/* {userInfo?.discordInfo ? (
                    <> */}
                {!userInfo.isAdmin && (
                    <>
                        <PopRow
                            text={'Profile'}
                            selected={select === 1}
                            id={1}
                            setSelect={setSelect}
                            onClick={() => {
                                navigate('/my-profile')
                            }}
                            handleClose={handleClose}
                        />
                        <PopRow
                            text={'Delivery Information'}
                            selected={select === 2}
                            id={2}
                            setSelect={setSelect}
                            onClick={() => {
                                navigate('/delivery-information')
                            }}
                            handleClose={handleClose}
                        />
                    </>
                )}
                {/* </>
                ) : (
                    <PopRow
                        text={'Connect Discord'}
                        selected={select === 1}
                        id={1}
                        setSelect={setSelect}
                        onClick={() => {
                            window.location.assign(
                                process.env.REACT_APP_DISCORD_URL
                            )
                        }}
                    />
                )} */}
                <PopRow
                    text={'Logout'}
                    selected={select === 3}
                    id={3}
                    setSelect={setSelect}
                    onClick={() => {
                        setLogoutModal(true)
                        handleClose()
                    }}
                    handleClose={handleClose}
                />
            </div>
        </Popover>
    )
}

const PopRow = ({
    selected,
    text,
    id,
    setSelect,
    notification,
    onClick,
    handleClose,
}) => {
    return (
        <button
            className={`${styles.pop_row} ${
                selected ? styles.pop_row_selected : ''
            }`}
            onClick={() => {
                setSelect(id)
                handleClose()

                if (onClick) {
                    onClick()
                }
            }}
        >
            <h1
                className={`${styles.pop_row_text} ${
                    selected ? styles.pop_row_text_selected : ''
                }`}
            >
                {text}
            </h1>

            {notification > 0 && (
                <div className={styles.notification_count_box}>
                    <span>{notification > 9 ? '9+' : notification}</span>
                </div>
            )}
        </button>
    )
}

export default UserPopover
