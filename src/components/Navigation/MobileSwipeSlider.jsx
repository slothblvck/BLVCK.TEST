import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { SocialLinks } from '../../data/Navbar/SocialLink'
import { WalletConnectContext } from '../../hooks/WalletLogin'
import { NavLinks } from './../../data/Navbar/Navbar'

const MobileSwipeSlider = ({ setDrawer }) => {
    const navigate = useNavigate()
    const { isWalletLogin, logout } = useContext(WalletConnectContext)

    return (
        <div className='w-screen p-6 h-screen relative'>
            <div className='flex flex-col gap-8 items-center flex-1 justify-center h-[80%]'>
                {NavLinks.map((link) => {
                    if ((link.id === 4 || link.id === 3) && !isWalletLogin) {
                        return null
                    } else {
                        return (
                            <div
                                key={link.id}
                                onClick={() => {
                                    navigate(link.link)
                                    setDrawer({ right: false })
                                }}
                            >
                                <h1 className={`font-[500] text-3xl`}>
                                    {link.name}
                                </h1>
                            </div>
                        )
                    }
                })}

                {isWalletLogin && (
                    <div
                        // key={link.id}
                        onClick={() => {
                            // navigate(link.link)
                            logout()
                            setDrawer({ right: false })
                        }}
                    >
                        <h1 className={`font-[500] text-3xl`}>Logout</h1>
                    </div>
                )}
            </div>
            {/* <div className='socialLinks absolute bottom-20 w-full'>
                <div className='flex items-center justify-between'>
                    {SocialLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.redirect}
                            className={`w-full rounded-lg flex items-center p-3 px-4 cursor-pointer justify-center`}
                            target='_blank'
                            rel='noreferrer'
                        >
                            {link.icon ? (
                                <link.icon
                                    style={{ fontSize: '32px' }}
                                    color='#FFF'
                                />
                            ) : (
                                <img src={link.img} alt={link.name} />
                            )}
                        </a>
                    ))}
                </div>
            </div> */}
        </div>
    )
}

export default MobileSwipeSlider
