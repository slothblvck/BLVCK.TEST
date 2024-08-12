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

const CreatePartner = ({partner, setOpen }) => {
    const {
        createPartner: createPartnerAction,
        isWalletLogin,
        fetchPartners,
        updateNft,
        deleteNft,
        fetchOngoing,
        partnerCreateLoading,
        userInfo
    } = useContext(WalletConnectContext)
    const [prevState, setPrevState] = useState({
        name: '',
        description: '',
        category: '',
        image: '',
        instagram: '',
        websiteLink: '',
        discord: '',
        opensea: '',
        twitter: '',
    })
    const [error, setError] = useState(null)
    const [nftInfo, setNftInfo] = useState({
        name: '',
        description: '',
        category: '',
        image: '',
        instagram: '',
        websiteLink: '',
        discord: '',
        opensea: '',
        twitter: '',
    })
    const [tagValue, setTagValue] = useState('')
    const [tags, setTags] = useState([])

    useEffect(() => {
        if (partner) {
            try {
                setNftInfo({
                    name: partner.name,
                    description: partner.description,
                    category: partner.category,
                    image: partner.image,
                    instagram: partner.instagram,
                    websiteLink: partner.websiteLink,
                    discord: partner.discord,
                    opensea: partner.opensea,
                    twitter: partner.twitter,
                })

                setPrevState({
                    name: partner.name,
                    description: partner.description,
                    category: partner.category,
                    image: partner.image,
                    instagram: partner.instagram,
                    websiteLink: partner.websiteLink,
                    discord: partner.discord,
                    opensea: partner.opensea,
                    twitter: partner.twitter,
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
            prevState.category === nftInfo.category &&
            prevState.image === nftInfo.image &&
            prevState.discord === nftInfo.discord &&
            prevState.opensea === nftInfo.opensea &&
            prevState.websiteLink === nftInfo.websiteLink &&
            prevState.twitter === nftInfo.twitter
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
            await fetchPartners()
        } else {
            setError('Connect Your Wallet')
            return
        }
    }

    const createNewPartner = async () => {
        if (isWalletLogin) {
            if (isValid()) {
                setError('')
                setOpen(false)
                await createPartnerAction(nftInfo, tags?.length === 0 && tagValue ? [tagValue] : tags)
                // await fetchOngoing('ongoing')
                await fetchPartners()
                resetState()
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
                setError('')
                setOpen(false)

                // await updateNft(
                //     partner._id
                // )
                // await fetchPartners()
                // await fetchOngoing('ongoing')
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
            nftInfo.category === '' ||
            nftInfo.description === '' ||
            nftInfo.image === ''
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
            category: '',
            image: '',
            instagram: '',
            websiteLink: '',
            discord: '',
            opensea: '',
            twitter: '',
        })
    }

    const handleDelete = (id) => {
        let arr = [...tags]
        arr.splice(id, 1)
        setTags(arr)
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
                    Partners
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
                        placeholder={`Project Name`}
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
                        placeholder={`Breif about your project`}
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

                {/* Category */}
                <div className='flex flex-col w-full'>
                    <label htmlFor='' className={`${styles.label}`}>
                        Category
                    </label>
                    <select className={`${styles.input} outline-none focus:outline-none focus:border-[#525252]`} defaultValue={nftInfo.category}
                    onChange={(e) => {
                        setNftInfo((state) => ({
                            ...state,
                            category: e.target.value,
                        }))
                    }}>
                        <option className='bg-[#111]' value="">Select</option>
                        {userInfo?.isSuperAdmin && <option className='bg-[#111]' value="OfficialPartner">Official Partners</option>}
                        <option className='bg-[#111]' value="CommunityProject">Community Projects</option>
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

                <div className='flex flex-col  w-full'>
                    <label htmlFor='' className={`${styles.label}`}>
                        Tags <b>(Press Enter to add Multiple Tags)</b>
                    </label>
                    <div className='flex items-center w-full'>
                        <div className={styles.input} style={{height: 'auto', gap: '4px', display: 'flex', flexWrap: 'wrap'}}>
                            {
                                tags.map((tag, id) => (
                                    <Chip
                                        key={id}
                                        label={tag}
                                        style={{
                                            background: '#2B2A2A',
                                            color: '#FFF'
                                        }}
                                        onDelete={() => handleDelete(id)}
                                    />
                                ))
                            }

                            <input
                                type='text'
                                className={`outline-none rounded-r-none bg-transparent w-auto`}
                                placeholder={`Enter Tag`}
                                value={tagValue}
                                onChange={(e) =>{
                                    setTagValue(e.target.value)
                                }}
                                onKeyDown={(e) => {
                                    if(e.code === 'Enter'){
                                        let arr = [...tags]
                                        arr.push(tagValue)
                                        setTags(arr)
                                        setTagValue('')
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Participation */}
                <div className='flex flex-col  w-full'>
                    <label htmlFor='' className={`${styles.label}`}>
                        Website Link
                    </label>
                    <div className='flex items-center w-full'>
                        <input
                            type='text'
                            className={`${styles.input} rounded-r-none`}
                            placeholder={`https://blvck.com`}
                            value={nftInfo.websiteLink}
                            onChange={(e) =>
                                setNftInfo((state) => ({
                                    ...state,
                                    websiteLink: e.target.value,
                                }))
                            }
                        />
                    </div>
                </div>

                {/* Participation */}
                <div className='flex flex-col  w-full'>
                    <label htmlFor='' className={`${styles.label}`}>
                        Twitter
                    </label>
                    <div className='flex items-center w-full'>
                        <input
                            type='text'
                            className={`${styles.input} rounded-r-none`}
                            placeholder={`https://twitter.com/BlvckParis`}
                            value={nftInfo.twitter}
                            onChange={(e) =>
                                setNftInfo((state) => ({
                                    ...state,
                                    twitter: e.target.value,
                                }))
                            }
                        />
                    </div>
                </div>

                {/* Participation */}
                <div className='flex flex-col  w-full'>
                    <label htmlFor='' className={`${styles.label}`}>
                        Instagram
                    </label>
                    <div className='flex items-center w-full'>
                        <input
                            type='text'
                            className={`${styles.input} rounded-r-none`}
                            placeholder={`https://www.instagram.com/black`}
                            value={nftInfo.instagram}
                            onChange={(e) =>
                                setNftInfo((state) => ({
                                    ...state,
                                    instagram: e.target.value,
                                }))
                            }
                        />
                    </div>
                </div>

                {/* Participation */}
                <div className='flex flex-col  w-full'>
                    <label htmlFor='' className={`${styles.label}`}>
                        OpenSea
                    </label>
                    <div className='flex items-center w-full'>
                        <input
                            type='text'
                            className={`${styles.input} rounded-r-none`}
                            placeholder={`https://opensea.io/collection/blvckgenesis`}
                            value={nftInfo.opensea}
                            onChange={(e) =>
                                setNftInfo((state) => ({
                                    ...state,
                                    opensea: e.target.value,
                                }))
                            }
                        />
                    </div>
                </div>

                {/* Participation */}
                <div className='flex flex-col  w-full'>
                    <label htmlFor='' className={`${styles.label}`}>
                        Discord
                    </label>
                    <div className='flex items-center w-full'>
                        <input
                            type='text'
                            className={`${styles.input} rounded-r-none`}
                            placeholder={`https://discord.com/invite/blvckparis`}
                            value={nftInfo.discord}
                            onChange={(e) =>
                                setNftInfo((state) => ({
                                    ...state,
                                    discord: e.target.value,
                                }))
                            }
                        />
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
                        {partnerCreateLoading ? 'Creating...' : 'Create'}
                    </button>
                )}
            </div>
        </div>
    )
}

export default CreatePartner
