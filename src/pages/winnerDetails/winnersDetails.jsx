import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import SearchSvg from '../../assets/svg/SearchSvg'
import TopSideInfo from '../../components/Dashboard/TopSideInfo'
import TitlePage from '../../components/shared/TitlePage'
import Checkbox from '@mui/material/Checkbox'
import { BACKEND_URL, WalletConnectContext } from '../../hooks/WalletLogin'
import styles from './WinnersDetail.module.css'
import DefaultLoader from '../../components/shared/loaders/DefaultLoader'
// import StickyHeadTable from './TableView'
import EnhancedTable from './TableView'
import Pagination from './Pagination'
import { TablePagination } from '@mui/material'
import axios from 'axios'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import UserDetailModal from '../../components/shared/modals/UserDetailModal'
import exportToCsv from '../../hooks/DownloadCSV'

const WinnerDetails = () => {
    const { isWalletLogin, accessToken, userInfo, walletAddress } =
        useContext(WalletConnectContext)

    const params = useParams()
    const navigate = useNavigate()

    const [selectedToDeliver, setSelectedToDeliver] = useState([])
    const [getAllUsers, setGetAllUsers] = useState([])
    const [deliveryType, setDeliveryType] = useState(1)
    const [getAllUsersLoading, setGetAllUsersLoading] = useState(false)
    const [seachingWallet, setseachingWallet] = useState(false)
    const [searchWalletAddress, setsearchWalletAddress] = useState('')
    const [sort, setSort] = useState(false)

    const [page, setPage] = React.useState(parseInt(params.winnerPageId))
    const [size, setSize] = React.useState(0)

    const [rowsPerPage, setRowsPerPage] = React.useState(100)

    const handleChangePage = (event, newPage) => {
        // console.log(event, 'page', newPage)
        setPage(newPage)
        navigate(`/winnerDetails/${newPage}`)
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
                    page: 'winnerDetails'
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
                            `${BACKEND_URL}/auth/getWinnersDetail?page=${
                                params.winnerPageId
                            }&limit=${rowsPerPage}&sort=${!sort ? 1 : -1}`,
                            { owner: walletAddress, deliveryType },
                            config
                        )
                        .then((res) => {
                            // console.log(res.data.roles)
                            setGetAllUsers(res.data.data.winnersData)
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

        if (!params.winnerPageId || parseInt(params.winnerPageId) >= 0) {
            fetch()
        }
    }, [sort, params.winnerPageId, deliveryType])

    const setDelivered = async () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${accessToken}`,
            },
        }

        if (isWalletLogin && accessToken && userInfo.isAdmin) {
            setGetAllUsersLoading(true)
            try {
                await axios
                    .post(
                        `${BACKEND_URL}/auth/markAsDelivered`,
                        { owner: walletAddress, selectedToDeliver },
                        config
                    )
                    .then(async (res) => {
                        await axios
                            .post(
                                `${BACKEND_URL}/auth/getWinnersDetail?page=${
                                    params.winnerPageId
                                }&limit=${rowsPerPage}&sort=${!sort ? 1 : -1}`,
                                { owner: walletAddress, deliveryType },
                                config
                            )
                            .then((res) => {
                                // console.log(res.data.roles)
                                setGetAllUsers(res.data.data.winnersData)
                                setSize(res.data.data.size)

                                setSelectedToDeliver([])
                                setGetAllUsersLoading(false)
                            })
                            .catch((err) => {
                                console.log(err)
                                setGetAllUsersLoading(false)
                            })
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

    const changeSort = () => {
        // console.log('called')
        // let arr = [...getAllUsers]
        // arr.reverse()
        // setGetAllUsers(arr)

        setSort(!sort)
    }

    const selectAll = () => {
        let arr = [...selectedToDeliver]
        if (arr.length < getAllUsers.length)
            for (let i = 0; i < getAllUsers.length; i++) {
                if (!findId(getAllUsers[i]._id)) arr.push(getAllUsers[i]._id)
            }

        setSelectedToDeliver(arr)
    }

    const deSelectAll = () => {
        setSelectedToDeliver([])
    }

    const selectThis = (id) => {
        let arr = [...selectedToDeliver]
        if (!findId(id)) arr.push(id)
        setSelectedToDeliver(arr)
    }

    const deSelectThis = (id) => {
        let arr = [...selectedToDeliver]
        arr.splice(id, 1)

        setSelectedToDeliver(arr)
    }

    const findId = (id) => {
        for (let i = 0; i < selectedToDeliver.length; i++) {
            if (selectedToDeliver[i] === id) {
                return true
            }
        }

        return false
    }

    // console.log(page * rowsPerPage, rowsPerPage * (page + 1) - 1)

    const searchME = () => {
        try {
            let userData = document
                .getElementById('search__WINNERDETAILS')
                .value.toUpperCase()

            let container = document.getElementById('searchWINNER_DETAIL__Body')
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

    if (!params.winnerPageId || parseInt(params.winnerPageId) >= 0) {
        return (
            <div className='w-full h-full flex flex-col screen2:pb-16'>
                {/* Top */}
                <div className='flex items-center justify-between w-full screen2:hidden'>
                    <div className='pl-12'>
                        <TitlePage heading={'Winners Detail'} />
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

                        <div className='flex items-center gap-x-4 border-b border-[#222]'>
                            <button
                                className={`${
                                    deliveryType === 1
                                        ? 'border-b'
                                        : 'border-b border-transparent'
                                } px-1`}
                                onClick={() => {
                                    setDeliveryType(1)
                                }}
                            >
                                To Deliver
                            </button>

                            <button
                                className={`${
                                    deliveryType === 2
                                        ? 'border-b'
                                        : 'border-b border-transparent'
                                } px-1`}
                                onClick={() => {
                                    setDeliveryType(2)
                                }}
                            >
                                Already Delivered
                            </button>
                        </div>

                        {getAllUsers && getAllUsers?.length > 0 ? (
                            <>
                                <div className='flex flex-col overflow-x-scroll whitespace-nowrap w-full bg-[#111] rounded-md'>
                                    <div className='overflow-x-auto sm:-mx-6 lg:-mx-8 whitespace-nowrap'>
                                        <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
                                            <div className='overflow-hidden'>
                                                <table
                                                    className={`min-w-full ${styles.table} whitespace-nowrap`}
                                                >
                                                    <thead className='border-b-2 border-[#333]'>
                                                        <tr>
                                                            {deliveryType ===
                                                                1 && (
                                                                <th
                                                                    style={{
                                                                        fontWeight: 600,
                                                                        display:
                                                                            'flex',
                                                                        alignItems:
                                                                            'center',
                                                                        justifyContent:
                                                                            'center',
                                                                    }}
                                                                    scope='col'
                                                                >
                                                                    <CheckBox
                                                                        checked={
                                                                            selectedToDeliver.length ===
                                                                            getAllUsers.length
                                                                        }
                                                                        handleChange={() => {
                                                                            if (
                                                                                selectedToDeliver.length ===
                                                                                getAllUsers.length
                                                                            ) {
                                                                                deSelectAll()
                                                                            } else {
                                                                                selectAll()
                                                                            }
                                                                        }}
                                                                    />
                                                                </th>
                                                            )}
                                                            <th
                                                                style={{
                                                                    fontWeight: 600,
                                                                }}
                                                                scope='col'
                                                            >
                                                                Type
                                                            </th>
                                                            <th
                                                                style={{
                                                                    fontWeight: 600,
                                                                }}
                                                                scope='col'
                                                            >
                                                                Name
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
                                                                Username
                                                            </th>
                                                            <th
                                                                style={{
                                                                    fontWeight: 600,
                                                                }}
                                                                scope='col'
                                                            >
                                                                All Details
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
                                                    <tbody id='searchWINNER_DETAIL__Body'>
                                                        {getAllUsers?.map(
                                                            (val, key) => {
                                                                if (
                                                                    !val.isDelivered &&
                                                                    deliveryType ===
                                                                        1
                                                                )
                                                                    return (
                                                                        <TableBody
                                                                            val={
                                                                                val
                                                                            }
                                                                            key={
                                                                                key
                                                                            }
                                                                            deSelectThis={
                                                                                deSelectThis
                                                                            }
                                                                            selectThis={
                                                                                selectThis
                                                                            }
                                                                            findId={
                                                                                findId
                                                                            }
                                                                        />
                                                                    )
                                                                else if (
                                                                    val.isDelivered &&
                                                                    deliveryType ===
                                                                        2
                                                                )
                                                                    return (
                                                                        <TableBody
                                                                            val={
                                                                                val
                                                                            }
                                                                            key={
                                                                                key
                                                                            }
                                                                            deSelectThis={
                                                                                deSelectThis
                                                                            }
                                                                            selectThis={
                                                                                selectThis
                                                                            }
                                                                            findId={
                                                                                findId
                                                                            }
                                                                        />
                                                                    )
                                                                // else
                                                                //     return (
                                                                //         <TableBody
                                                                //             val={
                                                                //                 val
                                                                //             }
                                                                //             key={
                                                                //                 key
                                                                //             }
                                                                //             deSelectThis={
                                                                //                 deSelectThis
                                                                //             }
                                                                //             selectThis={
                                                                //                 selectThis
                                                                //             }
                                                                //             findId={
                                                                //                 findId
                                                                //             }
                                                                //         />
                                                                //     )
                                                            }
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {selectedToDeliver.length > 0 &&
                                    deliveryType === 1 && (
                                        <div className='flex items-center'>
                                            <button
                                                className={`flex items-center justify-center px-4 py-1 rounded bg-white hover:bg-[#ccc] text-primaryColor font-[700] disabled:opacity-40 disabled:cursor-not-allowed disabled:font-[400]`}
                                                onClick={() => {
                                                    setDelivered()
                                                }}
                                                disabled={getAllUsersLoading}
                                            >
                                                Mark as Delivered
                                            </button>
                                        </div>
                                    )}

                                <div className='flex h-max w-full justify-end'>
                                    <TablePagination
                                        sx={{ filter: 'invert(1)' }}
                                        component='div'
                                        count={size}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        rowsPerPage={rowsPerPage}
                                        rowsPerPageOptions={[]}
                                        // onRowsPerPageChange={
                                        //     handleChangeRowsPerPage
                                        // }
                                    />
                                </div>
                            </>
                        ) : (
                            <div className='flex h-full w-full items-center justify-center text-3xl'>
                                <pre>No Winner Found!</pre>
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    } else {
        return (
            <div className='w-full h-full flex flex-col screen2:pb-16'>
                {/* Top */}
                <div className='flex items-center justify-between w-full screen2:hidden'>
                    <div className='pl-12'>
                        <TitlePage heading={'Winner Details'} />
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

export default WinnerDetails

const TableBody = ({ val, deSelectThis, selectThis, findId }) => {
    const [openModal, setOpenModal] = useState(false)
    const [downloadLoading, setDownloadLoading] = useState(false)

    const downloadCSV = async (e) => {
        setDownloadLoading(true)
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
                `${BACKEND_URL}/users/getNftParticipated`,
                {
                    _id: val.nftId,
                },
                config
            )
            .then(async (res) => {
                const arr = res.data.data
                await exportToCsv(e, val.itemName, arr)
                setDownloadLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setDownloadLoading(false)
            })
    }

    return (
        <tr className=''>
            {!val?.isDelivered && (
                <td className='text-base  whitespace-nowrap font-[400] text-[#c9c9c9] flex items-center justify-center'>
                    <CheckBox
                        checked={findId(val?._id)}
                        handleChange={() => {
                            if (findId(val?._id)) {
                                deSelectThis(val._id)
                            } else {
                                selectThis(val._id)
                            }
                        }}
                    />
                </td>
            )}
            <td className='text-base font-[400] text-[#c9c9c9]'>
                {val?.type === 0
                    ? 'Raffle'
                    : val?.type === 3
                    ? 'Item'
                    : val?.type === 10
                    ? 'Gift Card'
                    : '-'}
            </td>
            <td className='text-base font-[400] text-[#c9c9c9]'>
                <span className=''>{val?.itemName}</span>
            </td>
            <td
                className='text-base  whitespace-nowrap font-[400] text-[#c9c9c9]'
                style={{
                    maxWidth: '180px',
                    overflow: 'scroll',
                }}
            >
                {val?.type === 0 ? '--' : val?.walletAddress}
            </td>
            <td className='text-base font-[400] text-[#c9c9c9]'>
                {val?.type === 0 ? '--' : val?.username || '-'}
            </td>
            <td className='text-base whitespace-nowrap font-[400] text-[#c9c9c9]'>
                <button
                    className={`flex items-center justify-center p-2 py-1 rounded w-full bg-white text-primaryColor font-[700] disabled:opacity-40 disabled:cursor-not-allowed disabled:font-[400]`}
                    onClick={(e) => {
                        if (val?.type === 0) {
                            if (val.nftId) {
                                downloadCSV(e)
                            } else {
                                alert('Raffle Id Missing...')
                            }
                        } else {
                            setOpenModal(true)
                        }
                    }}
                    disabled={downloadLoading}
                >
                    {val?.type === 0
                        ? downloadLoading
                            ? 'Downloading...'
                            : 'Download CSV'
                        : 'More Info'}
                </button>
            </td>

            {openModal && (
                <UserDetailModal
                    walletAddress={val?.walletAddress}
                    openModal={openModal}
                    closeModal={() => setOpenModal(false)}
                />
            )}
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

const CheckBox = ({ checked, handleChange }) => {
    return (
        <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            sx={{
                color: '#242730',
                '&.Mui-checked': {
                    color: '#FFF',
                },
            }}
        />
    )
}
