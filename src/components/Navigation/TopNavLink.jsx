import React from 'react'
import { Link } from 'react-router-dom'

const TopNavLink = ({ link, active, setActive }) => {
    return (
        <Link
            to={link.link}
            className={`w-full rounded-lg ${
                active === link.id ? 'bg-lightBlue' : ''
            } flex items-center p-3 px-4 gap-x-2 cursor-pointer`}
            onClick={() => setActive(link.id)}
        >
            {link.icon ? (
                <link.icon fill={active === link.id ? '#FFF' : '#9CA0AC'} />
            ) : (
                <img src={link.img} alt={link.name} />
            )}
            <h1
                className={`${
                    active === link.id
                        ? 'text-primaryText font-[700]'
                        : 'text-secondaryText font-[400]'
                }`}
            >
                {link.name}
            </h1>
        </Link>
    )
}

export default TopNavLink
