import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import LoadingLoader from '../loaders/LoadingLoader'
import CompletedLoader from '../loaders/CompletedLoader'
import { useContext } from 'react'
import { WalletConnectContext } from '../../../hooks/WalletLogin'
import CloseSvg from '../../../assets/svg/CloseSvg'

const BidFailModal = ({ openModal, setOpenModal }) => {
    const cancelButtonRef = useRef(null)
    const { getActivity, fetchNfts, updateLocalUserInfo, fetchOngoing } =
        useContext(WalletConnectContext)

    const closeModal = async () => {
        setOpenModal(false)
        await fetchOngoing('ongoing')
        await fetchNfts()
        await updateLocalUserInfo()
        await getActivity()
    }

    return (
        <Transition.Root show={openModal} as={Fragment}>
            <Dialog
                as='div'
                className='fixed z-10 inset-0 overflow-y-auto'
                initialFocus={cancelButtonRef}
                onClose={() => {
                    closeModal()
                }}
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
                        <Dialog.Overlay className='fixed inset-0 bg-[#14141657] bg-opacity-75 backdrop-blur-sm transition-opacity' />
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
                            <div className='flex w-full items-center bg-cardModal rounded-xl text-white flex-col border border-[#3D3D3D] p-4 gap-x-4 gap-y-4 relative h-[250px] '>
                                {/* <img src={''} alt='' /> */}
                                <div className='w-full h-full absolute flex items-center justify-center'>
                                    <img
                                        src='https://img.icons8.com/ios-glyphs/120/FFFFFF/macos-close.png'
                                        alt=''
                                        className='w-[20%]'
                                    />
                                </div>
                                <p className='text-2xl pt-5'>
                                    Bid Failed!
                                </p>
                                {/* Close Button */}

                                <div
                                    className={`fixed rounded-full flex items-center justify-center top-[15px] right-[15px] p-[2px] h-[40px] w-[40px] bg-primaryColor text-white cursor-pointer`}
                                    onClick={() => closeModal()}
                                >
                                    <CloseSvg fill={'#FFF'}/>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default BidFailModal
