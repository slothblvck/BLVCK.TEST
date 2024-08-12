import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Close } from '@mui/icons-material'

const AddQuestion = ({ openModal, setOpenModal, setPredictions, predictions, editData}) => {
    const cancelButtonRef = useRef(null)

    const styles = {
        button: `flex items-center justify-between p-3 px-4 w-full focus-visible:outline-none rounded-lg bg-[#2f3239] gap-x-2 border border-[#3A3C40] hover:bg-[#191e27] disabled:cursor-not-allowed disabled:bg-[#2f3239] transition-all ease-in-out delay-100 hover:transition-all hover:ease-in-out hover:delay-100`,
        image: `h-10`,
        h1: `font-[500]`,
        input: `border border-[#525252] w-full bg-transparent outline-none rounded px-3 py-2 text-sm text-white placeholder:text-[#A3A3A3] mt-2 h-10 focus:border-[#FFF] focus:border-3`,
    }

    const [question, setQuestion] = useState("")
    const [points, setPoints] = useState("")
    const [options, setOptions] = useState([])
    const [optionValue, setOptionValue] = useState("")

    const resetState = () => {
        setQuestion("")
        setOptions([])
        setOptionValue("")
        setPoints("")
    }

    useEffect(() => {
        if(editData) {
            const predict = editData.prediction
            console.log(predict)
            setQuestion(predict.question)
            setOptions(predict.options)
        }else{
            setQuestion("")
            setOptions([])
            setOptionValue("")
            setPoints("")
        }
    }, [editData])

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
                                    Add Question
                                </h2>

                                <div className='flex flex-col gap-1 w-full'>
                                    <div className='flex items-baseline w-full gap-2'>
                                        <input
                                            type='text'
                                            className={`${styles.input}`}
                                            placeholder={`Question`}
                                            value={question}
                                            onChange={(e) => {
                                                setQuestion(e?.target?.value)
                                            }}
                                        />
                                    </div>

                                    <div className='flex items-baseline w-full gap-2'>
                                        <div className='flex items-center w-full gap-1'>
                                            <input
                                                type='text'
                                                className={`${styles.input}`}
                                                placeholder={`option`}
                                                value={optionValue}
                                                onChange={(e) =>
                                                    setOptionValue(e.target.value)
                                                }
                                            />

                                            <input
                                                type='number'
                                                className={`${styles.input}`}
                                                placeholder={`points`}
                                                value={points}
                                                onChange={(e) =>
                                                    setPoints(e.target.value)
                                                }
                                            />
                                        </div>

                                        <button className='flex items-center justify-center p-2 h-8 mt-2 rounded bg-white text-primaryColor font-[700] disabled:opacity-50'
                                            disabled={!optionValue || !points}
                                            onClick={() => {
                                                if(!optionValue || !points) return

                                                let arr = [...options]
                                                arr.push({
                                                    value: optionValue,
                                                    points: points
                                                })

                                                setOptions(arr)
                                                setOptionValue('')
                                                setPoints('')
                                            }}
                                        >Add</button>
                                    </div>

                                    {options?.length > 0 && <div className='flex flex-wrap w-full gap-2 mt-3 border-dashed border-[#525252] border rounded p-2'>
                                        {options?.map((option, key) => (
                                            <div className='rounded-xl bg-[#0000007d] p-2 px-4 text-sm' key={key}>
                                                {option.value} 
                                                <span className='text-slate-400'>{` (${option.points})`}</span>
                                                <button onClick={() => {
                                                    let arr = [...options]
                                                    arr.splice(key, 1)

                                                    setOptions(arr)
                                                }}>
                                                    <Close fontSize='12' />
                                                </button>
                                            </div>
                                        ))}
                                    </div>}

                                    <button
                                        className='flex disabled:opacity-50 items-center justify-center p-2 h-8 mt-2 rounded bg-white text-primaryColor font-[700]'
                                        onClick={() => {
                                            if(!options || options.length === 0 || !question) return
                                            let arr = [...predictions]

                                            if(editData){
                                                arr[editData.id] = {
                                                    question,
                                                    options
                                                }
                                            }else{
                                                arr.push({
                                                    question,
                                                    options,
                                                })
                                            }

                                            setPredictions(arr)

                                            resetState()
                                            setOpenModal(false)
                                        }}
                                        disabled={!options || options.length === 0 || !question}
                                    >
                                        Save Question
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

export default AddQuestion
