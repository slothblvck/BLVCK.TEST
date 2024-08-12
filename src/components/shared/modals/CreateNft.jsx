import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import logo from '../../../assets/svg/BlvckCoin.svg'
import { useContext } from 'react'
import { WalletConnectContext } from '../../../hooks/WalletLogin'
import DiscordRoleSelect from '../DiscordRoleSelect'
import CloseSvg from '../../../assets/svg/CloseSvg'
import CheckBox from '../CheckBox'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const styles = {
    label: `text-[#B1B5C3] text-sm font-[700]`,
    input: `border border-[#242730] w-full bg-transparent outline-none rounded px-3 py-2 text-sm text-white placeholder:text-[#454850] mt-2 h-10`,
    nftType: `w-full h-[50px] rounded-md p-2 flex items-center justify-center text-sm bg-lightBlue disabled:cursor-not-allowed text-center`,
}

const CreateNft = ({ openModal, setOpenModal, nft, toggleDrawer }) => {
    const cancelButtonRef = useRef(null)
    const {
        createNft,
        isWalletLogin,
        fetchNfts,
        updateNft,
        deleteNft,
        fetchOngoing,
    } = useContext(WalletConnectContext)
    const [prevState, setPrevState] = useState({
        name: '',
        description: '',
        price: '',
        nftType: '',
        date: '',
        timer: '',
        nftImage: '',
        personName: [],
        defaultRoleLimit: '',
        specialRoleLimit: '',
        winnersCount: '',
        totalSupply: '',
        checked: true,
        checkedStock: true,
        stakingDays: 0,
        sharkSupply: 1,
        whalesSupply: 1,
        humpBackSupply: 1,
    })
    const [isRaffleLocked, setRaffleLocked] = useState(false)
    const [extraEnteries, setExtraEnteries] = useState(false)
    const [personName, setPersonName] = useState([])
    const [isScratchLocked, setScratchLocked] = useState(false)
    const [checked, setChecked] = useState(true)
    const [checkedStock, setCheckedStock] = useState(true)
    const [error, setError] = useState(null)
    const [winnersCount, setWinnersCount] = useState(1)
    const [nftImage, setNftImage] = useState(null)
    const [nftType, setNftType] = useState(-1)
    const [totalSupply, setTotalSupply] = useState(1)
    const [sharkSupply, setSharkSupply] = useState(1)
    const [whalesSupply, setWhalesSupply] = useState(1)
    const [humpBackSupply, setHumpBackSupply] = useState(1)
    const [defaultRoleLimit, setDefaultRoleLimit] = useState(1)
    const [specialRoleLimit, setSpecialRoleLimit] = useState(1)
    const [timer, setTimer] = useState('')
    const [date, setDate] = useState('')
    const [questions, setQuestions] = useState([''])
    const [nftInfo, setNftInfo] = useState({
        name: '',
        description: '',
        price: '',
        stakingDays: 0,
    })

    useEffect(() => {
        if (nft) {
            try {
                setNftInfo({
                    name: nft.name,
                    description: nft.description,
                    price: nft.price.split(' ')[0],
                    stakingDays: nft.stakingDays,
                })
                setSharkSupply(nft.sharkSupply)
                setWhalesSupply(nft.whalesSupply)
                setHumpBackSupply(nft.humpBackSupply)
                setExtraEnteries(nft.extraEnteries)
                setNftImage(nft.nftImage)
                setNftType(nft.nftType)
                setSpecialRoleLimit(nft.specialRoleLimit)
                setDefaultRoleLimit(nft.defaultRoleLimit)
                setPersonName(nft.personName)
                // console.log('PUT: ', nft.winnersCount)
                setWinnersCount(nft.winnersCount)
                setTotalSupply(nft.totalSupply)
                setChecked(nft.allowAllToParticipate)
                setCheckedStock(nft.checkStakeInStock)
                setQuestions(nft.questions)

                if (nft.nftType === 0 || nft.nftType === 1) {
                    setRaffleLocked(true)
                }
                if (nft.nftType === 2) {
                    setScratchLocked(true)
                }
                if (nft.timer !== ' ') {
                    let new_date = new Date(nft.timer)
                    let new_date_1 = new_date.setDate(new_date.getDate())
                    let new__new_date = new Date(new_date_1)

                    setDate(new__new_date.toJSON().split('T')[0])
                    setTimer(new_date.toTimeString().split(' ')[0])
                    // console.log(new_date.setMonth(new_date.getMonth() + 1))

                    setPrevState({
                        name: nft.name,
                        description: nft.description,
                        price: nft.price.split(' ')[0],
                        nftImage: nft.nftImage,
                        date: new__new_date.toJSON().split('T')[0],
                        timer: new_date.toTimeString().split(' ')[0],
                        nftType: nft.nftType,
                        personName: nft.personName,
                        defaultRoleLimit: nft.defaultRoleLimit,
                        specialRoleLimit: nft.specialRoleLimit,
                        winnersCount: nft.winnersCount,
                        totalSupply: nft.totalSupply,
                        checked: nft.allowAllToParticipate,
                        questions: nft.questions,
                        stakingDays: nft.stakingDays,
                        checkedStock: nft.checkStakeInStock,
                        extraEnteries: nft.extraEnteries,
                        sharkSupply: nft.sharkSupply,
                        whalesSupply: nft.whalesSupply,
                        humpBackSupply: nft.humpBackSupply,
                    })
                } else {
                    setDate('')
                    setTimer('')
                    // console.log(new_date.setMonth(new_date.getMonth() + 1))

                    setPrevState({
                        name: nft.name,
                        description: nft.description,
                        price: nft.price.split(' ')[0],
                        nftImage: nft.nftImage,
                        date: '',
                        timer: '',
                        nftType: nft.nftType,
                        personName: nft.personName,
                        defaultRoleLimit: nft.defaultRoleLimit,
                        specialRoleLimit: nft.specialRoleLimit,
                        winnersCount: nft.winnersCount,
                        totalSupply: nft.totalSupply,
                        checked: nft.allowAllToParticipate,
                        questions: nft.questions,
                        stakingDays: nft.stakingDays,
                        checkedStock: nft.checkStakeInStock,
                        extraEnteries: nft.extraEnteries,
                        sharkSupply: nft.sharkSupply,
                        whalesSupply: nft.whalesSupply,
                        humpBackSupply: nft.humpBackSupply,
                    })
                }
            } catch (err) {
                console.log(err)
            }
            // console.log(.getDate())
        }
    }, [nft])

    // console.log(prevState.date, date)
    // console.log(prevState.date === date)
    // console.log(prevState.timer, timer)
    // console.log(prevState.timer === timer)

    const isChanged = () => {
        if (
            prevState.name === nftInfo.name &&
            prevState.price === nftInfo.price &&
            prevState.description === nftInfo.description &&
            prevState.extraEnteries === extraEnteries &&
            prevState.timer === timer &&
            prevState.nftType === nftType &&
            prevState.date === date &&
            prevState.nftImage === nftImage &&
            prevState.personName === personName &&
            prevState.defaultRoleLimit === defaultRoleLimit &&
            prevState.questions === questions &&
            prevState.specialRoleLimit === specialRoleLimit &&
            prevState.winnersCount === winnersCount &&
            prevState.checked === checked &&
            prevState.totalSupply === totalSupply &&
            prevState.checkedStock === checkedStock &&
            prevState.stakingDays === nftInfo.stakingDays
        ) {
            return false
        }
        return true
    }

    // console.log('Changed: ', isChanged())
    // console.log('Valid: ', isValid())

    const deletNft = async () => {
        if (isWalletLogin) {
            toggleDrawer('', 'right', false)
            await deleteNft(nft._id)
            await fetchOngoing('ongoing')
            await fetchNfts()
        } else {
            setError('Connect Your Wallet')
            return
        }
    }

    const createNewNft = async () => {
        if (isWalletLogin) {
            if (isValid) {
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
                    toggleDrawer('', 'right', false)
                    await createNft(
                        nftInfo.name,
                        nftInfo.description,
                        nftInfo.price,
                        nftType,
                        (nftType === 3 || nftType === 10) && date1 === null
                            ? ' '
                            : date1,
                        nftImage,
                        defaultRoleLimit < 0 || defaultRoleLimit === ''
                            ? 1
                            : defaultRoleLimit,
                        personName.length === 0
                            ? defaultRoleLimit
                            : specialRoleLimit,
                        personName,
                        nftType !== 3 ? winnersCount : '',
                        nftType === 3 || nftType === 10 ? totalSupply : '',
                        checked,
                        questions,
                        checkedStock,
                        nftType === 10 ? nftInfo.stakingDays : 0,
                        extraEnteries,
                        sharkSupply || 1,
                        whalesSupply || 1,
                        humpBackSupply || 1
                    )
                    await fetchOngoing('ongoing')
                    await fetchNfts()
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

    const UpdateThisNft = async () => {
        if (isWalletLogin) {
            if (isChanged) {
                let date1 = await new Date(
                    date.split('-')[0],
                    date.split('-')[1] - 1,
                    date.split('-')[2],
                    timer.split(':')[0],
                    timer.split(':')[1]
                )
                date1 = new Date(date1).getTime()
                date1 = new Date(date1).toJSON()
                // let parsedDate = ''
                // if (prevState.date !== date) {
                //     parsedDate = new Date(date1).toJSON()
                // } else {
                //     parsedDate = date
                // }
                // console.log(parsedDate)
                if (
                    new Date(date1).getTime() < Date.now() &&
                    date !== '' &&
                    timer !== ''
                ) {
                    setError('Deadline Cannot be less than current date')
                } else {
                    setError('')
                    toggleDrawer('', 'right', false)

                    await updateNft(
                        nft._id,
                        nftInfo.name,
                        nftInfo.description,
                        nftInfo.price,
                        nftType,
                        (nftType === 3 || nftType === 10) && date1 === null
                            ? ' '
                            : date1,
                        nftImage,
                        defaultRoleLimit < 0 || defaultRoleLimit === ''
                            ? 1
                            : defaultRoleLimit,
                        personName.length === 0
                            ? defaultRoleLimit
                            : specialRoleLimit,
                        personName,
                        nftType !== 3 ? winnersCount : '',
                        nftType === 3 || nftType === 10 ? totalSupply : '',
                        checked,
                        questions,
                        checkedStock,
                        nftType === 10 ? nftInfo.stakingDays : 0,
                        extraEnteries,
                        sharkSupply || 1,
                        whalesSupply || 1,
                        humpBackSupply || 1
                    )
                    await fetchNfts()
                    await fetchOngoing('ongoing')
                }
            } else {
                setError('All Okay!')
            }
        } else {
            setError('Connect Your Wallet')
            return
        }
    }

    // console.log(
    //     nftType === -1,
    //     nftInfo.price === '',
    //     nftInfo.name === '',
    //     !nftImage,
    //     !date && nftType !== 3,
    //     !timer && nftType !== 3,
    //     !winnersCount && nftType !== 3,
    //     !checked && personName.length === 0,
    //     !totalSupply && nftType === 3
    // )
    const isValid = () => {
        if (
            nftType === -1 ||
            nftInfo.price === '' ||
            nftInfo.name === '' ||
            !nftImage ||
            (!date && nftType !== 3 && nftType !== 10) ||
            (!timer && nftType !== 3 && nftType !== 10) ||
            (!winnersCount && nftType !== 3 && nftType !== 10) ||
            (!checked && personName.length === 0) ||
            (!totalSupply && nftType === 3)
        ) {
            return false
        }
        return true
    }

    // console.log('VALID', isValid())

    const resetState = () => {
        setNftType(-1)
        setNftImage(null)
        setError(null)
        setTimer('')
        setDate('')
        setNftInfo({
            name: '',
            description: '',
            price: '',
            stakingDays: 0,
            extraEnteries: false,
        })
        setDefaultRoleLimit(1)
        setSpecialRoleLimit(1)
        setPersonName([])
        setWinnersCount(1)
        setQuestions([''])
        setTotalSupply(1)
        setChecked(true)
        setCheckedStock(true)
    }

    return (
        <div className='inline-block bg-transparent text-left transform transition-all align-middle max-w-lg h-screen relative'>
            <div
                className={`w-full h-12 bg-primaryColor p-2 flex items-center justify-center screen3:flex-col screen3:gap-y-4 sticky top-0 right-0 z-[3] border-[#3D3D3D] border-b-2 border-l`}
            >
                <h2 className='text-xl font-[500] text-center text-white'>
                    {nft ? 'UPDATE' : 'CREATE'}
                </h2>
                {/* Close Button */}
                <div
                    className={`absolute rounded-full top-[20%] right-[8px] p-[6px] bg-white text-primaryColor cursor-pointer`}
                    onClick={() => {
                        toggleDrawer('', 'right', false)
                        resetState()
                    }}
                >
                    <CloseSvg />
                </div>
            </div>
            <div
                className={`w-[500px] bg-cardModal text-white flex flex-col gap-y-1 min-h-full relative border-l border-[#3D3D3D] screen3:w-screen`}
            >
                <div
                    className={`w-full rounded-b-lg bg-primaryColor px-6 py-4 flex items-start justify-center flex-col gap-y-6 min-h-screen`}
                >
                    {/* Choose Type */}
                    <div
                        className={
                            nft
                                ? 'flex flex-col w-full'
                                : 'flex flex-col h-20 w-full'
                        }
                    >
                        <label htmlFor='' className={`${styles.label}`}>
                            {!nft && 'Choose type'}
                        </label>
                        <div className='flex items-center gap-x-2 mt-2'>
                            {isScratchLocked ? (
                                ''
                            ) : (
                                <>
                                    {(nft?.nftType === 0 || !nft) && (
                                        <button
                                            className={`${styles.nftType} ${
                                                nftType === 0
                                                    ? 'bg-white text-primaryColor'
                                                    : ''
                                            } ${nft && 'text-lg'}`}
                                            disabled={nft}
                                            onClick={() => {
                                                resetState()
                                                setNftType(0)
                                            }}
                                        >
                                            Raffle
                                        </button>
                                    )}
                                    {/* <button
                                        className={`${styles.nftType} ${
                                            nftType === 1
                                                ? 'bg-white text-primaryColor'
                                                : ''
                                        }`}
                                        onClick={() => setNftType(1)}
                                    >
                                        Whitelist
                                    </button> */}
                                    {(nft?.nftType === 3 || !nft) && (
                                        <button
                                            className={`${styles.nftType} ${
                                                nftType === 3
                                                    ? 'bg-white text-primaryColor'
                                                    : ''
                                            } ${nft && 'text-lg'}`}
                                            disabled={nft}
                                            onClick={() => {
                                                resetState()
                                                setNftType(3)
                                            }}
                                        >
                                            Item
                                        </button>
                                    )}

                                    {(nft?.nftType === 10 || !nft) && (
                                        <button
                                            className={`${styles.nftType} ${
                                                nftType === 10
                                                    ? 'bg-white text-primaryColor'
                                                    : ''
                                            } ${nft && 'text-lg'}`}
                                            disabled={nft}
                                            onClick={() => {
                                                resetState()
                                                setNftType(10)
                                            }}
                                        >
                                            Staking Item
                                        </button>
                                    )}

                                    {(nft?.nftType === 4 || !nft) && (
                                        <button
                                            className={`${styles.nftType} ${
                                                nftType === 4
                                                    ? 'bg-white text-primaryColor'
                                                    : ''
                                            } ${nft && 'text-lg'}`}
                                            disabled={nft}
                                            onClick={() => {
                                                resetState()
                                                setNftType(4)
                                            }}
                                        >
                                            Auction
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    {/* Upload File */}
                    <div className='flex flex-col  w-full'>
                        <label htmlFor='' className={`${styles.label}`}>
                            Upload file
                        </label>
                        <input
                            type='file'
                            id='uploadNFT'
                            className='hidden'
                            onChange={(e) => {
                                setNftImage(e.target.files[0])
                            }}
                        />
                        {nftImage ? (
                            <div className='flex w-full rounded-lg px-4 py-3 bg-secondaryColor mt-2 cursor-pointer justify-between items-center'>
                                <img
                                    src={
                                        typeof nftImage === 'object'
                                            ? URL.createObjectURL(nftImage)
                                            : nftImage
                                    }
                                    alt='nft'
                                    className='w-16 h-16 rounded-xl object-cover'
                                />
                                <span
                                    className='rounded-full flex items-center justify-center bg-[#ffffffd1] text-3xl text-black cursor-pointer p-1'
                                    onClick={() => setNftImage(null)}
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

                    {/* Item Name */}
                    <div className='flex flex-col w-full'>
                        <label htmlFor='' className={`${styles.label}`}>
                            ITEM NAME
                        </label>
                        <input
                            type='text'
                            className={`${styles.input}`}
                            placeholder={`eg. BLVCK Genesis #432`}
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
                            DESCRIPTION (OPTIONAL)
                        </label>
                        <input
                            type='text'
                            className={`${styles.input}`}
                            placeholder={`eg. BLVCK Genesis is an epic collection..`}
                            value={nftInfo.description}
                            onChange={(e) =>
                                setNftInfo((state) => ({
                                    ...state,
                                    description: e.target.value,
                                }))
                            }
                        />
                    </div>

                    {/* Deadlines */}
                    {nftType !== 10 && (
                        <div className='flex flex-col w-full'>
                            <div className='flex items-center gap-x-4'>
                                <div className='flex flex-col w-full'>
                                    <label
                                        htmlFor=''
                                        className={`${styles.label}`}
                                    >
                                        DEADLINE DATE{' '}
                                        {nftType === 3 ? '(OPTIONAL)' : ''}
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
                                        DEADLINE TIME{' '}
                                        {nftType === 3 ? '(OPTIONAL)' : ''}
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
                    )}

                    {/* Participation */}
                    <div className='flex flex-col  w-full'>
                        <label htmlFor='' className={`${styles.label}`}>
                            {nftType === 4 ? 'MINIMUM BID' : 'PARTICIPATION FEE'}
                        </label>
                        <div className='flex items-center w-full'>
                            <input
                                type='text'
                                className={`${styles.input} rounded-r-none`}
                                placeholder={`eg. 500`}
                                value={nftInfo.price}
                                onChange={(e) =>
                                    setNftInfo((state) => ({
                                        ...state,
                                        price: e.target.value,
                                    }))
                                }
                            />
                            <div className='mt-2 bg-lightBlue h-10 px-5 py-3 rounded-r flex items-center gap-x-1'>
                                <img
                                    src={logo}
                                    alt='logo'
                                    className='w-[30px]'
                                />
                                {/* <span className='text-xs'></span> */}
                            </div>
                        </div>
                    </div>

                    {/* Days of Staking */}
                    {nftType === 10 && (
                        <div className='flex flex-col  w-full'>
                            <label htmlFor='' className={`${styles.label}`}>
                                STAKING DAYS REQUIRED (OPTIONAL)
                            </label>
                            <div className='flex items-center w-full'>
                                <input
                                    type='text'
                                    className={`${styles.input}`}
                                    placeholder={`eg. 200 Days`}
                                    value={nftInfo.stakingDays}
                                    onChange={(e) =>
                                        setNftInfo((state) => ({
                                            ...state,
                                            stakingDays: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                    )}

                    {/* Questions */}
                    {nftType !== 3 &&
                        nftType !== 4 &&
                        nftType !== 10 &&
                        questions.map((ques, index) => (
                            <QuestionsAdmin
                                questions={questions}
                                setQuestions={setQuestions}
                                ques={ques}
                                key={index}
                                index={index}
                            />
                        ))}

                    {/* Winners count */}
                    {nftType !== 3 && nftType !== 4 && nftType !== 10 && (
                        <div className='flex flex-col w-full'>
                            <label htmlFor='' className={`${styles.label}`}>
                                NUMBER OF WINNERS
                            </label>
                            <input
                                type='number'
                                className={`${styles.input} rounded-r-none noscroll`}
                                placeholder={`eg. 1`}
                                value={winnersCount}
                                onChange={(e) =>
                                    setWinnersCount(e.target.value)
                                }
                                min={1}
                            />
                        </div>
                    )}

                    {nftType === 0 && (
                        <>
                            {/* Default Role Limit */}
                            <div className='flex flex-col w-full'>
                                <label htmlFor='' className={`${styles.label}`}>
                                    DEFAULT DISCORD ROLE LIMIT
                                </label>
                                <input
                                    min={1}
                                    type='number'
                                    className={`${styles.input} rounded-r-none noscroll`}
                                    placeholder={`eg. 1`}
                                    value={defaultRoleLimit}
                                    onChange={(e) =>
                                        setDefaultRoleLimit(e.target.value)
                                    }
                                />
                            </div>
                        </>
                    )}

                    {/* Total Supply */}
                    {(nftType === 3 || nftType === 10) && (
                        <div className='flex flex-col w-full'>
                            <label htmlFor='' className={`${styles.label}`}>
                                TOTAL SUPPLY
                            </label>
                            <input
                                min={1}
                                type='number'
                                className={`${styles.input} rounded-r-none noscroll`}
                                placeholder={`eg. 5`}
                                value={totalSupply}
                                onChange={(e) => setTotalSupply(e.target.value)}
                            />
                        </div>
                    )}

                    {/* {nftType === 3 && (
                            <span className={`${styles.label}`}>
                                Set Supply of{' '}
                                <span className='text-white font-[800] mx-1'>
                                    {!totalSupply ? '-' : totalSupply}
                                </span>{' '}
                                for{' '}
                                <span className='text-white font-[800] mx-1'>
                                    {checked && personName.length > 0
                                        ? 'Selected roles'
                                        : 'Everyone'}
                                </span>
                                !
                            </span>
                        )} */}

                    {nftType === 10 && (
                        <div className='w-full flex flex-col'>
                            <div
                                className={`${styles.label} flex items-center`}
                            >
                                <CheckBox
                                    checked={checkedStock}
                                    setChecked={setCheckedStock}
                                />
                                <span>Available in Stock</span>
                            </div>
                        </div>
                    )}

                    {nftType === 3 && (
                        <>
                            {/* Supply Info */}
                            <div className='w-full flex flex-col'>
                                <div
                                    className={`${styles.label} flex items-center`}
                                >
                                    <CheckBox
                                        checked={checked}
                                        setChecked={setChecked}
                                    />
                                    <span>
                                        Allow non discord members to participate
                                    </span>
                                </div>
                            </div>

                            {/* Discord Role */}
                            {!checked && (
                                <div className='w-full flex flex-col'>
                                    <label
                                        htmlFor=''
                                        className={`${styles.label}`}
                                    >
                                        SPECIFY DISCORD ROLES FOR PARTICIPATION
                                    </label>
                                    <DiscordRoleSelect
                                        setPersonName={setPersonName}
                                        personName={personName}
                                    />
                                </div>
                            )}
                        </>
                    )}

                    {nftType === 0 && (
                        <>
                            {/* Special Roles Limit */}
                            <div className='flex flex-col w-full'>
                                <label htmlFor='' className={`${styles.label}`}>
                                    SPECIAL DISCORD ROLE LIMIT
                                </label>
                                <input
                                    min={1}
                                    type='number'
                                    className={`${styles.input} rounded-r-none noscroll`}
                                    placeholder={`eg. 2`}
                                    value={specialRoleLimit}
                                    onChange={(e) =>
                                        setSpecialRoleLimit(e.target.value)
                                    }
                                />
                            </div>

                            {/* Discord Role */}
                            <div className='w-full flex flex-col'>
                                <label htmlFor='' className={`${styles.label}`}>
                                    SPECIFY DISCORD ROLES FOR PARTICIPATION
                                </label>
                                <DiscordRoleSelect
                                    setPersonName={setPersonName}
                                    personName={personName}
                                />
                            </div>
                            {/* Supply Info */}
                            <div className='w-full flex flex-col'>
                                <div
                                    className={`${styles.label} flex items-center`}
                                >
                                    <CheckBox
                                        checked={checked}
                                        setChecked={setChecked}
                                    />
                                    <span>
                                        Allow non discord members to participate
                                    </span>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Extra Enteries */}
                    {nftType === 0 && (
                        <div className='w-full flex flex-col'>
                            <div
                                className={`${styles.label} flex items-center`}
                            >
                                <CheckBox
                                    checked={extraEnteries}
                                    setChecked={setExtraEnteries}
                                />
                                <span>
                                    Extra Enteries for Shark, Whale and Humpback{' '}
                                    {/* <small className='font-light'> */}
                                    {/* (3-Shark, 5-Whale, 7-Humpback) */}
                                    {/* </small> */}
                                </span>
                            </div>
                        </div>
                    )}

                    {nftType === 0 && extraEnteries && (
                        <>
                            <div className='flex flex-col w-full'>
                                <label htmlFor='' className={`${styles.label}`}>
                                    Sharks
                                </label>
                                <input
                                    min={1}
                                    type='number'
                                    className={`${styles.input} rounded-r-none noscroll`}
                                    placeholder={`eg. 5`}
                                    value={sharkSupply}
                                    onChange={(e) =>
                                        setSharkSupply(parseInt(e.target.value))
                                    }
                                />
                            </div>

                            <div className='flex flex-col w-full'>
                                <label htmlFor='' className={`${styles.label}`}>
                                    Whales
                                </label>
                                <input
                                    min={1}
                                    type='number'
                                    className={`${styles.input} rounded-r-none noscroll`}
                                    placeholder={`eg. 5`}
                                    value={whalesSupply}
                                    onChange={(e) =>
                                        setWhalesSupply(
                                            parseInt(e.target.value)
                                        )
                                    }
                                />
                            </div>

                            <div className='flex flex-col w-full'>
                                <label htmlFor='' className={`${styles.label}`}>
                                    Humpback
                                </label>
                                <input
                                    min={1}
                                    type='number'
                                    className={`${styles.input} rounded-r-none noscroll`}
                                    placeholder={`eg. 5`}
                                    value={humpBackSupply}
                                    onChange={(e) =>
                                        setHumpBackSupply(
                                            parseInt(e.target.value)
                                        )
                                    }
                                />
                            </div>
                        </>
                    )}

                    {/* Create Button */}
                    {error && (
                        <span className='text-xs font-[600] text-red-500'>
                            {error}
                        </span>
                    )}
                    {nft ? (
                        <div className='w-full flex items-center gap-x-4'>
                            <button
                                className={`flex items-center justify-center p-2 rounded w-full ${'outline outline-red-700'} `}
                                onClick={() => deletNft()}
                            >
                                Delete
                            </button>
                            <button
                                className={`flex items-center justify-center p-2 rounded w-full ${
                                    isChanged() && isValid()
                                        ? 'bg-white text-primaryColor font-[700]'
                                        : 'bg-activityBg cursor-not-allowed font-[400]'
                                } `}
                                onClick={() => UpdateThisNft()}
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
                                    : 'bg-activityBg cursor-not-allowed font-[400]'
                            } `}
                            onClick={() => createNewNft()}
                            disabled={!isValid()}
                        >
                            CREATE
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

const QuestionsAdmin = ({ questions, setQuestions, ques, index }) => {
    const updateFieldChanged = () => (e) => {
        // console.log('index: ' + index)
        // console.log('property name: ' + e.target.name)
        let newArr = [...questions] // copying the old datas array
        newArr[index] = e.target.value // replace e.target.value with whatever you want to change it to

        setQuestions(newArr)
    }

    const removeField = () => {
        let newArr = [...questions]
        newArr.splice(index, 1)

        setQuestions(newArr)
    }

    return (
        <div className='flex flex-col  w-full'>
            <label htmlFor='' className={`${styles.label}`}>
                Question {index + 1} (optional)
            </label>
            <div className='flex items-center w-full'>
                <input
                    type='text'
                    className={`${styles.input} rounded-r-none`}
                    placeholder={`What is name of your dog?`}
                    value={ques}
                    onChange={updateFieldChanged(index)}
                />
                {index < questions.length - 1 ? (
                    <div
                        className='mt-2 bg-lightBlue h-10 px-5 py-3 rounded-r flex items-center gap-x-1 cursor-pointer'
                        onClick={() => removeField()}
                    >
                        <RemoveIcon />
                    </div>
                ) : (
                    <div
                        className='mt-2 bg-lightBlue h-10 px-5 py-3 rounded-r flex items-center gap-x-1 cursor-pointer'
                        onClick={() => {
                            if (questions.length < 3)
                                setQuestions((state) => [...state, ''])
                            else removeField()
                        }}
                    >
                        {questions.length < 3 ? <AddIcon /> : <RemoveIcon />}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CreateNft
