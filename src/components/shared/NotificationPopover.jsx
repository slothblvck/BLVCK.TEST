import { useContext, useEffect, useState } from 'react'
import Popover from '@mui/material/Popover'
import NotificationCard from './NotificationCard'
import { WalletConnectContext } from '../../hooks/WalletLogin'

export default function NotificationPopover({ Gift, styles }) {
    const {
        notifications,
        notificationLoading,
        setReadStatus,
        updateLocalUserInfo,
        isWalletLogin,
        userInfo,
    } = useContext(WalletConnectContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    useEffect(() => {
        const updateData = async () => {
            if (open && userInfo.winnersRead) {
                await setReadStatus()
            }
        }

        updateData()
    }, [open])

    return (
        <div>
            <div
                className={`${styles.cardBg} cursor-pointer relative ${
                    open ? 'bg-white' : ''
                }`}
                onClick={handleClick}
            >
                {/* <SearchSvg /> */}
                <img src={Gift} alt='' className={`${open ? 'invert' : ''}`} />
                {!open && userInfo.winnersRead && (
                    <div className='absolute bg-[#FF0000] w-2 h-2 -top-1 -right-1 rounded-full'></div>
                )}
            </div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                sx={{
                    marginTop: '5px',
                }}
            >
                <div className='flex flex-col min-h-[80px] w-[330px] max-h-[400px] bg-[#0D0E12] border border-[#3A3C40] drop-shadow-[0px_5px_15px_rgba(0,0,0,0.2))]'>
                    <div className='h-[45px] p-[12px_16px] w-full bg-[#000]'>
                        <h1 className='text-sm font-[500] text-white'>
                            Notifications
                        </h1>
                    </div>
                    {notifications?.length > 0 ? (
                        <div className='h-full flex flex-col w-full overflow-scroll '>
                            {notifications.map((winner, key) => (
                                <NotificationCard key={key} winner={winner} />
                            ))}
                        </div>
                    ) : (
                        <div className='h-[35px] w-full flex items-center justify-center'>
                            <p className='text-sm font-[400] text-white text-center opacity-50'>
                                Oops! Nothing to Show :(
                            </p>
                        </div>
                    )}
                </div>
            </Popover>
        </div>
    )
}
