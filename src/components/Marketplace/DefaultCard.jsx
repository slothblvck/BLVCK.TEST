import React from 'react'
import dummyCrownSvg from '../../assets/svg/dummyWinner.svg'

const DefaultCard = () => {
    return (
        <div className='w-full rounded-lg flex flex-col items-center justify-center gap-y-3'>
            <img src={dummyCrownSvg} alt='' className='' />
            <p className='text-[#7E7E7E] font-[500] text-base'>
                Winners will appear here
            </p>
        </div>
    )
}

export default DefaultCard
