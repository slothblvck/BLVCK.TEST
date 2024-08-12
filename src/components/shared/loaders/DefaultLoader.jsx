import React from 'react'

const DefaultLoader = () => {
    return (
        <div className='Cube panelLoad'>
            <div className='cube-face cube-face-front'>B</div>
            <div className='cube-face cube-face-back'>L</div>
            <div className='cube-face cube-face-left'>V</div>
            <div className='cube-face cube-face-right'>C</div>
            <div className='cube-face cube-face-bottom'>K</div>
            <div className='cube-face cube-face-top'>#</div>
        </div>
    )
}

export default DefaultLoader
