import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'

const SpinLoader = () => {
    return (
        <div className='w-full p-4 flex items-center justify-center py-6'>
            <CircularProgress sx={{ color: '#242730' }} />
        </div>
    )
}

export default SpinLoader
