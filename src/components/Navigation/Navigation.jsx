import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/svg/logo.svg'
import { NavLinks } from '../../data/Navbar/Navbar'
import { SocialLinks } from '../../data/Navbar/SocialLink'
import SocialLink from './SocialLink'
import TopNavLink from './TopNavLink'
import { useLocation } from 'react-router-dom'
import { WalletConnectContext } from '../../hooks/WalletLogin'
import LogoutSvg from '../../assets/svg/LogoutSvg'
import LogoutModal from '../shared/modals/LogoutModal'

const Navigation = () => {
    const location = useLocation()
    const [active, setActive] = useState(1)
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
            case 'events':
                setActive(10)
                return
            case 'prediction':
                setActive(11)
                return
            case 'activity':
                setActive(4)
                return
            case 'userDetails':
                setActive(5)
                return
            case 'nftDetails':
                setActive(6)
                return
            case 'winnerDetails':
                setActive(7)
                return
            case 'Snapshot':
                setActive(8)
                return
            case 'ecosystem':
                setActive(9)
                return
            default:
                // setActive(1)
                setActive(2)
                return
        }
    }, [location])

    return (
        <div className='h-full w-[215px] py-8 px-5 flex justify-between flex-col pb-4'>
            <div className='flex flex-col gap-y-10'>
                {/* TOP LOGO CONTAINER */}
                <Link to='/' className='flex items-center justify-evenly'>
                    {/* LOGO */}
                    <img src={logo} alt='logo' className='invert' />
                </Link>
                {/* TOP LINKS */}
                <div className='flex flex-col gap-2'>
                    {NavLinks.map((link) => {
                        if (
                            ((link.id === 4 ||
                                link.id === 3 ||
                                link.id === 6 ||
                                link.id === 7 ||
                                link.id === 5 ||
                                link.id === 8 ||
                                link.id === 11) &&
                                !isWalletLogin) ||
                            (link.id === 4 &&
                                userInfo?.isAdmin &&
                                isWalletLogin) ||
                            (link.id === 5 &&
                                !userInfo?.isSuperAdmin &&
                                isWalletLogin) ||
                            (link.id === 6 &&
                                !userInfo?.isSuperAdmin &&
                                isWalletLogin) ||
                            (link.id === 7 &&
                                !userInfo?.isSuperAdmin &&
                                isWalletLogin) ||
                            (link.id === 8 &&
                                !userInfo?.isSuperAdmin &&
                                isWalletLogin) ||
                            (link.id === 9)
                        ) {
                            return null
                        } else {
                            return (
                                <TopNavLink
                                    key={link.id}
                                    link={link}
                                    active={active}
                                    setActive={setActive}
                                />
                            )
                        }
                    })}
                </div>
            </div>
            {/* SOCIAL LINKS */}
            {/* {isWalletLogin && (
                <div className='flex flex-col'>
                    <div
                        // href={link.redirect}
                        className={`w-full rounded-lg flex items-center p-3 px-4 gap-x-4 cursor-pointer`}
                        // target='_blank'
                        // rel='noreferrer'
                        onClick={() => {
                            setLogoutModal(true)
                        }}
                    >
                        <LogoutSvg />
                        <h1 className={`font-[400]`}>Log out</h1>
                    </div>
                </div>
            )} */}
            <LogoutModal
                openModal={logoutModal}
                setOpenModal={setLogoutModal}
                logout={logout}
            />
        </div>
    )
}

export default Navigation
