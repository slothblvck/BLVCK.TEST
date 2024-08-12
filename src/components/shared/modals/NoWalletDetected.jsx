import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import metamask from '../../../assets/svg/MetaMask.svg'
import trustWallet from '../../../assets/trust-wallet.png'
import coinbaseWallet from '../../../assets/coin-base.png'
import DownloadSvg from '../../../assets/svg/DownloadSvg'
import walletConnect from '../../../assets/wallet-connect.png'

const NoWalletDetected = ({ openModal, setOpenModal, type }) => {
    const cancelButtonRef = useRef(null)

    // type: 1 => MetaMask
    // type: 2 => CoinBase
    // type: 3 => TrustWallet

    const mappArr = [
        {
            image: metamask,
            link: 'https://metamask.io/download',
            name: 'MetaMask',
        },
        {
            image: coinbaseWallet,
            link: 'https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad?hl=en',
            name: 'CoinBase',
        },
        {
            image: trustWallet,
            link: 'https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph',
            name: 'TrustWallet',
        },
        {
            image: walletConnect,
            link: 'https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph',
            name: 'WalletConnect',
        },
    ]

    return (
        <Transition.Root show={openModal.open} as={Fragment}>
            <Dialog
                as='div'
                className='fixed z-10 inset-0 overflow-y-auto'
                initialFocus={cancelButtonRef}
                onClose={() => {
                    setOpenModal({ open: false, type })
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
                            <div className='flex justify-center w-full items-center bg-secondaryColor rounded-xl text-white h-full p-10 flex-col gap-y-8'>
                                <h2 className='text-3xl font-[700] text-center'>
                                    {mappArr[type - 1]?.name} Not Found
                                </h2>
                                <img
                                    src={mappArr[type - 1]?.image}
                                    alt='logo'
                                />
                                <a
                                    href={mappArr[type - 1]?.link}
                                    className={`rounded-lg bg-lightBlue flex items-center p-3 px-6 cursor-pointer`}
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    <span className='text-2xl mr-2'>
                                        <DownloadSvg fill={'#FFF'} />
                                    </span>
                                    <span className='font-[600]'>
                                        Download Now
                                    </span>
                                </a>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default NoWalletDetected
