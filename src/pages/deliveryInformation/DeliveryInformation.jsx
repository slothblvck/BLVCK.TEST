import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import TopSideInfo from '../../components/Dashboard/TopSideInfo'
import TitlePage from '../../components/shared/TitlePage'
import { BACKEND_URL, WalletConnectContext } from '../../hooks/WalletLogin'

const styles = {
    heading: `text-base font-[600]`,
    label: `text-[#B1B5C3] text-sm font-[700] cursor-pointer hover:underline`,
    option: `text-[#111] text-sm font-[700] h-[24px]`,
    select: `border border-[#242730] w-full bg-transparent outline-none rounded-lg px-3 py-2 text-sm text-white placeholder:text-[#454850]`,
    input: `border border-[#242730] w-full bg-transparent outline-none rounded px-3 py-2 text-sm text-white placeholder:text-[#454850] mt-2 min-h-10`,
    button: `rounded-full px-7 py-2 bg-[#fff] text-[#111] font-[700] mt-2 hover:bg-[#ffffff68] hover:text-white`,
    chipButton: `rounded-lg flex items-center justify-center min-w-[2.5rem] h-10 w-10 bg-[#333] text-[#aaa] font-[400] focus:border-2 focus:font-[700] focus:text-white`,
    chipButtonActive: `rounded-lg flex items-center justify-center h-10 w-10 bg-[#333] border-2 font-[700] text-white`,
}

