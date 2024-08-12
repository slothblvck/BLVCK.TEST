import React, { useContext } from 'react'
import TitlePage from './../../components/shared/TitlePage'
import TopSideInfo from './../../components/Dashboard/TopSideInfo'
import { BACKEND_URL, WalletConnectContext } from '../../hooks/WalletLogin'
import { useState } from 'react'
import axios from 'axios'
import { Delete, Edit } from '@mui/icons-material'
import userDefault from '../../assets/userDefault.jpg'

const MyProfile = () => {
    const [edit, setEdit] = useState(true)
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false)
    const {
        userInfo,
        accessToken,
        updateLocalUserInfo,
        disconnectDiscord,
        disconnectTwitter,
    } = useContext(WalletConnectContext)

    const [profileInfo, setProfileInfo] = useState({
        firstName: userInfo?.firstName || '',
        lastName: userInfo?.lastName || '',
        username: userInfo?.username || '',
        bio: userInfo?.bio || '',
        profileImage:
            userInfo.profileImage || userDefault,
        email: userInfo?.email || '',
        mobile: userInfo?.mobile || '',
        burnerWalletEthereum: userInfo?.burnerWalletEthereum || '',
        burnerWalletSolana: userInfo?.burnerWalletSolana || '',
    })

    const saveProfile = async () => {
        try {
            const config = {
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${accessToken}`,
                },
            }

            if (accessToken) {
                setLoading(true)

                const formData = new FormData()
                formData.append('file', profileInfo.profileImage)
                formData.append('upload_preset', 'FoxLedgerStudio-BLVCK')

                if (typeof profileInfo.profileImage === 'object') {
                    await axios
                        .post(
                            'https://api.cloudinary.com/v1_1/foxledgerstudio/image/upload/',
                            formData
                        )
                        .then(async (res) => {
                            await axios
                                .post(
                                    `${BACKEND_URL}/users/updateUserProfile`,
                                    {
                                        _id: userInfo._id,
                                        firstName: profileInfo.firstName,
                                        lastName: profileInfo.lastName,
                                        username:
                                            profileInfo.username.toLowerCase(),
                                        bio: profileInfo.bio,
                                        email: profileInfo.email,
                                        profileImage: res.data.url,
                                        mobile: profileInfo.mobile,
                                        burnerWalletEthereum:
                                            profileInfo.burnerWalletEthereum,
                                        burnerWalletSolana:
                                            profileInfo.burnerWalletSolana,
                                    },
                                    config
                                )
                                .then((res) => {
                                    if (res.data.msg) {
                                        setErr(res.data.msg)
                                    } else {
                                        setErr('')
                                    }
                                    updateLocalUserInfo()
                                    // setEdit(false)
                                    setLoading(false)
                                })
                                .catch((err) => {
                                    console.log(err)
                                    // setEdit(false)
                                    setLoading(false)
                                })
                        })
                        .catch((err) => {
                            console.log(err)
                            setLoading(false)
                            // setEdit(false)
                        })
                } else {
                    await axios
                        .post(
                            `${BACKEND_URL}/users/updateUserProfile`,
                            {
                                _id: userInfo._id,
                                firstName: profileInfo.firstName,
                                lastName: profileInfo.lastName,
                                username: profileInfo.username.toLowerCase(),
                                bio: profileInfo.bio,
                                email: profileInfo.email,
                                profileImage: profileInfo.profileImage,
                                mobile: profileInfo.mobile,
                                burnerWalletEthereum:
                                    profileInfo.burnerWalletEthereum,
                                burnerWalletSolana:
                                    profileInfo.burnerWalletSolana,
                            },
                            config
                        )
                        .then((res) => {
                            if (res.data.msg) {
                                setErr(res.data.msg)
                            } else {
                                setErr('')
                            }
                            updateLocalUserInfo()
                            // setEdit(false)
                            setLoading(false)
                        })
                        .catch((err) => {
                            console.log(err)
                            if (err?.response?.data?.msg) {
                                setErr(err.response.data.msg)
                            }
                            // setEdit(false)
                            setLoading(false)
                        })
                }
            }
        } catch (error) {
            console.log(error)
            // setEdit(false)
            setLoading(false)
        }
    }

    const connectTwitter = async () => {
        try {
            await axios
                .post(`${BACKEND_URL}/auth/twitter/reverse`)
                .then((res) => {
                    window.location.assign(
                        `https://api.twitter.com/oauth/authorize?oauth_token=${res.data.oauth_token}`
                    )
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (err) {
            console.log(err)
        }
    }

    const styles = {
        label: `text-[#B1B5C3] text-sm font-[700]`,
        input: `border border-[#242730] w-full bg-transparent outline-none rounded px-3 py-2 text-sm text-white placeholder:text-[#454850] mt-2 min-h-10 `,
        button: `rounded-full px-7 py-1 bg-[#fff] text-[#111] font-[700] mt-2 hover:bg-[#ffffff68] hover:text-white`,
    }
    return (
        <div className='w-full h-full flex flex-col screen2:pb-32'>
            {/* Top */}
            <div className='flex items-center justify-between w-full screen2:hidden'>
                <div className='pl-12'>
                    <TitlePage heading={'My Profile'} />
                </div>
                <div className='min-w-[330px] border-borderLine'>
                    <TopSideInfo />
                </div>
            </div>

            <div
                style={{ overflow: 'auto' }}
                className='flex flex-col p-6 screen3:px-4 gap-y-4 newpages-8rem'
            >
                <div className='flex w-full flex-col gap-y-3'>
                    {/* Profile Image */}
                    {/* Basic Information */}
                    <div style={{ marginTop: '20px' }} className='flex w-full items-center justify-between'>
                        <h1 className='font-[800] text-xl'>BASIC INFO</h1>

                        <button
                            style={{ borderRadius: '4px' }}
                            className={`${styles.button} disabled:cursor-not-allowed mynewbtnclass`}
                            onClick={() => {
                                saveProfile()
                            }}
                            disabled={loading || profileInfo.email === '' || profileInfo.username === ''}
                        >
                            {loading ? 'Updating...' : 'Save Changes'}
                        </button>
                    </div>

                    {/*  */}

                    {err && !err.includes('Username') && (
                        <span className='text-red-500 text-sm font-bold'>
                            {err}
                        </span>
                    )}

                    <div
                        className={`w-full p-4 px-10 gap-2 pb-5 flex h-min bg-[#111] rounded-lg gap-x-10 items-center  screen4:px-5 screen3:flex-col`}
                    >
                        {/* IMAGE */}
                        <div
                            style={{ height: '10rem', width: '10rem' }}
                            className='min-w-[10rem] min-h-[10rem] rounded-full overflow-hidden relative'
                        >
                            <img
                                src={
                                    typeof profileInfo.profileImage === 'object'
                                        ? URL.createObjectURL(
                                              profileInfo.profileImage
                                          )
                                        : profileInfo.profileImage
                                }
                                alt=''
                                style={{ height: '10rem', width: '10rem' }}
                                className='object-cover'
                            />
                            {edit && (
                                <>
                                    <input
                                        type='file'
                                        id='updloadProfileImage'
                                        className='hidden'
                                        onChange={(e) => {
                                            setProfileInfo((state) => ({
                                                ...state,
                                                profileImage: e.target.files[0],
                                            }))
                                        }}
                                    />
                                    <label
                                        className='absolute w-full h-full rounded-full flex items-center justify-center z-1 top-0 left-0 bg-[#000000ad] cursor-pointer'
                                        htmlFor='updloadProfileImage'
                                    >
                                        <Edit />
                                    </label>
                                </>
                            )}
                        </div>
                        {/* NAME */}
                        <div
                            style={{ gap: '20px' }}
                            className='flex flex-col w-full gap-y-5'
                        >
                            <div style={{ gap: '20px' }} className='flex'>
                                <div className='flex flex-col w-full'>
                                    <label
                                        htmlFor=''
                                        className={`${styles.label}`}
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type='text'
                                        className={`${styles.input}${
                                            edit ? '' : ''
                                        }`}
                                        placeholder={`First Name`}
                                        value={profileInfo.firstName}
                                        onChange={(e) => {
                                            setProfileInfo((state) => ({
                                                ...state,
                                                firstName: e.target.value,
                                            }))
                                        }}
                                        disabled={!edit}
                                    />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <label
                                        htmlFor=''
                                        className={`${styles.label}`}
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type='text'
                                        className={`${styles.input} ${
                                            edit ? '' : ''
                                        }`}
                                        placeholder={`Last Name`}
                                        value={profileInfo.lastName}
                                        onChange={(e) => {
                                            setProfileInfo((state) => ({
                                                ...state,
                                                lastName: e.target.value,
                                            }))
                                        }}
                                        disabled={!edit}
                                    />
                                </div>
                            </div>
                            <div style={{ gap: '20px' }} className='flex'>
                                <div className='flex flex-col w-full'>
                                    <label
                                        htmlFor=''
                                        className={`${styles.label}`}
                                    >
                                        Email *
                                    </label>
                                    <input
                                        type='email'
                                        className={`${styles.input} ${
                                            edit ? '' : ''
                                        } invalid:border-red-500 invalid:text-red-500`}
                                        placeholder={`Johndoe@gmail.com`}
                                        value={profileInfo.email}
                                        onChange={(e) => {
                                            setProfileInfo((state) => ({
                                                ...state,
                                                email: e.target.value,
                                            }))
                                        }}
                                        disabled={!edit}
                                    />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <label
                                        htmlFor=''
                                        className={`${styles.label}`}
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type='number'
                                        className={`${styles.input} ${
                                            edit ? '' : ''
                                        }`}
                                        placeholder={`eg. +33 786-567-456`}
                                        value={profileInfo.mobile}
                                        onChange={(e) => {
                                            setProfileInfo((state) => ({
                                                ...state,
                                                mobile: e.target.value,
                                            }))
                                        }}
                                        disabled={!edit}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`w-full p-4 px-10 gap-2 pb-5 flex h-min bg-[#111] rounded-lg gap-x-10 items-center  screen4:px-5`}
                    >
                        <div className='flex flex-col w-full gap-y-5'>
                            <div className='flex flex-col w-full'>
                                <label htmlFor='' className={`${styles.label}`}>
                                    User Name *
                                </label>
                                <input
                                    type='text'
                                    className={`${styles.input} invalid:border-red-500`}
                                    placeholder={`User Name`}
                                    value={profileInfo.username}
                                    onKeyDown={(e) => {
                                        if (e.key === 'whitespace') return false
                                    }}
                                    onChange={(e) => {
                                        setProfileInfo((state) => ({
                                            ...state,
                                            username: e.target.value?.replace(
                                                /\s/g,
                                                ''
                                            ),
                                        }))
                                    }}
                                />
                            </div>
                            {err && err.includes('Username') && (
                                <span style={{ marginTop: '-10px' }} className='text-red-500 text-sm font-bold'>
                                    {err}
                                </span>
                            )}
                            {/*  */}
                            <div className='flex flex-col w-full'>
                                <label htmlFor='' className={`${styles.label}`}>
                                    Bio
                                </label>
                                <textarea
                                    rows={5}
                                    type='text'
                                    className={`${styles.input} ${
                                        edit ? '' : ''
                                    }`}
                                    placeholder={`Bio`}
                                    value={profileInfo.bio}
                                    onChange={(e) => {
                                        setProfileInfo((state) => ({
                                            ...state,
                                            bio: e.target.value,
                                        }))
                                    }}
                                    disabled={!edit}
                                />
                            </div>
                            {/*  */}
                            <div className='flex flex-col w-full'>
                                <label htmlFor='' className={`${styles.label}`}>
                                    Burner Wallet (Ethereum)
                                </label>
                                <input
                                    type='text'
                                    className={`${styles.input} ${
                                        edit ? '' : ''
                                    }`}
                                    placeholder={`Burner Wallet (Eth)`}
                                    value={profileInfo.burnerWalletEthereum}
                                    onChange={(e) => {
                                        setProfileInfo((state) => ({
                                            ...state,
                                            burnerWalletEthereum:
                                                e.target.value,
                                        }))
                                    }}
                                    disabled={!edit}
                                />
                            </div>
                            {/*  */}
                            <div className='flex flex-col w-full'>
                                <label htmlFor='' className={`${styles.label}`}>
                                    Burner Wallet (Solana)
                                </label>
                                <input
                                    type='text'
                                    className={`${styles.input} ${
                                        edit ? '' : ''
                                    }`}
                                    placeholder={`Burner Wallet (Solana)`}
                                    value={profileInfo.burnerWalletSolana}
                                    onChange={(e) => {
                                        setProfileInfo((state) => ({
                                            ...state,
                                            burnerWalletSolana: e.target.value,
                                        }))
                                    }}
                                    disabled={!edit}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Other Links */}
                    <h1 className='font-[800] text-xl'>CONNECT SOCIAL</h1>
                    <div
                        className={`w-full p-4 px-10 gap-2 pb-5 flex h-min bg-[#111] rounded-lg gap-x-10 items-center  screen4:px-5`}
                    >
                        <div className='flex flex-col w-full gap-y-5'>
                            <div className='flex flex-col w-full'>
                                <label htmlFor='' className={`${styles.label}`}>
                                    Discord Name
                                </label>
                                {userInfo?.discordInfo ? (
                                    <div className='flex w-full items-center gap-1'>
                                        <a
                                            type='text'
                                            className={`${styles.input}`}
                                            placeholder={`https://discord.com/users/xyz`}
                                            href={`https://discordapp.com/users/${userInfo?.discordInfo?.id}`}
                                            rel='noreferrer'
                                            target={`_blank`}
                                            disabled
                                            // value={''}
                                            // onChange={(e) => {}}
                                        >
                                            {userInfo?.discordInfo?.username}
                                        </a>
                                        <button
                                            className={`${styles.button} rounded hover:bg-[#ddd] hover:text-[#000]`}
                                            onClick={() => disconnectDiscord()}
                                        >
                                            DISCONNECT
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        type='text'
                                        className={`${styles.input} bg-[#fff] text-[#111] font-[700]`}
                                        onClick={() => {
                                            window.location.assign(
                                                process.env
                                                    .REACT_APP_DISCORD_URL
                                            )
                                        }}
                                    >
                                        Connect Discord
                                    </button>
                                )}
                            </div>
                            {/* <div className='flex flex-col w-full'>
                                <label htmlFor='' className={`${styles.label}`}>
                                    Twitter Name
                                </label>
                                {userInfo?.isTwitterConnected ? (
                                    <div className='flex w-full items-center gap-1'>
                                        <a
                                            type='text'
                                            className={`${styles.input} relative`}
                                            placeholder={`https://twitter.com/xyz`}
                                            href={`https://twitter.com/${userInfo?.twitterProvider?.screen_name}`}
                                            rel='noreferrer'
                                            target={`_blank`}
                                            disabled
                                            // value={''}
                                            // onChange={(e) => {}}
                                        >
                                            {
                                                userInfo?.twitterProvider
                                                    ?.screen_name
                                            }
                                        </a>
                                        <button
                                            className={`${styles.button} rounded hover:bg-[#ddd] hover:text-[#000]`}
                                            onClick={() => disconnectTwitter()}
                                        >
                                            DISCONNECT
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        type='text'
                                        className={`${styles.input} bg-[#fff] text-[#111] font-[700]`}
                                        onClick={() => {
                                            connectTwitter()
                                        }}
                                    >
                                        Connect Twitter
                                    </button>
                                )}
                            </div> */}
                        </div>
                    </div>

                    {/* Buttons */}
                    {/* <div className='flex w-full gap-x-4'>
                        {edit ? (
                            <button
                                className={styles.button}
                                onClick={() => {
                                    saveProfile()
                                }}
                                disabled={loading}
                            >
                                {loading ? 'Updating...' : 'Save'}
                            </button>
                        ) : (
                            <button
                                className={styles.button}
                                onClick={() => {
                                    setEdit(true)
                                }}
                            >
                                Edit
                            </button>
                        )}
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default MyProfile
