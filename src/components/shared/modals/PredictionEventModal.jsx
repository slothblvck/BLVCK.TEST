import { useContext, useEffect, useState } from 'react'
import { WalletConnectContext } from '../../../hooks/WalletLogin'
import CloseSvg from '../../../assets/svg/CloseSvg'
import ConnectModal from './ConnectModal'
import CardTimer from '../../Marketplace/CardTimer'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const PredictionEventModal = ({
    setOpenModal,
    event
}) => {
    const { userInfo, getParticipatedPredicitionEventData } = useContext(WalletConnectContext)

    const [isParticipated, setParticipated] = useState(false)
    const [disableField, setDisable] = useState(false)
    const [showMore, setMore] = useState(false)
    const [isData, setData] = useState(false)
    const [answers, setAnswers] = useState({})

    const toHyperlink = () => {
        try {
            var descriptionComponent = document.getElementById(
                'description_participaton'
            )
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
            }
            // return str2
        } catch (err) {
            console.log(err)
        }
    }

    const checkValid = () => {
        if (new Date(event?.expireAt).getTime() > Date.now()) {
            return true
        } else {
            return false
        }
    }

    const styles = {
        button: `w-full px-2 py-2 flex items-center justify-center cursor-pointer rounded-lg font-[500] text-lg bg-white text-black mt-4 ${
            new Date(event?.expireAt).getTime() < Date.now()
                ? 'opacity-50 cursor-not-allowed'
                : ''
        }flex items-center justify-center gap-x-2`,
        title: `text-2xl font-[600] text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] to-[#FFFFFF75] break-all`,
        modalContentWrapper: `w-[400px] bg-cardModal text-white py-12 pb-8 flex flex-col gap-y-4 min-h-full relative screen4:w-screen border-l border-[#3D3D3D] overflow-scroll`,
        paddingModal: `px-12 screen4:px-6 screen5:px-3 `,
        participantCount: `absolute participate_now_hover_Effect top-2 right-[3.5rem] bg-white z-10 border-[2.7px] border-[#121212] text-black text-sm h-9 w-9 font-[600] p-3 px-4 flex justify-center items-center rounded-full backdrop-blur cursor-pointer`,
        nftParticipated: `participationsDone absolute top-2 right-[3.5rem] bg-white z-10 text-black text-sm font-[500] border-[2.7px] border-[#121212] h-9 w-min px-4 py-3 flex justify-center items-center rounded-full backdrop-blur cursor-pointer `,
        nftParticipants: `absolute top-2 right-[3.5rem] bg-white z-10 text-black text-sm font-[500] border-[2.7px] border-[#121212] h-9 w-max px-4 py-3 flex justify-center items-center rounded-full backdrop-blur cursor-pointer `,
        tab_button: `text-[#FFF] font-[700] leading-[24px] text-[16px] border-b-2 border-white px-1 pb-1 font-[Oxanium]`,
        tab_button_disabled: `text-[#FFF] font-[700] leading-[24px] text-[16px] border-b-2 border-transparent px-1 pb-1 opacity-40 font-[Oxanium]`
    }

    var descriptionComponent = document.getElementById(
        'description_participaton'
    )

    useEffect(() => {
        if (!descriptionComponent) {
            setData(!isData)
        } else if (descriptionComponent) {
            toHyperlink()
        }
    }, [descriptionComponent, isData])

    useEffect(() => {
        if(event?.participatedBy?.find((e) => e === userInfo?.walletAddress)){
            getParticipatedPredicitionEventData(event?._id)
            setParticipated(true)
        }
    }, [event?._id, event?.participatedBy, userInfo?.walletAddress])

    useEffect(() => {
        if(userInfo?.isAdmin && new Date(event?.expireAt) < Date.now() && !event?.isAnnounced){
            setDisable(false)
            setParticipated(false)
        }else if ((event?.participatedBy?.find((e) => e === userInfo?.walletAddress)) || new Date(event?.expireAt) < Date.now()){
            setDisable(true)
        }
    }, [event, userInfo])

    return (
        <div className='inline-block bg-transparent text-left transform transition-all align-middle max-w-lg h-screen relative'>
            <div className={styles.modalContentWrapper}>
                <div
                    className={`rounded-lg flex w-full h-[280px] relative ${styles.paddingModal}`}
                >
                    <img
                        src={event?.image}
                        alt=''
                        className='rounded-lg object-cover w-[inherit] h-[inherit]'
                    />
                </div>

                <div
                    className={`flex h-full flex-col w-full gap-y-3 ${
                        showMore ? 'pb-3' : ''
                    } ${styles.paddingModal}`}
                >
                    {/* Title */}
                    <h1 className={`${styles.title}`}>
                        {event.name.trim()}
                    </h1>

                    {/* Description */}
                    <p  style={{ wordBreak: 'break-word' }}
                        className='font-[400] text-base py-2 -mt-1'
                        id='description_participaton'
                    >
                        {event?.description}
                    </p>

                    <EventContainer disableField={disableField} setOpenModal={setOpenModal} isParticipated={isParticipated} event={event} checkValid={checkValid} answers={answers} setAnswers={setAnswers} />
                </div>
            </div>

            {/* Close Button */}
            <div
                className={`fixed rounded-full flex items-center justify-center top-[15px] right-[15px] p-[2px] h-[40px] w-[40px] bg-white text-primaryColor cursor-pointer`}
                onClick={(e) => setOpenModal(false)}
            >
                <CloseSvg />
            </div>
        </div>
    )
}

