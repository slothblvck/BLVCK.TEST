import { useContext, useEffect, useState } from 'react'
import { BACKEND_URL, DISCORD_NAME, WalletConnectContext } from '../../../hooks/WalletLogin'
import exportToCsv, { exportToWinnersCsv } from '../../../hooks/DownloadCSV'
import CloseSvg from '../../../assets/svg/CloseSvg'
import DiscordSvg from '../../../assets/svg/DiscordSvg'
import NormalContainer from './../../Marketplace/NormalContainer'
import ExpiredContainer from './../../Marketplace/ExpiredContainer'
import axios from 'axios'
import ConnectModal from './ConnectModal'

const NftModal = ({
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
        connectLoading,
        connectWalletThroughMetamask,
    } = useContext(WalletConnectContext)

    const connectWallet = async () => {
        // toggleDrawer('', 'right', false)
        setOpenConnectModal(true)
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
            // await fetchNfts()
            // await getActivity()
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
                `${BACKEND_URL}/users/getNftParticipated`,
                {
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
        modalContentWrapper: `${
            nft.nftType === -1
                ? 'bg-[#FFF] text-primaryColor'
                : 'bg-cardModal text-white'
        } w-[400px] py-12 pb-8 flex flex-col gap-y-4 min-h-full h-full relative screen4:w-screen border-l border-[#3D3D3D] overflow-scroll`,
        paddingModal: `px-12 screen4:px-6 screen5:px-3 `,
        participantCount: `absolute participate_now_hover_Effect top-2 right-[3.5rem] bg-white z-10 border-[2.7px] border-[#121212] text-black text-sm h-9 w-9 font-[600] p-3 px-4 flex justify-center items-center rounded-full backdrop-blur cursor-pointer`,
        nftParticipated: `participationsDone absolute top-2 right-[3.5rem] bg-white z-10 text-black text-sm font-[500] border-[2.7px] border-[#121212] h-9 w-min px-4 py-3 flex justify-center items-center rounded-full backdrop-blur cursor-pointer `,
        nftParticipants: `absolute top-2 right-[3.5rem] bg-white z-10 text-black text-sm font-[500] border-[2.7px] border-[#121212] h-9 w-max px-4 py-3 flex justify-center items-center rounded-full backdrop-blur cursor-pointer `,
        top_left_bg: `w-[148%] h-[400px] rotate-[-35deg] fixed -top-[235px] -left-[170px]`,
        bottom_right_bg: `w-[148%] h-[400px] rotate-[-35deg] fixed -bottom-[220px] -right-[185px]`
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
        <div style={{ background: 'linear-gradient(348.79deg, #0F0F10 0%, #212227 100.66%)' }} className={`inline-block bg-transparent text-left transform transition-all align-middle max-w-lg h-screen relative overflow-hidden`}>
            <div style={{ background: 'transparent', zIndex: 1 }} className={styles.modalContentWrapper}>
                {/* NFT IMAGE */}
                <div
                    className={`rounded-lg flex w-full h-[280px] relative ${styles.paddingModal} z-[1]`}
                >
                    <img
                        src={nft.nftImage}
                        alt=''
                        className='rounded-lg object-cover w-[inherit] h-[inherit]'
                    />

                    {nft.nftType === 3 ? (
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
                    )}
                </div>

                {/* Nft Description */}
                <div
                    className={`flex h-full flex-col w-full gap-y-3 z-[1] ${
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
                    <p  style={{ wordBreak: 'break-word' }}
                        className='font-[400] text-base py-2 -mt-1'
                        id='description_participaton'
                    >
                        {nft.description}
                    </p>
                    {/* {nft.description && (
                        <p className='font-[400] text-base py-2 -mt-1'>
                            {nft.description.length > 52 && !showMore
                                ? nft.description?.substring(0, 52)
                                : nft.description}
                            {nft.description.length > 52 && (
                                <>
                                    {!showMore ? (
                                        <>
                                            {'... '}
                                            <span
                                                className='text-[#fff] font-[700] cursor-pointer hover:underline'
                                                onClick={() => setMore(true)}
                                            >
                                                read more
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            {' '}
                                            <span
                                                className='text-[#fff] font-[700] cursor-pointer hover:underline'
                                                onClick={() => setMore(false)}
                                            >
                                                read less
                                            </span>
                                        </>
                                    )}
                                </>
                            )}
                        </p>
                    )} */}

                    {/* Discord Roles */}
                    {nft.personName.length > 0 && (
                        <div className='flex flex-col my-3'>
                            {/* Discord */}
                            <div className='flex items-center gap-x-2'>
                                <DiscordSvg className='w-4' />
                                <p className='font-[400] text-xs'>
                                    Eligible for:
                                </p>
                            </div>
                            {/* Roles */}
                            <div className='flex flex-wrap gap-2 mt-2'>
                                {nft.personName.map((name, id) => (
                                    <div
                                        key={id}
                                        className='bg-gradient-to-r from-[#FDFDFD] to-[#979799] p-[1px] rounded-3xl backdrop-blur-3xl'
                                    >
                                        <p className='px-3 py-1 bg-[#131315] rounded-3xl font-[700] text-xs backdrop-blur-3xl'>
                                            {name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {(checkValid() || nft.nftType === 3) && (
                        <NormalContainer
                            nft={nft}
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
                </div>

                {(new Date(nft.timer).getTime() < Date.now() ||
                    (nft.totalSupply > 0 &&
                        nft.totalSold >= nft.totalSupply)) &&
                    nft.nftType !== 3 && (
                        <ExpiredContainer
                            nft={nft}
                            userInfo={userInfo}
                            downloadCSV={downloadCSV}
                            downloadLoading={downloadLoading}
                            downloadWinnersCSV={downloadWinnersCSV}
                        />
                    )}
            </div>

            {nft?.personName?.length > 0 && nft?.personName[0] === DISCORD_NAME &&
                <>
                    <div className={styles.top_left_bg} style={{ 
                        background: `linear-gradient(183deg, #D41E33 0.02%, #930716 101.55%, #930716 101.55%)`, zIndex: 0
                    }}></div>
                    <div className={styles.bottom_right_bg} style={{ background:'linear-gradient(174deg, #232C44 0%, #040404 100%)', zIndex: 0 }}></div>
                </>
            }


            {/* Close Button */}
            <div
                className={`fixed rounded-full flex items-center justify-center top-[15px] right-[15px] p-[2px] h-[40px] w-[40px] ${
                    nft.nftType === -1
                        ? 'bg-primaryColor text-white'
                        : 'bg-white text-primaryColor'
                } cursor-pointer`}
                onClick={(e) => toggleDrawer(e, 'right', false)}
                style={{ zIndex: 2 }}
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

export default NftModal
