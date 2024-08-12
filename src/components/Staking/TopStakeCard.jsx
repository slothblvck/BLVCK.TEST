import React from 'react'
import DashInfoSvg from '../../assets/svg/DashInfoSvg'

const TopStakeCard = ({ amount, title, logo }) => {
    return (
        <div className='rounded-xl flex gap-x-5'>
            <span className='w-[36px] h-[36px] bg-lightBlue rounded-full flex items-center justify-center'>
                {/* <img src={img} alt='img' /> */}
                <DashInfoSvg />
            </span>
            <div className='flex flex-col h-full justify-between items-start gap-y-2'>
                <p className='text-[#9CA0AC] font-[400] text-sm'>{title}</p>
                <div className='flex items-center gap-x-1'>
                    <p className='text-[#FFF] font-[700] text-2xl'>
                        {amount || amount === 0 ? amount : '0'}
                    </p>
                    {logo && <img src={logo} alt='' />}
                </div>
            </div>
        </div>
    )
}

export default TopStakeCard
