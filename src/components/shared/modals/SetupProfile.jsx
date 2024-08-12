import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import LoadingLoader from '../loaders/LoadingLoader'
import CompletedLoader from '../loaders/CompletedLoader'
import { useContext } from 'react'
import { WalletConnectContext } from '../../../hooks/WalletLogin'
import CloseSvg from '../../../assets/svg/CloseSvg'
import excla from '../../../assets/svg/excla.svg'
import { useNavigate } from 'react-router-dom'

const SetupProfileModal = ({ openModal, setOpenModal }) => {
    const cancelButtonRef = useRef(null)
    const navigate = useNavigate()

    const closeModal = async (e) => {
        setOpenModal(false)
    }

    const handleSetupProfile = async () => {
        setOpenModal(false)
        navigate('/my-profile')
    }

    return (
        <Transition.Root show={openModal} as={Fragment}>
            <Dialog
                as='div'
                className='fixed z-10 inset-0 overflow-y-auto'
                initialFocus={cancelButtonRef}
                onClose={closeModal}
            >
                <div className='h-screen pt-4 px-4 pb-20 text-center block p-0'>
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
                            <div className='flex w-full justify-between items-center bg-cardModal rounded-xl text-white flex-col border border-[#3D3D3D] p-8 gap-x-4 gap-y-6 relative'>
                                <p className='text-2xl'>
                                    You need to setup your profile first
                                </p>
                                {/* Close Button */}
                                <button style={{ paddingTop: '10px', paddingBottom: '7px' }} className='text-[#000000] bg-[#FFF] px-[12px] py-[8px] font-[500] w-[150px] rounded-[6px]' onClick={handleSetupProfile}>Setup Profile</button>

                                {/* <div
                                    className={`fixed rounded-full flex items-center justify-center top-[15px] right-[15px] p-[2px] h-[40px] w-[40px] bg-white cursor-pointer`}
                                    onClick={closeModal}
                                >
                                    <CloseSvg />
                                </div> */}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default SetupProfileModal
