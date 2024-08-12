import React from 'react'
import TitlePage from '../../components/shared/TitlePage'
import TopSideInfo from '../../components/Dashboard/TopSideInfo'
import { Add, Delete } from '@mui/icons-material'
import { SwipeableDrawer } from '@mui/material'
import { useState } from 'react'
import CreateEvent from '../../components/shared/modals/CreateEvent'
import EventCard, { TimerBox } from '../../components/Events/EventCard/EventCard'
import { useContext } from 'react'
import { WalletConnectContext } from '../../hooks/WalletLogin'
import DefaultLoader from '../../components/shared/loaders/DefaultLoader'
import { useEffect } from 'react'
import ConnectModal from '../../components/shared/modals/ConnectModal'
import { useCountdown } from '../../hooks/Countdown'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ScrollToPlugin } from 'gsap/all';
import EventViewModal from '../../components/shared/modals/EventViewModal'

const styles = {
    heading_row: `flex items-center justify-between`,
    heading_h1: `font-[Montserrat] font-[700] text-[28px] leading-[48px] text-[#FFF]`,
    button: `flex items-center justify-center gap-1 border-white border-[1px] rounded-[6px] p-[8px] px-[15px]`,
    button_text: `font-[400] text-[16px] leading-[24px] color-[#FFF]`,
    card_wrapper: `flex w-full flex-wrap gap-[30px]`,
    timer_col: `flex flex-col items-center`,
    timer_number: `text-[#dfdfdf] font-[700] text-[14px] leading-[18px] spacing-[0.5px]`,
    timer_type: `text-[#565656] font-[500] text-[10px] leading-[15px]`,
    timer_col_dot: `flex items-center justify-center pt-[0px]`,
    create_button: `hidden screen3:flex align-center justify-center w-full border rounded-[6px] py-[8px] text-[16px]`,
    delete_btn: `absolute bg-[#000] top-2 left-[0.7rem] bg-white text-white z-10 text-sm font-[500] h-9 w-max p-2 flex justify-center items-center rounded-full backdrop-blur cursor-pointer`,
}

