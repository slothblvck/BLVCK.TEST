import { Fragment, useContext, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import insta from '../../../assets/instagram.png'
import discord from '../../../assets/discord.png'
import twitter from '../../../assets/twitter.png'
import { WalletConnectContext } from '../../../hooks/WalletLogin'

const PartnerModal = ({ openModal, setOpenModal, item, editProject }) => {
    const cancelButtonRef = useRef(null)
    const {userInfo, deletePartner, verifyPartner} = useContext(WalletConnectContext)

    const edit = () => {
        setOpenModal(false)
        // editProject(item)
    }

    return (
        <Transition.Root show={openModal} as={Fragment}>
            <Dialog
                as='div'
                className='fixed z-[10000] inset-0 overflow-y-auto'
                initialFocus={cancelButtonRef}
                onClose={() => {setOpenModal(false)}}
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

                                    {!item.isVerified && item?.category === 'CommunityProject' && <div style={{ paddingTop: '7px', paddingBottom: '6px', fontFamily: 'Avenir Next' }} className='absolute top-2 right-2 rounded-[8px] p-2 px-3 bg-red-700 text-white text-[14px]'>Under Verification</div>}
                                    {!item.isVerified && userInfo?.isSuperAdmin && <button className='absolute bottom-1 right-2 rounded-[8px] p-2 px-3 bg-green-700 text-white text-[14px]' style={{fontFamily: 'Avenir Next'}} onClick={() => verifyPartner(item?._id)}>Verify</button>}
                                    {!item.isVerified && userInfo?.isSuperAdmin && <button className='absolute bottom-1 right-20 rounded-[8px] p-2 px-3 bg-red-600 text-white text-[14px]' style={{fontFamily: 'Avenir Next'}} onClick={() => deletePartner(item?._id)}>Delete</button>}

                                    {/* {userInfo?.isSuperAdmin && <button className='absolute top-2 right-20 rounded-[8px] p-2 px-3 bg-green-700 text-white text-[14px]' style={{fontFamily: 'Avenir Next'}} onClick={edit}>Edit</button>} */}
                                    {(userInfo?.isSuperAdmin && item.isVerified) && <button className='absolute top-2 right-2 rounded-[8px] p-2 px-3 bg-red-600 text-white text-[14px]' style={{fontFamily: 'Avenir Next'}} onClick={() => deletePartner(item?._id)}>Delete</button>}
                                </div>

                                <div className='flex flex-col gap-[14px] w-full'>
                                    {/* Top */}
                                    <div className='flex items-center justify-between w-full screen4:flex-col screen4:items-start'>
                                        <div className='flex items-center gap-2'>
                                            {/* <div className='h-[48px] w-[48px] min-h-[48px] min-w-[48px] bg-[#D9D9D9] rounded-full'></div> */}
                                            <h1 className='text-[#FFFFFF] text-[24px] leading-[29px] font-[600]'>{item?.name}</h1>
                                            {item?.tags?.length > 0 && item?.tags?.map((i, key) => (
                                                <h2 style={{ paddingTop: '5px', paddingBottom: '4px' }} key={key} className='bg-[#F8F8F8] px-[6px] py-[4px] text-[#000000] font-[500] text-[10px] leading-[10px] rounded-[2px]'>{i}</h2>
                                            ))}
                                        </div>

                                        <div className='flex items-center gap-3 screen4:justify-end screen4:w-full'>
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
                                        </div>
                                    </div>

                                    {/* Bottom */}
                                    <div className='flex flex-col gap-2'>
                                        <h1 className='font-[700] text-[14px] leading-[17px]'>Description</h1>
                                        <p className='font-[400] text-[16px] leading-[24px] text-[#E2E2E2]'>
                                            {item?.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default PartnerModal
