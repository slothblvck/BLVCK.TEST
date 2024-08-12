import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import SearchSvg from '../../assets/svg/SearchSvg'
import TopSideInfo from '../../components/Dashboard/TopSideInfo'
import TitlePage from '../../components/shared/TitlePage'
import { BACKEND_URL, WalletConnectContext } from '../../hooks/WalletLogin'
import styles from './NftDetail.module.css'
import DefaultLoader from '../../components/shared/loaders/DefaultLoader'
// import StickyHeadTable from './TableView'
import EnhancedTable from './TableView'
import Pagination from './Pagination'
import { TablePagination } from '@mui/material'
import axios from 'axios'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const NftDetails = () => {
    const { isWalletLogin, accessToken, userInfo, walletAddress } =
        useContext(WalletConnectContext)

    const params = useParams()
    const navigate = useNavigate()

    const [getAllUsers, setGetAllUsers] = useState([])
    const [getAllUsersLoading, setGetAllUsersLoading] = useState(false)
    const [seachingWallet, setseachingWallet] = useState(false)
    const [sort, setSort] = useState(false)
    const [searchWalletAddress, setsearchWalletAddress] = useState('')
    const [page, setPage] = React.useState(parseInt(params.nftPageId))
    const [size, setSize] = React.useState(0)

    const [rowsPerPage, setRowsPerPage] = React.useState(100)

    const handleChangePage = (event, newPage) => {
        // console.log(event, 'page', newPage)
        setPage(newPage)
        navigate(`/nftDetails/${newPage}`)
    }
    
    const config = {
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${accessToken}`,
        },
    }

    // console.log(page)

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 100))
    //     setPage(0)
    // }

    const searchTheWalletAddress = async () => {
        setseachingWallet(true)
        await axios
            .post(
                `${BACKEND_URL}/auth/searchTheWalletAddress`,
                {
                    walletAddress: searchWalletAddress,
                    page: 'nftDetails'
                },
                config
            )
            .then((res) => {
                setGetAllUsers(res.data.parsedData)
            }).catch((error) => {
                console.log(error)
            })
        setseachingWallet(false)
    }

    useEffect(() => {
        const fetch = async () => {
            if (isWalletLogin && accessToken && userInfo.isAdmin) {
                setGetAllUsersLoading(true)
                try {
                    await axios
                        .post(
                            `${BACKEND_URL}/auth/getAllNFTS?page=${
                                params.nftPageId
                            }&limit=${rowsPerPage}&sort=${!sort ? 1 : -1}`,
                            { owner: walletAddress },
                            config
                        )
                        .then((res) => {
                            // console.log(res.data.roles)
                            setGetAllUsers(res.data.data.nftData)
                            setSize(res.data.data.size)
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

        if (!params.nftPageId || parseInt(params.nftPageId) >= 0) {
            fetch()
        }
    }, [sort, params.nftPageId])

    const changeSort = () => {
        // console.log('called')
        // let arr = [...getAllUsers]
        // arr.reverse()
        // setGetAllUsers(arr)

        setSort(!sort)
    }

    // console.log(page * rowsPerPage, rowsPerPage * (page + 1) - 1)

    const searchME = () => {
        try {
            let userData = document
                .getElementById('search__NFTDETAILS')
                .value.toUpperCase()

            let container = document.getElementById('searchNFT_DETAIL__Body')
            let tr = container.getElementsByTagName('tr')

            for (let i = 0; i < tr.length; i++) {
                const element = tr[i]

                let text = element.getElementsByTagName('td')
                let tdText = ''

                // console.log(text);

                for (let j = 0; j < text.length; j++) {
                    tdText += text[j].innerText
                }
                // console.log(cardText);

                let textValue = tdText
                if (textValue.toUpperCase().indexOf(userData) > -1) {
                    element.style.display = ''
                } else {
                    element.style.display = 'none'
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    if (!params.nftPageId || parseInt(params.nftPageId) >= 0) {
        return (
            <div className='w-full h-full flex flex-col screen2:pb-16'>
                {/* Top */}
                <div className='flex items-center justify-between w-full screen2:hidden'>
                    <div className='pl-12'>
                        <TitlePage heading={'NFTDetails'} />
                    </div>
                    <div className='min-w-[330px] border-borderLine'>
                        <TopSideInfo />
                    </div>
                </div>
                {/* <div className='recent_saless_scroll p-6 px-12 screen3:px-4 flex flex-col gap-y-8 flex-1 overflow-scroll'> */}
                {getAllUsersLoading ? (
                    <div className='relative w-full h-full'>
                        <DefaultLoader />
                    </div>
                ) : (
                    <>
                        {getAllUsers && getAllUsers?.length > 0 ? (
                            <div
                                style={{ overflow: 'auto' }}
                                className='flex flex-col p-6 px-12 screen3:px-4 gap-y-4'
                            >
                                <div className='flex w-full'>
                                <div className='flex w-full flex-col bg-[#111] rounded-lg pb-5 gap-2'>
                                    <div
                                        className={`w-full gap-2 flex items-center h-min`}
                                    >
                                        <input
                                            type='text'
                                            placeholder='Search for Wallet Address'
                                            className={`outline-none border-b w-full mr-2 bg-transparent`}
                                            value={searchWalletAddress}
                                            onChange={(e) =>
                                                setsearchWalletAddress(e.target.value)
                                            }
                                        />
                                        <button
                                            className='flex items-center justify-center px-3 bg-white rounded cursor-pointer text-sm h-8 text-[#111] hover:text-white hover:bg-[#585858] disabled:text-white disabled:bg-[#585858] disabled:cursor-not-allowed'
                                            disabled={
                                                seachingWallet ||
                                                !searchWalletAddress
                                            }
                                            onClick={() => searchTheWalletAddress()}
                                        >
                                            {seachingWallet
                                                ? 'Processing...'
                                                : 'SUBMIT'}
                                        </button>
                                    </div>
                                </div>
                                </div>

                                <div className='flex flex-col overflow-x-scroll whitespace-nowrap w-full bg-[#111] rounded-md'>
                                    <div className='overflow-x-auto sm:-mx-6 lg:-mx-8 whitespace-nowrap'>
                                        <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
                                            <div className='overflow-hidden'>
                                                <table
                                                    className={`min-w-full ${styles.table} whitespace-nowrap`}
                                                >
                                                    <thead className=''>
                                                        <tr>
                                                            {/* <th
                                                            style={{
                                                                fontWeight: 600,
                                                            }}
                                                            scope='col'
                                                        >
                                                            Sr No.
                                                        </th> */}
                                                            <th
                                                                style={{
                                                                    fontWeight: 600,
                                                                }}
                                                                scope='col'
                                                            >
                                                                TokenID
                                                            </th>
                                                            <th
                                                                style={{
                                                                    fontWeight: 600,
                                                                }}
                                                                scope='col'
                                                            >
                                                                Is Listed
                                                            </th>
                                                            <th
                                                                style={{
                                                                    fontWeight: 600,
                                                                }}
                                                                scope='col'
                                                            >
                                                                Listed
                                                                Marketplace
                                                            </th>
                                                            <th
                                                                style={{
                                                                    fontWeight: 600,
                                                                }}
                                                                scope='col'
                                                            >
                                                                Last Listed
                                                                (Days)
                                                                {sort ? (
                                                                    <span
                                                                        className='cursor-pointer'
                                                                        onClick={() =>
                                                                            changeSort()
                                                                        }
                                                                    >
                                                                        <ArrowDownward />
                                                                    </span>
                                                                ) : (
                                                                    <span
                                                                        className='cursor-pointer'
                                                                        onClick={() =>
                                                                            changeSort()
                                                                        }
                                                                    >
                                                                        <ArrowUpward />
                                                                    </span>
                                                                )}
                                                            </th>
                                                            <th
                                                                style={{
                                                                    fontWeight: 600,
                                                                }}
                                                                scope='col'
                                                            >
                                                                Owner
                                                            </th>
                                                            <th
                                                                style={{
                                                                    fontWeight: 600,
                                                                }}
                                                                scope='col'
                                                            >
                                                                Discord Name
                                                            </th>
                                                            {/* <th
                                                            style={{
                                                                fontWeight: 600,
                                                            }}
                                                            scope='col'
                                                        >
                                                            Get Reward
                                                        </th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody id='searchNFT_DETAIL__Body'>
                                                        {getAllUsers?.map(
                                                            (val, key) => (
                                                                <TableBody
                                                                    val={val}
                                                                    key={key}
                                                                />
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex h-max w-full justify-end'>
                                    <TablePagination
                                        sx={{ filter: 'invert(1)' }}
                                        component='div'
                                        count={size}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        rowsPerPage={rowsPerPage}
                                        rowsPerPageOptions={-1}
                                        // onRowsPerPageChange={
                                        //     handleChangeRowsPerPage
                                        // }
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className='flex h-full w-full items-center justify-center text-3xl'>
                                <pre>No NFT Found!</pre>
                            </div>
                        )}
                    </>
                )}
            </div>
        )
    } else {
        return (
            <div className='w-full h-full flex flex-col screen2:pb-16'>
                {/* Top */}
                <div className='flex items-center justify-between w-full screen2:hidden'>
                    <div className='pl-12'>
                        <TitlePage heading={'NFTDetails'} />
                    </div>
                    <div className='min-w-[330px] border-borderLine'>
                        <TopSideInfo />
                    </div>
                </div>

                <div
                    style={{ overflow: 'auto' }}
                    className='flex flex-col p-6 px-12 screen3:px-4 gap-y-4'
                >
                    <div className='flex w-full'>
                        <div
                            className={`w-full p-4 gap-2 pb-5 flex items-center h-min bg-[#111] rounded-lg`}
                        >
                            <pre>Page Not Found!</pre>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NftDetails

const TableBody = ({ val }) => {
    const [discordName, setDiscordName] = useState('')
    const [nameLoading, setNameLoading] = useState(false)

    const { isWalletLogin, accessToken, userInfo, walletAddress } =
        useContext(WalletConnectContext)

    const revelName = async () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${accessToken}`,
            },
        }

        if (isWalletLogin && accessToken && userInfo.isAdmin) {
            setNameLoading(true)
            try {
                await axios
                    .post(
                        `${BACKEND_URL}/auth/getDiscordName`,
                        { owner: walletAddress, userWaalletKey: val?.owner },
                        config
                    )
                    .then((res) => {
                        setDiscordName(res.data.msg)
                        setNameLoading(false)
                    })
                    .catch((err) => {
                        console.log(err)
                        setNameLoading(false)
                    })
            } catch (err) {
                console.log(err)
                setNameLoading(false)
            }
        }
    }

    return (
        <tr className=''>
            {/* <td className='text-base  whitespace-nowrap font-[400] text-[#c9c9c9]'>
                {page * rowsPerPage + key + 1}
            </td> */}
            <td className='text-base  whitespace-nowrap font-[400] text-[#c9c9c9]'>
                {val.tokenId}
            </td>
            <td className='text-base  whitespace-nowrap font-[400] text-[#c9c9c9]'>
                {val.listed ? 'YES' : 'NO'}
            </td>
            <td className='text-base whitespace-nowrap font-[400] text-[#c9c9c9]'>
                {val.listed ? val.listedMarketplace : '-'}
            </td>
            <td className='text-base whitespace-nowrap font-[400] text-[#c9c9c9]'>
                {parseInt(val?.stakedTime) || '-'}
            </td>
            <td className='text-base whitespace-nowrap font-[400] text-[#c9c9c9]'>
                {val?.owner || '-'}
            </td>
            <td className='text-base whitespace-nowrap font-[400] text-[#c9c9c9]'>
                {discordName ? (
                    discordName
                ) : (
                    <button
                        className={`flex items-center justify-center p-2 py-1 rounded w-full bg-white text-primaryColor font-[700] disabled:opacity-40 disabled:cursor-not-allowed disabled:font-[400]`}
                        disabled={!val?.owner || nameLoading}
                        onClick={() => revelName()}
                    >
                        {nameLoading ? 'Revealing...' : 'Reveal'}
                    </button>
                )}
            </td>
            {/* <td className='text-base whitespace-nowrap font-[400] text-[#c9c9c9]'>
                <button
                    className={`flex items-center justify-center p-2 py-1 rounded w-full bg-white text-primaryColor font-[700] disabled:opacity-40 disabled:cursor-not-allowed disabled:font-[400]`}
                    disabled
                >
                    GET
                </button>
            </td> */}
        </tr>
    )
}