export default PredictionEventModal

const EventContainer = ({event, checkValid, answers, setAnswers, isParticipated, setOpenModal, disableField}) => {
    const { userInfo, participatedData, connectLoading } = useContext(WalletConnectContext)

    const styles = {
        label: `text-[#A3A3A3] text-[14px] font-[400]`,
        input: `border border-[#525252] w-full bg-transparent outline-none rounded px-3 py-2 text-sm text-white placeholder:text-[#A3A3A3] mt-2 h-10 focus:border-[#FFF] focus:border-3`,
        button: `w-full px-1 py-2 flex items-center justify-center rounded-md min-h-9 font-[500] text-sm bg-white text-black mt-4 ${
            new Date(event?.expireAt).getTime() < Date.now()
                ? 'cursor-not-allowed'
                : ''
        }flex items-center justify-center gap-x-2`,
    }

    const [openConnectModal, setOpenConnectModal] = useState(false)

    return(
        <>
            {userInfo?.isSuperAdmin &&(
                <div className='flex items-center justify-between w-full'>
                    <span className='font-[400] text-base leading-6'>
                        Total Entries (Only Admin)
                    </span>
                    <span className='font-[700] text-lg leading-6'>
                        {event?.totalEntry}
                    </span>
                </div>
            )}

            {
                event?.predictions?.length > 0 && (
                    <>
                    
                       <br />

                        <div className='flex flex-col'>
                            <p style={{ fontSize: '18px' }} className='text-sm font-[500]'>Answer question to participate</p>

                            {event?.predictions?.map((prediction, p_key) => {
                                return (
                                    <div key={p_key}>
                                        <div style={{ marginTop: '20px' }} className='flex items-baseline w-full gap-2'>
                                            <span style={{ fontSize: '15px' }} className='mt-2 text-xs'>Q{p_key+1}.</span>
                                            <h1 style={{ fontSize: '15px' }} className='text-sm'>
                                                {prediction?.question}
                                            </h1>
                                        </div>
                                        
                                        <PredictionSelect
                                            options={prediction?.options || []}
                                            disabled={disableField}
                                            isParticipated={isParticipated}
                                            value={isParticipated && participatedData.answers ? participatedData?.answers[p_key]?.value : answers[`${p_key}`]?.value || ""}
                                            participatedData={participatedData}
                                            setAnswers={setAnswers}
                                            p_key={p_key}
                                            participatedAnswers={isParticipated ? participatedData?.answers || {} : {}}
                                            announced={event?.isAnnounced}
                                            correctAnswers={event?.correctAnswers}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                </>
                )
            }

            <br />

            <div className='flex items-center justify-between w-full my-2 screen5:flex-col screen5:items-start screen5:gap-y-4'>
                {/* Price */}
                <div
                    style={{ gap: '17px' }}
                    className='flex flex-col items-start h-[80px]'
                >
                    <span className='text-sm font-[400]'>{'Price'}</span>
                    <p className='font-[700] text-xl'>{event?.price || 1} BLVCK</p>
                </div>

                {/* Timer */}
                {checkValid() && event?.expireAt !== ' ' && (
                    <div className='flex h-[80px] flex-col items-start justify-between'>
                        <span className='text-sm font-[400]'>Ending in</span>
                        <CardTimer
                            coloured
                            targetData={event?.expireAt}
                        />
                    </div>
                )}
            </div>

            <Button isParticipated={isParticipated} participatedData={isParticipated ? participatedData || {} : {}} setOpenModal={setOpenModal} styles={styles} checkValid={checkValid} event={event} answers={answers} setOpenConnectModal={setOpenConnectModal} />

            <ConnectModal
                openModal={openConnectModal}
                setOpenModal={setOpenConnectModal}
                connectLoading={connectLoading}
            />
        </>
    )
}

const Button = ({styles, isParticipated, setOpenModal, participatedData, event, checkValid, answers, setOpenConnectModal}) => {
    const { participatePredictionEvent, predictionEventParticipation, userInfo, isWalletLogin, announceLoading, announcePredictionEventWinners } = useContext(WalletConnectContext)

    const connectWallet = async () => {
        setOpenConnectModal(true)
    }

    if(!isWalletLogin){
        return <button
            className={`${styles.button}`}
            onClick={() => {
                if (!isWalletLogin)
                    // setOpenModal(false)
                    connectWallet()
            }}
        >
            <span>
                {'Connect to Wallet'}
            </span>
        </button>
    }else if(isWalletLogin && userInfo?.isAdmin && new Date(event?.expireAt)?.getTime() <= Date.now()){
        return <button
            className={`${styles.button} disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={() => {
                announcePredictionEventWinners(event?._id, answers)
                setOpenModal(false)
            }}
            disabled={event?.isAnnounced || new Date(event?.expireAt)?.getTime() > Date.now() || announceLoading || Object.entries(answers)?.length !== event?.predictions?.length}
        >
            <span className='text-sm'>
                {event?.isAnnounced ? 'Already Announced' : announceLoading ? 'Announcing...' : 'Announce Winners'}
            </span>
        </button>
    }else if(!checkValid() && event?.winners?.find(user => user.participant === userInfo?.walletAddress)){
        return <button
            className={`${styles.button} cursor-not-allowed`}
            disabled={true}
        >
            You Won {participatedData?.pointsEarned} Points
        </button>
    }else if(!checkValid()){
        return <button
            className={`${styles.button} cursor-not-allowed`}
            disabled={true}
        >
            {isParticipated ? (participatedData?.pointsEarned ? `You Won ${pointsEarned}`: event?.isAnnounced ? 'You Lost' : 'Results Not Announced') : `Not Participated`}
        </button>
    }else if(event?.participatedBy?.find((e) => e === userInfo?.walletAddress)){
        return <button
            className={`${styles.button} cursor-not-allowed`}
            disabled={true}
        >
            Already Participated
        </button>
    }else if(userInfo?.coinsBalance === 0 || userInfo?.coinsBalance < event?.price){
        return <button
            className={`${styles.button} cursor-not-allowed`}
            disabled={true}
        >
            NOT ENOUGH BALANCE
        </button>
    }else{
        return <button
            className={`${styles.button} disabled:opacity-50 mt-0 px-1`}
            disabled={predictionEventParticipation || new Date(event?.expireAt).getTime() < Date.now() || Object.entries(answers).length === 0}
            onClick={() => {
              participatePredictionEvent(event?._id, answers, setOpenModal)
            }}
        >
            {predictionEventParticipation ? 'Participating...' : `Participate`}
        </button>
    }
}

const PredictionSelect = ({options, announced, value, disabled, isParticipated, setAnswers, p_key, participatedAnswers, correctAnswers}) => {
    const findPoints = (value) => {
        const option = options.find((opt) => opt?.value === value);

        return option?.points || 0;
    }

    const handleChange = (event) => {
        // if(event.target.value === "") return

        setAnswers(prev => ({
            ...prev, [`${p_key}`]: {
                value: event.target.value,
                points: findPoints(event.target.value)
            }
        }))
    };

    return <div className='w-full mt-4'>
        <Select
            // disabled={disabled}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value || "select"}
            defaultValue={"select"}
            onChange={handleChange}
            sx={{
                width: '100%',
                color: '#FFF',
                padding: '0',
                border: announced && Object.entries(participatedAnswers).length > 0 ? (correctAnswers[p_key]?.value === participatedAnswers[p_key]?.value ? '2px solid green !important' : '2px solid red !important') : '',
                '.MuiSelect-select': {
                    padding: '13px 14px',
                    color: '#FFF',
                    '-webkit-text-fill-color': 'unset !important',
                },
                '.Mui-disabled': {
                    color: '#FFF !important',
                    '-webkit-text-fill-color': 'unset',
                },
                '.MuiSelect-select.Mui-disabled': {
                    color: '#FFF !important',
                    '-webkit-text-fill-color': 'unset',
                }
            }}
        >
            <MenuItem value="select" disabled>Select</MenuItem>
            {options?.map((option, key) =>
                <MenuItem value={option.value} key={key} className='flex items-center justify-between w-full'
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                    sx={{
                        opacity: '1 !important',
                        background: announced ? (correctAnswers[p_key]?.value === option.value ? 'green !important' : (correctAnswers[p_key]?.value !== value && value === option.value) ? 'red !important' : '') : '',
                        color: announced ? (correctAnswers[p_key]?.value === option.value ? 'white !important' : (correctAnswers[p_key]?.value !== value && value === option.value) ? 'white !important' : '') : '',
                    }}
                    disabled={disabled}
                >
                    {option.value}
                    <span style={{ marginLeft: '10px' }} className='text-slate-400'>
                        ({option.points} Points)
                    </span>
                </MenuItem>
            )}
        </Select>
    </div>
}
