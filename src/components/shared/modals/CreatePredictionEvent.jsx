import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { WalletConnectContext } from '../../../hooks/WalletLogin'
import CloseSvg from '../../../assets/svg/CloseSvg'
import { Close, Delete, Edit } from '@mui/icons-material'
import AddQuestion from './AddQuestion'

const styles = {
    label: `text-[#A3A3A3] text-[14px] font-[400]`,
    input: `border border-[#525252] w-full bg-transparent outline-none rounded px-3 py-2 text-sm text-white placeholder:text-[#A3A3A3] mt-2 h-10 focus:border-[#FFF] focus:border-3`,
    textArea: `border border-[#525252] w-full bg-transparent outline-none rounded px-3 py-2 text-sm text-white placeholder:text-[#A3A3A3] mt-2 focus:border-[#FFF] focus:border-3`,
    nftType: `w-full h-[50px] rounded-md p-2 flex items-center justify-center text-sm bg-lightBlue disabled:cursor-not-allowed text-center`,
}

const CreatePredictionEvent = ({event, setOpen }) => {
    const {
        isWalletLogin,
        fetchPredictionEvents,
        predictionEventCreateLoading,
        createPredictionEvent: createPredictionEventAction,
        updatePredictionEvent: updatePredictionEventAction
    } = useContext(WalletConnectContext)
    const [prevState, setPrevState] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        date: '',
        timer: '',
    })
    const [predictionValue, setPredictionValue] = useState("")
    const [openAddQuesModal, setOpenAddQuesModal] = useState(false)
    const [predictions, setPredictions] = useState([])
    const [error, setError] = useState(null)
    const [editData, setEditData] = useState(null)
    const [nftInfo, setNftInfo] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
    })
    const [timer, setTimer] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        if (event) {
            try {
                let new_date = new Date(partner.expireAt)
                let new_date_1 = new_date.setDate(new_date.getDate())
                let new__new_date = new Date(new_date_1)
                setDate(new__new_date.toJSON().split('T')[0])
                setTimer(new_date.toTimeString().split(' ')[0])

                setNftInfo({
                    name: event.name,
                    description: event.description,
                    price: event.price,
                    image: event.image,
                })

                setPrevState({
                    name: event.name,
                    description: event.description,
                    price: event.price,
                    image: event.image,
                    date: new__new_date.toJSON().split('T')[0],
                    timer: new_date.toTimeString().split(' ')[0],
                })

                setPredictions(event.predictions)
            } catch (err) {
                console.log(err)
            }
        }
    }, [event])

    const isChanged = () => {
        if (
            prevState.name === nftInfo.name &&
            prevState.description === nftInfo.description &&
            prevState.image === nftInfo.image && 
            prevState.price === nftInfo.price && 
            prevState.timer === timer &&
            prevState.date === date &&
            predictions === nftInfo.preditionCategories
        ) {
            return false
        }
        return true
    }

    const deleteEvent = async () => {
        if (isWalletLogin) {
            setOpen(false)
            await fetchPredictionEvents()
        } else {
            setError('Connect Your Wallet')
            return
        }
    }

    const createNewEvent = async () => {
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
                    // setOpen(false)
                    await createPredictionEventAction(nftInfo, predictions, date1, setOpen)
                    await fetchPredictionEvents()
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

    const UpdateEvent = async () => {
        if (isWalletLogin) {
            if (isChanged) {
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

                    setError('')
                    setOpen(false)
                    await updatePredictionEventAction(nftInfo, predictions, event?._id, date1)
                    await fetchPredictionEvents()
                    resetState()
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
            nftInfo.name === '' ||
            nftInfo.image === '' ||
            nftInfo.price === '' ||
            nftInfo.price < 1 ||
            timer === '' ||
            date === '' ||
            nftInfo.description === ''
        ) {
            return false
        }
        return true
    }

    const resetState = () => {
        setNftInfo({
            name: '',
            description: '',
            price: '',
            image: '',
        })
        setDate('')
        setTimer('')
        setPredictions([])
        setPredictionValue("")
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
                    {event ? 'Update Event' : 'Create Event'}
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

                {/* Price */}
                <div className='flex flex-col  w-full'>
                    <label htmlFor='' className={`${styles.label}`}>
                        Enter Price
                    </label>

                    <div className='w-full'>
                        <input
                            type='number'
                            className={`${styles.input}`}
                            placeholder={`Enter Price`}
                            value={nftInfo.price}
                            onChange={(e) => {
                                setNftInfo((state) => ({
                                    ...state,
                                    price: e.target.value,
                                }))
                            }}
                            min={1}
                        />
                        {/* <p className='font-[700] text-xl flex items-center gap-1'>2 <img src={BlvckCoin} alt='' className='w-[25px]' /></p> */}
                    </div>
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

                {/* Predictions */}
                <div className='flex flex-col w-full'>
                    <label htmlFor='' className={`${styles.label}`}>
                        Add Predictions
                    </label>
                    
                    <button className='flex items-center justify-center p-2 h-8 mt-2 rounded border border-[#525252] bg-[#000] text-white font-[700] text-sm' onClick={() => {
                        if(predictions?.length > 0 && predictions[predictions.length - 1]?.question === "") return

                        setEditData(null)
                        setOpenAddQuesModal(true)
                    }}
                    disabled={predictions?.length > 0 && predictions[predictions.length - 1]?.question === ""}
                    >Add Question</button>
                    
                    <div className='flex flex-col'>
                        {predictions?.map((prediction, key) => <div key={key}>
                            <div className='flex items-baseline w-full gap-2'>
                                <span className='mt-2 text-xs'>Q{key+1}.</span>
                                <h1 className='text-sm'>{prediction?.question}</h1>
                                {/* <h1 className='text-sm'>{prediction?.question} ({prediction?.points || 1} {prediction?.points > 1 ? `Points` : `Point`})</h1> */}
                            </div>

                            {prediction?.options?.length > 0 && <div className='group relative flex flex-wrap w-full gap-2 mt-3 border-dashed border-[#525252] border rounded p-2'>
                                {prediction?.options?.map((option, _key) => (
                                    <div className='rounded-xl bg-[#0000007d] p-2 px-4 text-sm' key={_key}>
                                        {option.value}
                                        <span className='text-slate-400'>{` (${option.points})`}</span>
                                    </div>
                                ))}

                                <div className='absolute left-0 top-0 w-full h-full bg-[#00000089] invisible group-hover:visible flex items-center justify-end px-5 gap-3'>
                                    <button onClick={() => {
                                        setEditData({
                                            prediction: predictions[key],
                                            id: key
                                        })
                                        setOpenAddQuesModal(true)
                                    }}>
                                        <Edit />
                                    </button>

                                    <button onClick={() => {
                                        setPredictions((prev) => prev.splice(key, 1))
                                    }}>
                                        <Delete />
                                    </button>
                                </div>
                            </div>}
                        </div>)}
                    </div>
                </div>

                {/* Deadline */}
                <div className='flex flex-col w-full'>
                    <div className='flex items-center gap-x-4'>
                        <div className='flex flex-col w-full'>
                            <label
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
            </div>

            {/* Create Button */}
            <div className='bg-[#111] sticky bottom-0 w-full left-0 px-6 py-4'>
                {error && (
                    <span className='text-xs font-[600] text-red-500'>
                        {error}
                    </span>
                )}
                {event ? (
                    <div className='w-full flex items-center gap-x-4'>
                        <button
                            className={`flex items-center justify-center p-2 rounded w-full ${'outline outline-red-700'} `}
                            onClick={() => deleteEvent()}
                        >
                            Delete
                        </button>
                        <button
                            className={`flex items-center justify-center p-2 rounded w-full ${
                                isChanged() && isValid()
                                    ? 'bg-white text-primaryColor font-[700]'
                                    : 'bg-activityBg cursor-not-allowed font-[400]'
                            } `}
                            onClick={() => UpdateEvent()}
                            disabled={!(isChanged() && isValid())}
                        >
                            Update
                        </button>
                    </div>
                ) : (
                    <button
                        className={`flex items-center justify-center p-2 rounded disabled:opacity-50 w-full ${
                            isValid()
                                ? 'bg-white text-primaryColor font-[700]'
                                : 'bg-white text-[#000] cursor-not-allowed font-[400]'
                        } `}
                        onClick={() => createNewEvent()}
                        disabled={!isValid() || predictionEventCreateLoading}
                    >
                        {predictionEventCreateLoading ? 'Creating...' : 'Create'}
                    </button>
                )}
            </div>

            <AddQuestion editData={editData} setPredictions={setPredictions} predictions={predictions} openModal={openAddQuesModal} setOpenModal={setOpenAddQuesModal} />
        </div>
    )
}

export default CreatePredictionEvent
