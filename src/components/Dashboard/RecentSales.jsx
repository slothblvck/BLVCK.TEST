import React, { useContext, useEffect, useState } from 'react'
import ArrowForward from '../../assets/svg/ArrowForward'
import { BACKEND_URL, WalletConnectContext } from '../../hooks/WalletLogin'
import DefaultLoader from '../shared/loaders/DefaultLoader'
import RecentListCard from './RecentListCard'
import axios from 'axios'

const RecentSales = () => {
    const { getRecentSales, recentSaleLoading, recentSale, walletAddress } =
        useContext(WalletConnectContext)
    const [recentSales, setrecentSales] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            // await getRecentSales()
        }
        fetchData()
    }, [])

    const config = {
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${
                JSON.parse(localStorage.getItem('accessToken')).accessToken
            }`,
        },
    }

    useEffect(async () => {
        try {
            var metadata = [],
                running = true,
                next = ''
            for (let i = 0; i < 60; i = i + 20) {
                if (next) {
                    await axios
                        .post(
                            `${BACKEND_URL}/staking/recentSales`,
                            {
                                walletAddress,
                                next,
                            },
                            config
                        )
                        .then(async (res) => {
                            metadata = metadata.concat(res.data.assets_events)
                            if (res.data.next || res.data.next == null) {
                                next = res.data.next
                            } else {
                                running = false
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                            running = false
                            console.log('Error: OPENSEA API NOT WORKING')
                        })
                } else {
                    await axios
                        .post(
                            `${BACKEND_URL}/staking/recentSales`,
                            {
                                walletAddress,
                                next,
                            },
                            config
                        )
                        .then(async (res) => {
                            metadata = metadata.concat(res.data.asset_events)
                            if (res.data.next || res.data.next !== null) {
                                next = res.data.next
                            } else {
                                running = false
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                            running = false
                            console.log('Error: OPENSEA API NOT WORKING')
                        })
                }
                if (!running) {
                    break
                }
            }
            setrecentSales(metadata)
        } catch (err) {
            console.log(err)
        }
    }, [])

    return (
        <div className='p-4 flex flex-col'>
            {/* TOP */}
            {/* <h1 className='text-xl font-[500]'>Recent Sales</h1> */}
            {/* LIST */}
            {recentSaleLoading ? (
                <div className='relative w-full h-recentBarHeight'>
                    <DefaultLoader />
                </div>
            ) : (
                <div className='rounded-lg bg-gradient-to-r from-[#292A30] to-[#25262A] p-[1px] relative'>
                    <div className='absolute -top-4 left-7 z-20'>
                        <h1 className='text-2xl font-[600] text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] to-[#FFFFFF00]'>
                            Recent Sales
                        </h1>
                    </div>
                    <div className='recent_saless_scroll bg-[#0D0E12] rounded-lg p-3 pt-8 py-4 pb-6 flex flex-col gap-y-5  h-recentBarHeight overflow-scroll overflow-x-hidden screen1:overflow-visible'>
                        {/* {recentSale.map((recent) => (
                            <RecentListCard key={recent.id} recent={recent} />
                        ))} */}
                        {recentSales.length > 0 &&
                            recentSales.map((sale) => {
                                return (
                                    <a
                                        href={`https://opensea.io/assets/ethereum/0x83b070e842adba2397113c4bca70c00d7df00729/${sale.asset.token_id}`}
                                        target='_blank'
                                        rel='noreferrer'
                                        data-hover='Go to Opensea'
                                        className='w-full h-12 rounded-lg recent-sales-click-btn recentsales-btn-style'
                                    >
                                        <div className='spann_recent_sale flex py-2 px-1 items-center w-full justify-between h-full'>
                                            {/* LEFT */}
                                            <div className='flex items-center gap-x-2'>
                                                {/* IMAGE */}
                                                <img
                                                    src={
                                                        sale.asset
                                                            .image_thumbnail_url
                                                    }
                                                    alt={''}
                                                    className='w-[36px] rounded-full object-cover'
                                                />
                                                {/* TEXT INFO */}
                                                <div className='flex flex-col h-full justify-start items-start'>
                                                    {/* TITLE */}
                                                    <h2 className='font-[400] text-lg'>
                                                        BLVCK GENESIS
                                                    </h2>
                                                    {/* USERNAME */}
                                                    <p className='font-[400] text-sm text-lightText'>
                                                        #{sale.asset.token_id}
                                                        {/* @{recent?.username}{' '} */}
                                                    </p>
                                                </div>
                                            </div>
                                            {/* RIGHT */}
                                            <div className='flex flex-col h-[36px] justify-between items-end'>
                                                {/* Icon */}
                                                <ArrowForward
                                                    style={{ fontSize: '12px' }}
                                                    // color='#747AA1'
                                                />
                                                {/* DATE */}
                                                <p className='font-[400] text-xs text-lightText'>
                                                    {
                                                        sale.event_timestamp && sale.event_timestamp.split(
                                                            'T'
                                                        )[0]
                                                    }{' '}
                                                    {
                                                        sale.event_timestamp && sale.event_timestamp.split(
                                                            'T'
                                                        )[1]
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                )
                            })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default RecentSales
