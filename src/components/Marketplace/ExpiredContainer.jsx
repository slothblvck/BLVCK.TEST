import React, { useEffect, useState } from 'react'
import DefaultCard from './DefaultCard'
import gift from '../../assets/svg/gift.svg'
import WinnerCard from './WinnerCard'
import { useContext } from 'react'
import { WalletConnectContext } from '../../hooks/WalletLogin'
import DownloadSvg from '../../assets/svg/DownloadSvg'
import axios from 'axios'
import { BACKEND_URL } from '../../hooks/WalletLogin'

const ExpiredContainer = ({
    nft,
    userInfo,
    submiting,
    downloadCSV,
    downloadWinnersCSV,
    downloadLoading,
}) => {
    const [winners, setWinners] = useState([])
    const [allParticipants, setallParticipants] = useState([])
    const [claimStart, setClaimStart] = useState(false)
    const [userWinnerData, setUserWinnerData] = useState({})
    const [initialize, setInitialize] = useState(false)
    const [length, setLength] = useState(nft.questions.length)
    const [winnersLoading, setWinnersLoading] = useState(false)
    const [winnerInfo, setWinnerInfo] = useState({
        walletAddress: '',
        deliveryAddress: '',
    })
    const [answers, setAnswers] = useState([])
    const [curr, setCurr] = useState(0)

    const {
        saveWinners,
        isWalletLogin,
        winnerSaveLoading,
        fetchNfts,
        walletAddress,
        setUsersWinningDetail,
    } = useContext(WalletConnectContext)
    const styles = {
        button: `rounded-lg text-lg bg-white text-black font-[500] w-full py-2 px-3`,
        buttonOutline: `rounded-lg text-lg border text-white font-[500] w-full py-2 px-3`,
        paddingModal: `px-12 screen4:px-6 screen5:px-3`,
        buttonDown: `w-full px-2 py-2 flex items-center justify-center rounded-lg font-[500] text-lg bg-white text-black ${
            new Date(nft.timer).getTime() < Date.now()
                ? 'cursor-not-allowed'
                : ''
        }flex items-center justify-center gap-x-2`,
    }

    const checkWhoWon = (walletAddress) => {
        for (let i = 0; i < nft?.winners?.length; i++) {
            if (nft?.winners[i]?.participant === walletAddress) {
                return true
            }
        }
        return false
    }

    const userWonData = (walletAddress) => {
        for (let i = 0; i < nft?.winners?.length; i++) {
            if (nft?.winners[i]?.participant === walletAddress) {
                setUserWinnerData(nft?.winners[i])
                return
            }
        }
        return
    }

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    const drawWinners = async () => {
        setWinnersLoading(true)

        if (nft && (allParticipants.length == 0)) {
            const config = {
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${
                        JSON.parse(localStorage.getItem('accessToken'))
                            .accessToken
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
                    if (arr.length >= nft.winnersCount) {
                        // const shuffled =
                        //     arr[
                        //         Math.floor(Math.random() * arr.length)
                        //     ]
                        // // const shuffled = arr.sort(() => 0.5 - Math.random())

                        // // Get sub-array of first n elements after shuffled
                        // // let selected = shuffled.slice(0, nft.winnersCount)
                        // console.log(shuffled)

                        const shuffled = shuffle(arr)

                        const selected = shuffled.slice(0, nft.winnersCount)

                        shuffled.splice(0, nft.winnersCount);
                        setallParticipants(shuffled)
                        setWinners(selected)
                        // console.log(selected)
                    }
                    setWinnersLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                    setWinnersLoading(false)
                })
        } else if (allParticipants.length > 0) {
            const shuffled = shuffle(allParticipants)

            var newWinners = [ ...winners ]
            newWinners[curr] = shuffled.slice(0, 1)[0]

            setWinners(newWinners)
            setWinnersLoading(false)
        }
    }

    const drawWinnersUser = async () => {
        setWinnersLoading(true)

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
                `${BACKEND_URL}/auth/saveWinnersUsers`,
                {
                    _id: nft._id,
                    channelID:
                        process.env.REACT_APP_CHANNEL_ID ||
                        '1006135086493745252',
                },
                config
            )
            .then(async (res) => {
                await fetchNfts()
                await fetchOngoing('ongoing')
                setWinnersLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setWinnersLoading(false)
            })
    }

    const assignValue = (index, value) => {
        let newArr = [...answers]
        newArr[index] = value
        setAnswers(newArr)
    }

    useEffect(() => {
        if (!initialize) {
            let arr = []
            for (let i = 0; i < nft.questions.length; i++) {
                arr.push('')
            }
            setAnswers(arr)
            setInitialize(true)
        }
    }, [initialize])

    useEffect(() => {
        userWonData(walletAddress)
    }, [])

    return (
        <div className='flex flex-col w-full gap-y-6 z-[1]'>
            {/* TOP */}
            <div className={`${styles.paddingModal} flex flex-col gap-y-2`}>
                <div className='flex items-center justify-between'>
                    <span className='font-[400] text-base leading-6'>
                        Winners count
                    </span>
                    <span className='font-[700] text-lg leading-6'>
                        {nft.winnersCount}
                    </span>
                </div>
                <div className='flex items-center justify-between w-full'>
                    <span className='font-[400] text-base leading-6'>
                        Total Entries
                    </span>
                    <span className='font-[700] text-lg leading-6'>
                        {nft.totalSold}
                    </span>
                </div>
                <div className='flex items-center justify-between'>
                    <span className='font-[400] text-base leading-6'>
                        PRICE
                    </span>
                    <span className='font-[700] text-lg leading-6'>
                        {nft.price} BLVCK
                    </span>
                </div>
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

            {isWalletLogin && userInfo?.isAdmin && (
                <div className={`w-full ${styles.paddingModal}`}>
                    <button
                        className={`${styles.buttonDown}`}
                        onClick={(e) => {
                            downloadWinnersCSV(e)
                        }}
                    >
                        <DownloadSvg
                            style={{ fontSize: '0.875rem' }}
                            className='text-sm'
                        />
                        <span className='text-sm'>Download Winners CSV</span>
                    </button>
                </div>
            )}

            {/* WINNERS */}
            <div className='w-full gap-x-4 flex items-center justify-between'>
                <div className='w-full border-b'></div>
                <div className='flex flex-col items-center'>
                    <img src={gift} alt='' className='w-[24px]' />
                    <span className='font-[400] text-[10px]'>Winners</span>
                </div>
                <div className='w-full border-b'></div>
            </div>

            {/* CARD/ILLU */}
            <div className={`w-full ${styles.paddingModal}`}>
                {nft.isAnounced || winners.length > 0 ? (
                    <WinnerCard
                        winner={winners.length <= 0 ? nft.winners : winners}
                        userInfo={userInfo}
                        setCurr={setCurr}
                        curr={curr}
                    />
                ) : (
                    <DefaultCard />
                )}
            </div>

            {/* Questions */}
            {(claimStart || userWinnerData.isClaimed) &&
                nft.isAnounced &&
                checkWhoWon(walletAddress) && (
                    <div
                        className={`flex flex-col ${styles.paddingModal} gap-y-8 py-2`}
                    >
                        {nft.questions.length > 0 &&
                            nft.questions.map((value, key) => (
                                <div className='flex flex-col gap-1' key={key}>
                                    <label
                                        className={`text-white font-[400] text-xs`}
                                    >
                                        {value}
                                    </label>
                                    <input
                                        value={
                                            userWinnerData.isClaimed
                                                ? userWinnerData.answers[key]
                                                : answers[key]
                                        }
                                        disabled={userWinnerData.isClaimed}
                                        onChange={(e) => {
                                            assignValue(key, e.target.value)
                                        }}
                                        type='text'
                                        placeholder={value}
                                        className='bg-transparent outline-none border-b font-[400] text-base p-1'
                                    />
                                </div>
                            ))}
                    </div>
                )}

            {/* BUTTONS */}
            {userInfo.isAdmin ? (
                <div
                    className={`${styles.paddingModal} flex items-center gap-x-3 w-full`}
                >
                    {winners.length > 0 ? (
                        <>
                            <button
                                className={styles.buttonOutline}
                                onClick={() => drawWinners()}
                                disabled={winnersLoading}
                            >
                                {winnersLoading ? 'Redrawing...' : 'Redraw'}
                            </button>
                            <button
                                className={styles.button}
                                disabled={winnerSaveLoading}
                                onClick={() => saveWinners(winners, nft._id)}
                            >
                                {winnerSaveLoading ? 'Saving...' : 'Save'}
                            </button>
                        </>
                    ) : nft.isAnounced ? (
                        ''
                    ) : (
                        <button
                            className={styles.button}
                            disabled={winnersLoading}
                            onClick={() => drawWinners()}
                        >
                            {winnersLoading ? 'Drawing...' : 'Draw Winners'}
                        </button>
                    )}
                </div>
            ) : (
                nft.isAnounced &&
                nft.questions &&
                nft.questions.length !== 0 &&
                nft.questions[0] &&
                checkWhoWon(walletAddress) &&
                !userWinnerData.isClaimed && (
                    <div
                        className={`${styles.paddingModal} flex items-center gap-x-3 w-full`}
                    >
                        <button
                            className={`${styles.button} disabled:opacity-60 disabled:cursor-not-allowed`}
                            onClick={() => {
                                if (!claimStart) {
                                    setClaimStart(true)
                                } else if (claimStart) {
                                    setUsersWinningDetail(answers, nft._id)
                                }
                            }}
                            // disabled={
                            //     claimStart
                            //         ? !winnerInfo.deliveryAddress ||
                            //           !winnerInfo.walletAddress
                            //         : false
                            // }
                            disabled={submiting}
                        >
                            {claimStart
                                ? !submiting
                                    ? 'Submit'
                                    : submiting && 'Submiting..'
                                : 'Claim'}
                        </button>
                    </div>
                )
            )}

            {/* BUTTONS */}
            {(!userInfo.isAdmin && !nft.name.toLowerCase().includes("monthly giveaway")) && (
                <div
                    className={`${styles.paddingModal} flex items-center gap-x-3 w-full`}
                >
                    {nft.isAnounced ? (
                        ''
                    ) : (
                        <button
                            className={styles.button}
                            disabled={winnersLoading}
                            onClick={() => drawWinnersUser()}
                        >
                            {winnersLoading ? 'Loading...' : 'Request Winners'}
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default ExpiredContainer
