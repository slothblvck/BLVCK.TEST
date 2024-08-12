import { Fragment, useContext, useRef } from 'react'
import { Edit } from '@mui/icons-material'
import insta from '../../../assets/instagram.png'
import discord from '../../../assets/discord.png'
import twitter from '../../../assets/twitter.png'
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
import { TimerBoxModal, monthNames } from '../../../pages/Events/Events'
import DownloadSvg from '../../../assets/svg/DownloadSvg'

// 1. /user/tranferCoinsToKURAMA jisme user ke paise katenge and Activity mei show ho jayega ki kurama par coins transfer kr diye
// 2. /collection/BLVCK jisme apne platform mei paise add ho jayenge (ye post request hai verification hash dekh lena API mei konsa lena hai)

const EventViewModal = ({ openModal, setOpenModal, item, setOpenEditModal, edit, downloadData }) => {
    const cancelButtonRef = useRef(null)
    const [data, setData] = useState()
    const [showModal, setshowModal] = useState(true)
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [KURAMAHovered, setKURAMAHovered] = useState(false)
    const [verificationHashString, setVerificationHash] = useState('')
    const {
        isWalletLogin,
        allSubscribersLoading,
        userInfo,
    } = useContext(WalletConnectContext)

    useEffect(() => {
        if (!showModal) {
            setOpenModal(false)
            setshowModal(true)
        }
    }, [showModal])

    // useEffect(() => {
    //     const getData = async () => {
    //         if (isWalletLogin) {
    //             try {
    //                 const salt = await bcrypt.genSalt(10)
    //                 const verificationHash = await bcrypt.hashSync(
    //                         `KURAMAxBLVCK Verification Hash 909f08bb-9014-4933-b191-ade0188a4f64`,
    //                         salt
    //                     )
    //                 setVerificationHash(verificationHash)

    //                 await axios
    //                     .post(
    //                         `${process.env.REACT_APP_KURAMA_BACKEND_URL ? process.env.REACT_APP_KURAMA_BACKEND_URL : 'https://prodKurama.foxledger.io'}/collection/KURAMAxBLVCKStats`,
    //                         {
    //                             walletAddress : userInfo?.walletAddress, verificationHash: verificationHash
    //                         }
    //                     )
    //                     .then((res) => {
    //                         console.log(res.data)
    //                         setData(res.data)
    //                     })
    //                     .catch((err) => {
    //                         console.log(err)
    //                     })

    //                 console.log('RUNNING')
    //             } catch (err) {
    //                 console.log(err)
    //             }
    //         }
    //     }

    //     getData()
    // }, [])

    return (
        <Transition.Root show={openModal} as={Fragment}>
            <Dialog
                as='div'
                className='fixed z-[10000] inset-0 overflow-y-auto'
                initialFocus={cancelButtonRef}
                onClose={() => setOpenModal(false)}
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
                        <div className='inline-block bg-transparent rounded-lg text-left transform transition-all my-8 align-middle max-w-3xl w-full'>
                            <div className='flex justify-center w-full items-start bg-card_bg_new rounded-xl text-white h-full p-7 flex-col gap-y-3 border border-[#3D3D3D]'>
                                {/* Image */}
                                <div className='w-full h-[200px] bg-[#00000039] min-h-[200px] rounded-[8px] relative'>
                                    <img src={item?.image} alt="" className='w-[inherit] h-[inherit] object-cover' />

                                    {/* {!item?.isVerified && item?.category === 'CommunityProject' && <div style={{ paddingTop: '7px', paddingBottom: '6px', fontFamily: 'Avenir Next' }} className='absolute top-2 right-2 rounded-[8px] p-2 px-3 bg-red-700 text-white text-[14px]'>Under Verification</div>} */}
                                    {/* {!item?.isVerified && userInfo?.isSuperAdmin && <button className='absolute bottom-1 right-2 rounded-[8px] p-2 px-3 bg-green-700 text-white text-[14px]' style={{fontFamily: 'Avenir Next'}} onClick={() => verifyPartner(item?._id)}>Verify</button>} */}
                                    {/* {!item?.isVerified && userInfo?.isSuperAdmin && <button className='absolute bottom-1 right-20 rounded-[8px] p-2 px-3 bg-red-600 text-white text-[14px]' style={{fontFamily: 'Avenir Next'}} onClick={() => deletePartner(item?._id)}>Delete</button>} */}

                                    {userInfo?.isSuperAdmin && <button className='absolute top-2 right-[0.7rem] bg-white text-black z-10 text-sm font-[500] h-9 w-9 p-2 flex justify-center items-center rounded-full backdrop-blur cursor-pointer' style={{fontFamily: 'Avenir Next'}} onClick={() => {
                                        edit()
                                        setShowModal(false)
                                    }}><Edit /></button>}
                                    {userInfo?.isSuperAdmin && <button className='absolute top-2 left-[0.7rem] bg-white text-black z-10 text-sm font-[500] h-9 w-min gap-2 p-2 px-4 flex justify-center items-center rounded-full backdrop-blur cursor-pointer' style={{fontFamily: 'Avenir Next'}} onClick={downloadData}>
                                    <DownloadSvg />{allSubscribersLoading ? 'Downloading...' : 'Download'}
                                    </button>}
                                    {/* {userInfo?.isSuperAdmin && <button className='absolute top-2 right-2 rounded-[8px] p-2 px-3 bg-red-600 text-white text-[14px]' style={{fontFamily: 'Avenir Next'}} onClick={() => deletePartner(item?._id)}>Delete</button>} */}
                                </div>

                                <div className='flex flex-col gap-[20px] w-full'>
                                    {/* Top */}
                                    <div className='flex items-center justify-between w-full screen4:flex-col screen4:items-start'>
                                        <div className='flex items-center gap-2'>
                                            {/* <div className='min-w-[48px] w-[48px] h-[48px] min-h-[48px] rounded-full bg-[#000]'></div> */}
                                            {/* <div className='h-[48px] w-[48px] min-h-[48px] min-w-[48px] bg-[#D9D9D9] rounded-full'></div> */}
                                            <h1 className='text-[#FFFFFF] text-[24px] leading-[29px] font-[600]'>{item?.name}</h1>
                                            {/* {item?.tags?.length > 0 && item?.tags?.map((i, key) => ( */}
                                            <h2 style={{ paddingTop: '5px', paddingBottom: '4px' }} className='bg-[#F8F8F8] px-[6px] py-[4px] text-[#000000] font-[500] text-[10px] leading-[10px] rounded-[2px]'>{item.category === 'FeaturedEvent' ? 'Featured Event' : 'Community Event'}</h2>
                                            {/* ))} */}
                                        </div>

                                        {/* <div className='flex items-center gap-3 screen4:justify-end screen4:w-full'>
                                            {item?.instagram && <button className='w-[20px] h-[20px]' onClick={() => window.open(item?.instagram, '_blank')}>
                                                <img src={insta} alt="" className='w-[inherit] h-[inherit] object-cover'/>
                                            </button>}
                                            {item?.discord && <button className='w-[20px] h-[20px]' onClick={() => window.open(item?.discord, '_blank')}>
                                                <img src={discord} alt="" className='w-[inherit] h-[inherit] object-cover'/>
                                            </button>}
                                            {item?.twitter && <button className='w-[20px] h-[20px]' onClick={() => window.open(item?.twitter, '_blank')}>
                                                <img src={twitter} alt="" className='w-[inherit] h-[inherit] object-cover'/>
                                            </button>}
                                            {item?.opensea && <button className='w-[20px] h-[20px]' onClick={() => window.open(item?.opensea, '_blank')}>
                                                <img src={`https://pro.opensea.io/_next/static/media/opensea.95035007.svg`} alt="" className='w-[inherit] h-[inherit] object-cover'/>
                                            </button>}

                                            <div className='flex items-center'>
                                                <button
                                                style={{ paddingTop: '7px', paddingBottom: '5px' }} className='bg-[#F8F8F8] px-[10px] py-[6px] text-[#000000] font-[600] text-[14px] leading-[20px] rounded-[4px]' onClick={() => window.open(item?.websiteLink, '_blank')}>Visit Website</button>
                                            </div>
                                        </div> */}
                                    </div>

                                    {/* Bottom */}
                                    <div className='flex flex-col gap-2'>
                                        <h1 className='font-[700] text-[14px] leading-[17px]'>Description</h1>
                                        <p className='font-[400] text-[16px] leading-[24px] text-[#E2E2E2]'>
                                            {item?.description}
                                        </p>
                                    </div>

                                    <div className='flex flex-col w-full gap-[16px]  screen3:gap-[8px]'>
                                        <div className='flex items-start justify-between screen3:flex-col  screen3:gap-[8px]'>
                                            <ItemBox heading={'Location'} value={item?.country} Icon={<LocationSvg />} />
                                            <ItemBox heading={'End Date'} value={`${new Date(item?.expireAt).getDate() } ${' '} ${ monthNames[new Date(item?.expireAt).getMonth()]}`} Icon={<EndDateSvg />} />
                                        </div>
                                        <div className='flex items-start justify-between screen3:flex-col  screen3:gap-[8px]'>
                                            <ItemBox heading={'Address'} value={item?.address} Icon={<AddressSvg />} />
                                            {new Date(item?.expireAt).getTime() > Date.now()  && <ItemBox heading={'Ends In'} value={<TimerBoxModal timer={item?.expireAt} />} Icon={<EndsInSvg />} />}
                                        </div>
                                    </div>


                                    <button className='w-full py-[10px] px-[16px] flex items-center justify-center bg-[#F8F8F8] rounded-[4px] text-[#000] text-[18px] font-[Montserrat] font-[500]'
                                        onClick={() => window.open(item?.websiteLink, '_blank')}
                                    >Visit Website</button>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default EventViewModal

const ItemBox = ({heading, value: para, Icon}) => {
    return(
        <div className='flex flex-col gap-[6px] flex-start w-[200px] pl-[30px] relative  screen3:w-full'>
            <span style={{ marginTop: '2px' }} className='absolute left-0 top-0'>
                {Icon}
            </span>

            <h1 className='font-[700] font-[16px] text-[#FFF] font-[Montserrat]'>{heading}</h1>
            <p className='font-[400] text-[16px] leading-[24px] text-[#E2E2E2]'>{para}</p>
        </div>
    )
}

const LocationSvg = () => {
    return(<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7993 17.5384L10.7985 17.5392C10.5334 17.8021 10.2667 18.0666 9.99992 18.3334C9.73311 18.0665 9.46629 17.802 9.20119 17.5391C6.15456 14.518 3.33325 11.7203 3.33325 8.33335C3.33325 4.65146 6.31802 1.66669 9.99992 1.66669C13.6818 1.66669 16.6666 4.65146 16.6666 8.33335C16.6666 11.7203 13.8459 14.5173 10.7993 17.5384ZM9.99992 10.8334C11.3806 10.8334 12.4999 9.71407 12.4999 8.33335C12.4999 6.95264 11.3806 5.83335 9.99992 5.83335C8.61921 5.83335 7.49992 6.95264 7.49992 8.33335C7.49992 9.71407 8.61921 10.8334 9.99992 10.8334Z" stroke="#9CA0AC" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    )
}

const AddressSvg = () => {
    return(<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1846_7010)">
    <path d="M4.1665 11.9052C2.6237 12.5858 1.6665 13.5342 1.6665 14.5832C1.6665 16.6543 5.39746 18.3332 9.99984 18.3332C14.6022 18.3332 18.3332 16.6543 18.3332 14.5832C18.3332 13.5342 17.376 12.5858 15.8332 11.9052M14.9998 6.66656C14.9998 10.053 11.2498 11.6666 9.99984 14.1666C8.74984 11.6666 4.99984 10.053 4.99984 6.66656C4.99984 3.90514 7.23841 1.66656 9.99984 1.66656C12.7613 1.66656 14.9998 3.90514 14.9998 6.66656ZM10.8332 6.66656C10.8332 7.1268 10.4601 7.4999 9.99984 7.4999C9.5396 7.4999 9.1665 7.1268 9.1665 6.66656C9.1665 6.20633 9.5396 5.83323 9.99984 5.83323C10.4601 5.83323 10.8332 6.20633 10.8332 6.66656Z" stroke="#9CA0AC" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <defs>
    <clipPath id="clip0_1846_7010">
    <rect width="20" height="20" fill="white"/>
    </clipPath>
    </defs>
    </svg>
    )
}

const EndsInSvg = () => {
    return(<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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