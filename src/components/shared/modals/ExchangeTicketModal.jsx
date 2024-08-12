import { Fragment, useContext, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import ticket_Exch from '../../../assets/svg/ticket_Exch.svg'
import logo from '../../../assets/svg/BlvckCoin.svg'
import exch from '../../../assets/svg/exch.svg'
import ticket from '../../../assets/svg/ticket.svg'
import website from '../../../assets/svg/website.svg'
import bcrypt from 'bcryptjs'
import axios from 'axios'
import { BACKEND_URL, WalletConnectContext } from '../../../hooks/WalletLogin'
import { useEffect } from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

// 1. /user/tranferCoinsToKURAMA jisme user ke paise katenge and Activity mei show ho jayega ki kurama par coins transfer kr diye
// 2. /collection/BLVCK jisme apne platform mei paise add ho jayenge (ye post request hai verification hash dekh lena API mei konsa lena hai)

const ExchangeTicketModal = ({ openModal, setOpenModal }) => {
    const cancelButtonRef = useRef(null)
    const [data, setData] = useState()
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [KURAMAHovered, setKURAMAHovered] = useState(false)
    const [verificationHashString, setVerificationHash] = useState('')
    const {
        isWalletLogin,
        userInfo,
        accessToken,
        updateLocalUserInfo
    } = useContext(WalletConnectContext)

    const acceptCoins = async (coins, randomNumber) => {
        if (isWalletLogin) {
            try {
                await axios
                    .post(
                        `${process.env.REACT_APP_KURAMA_BACKEND_URL ? process.env.REACT_APP_KURAMA_BACKEND_URL : 'https://prodKurama.foxledger.io'}/collection/BLVCK`,
                        {
                            coins, walletAddress : userInfo?.walletAddress, verificationHash: verificationHashString, uuid: randomNumber
                        }
                    )
                    .then(async(res) => {
                        await axios
                        .post(
                            `${process.env.REACT_APP_KURAMA_BACKEND_URL ? process.env.REACT_APP_KURAMA_BACKEND_URL : 'https://prodKurama.foxledger.io'}/collection/KURAMAxBLVCKStats`,
                            {
                                walletAddress : userInfo?.walletAddress, verificationHash: verificationHashString
                            }
                            )
                            .then(async(res) => {
                                setData(res.data)
                                await updateLocalUserInfo()
                                setLoading(false)
                                setInput('')
                        })
                        .catch((err) => {
                            console.log(err)
                            setLoading(false)
                        })
                    })
                    .catch((err) => {
                        setLoading(false)
                        console.log(err)
                    })
            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        const getData = async () => {
            if (isWalletLogin) {
                try {
                    const salt = await bcrypt.genSalt(10)
                    const verificationHash = await bcrypt.hashSync(
                            `KURAMAxBLVCK Verification Hash 909f08bb-9014-4933-b191-ade0188a4f64`,
                            salt
                        )
                    setVerificationHash(verificationHash)

                    await axios
                        .post(
                            `${process.env.REACT_APP_KURAMA_BACKEND_URL ? process.env.REACT_APP_KURAMA_BACKEND_URL : 'https://prodKurama.foxledger.io'}/collection/KURAMAxBLVCKStats`,
                            {
                                walletAddress : userInfo?.walletAddress, verificationHash: verificationHash
                            }
                        )
                        .then((res) => {
                            setData(res.data)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                } catch (err) {
                    console.log(err)
                }
            }
        }

        getData()
    }, [])

    const tranferCoinsToKURAMA = async (coins) => {
        const randomNumber = uuidv4()
        if (isWalletLogin) {
            setLoading(true)
                const config = {
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${accessToken}`,
                },
            }
            try {
                await axios
                    .post(
                        `${BACKEND_URL}/users/tranferCoinsToKURAMA`,
                        {
                            coins, userId: userInfo?._id, uuid: randomNumber
                        },
                        config
                    )
                    .then((res) => {
                        acceptCoins(input, randomNumber)
                    })
                    .catch((err) => {
                        console.log(err)
                        setLoading(false)
                    })
            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        }
    }

    return (
        <Transition.Root show={openModal} as={Fragment}>
            <Dialog
                as='div'
                className='fixed z-[10000] inset-0 overflow-y-auto'
                initialFocus={cancelButtonRef}
                onClose={setOpenModal}
            >
                <div className='h-screen px-4 text-center block p-0'>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        enterTo='opacity-100 translate-y-0 sm:scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                        leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    >
                        <Dialog.Overlay className='fixed inset-0 bg-[#0C0C0DB2] bg-opacity-75 backdrop-blur-sm transition-opacity' />
                    </Transition.Child>
                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className='inline-block align-middle h-screen'
                        aria-hidden='true'
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        enterTo='opacity-100 translate-y-0 sm:scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                        leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    >
                        <div className='inline-block bg-transparent rounded-lg text-left transform transition-all my-8 align-middle max-w-lg w-full'>
                            <div className='flex justify-center w-full items-start bg-card_bg_new rounded-xl text-white h-full p-7 flex-col gap-y-8 border border-[#3D3D3D]'>
                                <img src={ticket_Exch} alt="" />
                                <h2 className='text-xl font-[700] text-left multi_shade_text'>
                                Transfer BLVCK coins to Kurama Marketplace
                                </h2>
                                <div className='flex flex-col w-full gap-y-8'>
                                    <div className='w-full bg-[#0D0E12] border border-[#3A3C40] rounded-[12px] flex items-center justify-between screen3:flex-col screen3:items-start'>
                                        <div className='flex flex-col h-full whitespace-nowrap p-2 px-4 pr-6 '>
                                            <p className='text-[#565656] text-[12px]'>Your BLVCK Balance:</p>
                                            <h3 className='text-[26px] flex items-center gap-2'>{(userInfo?.coinsBalance > 1000 ? (userInfo?.coinsBalance/1000).toFixed(1) + 'K' : userInfo?.coinsBalance)} <img src={logo} alt='blvck' width={30} /></h3>
                                        </div>
                                        <div className='h-[78px] w-[2px] bg-[#3A3C40] flex items-center justify-center screen3:w-full screen3:bg-transparent screen3:h-[35px]'>
                                            <img src={exch} alt="" className='absolute'/>
                                        </div>
                                        <div style={{ paddingRight: '2.3rem' }} className='flex flex-col h-full w-full p-2 px-4 pl-10 screen3:pl-4'>
                                            <p className='text-[#565656] text-[12px]'>Your Kurama Balance:</p>
                                            <div className='flex items-center gap-5 screen4:flex-col screen4:items-start screen3:gap-1'>
                                                {(<h3 className='text-[26px] flex items-center gap-2'>{(data && data?.BLVCKCoins ? (data?.BLVCKCoins > 1000 ? (data?.BLVCKCoins/1000).toFixed(1) + 'K' : data?.BLVCKCoins) : '--')} <img src={logo} alt='blvck' width={30} /></h3>)}
                                                <div className='h-[20px] w-[1px] bg-[#3A3C40] screen4:w-full screen4:h-[1px]'></div>
                                                {(<h3 className='text-[26px] flex items-center gap-2'>{( data && data?.KURAMATickets ? (parseInt(data?.KURAMATickets) > 1000 ? parseInt(data?.KURAMATickets)/1000 + 'K' : parseInt(data?.KURAMATickets)) : '--')} <img src={ticket} alt='blvck' width={30} /></h3>)}
                                            </div>
                                        </div>
                                    </div>

                                    {userInfo.coinsBalance >= 2000 && <div className='w-full flex flex-col gap-1'>
                                        <p className='text-[#565656] text-[12px]'>Choose Amount to transfer</p>
                                        <div className='w-full gap-3 flex items-center'>
                                            {userInfo.coinsBalance >= 2000 && <button className='flex items-center justify-center w-full gap-1 bg-[#0D0E12] border border-[#3A3C40] p-2 px-4 rounded-[8px]'  onClick={() => {setInput(Math.floor(0.1 * userInfo?.coinsBalance))}} >
                                                {Math.floor(0.1 * userInfo?.coinsBalance)} <img src={logo} alt='blvck' width={22} />
                                            </button>}
                                            {userInfo.coinsBalance >= 5000 && <button className='flex items-center justify-center w-full gap-1 bg-[#0D0E12] border border-[#3A3C40] p-2 px-4 rounded-[8px]'  onClick={() => {setInput(Math.floor(0.25 * userInfo?.coinsBalance))}} >
                                                {Math.floor(0.25 * userInfo?.coinsBalance)} <img src={logo} alt='blvck' width={22} />
                                            </button>}
                                            {userInfo.coinsBalance >= 5000 && <button className='flex items-center justify-center w-full bg-[#0D0E12] border border-[#3A3C40] p-2 px-4 rounded-[8px]'  onClick={() => {setInput(Math.floor(0.5 * userInfo?.coinsBalance))}} >
                                                {'Half'}
                                            </button>}
                                            {userInfo.coinsBalance >= 5000 && <button  className='flex items-center justify-center w-full bg-[#0D0E12] border border-[#3A3C40] p-2 px-4 rounded-[8px]'  onClick={() => {setInput(Math.floor(userInfo?.coinsBalance))}} >
                                                {'Full'}
                                            </button>}
                                        </div>
                                    </div>}

                                    <div className='w-full flex items-center'>
                                        <input className='flex items-center justify-center w-full bg-[#0D0E12] border border-[#3A3C40] p-2 px-4 rounded-l-[8px] outline-none placeholder:text-[#565656]' 
                                            placeholder='Enter Amount'
                                            value={input}
                                            onChange={(e) => {setInput(parseInt(e.target.value))}}
                                            type={'number'}
                                            min={0}
                                        />
                                        <button className='font-[Oxanium] flex items-center justify-center bg-[#FFFFFF] font-[500] text-[#000000] border border-[#3A3C40] p-2 px-4 rounded-r-[8px] disabled:cursor-not-allowed disabled:opacity-30' 
                                        disabled={!input || input === 0 || userInfo.coinsBalance === 0 || userInfo.coinsBalance < input || loading}
                                        // disabled={true}
                                        onClick={() => {tranferCoinsToKURAMA(input)}}
                                        >
                                            {loading ? 'Transfering...' : 'Transfer'}
                                        </button>
                                    </div>
                                    <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}><img style={{ marginBottom: '3px' }} src={website} />Visit <a onMouseEnter={() => setKURAMAHovered(true)} onMouseLeave={() => setKURAMAHovered(false)} style={KURAMAHovered ? { transition: 'all 0.2s ease-in-out', color: '#ed6843', textDecoration: 'underline', textUnderlineOffset: '5px' } : { color: 'rgb(237, 104, 67)' }} href="https://kurama.io">Kurama.io</a></p>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ExchangeTicketModal
