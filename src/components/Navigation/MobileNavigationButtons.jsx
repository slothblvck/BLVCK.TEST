import React, { useContext, useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { WalletConnectContext } from '../../hooks/WalletLogin'
import { useLocation } from 'react-router-dom'
import { NavLinks } from '../../data/Navbar/Navbar'
import MobileNavLink from './MobileNavLink'
import LogoutModal from '../shared/modals/LogoutModal'
import LogoutSvg from '../../assets/svg/LogoutSvg'
import UserPopover from '../shared/Popovers/UserPopover'
import MoreIconSvg from '../../assets/svg/MoreIconSvg'
import EventsSvg from '../../assets/svg/EventsSvg'
import EcosystemSvg from '../../assets/svg/EcosystemSvg'
import { MarketSvg } from '../../assets/svg/MarketSvg'
import { StakingSvg } from '../../assets/svg/StakingSvg'
import { DashboardSvg } from '../../assets/svg/DashboardSvg'
import LogoutIconSvg from '../../assets/svg/LogoutIconSvg'
import { SwipeableDrawer } from '@mui/material'
import MenuPage from '../shared/MenuPage'

const MobileNavigationButtons = () => {
    const location = useLocation()
    const [active, setActive] = useState(1)
    const [openMenu, setOpenMenu] = useState(false)
    const [logoutModal, setLogoutModal] = useState(false)
    const { isWalletLogin, logout, userInfo } = useContext(WalletConnectContext)

    useEffect(() => {
        const current = location.pathname.split('/')[1]
        switch (current) {
            // case 'market-place':
            //     setActive(2)
            //     return
            case 'staking':
                setActive(3)
                return
            case 'activity':
                setActive(4)
                return
            case 'userDetails':
                setActive(5)
                return
            case 'winnerDetails':
                setActive(7)
                return
            case 'nftDetails':
                setActive(6)
                return
            case 'Snapshot':
                setActive(8)
                return
            case 'ecosystem':
                setActive(9)
                return
            case 'events':
                setActive(10)
                return
            default:
                // setActive(1)
                setActive(2)
                return
        }
    }, [location])

    const handleClose = () => {
        setAnchorEl(null)
    }
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    return (
        <div className='h-[60px] bg-[#242730] w-full hidden absolute bottom-0 left-0 screen2:flex px-4 justify-evenly items-center border-b border-[#25262A] shadow-[8px_12px_50px_rgba(0,0,0,0.4)] z-20'>
            {isWalletLogin ?
                <>
                    <MobileNavLink
                        link={{
                            id: 2,
                            name: 'Blvck Market',
                            icon: MarketSvg,
                            link: '/',
                        }}
                        active={active}
                        setActive={setActive}
                    />
                    <MobileNavLink
                        link={{
                            id: 3,
                            name: 'Staking',
                            icon: StakingSvg,
                            link: '/staking',
                        }}
                        active={active}
                        setActive={setActive}
                    />
                    {/* <MobileNavLink
                        link={{
                            id: 9,
                            name: 'Eco System',
                            icon: EcosystemSvg,
                            link: '/ecosystem',
                        }}
                        active={active}
                        setActive={setActive}
                    /> */}
                    <MobileNavLink
                        link={{
                            id: 10,
                            name: 'Events',
                            icon: EventsSvg,
                            link: '/events',
                        }}
                        active={active}
                        setActive={setActive}
                    />
                    <button
                        className={`flex flex-col items-center gap-y-2 cursor-pointer h-full justify-center w-16`}
                        onClick={() => {setOpenMenu(true)}}
                    >
                        <MoreIconSvg />
                    </button>
                </>
            :
            <>
                {/* <MobileNavLink
                    link={{
                        id: 1,
                        name: 'Dashboard',
                        icon: DashboardSvg,
                        link: '/',
                    }}
                    active={active}
                    setActive={setActive}
                /> */}
                {/* <MobileNavLink
                    link={{
                        id: 9,
                        name: 'Eco System',
                        icon: EcosystemSvg,
                        link: '/ecosystem',
                    }}
                    active={active}
                    setActive={setActive}
                /> */}
                <MobileNavLink
                    link={{
                        id: 10,
                        name: 'Events',
                        icon: EventsSvg,
                        link: '/events',
                    }}
                    active={active}
                    setActive={setActive}
                />
                <MobileNavLink
                    link={{
                        id: 2,
                        name: 'Blvck Market',
                        icon: MarketSvg,
                        link: '/',
                    }}
                    active={active}
                    setActive={setActive}
                />
                <button
                    className={`flex flex-col items-center gap-y-2 cursor-pointer h-full justify-center w-16`}
                    // onClick={() => {setLogoutModal(true)}}
                    onClick={() => {setOpenMenu(true)}}
                >
                    <MoreIconSvg />
                    {/* <LogoutIconSvg /> */}
                </button>
            </>
            }
            {/* {NavLinks.map((link) => {
                if (
                    ((link.id === 4 ||
                        link.id === 3 ||
                        link.id === 6 ||
                        link.id === 7 ||
                        link.id === 5 ||
                        link.id === 8) &&
                        !isWalletLogin) ||
                    (link.id === 4 && userInfo?.isAdmin && isWalletLogin) ||
                    (link.id === 5 &&
                        !userInfo?.isSuperAdmin &&
                        isWalletLogin) ||
                    (link.id === 6 &&
                        !userInfo?.isSuperAdmin &&
                        isWalletLogin) ||
                    (link.id === 7 && !userInfo?.isSuperAdmin && isWalletLogin) ||
                    (link.id === 8 && !userInfo?.isSuperAdmin && isWalletLogin)
                ) {
                    return null
                } else {
                    return (
                        <MobileNavLink
                            key={link.id}
                            link={link}
                            active={active}
                            setActive={setActive}
                        />
                    )
                }
            })} */}

            {/* {isWalletLogin && (
                <div className='flex flex-col'>
                    <div
                        className={`w-full rounded-lg flex items-center p-3 px-4 gap-x-4 cursor-pointer`}
                        onClick={handleClick}
                    >
                        <MoreVertIcon fill={'#9CA0AC'} />
                    </div>
                </div>
            )} */}

            <SwipeableDrawer
                anchor={'right'}
                open={openMenu}
                onClose={() => setOpenMenu(false)}
                transitionDuration={750}
                onOpen={() => setOpenMenu(true)}
                className='bg-[#0C0C0DB2] transition-opacity ease-in-out'
                PaperProps={{
                    sx: {
                        backdropFilter: 'blur(8px)',
                        borderRadius: '0 !important',
                        color: 'white',
                        top: '0',
                        width: '100%',
                        background: 'rgba(36, 39, 48, 0.8)',
                    },
                }}
            >
                <MenuPage
                    openModal={openMenu}
                    handleClick={handleClick}
                    setOpenModal={setOpenMenu}
                    setLogoutModal={setLogoutModal}
                />
            </SwipeableDrawer>

            {open && (
                <UserPopover
                    handleClose={handleClose}
                    id={id}
                    open={open}
                    setLogoutModal={setLogoutModal}
                    anchorEl={anchorEl}
                    bottomOpen
                />
            )}
            <LogoutModal
                openModal={logoutModal}
                setOpenModal={setLogoutModal}
                logout={logout}
            />
        </div>
    )
}

export default MobileNavigationButtons
