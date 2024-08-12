import { Fragment, useContext, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import metamask from '../../../assets/svg/metamask_front.svg'
import { WalletConnectContext } from '../../../hooks/WalletLogin'
import CloseSvg from '../../../assets/svg/CloseSvg'
import ArrowForward from '../../../assets/svg/ArrowForward'
import ArrowBackSvg from './../../../assets/svg/ArrowBackSvg'

const ChangeWallet = ({
    openModal,
    setOpenModal,
    nft,
    setOpenConnectModal,
}) => {
    const [changeWalletId, setChangeWalletId] = useState(false)
    const cancelButtonRef = useRef(null)
    const {
        walletAddress,
        userInfo,
        participateWhitelist,
        isWalletLogin,
        fetchNfts,
        fetchOngoing,
        getActivity,
    } = useContext(WalletConnectContext)
    const [wallet, setWallet] = useState(walletAddress)

    const participateNow = async () => {
        if (isWalletLogin) {
            await participateWhitelist(
                nft._id,
                nft.nftImage,
                nft.name,
                nft.nftType,
                nft.price,
                userInfo.discordInfo?.username,
                wallet,
                userInfo.discordInfo?.roles
            )
            await fetchOngoing('ongoing')
            await fetchNfts()
            await getActivity()
            setOpenModal(false)
            return
        } else {
            setOpenModal(false)
            setOpenConnectModal(true)
            return
        }
    }

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
                        <div className='inline-block bg-transparent rounded-lg text-left transform transition-all my-8 align-middle max-w-lg'>
                            <div className='flex justify-center w-[550px] h-[450px] items-center rounded-xl p-1 flex-col gap-y-4 bg-gradient-to-r from-[#10222A] to-[#2E7EA0]'>
                                <div
                                    className={`w-full rounded-lg bg-primaryColor text-white p-4 flex gap-x-4 items-center flex-col gap-y-4 h-full relative justify-evenly`}
                                >
                                    <img src={metamask} alt='logo' />
                                    {changeWalletId ? (
                                        <div className='flex items-start flex-col gap-y-2'>
                                            <p
                                                className='text-lightBlue text-sm cursor-pointer'
                                                onClick={() =>
                                                    setChangeWalletId(true)
                                                }
                                            >
                                                Change wallet address
                                            </p>
                                            <div className='w-[360px] font-[500] h-[48px] flex items-center'>
                                                <input
                                                    className='h-[48px] rounded-l bg-transparent border border-lightBlue w-full outline-none p-2'
                                                    type={'text'}
                                                    value={wallet}
                                                    onChange={(e) =>
                                                        setWallet(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <div
                                                    className='w-[64px] h-[48px] rounded-r bg-lightBlue flex items-center justify-center text-2xl cursor-pointer'
                                                    onClick={() =>
                                                        setChangeWalletId(false)
                                                    }
                                                >
                                                    <ArrowForward />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='flex items-center flex-col gap-y-2'>
                                            <button
                                                className='rounded bg-lightBlue w-[400px] py-2 px-2 font-[500]'
                                                onClick={() => participateNow()}
                                            >
                                                Continue as{' '}
                                                {wallet?.substring(0, 8) +
                                                    '...' +
                                                    wallet?.substring(
                                                        wallet.length - 4,
                                                        wallet.length
                                                    )}
                                            </button>
                                            <p
                                                className='text-[#B1B5C3] font-[500] cursor-pointer'
                                                onClick={() =>
                                                    setChangeWalletId(true)
                                                }
                                            >
                                                Change wallet address
                                            </p>
                                        </div>
                                    )}
                                    <div
                                        className={`absolute rounded-full top-[10px] left-[10px] text-2xl cursor-pointer`}
                                        onClick={() => setOpenModal(false)}
                                    >
                                        <ArrowBackSvg />
                                    </div>
                                    <div
                                        className={`absolute rounded-full top-[8px] right-[8px] p-[2px] bg-white text-primaryColor cursor-pointer`}
                                        onClick={() => setOpenModal(false)}
                                    >
                                        <CloseSvg />
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

export default ChangeWallet
