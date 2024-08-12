import React, { useContext } from 'react'
import Banner from '../../components/Dashboard/Banner'
import Graph from '../../components/Dashboard/Graph'
import TopInfoBox from '../../components/Dashboard/TopInfoBox'
import TitlePage from '../../components/shared/TitlePage'
import { DashboardInfo } from '../../data/Dashboard/TopInfo'
import { WalletConnectContext } from '../../hooks/WalletLogin'
import TopSideInfo from '../../components/Dashboard/TopSideInfo'

const Dashboard = () => {
    const { dashInfo } = useContext(WalletConnectContext)
    return (
        <div className='w-full h-full flex flex-col bg-dashboardBg bg-right-top bg-no-repeat screen2:pb-16'>
            {/* Top */}
            <div className='flex items-center justify-between w-full screen2:hidden'>
                <div className='pl-12'>
                    <TitlePage heading={'Dashboard'} />
                </div>
                <div className='min-w-[330px] border-borderLine'>
                    <TopSideInfo />
                </div>
            </div>
            {/* BOTTOM */}
            <div className='recent_saless_scroll p-6 px-12 screen3:px-4 flex flex-col gap-y-8 flex-1 overflow-scroll'>
                {/* Banner */}
                <Banner />
                {/* CardValues */}
                <div className='w-full flex items-center justify-between flex-wrap gap-x-4 gap-y-8 screen4:gap-x-2 screen4:justify-evenly'>
                    {/* {DashboardInfo.map((info) => ( */}
                    <TopInfoBox
                        title={'Items'}
                        amount={dashInfo ? dashInfo?.count : '--'}
                    />
                    <TopInfoBox
                        title={'Owners'}
                        amount={dashInfo ? dashInfo?.num_owners : '--'}
                    />
                    <TopInfoBox
                        title={'Floor Price'}
                        amount={
                            dashInfo ? dashInfo?.floor_price?.toFixed(3) : '--'
                        }
                        img
                    />
                    <TopInfoBox
                        title={'Total Volume'}
                        amount={
                            dashInfo ? dashInfo?.total_volume?.toFixed(2) : '--'
                        }
                        img
                    />
                    {/* <TopInfoBox title={'Owners'} amount={327} />
                    <TopInfoBox title={'Floor Price'} amount={0.07} img />
                    <TopInfoBox title={'Items'} amount={'10K'} />
                    <TopInfoBox title={'Total Vol'} amount={'32K'} img /> */}
                    {/* ))} */}
                </div>
                {/* Graph */}
                <Graph />
                <div className='mt-10' />
            </div>
        </div>
    )
}

export default Dashboard
