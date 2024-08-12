import React, { useContext, useState } from 'react'
import LogoutModal from '../shared/modals/LogoutModal'
import logo from '../../assets/svg/BlvckCoin.svg'
import metamask from '../../assets/svg/metamask_front.svg'
import trustWallet from '../../assets/trust-wallet.png'
import coinbaseWallet from '../../assets/coin-base.png'
import walletConnect from '../../assets/wallet-connect.png'
import SearchSvg from '../../assets/svg/SearchSvg'
import Gift from '../../assets/svg/gift.svg'
import { WalletConnectContext } from '../../hooks/WalletLogin'
import SpinLoader from '../shared/loaders/SpinLoader'
import NoWalletDetected from '../shared/modals/NoWalletDetected'
import { useLocation } from 'react-router-dom'
import CloseSvg from '../../assets/svg/CloseSvg'
import NotificationPopover from '../shared/NotificationPopover'
import ConnectModal from './../shared/modals/ConnectModal'
import UserPopover from '../shared/Popovers/UserPopover'
import { Tooltip } from '@mui/material'
// import ExchangeTicketModal from '../shared/modals/ExchangeTicketModal'

const styles = {
    cardBg: `flex items-center px-3 py-2 rounded-lg bg-secondaryColor gap-x-2 border border-[#3A3C40] h-[56px]`,
    cardHeading: `font-[400] text-lg`,
    imageSpan: `bg-lightBlue rounded-full flex items-center justify-center p-[5px]`,
}

