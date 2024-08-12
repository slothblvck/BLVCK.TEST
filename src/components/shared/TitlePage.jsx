import React from 'react'

const TitlePage = ({
    heading,
    subHeading = 'Hurry up and invest in BLVCK',
}) => {
    return (
        <div className='screen2:hidden'>
            <h1 className='text-3xl font-[700] text-transparent bg-clip-text bg-gradient-to-r from-[#E2E2E2] to-[#242630]'>
                {heading}
            </h1>
            {/* <p className='text-sm font-[400] text-[#ffffff99] pt-[5px]'>
                {subHeading}
            </p> */}
        </div>
    )
}

export default TitlePage
