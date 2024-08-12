import React from 'react'

const MoreIconSvg = ({fill}) => {
    return (
        <svg
            width='24'
            height='25'
            viewBox='0 0 24 25'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M21 6.25H3C2.59 6.25 2.25 5.79667 2.25 5.25C2.25 4.70333 2.59 4.25 3 4.25H21C21.41 4.25 21.75 4.70333 21.75 5.25C21.75 5.79667 21.41 6.25 21 6.25Z'
                fill={fill ? fill : '#9CA0AC'}
            />
            <path
                d='M21 14.25H3C2.59 14.25 2.25 13.7967 2.25 13.25C2.25 12.7033 2.59 12.25 3 12.25H21C21.41 12.25 21.75 12.7033 21.75 13.25C21.75 13.7967 21.41 14.25 21 14.25Z'
                fill={fill ? fill : '#9CA0AC'}
            />
            <path
                d='M21 22.25H3C2.59 22.25 2.25 21.7967 2.25 21.25C2.25 20.7033 2.59 20.25 3 20.25H21C21.41 20.25 21.75 20.7033 21.75 21.25C21.75 21.7967 21.41 22.25 21 22.25Z'
                fill={fill ? fill : '#9CA0AC'}
            />
        </svg>
    )
}

export default MoreIconSvg
