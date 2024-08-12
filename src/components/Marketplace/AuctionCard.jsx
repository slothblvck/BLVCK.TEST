import React, { useContext, useEffect, useState } from 'react'
import CardTimer from './CardTimer'
import ConnectWallet from '../shared/modals/ConnectWallet'
import anounce from '../../assets/svg/announce.svg'
import waiting from '../../assets/svg/waiting.svg'
import CreateNft from '../shared/modals/CreateNft'
// import Skull from '../shared/Skull'
import { WalletConnectContext } from '../../hooks/WalletLogin'
import ChangeWallet from '../shared/modals/ChangeWallet'
import PencilSvg from '../../assets/svg/pencilSvg'
import BlvckCoin from '../../assets/svg/BlvckCoin.svg'
import ParticiaptingModal from '../shared/modals/ParticipatingModal'
import TransactionFailed from '../shared/modals/PaymentFail'
import { SwipeableDrawer } from '@mui/material'
import { Delete } from '@mui/icons-material'
import DeleteModal from '../shared/modals/DeleteModal'
import AuctionModal from '../shared/modals/AuctionModal'
import BidFailModal from '../shared/modals/BidFail'

const AuctionCard = ({ nft, isAdmin, active }) => {
    const [openModal, setOpenModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [isWhitelistParticipate, setWhitelistParticipate] = useState(false)
    const [transactionCompleted, setTransactionCompleted] = useState(false)
    const [participatingModal, setParticipatingModal] = useState(false)
    const [participatingFailModal, setParticipatingFailModal] = useState(false)
    const [bidModal, setBidModal] = useState(false)
    const [openConnectModal, setOpenConnectModal] = useState(false)
    const [drawer, setDrawer] = useState({
        right: false,
    })
    const [drawerEdit, setDrawerEdit] = useState({
        right: false,
    })

    const {
        isWalletLogin,
        walletAddress,
        deleteNft,
        fetchNfts,
        getUserParticipantLimit,
        userInfo,
        getNftParticipate,
    } = useContext(WalletConnectContext)

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

    // console.log(checkValid())
    // console.log(userInfo?.participatedBy)
    // console.log(getNftParticipate(userInfo?.participatedBy, nft?._id))
    // console.log(getUserParticipantLimit(nft))

    // 0. Raffle
    // 1. Whhitelisted
    // 2. Scratch Card
    // 3. Item Card
    const styles = {
        priceTag: `fort-[600] text-xl`,
        nftCardWrapper: `group nft__Card rounded-xl w-[260px] h-[335px] hover:transform ease-in-out transition-transform relative screen4:w-full overflow-hidden`,
        nftCardContainer: `w-full h-full rounded-xl bg-auction_cardsBg p-4 flex items-center flex-col gap-y-2 cursor-pointer shadow-[8px_12px_50px_rgba(0,0,0,0.4)] ${
            checkValid()
                ? ''
                : nft.isAnounced
                ? 'opacity-[0.6]'
                : 'opacity-[0.4]'
        }`,
        nftImageWrapper: `relative rounded-2xl h-auto flex w-[225px] ${
            nft.name?.trim().length > 22 ? 'min-h-[200px]' : 'min-h-[225px]'
        } h-[225px] max-h-[225px] ${
            new Date(nft.timer).getTime() < Date.now() ? '' : 'cursor-pointer'
        } screen4:w-full overflow-hidden`,
        participantCount: `absolute participate_now_hover_Effect top-2 right-[0.7rem] bg-white z-10 border-[2.7px] border-[#121212] text-black text-sm h-9 w-9 font-[600] p-3 px-4 flex justify-center items-center rounded-full backdrop-blur`,
        nftParticipants: `absolute top-2 right-[0.7rem] bg-white z-10 text-black text-sm font-[500] border-[2.7px] border-[#121212] h-9 w-max px-4 py-3 flex justify-center items-center rounded-full backdrop-blur cursor-pointer `,
        nftParticipated: `participationsDone absolute top-2 right-[0.7rem] bg-white z-10 text-black text-sm font-[500] border-[2.7px] border-[#121212] h-9 w-min px-4 py-3 flex justify-center items-center rounded-full backdrop-blur cursor-pointer `,
        nftTimerWrapper: `absolute bottom-0 left-0 w-full bg-[#000] z-10 text-sm font-[500] h-[53px] flex justify-center items-center rounded-b-2xl backdrop-blur px-9 py-1`,
        hoverNftPrice: `particiapte__for absolute z-10 bottom-0 rounded-b-xl w-full left-0 h-[40px] bg-[#1C1C1C] text-[#FFF] items-center justify-center flex cursor-pointer gap-x-2 ${
            'translate-y-[45px] group-hover:translate-y-0 group-hover:transition-all group-hover:ease group-hover:duration-200 duration-200 ease'
        }`,
        editByAdminButton: `absolute p-1 ${
            nft.nftType === -1
                ? 'bg-primaryColor text-white'
                : ' bg-black text-lightBlue'
        } rounded-full top-1 right-1 cursor-pointer z-10`,
        expiredOverlay: `absolute flex w-full items-center justify-center bg-[#19191994] top-0 left-0 h-full z-10 rounded-xl cursor-pointer`,
        expiredAnounceBar: `absolute right-0 bottom-0 flex items-center justify-center h-[40px] text-[#191A1D] gap-x-2 bg-[#1B1C1F] font-[500] text-base w-full rounded-b-2xl cursor-pointer`,
    }

    const deletNft = async () => {
        if (isWalletLogin && isAdmin) {
            setOpenModal(false)
            await deleteNft(nft._id)
            await fetchNfts()
            await fetchOngoing('ongoing')
        } else {
            // setError('Connect Your Wallet')
            return
        }
    }

    const toggleDrawerNFTModal = (event, anchor, open) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return
        }

        setDrawer({ right: open })
    }

    const checkWhoWon = (walletAddress) => {
        for (let i = 0; i < nft?.winners?.length; i++) {
            if (nft?.winners[i]?.participant === walletAddress) return true
        }
        return false
    }

    const toggleDrawerEdit = (event, anchor, open) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return
        }

        setDrawerEdit({ right: open })
    }

    return (
        <div className={styles.nftCardWrapper}>
            <div
                className={styles.nftCardContainer}
                onClick={(e) => toggleDrawerNFTModal(e, 'right', true)}
            >
                {/* NFT IMAGE */}
                <div
                    className={styles.nftImageWrapper}
                    onClick={(e) => toggleDrawerNFTModal(e, 'right', true)}
                >
                    <img
                        src={nft.nftImage}
                        alt=''
                        className='rounded-2xl object-cover w-[inherit] h-auto group-hover:scale-[1.12] group-hover:duration-[0.4s] duration-[0.4s] ease-in-out'
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

                    {/* Nft Timer */}
                    {nft.timer !== ' ' && (
                        <div className={styles.nftTimerWrapper}>
                            <CardTimer
                                nft={nft}
                                targetData={
                                    nft.totalSupply > 0
                                        ? nft.totalSold >= nft.totalSupply
                                            ? 1656346144653
                                            : nft.timer
                                        : nft.timer
                                }
                            />
                        </div>
                    )}
                </div>

                {/* Nft Description */}
                <div className='flex items-start h-full flex-col w-full gap-y-4'>
                    {/* Title */}
                    <h1 className='text-lg font-[600] text-[#1B1C1F]'>
                        {/* {nft.name} */}
                        {nft.name?.trim().length > 42
                            ? nft.name?.trim().substr(0, 42) + '...'
                            : nft.name.trim()}
                    </h1>

                    {/* Price */}
                    <p
                        className={`w-full text-base font-[400] h-7 opacity-100 ${checkValid() ? 'group-hover:opacity-0' : ''} delay-150 duration-500 transition-opacity ease-in-out text-[#1B1C1F]`}
                    >
                        <div className='flex items-center gap-1'>{checkValid() ? 'Current' : 'Last'} bid: <b>{nft.highestBid}</b> <span><img src={BlvckCoin} alt='' className='h-[20px]' /></span></div>
                    </p>
                </div>
            </div>

            {/* Expired/Anounced */}
            {/* {!checkValid() &&
                (nft.isAnounced ? (
                    <div
                        className={styles.expiredAnounceBar}
                        onClick={(e) => toggleDrawerNFTModal(e, 'right', true)}
                    >
                        {!isAdmin && <img src={anounce} alt='' />}
                        {nft.isAnounced && checkWhoWon(walletAddress) ? (
                            <p className='text-[#191A1D] font-[500]'>
                                {isAdmin ? 'See Winners' : 'You WON!!'}
                            </p>
                        ) : (
                            <p className='text-[#191A1D] font-[500]'>
                                {isAdmin
                                    ? 'See Winners'
                                    : nft.nftType === 3 &&
                                      nft.totalSold === nft.totalSupply &&
                                      !isParticipated
                                    ? 'Sold Out'
                                    : nft.nftType === 3 &&
                                      nft.totalSold < nft.totalSupply
                                    ? 'Expired'
                                    : 'Results announced'}
                            </p>
                        )}
                    </div>
                ) : (
                    <div
                        className={styles.expiredAnounceBar}
                        onClick={(e) => toggleDrawerNFTModal(e, 'right', true)}
                    >
                        {!isAdmin && <img src={waiting} alt='' />}
                        <p className='text-[#191A1D] font-[500]'>
                            {isAdmin && nft.nftType !== 3
                                ? 'Draw Winners'
                                : nft.nftType === 3 &&
                                  nft.totalSold === nft.totalSupply
                                ? 'Sold Out'
                                : nft.nftType === 3 &&
                                  nft.totalSold < nft.totalSupply
                                ? 'Expired'
                                : 'Results not announced'}
                        </p>
                    </div>
                ))} */}

            {/* NFT PRICE *ON HOVER* */}
            {checkValid() && (
                <div
                    className={styles.hoverNftPrice}
                    onClick={(e) => toggleDrawerNFTModal(e, 'right', true)}
                >
                    <>{`Bid for ${nft?.highestBid + 1}`} <span><img src={BlvckCoin} alt='' className='h-[20px]' /></span></>
                </div>
            )}

            {/* Edit Button *ONLY FOR ADMIN*  */}
            {isAdmin &&
                (checkValid() ? (
                    <div
                        className={styles.editByAdminButton}
                        onClick={(e) => {
                            // setOpenModal(false)
                            toggleDrawerEdit(e, 'right', true)
                        }}
                    >
                        <PencilSvg fill={'#FFF'}/>
                    </div>
                ) : (
                    <div
                        className={styles.editByAdminButton}
                        onClick={() => {
                            setOpenDeleteModal(true)
                            // deletNft()
                        }}
                    >
                        <Delete />
                    </div>
                ))}
            {/* Some Modals/Popups */}

            <SwipeableDrawer
                anchor={'right'}
                open={drawer['right']}
                onClose={(e) => toggleDrawerNFTModal(e, 'right', false)}
                transitionDuration={750}
                onOpen={(e) => toggleDrawerNFTModal(e, 'right', true)}
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
                <AuctionModal
                    setDrawer={setDrawer}
                    toggleDrawer={toggleDrawerNFTModal}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    nft={nft}
                    isAdmin={isAdmin}
                    bidModal={bidModal}
                    setBidModal={setBidModal}
                    setOpenConnectModal={setOpenConnectModal}
                    setWhitelistParticipate={setWhitelistParticipate}
                    setParticipatingModal={setParticipatingModal}
                    setTransactionCompleted={setTransactionCompleted}
                    setParticipatingFailModal={setParticipatingFailModal}
                />
            </SwipeableDrawer>

            {bidModal && <BidFailModal
                openModal={bidModal}
                setOpenModal={setBidModal}
            />}

            <ConnectWallet
                openModal={openConnectModal}
                setOpenModal={setOpenConnectModal}
            />
            <ChangeWallet
                openModal={isWhitelistParticipate}
                setOpenModal={setWhitelistParticipate}
                setOpenConnectModal={setOpenConnectModal}
                nft={nft}
            />
            <ParticiaptingModal
                setOpenModal={setParticipatingModal}
                openModal={participatingModal}
                nft={nft}
                transactionCompleted={transactionCompleted}
                setTransactionCompleted={setTransactionCompleted}
            />

            <TransactionFailed
                setOpenModal={setParticipatingFailModal}
                openModal={participatingFailModal}
                nft={nft}
            />

            <DeleteModal
                openModal={openDeleteModal}
                setOpenModal={setOpenDeleteModal}
                deleteNft={deletNft}
            />

            <SwipeableDrawer
                anchor={'right'}
                open={drawerEdit['right']}
                onClose={(e) => toggleDrawerEdit(e, 'right', false)}
                transitionDuration={750}
                onOpen={(e) => toggleDrawerEdit(e, 'right', true)}
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
                    openModal={openEditModal}
                    setOpenModal={setOpenEditModal}
                    toggleDrawer={toggleDrawerEdit}
                    nft={nft}
                />
            </SwipeableDrawer>
        </div>
    )
}

export default AuctionCard