const TopSideInfo = () => {
    const location = useLocation()
    const current = location.pathname.split('/')[1]
    const [search, setSearch] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    // const [exchangeModal, setExchangeModal] = useState(false)
    const [logoutModal, setLogoutModal] = useState(false)
    const [copyText, setCopyText] = useState('Copy')
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    const searchME = () => {
        let userData = document
            .getElementById('search__NFT')
            .value.toUpperCase()
        let nftCardWrapper = document.getElementById('nft__Card_BoDY')
        let nftCard = nftCardWrapper.getElementsByClassName('nft__Card')

        // console.log(nftCard.length)
        for (let i = 0; i < nftCard.length; i++) {
            let ele = nftCard[i]
            let text = ele.getElementsByTagName('h1')
            let tdText = ''
            // console.log(text[0])
            for (let j = 0; j < text.length; j++) {
                tdText += text[j].innerText
            }
            let textValue = tdText
            if (textValue.toUpperCase().indexOf(userData) > -1) {
                ele.style.display = ''
            } else {
                ele.style.display = 'none'
            }
        }
    }

    const closeSearch = () => {
        let nftCardWrapper = document.getElementById('nft__Card_BoDY')
        let nftCard = nftCardWrapper.getElementsByClassName('nft__Card')

        // console.log(nftCard.length)
        for (let i = 0; i < nftCard.length; i++) {
            let ele = nftCard[i]
            ele.style.display = ''
        }
    }

    const {
        isWalletLogin,
        logout,
        connectWalletThroughMetamask,
        walletAddress,
        connectLoading,
        openModal,
        setOpenModal,
        tokenAmount,
        userInfo,
    } = useContext(WalletConnectContext)
    const [openConnectModal, setOpenConnectModal] = useState(false)

    const connectWallet = async () => {
        await connectWalletThroughMetamask(setOpenConnectModal)
        return
    }

    if (isWalletLogin && walletAddress) {
        if (current === '') {
            return (
                <>
                    {/* SEARCH */}
                    {!search ? (
                        <div className='p-4 flex items-center justify-between py-6 gap-x-3 screen2:hidden'>
                            <NotificationPopover Gift={Gift} styles={styles} />
                            {/* <div
                            style={{ width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}
                                className={`flex items-center rounded-lg bg-secondaryColor gap-x-2 border border-[#3A3C40] h-[56px] cursor-pointer relative overflow-hidden ${
                                    open ? 'bg-white' : ''
                                }`}
                                onClick={() => {setExchangeModal(true)}}
                            >
                                <img style={{ width: '40px', height: '40px' }} src={`https://res.cloudinary.com/kuramaverse/image/upload/v1675289267/KURAMA%20Static/KURAMA%20Logo.svg`} alt=""  className='w-[inherit] h-[inherit] object-cover'/>
                            </div> */}
                            <div
                                className={`${styles.cardBg} cursor-pointer`}
                                onClick={() => setSearch(true)}
                            >
                                <SearchSvg />
                            </div>
                            {/* AMOUNT */}
                            <div className={`${styles.cardBg} cursor-pointer`} >
                                <h1 className={styles.cardHeading}>
                                    {userInfo.coinsBalance}
                                </h1>
                                {/* <h1 className={styles.cardHeading}>{tokenAmount}</h1> */}
                                <span className={styles.imageSpan}>
                                    <img src={logo} alt='blvck' width={22} />
                                </span>
                            </div>
                            {/* WALLET */}
                            <div className={styles.cardBg}>
                                <Tooltip followCursor={true} title={copyText}>
                                    <button
                                        className={styles.cardHeading}
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                walletAddress
                                            )

                                            navigator.clipboard
                                                .readText()
                                                .then((clipText) => {
                                                    // console.log(clipText)
                                                    setCopyText('Copied')
                                                    setTimeout(() => {
                                                        setCopyText('Copy')
                                                    }, 3000)
                                                })
                                        }}
                                    >
                                        {walletAddress.substr(0, 8) +
                                            '...' +
                                            walletAddress.substr(
                                                walletAddress.length - 5,
                                                walletAddress.length
                                            )}
                                    </button>
                                </Tooltip>
                                <img
                                    src={
                                        userInfo.walletType === 'metamask'
                                            ? metamask
                                            : userInfo.walletType === 'coinbase'
                                            ? coinbaseWallet
                                            : userInfo.walletType ===
                                              'connectwallet'
                                            ? walletConnect
                                            : userInfo.walletType ===
                                              'trustwallet'
                                            ? trustWallet
                                            : metamask
                                    }
                                    alt='blvck'
                                    width={20}
                                />
                            </div>
                            {/* Profile */}
                            <span
                                style={{ width: '3.2rem', height: '3.2rem' }}
                                className='w-10 h-10 rounded-full overflow-hidden cursor-pointer'
                                onClick={handleClick}
                            >
                                <img
                                    src={userInfo?.profileImage}
                                    alt=''
                                    className='w-full h-full object-cover'
                                />
                            </span>

                            {open && (
                                <UserPopover
                                    handleClose={handleClose}
                                    id={id}
                                    open={open}
                                    setLogoutModal={setLogoutModal}
                                    anchorEl={anchorEl}
                                />
                            )}

                        {/* {exchangeModal&&<ExchangeTicketModal
                            openModal={exchangeModal}
                            setOpenModal={setExchangeModal}
                        />} */}

                            <LogoutModal
                                openModal={logoutModal}
                                setOpenModal={setLogoutModal}
                                logout={logout}
                            />
                        </div>
                    ) : (
                        <div className='p-4 flex items-center py-6 gap-x-3 screen2:hidden'>
                            <input
                                type='text'
                                placeholder='Search'
                                className={`${styles.cardBg} outline-none bg-transparent input_sloow_animate`}
                                id='search__NFT'
                                onKeyUp={searchME}
                            />
                            <div
                                className={`${styles.cardBg} cursor-pointer animate_close`}
                                onClick={() => {
                                    setSearch(false)
                                    try {
                                        closeSearch()
                                    } catch (err) {
                                        console.log(err)
                                    }
                                }}
                            >
                                <CloseSvg fill={`#FFF`} />
                            </div>
                        </div>
                    )}
                </>
            )
        } else {
            return (
                <>
                    <div className='p-4 flex items-center justify-between py-6 gap-x-3 screen2:hidden'>
                        {/*  */}
                        <NotificationPopover Gift={Gift} styles={styles} />
                        {/* <div
                        style={{ width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}
                            className={`flex items-center rounded-lg bg-secondaryColor gap-x-2 border border-[#3A3C40] h-[56px] cursor-pointer relative overflow-hidden ${
                                open ? 'bg-white' : ''
                            }`}
                            onClick={() => {setExchangeModal(true)}}
                        >
                            <img style={{ width: '40px', height: '40px' }} src={`https://res.cloudinary.com/kuramaverse/image/upload/v1675289267/KURAMA%20Static/KURAMA%20Logo.svg`} alt=""  className='w-[inherit] h-[inherit] object-cover'/>
                        </div> */}
                        {/* AMOUNT */}
                        <div className={`${styles.cardBg} cursor-pointer`}>
                            <h1 className={styles.cardHeading}>
                                {userInfo.coinsBalance}
                            </h1>
                            {/* <h1 className={styles.cardHeading}>{tokenAmount}</h1> */}
                            <span className={styles.imageSpan}>
                                <img src={logo} alt='blvck' width={22} />
                            </span>
                        </div>
                        {/* WALLET */}
                        <div className={styles.cardBg}>
                            <Tooltip followCursor={true} title={copyText}>
                                <button
                                    className={styles.cardHeading}
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            walletAddress
                                        )

                                        navigator.clipboard
                                            .readText()
                                            .then((clipText) => {
                                                // console.log(clipText)
                                                setCopyText('Copied')
                                                setTimeout(() => {
                                                    setCopyText('Copy')
                                                }, 3000)
                                            })
                                    }}
                                >
                                    {walletAddress.substr(0, 8) +
                                        '...' +
                                        walletAddress.substr(
                                            walletAddress.length - 5,
                                            walletAddress.length
                                        )}
                                </button>
                            </Tooltip>
                            <img
                                src={
                                    userInfo.walletType === 'metamask'
                                        ? metamask
                                        : userInfo.walletType === 'coinbase'
                                        ? coinbaseWallet
                                        : userInfo.walletType ===
                                          'connectwallet'
                                        ? walletConnect
                                        : userInfo.walletType === 'trustwallet'
                                        ? trustWallet
                                        : metamask
                                }
                                alt='blvck'
                                width={20}
                            />
                        </div>
                        {/* PROFILE */}
                        <span
                            style={{ width: '3.2rem', height: '3.2rem' }}
                            className='w-10 h-10 rounded-full overflow-hidden cursor-pointer'
                            onClick={handleClick}
                        >
                            <img
                                src={userInfo?.profileImage}
                                alt=''
                                className='w-full h-full object-cover'
                            />
                        </span>

                        {open && (
                            <UserPopover
                                handleClose={handleClose}
                                id={id}
                                open={open}
                                setLogoutModal={setLogoutModal}
                                anchorEl={anchorEl}
                            />
                        )}

                        {/* {exchangeModal&&<ExchangeTicketModal
                            openModal={exchangeModal}
                            setOpenModal={setExchangeModal}
                            logout={logout}
                        />} */}

                        <LogoutModal
                            openModal={logoutModal}
                            setOpenModal={setLogoutModal}
                            logout={logout}
                        />
                    </div>
                </>
            )
        }
    } else {
        return (
            <div className='p-4 flex items-center justify-end py-6 screen2:hidden'>
                {/* Connect Wallet */}
                <button
                    className={`rounded-lg bg-secondaryColor border border-[#292A30] flex items-center p-3 px-6 h-[56px]`}
                    // onClick={() => connectWallet()}
                    onClick={() => setOpenConnectModal(true)}
                    disabled={connectLoading}
                >
                    Connect
                </button>
                <NoWalletDetected
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    type={openModal.type}
                />

                <ConnectModal
                    openModal={openConnectModal}
                    setOpenModal={setOpenConnectModal}
                    connectLoading={connectLoading}
                    connectWallet={connectWallet}
                />
            </div>
        )
    }
}

export default TopSideInfo
