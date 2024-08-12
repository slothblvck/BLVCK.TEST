import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Close } from '@mui/icons-material'
import { WalletConnectContext } from '../../../hooks/WalletLogin'

const AddLeaderboardDetails = ({ openModal, setOpenModal, leaderboardInfo}) => {
    const cancelButtonRef = useRef(null)
    const { saveLeaderboardDescription, leaderboardSaving } = useContext(WalletConnectContext)

    const styles = {
        button: `flex items-center justify-between p-3 px-4 w-full focus-visible:outline-none rounded-lg bg-[#2f3239] gap-x-2 border border-[#3A3C40] hover:bg-[#191e27] disabled:cursor-not-allowed disabled:bg-[#2f3239] transition-all ease-in-out delay-100 hover:transition-all hover:ease-in-out hover:delay-100`,
        image: `h-10`,
        h1: `font-[500]`,
        input: `border border-[#525252] w-full bg-transparent outline-none rounded px-3 py-2 text-sm text-white placeholder:text-[#A3A3A3] mt-2 h-10 focus:border-[#FFF] focus:border-3`,
    }

    const [title, setTitle] = useState("")
    const [startTime, setStartTime] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endTime, setEndTime] = useState("")
    const [endDate, setEndDate] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState("")

    const resetState = () => {
        setTitle("")
        setStartTime("")
        setStartDate("")
        setEndDate("")
        setEndTime("")
        setDescription("")
    }

    const checkDisable = () => {
        if(
            !title ||
            !startTime ||
            !startDate ||
            !endDate ||
            !endTime ||
            !description
        )
            return true;

        return false;
    }

    const saveDetails = async() => {
        let date1 = await new Date(
            startDate.split('-')[0],
            startDate.split('-')[1] - 1,
            startDate.split('-')[2],
            startTime.split(':')[0],
            startTime.split(':')[1]
        )
        date1 = new Date(date1).getTime()
        date1 = new Date(date1).toJSON()

        if (
            new Date(date1).getTime() < Date.now() &&
            startDate !== '' &&
            startTime !== ''
        ) {
            setError('Start Time Cannot be less than current date');
            return
        }

        let date2 = await new Date(
            endDate.split('-')[0],
            endDate.split('-')[1] - 1,
            endDate.split('-')[2],
            endTime.split(':')[0],
            endTime.split(':')[1]
        )
        date2 = new Date(date2).getTime()
        date2 = new Date(date2).toJSON()

        if (
            new Date(date2).getTime() < Date.now() &&
            endDate !== '' &&
            endTime !== ''
        ) {
            setError('End Time Cannot be less than current date');
            return
        }

        setError("");

        await saveLeaderboardDescription({
            title: title,
            startTimer: date1,
            endTimer: date2,
            description: description
        })
        resetState();
        setOpenModal(false);
    }

    useEffect(() => {
        if(leaderboardInfo && leaderboardInfo?.startTimer && leaderboardInfo?.endTimer) {
            setTitle(leaderboardInfo?.title)
            setDescription(leaderboardInfo?.description)

            let new_date = new Date(leaderboardInfo.startTimer)
            let new_date_1 = new_date.setDate(new_date.getDate())
            let new__new_date = new Date(new_date_1)

            console.log(new_date.toTimeString())
            setStartDate(new__new_date.toJSON().split('T')[0])
            setStartTime(new_date.toTimeString().split(' ')[0])

            let new_date2 = new Date(leaderboardInfo.endTimer)
            let new_date_12 = new_date2.setDate(new_date2.getDate())
            let new__new_date2 = new Date(new_date_12)
            setEndDate(new__new_date2.toJSON().split('T')[0])
            setEndTime(new_date2.toTimeString().split(' ')[0])
        }else{
            resetState()
        }
    }, [leaderboardInfo])

    return (
        <Transition.Root show={openModal} as={Fragment}>
            <Dialog
                as='div'
                className='fixed z-[10000] inset-0 overflow-y-auto'
                initialFocus={cancelButtonRef}
                onClose={setOpenModal}
            >
                <div className='h-screen px-4 text-center block p-0'>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        enterTo='opacity-100 translate-y-0 sm:scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                        leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    >
                        <Dialog.Overlay className='fixed inset-0 bg-[#0C0C0DB2] bg-opacity-75 backdrop-blur-sm transition-opacity' />
                    </Transition.Child>
                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className='inline-block align-middle h-screen'
                        aria-hidden='true'
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        enterTo='opacity-100 translate-y-0 sm:scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                        leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    >
                        <div className='inline-block bg-transparent rounded-lg text-left transform transition-all my-8 align-middle max-w-lg w-full'>
                            <div className='flex justify-center w-full items-start bg-cardModal rounded-xl text-white h-full p-5 flex-col gap-y-4 border border-[#3D3D3D]'>
                                <h2 className='text-xl font-[700] text-center'>
                                    Add Leaderboard Details
                                </h2>

                                <div className='flex flex-col gap-3 w-full'>
                                    <div className='flex items-baseline w-full gap-2'>
                                        <input
                                            type='text'
                                            className={`${styles.input}`}
                                            placeholder={`Title`}
                                            value={title}
                                            onChange={(e) => {
                                                setTitle(e?.target?.value)
                                            }}
                                        />
                                    </div>

                                    <div className='flex flex-col items-baseline w-full'>
                                        <label htmlFor="">Start Time</label>

                                        <div className='flex items-center w-full gap-1'>
                                            <input
                                                type='date'
                                                className={`${styles.input}`}
                                                placeholder={`option`}
                                                value={startDate}
                                                onChange={(e) =>
                                                    setStartDate(e.target.value)
                                                }
                                            />

                                            <input
                                                type='time'
                                                className={`${styles.input}`}
                                                placeholder={`points`}
                                                value={startTime}
                                                onChange={(e) =>
                                                    setStartTime(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className='flex flex-col items-baseline w-full'>
                                        <label htmlFor="">End Time</label>

                                        <div className='flex items-center w-full gap-1'>
                                            <input
                                                type='date'
                                                className={`${styles.input}`}
                                                placeholder={`option`}
                                                value={endDate}
                                                onChange={(e) =>
                                                    setEndDate(e.target.value)
                                                }
                                            />

                                            <input
                                                type='time'
                                                className={`${styles.input}`}
                                                placeholder={`points`}
                                                value={endTime}
                                                onChange={(e) =>
                                                    setEndTime(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>

                                    <textarea name="" id="" placeholder='Enter Description' className={`${styles.input}`}
                                        value={description}
                                        onChange={(e) => {
                                            setDescription(e.target.value)
                                        }}
                                    />

                                    {error && <div className='text-red-600 font-semibold text-sm'>{error}</div>}

                                    <button
                                        className='flex disabled:opacity-50 items-center justify-center p-2 h-8 mt-2 rounded bg-white text-primaryColor font-[700]'
                                        onClick={saveDetails}
                                        disabled={checkDisable()}
                                    >
                                        {leaderboardSaving ? 'Saving...' : `Save Details`}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default AddLeaderboardDetails
