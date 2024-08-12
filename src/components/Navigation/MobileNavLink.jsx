import React from 'react'
import { Link } from 'react-router-dom'

const MobileNavLink = ({ link, active, setActive }) => {
    return (
        <Link
            to={link.link}
            className={`w-min ${
                active === link.id ? 'border-t-2' : ''
            } flex flex-col items-center gap-y-2 cursor-pointer h-full justify-center w-16`}
            onClick={() => setActive(link.id)}
        >
            {link.icon ? (
                <link.icon
                    fill={active === link.id ? '#FFF' : '#9CA0AC'}
                    className='text-2xl w-full'
                />
            ) : (
                <img src={link.img} alt={link.name} />
            )}
            {/* <h1
                className={`${
                    active === link.id
                        ? 'text-primaryText font-[700]'
                        : 'text-secondaryText font-[400]'
                }`}
            >
                {link.name}
            </h1> */}
        </Link>
    )
}

export default MobileNavLink
