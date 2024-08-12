import { useContext, useEffect, useState } from 'react'
import CloseSvg from '../../../assets/svg/CloseSvg'
import { WalletConnectContext } from '../../../hooks/WalletLogin'
import EditIcon from '@mui/icons-material/Edit';
import AddLeaderboardDetails from './AddLeaderboardDetails';

const LeaderboardDataModal = ({
    setOpenModal,
}) => {
    const { getLeaderboardData, leaderboardInfo, leaderboardData, getAdminResetLeaderboard, resetPointLoading, userInfo, isWalletLogin, getAdminLeaderboardData, allLeaderboardData, leaderboardDataLoading} = useContext(WalletConnectContext)

    const [fetch, setFetch] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)

    const styles = {
        button: `w-full px-2 py-2 flex items-center justify-center cursor-pointer rounded-lg font-[500] text-lg bg-white text-black mt-4 flex items-center justify-center gap-x-2`,
        title: `text-2xl font-[600] text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] to-[#FFFFFF75]`,
        modalContentWrapper: `w-[400px] bg-cardModal text-white py-12 pb-8 flex flex-col gap-y-4 min-h-full relative screen4:w-screen border-l border-[#3D3D3D] overflow-scroll`,
        paddingModal: `px-6 screen4:px-6 screen5:px-3 `,
        participantCount: `absolute participate_now_hover_Effect top-2 right-[3.5rem] bg-white z-10 border-[2.7px] border-[#121212] text-black text-sm h-9 w-9 font-[600] p-3 px-4 flex justify-center items-center rounded-full backdrop-blur cursor-pointer`,
        nftParticipated: `participationsDone absolute top-2 right-[3.5rem] bg-white z-10 text-black text-sm font-[500] border-[2.7px] border-[#121212] h-9 w-min px-4 py-3 flex justify-center items-center rounded-full backdrop-blur cursor-pointer `,
        nftParticipants: `absolute top-2 right-[3.5rem] bg-white z-10 text-black text-sm font-[500] border-[2.7px] border-[#121212] h-9 w-max px-4 py-3 flex justify-center items-center rounded-full backdrop-blur cursor-pointer `,
        tab_button: `text-[#FFF] font-[700] leading-[24px] text-[16px] border-b-2 border-white px-1 pb-1 font-[Oxanium]`,
        tab_button_disabled: `text-[#FFF] font-[700] leading-[24px] text-[16px] border-b-2 border-transparent px-1 pb-1 opacity-40 font-[Oxanium]`
    }

    const toHyperlink = () => {
        try {
            var descriptionComponent = document.getElementById(
                'description_participaton'
            )

            if(!descriptionComponent) return
            var str = descriptionComponent?.innerText

            if (str !== '') {
                var pattern1 =
                    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
                var str1 = str.replace(
                    pattern1,
                    "<a target='_blank' rel='noreferrer' style='color:#308BB3;text-decoration:underline;cursor:pointer' href='$1'>$1</a>"
                )
                var pattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim
                var str2 = str1.replace(
                    pattern2,
                    '$1<a target="_blank" rel="noreferrer" style="color:#308BB3;text-decoration:underline;cursor:pointer" href="http://$2">$2</a>'
                )

                str2 = str2.replace(
                    /show more/i,
                    "<span id='moresee' style='color:#308BB3; cursor:pointer'>show more</span>"
                )
                str2 = str2.replace(
                    /show Less/i,
                    "<span id='lesssee' style='color:#308BB3; cursor:pointer'>show Less</span>"
                )

                var more = document.getElementById('moresee')
                var less = document.getElementById('lesssee')
                if (less) {
                    more.addEventListener('click', () => {
                        setMore(false)
                    })
                }
                if (more) {
                    more.addEventListener('click', () => {
                        setMore(true)
                    })
                }
                descriptionComponent.innerHTML = str2
                // console.log(descriptionComponent.innerHTML)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if(!isWalletLogin) return;
        if(!fetch){
            getAdminLeaderboardData(toHyperlink)
            toHyperlink();
            setFetch(true)
        }
    }, [fetch, userInfo?.isAdmin, isWalletLogin])

    useEffect(() => {
        if(leaderboardInfo?.description){
            toHyperlink();
        }
    }, [leaderboardInfo?.description])

    return (
        <div className='inline-block bg-transparent text-left transform transition-all align-middle max-w-lg h-screen relative'>
            <div className={styles.modalContentWrapper}>
                <div className={`w-full flex items-center justify-between pb-2 px-6`}>
                    <h2 className='font-[700] font-[Montserrat] text-[32px] leading-[48px] text-center text-white'>
                        Leaderboard
                    </h2>

                    {userInfo?.isSuperAdmin && <button disabled={resetPointLoading} onClick={() => {
                        getAdminResetLeaderboard()
                    }}
                        className='text-white font-[400] text-sm bg-[#333] border-2 border-[#000] h-full rounded-lg p-3 px-4 flex items-center gap-x-1'    
                    >
                        Reset Points
                    </button>}
                </div>

                {leaderboardDataLoading
                    ? <div style={{ marginTop: '-10px', marginBottom: '10px' }} className='flex flex-col h-20 gap-3 px-6 py-2 relative group transition-all animate-pulse'>
                         <div className='absolute left-4 right-4 top-0 bg-[#00000090] w-[calc(100%-32px)] h-full rounded transition-all' />
                    </div>
                    : <div style={{ marginTop: '-10px', marginBottom: '10px' }} className='flex flex-col gap-3 px-6 py-2 relative group transition-all'>
                        <div className='flex flex-col'>
                            <h1 style={{ fontSize: '20px' }} className='text-[16px] font-bold flex items-center'>
                                {leaderboardInfo?.title}
                                <span className='font-semibold text-xs ml-2 px-1 p-[2px] rounded-lg bg-[#FFF] text-black'>Ongoing</span>
                            </h1>
                            <span style={{ fontSize: '13px' }}  className='text-xs font-semibold text-slate-400'>{new Date(leaderboardInfo?.startTimer).toDateString()} - {new Date(leaderboardInfo?.endTimer).toDateString()}</span>
                        </div>

                        {leaderboardInfo?.description && <pre style={{ fontSize: '16px' }} className={`font-[Nunito] text-sm whitespace-break-spaces`} id='description_participaton'>
                            {leaderboardInfo?.description}
                        </pre>
}
                        {userInfo?.isSuperAdmin && <div className='absolute left-4 right-4 top-0 bg-[#00000090] w-[calc(100%-32px)] h-full rounded-lg group-hover:visible invisible transition-all'>
                            <button className='absolute right-2 top-2 w-7 h-7 rounded-md flex items-center justify-center bg-white text-black hover:opacity-[0.8]'
                                onClick={() => {
                                    setOpenEditModal(true)
                                }}
                            >
                                <EditIcon />
                            </button>
                        </div>}
                    </div>
                }

                <div>
                {
                    // userInfo?.isSuperAdmin ?
                        <div className={`flex h-full flex-col w-full gap-y-3 ${styles.paddingModal}`}>
                            <div className='flex items-center justify-between w-full mb-1 font-bold border-b-[0.5px]'>
                                <h1>Wallet Address</h1>

                                <p>Points</p>
                            </div>
                            {leaderboardDataLoading
                                ? <LeaderboardCardSkeleton />
                                : allLeaderboardData?.map((data, key) => (
                                    <LeaderboardCard data={data} key={key} />
                                ))
                            }
                        </ div>
                    // :
                    // <div
                    //     className={`flex h-full flex-col w-full gap-y-3 ${styles.paddingModal}`}
                    // >
                    //     <div className='flex items-center justify-between'>
                    //         <h1>Won Events: </h1>
                    //         <h2>{leaderboardData?.length}</h2>
                    //     </div>
                    //     <div className='flex items-center justify-between'>
                    //         <h1>Total Earned: </h1>
                    //         <h2>{leaderboardData?.reduce((a, b) => a+ parseInt(b?.wonPrice), 0)} BLVCK</h2>
                    //     </div>
                    //     <div className='flex items-center justify-between'>
                    //         <h1>Prediction Points: </h1>
                    //         <h2>{userInfo?.predictionPoints} Points</h2>
                    //     </div>
                    // </div>
                }
                </div>
            </div>

            {/* Close Button */}
            <div
                className={`fixed rounded-full flex items-center justify-center top-[15px] right-[15px] p-[2px] h-[40px] w-[40px] bg-white text-primaryColor cursor-pointer`}
                onClick={(e) => setOpenModal(false)}
            >
                <CloseSvg />
            </div>

            <AddLeaderboardDetails openModal={openEditModal} setOpenModal={setOpenEditModal} leaderboardInfo={leaderboardInfo} />
        </div>
    )
}

