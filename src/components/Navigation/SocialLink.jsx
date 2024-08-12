import React from 'react'

const SocialLink = ({ link, setLogoutModal }) => {
    return (
        <div
            // href={link.redirect}
            className={`w-full rounded-lg flex items-center p-3 px-4 gap-x-4 cursor-pointer`}
            // target='_blank'
            // rel='noreferrer'
            onClick={() => {
                setLogoutModal(true)
            }}
        >
            {link.icon ? <link.icon /> : <img src={link.img} alt={link.name} />}
            <h1 className={`font-[400]`}>{link.name}</h1>
        </div>
    )
}

export default SocialLink
