import { ArrowForward, Delete } from '@mui/icons-material'
import React from 'react'
import { getDateString, useCountdown } from '../../../hooks/Countdown'
import { useContext } from 'react'
import { WalletConnectContext } from '../../../hooks/WalletLogin'
import { useEffect } from 'react'
import { useState } from 'react'
import EventViewModal from '../../shared/modals/EventViewModal'
import DownloadSvg from './../../../assets/svg/DownloadSvg';
import SetupProfileModal from '../../shared/modals/SetupProfile'

const styles = {
    cardWrapper: `group bg-[#000000] rounded-2xl w-[330px] min-h-[200px] h-auto max-h-fit ease-in-out transition-transform relative screen4:w-full overflow-hidden cursor-pointer`,
    cardContainer: `w-full h-auto p-4 flex flex-col gap-3 pb-[10px] justify-between`,
    imageWrapper: `relative flex w-full h-[130px] max-h-[130px] cursor-pointer screen4:w-full overflow-hidden bg-[#ccc]`,
    timer_col: `flex flex-col items-center`,
    timer_number: `text-[#fff] font-[700] text-[14px] leading-[18px] spacing-[0.5px]`,
    timer_type: `text-[#565656] font-[500] text-[10px] leading-[15px]`,
    timer_col_dot: `flex items-center justify-center pt-[0px]`,
    hoverSubscribe: `particiapte__for absolute z-10 bottom-0 rounded-b-xl w-full left-0 h-[45px] bg-white text-black items-center justify-between px-3 flex cursor-pointer gap-x-2
        translate-y-[65px] group-hover:translate-y-0 group-hover:transition-all group-hover:ease group-hover:duration-200 duration-200 ease`,
    disablehoverSubscribe: `particiapte__for absolute z-10 bottom-0 rounded-b-xl w-full left-0 h-[45px] bg-white text-black items-center justify-between px-3 flex cursor-pointer gap-x-2 translate-y-0`,
    nftParticipants: `absolute top-2 right-[0.7rem] bg-white z-10 text-black text-sm font-[500] border-[2.7px] border-[#121212] h-9 w-max px-4 py-3 flex justify-center items-center rounded-full backdrop-blur cursor-pointer`,
    delete_btn: `absolute bg-[#000] top-2 left-[0.7rem] bg-white text-white z-10 text-sm font-[500] h-9 w-max p-2 flex justify-center items-center rounded-full backdrop-blur cursor-pointer`,
    download_btn: `absolute bg-[#000] top-2 left-[0.7rem] bg-white text-white z-10 text-sm font-[500] h-9 w-max p-2 flex justify-center items-center rounded-full backdrop-blur cursor-pointer`,
}

