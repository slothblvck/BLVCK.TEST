import React, { useContext, useEffect } from 'react'
import no_item from '../../assets/no_item.png'
import ActivityCard from '../../components/Activity/ActivityCard'
import RightDashboard from '../../components/shared/RightDashboard'
import TitlePage from '../../components/shared/TitlePage'
import { WalletConnectContext } from '../../hooks/WalletLogin'
import DefaultLoader from './../../components/shared/loaders/DefaultLoader'

const Activity = () => {
    const { getActivity, userActivity, activityLoading } =
        useContext(WalletConnectContext)

    useEffect(() => {
        const fetchActivity = async () => {
            // await getActivity()
        }

        fetchActivity()
    }, [])

    return (
        <div className='w-full h-full flex'>
            {/* LEFT */}
            <div className='recent_saless_scroll p-6 pt-8 px-12 screen3:px-4 flex flex-col gap-y-8 flex-1 overflow-scroll'>
                {/* TOP TITLE */}
                <div className='flex items-start justify-between w-full screen2:hidden'>
                    <TitlePage heading={'My Activity'} />
                </div>
                {/* ACTIVITY */}
                {activityLoading ? (
                    <div className='relative w-full h-full'>
                        <DefaultLoader />
                    </div>
                ) : (
                    <div className='flex flex-col gap-y-2 bg-activityBg rounded-xl h-activityScreen screen2:h-activityScreen_mobile overflow-scroll recent_saless_scroll'>
                        {userActivity?.length > 0 ? (
                            userActivity?.map((activity, index) => (
                                <ActivityCard key={index} activity={activity} />
                            ))
                        ) : (
                            <span className='text-center text-3xl h-full w-full flex items-center justify-center flex-col'>
                                <img src={no_item} alt='' className='w-72' />
                                No Item Found
                            </span>
                        )}
                    </div>
                )}
            </div>
            {/* RIGHT */}
            <RightDashboard />
        </div>
    )
}

export default Activity
