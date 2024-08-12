import { Fragment, useEffect, useState } from 'react'
import { useContext } from 'react'
import { WalletConnectContext } from '../../../hooks/WalletLogin'
import CloseSvg from '../../../assets/svg/CloseSvg'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Chip } from '@mui/material'

const styles = {
    label: `text-[#A3A3A3] text-[14px] font-[400]`,
    input: `border border-[#525252] w-full bg-transparent outline-none rounded px-3 py-2 text-sm text-white placeholder:text-[#A3A3A3] mt-2 h-10 focus:border-[#FFF] focus:border-3`,
    textArea: `border border-[#525252] w-full bg-transparent outline-none rounded px-3 py-2 text-sm text-white placeholder:text-[#A3A3A3] mt-2 focus:border-[#FFF] focus:border-3`,
    nftType: `w-full h-[50px] rounded-md p-2 flex items-center justify-center text-sm bg-lightBlue disabled:cursor-not-allowed text-center`,
}

const CreateEvent = ({partner, setOpen }) => {
    const {
        isWalletLogin,
        fetchEvents,
        eventCreateLoading,
        userInfo,
        createEvent: createEventAction,
        updateEvent: updateEventAction
    } = useContext(WalletConnectContext)
    const [prevState, setPrevState] = useState({
        name: '',
        description: '',
        image: '',
        instagram: '',
        websiteLink: '',
        discord: '',
        opensea: '',
        twitter: '',
        date: '',
        timer: '',
        category: '',
        country: '',
        address: '',
        comingSoon: false
    })
    const [error, setError] = useState(null)
    const [nftInfo, setNftInfo] = useState({
        name: '',
        description: '',
        image: '',
        instagram: '',
        websiteLink: '',
        discord: '',
        opensea: '',
        twitter: '',
        category: '',
        country: '',
        address: '',
        comingSoon: false
    })
    const [timer, setTimer] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        if (partner) {
            try {
                let new_date = new Date(partner.expireAt)
                let new_date_1 = new_date.setDate(new_date.getDate())
                let new__new_date = new Date(new_date_1)
                setDate(new__new_date.toJSON().split('T')[0])
                setTimer(new_date.toTimeString().split(' ')[0])

                setNftInfo({
                    name: partner.name,
                    description: partner.description,
                    image: partner.image,
                    instagram: partner.instagram,
                    websiteLink: partner.websiteLink,
                    discord: partner.discord,
                    opensea: partner.opensea,
                    twitter: partner.twitter,
                    category: partner.category,
                    country: partner.country,
                    address: partner.address,
                    comingSoon: partner.comingSoon
                })

                setPrevState({
                    name: partner.name,
                    description: partner.description,
                    image: partner.image,
                    instagram: partner.instagram,
                    websiteLink: partner.websiteLink,
                    discord: partner.discord,
                    date: new__new_date.toJSON().split('T')[0],
                    timer: new_date.toTimeString().split(' ')[0],
                    opensea: partner.opensea,
                    twitter: partner.twitter,
                    category: partner.category,
                    country: partner.country,
                    address: partner.address,
                    comingSoon: partner.comingSoon
                })
            } catch (err) {
                console.log(err)
            }
        }
    }, [partner])

    const isChanged = () => {
        if (
            prevState.name === nftInfo.name &&
            prevState.description === nftInfo.description &&
            prevState.image === nftInfo.image &&
            prevState.discord === nftInfo.discord &&
            prevState.opensea === nftInfo.opensea &&
            prevState.websiteLink === nftInfo.websiteLink &&
            prevState.twitter === nftInfo.twitter &&
            prevState.category === nftInfo.category &&
            prevState.timer === timer &&
            prevState.date === date &&
            prevState.country === nftInfo.country &&
            prevState.address === nftInfo.address &&
            prevState.comingSoon === nftInfo.comingSoon
        ) {
            return false
        }
        return true
    }

    const deletePartner = async () => {
        if (isWalletLogin) {
            setOpen(false)
            // await deleteNft(partner._id)
            // await fetchOngoing('ongoing')
            await fetchEvents()
        } else {
            setError('Connect Your Wallet')
            return
        }
    }

    const createNewPartner = async () => {
        if (isWalletLogin) {
            if (isValid()) {
                let date1 = await new Date(
                    date.split('-')[0],
                    date.split('-')[1] - 1,
                    date.split('-')[2],
                    timer.split(':')[0],
                    timer.split(':')[1]
                )
                date1 = new Date(date1).getTime()
                date1 = new Date(date1).toJSON()

                if (
                    new Date(date1).getTime() < Date.now() &&
                    date !== '' &&
                    timer !== ''
                ) {
                    setError('Deadline Cannot be less than current date')
                } else {
                    setError('')
                    setOpen(false)
                    await createEventAction(nftInfo, date1)
                    await fetchEvents()
                    resetState()
                }
            } else {
                setError('All Fields are required!')
            }
        } else {
            setError('Connect Your Wallet')
            return
        }
    }

    const UpdatePartner = async () => {
        if (isWalletLogin) {
            if (isChanged) {
                // setError('')
                setOpen(false)
                if (isValid()) {
                    let date1 = await new Date(
                        date.split('-')[0],
                        date.split('-')[1] - 1,
                        date.split('-')[2],
                        timer.split(':')[0],
                        timer.split(':')[1]
                    )
                    date1 = new Date(date1).getTime()
                    date1 = new Date(date1).toJSON()

                    // if (
                    //     new Date(date1).getTime() < Date.now() &&
                    //     date !== '' &&
                    //     timer !== ''
                    // ) {
                    //     setError('Deadline Cannot be less than current date')
                    // } 
                    if (
                        false
                    ) {
                        setError('Deadline Cannot be less than current date')
                    } 
                    else {
                        setError('')
                        setOpen(false)
                        await updateEventAction(nftInfo, date1, partner?._id)
                        await fetchEvents()
                        resetState()
                    }
                } else {
                    setError('All Fields are required!')
                }
            } else {
                setError('All Okay!')
            }
        } else {
            setError('Connect Your Wallet')
            return
        }
    }

    const isValid = () => {
        if (
            nftInfo.price === '' ||
            nftInfo.name === '' ||
            nftInfo.description === '' ||
            nftInfo.websiteLink === '' ||
            nftInfo.country === '' ||
            nftInfo.country === '' ||
            timer === '' ||
            date === '' ||
            nftInfo.category === ''
        ) {
            return false
        }
        return true
    }

    // console.log('VALID', isValid())

    const resetState = () => {
        setNftInfo({
            name: '',
            description: '',
            image: '',
            instagram: '',
            websiteLink: '',
            discord: '',
            opensea: '',
            twitter: '',
            country: '',
            address: '',
            comingSoon: false
        })
        setDate('')
        setTimer('')
    }

    return (
        <div className='flex flex-col bg-transparent text-left transform transition-all align-middle w-[500px] max-w-lg h-screen relative overflow-scroll py-4 pb-0'
            style={{
                background: 'linear-gradient(348.79deg, #0F0F10 0%, #212227 100.66%)',
                position: 'relative'
            }}
        >
            <div
                className={`w-full flex items-center justify-between pb-2 px-6`}
            >
                <h2 className='font-[700] font-[Montserrat] text-[32px] leading-[48px] text-center text-white'>
                    {partner ? 'Update Event' : 'Create Event'}
                </h2>
                {/* Close Button */}
                <div
                    className={`absolute rounded-full top-[25px] right-[12px] p-[6px] bg-white text-primaryColor cursor-pointer`}
                    onClick={() => {
                        setOpen(false)
                        resetState()
                    }}
                >
                    <CloseSvg />
                </div>
            </div>

            <div
                className={`w-full rounded-b-lg flex items-start flex-col gap-y-6 px-6 pb-4`}
            >
                {/* Item Name */}
                <div className='flex flex-col w-full'>
                    <label htmlFor='' className={`${styles.label}`}>
                        Title
                    </label>
                    <input
                        type='text'
                        className={`${styles.input}`}
                        placeholder={`Title`}
                        value={nftInfo.name}
                        onChange={(e) =>
                            setNftInfo((state) => ({
                                ...state,
                                name: e.target.value,
                            }))
                        }
                    />
                </div>

                {/* Description */}
                <div className='flex flex-col  w-full'>
                    <label htmlFor='' className={`${styles.label}`}>
                        Description
                    </label>
                    <textarea
                        type='text'
                        className={`${styles.textArea}`}
                        placeholder={`Description`}
                        value={nftInfo.description}
                        onChange={(e) =>
                            setNftInfo((state) => ({
                                ...state,
                                description: e.target.value,
                            }))
                        }
                        rows={4}
                    />
                </div>

                {/* Website */}
                <div className='flex flex-col  w-full'>
                    <label htmlFor='' className={`${styles.label}`}>
                        Website Link
                    </label>
                    <input
                        type='text'
                        className={`${styles.input}`}
                        placeholder={`https://xyz.com`}
                        value={nftInfo.websiteLink}
                        onChange={(e) =>
                            setNftInfo((state) => ({
                                ...state,
                                websiteLink: e.target.value,
                            }))
                        }
                        rows={4}
                    />
                </div>

                {/* Address */}
                <div className='flex flex-col  w-full'>
                    <label htmlFor='' className={`${styles.label}`}>
                        Address
                    </label>
                    <input
                        type='text'
                        className={`${styles.input}`}
                        placeholder={`Address`}
                        value={nftInfo.address}
                        onChange={(e) =>
                            setNftInfo((state) => ({
                                ...state,
                                address: e.target.value,
                            }))
                        }
                        rows={4}
                    />
                </div>

                {/* Country */}
                <div className='flex flex-col  w-full'>
                    <label htmlFor='' className={`${styles.label}`}>
                        Country
                    </label>
                    <input
                        type='text'
                        className={`${styles.input}`}
                        placeholder={`Country`}
                        value={nftInfo.country}
                        onChange={(e) =>
                            setNftInfo((state) => ({
                                ...state,
                                country: e.target.value,
                            }))
                        }
                        rows={4}
                    />
                </div>

                {/* Category */}
                <div className='flex flex-col w-full'>
                    <label htmlFor='' className={`${styles.label}`}>
                        Category
                    </label>
                    <select className={`${styles.input} outline-none focus:outline-none focus:border-[#525252]`} value={nftInfo.category}
                    onChange={(e) => {
                        setNftInfo((state) => ({
                            ...state,
                            category: e.target.value,
                        }))
                    }}>
                        <option className='bg-[#111]' value="">Select</option>
                        {userInfo?.isSuperAdmin && <option className='bg-[#111]' value="FeaturedEvent">Featured Event</option>}
                        <option className='bg-[#111]' value="CommunityEvent">Community Event</option>
                    </select>
                </div>

                {/* Upload File */}
                <div className='flex flex-col w-full'>
                    <label htmlFor='' className={`${styles.label}`}>
                        Upload Picture
                    </label>
                    <input
                        type='file'
                        id='uploadNFT'
                        className='hidden'
                        onChange={(e) => {
                            setNftInfo((state) => ({...state, image: e.target.files[0]}))
                        }}
                    />
                    {nftInfo?.image ? (
                        <div className='flex w-full rounded-lg px-4 py-3 bg-secondaryColor mt-2 cursor-pointer justify-between items-center'>
                            <img
                                src={
                                    typeof nftInfo?.image === 'object'
                                        ? URL.createObjectURL(nftInfo?.image)
                                        : nftInfo?.image
                                }
                                alt='nft'
                                className='w-16 h-16 rounded-xl object-cover'
                            />
                            <span
                                className='rounded-full flex items-center justify-center bg-[#ffffffd1] text-3xl text-black cursor-pointer p-1'
                                onClick={() => setNftInfo((state) => ({...state, image: null}))}
                            >
                                <CloseSvg />
                            </span>
                        </div>
                    ) : (
                        <label
                            className='flex w-full rounded-md border border-dashed border-lightBlue h-[100px] mt-2 cursor-pointer justify-center items-center'
                            htmlFor='uploadNFT'
                        >
                            <p className='text-[#ffffffa7] text-sm font-[400] text-center'>
                                PNG, JPG, JPEG, WEBP or GIF (Max 10MB)
                            </p>
                        </label>
                    )}
                </div>

                {/* Deadline */}
                <div className='flex flex-col w-full'>
                    <div className='flex items-center gap-x-4'>
                        <div className='flex flex-col w-full'>
                            <label
                                htmlFor=''
                                className={`${styles.label}`}
                            >
                                DEADLINE DATE
                            </label>
                            <input
                                type='date'
                                className={`${styles.input}`}
                                value={date}
                                onChange={(e) => {
                                    setDate(e.target.value)
                                }}
                            />
                        </div>
                        <div className='flex flex-col w-full'>
                            <label
                                htmlFor=''
                                className={`${styles.label}`}
                            >
                                DEADLINE TIME
                            </label>
                            <input
                                type='time'
                                className={`${styles.input}`}
                                value={timer}
                                onChange={(e) => {
                                    setTimer(e.target.value)
                                }}
                                // min={new Date.now()}
                            />
                        </div>
                    </div>
                </div>

                {userInfo?.isSuperAdmin && <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '20px',
                        color: 'rgba(163, 163, 163, 1)',
                        fontSize: '18px',
                }} className='flex flex-col w-full'>
                    <p>Active Subscription</p> 
                    <input
                    checked={!nftInfo.comingSoon}
                    onChange={(e) =>
                        setNftInfo((state) => ({
                            ...state,
                            comingSoon: !e.target.checked,
                        }))
                    }
                    type="checkbox" />
                </div>}

                {/* Participation */}
                {/* <div className='flex flex-col  w-full'>
                    <label htmlFor='' className={`${styles.label}`}>
                        Website Link
                    </label>
                    <div className='flex items-center w-full'>
                        <input
                            type='text'
                            className={`${styles.input} rounded-r-none`}
                            placeholder={`Placeholder`}
                            value={nftInfo.websiteLink}
                            onChange={(e) =>
                                setNftInfo((state) => ({
                                    ...state,
                                    websiteLink: e.target.value,
                                }))
                            }
                        />
                    </div> */}
                {/* </div> */}

                {/* Participation */}
                {/* <div className='flex flex-col  w-full'>
                    <label htmlFor='' className={`${styles.label}`}>
                        Twitter
                    </label>
                    <div className='flex items-center w-full'>
                        <input
                            type='text'
                            className={`${styles.input} rounded-r-none`}
                            placeholder={`Placeholder`}
                            value={nftInfo.twitter}
                            onChange={(e) =>
                                setNftInfo((state) => ({
                                    ...state,
                                    twitter: e.target.value,
                                }))
                            }
                        />
                    </div>
                </div> */}

                {/* Participation */}
                {/* <div className='flex flex-col  w-full'>
                    <label htmlFor='' className={`${styles.label}`}>
                        Instagram
                    </label>
                    <div className='flex items-center w-full'>
                        <input
                            type='text'
                            className={`${styles.input} rounded-r-none`}
                            placeholder={`Placeholder`}
                            value={nftInfo.instagram}
                            onChange={(e) =>
                                setNftInfo((state) => ({
                                    ...state,
                                    instagram: e.target.value,
                                }))
                            }
                        />
                    </div>
                </div> */}

                {/* Participation */}
                {/* <div className='flex flex-col  w-full'>
                    <label htmlFor='' className={`${styles.label}`}>
                        OpenSea
                    </label>
                    <div className='flex items-center w-full'>
                        <input
                            type='text'
                            className={`${styles.input} rounded-r-none`}
                            placeholder={`Placeholder`}
                            value={nftInfo.opensea}
                            onChange={(e) =>
                                setNftInfo((state) => ({
                                    ...state,
                                    opensea: e.target.value,
                                }))
                            }
                        />
                    </div>
                </div> */}

                {/* Participation */}
                {/* <div className='flex flex-col  w-full'>
                    <label htmlFor='' className={`${styles.label}`}>
                        Discord
                    </label>
                    <div className='flex items-center w-full'>
                        <input
                            type='text'
                            className={`${styles.input} rounded-r-none`}
                            placeholder={`Placeholder`}
                            value={nftInfo.discord}
                            onChange={(e) =>
                                setNftInfo((state) => ({
                                    ...state,
                                    discord: e.target.value,
                                }))
                            }
                        />
                    </div>
                </div> */}
            </div>

            {/* Create Button */}
            <div className='bg-[#111] sticky bottom-0 w-full left-0 px-6 py-4'>
                {error && (
                    <span className='text-xs font-[600] text-red-500'>
                        {error}
                    </span>
                )}
                {partner ? (
                    <div className='w-full flex items-center gap-x-4'>
                        <button
                            className={`flex items-center justify-center p-2 rounded w-full ${'outline outline-red-700'} `}
                            onClick={() => deletePartner()}
                        >
                            Delete
                        </button>
                        <button
                            className={`flex items-center justify-center p-2 rounded w-full ${
                                isChanged() && isValid()
                                    ? 'bg-white text-primaryColor font-[700]'
                                    : 'bg-activityBg cursor-not-allowed font-[400]'
                            } `}
                            onClick={() => UpdatePartner()}
                            disabled={!(isChanged() && isValid())}
                        >
                            Update
                        </button>
                    </div>
                ) : (
                    <button
                        className={`flex items-center justify-center p-2 rounded w-full ${
                            isValid()
                                ? 'bg-white text-primaryColor font-[700]'
                                : 'bg-white text-[#000] cursor-not-allowed font-[400]'
                        } `}
                        onClick={() => createNewPartner()}
                        disabled={!isValid()}
                    >
                        {eventCreateLoading ? 'Creating...' : 'Create'}
                    </button>
                )}
            </div>
        </div>
    )
}

export default CreateEvent
