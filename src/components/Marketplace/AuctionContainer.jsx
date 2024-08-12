import React, { useContext, useState } from 'react'
import CardTimer from './CardTimer'
import DiscordSvg from '../../assets/svg/DiscordSvg'
import DownloadSvg from '../../assets/svg/DownloadSvg'
import MoreVerticalSvg from '../../assets/svg/moreSvg'
import ArrowBackSvg from '../../assets/svg/ArrowBackSvg'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { WalletConnectContext } from '../../hooks/WalletLogin'
import BlvckCoin from '../../assets/svg/BlvckCoin.svg'
import { Tooltip } from '@mui/material'

const AuctionContainer = ({
    nft,
    setOpenModal,
    connectWallet,
    downloadCSV,
    showDiscordEdit,
    participateNow,
    setShowDicordEdit,
    isParticipated,
    downloadLoading,
    checkValid,
    setValue,
    cnt,
    decrease,
    increase,
    tab
}) => {
    const {
        isWalletLogin,
        userInfo,
        biding,
        disconnectDiscord,
        checkUserSpecialDiscord,
        getUserParticipantLimit,
        getNftParticipate,
    } = useContext(WalletConnectContext)
    const [copyText, setCopyText] = useState('Copy')

    const styles = {
        button: `w-full px-1 py-2 flex items-center justify-center rounded-md min-h-9 font-[500] text-sm bg-white text-black mt-4 ${
            new Date(nft.timer).getTime() < Date.now()
                ? 'cursor-not-allowed'
                : ''
        }flex items-center justify-center gap-x-2`,
    }

    return (
        <>
            {/* Winners count */}
            {nft.nftType !== 3 && tab !== 2 && (
                <div className='flex items-center justify-between w-full'>
                    <span className='font-[400] text-base leading-6'>
                        Winners count
                    </span>
                    <span className='font-[700] text-lg leading-6'>
                        {nft.winnersCount}
                    </span>
                </div>
            )}
            {userInfo?.isAdmin && tab!== 2 &&(
                <div className='flex items-center justify-between w-full'>
                    <span className='font-[400] text-base leading-6'>
                        Total Entries
                    </span>
                    <span className='font-[700] text-lg leading-6'>
                        {nft.totalSold}
                    </span>
                </div>
            )}

            <div className='flex items-center justify-between w-full my-2 screen5:flex-col screen5:items-start screen5:gap-y-4'>
                {/* Price */}
                <div
                    style={{ gap: nft?.username ? '5px' : '17px' }}
                    className='flex flex-col items-start h-[80px]'
                >
                    <span className='text-sm font-[400]'>{nft.nftType === 4 ? 'Highest bid' : 'Price'}</span>
                    <p className='font-[700] text-xl flex items-center gap-1'>{nft.highestBid} <img src={BlvckCoin} alt='' className='w-[25px]' /></p>
                    {/* <span className='text-sm font-[400]'>$5803.52</span> */}
                    {nft?.username && <div className='flex items-center gap-1'>
                        <span className={`rounded-full h-[16px] w-[16px] min-h-[16px] min-w-[16px] overflow-hidden`}>
                            <img src={nft?.image} alt="" className='w-full h-full object-cover' />
                        </span>
                        <Tooltip followCursor={true} title={copyText}>
                            <h1 className='cursor-pointer text-[12px] opacity-[0.8]'
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        nft?.username
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
                            >{nft?.username?.length > 20 ? nft?.username?.substr(0, 20) + '...' : nft?.username}</h1>
                        </Tooltip>
                    </div>}
                </div>

                {/* Timer */}
                {checkValid() && nft.timer !== ' ' && (
                    <div className='flex h-[80px] flex-col items-start justify-between'>
                        <span className='text-sm font-[400]'>Auction ending in</span>
                        <CardTimer
                            nft={nft}
                            coloured
                            targetData={
                                !checkValid() && nft.nftType === 3
                                    ? '2022-08-09T14:27:29.218Z'
                                    : nft.timer
                            }
                            whitelisted={nft.nftType === -1}
                        />
                    </div>
                )}
            </div>

            {!isWalletLogin ? (
                <button
                    className={`${styles.button}`}
                    onClick={() => {
                        if (!isWalletLogin)
                            // setOpenModal(false)
                            connectWallet()
                    }}
                >
                    <span>
                        {'Connect to Wallet'}
                    </span>
                </button>
            ) : isWalletLogin && userInfo?.isAdmin ? (
                <button
                    className={`${styles.button}`}
                    onClick={(e) => {
                        downloadCSV(e)
                    }}
                    disabled={downloadLoading}
                >
                    <DownloadSvg
                        style={{ fontSize: '0.875rem' }}
                        className='text-sm'
                    />
                    <span className='text-sm'>
                        {downloadLoading ? 'Downloading...' : 'Download CSV'}
                    </span>
                </button>
            ) : (userInfo.coinsBalance < parseInt(nft.highestBid) || userInfo.coinsBalance < parseInt(cnt) || userInfo.coinsBalance === 0) && isWalletLogin ? (
                    <div className='flex items-center gap-x-3 w-full mt-4'>
                    {nft.nftType !== 3 && (
                        <div className='flex items-center rounded-md border-2 h-[36px]'>
                            <span
                                className='text-black cursor-pointer text-xs bg-white h-[36px] flex items-center justify-center rounded-l-md min-w-[33px]'
                                onClick={() => decrease()}
                            >
                                <RemoveIcon />
                            </span>
                            {/* <span className='text-2xl'>{cnt}</span> */}
                            <input
                                className='text-sm w-[30px] bg-transparent outline-none text-center h-8'
                                value={cnt}
                                onChange={(e) =>
                                    setValue(parseInt(e.target.value))
                                }
                                min='0'
                                type='number'
                                onInput={(e) => {
                                    e.target.value =
                                        !!e.target.value &&
                                        Math.abs(e.target.value) >= 0
                                            ? Math.abs(e.target.value)
                                            : null
                                }}
                            />
                            <span
                                className='text-black cursor-pointer text-xs bg-white h-[36px] flex items-center justify-center rounded-r-md min-w-[33px]'
                                onClick={() => increase()}
                            >
                                <AddIcon />
                            </span>
                        </div>
                    )}

                    <button
                        className={`${styles.button} cursor-not-allowed mt-0`}
                        disabled={true}
                    >
                        NOT ENOUGH BALANCE
                    </button>
                </div>
            ) : !checkValid() && nft.nftType === 3 ? (
                <button
                    className={`${styles.button} cursor-not-allowed`}
                    disabled={true}
                >
                    EXPIRED
                </button>
            ) : (
                <div className='flex items-center gap-x-3 w-full mt-4'>
                    {nft.nftType !== 3 && (
                        <div className='flex items-center rounded-md border-2 h-[36px]'>
                            <span
                                className='text-black cursor-pointer text-xs bg-white h-[36px] flex items-center justify-center rounded-l-md min-w-[33px]'
                                onClick={() => decrease()}
                            >
                                <RemoveIcon />
                            </span>
                            {/* <span className='text-2xl'>{cnt}</span> */}
                            <input
                                className='text-sm w-[50px] bg-transparent outline-none text-center h-[36px]'
                                value={cnt}
                                onChange={(e) =>
                                    setValue(parseInt(e.target.value))
                                }
                                min='0'
                                type='number'
                                onInput={(e) => {
                                    e.target.value =
                                        !!e.target.value &&
                                        Math.abs(e.target.value) >= 0
                                            ? Math.abs(e.target.value)
                                            : null
                                }}
                            />
                            <span
                                className='text-black cursor-pointer text-xs bg-white h-[36px] flex items-center justify-center rounded-r-md min-w-[33px]'
                                onClick={() => increase()}
                            >
                                <AddIcon />
                            </span>
                        </div>
                    )}

                    <button
                        className={`${styles.button} mt-0 px-1`}
                        disabled={new Date(nft.timer).getTime() < Date.now() || cnt <= nft?.highestBid || !cnt}
                        onClick={() => {
                            if (
                                new Date(nft.timer).getTime() > Date.now()
                            ) {
                                participateNow()
                            }
                        }}
                    >
                        {(cnt <= nft?.highestBid || !cnt) ? 'Increase Bid' : biding ? 'Biding...' : 'Bid'}
                    </button>
                </div>
            )}
        </>
    )
}

export default AuctionContainer