const Events = () => {
    const[open, setOpen] = useState(false)
    const [openConnectModal, setOpenConnectModal] = useState(false)
    const {fetchEvents, eventData, eventLoading, userInfo, connectLoading, isWalletLogin} = useContext(WalletConnectContext)
    const [active, setActive] = useState(0)
    const [featuredEvents, setFeaturedEvents] = useState([])
    const [partner, setPartner] = useState(null)

    useEffect(() => {
        if(eventData.length === 0 || eventData?.events?.length === 0 && eventData?.expiredEvents?.length === 0)
            fetchEvents()
    }, [])

    const buttonClick = (index) => {
        if(index === active) return

        const event_card_main = document.getElementById('event_card_main')
        const outer = document.getElementById('carousel_public_market_id')
        const innerEle = outer.getElementsByClassName('rec-slider-ownn')[0]

        innerEle.scrollBy({
            left: event_card_main?.clientWidth * (index - active),
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        const featuredEvents = eventData?.events?.filter((event) => {
            return event.category === 'FeaturedEvent'
        })
        setFeaturedEvents(featuredEvents)
    },[eventData?.events])

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.registerPlugin(ScrollTrigger);
            gsap.registerPlugin(ScrollToPlugin);
            if(document.getElementsByClassName('container__section')?.length > 0){
                const scrollTween = gsap.timeline()
                scrollTween.to(".section_each_featured", {
                    scrollTrigger: {
                        scroller: ".container__section",
                        trigger: ".section_each_featured",
                        start: 'center 10%',
                        end: '+=500',
                        scrub: true,
                        // onUpdate: self => console.log("progress:", self.progress),
                    },
                    scale: 1,
                    duration: 1,
                    ease: 'elastic'
                });

                document.getElementsByClassName('container__section')[0].addEventListener("scroll", () => {
                    var number = (document.getElementsByClassName('container__section')[0].scrollLeft - document.getElementsByClassName('container__section')[0].clientWidth)/document.getElementsByClassName('container__section')[0].clientWidth
                    if (Math.ceil(number + 1) > (document.getElementsByClassName('container__section')[0].childElementCount - 1)) {
                        setActive(document.getElementsByClassName('container__section')[0].childElementCount - 1)
                    } else {
                        setActive(Math.ceil(number + 1))
                    }
                })
            }
        });
        
        return () => ctx.revert();
    }, [featuredEvents])

    return (
        <div className='w-full h-full flex flex-col bg-right-top bg-no-repeat screen2:pb-16'>
            {/* Top */}
            <div className='flex items-center justify-between w-full screen2:hidden'>
                <div className='pl-12'>
                    <TitlePage heading={'Events'} />
                </div>
                <div className='min-w-[330px] border-borderLine'>
                    <TopSideInfo />
                </div>
            </div>

            {eventLoading ?
                <DefaultLoader />
            :
                <div className='recent_saless_scroll p-6 px-12 screen3:px-4 flex flex-col gap-y-8 flex-1 overflow-scroll screen2:pb-[80px] max-w-[100vw]'>
                    {/* <div className='sticky bg-new_sticky_bg min-h-[440px] top-0 left-0'></div> */}
                    {(featuredEvents.length > 0) && <div className='w-events_comm_Wrapper screen3:hidden relative flex flex-col items-center' id='carousel_public_market_id'>
                        {/* <UpperBox /> */}
                        <div className='container__section flex overflow-scroll min-h-[360px] rec-slider-ownn w-full'>
                            {featuredEvents?.map((event, key) => {
                                return <UpperBox setPartner={setPartner} key={key} event={event} setOpenEditModal={setOpen} />
                            })}
                        </div>

                        <div className='flex items-center absolute -bottom-2 gap-1'>
                            {featuredEvents?.map((e, index) => {
                                if(e?.category === 'FeaturedEvent')
                                    return <button className={`labels__Scroll min-w-[8px] min-h-[8px] ${index===active ? 'bg-[#fff]' : 'bg-[#4E4E4E]'} rounded-full`} key={index} onClick={() => {
                                    buttonClick(index)
                                }}></button>
                            })}
                        </div>
                    </div>}

                    {eventData?.events?.length > 0 && <div className='hidden screen3:flex items-center overflow-x-scroll overscroll-y-visible gap-5 h-full min-h-full w-full'>
                        {eventData?.events?.map((event, key) => (
                            <UpperBox setPartner={setPartner} key={key} event={event} setOpenEditModal={setOpen} />
                        ))}
                    </div>}
                    {/* Community Events */}
                    {eventData?.communityEvent > 0 && <div className={styles.heading_row}>
                        <h1 className={styles.heading_h1}>Community Events</h1>

                        {<button className={styles.button} onClick={() => {
                            if(isWalletLogin){
                                setOpen(true)
                                setPartner(null)
                            }else{
                                setOpenConnectModal(true)
                            }
                        }}>
                            <Add />
                            <span className={styles.button_text}>Create</span>
                        </button>}
                    </div>}

                    {/* Cards */}
                    <div className={styles.card_wrapper}>
                        {eventData?.events?.map((event, key) => {
                            if(event?.category === 'CommunityEvent')
                                return <EventCard setPartner={setPartner} key={key} event={event} setOpenEditModal={setOpen}/>
                        })}
                    </div>

                    {eventData?.expiredEvents?.length > 0 && <div className={styles.heading_row}>
                        <h1 className={styles.heading_h1}>Past Events</h1>
                        {eventData?.communityEvent <= 0 && <button className={styles.button} onClick={() => {
                            if(isWalletLogin){
                                setOpen(true)
                                setPartner(null)
                            }else{
                                setOpenConnectModal(true)
                            }
                        }}>
                            <Add />
                            <span className={styles.button_text}>Create</span>
                        </button>}
                    </div>}

                    {/* Cards */}
                    <div className={styles.card_wrapper}>
                        {eventData?.expiredEvents?.map((event, key) => (
                            <EventCard setPartner={setPartner} key={key} event={event} setOpenEditModal={setOpen}/>
                        ))}
                    </div>

                    {/* Create */}
                    {/* {<button className={styles.create_button} onClick={() => {
                            if(isWalletLogin){
                                setOpen(true)
                                setPartner(null)
                            }else{
                                setOpenConnectModal(true)
                            }
                        }}>Create</button>} */}
                </div>
            }

            <SwipeableDrawer
                anchor={'right'}
                open={open}
                onClose={(e) => {
                    setOpen(false)
                }}
                transitionDuration={750}
                onOpen={(e) => setOpen(true)}
                className='bg-[#0C0C0DB2] transition-opacity ease-in-out'
                PaperProps={{
                    sx: {
                        backdropFilter: 'blur(8px)',
                        borderRadius: '0 !important',
                        color: 'white',
                        top: '0',
                    },
                }}
            >
                <CreateEvent
                    partner={partner}
                    setOpen={setOpen}
                />
            </SwipeableDrawer>

            <ConnectModal
                openModal={openConnectModal}
                setOpenModal={setOpenConnectModal}
                connectLoading={connectLoading}
            />
        </div>
    )
}