const EventCard = ({event, setOpenEditModal, setPartner}) => {
    const {walletAddress, subscribeEvent, subscribing, userInfo, deleteEvent, getAllSubscriptions, allSubscribers} = useContext(WalletConnectContext)
    const [isSubscibed, setSubscribed] = useState(false)
    const [profileSetupModal, setOpenProfileSetupModal] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        const c = event.participatedBy.find((e) => e === walletAddress)
        if(c){
            setSubscribed(true)
        }
    }, [event])

    const edit = (x) => {
        setOpenModal(false)
        setPartner(event)
        setOpenEditModal(true)
    }

    const downloadData = async(e) => {
        getAllSubscriptions(e, event?._id)
    }

    const handleSubscribeEvent = async(e) => {
        e?.preventDefault()
        e?.stopPropagation();
        if(!userInfo.username && !userInfo.email){
            setOpenProfileSetupModal(true)
            return
        }
        if(userInfo.username && userInfo.email && !event?.comingSoon)
            subscribeEvent(event?._id)
        return
    }

    console.log(allSubscribers)

    return <div className={styles.cardWrapper}
            onClick={() => setOpenModal(true)}
        >
        <div className={styles.imageWrapper}>
            <img src={event?.image} alt="" className='w-[inherit] h-[inherit] object-cover' />
        </div>

        {userInfo?.isSuperAdmin && <button className={`${styles.delete_btn}`} onClick={(e) => {e?.stopPropagation(); deleteEvent(event?._id)}}>
            <Delete />
        </button>}

        {userInfo?.isSuperAdmin && <div className={`${styles.nftParticipants}`}>
            {`${event?.participatedBy?.length} Subscriptions`}
        </div>}

        <div className={styles.cardContainer} style={{height: 'calc(100% - 130px)'}}>
            <div className='flex flex-col gap-[16px]'>
                <h1 className='font-[Montserrat] font-[700] text-[20px] leading-[24px] text-[#FFF]'>
                    {event?.name?.length > 25 ? event?.name.substring(0, 25) + '...' : event?.name}
                </h1>
                <p className='font-[Inter] font-[400] text-[14px] leading-[20px] text-[#E2E2E2]'>
                    {event?.description?.length > 75 ? event?.description.substring(0, 75) + '...' : event?.description}
                </p>
            </div>

            <div className='flex flex-col gap-[8px] justify-between w-full'>
                <div className='flex items-center justify-start gap-[8px]'>
                    <LocationSvg />
                    <h2 className='font-[Inter] font-[600] text-[14px] leading-[20px] text-[#E2E2E2]' style={{maxHeight: '38px', overflow: 'hidden'}}>
                        {event?.country}
                    </h2>
                </div>
                <div className='flex justify-between items-center'>
                    <TimerBox targetData={event?.expireAt} />
                    {isSubscibed ?
                        <button className='bg-white rounded-[4px] p-[6px] px-[12px] text-[#191A1D] font-[600] text-[12px]'>
                            Subscribed
                        </button>
                    :
                        <div className='w-[36px] min-w-[36px] h-[36px] min-h-[36px] bg-[#191B1F] rounded-full flex items-center justify-center'>
                            <ArrowForward />
                        </div>
                    }
                </div>
            </div>
        </div>

        {profileSetupModal && <SetupProfileModal openModal={profileSetupModal} setOpenModal={setOpenProfileSetupModal} />}
        {openModal && !profileSetupModal && <EventViewModal downloadData={downloadData} edit={edit} item={event} openModal={openModal} setOpenModal={setOpenModal} setOpenEditModal={setOpenEditModal} />}

        {!userInfo?.isAdmin && new Date(event?.expireAt).getTime() > Date.now() && <button
            className={event?.expireAt > Date.now() ? styles.hoverSubscribe : styles.disablehoverSubscribe}
            disabled={event?.comigSoon || isSubscibed || subscribing || event?.expireAt <= Date.now()}
            onClick={handleSubscribeEvent}
        >
            <h1 style={{color: '#191A1D', fontSize: '16px', lineHeight: '20px', fontWeight: '600'}}>{event?.expireAt <= Date.now() ? 'Event Expired' : (!event?.comingSoon ? (isSubscibed ? 'Already Subscribed' : subscribing ? 'Subscribing...' : 'Subscribe') : "Coming Soon")}</h1>

            {!isSubscibed && event?.expireAt > Date.now() && <ArrowForward />}
        </button>}
    </div>
}

export default EventCard


export const TimerBox = ({targetData}) => {
    const [days, hours, minutes, seconds] = useCountdown(targetData)

    if(new Date(targetData).getTime() < Date.now()){
        return <div className='flex items-start gap-[15px] py-1'>
            <h2 className='text-[#E2E2E2] text-[16px] leading-[18px]'>Completed {getDateString(targetData)}</h2>
        </div>
    }

    return(
        <div className='flex items-start gap-[15px] py-1'>
            {days > 0 && (
                <>
                    <div className={styles.timer_col}>
                        <h1 className={styles.timer_number}>{days}</h1>
                        <h2 className={styles.timer_type}>Days</h2>
                    </div>
                    <div className={styles.timer_col_dot}>
                        :
                    </div>
                </>
            )}

            <div className={styles.timer_col}>
                <h1 className={styles.timer_number}>{hours}</h1>
                <h2 className={styles.timer_type}>Hrs</h2>
            </div>

            <div className={styles.timer_col_dot}>
                :
            </div>

            <div className={styles.timer_col}>
                <h1 className={styles.timer_number}>{minutes}</h1>
                <h2 className={styles.timer_type}>Mins</h2>
            </div>

            {(days === 0 ||
                (minutes === 0 &&
                    days === 0 &&
                    seconds === 0 &&
                    days === 0)) && (
                <>
                    <div className={styles.timer_col_dot}>
                        :
                    </div>
                    <div className={styles.timer_col}>
                        <h1 className={styles.timer_number}>{seconds}</h1>
                        <h2 className={styles.timer_type}>Secs</h2>
                    </div>
            </>)}
        </div>
    )
}

const LocationSvg = () => {
    return(<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7993 17.5384L10.7985 17.5392C10.5334 17.8021 10.2667 18.0666 9.99992 18.3334C9.73311 18.0665 9.46629 17.802 9.20119 17.5391C6.15456 14.518 3.33325 11.7203 3.33325 8.33335C3.33325 4.65146 6.31802 1.66669 9.99992 1.66669C13.6818 1.66669 16.6666 4.65146 16.6666 8.33335C16.6666 11.7203 13.8459 14.5173 10.7993 17.5384ZM9.99992 10.8334C11.3806 10.8334 12.4999 9.71407 12.4999 8.33335C12.4999 6.95264 11.3806 5.83335 9.99992 5.83335C8.61921 5.83335 7.49992 6.95264 7.49992 8.33335C7.49992 9.71407 8.61921 10.8334 9.99992 10.8334Z" stroke="#9CA0AC" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    )
}
