import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import no_item from '../../assets/no_item.png'
import TopSideInfo from '../../components/Dashboard/TopSideInfo'
import NftCard from '../../components/Marketplace/NftCard'
import TitlePage from '../../components/shared/TitlePage'
import TopSelect from '../../components/Marketplace/TopSelect'
import { BACKEND_URL, WalletConnectContext } from '../../hooks/WalletLogin'
import CreateNft from '../../components/shared/modals/CreateNft'
import DefaultLoader from '../../components/shared/loaders/DefaultLoader'
import { TopSelection } from './../../data/Marketplace/TopSelecOptions'
import SearchSvg from '../../assets/svg/SearchSvg'
import CartSvg from '../../assets/svg/CartSvg'
import ArrowDownSvg from '../../assets/svg/ArrowDownSvg'
import NftTypeSelect from '../../components/Marketplace/NftTypeSelect'
import { SwipeableDrawer } from '@mui/material'
import axios from 'axios'
import { SliderSvg } from '../../assets/svg/SliderSvg'
import CloseSvg from '../../assets/svg/CloseSvg'
import { winnerCardData } from '../../data/WinnerCardData'
import GiftNftCard from '../../components/Marketplace/GiftNFTCard'
import StakeToGetGift from '../../components/Marketplace/StakeToGetGift'
import AuctionCard from '../../components/Marketplace/AuctionCard'

const styles = {
    defaultText: `text-[#55575E] font-[400] text-base cursor-pointer bg-primaryBg px-3 py-1 rounded-3xl`,
    activeText: `text-[#FFF] font-[700] text-base cursor-pointer bg-primaryBg px-3 py-1 rounded-3xl`,
}