export default Events


const UpperBox = ({event, setOpenEditModal, setPartner}) => {
    const [openConnectModal, setOpenConnectModal] = useState(false)
    const {userInfo, deleteEvent} = useContext(WalletConnectContext)
    const [isSubscibed, setSubscribed] = useState(false)
    const {isWalletLogin, connectLoading, subscribeEvent, subscribing, walletAddress} = useContext(WalletConnectContext)
    const [openModal, setOpenModal] = useState(false)
    const connectWallet = async () => {
        setOpenConnectModal(true)
    }

    useEffect(() => {
        const c = event.participatedBy.find((e) => e === walletAddress)
        if(c){
            setSubscribed(true)
        }
    }, [event])

    const edit = (x) => {
        setOpenModal(false)
        setOpenEditModal(true)
        setPartner(event)
    }

    return(
        <div id='event_card_main' className='section_each_featured flex gap-5 z-1 bg-[#000] border border-[#C6C6C6] rounded-[16px] h-[350px] screen3:h-auto p-[20px] screen3:flex-col screen3:p-0 screen3:gap-0 min-w-full cursor-pointer' onClick={() => {setOpenModal(true)}}>
        <div className='rounded-[12px] min-w-[70%] w-[70%] bg-[#ccc] overflow-hidden screen2:min-w-[60%] screen2:w-[60%] screen3:min-h-[150px] screen3:w-full screen3:min-w-0 screen3:rounded-b-none relative'>
            <img src={event?.image} alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            {userInfo?.isSuperAdmin && <button className={`${styles.delete_btn}`} onClick={(e) => {e?.stopPropagation(); deleteEvent(event?._id)}}>
                <Delete />
            </button>}
        </div>

        <div className='flex flex-col gap-8 justify-between h-full screen3:p-[15px] w-full'>
            <div className='flex flex-col gap-2 screen3:gap-1'>
                {/* <span className='text-[#E2E2E2] font-[400] text-[16px] leading-[24px] screen3:text-[12px] screen3:leading-[21px]'>{event?.category}</span> */}
                <h1 className='text-[#FFF] font-[700] text-[24px] leading-[24px]'>{event?.name}</h1>
                <p className='text-[#E2E2E2] font-[300] opacity-70 text-[16px] leading-[24px]'>
                    {event?.description?.length > 100 ? event?.description?.substring(0, 100) + '...' : event?.description}
                </p>
            </div>

            <div className='w-full flex flex-col gap-4'>
                <div className='flex items-start gap-[6px]'>
                    <LocationSvg />
                    <div className='flex flex-col gap-[2px]'>
                        <h1 className='font-[400] text-[16px] leading-[24px] text-[#E2E2E2]'>{event?.country}</h1>
                        <h1 className='font-[400] text-[16px] leading-[24px] text-[#E2E2E2]'>{event?.address}</h1>
                    </div>
                </div>

                <div style={{ alignItems: 'flex-start', marginTop: '2px' }} className='flex justify-between'>
                    <div className='flex items-center gap-[8px]'>
                        <EndDateSvg />
                        <h1 style={{ marginTop: '1px' }} className='font-[400] text-[16px] leading-[24px] text-[#E2E2E2]'>{new Date(event?.expireAt).getDate() }{' '}{ monthNames[new Date(event?.expireAt).getMonth()]}</h1>
                    </div>
                    <div className='flex gap-[8px]'>
                        <EndsInSvg />
                        <h1 className='font-[400] text-[16px] leading-[24px] text-[#E2E2E2]'>
                            <TimerBox targetData = {event?.expireAt} />
                        </h1>
                    </div>
                </div>

                {/* <TimerBox timer={event?.expireAt}/> */}

                <button className='text-[#000000] bg-[#FFF] px-[12px] py-[8px] font-[500] text-[16px] leading-[24px] w-full rounded-[6px]'
                    disabled={subscribing || isSubscibed || event?.comingSoon}
                    onClick={(e) => {
                        e?.stopPropagation();
                        if (!event?.comingSoon) {
                            if(isWalletLogin){
                                subscribeEvent(event?._id)
                            }else{
                                connectWallet()
                            }
                        }
                    }}
                >
                    {!event?.comingSoon ? (subscribing ? 'Subscribing...' : isSubscibed ? 'Already Subscribed' : 'Subscribe for Free') : "Coming Soon"}
                </button>
            </div>
        </div>

        <ConnectModal
            openModal={openConnectModal}
            setOpenModal={setOpenConnectModal}
            connectLoading={connectLoading}
        />

        {openModal && <EventViewModal item={event} openModal={openModal} setOpenModal={setOpenModal} setOpenEditModal={setOpenEditModal} edit={edit} />}
    </div>
    )
}

