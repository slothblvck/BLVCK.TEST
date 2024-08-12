import React, { useContext, useEffect, useState } from 'react'
import TopSideInfo from '../../components/Dashboard/TopSideInfo'
import TitlePage from '../../components/shared/TitlePage'
import { WalletConnectContext } from '../../hooks/WalletLogin'
import { Add } from '@mui/icons-material'
import PredictionEvent from '../../components/PredictionEvent/PredictionEvent'
import { SwipeableDrawer } from '@mui/material'
import CreatePredictionEvent from '../../components/shared/modals/CreatePredictionEvent'
import LeaderboardDataModal from '../../components/shared/modals/LeaderboardDataModal'


const styles = {
    heading_row: `flex items-center justify-between`,
    heading_h1: `font-[Montserrat] font-[700] text-[28px] leading-[48px] text-[#FFF]`,
    button: `flex items-center justify-center gap-1 border-white border-[1px] rounded-[6px] p-[8px] px-[15px]`,
    button_text: `font-[400] text-[16px] leading-[24px] color-[#FFF]`,
    card_wrapper: `flex w-full flex-wrap gap-[20px]`,
    timer_col: `flex flex-col items-center`,
    timer_number: `text-[#dfdfdf] font-[700] text-[14px] leading-[18px] spacing-[0.5px]`,
    timer_type: `text-[#565656] font-[500] text-[10px] leading-[15px]`,
    timer_col_dot: `flex items-center justify-center pt-[0px]`,
    create_button: `hidden screen3:flex align-center justify-center w-full border rounded-[6px] py-[8px] text-[16px]`,
    delete_btn: `absolute bg-[#000] top-2 left-[0.7rem] bg-white text-white z-10 text-sm font-[500] h-9 w-max p-2 flex justify-center items-center rounded-full backdrop-blur cursor-pointer`,
    defaultText: `text-[#55575E] font-[400] text-base cursor-pointer bg-primaryBg px-3 py-1 rounded-3xl`,
    activeText: `text-[#FFF] font-[700] text-base cursor-pointer bg-primaryBg px-3 py-1 rounded-3xl`,
}

const Prediction = () => {
    const[open, setOpen] = useState(false)
    const[leaderboardOpen, setLeaderboardOpen] = useState(false)
    const[loading, setLoading] = useState(false)
    const [openConnectModal, setOpenConnectModal] = useState(false)
    const [active, setActive] = useState("ONGOING")
    const {userInfo, isWalletLogin, fetchPredictionEvents, predictionEventLoading, predictionEventData} = useContext(WalletConnectContext)

    useEffect(() => {
        if(!loading){
            setLoading(true)
            fetchPredictionEvents()
        }
    }, [fetchPredictionEvents, loading])

  return (
    <div className='w-full h-full flex flex-col bg-right-top bg-no-repeat screen2:pb-16'>
        {/* Top */}
        <div className='flex items-center justify-between w-full screen2:hidden'>
            <div className='pl-12'>
                <TitlePage heading={'BLVCK Predictions'} />
            </div>
            <div className='min-w-[330px] border-borderLine'>
                <TopSideInfo />
            </div>
        </div>

        <div className='recent_saless_scroll p-6 px-12 screen3:px-4 flex flex-col gap-y-8 flex-1 overflow-scroll screen2:pb-[80px] max-w-[100vw]'>
            {/* Community Events */}
            <div className={styles.heading_row}>
                <div className='flex gap-x-4'>
                    <div
                        className={
                            active === 'ONGOING'
                                ? 'bg-activeButtonBg backdrop-blur-[72px] rounded-3xl p-[1px]'
                                : 'rounded-3xl p-[1px] backdrop-blur-[72px]'
                        }
                    >
                        <p
                            className={
                                active === 'ONGOING'
                                    ? styles.activeText
                                    : styles.defaultText
                            }
                            onClick={() =>
                                setActive("ONGOING")
                            }
                        >
                            Ongoing
                        </p>
                    </div>
                    <div
                        className={
                            active === 'EXPIRED'
                                ? 'bg-activeButtonBg backdrop-blur-[72px] rounded-3xl p-[1px]'
                                : 'rounded-3xl p-[1px] backdrop-blur-[72px]'
                        }
                    >
                        <p
                            className={
                                active === 'EXPIRED'
                                    ? styles.activeText
                                    : styles.defaultText
                            }
                            onClick={() =>
                                setActive("EXPIRED")
                            }
                        >
                            Expired
                        </p>
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    {isWalletLogin && userInfo?.isAdmin && <button className='text-white font-[400] text-sm bg-lightBlue border border-secondaryColor h-full rounded-lg p-3 px-5 flex items-center gap-x-1 screen2:hidden' onClick={() => {
                        if(isWalletLogin){
                            setOpen(true)
                        }else{
                            setOpenConnectModal(true)
                        }
                    }}>
                        <Add />
                        <span className={styles.button_text}>Create</span>
                    </button>}
                    {isWalletLogin && <button className='text-white font-[400] text-sm bg-lightBlue border border-secondaryColor h-full rounded-lg p-3 px-5 flex items-center gap-x-1 screen2:hidden' onClick={() => {
                        if(isWalletLogin){
                            setLeaderboardOpen(true)
                        }else{
                            setOpenConnectModal(true)
                        }
                    }}>
                        <span className={styles.button_text}>Leaderboard</span>
                    </button>}
                </div>
            </div>

            {/* Cards */}
            <div className={styles.card_wrapper}>
                {predictionEventData?.map((event, key) => {
                    if(event?.expireAt && active === "ONGOING" && new Date(event?.expireAt)?.getTime() > Date.now())
                        return <PredictionEvent event={event} key={key} />
                    else if(active === "EXPIRED" && new Date(event?.expireAt)?.getTime() < Date.now())
                        return <PredictionEvent event={event} key={key} />
                    else return ""
                })}
            </div>
        </div>

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
            <CreatePredictionEvent
                setOpen={setOpen}
            />
        </SwipeableDrawer>

        {leaderboardOpen && <SwipeableDrawer
            anchor={'right'}
            open={leaderboardOpen}
            onClose={(e) => {
                setLeaderboardOpen(false)
            }}
            transitionDuration={750}
            onOpen={(e) => setLeaderboardOpen(true)}
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
            <LeaderboardDataModal
                setOpenModal={setLeaderboardOpen}
            />
        </SwipeableDrawer>}
    </div>
  )
}

export default Prediction
