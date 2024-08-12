import { useContext, useEffect, useState } from 'react'
import { BACKEND_URL, WalletConnectContext } from '../../../hooks/WalletLogin'
import exportToCsv, { exportToWinnersCsv } from '../../../hooks/DownloadCSV'
import CloseSvg from '../../../assets/svg/CloseSvg'
import DiscordSvg from '../../../assets/svg/DiscordSvg'
import NormalContainer from '../../Marketplace/NormalContainer'
import ExpiredContainer from '../../Marketplace/ExpiredContainer'
import axios from 'axios'
import ConnectModal from './ConnectModal'
import AuctionContainer from '../../Marketplace/AuctionContainer'
import { getDateString } from '../../../hooks/Countdown'
import ExpiredContainerAuction from '../../Marketplace/ExpiredContainerAuction'
import { Tooltip } from '@mui/material'
import BidFailModal from './BidFail'

const AuctionModal = ({
    openModal,
    setOpenModal,
    nft,
    isAdmin,
    toggleDrawer,
    setTransactionCompleted,
    // setParticipatingModal,
    setParticipatingFailModal,
    bidModal,
    setBidModal
}) => {
    const [showDiscordEdit, setShowDicordEdit] = useState(false)
    const [isParticipated, setParticipated] = useState(false)
    const [showMore, setMore] = useState(false)
    const [isData, setData] = useState(false)
    const [downloadLoading, setDownloadLoading] = useState(false)
    const [openConnectModal, setOpenConnectModal] = useState(false)
    const [cnt, setCnt] = useState(nft?.highestBid + 1 || 1)
    const [tab, setTab] = useState(1)

    const {
        createBid,
        isWalletLogin,
        userInfo,
        walletAddress,
        getUserParticipantLimit,
        getNftParticipate,
        connectLoading,
        connectWalletThroughMetamask,
        bidError,
        bids,
        bidsLoading,
        fetchAllBids
    } = useContext(WalletConnectContext)

    const connectWallet = async () => {
        // toggleDrawer('', 'right', false)
        setOpenConnectModal(true)
    }

    const setValue = (val) => {
        setCnt(val)
        // if (val > 0){
        // }
    }

    const increase = () => {
        if (
            false
            // cnt >=
            //     getUserParticipantLimit(nft) -
            //         getNftParticipate(userInfo?.participatedBy, nft?._id) ||
            // (cnt >= nft.totalSupplies - nft.totalSold && nft.totalSupplies > 0)
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
            // setParticipatingModal(true)
            await createBid(
                nft._id,
                cnt,
                toggleDrawer,
                setBidModal
            )
            return
        } else {
            toggleDrawer('', 'right', false)
            setOpenConnectModal(true)
            // setParticipatingModal(false)
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
        if (nft.nftType === 0 || nft.nftType === 1 || nft.nftType === 4) {
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
            .get(
                `${BACKEND_URL}/users/getBids/${nft._id}`,
                config
            )
            .then(async (res) => {
                const arr = res.data.bids
                await exportToCsv(e, nft.name, arr)
                setDownloadLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setDownloadLoading(false)
            })
    }

    const downloadWinnersCSV = async (e) => {
        const arr = []
        nft.winners.forEach((p) => {
            arr.push(p)
        })

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
                `${BACKEND_URL}/users/getUsersBurnerWallet`,
                {
                    users: arr,
                },
                config
            )
            .then(async (res) => {
                await exportToWinnersCsv(e, nft.name, res.data.users, nft.questions)
            })
            .catch((err) => {
                console.log(err)
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
        button: `w-full px-2 py-2 flex items-center justify-center cursor-pointer rounded-lg font-[500] text-lg bg-white text-black mt-4 ${
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
        tab_button: `text-[#FFF] font-[700] leading-[24px] text-[16px] border-b-2 border-white px-1 pb-1 font-[Oxanium]`,
        tab_button_disabled: `text-[#FFF] font-[700] leading-[24px] text-[16px] border-b-2 border-transparent px-1 pb-1 opacity-40 font-[Oxanium]`
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

    useEffect(() => {
        fetchAllBids(nft?._id)
    },[])

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

                    {/* {nft.nftType === 3 ? (
                        <div className={`${styles.nftParticipants}`}>
                            {nft.totalSupply - nft.totalSold + ' Item Left'}
                        </div>
                    ) : isWalletLogin &&
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


                    {bids?.length > 0 && <div className='flex items-center border-borderLine border-b'>
                        <button className={tab === 1 ? styles.tab_button : styles.tab_button_disabled} onClick={() => setTab(1)}>Details</button>
                        <button className={tab === 2 ? styles.tab_button : styles.tab_button_disabled} onClick={() => setTab(2)}>All Bids</button>
                    </div>}
                    {/* Description */}
                    {tab === 1 && <p  style={{ wordBreak: 'break-word' }}
                        className='font-[400] text-base py-2 -mt-1'
                        id='description_participaton'
                    >
                        {nft.description}
                    </p>}

                    {tab === 2 && <div className='flex flex-col h-full'>
                        {bidsLoading ? 'Loading...'
                        : bids?.map((bid, id) => {
                            return <BidRow key={id} bid={bid} id={id+1} />
                        })}
                        </div>}

                    {checkValid() && tab===1 && (
                        <AuctionContainer
                            nft={nft}
                            tab={tab}
                            setOpenModal={setOpenModal}
                            connectWallet={connectWallet}
                            downloadCSV={downloadCSV}
                            downloadLoading={downloadLoading}
                            showDiscordEdit={showDiscordEdit}
                            participateNow={participateNow}
                            setShowDicordEdit={setShowDicordEdit}
                            checkValid={checkValid}
                            isParticipated={isParticipated}
                            increase={increase}
                            decrease={decrease}
                            cnt={cnt}
                            setValue={setValue}
                        />
                    )}
                    {bidError && <span className='text-red-600'>{bidError}</span>}
                </div>

                {new Date(nft.timer).getTime() < Date.now() && tab===1  && (
                    <ExpiredContainerAuction
                        nft={nft}
                        userInfo={userInfo}
                        downloadCSV={downloadCSV}
                        downloadLoading={downloadLoading}
                        downloadWinnersCSV={downloadWinnersCSV}
                    />
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

export default AuctionModal

const BidRow = ({bid, id}) => {
    const [copyText, setCopyText] = useState('Copy')

    return(
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <h1 className='text-[16px] leading-[27px] font-[400]' style={{fontFamily: 'Avenir Next'}}>{id}.</h1>
                    <Tooltip followCursor={true} title={copyText}>
                        <h1 style={{fontFamily: 'Avenir Next'}} className='cursor-pointer text-[14px] leading-[19px] font-[400] opacity-50 font-[Avenir_Next]'
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    bid.walletAddress
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
                        >{bid.walletAddress.substring(0, 3) + '...' + bid.walletAddress.substring(bid.walletAddress.length - 4, bid.walletAddress.length)}</h1>
                    </Tooltip>
                </div>
                <h1 style={{fontFamily: 'Avenir Next'}} className='text-[14px] leading-[17px] font-[600]'>{bid.bid}</h1>
                <h1 style={{fontFamily: 'Avenir Next'}} className='text-[14px] leading-[17px] font-[400]'>{getDateString(bid.timer)}</h1>
            </div>
    )
}