const LocationSvg = () => {
    return(<svg style={{ marginTop: '1px' }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7993 17.5384L10.7985 17.5392C10.5334 17.8021 10.2667 18.0666 9.99992 18.3334C9.73311 18.0665 9.46629 17.802 9.20119 17.5391C6.15456 14.518 3.33325 11.7203 3.33325 8.33335C3.33325 4.65146 6.31802 1.66669 9.99992 1.66669C13.6818 1.66669 16.6666 4.65146 16.6666 8.33335C16.6666 11.7203 13.8459 14.5173 10.7993 17.5384ZM9.99992 10.8334C11.3806 10.8334 12.4999 9.71407 12.4999 8.33335C12.4999 6.95264 11.3806 5.83335 9.99992 5.83335C8.61921 5.83335 7.49992 6.95264 7.49992 8.33335C7.49992 9.71407 8.61921 10.8334 9.99992 10.8334Z" stroke="#9CA0AC" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    )
}

const EndsInSvg = () => {
    return(<svg style={{ marginTop: '2px' }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 5.2V10L13.2 11.6M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" stroke="#9CA0AC" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    )
}

const EndDateSvg = () => {
    return(
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 8.33323H2.5M13.3333 1.66656V4.9999M6.66667 1.66656V4.9999M6.5 18.3332H13.5C14.9001 18.3332 15.6002 18.3332 16.135 18.0607C16.6054 17.8211 16.9878 17.4386 17.2275 16.9682C17.5 16.4334 17.5 15.7334 17.5 14.3332V7.33323C17.5 5.9331 17.5 5.23303 17.2275 4.69826C16.9878 4.22785 16.6054 3.8454 16.135 3.60572C15.6002 3.33323 14.9001 3.33323 13.5 3.33323H6.5C5.09987 3.33323 4.3998 3.33323 3.86502 3.60572C3.39462 3.8454 3.01217 4.22785 2.77248 4.69826C2.5 5.23303 2.5 5.9331 2.5 7.33323V14.3332C2.5 15.7334 2.5 16.4334 2.77248 16.9682C3.01217 17.4386 3.39462 17.8211 3.86502 18.0607C4.3998 18.3332 5.09987 18.3332 6.5 18.3332Z" stroke="#9CA0AC" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    )
}

export const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
"July", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const TimerBoxModal = ({timer}) => {
    const [days, hours, minutes, seconds] = useCountdown(timer)

    return(
        <div style={{ paddingBottom: '9px' }} className='w-max flex items-start gap-[10px] justify-center py-[10px] px-[15px]  bg-[transparent] border border-[#292929] rounded-[6px]'>
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
