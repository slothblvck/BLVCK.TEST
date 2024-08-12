import React, { useContext, useEffect, useState } from 'react'
import CardTimer from './CardTimer'
import NftModal from '../shared/modals/NftModal'
import ConnectWallet from './../shared/modals/ConnectWallet'
import anounce from '../../assets/svg/announce.svg'
import waiting from '../../assets/svg/waiting.svg'
import CreateNft from '../shared/modals/CreateNft'
// import Skull from '../shared/Skull'
import { DISCORD_NAME, WalletConnectContext } from '../../hooks/WalletLogin'
import ChangeWallet from './../shared/modals/ChangeWallet'
import PencilSvg from '../../assets/svg/pencilSvg'
import ParticiaptingModal from '../shared/modals/ParticipatingModal'
import TransactionFailed from '../shared/modals/PaymentFail'
import { SwipeableDrawer } from '@mui/material'
import { Delete } from '@mui/icons-material'
import DeleteModal from '../shared/modals/DeleteModal'

const NftCard = ({ nft, isAdmin, active }) => {
    const [openModal, setOpenModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [isParticipated, setParticipated] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [isWhitelistParticipate, setWhitelistParticipate] = useState(false)
    const [transactionCompleted, setTransactionCompleted] = useState(false)
    const [participatingModal, setParticipatingModal] = useState(false)
    const [participatingFailModal, setParticipatingFailModal] = useState(false)
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
        nftCardContainer: `w-full h-full rounded-xl bg-cardsBg p-4 flex items-center flex-col gap-y-2 cursor-pointer shadow-[8px_12px_50px_rgba(0,0,0,0.4)] ${
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
        abst_discord_name: `absolute top-2 left-[0.7rem] z-10 font-[Montserrat] text-[14px] font-[500] px-3 py-2 text-[#FFF] flex justify-center items-center rounded-full backdrop-blur cursor-pointer overflow-hidden w-[60px] h-[35px]`,
        nftParticipated: `participationsDone absolute top-2 right-[0.7rem] bg-white z-10 text-black text-sm font-[500] border-[2.7px] border-[#121212] h-9 w-min px-4 py-3 flex justify-center items-center rounded-full backdrop-blur cursor-pointer `,
        nftTimerWrapper: `absolute bottom-0 left-0 w-full bg-[#000] z-10 text-sm font-[500] h-[53px] flex justify-center items-center rounded-b-2xl backdrop-blur px-9 py-1`,
        hoverNftPrice: `particiapte__for absolute z-10 bottom-0 rounded-b-xl w-full left-0 h-[40px] bg-white text-black items-center justify-center flex cursor-pointer gap-x-2 ${nft?.personName.includes(DISCORD_NAME) ? 'bg-bar-svg-new-cs' : ''} ${
            isParticipated &&
            (!checkValid() ||
                getNftParticipate(userInfo?.participatedBy, nft?._id) ===
                    getUserParticipantLimit(nft)) &&
            active === 1
                ? ''
                : 'translate-y-[45px] group-hover:translate-y-0 group-hover:transition-all group-hover:ease group-hover:duration-200 duration-200 ease'
        }`,
        editByAdminButton: `absolute p-1 ${
            nft.nftType === -1
                ? 'bg-primaryColor text-white'
                : ' bg-white text-lightBlue'
        } rounded-full top-1 right-1 cursor-pointer z-10`,
        expiredOverlay: `absolute flex w-full items-center justify-center bg-[#19191994] top-0 left-0 h-full z-10 rounded-xl cursor-pointer`,
        expiredAnounceBar: `absolute right-0 bottom-0 flex items-center justify-center h-[40px] text-[#191A1D] gap-x-2 bg-[#FFF] font-[500] text-base w-full rounded-b-2xl cursor-pointer`,
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

    useEffect(() => {
        if (isWalletLogin) {
            // setLeftParticipate({ cnt: 0 })
            userInfo?.participatedBy.forEach((p) => {
                if (p.nftId === nft?._id) {
                    setParticipated(true)
                }
            })
        }
    }, [
        isWalletLogin,
        userInfo?.participatedBy,
        walletAddress,
        getNftParticipate,
    ])
    // console.log(leftParticipate)

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
                        style={nft.timer !== ' ' ? { height: '172px', objectFit: 'cover', borderRadius: '0' } : {}}
                        src={nft.nftImage}
                        alt=''
                        className='rounded-2xl object-cover w-[inherit] h-auto group-hover:scale-[1.12] group-hover:duration-[0.4s] duration-[0.4s] ease-in-out'
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

                    {nft?.personName.includes(DISCORD_NAME) && <div className={`${styles.abst_discord_name} overflow-hidden`}
                        style={{
                            animationName: 'change_nly_color',
                            animationDuration: '3s',
                            animationIterationCount: 'infinite'
                        }}
                    >
                        <div className={`custom-big-box`}>
                            <div className='custom-big-box-1'></div>
                            <div className='custom-big-box-2'></div>
                            <div className='custom-big-box-3'></div>
                            <div className='custom-big-box-1'></div>
                        </div>
                        <span className='absolute whitespace-nowrap'>{"PSG"}</span>
                    </div>}

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
                    <h1 className='text-lg font-[600] text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] to-[#FFFFFF75]'>
                        {/* {nft.name} */}
                        {nft.name?.trim().length > 42
                            ? nft.name?.trim().substr(0, 42) + '...'
                            : nft.name.trim()}
                    </h1>

                    {/* Price */}
                    <p
                        className={`w-full text-base font-[100] h-7 opacity-100 group-hover:opacity-0 delay-150 duration-500 transition-opacity ease-in-out`}
                    >
                        {nft.price} BLVCK
                    </p>

                    {/* Button */}
                    {/* {isWalletLogin && userInfo?.isAdmin ? (
                        <div
                            className={`w-full px-2 py-2 flex items-center justify-center cursor-pointer rounded border border-lightBlue font-[500] text-sm
                                                ${
                                                    nft.nftType === 1
                                                        ? 'bg-primaryColor text-white'
                                                        : isParticipated
                                                        ? 'bg-transparent text-lightBlue'
                                                        : 'bg-lightBlue text-white'
                                                }
                                                flex items-center justify-center gap-x-2`}
                            onClick={(e) => toggleDrawerNFTModal(e, 'right', true)}
                        >
                            <HiOutlineDownload className='text-xl' />
                            <span>Download CSV</span>
                        </div>
                    ) : (
                        <button
                            className={`w-full px-2 py-2 flex items-center justify-center rounded border border-lightBlue font-[500] text-sm
                            ${
                                nft.nftType === 1
                                    ? 'bg-primaryColor text-white border-none'
                                    : isParticipated &&
                                      getNftParticipate(userInfo?.participatedBy, nft?._id) >=
                                          getUserParticipantLimit(nft)
                                    ? 'bg-transparent text-lightBlue'
                                    : 'bg-lightBlue text-white'
                            }
                            `}
                            disabled={
                                new Date(nft.timer).getTime() < Date.now()
                            }
                            onClick={() => setOpenModal(true)}
                        >
                            {isParticipated &&
                            getNftParticipate(userInfo?.participatedBy, nft?._id) >=
                                getUserParticipantLimit(nft)
                                ? 'Already Participated'
                                : new Date(nft.timer).getTime() < Date.now()
                                ? 'Expired'
                                : `Participate`}
                        </button>
                    )} */}
                </div>
            </div>
            {/* EXPIRED OVERLAY */}
            {/* {new Date(nft.timer).getTime() < Date.now() && (
                <div
                    className={styles.expiredOverlay}
                    onClick={(e) => toggleDrawerNFTModal(e, 'right', true)}
                >
                    <Skull setOpenModal={setOpenModal} />
                </div>
            )} */}

            {/* Expired/Anounced */}
            {!checkValid() &&
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
                ))}

            {/* NFT PRICE *ON HOVER* */}
            {(checkValid() ||
                (!checkValid() && active !== 2 && isParticipated)) && (
                <div
                    className={styles.hoverNftPrice}
                    onClick={(e) => toggleDrawerNFTModal(e, 'right', true)}
                >
                    {isParticipated &&
                    (!checkValid() ||
                        getNftParticipate(
                            userInfo?.participatedBy,
                            nft?._id
                        ) === getUserParticipantLimit(nft))
                        ? 'Already Participated'
                        : isParticipated && nft.nftType === 3
                        ? 'Already Purchased'
                        : checkValid()
                        ? `Participate for ${nft.price} BLVCK`
                        : ``}
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
                        <PencilSvg />
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
                <NftModal
                    setDrawer={setDrawer}
                    toggleDrawer={toggleDrawerNFTModal}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    nft={nft}
                    isAdmin={isAdmin}
                    setOpenConnectModal={setOpenConnectModal}
                    setWhitelistParticipate={setWhitelistParticipate}
                    setParticipatingModal={setParticipatingModal}
                    setTransactionCompleted={setTransactionCompleted}
                    setParticipatingFailModal={setParticipatingFailModal}
                />
            </SwipeableDrawer>

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

export default NftCard