const Marketplace = () => {
    const [active, setActive] = useState(1)
    const [search, setSearch] = useState(false)
    const [metadata, setMetadata] = useState([])
    const [metaLoading, setMetaLoading] = useState(false)
    const [activeType, setActiveType] = useState(-1)
    const [openModal, setOpenModal] = useState(false)
    const [coinRunning, setcoinRunning] = useState(false)
    const [eventRunning, seteventRunning] = useState(false)
    const [resetCoins, setresetCoins] = useState(false)
    const [filterDrop, setFilterDrop] = useState('Ongoing')
    const [drawer, setDrawer] = useState({
        right: false,
    })
    const {
        fetchNfts,
        metadataLoading,
        allNfts,
        userInfo,
        isWalletLogin,
        walletAddress,
        getDiscordRoles,
        setActiveNftType,
        handleClose_items,
        open_items,
        anchorEl_items,
        handleOpenMenu_items,
        activeNftType,
        fetchOngoing,
        ongoingNft,
        ongoingLoading,
    } = useContext(WalletConnectContext)

    const [defaultNfts, setDefaultNfts] = useState(
        active === 1 ? ongoingNft : allNfts
    )

    const toggleDrawer = (event, anchor, open) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return
        }

        setDrawer({ right: open })
    }

    const updateItems = async () => {
        if (active === 1) {
            setMetaLoading(true)
            let arr = []
            defaultNfts.forEach((e) => {
                if (activeType === -1) {
                    if (
                        new Date(e.timer).getTime() > Date.now() ||
                        e.nftType === 3 ||
                        e.nftType === 10
                    ) {
                        if (e.totalSupply > 0) {
                            if (e.totalSold < e.totalSupply) {
                                arr.push(e)
                            }
                        } else {
                            arr.push(e)
                        }
                    }
                } else if (activeType === 4) {
                    if (
                        (new Date(e.timer).getTime() > Date.now() ||
                            e.nftType === 3) &&
                        e.isAnounced &&
                        e?.winners[0]?.participant === walletAddress
                    ) {
                        arr.push(e)
                    }
                } else {
                    if (activeType == 3 && e.nftType == 10) {
                        if (e.totalSupply > 0) {
                            if (e.totalSold < e.totalSupply) {
                                arr.push(e)
                            }
                        } else {
                            arr.push(e)
                        }
                    }

                    if (
                        (new Date(e.timer).getTime() > Date.now() ||
                            e.nftType === 3) &&
                        e.nftType === activeType
                    ) {
                        if (e.totalSupply > 0) {
                            if (e.totalSold < e.totalSupply) {
                                arr.push(e)
                            }
                        } else {
                            arr.push(e)
                        }
                    }
                }
            })
            await setMetadata(arr)
            setMetaLoading(false)
        } else if (active === 2) {
            let arr = []
            if (userInfo?.participatedBy.length > 0) {
                setMetaLoading(true)
                defaultNfts.forEach((e) => {
                    if (activeType === -1) {
                        if (e.isParticipated) {
                            userInfo?.participatedBy.forEach((p) => {
                                if (p.nftId === e._id) {
                                    let found = false
                                    arr.forEach((ele) => {
                                        if (ele === e) {
                                            found = true
                                        }
                                    })
                                    if (!found) {
                                        arr.push(e)
                                    }
                                }
                            })
                        }
                    } else if (activeType === 4) {
                        if (
                            e.isParticipated &&
                            e.isAnounced &&
                            e?.winners[0]?.participant === walletAddress
                        ) {
                            arr.push(e)
                        }
                    } else {
                        if (
                            e.isParticipated &&
                            e.nftType === 10 &&
                            activeType === 3
                        ) {
                            userInfo?.participatedBy.forEach((p) => {
                                if (p.nftId === e._id) {
                                    let found = false
                                    arr.forEach((ele) => {
                                        if (ele === e) {
                                            found = true
                                        }
                                    })
                                    if (!found) {
                                        arr.push(e)
                                    }
                                }
                            })
                        }

                        if (e.isParticipated && e.nftType === activeType) {
                            userInfo?.participatedBy.forEach((p) => {
                                if (p.nftId === e._id) {
                                    let found = false
                                    arr.forEach((ele) => {
                                        if (ele === e) {
                                            found = true
                                        }
                                    })
                                    if (!found) {
                                        arr.push(e)
                                    }
                                }
                            })
                        }
                    }
                })
            }
            await setMetadata(arr)
            setMetaLoading(false)
        } else if (active === 3) {
            let arr = []
            setMetaLoading(true)
            defaultNfts.forEach((e) => {
                if (activeType === -1) {
                    if (
                        new Date(e.timer).getTime() < Date.now() ||
                        (e.totalSold >= e.totalSupply && e.totalSupply > 0)
                    ) {
                        arr.push(e)
                    }
                } else if (activeType === 4) {
                    if (
                        (new Date(e.timer).getTime() < Date.now() ||
                            (e.totalSold >= e.totalSupply &&
                                e.totalSupply > 0)) &&
                        e.isAnounced &&
                        e?.winners[0]?.participant === walletAddress
                    ) {
                        arr.push(e)
                    }
                } else {
                    if (activeType == 3 && e.nftType == 10) {
                        if (e.totalSupply > 0) {
                            if (e.totalSold >= e.totalSupply) {
                                arr.push(e)
                            }
                        } else {
                            arr.push(e)
                        }
                    }

                    if (
                        (new Date(e.timer).getTime() < Date.now() ||
                            (e.totalSold >= e.totalSupply &&
                                e.totalSupply > 0)) &&
                        e.nftType === activeType
                    ) {
                        arr.push(e)
                    }
                }
            })
            await setMetadata(arr)
            setMetaLoading(false)
        } else if (active === 4) {
            setMetaLoading(true)
            let arr = []
            // console.log(defaultNfts)
            defaultNfts.forEach((e) => {
                if (activeType === -1) {
                    if (
                        new Date(e.timer).getTime() < Date.now() &&
                        e.isAnounced
                    ) {
                        arr.push(e)
                    } else if (
                        e.totalSold >= e.totalSupply &&
                        e.totalSupply > 0
                    ) {
                        arr.push(e)
                    }else{
                        // console.log(e.nftType, e.timer, e.isAnounced)
                    }
                } else {
                    if (activeType == 3 && e.nftType == 10) {
                        if (e.totalSupply > 0) {
                            if (e.totalSold >= e.totalSupply) {
                                arr.push(e)
                            }
                        } else {
                            arr.push(e)
                        }
                    }

                    if (
                        new Date(e.timer).getTime() < Date.now() &&
                        e.isAnounced &&
                        e.nftType === activeType
                    ) {
                        arr.push(e)
                    } else if (
                        e.totalSold >= e.totalSupply &&
                        e.totalSupply > 0 &&
                        e.nftType === activeType
                    ) {
                        arr.push(e)
                    }
                }
            })
            await setMetadata(arr)
            setMetaLoading(false)
        } else if (active === 5) {
            setMetaLoading(true)
            let arr = []
            defaultNfts.forEach((e) => {
                if (activeType === -1) {
                    if (
                        new Date(e.timer).getTime() < Date.now() &&
                        !e.isAnounced
                    ) {
                        arr.push(e)
                    }
                } else {
                    if (
                        new Date(e.timer).getTime() < Date.now() &&
                        !e.isAnounced &&
                        e.nftType === activeType
                    ) {
                        arr.push(e)
                    }
                }
            })
            await setMetadata(arr)
            setMetaLoading(false)
        }
    }

    useEffect(() => {
        const fetchItem = async () => {
            if (userInfo?.isAdmin) await getDiscordRoles()
            updateItems()

            if (active === 1) {
                setMetaLoading(true)
                let arr = []
                defaultNfts.forEach((e) => {
                    if (activeType === -1) {
                        if (
                            new Date(e.timer).getTime() > Date.now() ||
                            e.nftType === 3 ||
                            e.nftType === 10
                        ) {
                            if (e.totalSupply > 0) {
                                if (e.totalSold < e.totalSupply) {
                                    arr.push(e)
                                }
                            } else {
                                arr.push(e)
                            }
                        }
                    } else {
                        if (
                            (new Date(e.timer).getTime() > Date.now() ||
                                e.nftType === 3) &&
                            e.nftType === activeType
                        ) {
                            if (e.totalSupply > 0) {
                                if (e.totalSold < e.totalSupply) {
                                    arr.push(e)
                                }
                            } else {
                                arr.push(e)
                            }
                        }
                    }
                })
                await setMetadata(arr)
                setMetaLoading(false)
            }
        }
        fetchItem()
    }, [userInfo])

    useEffect(() => {
        if (active === 1) {
            setDefaultNfts(ongoingNft)
        } else {
            setDefaultNfts(allNfts)
        }
    }, [active, allNfts.length])

    useEffect(() => {
        setDefaultNfts(ongoingNft)
    }, [ongoingNft])

    useEffect(() => {
        updateItems()
    }, [active, filterDrop, defaultNfts, activeType, allNfts.length])

    useEffect(() => {
        setActive(1)
        setFilterDrop('Ongoing')
        setActive(1)
        setActiveNftType('All Items')
        setActiveType(-1)
    }, [isWalletLogin])

    const searchME = () => {
        let userData = document
            .getElementById('search__NFT')
            .value.toUpperCase()
        let nftCardWrapper = document.getElementById('nft__Card_BoDY')
        let nftCard = nftCardWrapper.getElementsByClassName('nft__Card')

        // console.log(nftCard.length)
        for (let i = 0; i < nftCard.length; i++) {
            let ele = nftCard[i]
            let text = ele.getElementsByTagName('h1')
            let tdText = ''
            // console.log(text[0])
            for (let j = 0; j < text.length; j++) {
                tdText += text[j].innerText
            }
            let textValue = tdText
            if (textValue.toUpperCase().indexOf(userData) > -1) {
                ele.style.display = ''
            } else {
                ele.style.display = 'none'
            }
        }
    }

    const closeSearch = () => {
        let nftCardWrapper = document.getElementById('nft__Card_BoDY')
        let nftCard = nftCardWrapper.getElementsByClassName('nft__Card')

        // console.log(nftCard.length)
        for (let i = 0; i < nftCard.length; i++) {
            let ele = nftCard[i]
            ele.style.display = ''
        }
    }

    return (
        <div className='w-full h-full flex flex-col screen2:pb-28 screen2:pt-[120px]'>
            {/* Top */}
            <div className='flex items-center justify-between w-full screen2:hidden'>
                <div className='pl-12'>
                    <TitlePage
                        heading={'Marketplace'}
                        subHeading={'Get chance to win amazing rewards'}
                    />
                </div>
                <div className='min-w-[330px] border-borderLine'>
                    <TopSideInfo />
                </div>
            </div>

            {(active === 1 && ongoingLoading) ||
            (active === 2 && metadataLoading) ||
            (active === 3 && metadataLoading) ||
            (active === 4 && metadataLoading) ||
            metaLoading ? (
                <div className='relative w-full h-full'>
                    <DefaultLoader />
                </div>
            ) : (
                <div className='overflow-scroll h-full flex flex-col'>
                    {/*  */}
                    <div className='flex flex-col items-start px-12 mt-3 mb-4 screen2:fixed screen2:w-full gap-y-2 py-5 screen2:bg-primaryBg screen2:z-[11] screen2:whitespace-nowrap screen2:overflow-x-scroll screen2:m-0 screen2:border-[#25262A] screen2:border-[0.5px] screen2:top-[58px] screen2:px-4'>
                        {/* Top Links */}
                        <div className='flex items-center justify-between w-full'>
                            <div className='flex gap-x-4'>
                                {TopSelection.map((data) => {
                                    if (
                                        !isWalletLogin &&
                                        (data.id === 2 ||
                                            data.id === 4 ||
                                            data.id === 5)
                                    )
                                        return null
                                    if (
                                        userInfo?.isAdmin &&
                                        (data.id === 2 || data.id === 3)
                                    )
                                        return null
                                    if (
                                        !userInfo?.isAdmin &&
                                        (data.id === 4 || data.id === 5)
                                    )
                                        return null

                                    return (
                                        <div
                                            className={
                                                data.id === active
                                                    ? 'bg-activeButtonBg backdrop-blur-[72px] rounded-3xl p-[1px]'
                                                    : 'rounded-3xl p-[1px] backdrop-blur-[72px]'
                                            }
                                            key={data.id}
                                        >
                                            <p
                                                className={
                                                    active === data.id
                                                        ? styles.activeText
                                                        : styles.defaultText
                                                }
                                                onClick={() =>
                                                    setActive(data.id)
                                                }
                                            >
                                                {data.name}
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className='flex items-center gap-x-2'>
                                {/* Filter */}
                                <button
                                    className='text-white font-[400] text-sm bg-lightBlue border border-secondaryColor h-full rounded-lg p-3 px-5 flex items-center gap-x-1 screen2:hidden'
                                    style={{ gap: '8px' }}
                                    onClick={handleOpenMenu_items}
                                >
                                    <span>{activeNftType}</span>
                                    <ArrowDownSvg />
                                </button>

                                {/* Create */}
                                {userInfo && userInfo?.isSuperAdmin && (
                                    <>
                                        {/* Events */}
                                        <button
                                            className='text-white font-[400] text-sm bg-lightBlue border border-secondaryColor h-full rounded-lg p-3 px-5 flex items-center gap-x-1 screen2:hidden'
                                            style={{ gap: '8px' }}
                                            onClick={(e) => {
                                                setresetCoins(true)
                                                axios
                                                    .get(
                                                        `${BACKEND_URL}/staking/resetCoins`
                                                    )
                                                    .then(async () => {
                                                        setresetCoins(false)
                                                    })
                                                    .catch(() => {
                                                        console.log(
                                                            'Error: BLVCK API NOT WORKING'
                                                        )
                                                        setresetCoins(false)
                                                    })
                                            }}
                                        >
                                            <span>
                                                {resetCoins
                                                    ? 'Running...'
                                                    : 'RESET COINS'}
                                            </span>
                                        </button>

                                        {/* Events */}
                                        <button
                                            className='text-white font-[400] text-sm bg-lightBlue border border-secondaryColor h-full rounded-lg p-3 px-5 flex items-center gap-x-1 screen2:hidden'
                                            style={{ gap: '8px' }}
                                            onClick={(e) => {
                                                seteventRunning(true)
                                                axios
                                                    .get(
                                                        `${BACKEND_URL}/staking/savedEventsReact`
                                                    )
                                                    .then(
                                                        async (
                                                            openseaAPIRes
                                                        ) => {
                                                            await axios
                                                                .post(
                                                                    `${BACKEND_URL}/staking/savedEvents`,
                                                                    {
                                                                        openseaData:
                                                                            openseaAPIRes.data,
                                                                    }
                                                                )
                                                                .catch(
                                                                    (err) => {
                                                                        console.log(
                                                                            'Error: BLVCK API NOT WORKING',
                                                                            err
                                                                        )
                                                                    }
                                                                )
                                                            seteventRunning(
                                                                false
                                                            )
                                                        }
                                                    )
                                                    .catch(() => {
                                                        console.log(
                                                            'Error: OPENSEA API NOT WORKING'
                                                        )
                                                        seteventRunning(false)
                                                    })
                                            }}
                                        >
                                            <span>
                                                {eventRunning
                                                    ? 'Running...'
                                                    : 'EVENTS'}
                                            </span>
                                        </button>

                                        {/* Coins */}
                                        <button
                                            className='text-white font-[400] text-sm bg-lightBlue border border-secondaryColor h-full rounded-lg p-3 px-5 flex items-center gap-x-1 screen2:hidden'
                                            style={{ gap: '8px' }}
                                            onClick={(e) => {
                                                setcoinRunning(true)
                                                axios
                                                    .post(
                                                        `${BACKEND_URL}/staking/blvckCoins`
                                                    )
                                                    .then(() => {
                                                        setcoinRunning(false)
                                                    })
                                                    .catch(() => {
                                                        setcoinRunning(false)
                                                    })
                                            }}
                                        >
                                            <span>
                                                {coinRunning
                                                    ? 'Running...'
                                                    : 'COINS'}
                                            </span>
                                        </button>
                                    </>
                                )}
                                {userInfo && userInfo?.isAdmin && (
                                    <>
                                        {/* Create */}
                                        <button
                                            className='text-white font-[400] text-sm bg-lightBlue border border-secondaryColor h-full rounded-lg p-3 px-5 flex items-center gap-x-1 screen2:hidden'
                                            // onClick={() => setOpenModal(true)}
                                            onClick={(e) =>
                                                toggleDrawer(e, 'right', true)
                                            }
                                        >
                                            <CartSvg />
                                            CREATE
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {!search ? (
                            <div className='screen2:flex items-center justify-between hidden w-full pt-2'>
                                <div className='flex items-center gap-x-4'>
                                    {/* Filter */}
                                    <button
                                        className='text-white font-[400] text-sm bg-lightBlue border border-secondaryColor h-full rounded-lg p-3 px-5 flex items-center gap-x-1'
                                        style={{ gap: '8px' }}
                                        onClick={handleOpenMenu_items}
                                    >
                                        <span>{activeNftType}</span>
                                        <ArrowDownSvg />
                                    </button>

                                    {/* Create */}
                                    {userInfo && userInfo?.isAdmin && (
                                        <>
                                            {/* Create */}
                                            <button
                                                className='text-white font-[400] text-sm bg-lightBlue border border-secondaryColor h-full rounded-lg p-3 px-5 flex items-center gap-x-1'
                                                // onClick={() => setOpenModal(true)}
                                                onClick={(e) =>
                                                    toggleDrawer(
                                                        e,
                                                        'right',
                                                        true
                                                    )
                                                }
                                            >
                                                <CartSvg />
                                                CREATE
                                            </button>
                                        </>
                                    )}
                                </div>
                                <div
                                    className={`w-min h-min cursor-pointer`}
                                    onClick={() => setSearch(true)}
                                >
                                    <SearchSvg />
                                </div>
                            </div>
                        ) : (
                            <div className='w-full flex items-center pt-4'>
                                <input
                                    type='text'
                                    placeholder='Search'
                                    className={`outline-none border-b w-full mr-2 bg-transparent input_sloow_animate`}
                                    id='search__NFT'
                                    onKeyUp={searchME}
                                />
                                <div
                                    className={`cursor-pointer animate_close`}
                                    onClick={() => {
                                        setSearch(false)
                                        try {
                                            closeSearch()
                                        } catch (err) {
                                            console.log(err)
                                        }
                                    }}
                                >
                                    <CloseSvg fill={`#FFF`} />
                                </div>
                            </div>
                        )}
                        {/* <p className='hidden screen3:flex items-center gap-x-2'>
                        Showing:{' '}
                        <span className='font-[700]'>{activeNftType}</span>
                        <span
                            className='cursor-pointer screen3:hidden'
                            onClick={handleOpenMenu_items}
                        >
                            <ArrowDownSvg />
                        </span>
                    </p> */}
                    </div>

                    {/* Market Cards */}

                    <div
                        className='px-12 flex flex-wrap gap-8 justify-left pb-10 pt-5 screen3:px-4 w-full relative'
                        id='nft__Card_BoDY'
                    >
                        {/* {active === 1 && (
                            <GiftNftCard
                                nft={winnerCardData}
                                isAdmin={userInfo && userInfo?.isAdmin}
                                active={active}
                            />
                        )} */}

                        {metadata.length > 0 ? (
                            metadata.map((nft, index) => {
                                if (nft.nftType === 10)
                                    return (
                                        <GiftNftCard
                                            nft={nft}
                                            isAdmin={
                                                userInfo && userInfo?.isAdmin
                                            }
                                            active={active}
                                            key={index}
                                        />
                                    )
                                else if(nft.nftType === 4 )
                                    return (
                                        <AuctionCard
                                            key={index}
                                            nft={nft}
                                            isAdmin={
                                                userInfo && userInfo?.isAdmin
                                            }
                                            active={active}
                                        />
                                    )
                                else
                                    return (
                                        <NftCard
                                            key={index}
                                            nft={nft}
                                            isAdmin={
                                                userInfo && userInfo?.isAdmin
                                            }
                                            active={active}
                                        />
                                    )
                            })
                        ) : (
                            <span className='text-center text-3xl h-full w-full flex items-center justify-center flex-col'>
                                <img src={no_item} alt='' className='w-72' />
                                No Item Found
                            </span>
                        )}

                        {/* Stake Card */}
                        {/* {active === 1 && ( */}

                        {/* )} */}
                    </div>
                </div>
            )}
            <NftTypeSelect
                handleClose={handleClose_items}
                open={open_items}
                anchorEl={anchorEl_items}
                userInfo={userInfo}
                setActive={setActiveType}
            />

            <SwipeableDrawer
                anchor={'right'}
                open={drawer['right']}
                onClose={(e) => toggleDrawer(e, 'right', false)}
                transitionDuration={750}
                onOpen={(e) => toggleDrawer(e, 'right', true)}
                className='bg-[#0C0C0DB2] transition-opacity ease-in-out'
                PaperProps={{
                    sx: {
                        backdropFilter: 'blur(8px)',
                        borderRadius: '0 !important',
                        color: 'white',
                        top: '0',
                    },
                }}
            >
                <CreateNft
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    setDrawer={setDrawer}
                    toggleDrawer={toggleDrawer}
                />
            </SwipeableDrawer>
        </div>
    )
}

export default Marketplace
