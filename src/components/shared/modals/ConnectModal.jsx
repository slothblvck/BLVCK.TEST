import { Fragment, useContext, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import metamask from '../../../assets/metamask.png'
import walletConnect from '../../../assets/wallet-connect.png'
import trustWallet from '../../../assets/trust-wallet.png'
import coinbaseWallet from '../../../assets/coin-base.png'
import { WalletConnectContext } from '../../../hooks/WalletLogin'

const ConnectModal = ({ openModal, setOpenModal, connectLoading }) => {
    const cancelButtonRef = useRef(null)

    const {
        connectWalletThroughCoinbase,
        connectWalletThroughTrustWallet,
        connectWalletThroughMetamask,
        connectWalletThrougConnectWallet,
    } = useContext(WalletConnectContext)

    const styles = {
        button: `flex items-center justify-between p-3 px-4 w-full focus-visible:outline-none rounded-lg bg-[#2f3239] gap-x-2 border border-[#3A3C40] hover:bg-[#191e27] disabled:cursor-not-allowed disabled:bg-[#2f3239] transition-all ease-in-out delay-100 hover:transition-all hover:ease-in-out hover:delay-100`,
        image: `h-10`,
        h1: `font-[500]`,
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
                            <div className='flex justify-center w-full items-start bg-cardModal rounded-xl text-white h-full p-5 flex-col gap-y-4 border border-[#3D3D3D]'>
                                <h2 className='text-xl font-[700] text-center'>
                                    Connect a Wallet
                                </h2>
                                <div className='flex flex-col w-full gap-y-2'>
                                    <button
                                            className={styles.button}
                                            disabled={connectLoading}
                                            onClick={async () => {
                                                await connectWalletThroughMetamask(
                                                    setOpenModal
                                                )
                                                return
                                            }}
                                        >
                                        <h1 className={styles.h1}>Metamask</h1>
                                        <img
                                            src={metamask}
                                            alt=''
                                            className={styles.image}
                                        />
                                    </button>
                                    <button
                                        className={styles.button}
                                        disabled={connectLoading}
                                        onClick={async () =>
                                            await connectWalletThroughCoinbase(
                                                setOpenModal
                                            )
                                        }
                                    >
                                        <h1 className={styles.h1}>
                                            Coinbase
                                        </h1>
                                        <img
                                            src={coinbaseWallet}
                                            alt=''
                                            className={styles.image}
                                        />
                                    </button>
                                    <button
                                        className={styles.button}
                                        onClick={async () =>
                                            await connectWalletThrougConnectWallet(
                                                setOpenModal
                                            )
                                        }
                                    >
                                        <h1 className={styles.h1}>
                                            WalletConnect
                                        </h1>
                                        <img
                                            src={walletConnect}
                                            alt=''
                                            className={styles.image}
                                        />
                                    </button>
                                    {/* <button
                                        className={styles.button}
                                        disabled={connectLoading}
                                        onClick={async () =>
                                            await connectWalletThroughTrustWallet(
                                                setOpenModal
                                            )
                                        }
                                    >
                                        <h1 className={styles.h1}>
                                            Trust Wallet
                                        </h1>
                                        <img
                                            src={trustWallet}
                                            alt=''
                                            className={styles.image}
                                        />
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ConnectModal
