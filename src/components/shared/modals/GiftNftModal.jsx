import { useContext, useEffect, useState } from 'react'
import { BACKEND_URL, WalletConnectContext } from '../../../hooks/WalletLogin'
import exportToCsv, { exportToWinnersCsv } from '../../../hooks/DownloadCSV'
import CloseSvg from '../../../assets/svg/CloseSvg'
import DiscordSvg from '../../../assets/svg/DiscordSvg'
import NormalContainer from '../../Marketplace/NormalContainer'
import ExpiredContainer from '../../Marketplace/ExpiredContainer'
import axios from 'axios'
import MoreVerticalSvg from '../../../assets/svg/moreSvg'
import ArrowBackSvg from '../../../assets/svg/ArrowBackSvg'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import ConnectModal from './ConnectModal'
import DownloadSvg from './../../../assets/svg/DownloadSvg'

const GiftNftModal = ({
    openModal,
    setOpenModal,
    nft,
    isAdmin,
    toggleDrawer,
    setTransactionCompleted,
    setParticipatingModal,
    setParticipatingFailModal,
}) => {
    const [showDiscordEdit, setShowDicordEdit] = useState(false)
    const [isParticipated, setParticipated] = useState(false)
    const [showMore, setMore] = useState(false)
    const [isData, setData] = useState(false)
    const [downloadLoading, setDownloadLoading] = useState(false)
    const [openConnectModal, setOpenConnectModal] = useState(false)
    const [cnt, setCnt] = useState(1)

    const {
        participateEvent,
        isWalletLogin,
        userInfo,
        walletAddress,
        getUserParticipantLimit,
        getNftParticipate,
        connectWalletThroughMetamask,
        connectLoading,
        topStakingInfo,
    } = useContext(WalletConnectContext)

    const connectWallet = async () => {
        // toggleDrawer('', 'right', false)
        setOpenConnectModal(true)
    }

    const getStaked = () => {
        if (topStakingInfo?.stakingRank) {
            for (let i = 0; i < topStakingInfo?.stakingRank?.length; i++) {
                let curr = topStakingInfo?.stakingRank[i]
                if (parseInt(curr.stakedTime) >= parseInt(nft.stakingDays)) {
                    return true
                }
            }
        }
        return false
    }

    const setValue = (val) => {
        if (
            val >
                getUserParticipantLimit(nft) -
                    getNftParticipate(userInfo?.participatedBy, nft?._id) ||
            (val > nft.totalSupplies - nft.totalSold && nft.totalSupplies > 0)
        ) {
            // const prev = val
            // setCnt(prev)
            // return
        } else {
            setCnt(val)
        }
    }

    const increase = () => {
        if (
            cnt >=
                getUserParticipantLimit(nft) -
                    getNftParticipate(userInfo?.participatedBy, nft?._id) ||
            (cnt >= nft.totalSupplies - nft.totalSold && nft.totalSupplies > 0)
        )
            return
        else {
            setCnt(cnt + 1)
        }
    }

    const decrease = () => {
        if (cnt === 1) {
            return
        } else {
            setCnt(cnt - 1)
        }
    }

    const participateNow = async () => {
        if (isWalletLogin) {
            // console.log(userInfo._id)
            toggleDrawer('', 'right', false)
            setParticipatingModal(true)
            await participateEvent(
                nft._id,
                nft.nftImage,
                nft.name,
                nft.nftType,
                nft.price,
                userInfo.discordInfo?.username +
                    '#' +
                    userInfo.discordInfo?.discriminator,
                userInfo.discordInfo?.roles,
                cnt,
                setTransactionCompleted,
                setParticipatingFailModal,
                setParticipatingModal
            )
            return
        } else {
            toggleDrawer('', 'right', false)
            setOpenConnectModal(true)
            setParticipatingModal(false)
            return
        }
    }

    const toHyperlink = () => {
        try {
            var descriptionComponent = document.getElementById(
                'description_participaton'
            )
            var str = descriptionComponent?.innerText
            // console.log(str)
            if (str !== '') {
                var pattern1 =
                    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
                var str1 = str.replace(
                    pattern1,
                    "<a target='_blank' rel='noreferrer' style='color:#308BB3;text-decoration:underline;cursor:pointer' href='$1'>$1</a>"
                )
                var pattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim
                var str2 = str1.replace(
                    pattern2,
                    '$1<a target="_blank" rel="noreferrer" style="color:#308BB3;text-decoration:underline;cursor:pointer" href="http://$2">$2</a>'
                )

                str2 = str2.replace(
                    /show more/i,
                    "<span id='moresee' style='color:#308BB3; cursor:pointer'>show more</span>"
                )
                str2 = str2.replace(
                    /show Less/i,
                    "<span id='lesssee' style='color:#308BB3; cursor:pointer'>show Less</span>"
                )

                var more = document.getElementById('moresee')
                var less = document.getElementById('lesssee')
                if (less) {
                    more.addEventListener('click', () => {
                        setMore(false)
                    })
                }
                if (more) {
                    more.addEventListener('click', () => {
                        setMore(true)
                    })
                }
                descriptionComponent.innerHTML = str2
                // console.log(descriptionComponent.innerHTML)
            }
            // return str2
        } catch (err) {
            console.log(err)
        }
    }

    // ;(new Date(nft.timer).getTime() > Date.now() &&
    //     nft.totalSupply > 0 &&
    //     nft.totalSold < nft.totalSupply &&
    //     nft.timer !== ' ') ||
    //     (nft.timer === ' ' &&
    //         nft.totalSupply > 0 &&
    //         nft.totalSold < nft.totalSupply) ||
    //     (nft.timer === ' ' && !nft.totalSupply > 0)

    const checkValid = () => {
        // Checking nftType is it Raffle / Whitelist
        if (nft.nftType === 0 || nft.nftType === 1) {
            // Checking if time was given and it is greater than current time
            if (new Date(nft.timer).getTime() > Date.now()) {
                return true
            } else {
                return false
            }
        }
        //Checking for nftType as Item
        else if (nft.nftType === 3) {
            // Checking if time was not given
            if (nft.timer === ' ') {
                // Checking do we have enough supply?
                if (nft.totalSold < nft.totalSupply) {
                    return true
                } else {
                    return false
                }
            }
            // If time was given
            else {
                if (new Date(nft.timer).getTime() > Date.now()) {
                    if (nft.totalSold < nft.totalSupply) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            }
        } else {
            return false
        }
    }

    const downloadCSV = async (e) => {
        setDownloadLoading(true)
        const config = {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${
                    JSON.parse(localStorage.getItem('accessToken')).accessToken
                }`,
            },
        }

        await axios
            .post(
                `${BACKEND_URL}/nft/downloadWinningCardInfo`,
                {
                    owner: userInfo?.walletAddress,
                    _id: nft._id,
                },
                config
            )
            .then(async (res) => {
                const arr = res.data.data
                await exportToCsv(e, nft.name, arr)
                setDownloadLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setDownloadLoading(false)
            })
    }

    useEffect(() => {
        if (isWalletLogin) {
            userInfo?.participatedBy.forEach((p) => {
                if (p.nftId === nft._id) {
                    setParticipated(true)
                    return
                }
            })
        }
    }, [isWalletLogin, userInfo?.participatedBy, walletAddress])

    const styles = {
        button: `w-full px-2 py-2 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed rounded-lg font-[500] text-sm bg-white text-black mt-4 ${
            new Date(nft.timer).getTime() < Date.now()
                ? 'opacity-50 cursor-not-allowed'
                : ''
        }flex items-center justify-center gap-x-2`,
        title: `text-2xl font-[600] text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] to-[#FFFFFF75]`,
        modalContentWrapper: `w-[400px] ${
            nft.nftType === -1
                ? 'bg-[#FFF] text-primaryColor'
                : 'bg-cardModal text-white'
        } py-12 pb-8 flex flex-col gap-y-4 min-h-full relative screen4:w-screen border-l border-[#3D3D3D] overflow-scroll`,
        paddingModal: `px-12 screen4:px-6 screen5:px-3 `,
        participantCount: `absolute participate_now_hover_Effect top-2 right-[3.5rem] bg-white z-10 border-[2.7px] border-[#121212] text-black text-sm h-9 w-9 font-[600] p-3 px-4 flex justify-center items-center rounded-full backdrop-blur cursor-pointer`,
        nftParticipated: `participationsDone absolute top-2 right-[3.5rem] bg-white z-10 text-black text-sm font-[500] border-[2.7px] border-[#121212] h-9 w-min px-4 py-3 flex justify-center items-center rounded-full backdrop-blur cursor-pointer `,
        nftParticipants: `absolute top-2 right-[3.5rem] bg-white z-10 text-black text-sm font-[500] border-[2.7px] border-[#121212] h-9 w-max px-4 py-3 flex justify-center items-center rounded-full backdrop-blur cursor-pointer `,
        buttonDown: `w-full px-2 py-2 flex items-center justify-center rounded-lg font-[500] text-lg bg-white text-black ${
            new Date(nft.timer).getTime() < Date.now()
                ? 'cursor-not-allowed'
                : ''
        }flex items-center justify-center gap-x-2`,
    }

    var descriptionComponent = document.getElementById(
        'description_participaton'
    )

    useEffect(() => {
        if (!descriptionComponent) {
            setData(!isData)
        } else if (descriptionComponent) {
            toHyperlink()
        }
    }, [descriptionComponent, isData])

    return (
        <div className='inline-block bg-transparent text-left transform transition-all align-middle max-w-lg h-screen relative'>
            <div className={styles.modalContentWrapper}>
                {/* NFT IMAGE */}
                <div
                    className={`rounded-lg flex w-full h-[280px] relative ${styles.paddingModal}`}
                >
                    <img
                        src={nft.nftImage}
                        alt=''
                        className='rounded-lg object-cover w-[inherit] h-[inherit]'
                    />

                    {/* {nft.nftType === 3 ? ( */}

                    <div className={`${styles.nftParticipants}`}>
                        {nft.totalSupply - nft.totalSold + ' Item Left'}
                    </div>
                    {/* ) : isWalletLogin &&
                      !isAdmin &&
                      getUserParticipantLimit(nft) > 0 &&
                      getNftParticipate(userInfo?.participatedBy, nft?._id) >
                          0 ? (
                        <div className={`${styles.nftParticipated}`}>
                            {getNftParticipate(
                                userInfo?.participatedBy,
                                nft?._id
                            ) +
                                '/' +
                                getUserParticipantLimit(nft)}
                        </div>
                    ) : (
                        isAdmin && (
                            <div className={`${styles.participantCount}`}>
                                {nft.totalSold}
                            </div>
                        )
                    )} */}
                </div>

                {/* Nft Description */}
                <div
                    className={`flex h-full flex-col w-full gap-y-3 ${
                        showMore ? 'pb-3' : ''
                    } ${styles.paddingModal}`}
                >
                    {/* Title */}
                    <h1 className={`${styles.title}`}>
                        {nft.name.trim()}
                        {/* {nft.name.length > 30 && !showMore
                                            ? nft.name?.substring(0, 27) + '...'
                                            : nft.name} */}
                    </h1>

                    {/* Description */}
                    <p
                        className='font-[400] text-base py-2 -mt-1'
                        id='description_participaton'
                    >
                        {nft.description}
                    </p>

                    <div className='flex flex-col w-full gap-y-4'>
                        {
                            <div className='flex items-center justify-between w-full'>
                                <span className='font-[400] text-base leading-6'>
                                    Total Supply
                                </span>
                                <span className='font-[700] text-lg leading-6'>
                                    {nft.totalSupply}
                                </span>
                            </div>
                        }
                        {nft.stakingDays ? (
                            <div className='flex items-center justify-between w-full'>
                                <span className='font-[400] text-base leading-6'>
                                    Required Nft Staked Time
                                </span>
                                <span className='font-[700] text-lg leading-6'>
                                    {nft.stakingDays}
                                </span>
                            </div>
                        ) : (
                            ''
                        )}
                        {userInfo.isAdmin && (
                            <div className='flex items-center justify-between w-full'>
                                <span className='font-[400] text-base leading-6'>
                                    Total Entries
                                </span>
                                <span className='font-[700] text-lg leading-6'>
                                    {nft.totalSold}
                                </span>
                            </div>
                        )}
                        <div className='flex items-center justify-between'>
                            <span className='font-[400] text-base leading-6'>
                                PRICE
                            </span>
                            <span className='font-[700] text-lg leading-6'>
                                {nft.price} BLVCK
                            </span>
                        </div>
                    </div>

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
                            {isWalletLogin && (
                                <DiscordSvg className='text-xl' />
                            )}
                        </button>
                    ) : isParticipated &&
                      getNftParticipate(userInfo.participatedBy, nft?._id) >=
                          getUserParticipantLimit(nft) &&
                      getUserParticipantLimit(nft) > 0 &&
                      !userInfo?.isAdmin ? (
                        <button className={`${styles.button}`} disabled={true}>
                            Already Redeemed
                        </button>
                    ) : !nft.checkStakeInStock && !userInfo?.isAdmin ? (
                        <button className={`${styles.button}`} disabled={true}>
                            Coming Soon
                        </button>
                    ) : nft.totalSold >= nft.totalSupply &&
                      !userInfo?.isAdmin ? (
                        <button className={`${styles.button}`} disabled={true}>
                            Out of Stock
                        </button>
                    ) : (!cnt ||
                          userInfo.coinsBalance < parseInt(nft.price) ||
                          userInfo.coinsBalance === 0) &&
                      isWalletLogin &&
                      !userInfo?.isAdmin ? (
                        <div className='flex items-center gap-x-3 w-full mt-2'>
                            <button
                                className={`${styles.button} cursor-not-allowed mt-0`}
                                disabled={true}
                            >
                                NOT ENOUGH BALANCE
                            </button>
                        </div>
                    ) : ((!getStaked() && nft.stakingDays > 0) ||
                          userInfo.coinsBalance < parseInt(nft.price)) &&
                      !userInfo?.isAdmin ? (
                        <>
                            {!showDiscordEdit ? (
                                <div className='flex items-center gap-x-3 w-full mt-2'>
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
                                        new Date(nft.timer).getTime() <
                                        Date.now()
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
                    ) : !showDiscordEdit &&
                      !userInfo?.isAdmin &&
                      isWalletLogin ? (
                        <div className='flex items-center gap-x-3 w-full mt-2'>
                            <button
                                className={`${styles.button} mt-0 px-1`}
                                disabled={nft.totalSold >= nft.totalSupply}
                                onClick={() => {
                                    participateNow()
                                }}
                            >
                                Redeem as{' '}
                                {userInfo.discordInfo?.username?.length > 6
                                    ? userInfo.discordInfo?.username?.substring(
                                          0,
                                          6
                                      ) + '...'
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
                        isWalletLogin &&
                        !userInfo?.isAdmin && (
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
                        )
                    )}
                    {/* )} */}
                </div>

                {isWalletLogin && userInfo?.isAdmin && (
                    <div className={`w-full ${styles.paddingModal}`}>
                        <button
                            className={`${styles.buttonDown}`}
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
                                {downloadLoading
                                    ? 'Downloading...'
                                    : 'Download CSV'}
                            </span>
                        </button>
                    </div>
                )}
            </div>

            {/* Close Button */}
            <div
                className={`fixed rounded-full flex items-center justify-center top-[15px] right-[15px] p-[2px] h-[40px] w-[40px] ${
                    nft.nftType === -1
                        ? 'bg-primaryColor text-white'
                        : 'bg-white text-primaryColor'
                } cursor-pointer`}
                onClick={(e) => toggleDrawer(e, 'right', false)}
            >
                <CloseSvg />
            </div>

            <ConnectModal
                openModal={openConnectModal}
                setOpenModal={setOpenConnectModal}
                connectLoading={connectLoading}
            />
        </div>
    )
}

export default GiftNftModal
