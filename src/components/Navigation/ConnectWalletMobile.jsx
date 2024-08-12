import React, { useContext } from 'react'
import connectBtn from '../../assets/svg/connectButton.svg'
import logo from '../../assets/svg/BlvckCoin.svg'
import { WalletConnectContext } from './../../hooks/WalletLogin'
import SpinLoader from '../shared/loaders/SpinLoader'
import NoWalletDetected from '../shared/modals/NoWalletDetected'
import { useLocation } from 'react-router-dom'
import ConnectModal from '../shared/modals/ConnectModal'
import { useState } from 'react'

const ConnectWalletMobile = () => {
    const location = useLocation()
    const current = location.pathname.split('/')[1]
    const [openConnectModal, setOpenConnectModal] = useState(false)

    const {
        isWalletLogin,
        connectWalletThroughMetamask,
        connectLoading,
        openModal,
        setOpenModal,
        userInfo,
    } = useContext(WalletConnectContext)

    const connectWallet = async () => {
        await connectWalletThroughMetamask(setOpenConnectModal)
        return
    }

    if (!isWalletLogin) {
        return (
            <div
                className='w-auto hidden screen2:flex absolute bottom-20 left-6 right-6 z-20 justify-center cursor-pointer items-center px-3 py-2 rounded-lg bg-secondaryColor gap-x-2 border border-[#3A3C40] h-[56px]
                '
                onClick={() => setOpenConnectModal(true)}
            >
                <span>Connect Wallet</span>
                <NoWalletDetected
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    // type={openModal.type}
                />

                <ConnectModal
                    openModal={openConnectModal}
                    setOpenModal={setOpenConnectModal}
                    connectLoading={connectLoading}
                    connectWallet={connectWallet}
                />
            </div>
        )
    } else {
        return <></>
    }
    // else {
    //     return (
    //         <>
    //             <div
    //                 className='rounded-full w-[48px] h-[48px] absolute bottom-8 right-6 cursor-pointer hidden screen2:flex z-20'
    //                 onClick={() => connectWallet()}
    //             >
    //                 <img
    //                     src={connectBtn}
    //                     alt='connect'
    //                     className='rounded-full  w-[48px] h-[48px]'
    //                 />
    //             </div>
    //             <NoWalletDetected
    //                 openModal={openModal}
    //                 setOpenModal={setOpenModal}
    //             />
    //         </>
    //     )
    // }
}

export default ConnectWalletMobile
