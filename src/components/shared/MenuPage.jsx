import React from 'react'
import { NavLinks } from '../../data/Navbar/Navbar'
import { useState } from 'react'
import { useContext } from 'react'
import { WalletConnectContext } from '../../hooks/WalletLogin'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LogoutIconSvg from '../../assets/svg/LogoutIconSvg'

const MenuPage = ({setOpenModal, setLogoutModal}) => {
    const location = useLocation()
    const { isWalletLogin, userInfo } = useContext(WalletConnectContext)
    const [active, setActive] = useState(1)

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
            case 'my-profile':
                setActive(9)
                return
            default:
                // setActive(1)
                setActive(2)
                return
        }
    }, [location])

    return <div className='w-full p-8 flex flex-col gap-4 relative'>
        <button className='absolute top-4 right-4' onClick={() => setOpenModal(false)}>
            <Close />
        </button>


        {NavLinks.map((link) => {
                if (
                    ((link.id === 4 ||
                        link.id === 3 ||
                        link.id === 6 ||
                        link.id === 7 ||
                        link.id === 5 ||
                        link.id === 8 ||
                        link.id === 9) &&
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
                        <MenuButton
                            key={link.id}
                            link={link}
                            active={active}
                            setActive={setActive}
                            setOpenModal={setOpenModal}
                        />
                    )
                }
            })}

            {isWalletLogin && (
                <div style={{ paddingTop: '1rem' }} className='flex items-center px-4 gap-x-5' onClick={() => {
                    setOpenModal(false)
                    setLogoutModal(true)
                }}>
                    <LogoutIconSvg fill={'#9CA0AC'} />

                    <h1 className={`text-[18px] leading-[22px] font-[400] text-[#9CA0AC]`}>
                        Logout
                    </h1>
                </div>
            )}
    </div>
}

export default MenuPage

const MenuButton = ({link, setActive, active, setOpenModal}) => {
    return <Link
        to={link.link}
        className='p-4 flex items-center gap-x-5' onClick={() => {
            setActive(link.id)
            setOpenModal(false)
        }}
    >
        <link.icon fill={active !== link.id ? '#9CA0AC' : '#FFF'}/>
        <h1 className={`text-[18px] leading-[22px] font-[400] ${active === link.id ? 'text-[#FFF] font-[700]' : 'text-[#9CA0AC]'}`}>
            {link.name}
        </h1>
    </Link>
}


const Close = () => {
    return(<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M27 9L9 27" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 9L27 27" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
)
}