import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const DeleteModal = ({ openModal, setOpenModal, deleteNft }) => {
    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={openModal} as={Fragment}>
            <Dialog
                as='div'
                className='fixed z-10 inset-0 overflow-y-auto'
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
                            <div className='flex justify-center w-full items-center bg-cardModal rounded-xl text-white h-full p-10 flex-col gap-y-8 border border-[#3D3D3D]'>
                                <h2 className='text-xl font-[700] text-center'>
                                    Are you sure you want to Delete ?
                                </h2>
                                <div className='flex items-center justify-between w-full gap-x-4'>
                                    <button
                                        className={`flex items-center justify-center p-2 w-full
                                            focus-visible:outline-none rounded-lg bg-secondaryColor gap-x-2 border border-[#3A3C40]`}
                                        onClick={() => {
                                            setOpenModal(false)
                                        }}
                                    >
                                        CANCEL
                                    </button>
                                    <button
                                        className={`flex items-center justify-center p-2 w-full
                                            focus-visible:outline-none rounded-lg bg-secondaryColor gap-x-2 border border-[#3A3C40]`}
                                        onClick={() => {
                                            deleteNft()
                                            setOpenModal(false)
                                        }}
                                    >
                                        DELETE
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default DeleteModal
