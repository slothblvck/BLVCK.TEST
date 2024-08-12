import { CloseOutlined } from '@mui/icons-material'
import React from 'react'

const StakeToGetGift = ({ moveOut }) => {
    return (
        <div className='w-[250px] h-[135px] backdrop-blur-lg rounded-lg border-b-4 flex items-center justify-center bg_bannerBlvckBg bg-cover bg-center px-4 relative'>
            <div className='bg-[#00000066] w-full h-full absolute top-0 left-0'></div>
            <p className='font-[700] text-[16px] text-center z-30'>
                Don't list your NFT to redeem BLVCK Genesis Playing Cards
            </p>

            <span
                onClick={() => {
                    moveOut()
                }}
                className='text-white absolute top-1 right-1 cursor-pointer z-30'
            >
                <CloseOutlined />
            </span>
        </div>
    )
}

export default StakeToGetGift
