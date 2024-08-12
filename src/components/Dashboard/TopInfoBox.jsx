import React from 'react'
import eth from '../../assets/svg/eth.svg'
import DashInfoSvg from '../../assets/svg/DashInfoSvg'

const TopInfoBox = ({ title, amount, img }) => {
    return (
        <div className='rounded-2xl p-5 flex gap-x-3 items-start border border-[#292A30] bg-secondaryColor min-w-[230px] h-[100px] screen3:py-3 screen3:px-4 screen3:w-[40%] screen3:min-w-[160px] screen3:h-[81px]'>
            <span className='w-[36px] h-[36px] bg-lightBlue rounded-full flex items-center justify-center screen3:h-[48px] screen3:w-[48px]'>
                <DashInfoSvg />
            </span>
            <div className='flex flex-col h-full justify-between items-start'>
                <p className='text-[#9CA0AC] font-[400] text-sm screen3:text-xs'>
                    {title}
                </p>
                <p className='text-[#FFF] font-[700] text-2xl screen3:text-xl flex items-center gap-x-[6px]'>
                    {amount}
                    {img && <img src={eth} alt='img' />}
                </p>
            </div>
        </div>
    )
}

export default TopInfoBox