export default LeaderboardDataModal

const LeaderboardCardSkeleton = () => {
    return (
        <div className='flex items-center justify-between w-full'>
            <div className='flex items-center gap-2'>
                <figure className='w-10 h-10 overflow-hidden rounded-full bg-[#00000089] flex items-center justify-center animate-pulse' />
                <div className='flex flex-col gap-1'>
                    <h1 className='font-bold bg-slate-400 h-2 w-32 rounded animate-pulse' />
                    <h2 className='text-slate-400 text-xs bg-slate-400 h-[6px] w-20 rounded animate-pulse' />
                </div>
            </div>
        </div>
    )
}

const LeaderboardCard = ({data}) => {
    return (
        <div className='flex items-center justify-between w-full'>
            <div className='flex items-center gap-2'>
                <figure className='w-10 h-10 overflow-hidden rounded-full bg-[#000] flex items-center justify-center'>
                    <img src={data?.profileImage || ""} alt="" className='w=full h-full object-cover' />
                </figure>
                <div className='flex flex-col'>
                    <h1 className='font-bold'>{data?.username}</h1>
                    <h2 className='text-slate-400 text-xs'>{data?.walletAddress?.substr(0, 8) + '...' + data?.walletAddress?.substr(data?.walletAddress?.length - 3, data?.walletAddress?.length)}</h2>
                </div>
            </div>

            <p>{data?.points}</p>
        </div>
    )
}