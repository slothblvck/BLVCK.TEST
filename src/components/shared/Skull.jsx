import React from 'react'

const Skull = ({ setOpenModal }) => {
    return (
        <div
            className='parent_skull cursor-pointer'
            onClick={() => setOpenModal(true)}
        >
            <div className='top_skull'></div>
            <div className='center_skull'>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}

export default Skull
