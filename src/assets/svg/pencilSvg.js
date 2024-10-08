import React from 'react'

const PencilSvg = ({ fill }) => {
    return (
        <svg
            width='18'
            height='18'
            viewBox='0 0 18 18'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M2.11 11.6002L1.16 15.7002C1.12723 15.8501 1.12836 16.0054 1.16329 16.1548C1.19823 16.3042 1.2661 16.4439 1.36194 16.5637C1.45778 16.6835 1.57917 16.7803 1.71724 16.8472C1.85532 16.9141 2.00659 16.9493 2.16 16.9502C2.23149 16.9574 2.30352 16.9574 2.375 16.9502L6.5 16.0002L14.42 8.1102L10 3.7002L2.11 11.6002Z'
                fill={fill ? fill : '#080808'}
            />
            <path
                d='M16.91 4.16047L13.96 1.21047C13.766 1.01751 13.5036 0.90918 13.23 0.90918C12.9564 0.90918 12.6939 1.01751 12.5 1.21047L10.86 2.85047L15.275 7.26547L16.915 5.62547C17.011 5.52901 17.087 5.41457 17.1387 5.28871C17.1904 5.16284 17.2167 5.02801 17.2163 4.89194C17.2158 4.75586 17.1885 4.62122 17.136 4.49571C17.0834 4.37019 17.0066 4.25628 16.91 4.16047Z'
                fill={fill ? fill : '#080808'}
            />
        </svg>
    )
}

export default PencilSvg
