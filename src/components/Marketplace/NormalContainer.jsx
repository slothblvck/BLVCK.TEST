import React, { useContext } from 'react'
import CardTimer from './CardTimer'
import DiscordSvg from './../../assets/svg/DiscordSvg'
import DownloadSvg from './../../assets/svg/DownloadSvg'
import MoreVerticalSvg from './../../assets/svg/moreSvg'
import ArrowBackSvg from './../../assets/svg/ArrowBackSvg'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { WalletConnectContext } from './../../hooks/WalletLogin'

const NormalContainer = ({
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
}) => {
    const {
        isWalletLogin,
        userInfo,
        disconnectDiscord,
        checkUserSpecialDiscord,
        getUserParticipantLimit,
        getNftParticipate,
    } = useContext(WalletConnectContext)

    const styles = {
        button: `w-full px-1 py-2 flex items-center justify-center rounded-md min-h-9 font-[500] text-sm bg-white text-black mt-4 ${
            new Date(nft.timer).getTime() < Date.now()
                ? 'cursor-not-allowed'
                : ''
        }flex items-center justify-center gap-x-2`,
    }

    return (
        <>
            <div className='flex items-center justify-between w-full my-2 screen5:flex-col screen5:items-start screen5:gap-y-4'>
                {/* Price */}
                <div
                    style={{ gap: '17px' }}
                    className='flex flex-col items-start h-[80px]'
                >
                    <span className='text-sm font-[400]'>{nft.nftType === 4 ? 'Highest bid' : 'Price'}</span>
                    <p className='font-[700] text-xl'>{nft.price} BLVCK</p>
                    {/* <span className='text-sm font-[400]'>$5803.52</span> */}
                </div>

                {/* Timer */}
                {checkValid() && nft.timer !== ' ' && (
                    <div className='flex h-[80px] flex-col items-start justify-between'>
                        <span className='text-sm font-[400]'>Ending in</span>
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

            {/* Winners count */}
            {nft.nftType !== 3 && (
                <div className='flex items-center justify-between w-full'>
                    <span className='font-[400] text-base leading-6'>
                        Winners count
                    </span>
                    <span className='font-[700] text-lg leading-6'>
                        {nft.winnersCount}
                    </span>
                </div>
            )}
            {nft.nftType == 3 && (
                <div className='flex items-center justify-between w-full'>
                    <span className='font-[400] text-base leading-6'>
                        Total Supply
                    </span>
                    <span className='font-[700] text-lg leading-6'>
                        {nft.totalSupply}
                    </span>
                </div>
            )}
            {userInfo?.isAdmin && (
                <div className='flex items-center justify-between w-full'>
                    <span className='font-[400] text-base leading-6'>
                        Total Entries
                    </span>
                    <span className='font-[700] text-lg leading-6'>
                        {nft.totalSold}
                    </span>
                </div>
            )}
            {nft.nftType !== 3 && nft.nftType !== 4 &&
                (getUserParticipantLimit(nft) > 0 &&
                getNftParticipate(userInfo?.participatedBy, nft?._id) > 0 ? (
                    <div className='flex items-center justify-between w-full'>
                        <span className='font-[400] text-base leading-6'>
                            Allowed Entries
                        </span>
                        <span className='font-[700] text-lg leading-6'>
                            {getNftParticipate(
                                userInfo?.participatedBy,
                                nft?._id
                            ) +
                                '/' +
                                getUserParticipantLimit(nft)}
                        </span>
                    </div>
                ) : (
                    <div className='flex items-center justify-between w-full'>
                        <span className='font-[400] text-base leading-6'>
                            Allowed Entries
                        </span>
                        <span className='font-[700] text-lg leading-6'>
                            {getUserParticipantLimit(nft)}
                        </span>
                    </div>
                ))}

            {!userInfo.discordInfo && !userInfo?.isAdmin ? (
                <button
                    className={`${styles.button}`}
                    onClick={() => {
                        if (!isWalletLogin)
                            // setOpenModal(false)
                            connectWallet()
                        else
                            window.location.assign(
                                process.env.REACT_APP_DISCORD_URL
                            )
                    }}
                >
                    <span>
                        {isWalletLogin
                            ? 'Confirm your Discord'
                            : 'Connect to Wallet'}
                    </span>
                    {isWalletLogin && <DiscordSvg className='text-xl' />}
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
            ) : (isParticipated && !checkValid()) ||
              (isParticipated &&
                  getNftParticipate(userInfo.participatedBy, nft?._id) >=
                      getUserParticipantLimit(nft) &&
                  getUserParticipantLimit(nft) > 0) ? (
                <button className={`${styles.button}`} disabled={true}>
                    {nft.nftType === 3
                        ? 'Already Purchased'
                        : 'Already Participated'}
                </button>
            ) : nft.personName.length > 0 &&
              !checkUserSpecialDiscord(nft) &&
              !nft.allowAllToParticipate &&
              isWalletLogin ? (
                <>
                    {!showDiscordEdit ? (
                        <div className='flex items-center gap-x-3 w-full mt-4'>
                            <button
                                className={`flex items-center justify-center p-1 bg-white rounded cursor-pointer text-xl h-9`}
                                onClick={() => setShowDicordEdit(true)}
                            >
                                <MoreVerticalSvg />
                            </button>
                            <button
                                className={`${styles.button} mt-0 cursor-not-allowed`}
                                disabled={true}
                            >
                                NOT ELIGIBLE
                            </button>
                        </div>
                    ) : (
                        <button
                            className={`${styles.button} justify-between px-5`}
                            disabled={
                                new Date(nft.timer).getTime() < Date.now()
                            }
                        >
                            {/* BACK BUTTON */}
                            <span
                                className='text-2xl cursor-pointer'
                                onClick={() => setShowDicordEdit(false)}
                            >
                                <ArrowBackSvg fill={'#080808'} />
                            </span>

                            {/* TEXT */}
                            <span
                                className='cursor-pointer pr-2'
                                onClick={() => {
                                    disconnectDiscord()
                                    setOpenModal(false)
                                }}
                            >
                                Change Discord ID
                            </span>
                        </button>
                    )}
                </>
            ) : (!cnt ||
                  userInfo.coinsBalance < parseInt(nft.price) * cnt ||
                  userInfo.coinsBalance === 0) &&
              isWalletLogin ? (
                <div className='flex items-center gap-x-3 w-full mt-4'>
                    {nft.nftType !== 3 && (
                        <div className='flex items-center rounded-md border-2 h-full'>
                            <span
                                className='text-white cursor-pointer text-xs'
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
                                className=' text-white cursor-pointer text-xs'
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
            ) : !showDiscordEdit && isWalletLogin ? (
                <div className='flex items-center gap-x-3 w-full mt-4'>
                    {nft.nftType !== 3 && (
                        <div className='flex items-center rounded-md border-2 h-full'>
                            <span
                                className='text-white cursor-pointer text-xs'
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
                                className=' text-white cursor-pointer text-xs'
                                onClick={() => increase()}
                            >
                                <AddIcon />
                            </span>
                        </div>
                    )}

                    <button
                        className={`${styles.button} mt-0 px-1`}
                        disabled={new Date(nft.timer).getTime() < Date.now()}
                        onClick={() => {
                            if (
                                new Date(nft.timer).getTime() > Date.now() ||
                                nft.timer === ' '
                            ) {
                                participateNow()
                            }
                        }}
                    >
                        Continue as{' '}
                        {userInfo.discordInfo?.username?.length > 6
                            ? userInfo.discordInfo?.username?.substring(0, 6) +
                              '...'
                            : userInfo.discordInfo?.username}
                    </button>
                    <button
                        className={`flex items-center justify-center p-1 bg-white rounded cursor-pointer text-xl h-9`}
                        onClick={() => setShowDicordEdit(true)}
                    >
                        <MoreVerticalSvg />
                    </button>
                </div>
            ) : (
                isWalletLogin && (
                    <button
                        className={`${styles.button} justify-between px-5`}
                        disabled={new Date(nft.timer).getTime() < Date.now()}
                    >
                        {/* BACK BUTTON */}
                        <span
                            className='text-2xl cursor-pointer'
                            onClick={() => setShowDicordEdit(false)}
                        >
                            <ArrowBackSvg fill={'#080808'} />
                        </span>

                        {/* TEXT */}
                        <span
                            className='cursor-pointer pr-2'
                            onClick={() => {
                                disconnectDiscord()
                                setOpenModal(false)
                            }}
                        >
                            Change Discord ID
                        </span>
                    </button>
                )
            )}
        </>
    )
}

export default NormalContainer
