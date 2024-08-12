import React from 'react'
import logo from '../../assets/logo_lg.png'

const Banner = () => {
    return (
        <div className='w-full rounded-2xl flex gap-x-5 items-center screen1:flex-col screen1:gap-y-3'>
            <div className='bg-gradient-to-r from-[#FFFFFF] via-[#06060606] to-[#101013] min-w-[168px] h-[168px] screen1:w-full'>
                <img
                    src={logo}
                    alt=''
                    className='w-[inherit] h-[inherit] object-cover'
                />
            </div>
            <div className='flex flex-col gap-y-2'>
                <h1 className='text-[#E2E2E2] font-[700] text-2xl'>
                    Blvck Genesis
                </h1>
                <p className='text-[#E2E2E2] text-base font-[400]'>
                    Blvck Genesis is a collection of 9,999 Blvck avatar NFTs
                    living on the Ethereum blockchain. With hundreds of artistic
                    elements, high fashion traits and monochrome aesthetics,
                    each graphic is crafted by Julian O'hayon, French designer
                    and founder of global lifestyle brand, Blvck Paris. By
                    owning a Blvck Genesis avatar, you will immediately have
                    membership access to exclusive events, lifestyle products
                    and rewards. Join the Blvck movement.
                </p>
            </div>
        </div>
    )
}

export default Banner
