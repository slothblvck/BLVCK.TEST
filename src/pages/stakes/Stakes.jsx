import React, { useContext, useEffect } from 'react'
import TopSideInfo from '../../components/Dashboard/TopSideInfo'
import ArrowForward from '../../assets/svg/ArrowForward'
import DefaultLoader from '../../components/shared/loaders/DefaultLoader'
import StakeCard from '../../components/Staking/StakeCard'
import TopStakeCard from '../../components/Staking/TopStakeCard'
import { gsap } from 'gsap'
import loader from '../../assets/no_item.png'
import { StakingData } from '../../data/Staking/StakeData'
import { TopStakeInfo } from '../../data/Staking/TopStakeInfo'
import { BACKEND_URL, WalletConnectContext } from '../../hooks/WalletLogin'
import TitlePage from './../../components/shared/TitlePage'
import coin from '../../assets/svg/BlvckCoin.svg'
import { useState } from 'react'
import axios from 'axios'
import StakeToGetGift from '../../components/Marketplace/StakeToGetGift'

const styles = {
    line: `line h-[60px] border-l mx-3 screen2:transform-[rotate(90deg)] screen2:h-0 screen2:border-t screen2:w-[80%]`,
}

const Stakes = () => {
    const {
        stakeCard,
        loading,
        stackInfo,
        topStakingInfo,
        collectCoins,
        getOpenseaItems,
        userInfo
    } = useContext(WalletConnectContext)

    const [collect, setCollect] = useState(true)
    const [minRank, setminRank] = useState(11000)
    const [maxStakedInd, setMaxStakedInd] = useState(-1)

    const loadingTime = 5000
    let publishButtonClick
    const resetTime = 3000

    const refreshNftMetadata = async (tokenId) => {
        await axios
            .get(`${BACKEND_URL}/staking/refreshNftMetadata/${tokenId}`)
            .then(() => {
                getOpenseaItems()
            })
    }

    useEffect(() => {
        var minRanker = 11000
        if (topStakingInfo && topStakingInfo?.stakingRank && (topStakingInfo?.stakingRank?.length > 0)) {
            console.log(topStakingInfo?.stakingRank)

            for (let i = 0; i < topStakingInfo?.stakingRank.length; i++) {
                if (topStakingInfo?.stakingRank[i]?.rank < minRanker) {
                    minRanker = topStakingInfo?.stakingRank[i]?.rank
                }
            }

            setminRank(minRanker)
        }
    }, [topStakingInfo])

    const GSAP_ANIMATION = () => {
        try {
            const { set, to, fromTo } = gsap

            document.querySelectorAll('.publish-button').forEach((button) => {
                let tweenHover = to(button, {
                        paused: true,
                        keyframes: [
                            {
                                '--icon-arrow-y': '-2px',
                                '--icon-line-offset': '23px',
                                duration: 0.15,
                            },
                            {
                                '--icon-arrow-y': '0px',
                                '--icon-line-offset': '21px',
                                duration: 0.3,
                            },
                        ],
                    }),
                    interval

                button.addEventListener('pointerenter', (e) => {
                    if (button.classList.contains('animated')) {
                        return
                    }
                    tweenHover.restart()
                    interval = setInterval(() => tweenHover.restart(), 1000)
                })

                button.addEventListener('pointerleave', (e) =>
                    clearInterval(interval)
                )

                publishButtonClick = () => {
                    // e.preventDefault()

                    if (button.classList.contains('animated')) {
                        return
                    }
                    button.classList.add('animated')

                    let text = button.querySelector('.text_collect'),
                        normal = text.querySelector('.normal_collect'),
                        progress = text.querySelector('.progress_collect'),
                        done = text.querySelector('.done_collect'),
                        normalWidth = normal.offsetWidth

                    clearInterval(interval)
                    tweenHover.pause()

                    let cloud = button.querySelector('.coin_collect'),
                        cloudInterval,
                        clone = cloud.cloneNode(true)

                    gsap.to(button, {
                        '--icon-cloud-y': '32px',
                        duration: 0.15,
                    })

                    cloudInterval = setInterval(() => {
                        createCloud(
                            clone,
                            button.querySelector('.icon_collect')
                        )
                    }, 400)

                    let tweenArrow = fromTo(
                        button,
                        {
                            '--icon-arrow-y': '0px',
                            '--icon-line-offset': '21px',
                            duration: 0.15,
                        },
                        {
                            repeat: -1,
                            keyframes: [
                                {
                                    '--icon-arrow-y': '-6px',
                                    '--icon-line-offset': '24px',
                                    duration: 0.6,
                                },
                                {
                                    '--icon-arrow-y': '0px',
                                    '--icon-line-offset': '21px',
                                    duration: 0.85,
                                    ease: 'power2.out',
                                },
                            ],
                        }
                    )

                    to(button, {
                        onStart() {
                            to(text, {
                                width: progress.offsetWidth,
                                duration: 0.15,
                            })
                        },
                        '--text-normal-o': 0,
                        '--text-normal-y': '8px',
                        duration: 0.25,
                    })

                    to(button, {
                        '--text-progress-o': 1,
                        '--text-progress-y': '0px',
                        duration: 0.3,
                        delay: 0.1,
                    })

                    // if (collect) {
                    setTimeout(() => {
                        tweenArrow.pause()
                        clearInterval(cloudInterval)
                        to(button, {
                            '--text-progress-o': 0,
                            '--text-progress-y': '80px',
                            duration: 0.3,
                            delay: 0.1,
                        })
                        to(button, {
                            duration: 0.25,
                            keyframes: [
                                {
                                    '--icon-line-offset': '13px',
                                },
                                {
                                    '--icon-arrow-offset': '4px',
                                },
                            ],
                        })
                        to(button, {
                            '--text-done-o': 1,
                            '--text-done-y': '0px',
                            duration: 0.3,
                            delay: 0.1,
                        })
                        to(button, {
                            '--icon-tick-offset': '0px',
                            duration: 0.25,
                            delay: 0.3,
                        })
                        to(button, {
                            '--icon-circle-scale': 1,
                            duration: 0.7,
                            delay: 0.2,
                            ease: 'elastic.out(1, .75)',
                        })

                        to(button, {
                            onStart() {
                                to(text, {
                                    width: done.offsetWidth,
                                    duration: 0.15,
                                    clearProps: true,
                                })
                            },
                            '--text-done-o': 1,
                            '--text-done-y': '8px',
                            duration: 0.25,
                        })

                        to(button, {
                            onStart() {
                                to(text, {
                                    width: done.offsetWidth,
                                    duration: 0.15,
                                    clearProps: true,
                                })
                            },
                            '--text-normal-o': 0,
                            '--text-normal-y': '58px',
                            duration: 0.25,
                        })

                        // fromTo(
                        //     button,
                        //     {
                        //         '--text-normal-y': '-8px',
                        //     },
                        //     {
                        //         '--text-normal-o': 2,
                        //         '--text-normal-y': '8px',
                        //         duration: 0.3,
                        //         delay: 0.1,
                        //     }
                        // )
                        setTimeout(() => {
                            reset(button, normalWidth, text)
                        }, resetTime)
                    }, loadingTime)
                }
            })

            function createCloud(node, parent) {
                let elem = node.cloneNode(true)
                parent.appendChild(elem)
                set(elem, {
                    x: gsap.utils.random(-8, 8),
                    y: -36,
                })
                to(elem, {
                    y: 36,
                    duration: gsap.utils.random(0.4, 1.5),
                    onComplete() {
                        elem.remove()
                    },
                })
            }

            function reset(button, normalWidth, text) {
                to(button, {
                    onStart() {
                        to(text, {
                            width: normalWidth,
                            duration: 0.15,
                            clearProps: true,
                        })
                    },
                    '--text-done-o': 0,
                    '--text-done-y': '8px',
                    duration: 0.25,
                })
                fromTo(
                    button,
                    {
                        '--text-normal-y': '-8px',
                    },
                    {
                        '--text-normal-o': 1,
                        '--text-normal-y': '0px',
                        duration: 0.3,
                        delay: 0.1,
                    }
                )
                to(button, {
                    keyframes: [
                        {
                            '--icon-tick-offset': '11px',
                            '--icon-circle-scale': 0,
                            '--icon-arrow-y': '0px',
                            duration: 0.2,
                        },
                        {
                            '--icon-cloud-y': '0px',
                            '--icon-line-offset': '21px',
                            duration: 0.2,
                        },
                        {
                            '--icon-arrow-offset': '0px',
                            duration: 0.15,
                        },
                    ],
                    clearProps: true,
                    onComplete() {
                        button.classList.remove('animated')
                    },
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

    const moveOut = () => {
        try {
            const ele = document.getElementById('stake__Card__to_gift')
            ele.style.transform = 'translateX(400px)'
        } catch (err) {
            console.log(err)
        }
    }

    const getMaxIndex = () => {
        let max = maxStakedInd
        let maxVal = 0
        for (let i = 0; i < topStakingInfo?.stakingRank.length; i++) {
            let curr = topStakingInfo?.stakingRank[i]
            if (parseFloat(curr.stakedTime) > maxVal) {
                maxVal = parseFloat(curr.stakedTime)
                max = i
            }
        }
        setMaxStakedInd(max)
    }

    useEffect(() => {
        GSAP_ANIMATION()
    })

    // useEffect(() => {
    //     getMaxIndex()
    // }, [topStakingInfo?.stakingRank])

    return (
        <div className='w-full h-full flex flex-col screen2:pb-16'>
            {/* Top */}
            <div className='flex items-center justify-between w-full screen2:hidden'>
                <div className='pl-12'>
                    <TitlePage heading={'Staking'} />
                </div>
                <div className='min-w-[330px] border-borderLine'>
                    <TopSideInfo />
                </div>
            </div>
            <div className='overflow-y-scroll h-full w-full'>
                <div className='flex items-center px-12 mt-8 mb-4 gap-x-8 screen3:px-4 screen1:flex-wrap h-max w-full gap-y-3 screen2:flex screen2:flex-col screen2:items-center'>
                    {/* Top Links */}
                    <div className='bg-secondaryColor border border-[#3A3B43] rounded-xl px-4 min-h-[100px] py-3 flex items-center justify-between screen1:flex-wrap screen2:flex-col gap-x-4 gap-y-4 w-full screen4:gap-x-2 screen4:justify-between'>
                        <TopStakeCard
                            amount={topStakingInfo?.totalRewards}
                            logo={coin}
                            title={'Rewards Earned'}
                        />
                        <div className={styles.line}></div>
                        <TopStakeCard
                            amount={(topStakingInfo?.staking || 0) + ((userInfo && userInfo?.psgNFT) ? 1 : 0)}
                            title={'NFTs on staking'}
                        />
                        <div className={styles.line}></div>
                        <TopStakeCard
                            amount={(topStakingInfo?.rewardsPerHour || 0) + ((userInfo && userInfo?.psgNFT) ? userInfo?.psgNFT : 0) + ((userInfo && userInfo?.psgNFT) ? (((minRank < 11000) ? (minRank > 1000 ? (minRank > 2000 ? 50 : 100) : 150) : 0)) : 0)}
                            title={'Rewards every 12 hours'}
                            logo={coin}
                            userInfo={userInfo}
                            warn
                        />
                    </div>
                    {topStakingInfo?.totalRewards > 0 && (
                        <div className='bg-secondaryColor border border-[#3A3B43] rounded-xl px-4 h-[100px] py-3 flex justify-between flex-col w-[280px] screen4:w-full'>
                            <p className='text-[#9CA0AC] font-[400] text-sm'>
                                Coins to collect
                            </p>
                            <button
                                className='publish-button rounded-xl'
                                onClick={() => {
                                    // setCollect(false)
                                    collectCoins(setCollect, publishButtonClick)
                                    // console.log('TEST')
                                }}
                            >
                                <div
                                    style={{ marginTop: '-6.8px' }}
                                    className='icon_collect'
                                >
                                    <svg
                                        className='coin_collect'
                                        width='30'
                                        height='30'
                                        viewBox='0 0 30 30'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            d='M12.7823 28.4629C19.5361 30.2406 26.4841 26.1262 28.3366 19.335C30.1891 12.5437 26.2663 5.56813 19.5124 3.79049C12.7586 2.01284 5.81063 6.12723 3.95813 12.9184C2.10563 19.7097 6.02843 26.6853 12.7823 28.4629Z'
                                            fill='#021024'
                                            fillOpacity='0.1'
                                        />
                                        <path
                                            d='M11.9523 27.9511C18.8251 29.7601 25.9097 25.5745 27.8001 18.6442C29.6905 11.7139 25.6856 4.60948 18.8128 2.80053C11.94 0.99158 4.85544 5.1772 2.965 12.1075C1.07456 19.0378 5.07946 26.1422 11.9523 27.9511Z'
                                            fill='black'
                                            stroke='black'
                                            strokeWidth='2'
                                        />
                                        <path
                                            d='M11.1874 27.1997C18.0602 29.0086 25.1448 24.823 27.0353 17.8927C28.9257 10.9624 24.9208 3.85802 18.048 2.04907C11.1752 0.240115 4.09061 4.42573 2.20017 11.356C0.309727 18.2863 4.31463 25.3907 11.1874 27.1997Z'
                                            fill='black'
                                            stroke='black'
                                            strokeWidth='2'
                                        />
                                        <path
                                            d='M11.7814 25.0226C17.4369 26.5112 23.2585 23.0305 24.8191 17.3094C26.3798 11.5882 23.1098 5.71457 17.4543 4.226C11.7987 2.73743 5.9771 6.21818 4.4165 11.9393C2.8559 17.6604 6.12582 23.5341 11.7814 25.0226Z'
                                            fill='#4C4E57'
                                            stroke='#1E1D1C'
                                            strokeWidth='2'
                                        />
                                        <path
                                            fillRule='evenodd'
                                            clipRule='evenodd'
                                            d='M21.7162 7.93553C20.6656 7.01589 19.395 6.32089 17.9557 5.94205C12.8557 4.59972 7.5693 7.7351 6.14811 12.9451C5.231 16.3072 6.1476 19.7117 8.28368 22.0645C5.61173 19.7255 4.36318 15.9335 5.38327 12.1939C6.80446 6.98385 12.0909 3.84847 17.1908 5.1908C18.9997 5.6669 20.5422 6.64237 21.7162 7.93553Z'
                                            fill='#4C4E57'
                                        />
                                        <path
                                            d='M13.5043 10.1421V19.1572H11.8544V10.1421H13.5043ZM15.5925 15.3218H13.0016V13.9898H15.5023C15.9577 13.9898 16.3057 13.883 16.5464 13.6692C16.787 13.4472 16.9073 13.1348 16.9073 12.7319C16.9073 12.3455 16.7827 12.0495 16.5335 11.844C16.2843 11.6384 15.9233 11.5357 15.4507 11.5357H12.9501V10.1421H15.5925C16.5292 10.1421 17.2639 10.36 17.7967 10.7957C18.3295 11.2315 18.5959 11.8275 18.5959 12.5839C18.5959 13.1266 18.4584 13.5829 18.1834 13.9528C17.9084 14.3146 17.5002 14.5777 16.9588 14.7421V14.5695C17.5432 14.701 17.9857 14.9477 18.2865 15.3094C18.5873 15.6712 18.7376 16.1398 18.7376 16.7153C18.7376 17.2251 18.6173 17.6649 18.3767 18.0349C18.1361 18.3967 17.7838 18.6762 17.3197 18.8735C16.8643 19.0626 16.3143 19.1572 15.6698 19.1572H12.9501V17.7636H15.5925C16.0651 17.7636 16.426 17.6567 16.6753 17.443C16.9245 17.2292 17.0491 16.9209 17.0491 16.518C17.0491 16.1398 16.9202 15.848 16.6624 15.6424C16.4132 15.4286 16.0565 15.3218 15.5925 15.3218Z'
                                            fill='black'
                                        />
                                    </svg>
                                    <svg viewBox='0 0 20 24'>
                                        {/* <path className='line' d='M10 23V10' /> */}

                                        {/* <path className='arrow' d='M10 10L7.5 12.5' />
                                <path className='arrow' d='M10 10L12.5 12.5' /> */}
                                        <path
                                            className='tick'
                                            d='M6.5 10.5L9 13L13.5 7.5'
                                        />
                                    </svg>
                                </div>
                                <div className='text_collect'>
                                    <span className='normal_collect'>
                                        Collect
                                    </span>
                                    <span className='progress_collect'>
                                        Collecting
                                    </span>
                                    <span className='done_collect w-full'>
                                        <div
                                            className='flex items-center gap-x-2 w-full'
                                            style={{ marginTop: '-9px' }}
                                        >
                                            <p>Collected</p>
                                            {/* 10 */}
                                            <img
                                                src={coin}
                                                alt=''
                                                className='w-5'
                                            />
                                        </div>
                                    </span>
                                </div>
                            </button>
                        </div>
                    )}
                </div>
                {/* Stake Cards */}
                <div
                    className={`px-12 ${
                        loading ? 'h-full' : 'h-max'
                    } flex flex-wrap gap-8 justify-left pb-10 pt-5 screen3:px-4 w-full screen2:pb-28 relative`}
                >
                    {loading ? (
                        <div className='flex w-full h-full items-center justify-center'>
                            <DefaultLoader />
                        </div>
                    ) : (
                        <>
                            {userInfo?.psgNFT > 0 && <StakeCard
                                minRank={minRank}
                                userInfo={userInfo}
                                coin={coin}
                            />}
                            {stakeCard?.length > 0 ? (
                                <>
                                    {topStakingInfo?.stakingRank.map(
                                        (stake, index) => {
                                            return (
                                                <StakeCard
                                                    key={index}
                                                    stake={stake}
                                                    coin={coin}
                                                    id={index}
                                                    getMaxIndex={getMaxIndex}
                                                    maxStakedInd={maxStakedInd}
                                                    stakingRank={
                                                        topStakingInfo?.stakingRank
                                                    }
                                                    refreshNftMetadata={
                                                        refreshNftMetadata
                                                    }
                                                />
                                            )
                                        }
                                    )}

                                    {/* Stake Card */}
                                    {/* {JSON.parse(
                                        localStorage.getItem(
                                            'bottom-swipe-banner'
                                        )
                                    ) && (
                                        <div
                                            className={`fixed bottom-20 right-10 translate-x-[400px]  transition ease-in-out duration-[700ms]`}
                                            id='stake__Card__to_gift'
                                        >
                                            <StakeToGetGift moveOut={moveOut} />
                                        </div>
                                    )} */}
                                </>
                            ) : (!userInfo || !userInfo?.psgNFT) && (
                                <span
                                    style={{ marginTop: '30px' }}
                                    className='text-center text-3xl h-full w-full flex flex-col items-center justify-center gap-y-4'
                                >
                                    <img src={loader} alt='' className='w-64' />
                                    <p className='text-lg font-[500]'>
                                        You don’t own any{' '}
                                        <span>BLVCK GENESIS</span> NFT from this{' '}
                                        <br /> wallet address
                                    </p>
                                    <a
                                        href='https://opensea.io/collection/blvckgenesis'
                                        target={'_blank'}
                                        rel='noreferrer'
                                        style={{ color: 'white' }}
                                        className='px-8 py-2 rounded-lg font-[500] text-sm flex gap-x-2 items-center bg-lightBlue'
                                    >
                                        <p>Go to Opensea</p>
                                        <ArrowForward />
                                    </a>
                                </span>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Stakes