const DeliveryInformation = () => {
    const [edit, setEdit] = useState(true)
    const [loading, setloading] = useState(false)
    const [gender, setGender] = useState('-')
    const [sneakersSize, setSneakersSize] = useState([])
    const [sneakersSizeValue, setSneakersSizeValue] = useState(-1)
    const { userInfo, accessToken, updateLocalUserInfo } =
        useContext(WalletConnectContext)
    const [email , setemail ] = useState(userInfo?.email)
    const [mobile , setmobile ] = useState(userInfo?.mobile)
    const [topApparelSize, setTopApparelSize] = useState(
        userInfo?.deliveryInfo?.topApparelSize || -1
    )
    const [bottomApparelSize, setBottomApparelSize] = useState(
        userInfo?.deliveryInfo?.bottomApparelSize || -1
    )
    const [socksSize, setSocksSize] = useState(
        userInfo?.deliveryInfo?.socksSize || -1
    )

    const [shippingDetails, setShippingDetails] = useState({
        firstName: userInfo?.deliveryInfo?.shippingDetails?.firstName || '',
        lastName: userInfo?.deliveryInfo?.shippingDetails?.lastName || '',
        country: userInfo?.deliveryInfo?.shippingDetails?.country || '',
        city: userInfo?.deliveryInfo?.shippingDetails?.city || '',
        state: userInfo?.deliveryInfo?.shippingDetails?.state || '',
        zipCode: userInfo?.deliveryInfo?.shippingDetails?.zipCode || '',
        appartment: userInfo?.deliveryInfo?.shippingDetails?.appartment || '',
        address: userInfo?.deliveryInfo?.shippingDetails?.address || '',
    })
    const sizes = [
        { id: 1, name: 'XS' },
        { id: 2, name: 'S' },
        { id: 3, name: 'M' },
        { id: 4, name: 'L' },
        { id: 5, name: 'XL' },
        { id: 6, name: '2XL' },
        { id: 7, name: '3XL' },
    ]

    const sockSize = [
        { id: 1, name: 'M' },
        { id: 2, name: 'L' },
    ]

    const genderSelect = ["Men's Size", "Women's Size"]

    const mensSizeSelect = [
        {
            EU: 38.5,
            UK: 5.5,
            US: 6,
            gender: 'male',
            id: 'cdbb9102-55ae-407d-b91d-103b628f772d',
        },
        {
            EU: 39,
            UK: 6,
            US: 6.5,
            gender: 'male',
            id: '2ecd43ad-8ef0-400a-a7ea-d4b4fd4ce32d',
        },
        {
            EU: 40,
            UK: 6,
            US: 7,
            gender: 'male',
            id: 'fcc1727c-b872-45cd-9420-e71654afd1be',
        },
        {
            EU: 40.5,
            UK: 6.5,
            US: 7.5,
            gender: 'male',
            id: '80067f82-f941-41b6-a845-d1ffa72761b6',
        },
        {
            EU: 41,
            UK: 7,
            US: 8,
            gender: 'male',
            id: '56969c35-e19d-4757-973f-f775ff47e12e',
        },
        {
            EU: 42,
            UK: 7.5,
            US: 8.5,
            gender: 'male',
            id: '1e2d77e9-b81a-401f-bb12-2092df88b518',
        },
        {
            EU: 42.5,
            UK: 8,
            US: 9,
            gender: 'male',
            id: 'a4595aee-a7b1-403d-8f34-cb55a6ea727b',
        },
        {
            EU: 43,
            UK: 8.5,
            US: 9.5,
            gender: 'male',
            id: '2e3fcd03-82e2-44c0-875f-8ce583678fa8',
        },
        {
            EU: 44,
            UK: 9,
            US: 10,
            gender: 'male',
            id: 'ec975008-85b3-4f51-afee-80655f859fd9',
        },
        {
            EU: 44.5,
            UK: 9.5,
            US: 10.5,
            gender: 'male',
            id: '642d4170-91a5-447a-b6a2-c205ee2e0cf8',
        },
        {
            EU: 45,
            UK: 10,
            US: 11,
            gender: 'male',
            id: '2a1a2c08-172f-405d-baf9-6b208dff13dd',
        },
        {
            EU: 45.5,
            UK: 10.5,
            US: 11.5,
            gender: 'male',
            id: '7b35f1d3-6961-4d0c-bd2d-03b2e00701c8',
        },
        {
            EU: 46,
            UK: 11,
            US: 12,
            gender: 'male',
            id: 'c9b7f95f-6080-44ca-87ed-5d51848111e1',
        },
        {
            EU: 47,
            UK: 11.5,
            US: 12.5,
            gender: 'male',
            id: '09bf0057-ba0a-468e-ba94-f327f0e38fcb',
        },
        {
            EU: 47.5,
            UK: 12,
            US: 13,
            gender: 'male',
            id: 'e584f872-25ff-4f60-9efc-00ef444d09c6',
        },
        {
            EU: 48.5,
            UK: 13,
            US: 14,
            gender: 'male',
            id: '55bdf48b-7879-4b59-a42b-5ca4acdab984',
        },
        {
            EU: 49.5,
            UK: 14,
            US: 15,
            gender: 'male',
            id: '01d737eb-358c-4e52-ab43-89c6492d5496',
        },
    ]

    const womensSizeSelect = [
        {
            EU: 35.5,
            UK: 3,
            US: 5,
            gender: 'female',
            id: 'bd82d150-9e58-4cef-82ec-8be943f5e919',
        },
        {
            EU: 36,
            UK: 3.5,
            US: 5.5,
            gender: 'female',
            id: '6f02e23b-3a55-475d-a997-03f92ab33472',
        },
        {
            EU: 36.5,
            UK: 4,
            US: 6,
            gender: 'female',
            id: 'bdfb163c-d062-442c-a990-41db09cbf8f4',
        },
        {
            EU: 37.5,
            UK: 4.5,
            US: 6.5,
            gender: 'female',
            id: 'a064b0dc-b3ab-4c7b-a4ac-9d653252db63',
        },
        {
            EU: 38,
            UK: 5,
            US: 7,
            gender: 'female',
            id: '8f2e568a-fbea-459f-9068-c27e6a50195e',
        },
        {
            EU: 38.5,
            UK: 5.5,
            US: 7.5,
            gender: 'female',
            id: '03f895e2-d932-48d5-91aa-b4204de6cc16',
        },
        {
            EU: 39,
            UK: 6,
            US: 8,
            gender: 'female',
            id: '09fa141d-4516-40d4-b136-d2b6cf2081ec',
        },
        {
            EU: 40,
            UK: 6,
            US: 8.5,
            gender: 'female',
            id: 'a22cdc73-de09-4168-a01d-2547cc9c6b3e',
        },
        {
            EU: 40.5,
            UK: 6.5,
            US: 9,
            gender: 'female',
            id: '97f42ae0-36ab-46d5-a70c-6fc9db1e65fb',
        },
        {
            EU: 41,
            UK: 7,
            US: 9.5,
            gender: 'female',
            id: 'b826245c-0096-4a8a-8db6-526627c31e3e',
        },
        {
            EU: 42,
            UK: 7.5,
            US: 10,
            gender: 'female',
            id: '0ccc6aa0-cdd8-4454-a365-f9001d9073f1',
        },
        {
            EU: 42.5,
            UK: 8,
            US: 10.5,
            gender: 'female',
            id: 'b1387984-cccd-4024-acc3-132a4870b6fe',
        },
        {
            EU: 43,
            UK: 8.5,
            US: 11,
            gender: 'female',
            id: '59751fa7-53f0-4391-bf89-51bd8945fcc6',
        },
        {
            EU: 44,
            UK: 9,
            US: 11.5,
            gender: 'female',
            id: '301805ee-cc27-451a-b28b-27521e53b7c3',
        },
        {
            EU: 44.5,
            UK: 9.5,
            US: 12,
            gender: 'female',
            id: '6e897978-0120-4a71-bd35-3cfc91a7bf0a',
        },
    ]

    useEffect(() => {
        if (userInfo?.deliveryInfo?.sneakersSize) {
            if (userInfo?.deliveryInfo?.sneakersSize?.gender === 'male') {
                setGender(genderSelect[0])

                for (let i = 0; i < mensSizeSelect.length; i++) {
                    if (
                        mensSizeSelect[i].id ===
                        userInfo?.deliveryInfo?.sneakersSize?.id
                    ) {
                        setSneakersSizeValue(i)
                    }
                }
            }
            if (userInfo?.deliveryInfo?.sneakersSize?.gender === 'female') {
                setGender(genderSelect[1])

                for (let i = 0; i < womensSizeSelect.length; i++) {
                    if (
                        womensSizeSelect[i].id ===
                        userInfo?.deliveryInfo?.sneakersSize?.id
                    ) {
                        setSneakersSizeValue(i)
                    }
                }
            }
        }
    }, [userInfo?.deliveryInfo?.sneakersSize])

    const saveDeliveryInformation = async () => {
        setloading(true)
        try {
            const config = {
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${accessToken}`,
                },
            }

            if (accessToken) {
                await axios
                    .post(
                        `${BACKEND_URL}/users/updateUserDeliveryInfo`,
                        {
                            _id: userInfo._id,
                            topApparelSize,
                            bottomApparelSize,
                            socksSize,
                            shippingDetails,
                            sneakersSize:
                                gender === genderSelect[0]
                                    ? mensSizeSelect[sneakersSizeValue]
                                    : gender === genderSelect[1]
                                    ? womensSizeSelect[sneakersSizeValue]
                                    : '',
                            email,
                            mobile
                        },
                        config
                    )
                    .then((res) => {
                        updateLocalUserInfo()
                        setloading(false)
                    })
                    .catch((err) => {
                        console.log(err)
                        setloading(false)
                    })
            }
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }

    useEffect(() => {
        if (gender === '-') {
            setSneakersSize([])
        }
        if (gender === genderSelect[0]) {
            setSneakersSize(mensSizeSelect)
        }
        if (gender === genderSelect[1]) {
            setSneakersSize(womensSizeSelect)
        }
    }, [gender])

    return (
        <div className='w-full h-full flex flex-col screen2:pb-32'>
            {/* Top */}
            <div className='flex items-center justify-between w-full screen2:hidden'>
                <div className='pl-12'>
                    <TitlePage heading={'Delivery Information'} />
                </div>
                <div className='min-w-[330px] border-borderLine'>
                    <TopSideInfo />
                </div>
            </div>

            <div
                style={{ overflow: 'auto' }}
                className='flex flex-col p-6 px-12 screen3:px-4 gap-y-3'
            >
                <div className='flex w-full flex-col gap-y-3'>
                    <div
                        style={{ marginTop: '20px' }}
                        className='flex w-full items-center justify-between'
                    >
                        <h1 className='font-[800] text-xl'>SIZE INFO</h1>
                        <button
                            style={{ borderRadius: '4px' }}
                            className={`${styles.button} disabled:cursor-not-allowed mynewbtnclass`}
                            onClick={() => {
                                saveDeliveryInformation()
                            }}
                            disabled={loading || (!shippingDetails.firstName || !shippingDetails.lastName || !shippingDetails.country || !shippingDetails.city || !shippingDetails.state || !shippingDetails.zipCode || !shippingDetails.address || !shippingDetails.appartment || !email || !mobile)}
                        >
                            {loading ? 'Updating...' : 'Save Changes'}
                        </button>
                    </div>
                    <div
                        className={`w-full px-10 p-6 gap-10 pb-5 flex flex-col h-min bg-[#111] rounded-lg  screen4:px-5`}
                    >
                        <div className='flex flex-col w-full gap-y-3'>
                            <div className='flex items-center justify-between w-full'>
                                <h2 className={styles.heading}>
                                    SNEAKERS SIZES
                                </h2>
                                <span className={styles.label}>Size chart</span>
                            </div>
                            <div className='flex w-full gap-x-5 screen4:flex-col screen4:gap-y-3'>
                                <select
                                    className={styles.select}
                                    disabled={!edit}
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option
                                        className={styles.option}
                                        value={'-'}
                                    >
                                        Select Gender
                                    </option>
                                    {genderSelect?.map((value, key) => (
                                        <option
                                            className={styles.option}
                                            key={key}
                                            value={value}
                                        >
                                            {value}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    className={styles.select}
                                    disabled={!edit}
                                    value={sneakersSizeValue}
                                    onChange={(e) => {
                                        setSneakersSizeValue(e.target.value)
                                    }}
                                >
                                    {sneakersSize?.length === 0 ? (
                                        <option
                                            className={styles.option}
                                            value={-1}
                                        >
                                            Select Option
                                        </option>
                                    ) : (
                                        sneakersSize?.map((value, key) => (
                                            <option
                                                className={styles.option}
                                                key={key}
                                                value={key}
                                            >
                                                {`${
                                                    value.gender === 'male'
                                                        ? 'MEN'
                                                        : 'WOMEN'
                                                } US ${value.US} / UK ${
                                                    value.UK
                                                } / EU ${value.EU}`}
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className='flex flex-col w-full gap-y-3'>
                            <div className='flex items-center justify-between w-full'>
                                <h2 className={styles.heading}>
                                    TOP APPAREL SIZES
                                </h2>
                                <span className={styles.label}>Size chart</span>
                            </div>
                            <div className='flex w-full gap-x-2 screen4:flex-wrap screen4:gap-y-2'>
                                {sizes?.map((size) => (
                                    <button
                                        className={
                                            topApparelSize === size.name
                                                ? styles.chipButtonActive
                                                : styles.chipButton
                                        }
                                        key={size?.id}
                                        onClick={() => {
                                            setTopApparelSize(size.name)
                                        }}
                                        disabled={!edit}
                                    >
                                        {size?.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className='flex flex-col w-full gap-y-3'>
                            <div className='flex items-center justify-between w-full'>
                                <h2 className={styles.heading}>
                                    BOTTOM APPAREL SIZES
                                </h2>
                                <span className={styles.label}>Size chart</span>
                            </div>
                            <div className='flex w-full gap-x-2'>
                                {sizes?.map((size) => (
                                    <button
                                        className={
                                            bottomApparelSize === size.name
                                                ? styles.chipButtonActive
                                                : styles.chipButton
                                        }
                                        key={size?.id}
                                        onClick={() => {
                                            setBottomApparelSize(size.name)
                                        }}
                                        disabled={!edit}
                                    >
                                        {size?.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className='flex flex-col w-full gap-y-3'>
                            <div className='flex items-center justify-between w-full'>
                                <h2 className={styles.heading}>SOCKS SIZES</h2>
                                <span className={styles.label}>Size chart</span>
                            </div>
                            <div className='flex w-full gap-x-2'>
                                {sockSize?.map((size) => (
                                    <button
                                        className={
                                            socksSize === size.name
                                                ? styles.chipButtonActive
                                                : styles.chipButton
                                        }
                                        key={size?.id}
                                        onClick={() => {
                                            setSocksSize(size.name)
                                        }}
                                        disabled={!edit}
                                    >
                                        {size?.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <h1 className='font-[800] text-xl'>SHIPPING DETAILS</h1>
                    <div
                        className={`w-full px-10 p-6 gap-10 pb-5 flex flex-col h-min bg-[#111] rounded-lg  screen4:px-5`}
                    >
                        <div className='flex flex-col w-full gap-y-5'>
                            <h2 className={styles.heading}>DELIVERY DETAILS</h2>

                            <div className='flex items-center gap-x-4'>
                                <div className='flex flex-col w-full'>
                                    <label
                                        htmlFor=''
                                        className={`${styles.label} hover:no-underline cursor-default`}
                                    >
                                        First Name *
                                    </label>
                                    <input
                                        type='text'
                                        className={`${styles.input}${
                                            edit ? 'border-[#FFF] border-2' : ''
                                        }`}
                                        placeholder={`John`}
                                        value={shippingDetails.firstName}
                                        onChange={(e) => {
                                            setShippingDetails((state) => ({
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
                                        className={`${styles.label} hover:no-underline cursor-default`}
                                    >
                                        Last Name *
                                    </label>
                                    <input
                                        type='text'
                                        className={`${styles.input}${
                                            edit ? 'border-[#FFF] border-2' : ''
                                        }`}
                                        placeholder={`Doe`}
                                        value={shippingDetails.lastName}
                                        onChange={(e) => {
                                            setShippingDetails((state) => ({
                                                ...state,
                                                lastName: e.target.value,
                                            }))
                                        }}
                                        disabled={!edit}
                                    />
                                </div>
                            </div>

                            <div className='flex items-center gap-x-4'>
                                <div className='flex flex-col w-full'>
                                    <label
                                        htmlFor=''
                                        className={`${styles.label} hover:no-underline cursor-default`}
                                    >
                                        Country *
                                    </label>
                                    <input
                                        type='text'
                                        className={`${styles.input}${
                                            edit ? 'border-[#FFF] border-2' : ''
                                        }`}
                                        placeholder={`USA`}
                                        value={shippingDetails.country}
                                        onChange={(e) => {
                                            setShippingDetails((state) => ({
                                                ...state,
                                                country: e.target.value,
                                            }))
                                        }}
                                        disabled={!edit}
                                    />
                                </div>

                                <div className='flex flex-col w-full'>
                                    <label
                                        htmlFor=''
                                        className={`${styles.label} hover:no-underline cursor-default`}
                                    >
                                        City *
                                    </label>
                                    <input
                                        type='text'
                                        className={`${styles.input}${
                                            edit ? 'border-[#FFF] border-2' : ''
                                        }`}
                                        placeholder={`Boston`}
                                        value={shippingDetails.city}
                                        onChange={(e) => {
                                            setShippingDetails((state) => ({
                                                ...state,
                                                city: e.target.value,
                                            }))
                                        }}
                                        disabled={!edit}
                                    />
                                </div>
                            </div>

                            <div className='flex items-center gap-x-4'>
                                <div className='flex flex-col w-full'>
                                    <label
                                        htmlFor=''
                                        className={`${styles.label} hover:no-underline cursor-default`}
                                    >
                                        State/Province *
                                    </label>
                                    <input
                                        type='text'
                                        className={`${styles.input}${
                                            edit ? 'border-[#FFF] border-2' : ''
                                        }`}
                                        placeholder={`Massachusetts`}
                                        value={shippingDetails.state}
                                        onChange={(e) => {
                                            setShippingDetails((state) => ({
                                                ...state,
                                                state: e.target.value,
                                            }))
                                        }}
                                        disabled={!edit}
                                    />
                                </div>

                                <div className='flex flex-col w-full'>
                                    <label
                                        htmlFor=''
                                        className={`${styles.label} hover:no-underline cursor-default`}
                                    >
                                        Zip Code *
                                    </label>
                                    <input
                                        type='text'
                                        className={`${styles.input}${
                                            edit ? 'border-[#FFF] border-2' : ''
                                        }`}
                                        placeholder={`4564`}
                                        value={shippingDetails.zipCode}
                                        onChange={(e) => {
                                            setShippingDetails((state) => ({
                                                ...state,
                                                zipCode: e.target.value,
                                            }))
                                        }}
                                        disabled={!edit}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col w-full'>
                                <label
                                    htmlFor=''
                                    className={`${styles.label} hover:no-underline cursor-default`}
                                >
                                    Address *
                                </label>
                                <input
                                    type='text'
                                    className={`${styles.input}${
                                        edit ? 'border-[#FFF] border-2' : ''
                                    }`}
                                    placeholder={`3 Fifth Ave.`}
                                    value={shippingDetails.address}
                                    onChange={(e) => {
                                        setShippingDetails((state) => ({
                                            ...state,
                                            address: e.target.value,
                                        }))
                                    }}
                                    disabled={!edit}
                                />
                            </div>

                            <div className='flex flex-col w-full'>
                                <label
                                    htmlFor=''
                                    className={`${styles.label} hover:no-underline cursor-default`}
                                >
                                    Apartment *
                                </label>
                                <input
                                    type='text'
                                    className={`${styles.input}${
                                        edit ? 'border-[#FFF] border-2' : ''
                                    }`}
                                    placeholder={`Appartment no. 42`}
                                    value={shippingDetails.appartment}
                                    onChange={(e) => {
                                        setShippingDetails((state) => ({
                                            ...state,
                                            appartment: e.target.value,
                                        }))
                                    }}
                                    disabled={!edit}
                                />
                            </div>
                        </div>
                    </div>

                    <h1 className='font-[800] text-xl'>CONTACT INFO</h1>
                    <div
                        className={`w-full px-10 p-6 gap-10 pb-5 flex flex-col h-min bg-[#111] rounded-lg screen4:px-5`}
                    >
                        <div className='flex flex-col w-full gap-y-5'>
                            <h2 className={styles.heading}>SHIPPING DETAILS</h2>
                            <div className='flex flex-col w-full'>
                                <label
                                    htmlFor=''
                                    className={`${styles.label} hover:no-underline cursor-default`}
                                >
                                    Email *
                                </label>
                                <input
                                    type='email'
                                    className={`${styles.input}`}
                                    placeholder={`johndoe@gmail.com`}
                                    value={email}
                                    onChange={(e) => { setemail(e.target.value) }}
                                />
                            </div>
                            <div className='flex flex-col w-full'>
                                <label
                                    htmlFor=''
                                    className={`${styles.label} hover:no-underline cursor-default`}
                                >
                                    Phone Number *
                                </label>
                                <input
                                    type='number'
                                    className={`${styles.input}`}
                                    placeholder={`eg. +33 786-567-456`}
                                    value={mobile}
                                    onChange={(e) => { setmobile(e.target.value) }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeliveryInformation
