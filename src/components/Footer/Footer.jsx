import React from 'react'
import externalLink from '../../assets/svg/externalLink.svg'
import { SocialLinks } from '../../data/Navbar/SocialLink'

const Footer = () => {
    return (
        <div className='h-[50px] flex items-center justify-between text-xs font-[400] shadow border-t border-borderLine px-8 text-white gap-x-1 screen4:px-3 screen2:hidden'>
            {/* SOCIAL ICONS */}
            <div className='flex items-center gap-x-5'>
                {SocialLinks.map((social) => (
                    <a
                        href={social.redirect}
                        rel='noreferrer'
                        target='_blank'
                        key={social.id}
                        className='cursor-pointer text-xl'
                    >
                        <social.icon />
                    </a>
                ))}
            </div>
            {/* <div style={{ fontSize: '14px' }} className='flex items-center gap-x-1'>
                <span>Powered by</span>
                <a
                    href='https://foxledger.studio/'
                    target='_blank'
                    rel='noreferrer'
                    className='underline underline-offset-1 hover:underline-none hover:text-[#ED632B] cursor-pointer flex items-center group'
                    style={{ gap: '3px' }}
                >
                    FoxLedger Studio
                    <div className='h-[16px] w-[16px]'>
                        <img
                            src={externalLink}
                            alt=''
                            className='hidden group-hover:flex'
                        />
                    </div>
                </a>
            </div> */}
        </div>
    )
}

export default Footer
