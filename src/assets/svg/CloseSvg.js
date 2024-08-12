import React from 'react'

export default function CloseSvg({ fill }) {
    return (
        <svg
            width='17'
            height='17'
            viewBox='0 0 17 17'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M15.915 15.915L1.95752 1.95752M15.915 1.95752L1.95752 15.915'
                stroke={fill ? fill : '#0A080B'}
                strokeWidth='2'
                strokeLinecap='round'
            />
        </svg>
    )
}
