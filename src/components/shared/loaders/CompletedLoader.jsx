import React from 'react'
import complete from '.././../../assets/svg/completed.svg'

const CompletedLoader = () => {
    return (
        <div className='w-full h-full absolute flex items-center justify-center'>
            <img src={complete} alt='' className='w-[12%]' />
        </div>
    )
}

export default CompletedLoader
