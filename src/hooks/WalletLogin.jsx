import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import Web3 from 'web3'
// import { ETHX } from '../data/contracts/constant'
import { minABI } from '../data/contracts/minABI'
import WalletConnectProvider from '@walletconnect/web3-provider'
import exportToCsv from './DownloadCSV'
// export const BACKEND_URL = 'http://localhost:5005'
// export const BACKEND_URL = 'https://blvck-backend1.herokuapp.com'
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
export const DISCORD_NAME = 'BLVCK X PSG'

export const WalletConnectContext = createContext()

export const parseOriginalDate = (date) => {
    const parsedDate = new Date(date).toString().split(' ')
    return `${parsedDate[1]} ${parsedDate[2]}, ${parsedDate[3]}`
}

export const WalletConnectProviderHook = ({ children }) => {
    const [isWalletLogin, setWalletLogin] = useState(false)
    const [accessToken, setAccessToken] = useState(null)
    const [signature, setSignature] = useState(null)
    const [userInfo, setUserInfo] = useState({})
    const [getAllUsers, setGetAllUsers] = useState([])
    const [topStakingInfo, setTopStakingInfo] = useState({})
    const [walletAddress, setWalletAddress] = useState(null)
    const [discordData, setDiscordData] = useState({})
    const [dashInfo, setDashInfo] = useState({})
    const [participatedData, setParticipatedData] = useState({})
    const [stackInfo, setStackInfo] = useState({})
    const [leaderboardData, setLeaderboardData] = useState([])
    const [allLeaderboardData, setAllLeaderboardData] = useState([])
    const [tokenAmount, setTokenAmount] = useState(0)
    const [skip, setskip] = useState(0)
    const [bidError, setBidError] = useState('')
    const [userActivity, setUserActivity] = useState([])
    const [roles, setRoles] = useState([])
    const [notifications, setNotifications] = useState([])
    const [notificationLoading, setNotificationLoading] = useState(false)
    const [predictionEventParticipation, setPredictionEventParticiaption] = useState(false)
    const [winnerSaveLoading, setWinnerSaveLoading] = useState(false)
    const [resetPointLoading, setResetPointsLoading] = useState(false)
    const [subscribing, setSubscribing] = useState(false)
    const [alSubscribersLoading, setAllSubscribersLoading] = useState(false)
    const [allNfts, setAllNfts] = useState([])
    const [allSubscribers, setAllSubscribers] = useState([])
    const [ongoingNft, setOngoingNft] = useState([])
    const [bids, setBids] = useState([])
    const [announceLoading, setAnnounceLoading] = useState(false)
    const [leaderboardDataLoading, setLeaderboardDataLoading] = useState(false)
    const [ongoingLoading, setOngoingLoading] = useState(false)
    const [partnerLoading, setPartnerLoading] = useState(true)
    const [bidsLoading, setBidsLoading] = useState(false)
    const [biding, setBidingLoading] = useState(false)
    const [partnerCreateLoading, setPartnerCreateLoading] = useState(false)
    const [eventCreateLoading, setEventCreateLoading] = useState(false)
    const [predictionEventCreateLoading, setPredicionEventCreateLoading] = useState(false)
    const [predictionEventLoading, setPredctionEventLoading] = useState(true)
    const [eventLoading, setEventLoading] = useState(true)
    const [partnerData, setPartnerData] = useState([])
    const [stakeCard, setStakeCard] = useState([])
    const [predictionEventData, setPredictionEventData] = useState([])
    const [eventData, setEventData] = useState([])
    const [recentSale, setRecentSale] = useState([])
    const [recentSaleLoading, setRecentSaleLoading] = useState(false)
    const [openModal, setOpenModal] = useState({ open: false, type: 1 })
    const [loading, setLoading] = useState(false)
    const [submiting, setSubmitting] = useState(false)
    const [graphLoading, setGraphLoading] = useState(false)
    const [collectedCoins, setCollectedCoins] = useState(false)
    const [metadataLoading, setMetadataLoading] = useState(false)
    const [getAllUsersLoading, setGetAllUsersLoading] = useState(false)
    const [activityLoading, setActivityLoading] = useState(false)
    const [connectLoading, setConnectLoading] = useState(false)
    const [noWallet, setNoWallet] = useState(false)
    const [leaderboardSaving, setLeaderboardSaving] = useState(false)
    const [walletStatus, setWalletStatus] = useState('')
    const [leaderboardInfo, setLeaderboardInfo] = useState({})
    const [anchorEl_items, setAnchorEl_items] = useState(null)
    const [activeNftType, setActiveNftType] = useState('All Items')
    const web3 = new Web3(Web3.givenProvider)

    // console.log(accessToken)
    // console.log(signature)

    const open_items = Boolean(anchorEl_items)

    const config = {
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${accessToken}`,
        },
    }

    const handleOpenMenu_items = (event) => {
        setAnchorEl_items(event.currentTarget)
    }

    const handleClose_items = (event) => {
        setAnchorEl_items(null)
        // console.log(event.target)
        event.target.value
            ? setActiveNftType(event.target.value)
            : setActiveNftType('All Items')
    }

    const getNotifications = async () => {
        if (isWalletLogin && accessToken) {
            try {
                setNotificationLoading(true)
                await axios
                    .post(
                        `${BACKEND_URL}/users/getNotifications`,
                        {
                            address: walletAddress,
                        },
                        config
                    )
                    .then((res) => {
                        let data = res.data.data
                        data.reverse()
                        setNotifications(data)
                        setNotificationLoading(false)
                    })
                    .catch((err) => {
                        console.log(err)
                        setNotificationLoading(false)
                    })
            } catch (err) {
                console.log(err)
                setNotificationLoading(false)
            }
        }
    }

    const createUser = async (signature, nonce, data) => {
        // setConnectLoading(true)
        axios
            .post(`${BACKEND_URL}/auth/login`, { signature, nonce })
            .then((res) => {
                setUserInfo(res.data.userInfo)
                setAccessToken(res.data.accessToken)
                setWalletLogin(true)
                localStorage.setItem(
                    'userInfo',
                    JSON.stringify({ userInfo: res.data.userInfo })
                )
                localStorage.setItem(
                    'accessToken',
                    JSON.stringify({ accessToken: res.data.accessToken })
                )
                localStorage.setItem('walletAddress', JSON.stringify(data[0]))
                localStorage.setItem('metamaskInfo', JSON.stringify(data))
                localStorage.setItem(
                    'signature',
                    JSON.stringify({
                        signature,
                    })
                )
                localStorage.setItem(
                    'bottom-swipe-banner',
                    JSON.stringify(true)
                )
                setWalletLogin(true)
                setConnectLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setConnectLoading(false)
            })
    }

    const logout = async () => {
        try {
            await localStorage.clear()
            setWalletLogin(false)
            setUserInfo({})
            setUserActivity([])
            setDiscordData({})
            setWalletAddress(null)
            setAccessToken(null)
            setSignature(null)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    const redeemWinningCard = async (
        userId,
        setTransactionCompleted,
        setParticipatingFailModal,
        setParticipatingModal
    ) => {
        if (walletAddress && accessToken) {
            await axios
                .post(
                    `${BACKEND_URL}/nft/redeemWinningCard`,
                    {
                        userId: userId,
                    },
                    config
                )
                .then(async (res) => {
                    if (res.data.data) {
                        await fetchOngoing('ongoing')
                        await fetchNfts()
                        await updateLocalUserInfo()
                        setParticipatingModal(false)
                        setTransactionCompleted(true)
                    } else {
                        setParticipatingModal(false)
                        setParticipatingFailModal(true)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    setParticipatingModal(false)
                    setParticipatingFailModal(true)
                })
        } else {
            window.alert('Something Failed!')
            setParticipatingModal(false)
            setParticipatingFailModal(true)
        }
    }

    const getAllSubscriptions = async (e, _id) => {
        if (walletAddress && accessToken) {
            setAllSubscribersLoading(true)
            await axios
            .post(
                `${BACKEND_URL}/users/getAllSubscriptions`,
                {
                    _id: _id,
                    userId: userInfo._id,
                },
                config
                )
                .then(async (res) => {
                    setAllSubscribers(res.data.subscribers)
                    await exportToCsv(e, 'Events', res.data.subscribers)
                    setAllSubscribersLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                    setAllSubscribersLoading(false)
                })
        } else {
            window.alert('Something Failed!')
        }
    }

    const getParticipatedPredicitionEventData = async (_id) => {
        await axios
        .post(
            `${BACKEND_URL}/users/getParticipatedPredictionEventEntry`,
            {
                _id: _id,
                participatedBy: walletAddress,
            },
            config
        )
        .then((res) => {
            setParticipatedData(res.data.data)
        })
        .catch((err) => {
            console.log(err)
            return null
        })
    }

    const getAdminResetLeaderboard = async () => {
        setResetPointsLoading(true)
        await axios
        .post(
            `${BACKEND_URL}/users/resetPoints`,
            {
                walletAddress: userInfo?.walletAddress
            },
            config
        )
        .then((res) => {
            console.log(res.data);

            setAllLeaderboardData(res.data.data)
            setResetPointsLoading(false)
        })
        .catch((err) => {
            console.log(err)
            setResetPointsLoading(false)
            return null
        })
    }

    const saveLeaderboardDescription = async (data) => {
        setLeaderboardSaving(true)

        await axios
        .post(
            `${BACKEND_URL}/users/addLeaderboardInfo`,
            {
                walletAddress: userInfo?.walletAddress,
                title: data.title,
                startTimer: new Date(data.startTimer).getTime(),
                endTimer: new Date(data.endTimer).getTime(),
                description: data.description
            },
            config
        )
        .then(async(res) => {
            await getAdminLeaderboardData();
            setLeaderboardSaving(false)
        })
        .catch((err) => {
            console.log(err)
            setLeaderboardSaving(false)
        })
    }

    const getAdminLeaderboardData = async (toHyperlink) => {
        setLeaderboardDataLoading(true)
        await axios
        .post(
            `${BACKEND_URL}/users/getAllLeaderboardData`,
            {
                walletAddress: userInfo?.walletAddress
            },
            config
        )
        .then((res) => {
            console.log(res.data);

            setLeaderboardInfo(res.data.leaderboardInfo)
            setAllLeaderboardData(res.data.data)

            if(toHyperlink) toHyperlink();
            setLeaderboardDataLoading(false)
        })
        .catch((err) => {
            console.log(err)
            setLeaderboardDataLoading(false)
            return null
        })
    }

    const getLeaderboardData = async (toHyperlink) => {
        await axios
        .post(
            `${BACKEND_URL}/users/getLeaderboardData`,
            {
                walletAddress: userInfo?.walletAddress
            },
            config
        )
        .then((res) => {
            console.log(res.data);

            setLeaderboardInfo(res.data.leaderboardInfo)
            setLeaderboardData(res.data.data)

            if(toHyperlink) toHyperlink();
        })
        .catch((err) => {
            console.log(err)
            return null
        })
    }

    const announcePredictionEventWinners = async (_id, answers) => {
        setAnnounceLoading(true)
        await axios
        .post(
            `${BACKEND_URL}/users/anouncePredictionEventWinners`,
            {
                _id: _id,
                userId: userInfo._id,
                answers,
                channelID: process.env.REACT_APP_CHANNEL_ID || '1006135086493745252',
            },
            config
        )
        .then((res) => {
            console.log(res.data);
            fetchPredictionEvents()
            setAnnounceLoading(false)
        })
        .catch((err) => {
            setAnnounceLoading(false)
            console.log(err)
            return null
        })
    }

    const participatePredictionEvent = async (_id, answers, setOpenModal) => {
        if (walletAddress && accessToken) {
            setPredictionEventParticiaption(true)
            await axios
            .post(
                `${BACKEND_URL}/users/participate-prediction-event`,
                {
                    _id: _id,
                    userId: userInfo._id,
                    participatedBy: walletAddress,
                    answers,
                },
                config
                )
                .then(async (res) => {
                    fetchPredictionEvents()
                    updateLocalUserInfo()
                    setPredictionEventParticiaption(false)
                    if(setOpenModal) setOpenModal(false)
                        })
                .catch((err) => {
                        console.log(err)
                        setPredictionEventParticiaption(false)
                    if(setOpenModal) setOpenModal(false)
                })
        } else {
            window.alert('Something Failed!')
        }
    }

    const subscribeEvent = async (_id) => {
        if (walletAddress && accessToken) {
            setSubscribing(true)
            await axios
            .post(
                `${BACKEND_URL}/users/subscribe-event`,
                {
                    _id: _id,
                    userId: userInfo._id,
                    participatedBy: walletAddress,
                },
                config
                )
                .then(async (res) => {
                    fetchEvents()
                    setSubscribing(false)
                })
                .catch((err) => {
                    console.log(err)
                    setSubscribing(false)
                })
        } else {
            window.alert('Something Failed!')
        }
    }

    const participateEvent = async (
        nftId,
        image,
        nftName,
        nftType,
        nftPrice,
        username,
        roles,
        cnt,
        setTransactionCompleted,
        setParticipatingFailModal,
        setParticipatingModal
    ) => {
        if (walletAddress && accessToken) {
            await axios
                .post(
                    `${BACKEND_URL}/users/participate-event`,
                    {
                        _id: nftId,
                        userId: userInfo._id,
                        participatedBy: walletAddress,
                        username: username,
                        roles: roles,
                        nftPrice: nftPrice,
                        userInfo: userInfo,
                        cnt,
                    },
                    config
                )
                .then(async (res) => {
                    // nftType, nftName, img, cnt, nftPrice
                    if (res.data.data) {
                        await setActivity(image, nftPrice, nftName, cnt)
                            .then(async (res) => {
                                // await fetchNfts()
                                // await getActivity()
                                // setLoading(false)
                                setTransactionCompleted(true)
                            })
                            .catch((err) => {
                                console.log(err)
                                setParticipatingModal(false)
                                setParticipatingFailModal(true)
                            })
                    } else {
                        // console.log(err)
                        setParticipatingModal(false)
                        setParticipatingFailModal(true)
                        // setTransactionCompleted(true)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    setParticipatingModal(false)
                    setParticipatingFailModal(true)
                })
        } else {
            window.alert('Something Failed!')
            setParticipatingModal(false)
            setParticipatingFailModal(true)
        }
    }

    const api = async () => {
        var arr
        await axios
            .get(`${BACKEND_URL}/nft/?skip=${skip}`)
            .then((res) => {
                arr = res.data.data
                let metadata = allNfts
                metadata.push(...arr)
                setAllNfts(metadata)
                if (res.data.msg) {
                    setskip("Finished")
                }
                if (!res.data.msg && skip <= 50) {
                    setskip((prev) => prev + 50)
                }
            })
            .catch((err) => {
                console.log(err.toString())
                setMetadataLoading(false)
            })
        return allNfts
    }

    const fetchNfts = async () => {
        if (skip == 0) {
            setMetadataLoading(true)
        } else {
            setMetadataLoading(false)
        }
        if (typeof(skip) == 'number') {
            await api()
        }

        setMetadataLoading(false)
    }

    const createBid = async (id, bidPrice, toggleDrawer, setBidModal) => {
        if(!userInfo?._id)
            return

        setBidingLoading(true)
        await axios
            .post(`${BACKEND_URL}/users/create-bid`, {
                _id : id,
                bidPrice: bidPrice,
                userId: userInfo?._id,
            },config)
            .then(async(res) => {
                if(res.status === 200){
                    await fetchAllBids()
                    await fetchOngoing('ongoing')
                    await fetchNfts()
                    await updateLocalUserInfo()
                    await getActivity()
                    setBidingLoading(false)
                    setBidError('')
                    if(toggleDrawer)
                    toggleDrawer('', 'right', false)
                }else{
                    setBidingLoading(false)
                    toggleDrawer('', 'right', false)
                    if(setBidModal){
                        setBidModal(true)
                    }
                }
            })
            .catch((err) => {
                console.log(err.toString())
                setBidingLoading(false)
                toggleDrawer('', 'right', false)
                if(setBidModal){
                    setBidModal(true)
                }
            })
    }

    const fetchAllBids = async (id) => {
        setBidsLoading(true)
        await axios
            .get(`${BACKEND_URL}/users/getBids/${id}`)
            .then((res) => {
                let arr = res.data.bids
                arr.reverse()
                setBids(arr)
                setBidsLoading(false)
            })
            .catch((err) => {
                console.log(err.toString())
                setBidsLoading(false)
            })
    }

    const fetchPredictionEvents = async () => {
        setPredctionEventLoading(true)
        await axios
            .post(`${BACKEND_URL}/nft/getPredictionEvents`)
            .then((res) => {
                let arr = res?.data?.events
                setPredictionEventData(arr)
                setPredctionEventLoading(false)
            })
            .catch((err) => {
                console.log(err.toString())
                setPredctionEventLoading(false)
            })
    }

    const fetchEvents = async () => {
        setEventLoading(true)
        await axios
            .post(`${BACKEND_URL}/nft/getEvents`)
            .then((res) => {
                let arr = res.data
                setEventData(arr)
                setEventLoading(false)
            })
            .catch((err) => {
                console.log(err.toString())
                setEventLoading(false)
            })
    }

    const fetchPartners = async () => {
        setPartnerLoading(true)
        await axios
            .post(`${BACKEND_URL}/nft/getPartners`)
            .then((res) => {
                let arr = res.data
                setPartnerData(arr)
                setPartnerLoading(false)
            })
            .catch((err) => {
                console.log(err.toString())
                setPartnerLoading(false)
            })
    }

    const fetchOngoing = async (type) => {
        setOngoingLoading(true)
        await axios
            .get(`${BACKEND_URL}/nft/?type=${type}`)
            .then((res) => {
                let arr = res.data.data
                arr.reverse()
                setOngoingNft(arr)
                setOngoingLoading(false)
            })
            .catch((err) => {
                console.log(err.toString())
                setOngoingLoading(false)
            })
    }

    const saveWinners = async (winners, _id) => {
        if (isWalletLogin && winners && _id) {
            setWinnerSaveLoading(true)
            await axios
                .post(
                    `${BACKEND_URL}/auth/saveWinners`,
                    {
                        address: walletAddress,
                        winners,
                        _id,
                        owner: walletAddress,
                        channelID:
                            process.env.REACT_APP_CHANNEL_ID ||
                            '1006135086493745252',
                    },
                    config
                )
                .then(async (res) => {
                    await fetchNfts()
                    await fetchOngoing('ongoing')
                    setWinnerSaveLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                    setWinnerSaveLoading(false)
                })
        }
    }

    const getNonce = async (address, type) => {
        const nonce = await axios.post(`${BACKEND_URL}/auth/getNonce`, {
            address: address,
            type,
        })
        return nonce.data.data.nonce
    }

    const connectWalletThroughMetamask = async (setOpenConnectModal) => {
        if (noWallet) {
            setOpenConnectModal(false)
            setOpenModal({ open: true, type: 1 })
        } else {
            setConnectLoading(true)
            try {
                if (window.ethereum) {
                    var address
                    if (window.ethereum.providers) {
                        address = await window.ethereum.providers
                            .find((provider) => provider.isMetaMask)
                            .request({ method: 'eth_requestAccounts' })
                    } else {
                        if (window.ethereum.isMetaMask) {
                            address = await window.ethereum.request({
                                method: 'eth_requestAccounts',
                            })
                        }
                    }
                    if (address && address.length > 0) {
                        await web3.eth
                            .getAccounts()
                            .then(async (data) => {
                                if (data.length > 0) {
                                    if (data[0].length > 1) {
                                        const _message_ = await getNonce(
                                            data[0],
                                            'metamask'
                                        )
                                        web3.eth
                                            .requestAccounts()
                                            .then((accounts) => {
                                                web3.eth.personal
                                                    .sign(_message_, data[0])
                                                    .then(async (res) => {
                                                        const signature = res
                                                        setSignature(res)
                                                        setWalletAddress(
                                                            data[0]
                                                        )
                                                        setWalletStatus(
                                                            data.status
                                                        )
                                                        await createUser(
                                                            signature,
                                                            _message_,
                                                            data
                                                        )
                                                        setOpenConnectModal(
                                                            false
                                                        )
                                                    })
                                                    .catch((err) => {
                                                        console.log(err)
                                                        setConnectLoading(false)
                                                        setOpenConnectModal(
                                                            false
                                                        )
                                                    })
                                            })
                                    } else {
                                        localStorage.removeItem('metamaskInfo')
                                        setConnectLoading(false)
                                    }
                                    setOpenModal({ open: false, type: 1 })
                                    // setConnectLoading(false)
                                }
                                // setConnectLoading(false)
                            })
                            .catch((err) => {
                                setConnectLoading(false)
                                setOpenConnectModal(false)
                                setOpenModal({ open: true, type: 1 })
                                console.log('Wallet Error:', err)
                            })
                    } else {
                        setConnectLoading(false)
                        setOpenConnectModal(false)
                        setOpenModal({ open: true, type: 1 })
                    }
                } else {
                    setConnectLoading(false)
                    setOpenConnectModal(false)
                    setOpenModal({ open: true, type: 1 })
                }
                // setConnectLoading(false)
            } catch (err) {
                console.log(err)
                setConnectLoading(false)
                setOpenConnectModal(false)
            }
        }
    }

    const connectWalletThrougConnectWallet = async (setOpenConnectModal) => {
        if (noWallet) {
            setOpenConnectModal(false)
            setOpenModal({ open: true, type: 4 })
        } else {
            setConnectLoading(true)
            try {
                const provider = new WalletConnectProvider({
                    rpc: {
                        1: 'https://cloudflare-eth.com',
                        137: 'https://polygon-rpc.com',
                        // 100: 'https://dai.poa.network',
                    },
                    bridge: 'https://bridge.walletconnect.org',
                })

                await provider.enable()
                const web3 = new Web3(provider)

                // if (window.ethereum) {
                // if (window.ethereum.providers) {
                //     address = await window.ethereum.providers
                //         .find((provider) => provider.isMetaMask)
                //         .request({ method: 'eth_requestAccounts' })
                // } else {
                //     if (window.ethereum.isMetaMask) {
                //         console.log('Processing Start Metamask...')
                //         address = await window.ethereum.request({
                //             method: 'eth_requestAccounts',
                //         })
                //     }
                // }
                // if (address && address.length > 0) {
                await web3.eth
                    .getAccounts()
                    .then(async (data) => {
                        if (data.length > 0) {
                            if (data[0].length > 1) {
                                const _message_ = await getNonce(
                                    data[0],
                                    'walletconnect'
                                )
                                // await web3.eth
                                //     .requestAccounts()
                                //     .then(async (accounts) => {
                                //         console.log(accounts)
                                await web3.eth.personal
                                    .sign(_message_, data[0])
                                    .then(async (res) => {
                                        console.log(res)
                                        const signature = res
                                        setSignature(res)
                                        setWalletAddress(data[0])
                                        setWalletStatus(data.status)
                                        await createUser(
                                            signature,
                                            _message_,
                                            data
                                        )
                                        setOpenConnectModal(false)
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                        setConnectLoading(false)
                                        setOpenConnectModal(false)
                                    })
                                // })
                            } else {
                                localStorage.removeItem('metamaskInfo')
                                setConnectLoading(false)
                            }
                            setOpenModal({ open: false, type: 4 })
                            // setConnectLoading(false)
                        }
                        // setConnectLoading(false)
                    })
                    .catch((err) => {
                        setConnectLoading(false)
                        setOpenConnectModal(false)
                        setOpenModal({ open: true, type: 4 })
                        console.log('Wallet Error:', err)
                    })
                // } else {
                //     setConnectLoading(false)
                //     setOpenModal({ open: true, type: 4 })
                // }
                // } else {
                //     setConnectLoading(false)
                //     setOpenModal({ open: true, type: 4 })
                // }
                setConnectLoading(false)
            } catch (err) {
                console.log(err.toString())
                setConnectLoading(false)
                setOpenConnectModal(false)
            }
        }
    }

    const connectWalletThroughTrustWallet = async (setOpenConnectModal) => {
        if (noWallet) {
            setOpenConnectModal(false)
            setOpenModal({ open: true, type: 3 })
        } else {
            setConnectLoading(true)
            try {
                if (window.ethereum) {
                    var address
                    if (window.ethereum.providers) {
                        address = await window.ethereum.providers
                            .find((provider) => provider.isTrustWallet)
                            .request({ method: 'eth_requestAccounts' })
                    } else {
                        if (window.ethereum.isTrustWallet) {
                            address = await window.ethereum.request({
                                method: 'eth_requestAccounts',
                            })
                        }
                    }
                    if (address && address.length > 0) {
                        await new web3.eth.getAccounts()
                            .then(async (data) => {
                                if (data.length > 0) {
                                    if (data[0].length > 1) {
                                        const _message_ = await getNonce(
                                            data[0],
                                            'trustwallet'
                                        )
                                        await new web3.eth.requestAccounts().then(
                                            async (accounts) => {
                                                await new web3.eth.personal.sign(
                                                    _message_,
                                                    data[0]
                                                )
                                                    .then(async (res) => {
                                                        const signature = res
                                                        setSignature(res)
                                                        setWalletAddress(
                                                            data[0]
                                                        )
                                                        setWalletStatus(
                                                            data.status
                                                        )
                                                        await createUser(
                                                            signature,
                                                            _message_,
                                                            data
                                                        )
                                                        setOpenConnectModal(
                                                            false
                                                        )
                                                    })
                                                    .catch((err) => {
                                                        console.log(err)
                                                        setConnectLoading(false)
                                                        setOpenConnectModal(
                                                            false
                                                        )
                                                    })
                                            }
                                        )
                                    } else {
                                        localStorage.removeItem('metamaskInfo')
                                        setConnectLoading(false)
                                    }
                                    setOpenModal({ open: true, type: 3 })
                                    // setConnectLoading(false)
                                }
                                // setConnectLoading(false)
                            })
                            .catch((err) => {
                                setOpenModal({ open: true, type: 3 })
                                setConnectLoading(false)
                                console.log('Wallet Error:', err)
                            })
                    } else {
                        setConnectLoading(false)
                        setOpenModal({ open: true, type: 3 })
                    }
                } else {
                    setConnectLoading(false)
                    setOpenModal({ open: true, type: 3 })
                }
                // setConnectLoading(false)
            } catch (err) {
                console.log(err)
                setConnectLoading(false)
                setOpenConnectModal(false)
            }
        }
    }

    const connectWalletThroughCoinbase = async (setOpenConnectModal) => {
        if (noWallet) {
            setOpenConnectModal(false)
            setOpenModal({ open: true, type: 2 })
        } else {
            setConnectLoading(true)
            try {
                if (window.ethereum) {
                    var address
                    if (window.ethereum.providers) {
                        address = await window.ethereum.providers
                            .find((provider) => provider.isCoinbaseWallet)
                            .request({ method: 'eth_requestAccounts' })
                    } else {
                        if (window.ethereum.isCoinbaseWallet) {
                            address = await window.ethereum.request({
                                method: 'eth_requestAccounts',
                            })
                        }
                    }
                    if (address && address.length > 0) {
                        await new web3.eth.getAccounts()
                            .then(async (data) => {
                                if (data.length > 0) {
                                    if (data[0].length > 1) {
                                        const _message_ = await getNonce(
                                            data[0],
                                            'coinbase'
                                        )
                                        await new web3.eth.requestAccounts().then(
                                            async (accounts) => {
                                                await new web3.eth.personal.sign(
                                                    _message_,
                                                    data[0]
                                                )
                                                    .then(async (res) => {
                                                        const signature = res
                                                        setSignature(res)
                                                        setWalletAddress(
                                                            data[0]
                                                        )
                                                        setWalletStatus(
                                                            data.status
                                                        )
                                                        await createUser(
                                                            signature,
                                                            _message_,
                                                            data
                                                        )
                                                        setOpenConnectModal(
                                                            false
                                                        )
                                                    })
                                                    .catch((err) => {
                                                        console.log(err)
                                                        setConnectLoading(false)
                                                        setOpenConnectModal(
                                                            false
                                                        )
                                                    })
                                            }
                                        )
                                    } else {
                                        localStorage.removeItem('metamaskInfo')
                                        setConnectLoading(false)
                                    }
                                    setOpenModal({ open: false, type: 2 })
                                    // setConnectLoading(false)
                                }
                                // setConnectLoading(false)
                            })
                            .catch((err) => {
                                setConnectLoading(false)
                                setOpenConnectModal(false)
                                setOpenModal({ open: true, type: 2 })
                                console.log('Wallet Error:', err)
                            })
                    } else {
                        setConnectLoading(false)
                        setOpenConnectModal(false)
                        setOpenModal({ open: true, type: 2 })
                    }
                } else {
                    setConnectLoading(false)
                    setOpenConnectModal(false)
                    setOpenModal({ open: true, type: 2 })
                }
                // setConnectLoading(false)
            } catch (err) {
                console.log(err)
                setConnectLoading(false)
                setOpenConnectModal(false)
            }
        }
    }

    const setActivity = async (img, nftPrice, nftName, cnt) => {
        if (walletAddress && nftName && nftPrice && img && accessToken && cnt) {
            await axios
                .post(
                    `${BACKEND_URL}/auth/activity`,
                    {
                        address: walletAddress,
                        name: nftName.trim(),
                        price: nftPrice,
                        timestamp: new Date().getTime(),
                        img: img,
                        cnt,
                    },
                    config
                )
                .then((res) => {})
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const getActivity = async () => {
        if (walletAddress && accessToken) {
            setActivityLoading(true)
            await axios
                .post(
                    `${BACKEND_URL}/auth/getactivity`,
                    {
                        address: walletAddress,
                    },
                    config
                )
                .then((res) => {
                    setUserActivity(res.data.userActivity?.reverse())
                    setActivityLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                    setActivityLoading(false)
                })
        }
    }

    const parseTimeStamp = async (timestamp) => {
        const parsedDate = new Date(timestamp).toString().split(' ')
        return `${parsedDate[1]} ${parsedDate[2]}, ${parsedDate[3]}`
    }

    const createEvent = async (
        info,
        timer
    ) => {
        if (
            walletAddress &&
            isWalletLogin &&
            accessToken
        ) {
            setEventCreateLoading(true)
            const formData = new FormData()
            formData.append('file', info.image)
            formData.append('upload_preset', 'FoxLedgerStudio-BLVCK')

            await axios
                .post(
                    'https://api.cloudinary.com/v1_1/foxledgerstudio/image/upload/',
                    formData
                )
                .then(async (res) => {
                    await axios
                        .post(
                            `${BACKEND_URL}/nft/createEvent`,
                            {
                                name: info.name.trim(),
                                description: info.description,
                                image: res.data.url,
                                instagram: info.instagram,
                                websiteLink: info.websiteLink,
                                discord: info.discord,
                                opensea: info.opensea,
                                twitter: info.twitter,
                                comingSoon: info.comingSoon,
                                category: info.category,
                                country: info.country,
                                address: info.address,
                                walletAddress,
                                owner: walletAddress,
                                timer: timer
                            },
                            config
                        )
                        .then((res) => {
                            setEventCreateLoading(false)
                        })
                        .catch((err) => {
                            console.log(err)
                            setEventCreateLoading(false)
                        })
                })
                .catch((err) => {
                    console.log(err)
                    setEventCreateLoading(false)
                })
        }
    }

    const updateEvent = async (
        info,
        timer,
        id
    ) => {
        if (
            walletAddress &&
            isWalletLogin &&
            accessToken
        ) {
            setEventCreateLoading(true)
            const formData = new FormData()
            formData.append('file', info.image)
            formData.append('upload_preset', 'FoxLedgerStudio-BLVCK')

            if(typeof info.image === 'object'){
                await axios
                    .post(
                        'https://api.cloudinary.com/v1_1/foxledgerstudio/image/upload/',
                        formData
                    )
                    .then(async (res) => {
                        await axios
                            .post(
                                `${BACKEND_URL}/nft/updateEvent`,
                                {
                                    name: info.name.trim(),
                                    description: info.description,
                                    image: res.data.url,
                                    instagram: info.instagram,
                                    websiteLink: info.websiteLink,
                                    discord: info.discord,
                                    opensea: info.opensea,
                                    twitter: info.twitter,
                                    comingSoon: info.comingSoon,
                                    category: info.category,
                                    country: info.country,
                                    address: info.address,
                                    walletAddress,
                                    owner: walletAddress,
                                    timer: timer,
                                    eventId: id
                                },
                                config
                            )
                            .then((res) => {
                                setEventCreateLoading(false)
                            })
                            .catch((err) => {
                                console.log(err)
                                setEventCreateLoading(false)
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                        setEventCreateLoading(false)
                    })
            }else{
                await axios
                    .post(
                        `${BACKEND_URL}/nft/updateEvent`,
                        {
                            name: info.name.trim(),
                            description: info.description,
                            image: info.image,
                            instagram: info.instagram,
                            websiteLink: info.websiteLink,
                            discord: info.discord,
                            opensea: info.opensea,
                            twitter: info.twitter,
                            comingSoon: info.comingSoon,
                            category: info.category,
                            country: info.country,
                            address: info.address,
                            walletAddress,
                            owner: walletAddress,
                            timer: timer,
                            eventId: id
                        },
                        config
                    )
                    .then((res) => {
                        setEventCreateLoading(false)
                    })
                    .catch((err) => {
                        console.log(err)
                        setEventCreateLoading(false)
                    })
            }
        }
    }

    const deleteEvent = async (_id) => {
        if (
            walletAddress &&
            isWalletLogin &&
            accessToken &&
            userInfo?.isSuperAdmin
        ) {
            await axios
                .post(
                    `${BACKEND_URL}/nft/deleteEvent`,
                    {
                        _id,
                        owner: walletAddress
                    },
                    config
                )
                .then((res) => {
                    // setPartnerCreateLoading(false)
                    fetchEvents()
                })
                .catch((err) => {
                    console.log(err)
                    // setPartnerCreateLoading(false)
                })
        }
    }
    
    const createPredictionEvent = async (
        info,
        predictions,
        timer,
        setOpen
    ) => {
        if (
            walletAddress &&
            isWalletLogin &&
            accessToken
        ) {
            setPredicionEventCreateLoading(true)
            const formData = new FormData()
            formData.append('file', info.image)
            formData.append('upload_preset', 'FoxLedgerStudio-BLVCK')

            await axios
                .post(
                    'https://api.cloudinary.com/v1_1/foxledgerstudio/image/upload/',
                    formData
                )
                .then(async (res) => {
                    await axios
                        .post(
                            `${BACKEND_URL}/nft/createPredictionEvent`,
                            {
                                name: info.name.trim(),
                                description: info.description,
                                price: info.price,
                                image: res.data.url,
                                walletAddress,
                                owner: walletAddress,
                                timer,
                                predictions,
                                channelID: process.env.REACT_APP_CHANNEL_ID || '1006135086493745252',
                            },
                            config
                        )
                        .then((res) => {
                            setPredicionEventCreateLoading(false)
                            if(setOpen) setOpen(false)
                        })
                        .catch((err) => {
                            console.log(err)
                            setPredicionEventCreateLoading(false)
                            if(setOpen) setOpen(false)
                        })
                })
                .catch((err) => {
                    console.log(err)
                    setPredicionEventCreateLoading(false)
                    if(setOpen) setOpen(false)
                })
        }
    }

    const updatePredictionEvent = async (
        info,
        predictions,
        id,
        timer
    ) => {
        if (
            walletAddress &&
            isWalletLogin &&
            accessToken
        ) {
            setPredicionEventCreateLoading(true)
            const formData = new FormData()
            formData.append('file', info.image)
            formData.append('upload_preset', 'FoxLedgerStudio-BLVCK')

            if(typeof info.image === 'object'){
                await axios
                    .post(
                        'https://api.cloudinary.com/v1_1/foxledgerstudio/image/upload/',
                        formData
                    )
                    .then(async (res) => {
                        await axios
                            .post(
                                `${BACKEND_URL}/nft/updateEvent`,
                                {
                                    name: info.name.trim(),
                                    description: info.description,
                                    image: res.data.url,
                                    walletAddress,
                                    owner: walletAddress,
                                    predictions,
                                    timer,
                                    eventId: id
                                },
                                config
                            )
                            .then((res) => {
                                setPredicionEventCreateLoading(false)
                            })
                            .catch((err) => {
                                console.log(err)
                                setPredicionEventCreateLoading(false)
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                        setEventCreateLoading(false)
                    })
            }else{
                await axios
                    .post(
                        `${BACKEND_URL}/nft/updateEvent`,
                        {
                            name: info.name.trim(),
                            description: info.description,
                            image: info.image,
                            walletAddress,
                            owner: walletAddress,
                            predictions,
                            eventId: id
                        },
                        config
                    )
                    .then((res) => {
                        setPredicionEventCreateLoading(false)
                    })
                    .catch((err) => {
                        console.log(err)
                        setPredicionEventCreateLoading(false)
                    })
            }
        }
    }

    const deletePredictionEvent = async (_id) => {
        console.log("DELETE", _id)

        if (
            walletAddress &&
            isWalletLogin &&
            accessToken &&
            userInfo?.isAdmin
        ) {
            await axios
                .post(
                    `${BACKEND_URL}/nft/deletePreditionEvent`,
                    {
                        _id,
                        owner: walletAddress
                    },
                    config
                )
                .then((res) => {
                    fetchPredictionEvents()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const deletePartner = async (_id) => {
        if (
            walletAddress &&
            isWalletLogin &&
            accessToken &&
            userInfo?.isSuperAdmin
        ) {
            await axios
                .post(
                    `${BACKEND_URL}/nft/deletePartner`,
                    {
                        _id,
                        owner: walletAddress
                    },
                    config
                )
                .then((res) => {
                    // setPartnerCreateLoading(false)
                    fetchPartners()
                })
                .catch((err) => {
                    console.log(err)
                    // setPartnerCreateLoading(false)
                })
        }
    }

    const verifyPartner = async (_id) => {
        if (
            walletAddress &&
            isWalletLogin &&
            accessToken &&
            userInfo?.isSuperAdmin
        ) {
            await axios
                .post(
                    `${BACKEND_URL}/nft/verifyPartner`,
                    {
                        _id,
                        owner: walletAddress
                    },
                    config
                )
                .then((res) => {
                    // setPartnerCreateLoading(false)
                    fetchPartners()
                })
                .catch((err) => {
                    console.log(err)
                    // setPartnerCreateLoading(false)
                })
        }
    }

    const createPartner = async (
        info,
        tags
    ) => {
        if (
            walletAddress &&
            isWalletLogin &&
            accessToken
        ) {
            setPartnerCreateLoading(true)
            const formData = new FormData()
            formData.append('file', info.image)
            formData.append('upload_preset', 'FoxLedgerStudio-BLVCK')

            await axios
                .post(
                    'https://api.cloudinary.com/v1_1/foxledgerstudio/image/upload/',
                    formData
                )
                .then(async (res) => {
                    await axios
                        .post(
                            `${BACKEND_URL}/nft/createPartner`,
                            {
                                name: info.name.trim(),
                                description: info.description,
                                category: info.category,
                                image: res.data.url,
                                instagram: info.instagram,
                                websiteLink: info.websiteLink,
                                discord: info.discord,
                                opensea: info.opensea,
                                twitter: info.twitter,
                                walletAddress,
                                owner: walletAddress,
                                tags: tags
                            },
                            config
                        )
                        .then((res) => {
                            setPartnerCreateLoading(false)
                        })
                        .catch((err) => {
                            console.log(err)
                            setPartnerCreateLoading(false)
                        })
                })
                .catch((err) => {
                    console.log(err)
                    setPartnerCreateLoading(false)
                })
        }
    }

    const createNft = async (
        name,
        description,
        price,
        nftType,
        timer,
        img,
        defaultRoleLimit,
        specialRoleLimit,
        personName,
        winnersCount,
        totalSupply,
        allowAllToParticipate,
        questions,
        checkedStock,
        stakingDays,
        extraEnteries,
        sharkSupply,
        whalesSupply,
        humpBackSupply
    ) => {
        if (
            walletAddress &&
            isWalletLogin &&
            accessToken &&
            userInfo?.isAdmin
        ) {
            setMetadataLoading(true)
            const formData = new FormData()
            formData.append('file', img)
            formData.append('upload_preset', 'FoxLedgerStudio-BLVCK')

            await axios
                .post(
                    'https://api.cloudinary.com/v1_1/foxledgerstudio/image/upload/',
                    formData
                )
                .then(async (res) => {
                    await axios
                        .post(
                            `${BACKEND_URL}/nft/create`,
                            {
                                name: name.trim(),
                                description: description,
                                price: price,
                                nftType: nftType,
                                timer: timer,
                                nftImage: res.data.url,
                                defaultRoleLimit,
                                specialRoleLimit,
                                owner: walletAddress,
                                personName,
                                winnersCount,
                                totalSupply,
                                allowAllToParticipate,
                                questions,
                                checkStakeInStock: checkedStock,
                                stakingDays: stakingDays,
                                extraEnteries,
                                sharkSupply,
                                whalesSupply,
                                humpBackSupply,
                            },
                            config
                        )
                        .then((res) => {
                            setMetadataLoading(false)
                        })
                        .catch((err) => {
                            console.log(err)
                            setMetadataLoading(false)
                        })
                })
                .catch((err) => {
                    console.log(err)
                    setMetadataLoading(false)
                })
        }
    }

    const getNftParticipate = (arr, id) => {
        if (isWalletLogin && arr.length > 0) {
            let cnt = 0
            arr.forEach((p) => {
                if (p.nftId === id) {
                    if (p.cnt) cnt += p.cnt
                    else cnt++
                }
            })
            // console.log(cnt)
            return cnt
        } else {
            return 0
        }
    }

    const getUserParticipantLimit = (nft) => {
        // if (isWalletLogin) {
        const personName = nft.personName
        const roles = userInfo?.discordInfo?.roles
        // nft.extraEnteries
        let found = false
        let extra = 0
        roles?.forEach((role) => {
            personName.forEach((p) => {
                if (role.name === p) {
                    found = true
                }
            })

            if (role?.name === 'Blvck Shark' && nft.extraEnteries) {
                extra = extra > nft.sharkSupply ? extra : nft.sharkSupply
            }
            if (role?.name === 'Blvck Whale' && nft.extraEnteries) {
                extra = extra > nft.whalesSupply ? extra : nft.whalesSupply
            }
            if (role?.name === 'Blvck Humpback' && nft.extraEnteries) {
                extra = extra > nft.humpBackSupply ? extra : nft.humpBackSupply
            }
        })
        if (found) {
            return parseInt(nft.specialRoleLimit) + extra
        } else if (nft.allowAllToParticipate) {
            return parseInt(nft.defaultRoleLimit) + extra
        } else {
            return 0 + extra
        }
        // }
    }

    const checkUserSpecialDiscord = (nft) => {
        if (isWalletLogin && userInfo) {
            const personName = nft.personName
            const roles = userInfo?.discordInfo?.roles
            let found = false
            if (nft.personName.length === 0) {
                found = false
                return false
            }
            roles?.forEach((role) => {
                personName.forEach((p) => {
                    if (role.name === p) {
                        found = true
                        return true
                    }
                })
            })
            return found
        }
    }

    const deleteNft = async (id) => {
        if (
            walletAddress &&
            isWalletLogin &&
            accessToken &&
            userInfo?.isAdmin
        ) {
            setMetadataLoading(true)
            await axios
                .post(
                    `${BACKEND_URL}/nft/delete`,
                    {
                        _id: id,
                        owner: walletAddress,
                    },
                    config
                )
                .then((res) => {
                    setMetadataLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                    setMetadataLoading(false)
                })
        }
    }

    const updateNft = async (
        id,
        name,
        description,
        price,
        nftType,
        timer,
        img,
        defaultRoleLimit,
        specialRoleLimit,
        personName,
        winnersCount,
        totalSupply,
        allowAllToParticipate,
        questions,
        checkedStock,
        stakingDays,
        extraEnteries,
        sharkSupply,
        whalesSupply,
        humpBackSupply
    ) => {
        if (
            walletAddress &&
            isWalletLogin &&
            accessToken &&
            userInfo?.isAdmin
        ) {
            setMetadataLoading(true)

            if (typeof img === 'object') {
                const formData = new FormData()
                formData.append('file', img)
                formData.append('upload_preset', 'FoxLedgerStudio-BLVCK')

                await axios
                    .post(
                        'https://api.cloudinary.com/v1_1/foxledgerstudio/image/upload/',
                        formData
                    )
                    .then(async (res) => {
                        await axios
                            .post(
                                `${BACKEND_URL}/nft/update`,
                                {
                                    _id: id,
                                    name: name.trim(),
                                    description: description,
                                    price: price,
                                    nftType: nftType,
                                    timer: timer,
                                    nftImage: res.data.url,
                                    owner: walletAddress,
                                    defaultRoleLimit,
                                    specialRoleLimit,
                                    personName,
                                    winnersCount,
                                    totalSupply,
                                    allowAllToParticipate,
                                    questions,
                                    checkStakeInStock: checkedStock,
                                    stakingDays: stakingDays,
                                    extraEnteries,
                                    sharkSupply,
                                    whalesSupply,
                                    humpBackSupply,
                                },
                                config
                            )
                            .then((res) => {
                                setMetadataLoading(false)
                            })
                            .catch((err) => {
                                console.log(err)
                                setMetadataLoading(false)
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                        setMetadataLoading(false)
                    })
                return
            } else {
                await axios
                    .post(
                        `${BACKEND_URL}/nft/update`,
                        {
                            _id: id,
                            name: name.trim(),
                            description: description,
                            price: price,
                            nftType: nftType,
                            timer: timer,
                            nftImage: img,
                            owner: walletAddress,
                            defaultRoleLimit,
                            specialRoleLimit,
                            personName,
                            winnersCount,
                            totalSupply,
                            allowAllToParticipate,
                            questions,
                            checkStakeInStock: checkedStock,
                            stakingDays: stakingDays,
                            extraEnteries,
                            sharkSupply,
                            whalesSupply,
                            humpBackSupply,
                        },
                        config
                    )
                    .then((res) => {
                        setMetadataLoading(false)
                    })
                    .catch((err) => {
                        console.log(err)
                        setMetadataLoading(false)
                    })
            }
        }
    }

    const getRecentSales = async () => {
        setRecentSaleLoading(true)
        await axios
            .get(
                `https://api.rarible.org/v0.1/activities/byCollection?type=SELL&collection=ETHEREUM%3A0x83B070E842ADbA2397113C4bCa70c00D7df00729&size=500&sort=LATEST_FIRST`
            )
            .then((res) => {
                setRecentSale(res.data.activities)
                setRecentSaleLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setRecentSaleLoading(false)
            })
    }

    const updateLocalUserInfo = async () => {
        if (isWalletLogin && accessToken) {
            await axios
                .post(
                    `${BACKEND_URL}/users/info`,
                    {
                        address: walletAddress,
                    },
                    config
                )
                .then((res) => {
                    setUserInfo(res.data.userInfo)
                    // localStorage.removeItem('userInfo')
                    if (localStorage.getItem('userInfo'))
                        localStorage.setItem(
                            'userInfo',
                            JSON.stringify({ userInfo: res.data.userInfo })
                        )
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const connectToDiscord = async (code) => {
        if (isWalletLogin && accessToken) {
            try {
                await axios
                    .post(
                        `${BACKEND_URL}/auth/connectToDiscord`,
                        {
                            code,
                        },
                        config
                    )
                    .then(async (res) => {
                        const userData = res.data.userData
                        setDiscordData(res.data.userData)

                        await axios
                            .post(
                                `${BACKEND_URL}/auth/addToDiscord`,
                                {
                                    address: walletAddress,
                                    discordData: userData,
                                },
                                config
                            )
                            .then(async (res) => {
                                await updateLocalUserInfo()
                                window.location.assign('/')
                            })
                            .catch((err) => {
                                console.log(err)
                                return
                            })
                    })
                    .catch((error) => {
                        console.log(error)
                        window.location.assign('/')
                        return
                    })
            } catch (error) {
                console.log(error)
            }
        }
    }

    const disconnectTwitter = async () => {
        if (isWalletLogin && accessToken) {
            setMetadataLoading(true)
            await axios
                .post(
                    `${BACKEND_URL}/auth/deleteTwitter`,
                    {
                        address: walletAddress,
                    },
                    config
                )
                .then(async (res) => {
                    await updateLocalUserInfo()
                    // window.location.assign('/')
                    setMetadataLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                    setMetadataLoading(false)
                    return
                })
        }
    }

    const disconnectDiscord = async () => {
        if (isWalletLogin && accessToken) {
            setMetadataLoading(true)
            await axios
                .post(
                    `${BACKEND_URL}/auth/deleteDiscord`,
                    {
                        address: walletAddress,
                    },
                    config
                )
                .then(async (res) => {
                    await updateLocalUserInfo()
                    // window.location.assign('/')
                    setMetadataLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                    setMetadataLoading(false)
                    return
                })
        }
    }

    const getDashboardInfo = async () => {
        await axios
            .get(`https://api.opensea.io/api/v1/collection/blvckgenesis/stats`)
            .then((res) => {
                // console.log(res.data.stats)
                setDashInfo(res.data.stats)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getTokenAmount = async () => {
        if (isWalletLogin && accessToken) {
            try {
                const Web3 = require('web3')
                const rpcURL = 'https://polygon-rpc.com/'
                const web3 = new Web3(rpcURL)

                let tokenAddress = '0x9A4469E96b2C1e3A178e2aF346146e4ea5ec3CCc'
                // let walletAddress = '0x33618B6B64Ef35c9d1c76758a83F00Fb5cAD95D2'

                // The minimum ABI to get ERC20 Token balance
                let contract = new web3.eth.Contract(minABI, tokenAddress)
                async function getBalance() {
                    var balance = await contract.methods
                        .balanceOf(walletAddress)
                        .call()

                    return balance
                }

                getBalance().then(function (result) {
                    setTokenAmount(result / Math.pow(10, 18))
                })
            } catch (err) {
                console.log(err)
            }
        }
    }

    const getOpenseaItems = async () => {
        if (accessToken) {
            try {
                setLoading(true)
                
                await axios
                    .post(
                        `${BACKEND_URL}/staking/getStakingData`,
                        {
                            walletAddress
                        },
                        config
                    )
                    .then((res) => {
                        setTopStakingInfo(res.data.data)
                        setStakeCard(res.data.metadata)
                        setLoading(false)
                    })
                    .catch((err) => {
                        console.log(err)
                        setLoading(false)
                    })
            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        }
    }

    const collectCoins = async (setCollect, publishButtonClick) => {
        if (accessToken && stakeCard.length > 0) {
            try {
                setCollectedCoins(true)
                if (window.ethereum) {
                    const address = await window.ethereum.request({
                        method: 'eth_requestAccounts',
                    })
                    if (address.length > 0) {
                        await web3.eth
                            .getAccounts()
                            .then(async (data) => {
                                if (data.length > 0) {
                                    if (data[0].length > 1) {
                                        const _message_ = await getNonce(
                                            data[0]
                                        )
                                        web3.eth
                                            .requestAccounts()
                                            .then((accounts) => {
                                                web3.eth.personal
                                                    .sign(_message_, data[0])
                                                    .then(async (res) => {
                                                        publishButtonClick()
                                                        const SIGNATURE = res
                                                        setSignature(res)
                                                        await axios
                                                            .post(
                                                                `${BACKEND_URL}/staking/collectCoins`,
                                                                {
                                                                    stakingData:
                                                                        stakeCard,
                                                                    signature:
                                                                        SIGNATURE,
                                                                    nonce: _message_,
                                                                },
                                                                config
                                                            )
                                                            .then(
                                                                async (res) => {
                                                                    await updateLocalUserInfo()
                                                                    setCollectedCoins(
                                                                        false
                                                                    )

                                                                    setCollect(
                                                                        true
                                                                    )
                                                                }
                                                            )
                                                            .catch((err) => {
                                                                console.log(err)
                                                                setCollectedCoins(
                                                                    false
                                                                )
                                                                setCollect(true)
                                                            })
                                                    })
                                                    .catch((err) => {
                                                        console.log(err)
                                                        // setConnectLoading(false)
                                                        setCollectedCoins(false)
                                                        setCollect(true)
                                                    })
                                            })
                                    } else {
                                        // localStorage.removeItem('metamaskInfo')
                                        // setConnectLoading(false)
                                        setCollectedCoins(false)
                                        setCollect(true)
                                    }
                                    // setOpenModal(false)
                                    // setConnectLoading(false)
                                    setCollectedCoins(false)
                                }

                                setCollectedCoins(false)
                                // setConnectLoading(false)
                            })
                            .catch((err) => {
                                console.log(err)
                                // setOpenModal(true)
                                // setConnectLoading(false)
                                setCollectedCoins(false)
                                setCollect(true)
                            })
                    }
                }
            } catch (err) {
                console.log(err)
                if (err.code === 4902)
                    window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: '0x89',
                                chainName: 'Polygon Mainnet',
                                nativeCurrency: {
                                    name: 'MATIC',
                                    symbol: 'MATIC',
                                    decimals: 18,
                                },
                                rpcUrls: [
                                    'https://polygon-mainnet.infura.io/v3/7834b610dbc84b509297a8789ca345e0',
                                ],
                                blockExplorerUrls: ['https://polygonscan.com/'],
                            },
                        ],
                    })
                setCollectedCoins(false)
                // setConnectLoading(false)
            }
        }
    }

    const getDiscordRoles = async () => {
        if (isWalletLogin && accessToken && userInfo.isAdmin) {
            setMetadataLoading(true)
            try {
                await axios
                    .post(
                        `${BACKEND_URL}/users/discord/roles`,
                        { owner: walletAddress },
                        config
                    )
                    .then((res) => {
                        // console.log(res.data.roles)
                        setRoles(res.data.roles)
                        setMetadataLoading(false)
                    })
                    .catch((err) => {
                        console.log(err)
                        setMetadataLoading(false)
                    })
            } catch (err) {
                console.log(err)
                setMetadataLoading(false)
            }
        }
    }

    const getAllUsersAction = async () => {
        if (isWalletLogin && accessToken && userInfo.isAdmin) {
            setGetAllUsersLoading(true)
            try {
                await axios
                    .post(
                        `${BACKEND_URL}/auth/getAllUsers`,
                        { owner: walletAddress },
                        config
                    )
                    .then((res) => {
                        // console.log(res.data.roles)
                        setGetAllUsers(res.data.data)
                        setGetAllUsersLoading(false)
                    })
                    .catch((err) => {
                        console.log(err)
                        setGetAllUsersLoading(false)
                    })
            } catch (err) {
                console.log(err)
                setGetAllUsersLoading(false)
            }
        }
    }

    const setUsersWinningDetail = async (answers, nftId) => {
        if (isWalletLogin && accessToken) {
            setSubmitting(true)
            try {
                await axios
                    .post(
                        `${BACKEND_URL}/users/claimRaffleByUser`,
                        {
                            owner: walletAddress,
                            userWallet: walletAddress,
                            answers,
                            nftId,
                        },
                        config
                    )
                    .then(async (res) => {
                        await fetchNfts()
                        await fetchOngoing('ongoing')
                        setSubmitting(false)
                    })
                    .catch((err) => {
                        console.log(err)
                        setSubmitting(false)
                    })
            } catch (err) {
                console.log(err)
                setSubmitting(false)
            }
        }
    }

    const setReadStatus = async () => {
        if (isWalletLogin && accessToken) {
            await axios
                .post(
                    `${BACKEND_URL}/users/setReadStatus`,
                    {
                        address: walletAddress,
                    },
                    config
                )
                .then(async (res) => {
                    await updateLocalUserInfo()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const updateDefaultState = async () => {
        // await fetchNfts()
        await getRecentSales()
        await getActivity()
        await getTokenAmount()
        // getStakingData()
        await getDiscordRoles()
        await getDashboardInfo()
        // getTopStakingData()
        await getOpenseaItems()
    }

    const updateState = async () => {
        // await fetchNfts()
        // await getRecentSales()
        await getTokenAmount()
        await getNotifications()
        await getActivity()
        // getStakingData()
        await getDiscordRoles()
        // await getDashboardInfo()
        // getTopStakingData()
        await getOpenseaItems()
    }

    useEffect(() => {
        // fetchNfts()
        getRecentSales()
        // getActivity()
        // getTokenAmount()
        // getStakingData()
        // getDiscordRoles()
        getDashboardInfo()
        // getOpenseaItems()
        // getTopStakingData()
    }, [])

    // useEffect(() => {
    //     updateDefaultState()
    // }, [accessToken, isWalletLogin])

    useEffect(() => {
        const update = async () => {
            if (isWalletLogin && accessToken) {
                await updateLocalUserInfo()
            }
        }
        update()
    }, [isWalletLogin, accessToken])

    useEffect(() => {
        if (localStorage.getItem('accessToken') && !accessToken) {
            try {
                setAccessToken(
                    JSON.parse(localStorage.getItem('accessToken')).accessToken
                )
            } catch {
                localStorage.clear()
                window.location.reload()
            }
        }
        if (
            localStorage.getItem('userInfo') &&
            Object.keys(userInfo).length === 0
        ) {
            setUserInfo(JSON.parse(localStorage.getItem('userInfo')).userInfo)
        }
        if (localStorage.getItem('signature') && !signature) {
            setSignature(
                JSON.parse(localStorage.getItem('signature')).signature
            )
        }
        if (localStorage.getItem('walletAddress') && !walletAddress) {
            setWalletAddress(JSON.parse(localStorage.getItem('walletAddress')))
        }

        // console.log(accessToken && userInfo && walletAddress)
        // console.log(accessToken, userInfo, walletAddress)
        if (accessToken && userInfo && walletAddress) {
            setWalletLogin(true)
            updateState()
        } else {
            setWalletLogin(false)
        }
    }, [accessToken, userInfo, walletAddress])

    useEffect(() => {
        fetchNfts()
    }, [skip])

    useEffect(() => {
        fetchOngoing('ongoing')
    }, [])

    useEffect(() => {
        if (
            !localStorage.getItem('accessToken') &&
            !localStorage.getItem('userInfo') &&
            !localStorage.getItem('walletAddress')
        ) {
            setWalletLogin(false)
            setUserInfo({})
            setUserActivity([])
            setDiscordData({})
            setWalletAddress(null)
            setAccessToken(null)
            setSignature(null)
        }
    }, [isWalletLogin])

    useEffect(() => {
        try {
            document.addEventListener('wheel', function (event) {
                if (
                    document.activeElement.type === 'number' &&
                    document.activeElement.classList.contains('noscroll')
                ) {
                    document.activeElement.blur()
                }
            })
        } catch (err) {
            console.log(err)
        }
    })

    useEffect(() => {
        const checkMetaLogined = async () => {
            if (window.ethereum) {
                if (window.ethereum.providers) {
                    await window.ethereum.providers.find(async (provider) => {
                        if (provider.isMetaMask) {
                            if (!provider._metamask.isUnlocked()) {
                                await logout()
                            }
                        }
                    })

                    // window.ethereum.on('chainChanged', async (value) => {
                    //     await logout()
                    // })
                }
                window.ethereum.on('accountsChanged', async (value) => {
                    await logout()
                })
            }
        }

        // window.onunload = () => {
        //     // Clear the local storage
        //     window.Storage.clear()
        // }

        checkMetaLogined()
    }, [])

    return (
        <WalletConnectContext.Provider
            value={{
                createPartner,
                subscribeEvent,
                deletePartner,
                verifyPartner,
                bidError,
                subscribing,
                bids,
                eventData,
                eventLoading,
                predictionEventLoading,
                eventCreateLoading,
                fetchPredictionEvents,
                predictionEventData,
                predictionEventCreateLoading,
                createEvent,
                createPredictionEvent,
                createBid,
                fetchAllBids,
                biding,
                bidsLoading,
                fetchPartners,
                fetchEvents,
                partnerCreateLoading,
                partnerLoading,
                partnerData,
                accessToken,
                walletAddress,
                isWalletLogin,
                noWallet,
                walletStatus,
                connectWalletThroughMetamask,
                openModal,
                loading,
                setOpenModal,
                userInfo,
                allNfts,
                fetchNfts,
                getActivity,
                userActivity,
                participateEvent,
                parseTimeStamp,
                createNft,
                connectLoading,
                getRecentSales,
                recentSaleLoading,
                recentSale,
                updateNft,
                deleteNft,
                connectToDiscord,
                discordData,
                stakeCard,
                updateLocalUserInfo,
                disconnectDiscord,
                logout,
                getDiscordRoles,
                roles,
                getNftParticipate,
                getUserParticipantLimit,
                dashInfo,
                tokenAmount,
                updateDefaultState,
                stackInfo,
                setActiveNftType,
                handleClose_items,
                open_items,
                anchorEl_items,
                handleOpenMenu_items,
                activeNftType,
                checkUserSpecialDiscord,
                saveWinners,
                setReadStatus,
                metadataLoading,
                setMetadataLoading,
                activityLoading,
                setActivityLoading,
                graphLoading,
                setGraphLoading,
                topStakingInfo,
                setTopStakingInfo,
                collectCoins,
                setNotifications,
                notifications,
                notificationLoading,
                winnerSaveLoading,
                setWinnerSaveLoading,
                getAllUsersAction,
                getAllUsers,
                getOpenseaItems,
                setUsersWinningDetail,
                submiting,
                connectWalletThroughCoinbase,
                connectWalletThroughTrustWallet,
                connectWalletThrougConnectWallet,
                redeemWinningCard,
                disconnectTwitter,
                ongoingNft,
                fetchOngoing,
                ongoingLoading,
                deleteEvent,
                updateEvent,
                updatePredictionEvent,
                allSubscribersLoading: alSubscribersLoading,
                allSubscribers,
                getAllSubscriptions,
                participatePredictionEvent,
                predictionEventParticipation,
                participatedData,
                getParticipatedPredicitionEventData,
                announceLoading,
                announcePredictionEventWinners,
                leaderboardData,
                allLeaderboardData,
                getAdminLeaderboardData,
                deletePredictionEvent,
                getAdminResetLeaderboard,
                resetPointLoading,
                getLeaderboardData,
                saveLeaderboardDescription,
                leaderboardSaving,
                leaderboardInfo,
                leaderboardDataLoading
            }}
        >
            {children}
        </WalletConnectContext.Provider>
    )
}
