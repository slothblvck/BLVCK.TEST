import React from 'react'
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../../../hooks/WalletLogin'
import { useEffect } from 'react'

export default function UserDetailModal({
    openModal,
    closeModal,
    walletAddress,
}) {
    const cancelButtonRef = useRef(null)
    const [details, setDetails] = useState(false)
    const [downloadLoading, setDownloadLoading] = useState(false)

    useEffect(() => {
        const fetchData = async (e) => {
            setDownloadLoading(true)
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
                    `${BACKEND_URL}/users/getUserDetail`,
                    {
                        walletAddress: walletAddress,
                    },
                    config
                )
                .then(async (res) => {
                    const arr = res.data.data
                    setDetails(arr)
                    setDownloadLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                    setDownloadLoading(false)
                })
        }
        return fetchData()
    }, [walletAddress])

    return (
        <>
            <Transition.Root show={openModal} as={Fragment}>
                <Dialog
                    as='div'
                    className='fixed z-10 inset-0 overflow-y-auto'
                    initialFocus={cancelButtonRef}
                    onClose={() => {
                        closeModal()
                    }}
                >
                    <div className='h-screen px-4 text-center block p-0'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            enterTo='opacity-100 translate-y-0 sm:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        >
                            <Dialog.Overlay className='fixed inset-0 bg-[#14141657] bg-opacity-75 backdrop-blur-sm transition-opacity' />
                        </Transition.Child>
                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className='inline-block align-middle h-screen'
                            aria-hidden='true'
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            enterTo='opacity-100 translate-y-0 sm:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        >
                            <div className='inline-block bg-transparent rounded-lg text-left transform transition-all my-8 align-middle max-w-2xl w-full'>
                                <div className='flex w-full bg-cardModal rounded-xl text-white flex-col border border-[#3D3D3D] p-4 gap-x-4 gap-y-4 relative h-full '>
                                    {downloadLoading && <pre>Loading...</pre>}
                                    {Object.entries(details).map((data) => {
                                        if (
                                            data[0] !== 'deliveryInfo' &&
                                            data[0] !== 'discordInfo'
                                        ) {
                                            return (
                                                <div
                                                    className='row'
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'space-between',
                                                        borderBottom:
                                                            '2px solid #ffffff27',
                                                    }}
                                                >
                                                    {Array.isArray(data[1]) ? (
                                                        <p
                                                            style={{
                                                                flex: 1,
                                                                fontWeight:
                                                                    'bold',
                                                            }}
                                                        >
                                                            {data[0] ==
                                                            'burnerWalletSolana'
                                                                ? 'BURNER WALLET (SOLANA)'
                                                                : data[0] ==
                                                                  'burnerWalletEthereum'
                                                                ? 'BURNER WALLET (ETHEREUM)'
                                                                : data[0]?.toUpperCase()}{' '}
                                                            :-
                                                        </p>
                                                    ) : (
                                                        <p
                                                            style={{
                                                                flex: 1,
                                                                fontWeight:
                                                                    'bold',
                                                            }}
                                                        >
                                                            {data[0] ==
                                                            'burnerWalletSolana'
                                                                ? 'BURNER WALLET (SOLANA)'
                                                                : data[0] ==
                                                                  'burnerWalletEthereum'
                                                                ? 'BURNER WALLET (ETHEREUM)'
                                                                : data[0]?.toUpperCase()}
                                                        </p>
                                                    )}

                                                    {data[0] === 'wonItems'
                                                        ? ''
                                                        : data[0] ===
                                                          'deliveryInfo'
                                                        ? ''
                                                        : data[1] || '-'}
                                                </div>
                                            )
                                        } else if (data[0] === 'deliveryInfo') {
                                            return (
                                                <div className='flex flex-col w-full border-b-2 border-[#ffffff27]'>
                                                    <p
                                                        style={{
                                                            flex: 1,
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        DELIVERY INFO:-
                                                    </p>

                                                    <div className='flex w-full flex-col pl-4'>
                                                        <div className='flex w-full flex-col'>
                                                            <div className='flex items-center justify-between text-[#ccc]'>
                                                                <p>
                                                                    {/* Product */}
                                                                    GENDER:
                                                                </p>
                                                                <p>
                                                                    {data[1]?.sneakersSize?.gender?.toUpperCase() ||
                                                                        '-'}
                                                                </p>
                                                            </div>

                                                            <div className='flex items-center justify-between text-[#ccc]'>
                                                                <p>
                                                                    {/* Product */}
                                                                    SNEAKER
                                                                    SIZE:
                                                                </p>
                                                                <p>
                                                                    {data[1]
                                                                        ?.sneakersSize
                                                                        ? 'EU: ' +
                                                                          data[1]
                                                                              ?.sneakersSize
                                                                              ?.EU +
                                                                          ', UK: ' +
                                                                          data[1]
                                                                              ?.sneakersSize
                                                                              ?.UK +
                                                                          ', US: ' +
                                                                          data[1]
                                                                              ?.sneakersSize
                                                                              ?.US
                                                                        : '-'}
                                                                </p>
                                                            </div>

                                                            <br />

                                                            <div className='flex items-center justify-between text-[#ccc]'>
                                                                <p>
                                                                    {/* Product */}
                                                                    BOTTOM
                                                                    APPAREL
                                                                    SIZE:
                                                                </p>
                                                                <p>
                                                                    {data[1]
                                                                        ?.bottomApparelSize ||
                                                                        '-'}
                                                                </p>
                                                            </div>

                                                            <div className='flex items-center justify-between text-[#ccc]'>
                                                                <p>
                                                                    {/* Product */}
                                                                    TOP APPAREL
                                                                    SIZE:
                                                                </p>
                                                                <p>
                                                                    {data[1]
                                                                        ?.topApparelSize ||
                                                                        '-'}
                                                                </p>
                                                            </div>

                                                            <div className='flex items-center justify-between text-[#ccc]'>
                                                                <p>
                                                                    {/* Product */}
                                                                    SOCKS SIZE:
                                                                </p>
                                                                <p>
                                                                    {data[1]
                                                                        ?.socksSize ||
                                                                        '-'}
                                                                </p>
                                                            </div>

                                                            <br />

                                                            <div className='flex items-center justify-between text-[#ccc]'>
                                                                <p>
                                                                    {/* Product */}
                                                                    COUNTRY:
                                                                </p>
                                                                <p>
                                                                    {data[1]
                                                                        ?.shippingDetails
                                                                        ?.country ||
                                                                        '-'}
                                                                </p>
                                                            </div>

                                                            <div className='flex items-center justify-between text-[#ccc]'>
                                                                <p>
                                                                    {/* Product */}
                                                                    STATE:
                                                                </p>
                                                                <p>
                                                                    {data[1]
                                                                        ?.shippingDetails
                                                                        ?.state ||
                                                                        '-'}
                                                                </p>
                                                            </div>

                                                            <div className='flex items-center justify-between text-[#ccc]'>
                                                                <p>
                                                                    {/* Product */}
                                                                    CITY:
                                                                </p>
                                                                <p>
                                                                    {data[1]
                                                                        ?.shippingDetails
                                                                        ?.city ||
                                                                        '-'}
                                                                </p>
                                                            </div>

                                                            <div className='flex items-center justify-between text-[#ccc]'>
                                                                <p>
                                                                    {/* Product */}
                                                                    ZIP CODE:
                                                                </p>
                                                                <p>
                                                                    {data[1]
                                                                        ?.shippingDetails
                                                                        ?.zipCode ||
                                                                        '-'}
                                                                </p>
                                                            </div>

                                                            <div className='flex items-center justify-between text-[#ccc]'>
                                                                <p>
                                                                    {/* Product */}
                                                                    ADDRESS:
                                                                </p>
                                                                <p>
                                                                    {data[1]
                                                                        ?.shippingDetails
                                                                        ?.address ||
                                                                        '-'}
                                                                </p>
                                                            </div>

                                                            <div className='flex items-center justify-between text-[#ccc]'>
                                                                <p>
                                                                    {/* Product */}
                                                                    APPARTMENT:
                                                                </p>
                                                                <p>
                                                                    {data[1]
                                                                        ?.shippingDetails
                                                                        ?.appartment ||
                                                                        '-'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        } else return <></>
                                    })}
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
