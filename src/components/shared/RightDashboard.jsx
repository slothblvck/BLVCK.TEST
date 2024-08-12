import React from 'react'
import RecentSales from '../Dashboard/RecentSales'
import TopSideInfo from '../Dashboard/TopSideInfo'

const RightDashboard = () => {
    return (
        <div className='min-w-[330px] h-full flex flex-col screen1:hidden'>
            {/* TOP INFO */}
            <TopSideInfo />
            {/* RECENT SALES */}
            <RecentSales />
        </div>
    )
}

export default RightDashboard
