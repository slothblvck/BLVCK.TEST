import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import SearchSvg from '../../assets/svg/SearchSvg'
import TopSideInfo from '../../components/Dashboard/TopSideInfo'
import TitlePage from '../../components/shared/TitlePage'
import { BACKEND_URL, WalletConnectContext } from '../../hooks/WalletLogin'
import styles from './UserDetail.module.css'
import DefaultLoader from '../../components/shared/loaders/DefaultLoader'
// import StickyHeadTable from './TableView'
import EnhancedTable from './TableView'
import Pagination from './Pagination'
import { TablePagination } from '@mui/material'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import UserDetailModal from '../../components/shared/modals/UserDetailModal'

const UserDetails = () => {
    const { isWalletLogin, accessToken, userInfo, walletAddress } =
        useContext(WalletConnectContext)

    const [getAllUsers, setGetAllUsers] = useState([])
    const [getAllUsersLoading, setGetAllUsersLoading] = useState(false)
    const [updatingCoins, setUpdatedCoins] = useState(false)
    const [seachingWallet, setseachingWallet] = useState(false)
    const [amount, setAmount] = useState('')
    const [userAddress, setUserAddress] = useState('')
    const [searchWalletAddress, setsearchWalletAddress] = useState('')
    const [openModal, setOpenModal] = useState('')
    const [DetailedWalletAddress, setDetailedWalletAddress] = useState('')
    const [msg, setMsg] = useState(null)

    const params = useParams()
    const navigate = useNavigate()

    const [sort, setSort] = useState(false)

    const [page, setPage] = React.useState(parseInt(params.userPageId))
    const [size, setSize] = React.useState(0)

    const [rowsPerPage, setRowsPerPage] = React.useState(10)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
        navigate(`/userDetails/${newPage}`)
    }

    const config = {
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${accessToken}`,
        },
    }
    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 10))
    //     setPage(0)
    // }

    useEffect(() => {
        const fetch = async () => {
            if (isWalletLogin && accessToken && userInfo.isAdmin) {
                setGetAllUsersLoading(true)
                try {
                    await axios
                        .post(
                            `${BACKEND_URL}/auth/getAllUsers?page=${
                                params.userPageId
                            }&limit=${10}&sort=${!sort ? 1 : -1}`,
                            { owner: walletAddress },
                            config
                        )
                        .then((res) => {
                            // console.log(res.data.roles)
                            setGetAllUsers(res.data.data.parsedData)
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

        if (!params.userPageId || parseInt(params.userPageId) >= 0) {
            fetch()
        }
    }, [params.userPageId, sort])

    const changeSort = () => {
        // console.log('called')
        // let arr = [...getAllUsers]
        // arr.reverse()
        // setGetAllUsers(arr)

        setSort(!sort)
    }

    const searchTheWalletAddress = async () => {
        setseachingWallet(true)
        await axios
            .post(
                `${BACKEND_URL}/auth/searchTheWalletAddress`,
                {
                    walletAddress: searchWalletAddress,
                    page: 'userDetails'
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

    const addCoins = async () => {
        if (isWalletLogin && accessToken && userInfo.isAdmin) {
            setUpdatedCoins(true)
            try {
                await axios
                    .post(
                        `${BACKEND_URL}/auth/addCoinsToUser`,
                        {
                            owner: walletAddress,
                            amount: amount,
                            userAddress: userAddress,
                        },
                        config
                    )
                    .then((res) => {
                        setUserAddress('')
                        setAmount('')
                        setMsg(res.data.msg)
                        setUpdatedCoins(false)
                    })
                    .catch((err) => {
                        console.log(err)
                        setMsg(err.toString())
                        setUpdatedCoins(false)
                    })
            } catch (err) {
                console.log(err)
                setUpdatedCoins(false)
            }
        }
    }

    const searchME = () => {
        try {
            let userData = document
                .getElementById('search__USERDETAILS')
                .value.toUpperCase()

            let container = document.getElementById('searchUSER_DETAIL__Body')
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

    if (!params.userPageId || parseInt(params.userPageId) >= 0) {
        return (
            <div className='w-full h-full flex flex-col screen2:pb-16'>
                {/* Top */}
                <div className='flex items-center justify-between w-full screen2:hidden'>
                    <div className='pl-12'>
                        <TitlePage heading={'UserDetails'} />
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
                                <div className='flex w-full flex-col bg-[#111] rounded-lg pb-5 gap-2'>
                                    <span>Send BLVCK Coins</span>
                                    <div
                                        className={`w-full gap-2 flex items-center h-min`}
                                    >
                                        <input
                                            type='text'
                                            placeholder='Enter Wallet Address'
                                            className={`outline-none border-b w-full mr-2 bg-transparent`}
                                            value={userAddress}
                                            onChange={(e) =>
                                                setUserAddress(e.target.value)
                                            }
                                        />
                                        <input
                                            type='number'
                                            placeholder='Enter Amount'
                                            className={`outline-none border-b w-full mr-2 bg-transparent`}
                                            value={amount}
                                            onChange={(e) =>
                                                setAmount(
                                                    parseInt(e.target.value)
                                                )
                                            }
                                        />
                                        <button
                                            className='flex items-center justify-center px-3 bg-white rounded cursor-pointer text-sm h-8 text-[#111] hover:text-white hover:bg-[#585858] disabled:text-white disabled:bg-[#585858] disabled:cursor-not-allowed'
                                            disabled={
                                                updatingCoins ||
                                                !amount ||
                                                !userAddress
                                            }
                                            onClick={() => addCoins()}
                                        >
                                            {updatingCoins
                                                ? 'Processing...'
                                                : 'SUBMIT'}
                                        </button>
                                    </div>
                                    {msg && (
                                        <div style={msg.includes('Successfully') ? { color: '#6cf86c' } : {}} className='text-xs text-red-600 font-bold'>
                                            {msg}
                                        </div>
                                    )}
                                </div>

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

                                {/* <div className='flex h-full w-full'>
                        <EnhancedTable rows={getAllUsers} />
                    </div> */}
                                <div className='flex flex-col overflow-x-scroll whitespace-nowrap w-full bg-[#111] rounded-md'>
                                    <div className='overflow-x-auto sm:-mx-6 lg:-mx-8 whitespace-nowrap'>
                                        <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
                                            <div className='overflow-hidden'>
                                                <table
                                                    className={`min-w-full ${styles.table} whitespace-nowrap`}
                                                >
                                                    <thead className=''>
                                                        <tr>
                                                            <th
                                                                style={{
                                                                    fontWeight: 600,
                                                                }}
                                                                scope='col'
                                                            >
                                                                Sr No.
                                                            </th>
                                                            <th
                                                                style={{
                                                                    fontWeight: 600,
                                                                }}
                                                                scope='col'
                                                            >
                                                                Wallet Address
                                                            </th>
                                                            <th
                                                                style={{
                                                                    fontWeight: 600,
                                                                }}
                                                                scope='col'
                                                            >
                                                                Discord Name
                                                            </th>
                                                            <th
                                                                style={{
                                                                    fontWeight: 600,
                                                                }}
                                                                scope='col'
                                                            >
                                                                Balance Coins
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
                                                                Total Coins
                                                            </th>
                                                            <th
                                                                style={{
                                                                    fontWeight: 600,
                                                                }}
                                                                scope='col'
                                                            >
                                                                All Details
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id='searchUSER_DETAIL__Body'>
                                                        {getAllUsers?.map(
                                                            (val, key) => (
                                                                <tr
                                                                    className=''
                                                                    key={key}
                                                                >
                                                                    <td className='text-base  whitespace-nowrap font-[400] text-[#c9c9c9]'>
                                                                        {page *
                                                                            rowsPerPage +
                                                                            key +
                                                                            1}
                                                                    </td>
                                                                    <td className='text-base  whitespace-nowrap font-[400] text-[#c9c9c9]'>
                                                                        {
                                                                            val.walletAddress
                                                                        }
                                                                    </td>
                                                                    <td className='text-base  whitespace-nowrap font-[400] text-[#c9c9c9]'>
                                                                        {val.discordInfo
                                                                            ? val.discordInfo
                                                                            : '-'}
                                                                    </td>
                                                                    <td className='text-base whitespace-nowrap font-[400] text-[#c9c9c9]'>
                                                                        {
                                                                            val.coinsBalance
                                                                        }
                                                                    </td>
                                                                    <td className='text-base whitespace-nowrap font-[400] text-[#c9c9c9]'>
                                                                        {
                                                                            val.totalCoins
                                                                        }
                                                                    </td>
                                                                    <button
                    className={`flex items-center justify-center p-2 py-1 rounded w-full bg-white text-primaryColor font-[700] disabled:opacity-40 disabled:cursor-not-allowed disabled:font-[400]`}
                    onClick={(e) => {
                            setOpenModal(true)
                            setDetailedWalletAddress(val.walletAddress)
                    }}
                >
                    {'More Info'}
                </button>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                                {openModal && (
                <UserDetailModal
                    walletAddress={DetailedWalletAddress}
                    openModal={openModal}
                    closeModal={() => setOpenModal(false)}
                />
            )}
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
                                <pre>No User Found!</pre>
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
                        <TitlePage heading={'UserDetails'} />
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

export default UserDetails
