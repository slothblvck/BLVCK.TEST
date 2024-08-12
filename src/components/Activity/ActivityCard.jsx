import { useState } from 'react'
import coin from '../../assets/svg/BlvckCoin.svg'
import bcrypt from 'bcryptjs'
import { WalletConnectContext } from '../../hooks/WalletLogin'
import { useContext } from 'react'
import axios from 'axios'

const ActivityCard = ({ activity }) => {
    const [ hover, sethover ] = useState(false)
    const [ refundMsg, setrefundMsg ] = useState('')
    const [ check, setcheck ] = useState(false)
    const {
        userInfo
    } = useContext(WalletConnectContext)

    const checkRefund = async () => {
        const salt = await bcrypt.genSalt(10)
        const verificationHash = await bcrypt.hashSync(
                `KURAMAxBLVCK Verification Hash 909f08bb-9014-4933-b191-ade0188a4f64`,
                salt
            )
        setcheck(true)
        await axios
            .post(
                `${process.env.REACT_APP_KURAMA_BACKEND_URL ? process.env.REACT_APP_KURAMA_BACKEND_URL : 'https://prodKurama.foxledger.io'}/collection/CheckBLVCKRefund`,
                {
                    walletAddress : userInfo?.walletAddress, verificationHash: verificationHash, uuid: activity.uuid, coins: activity.price
                }
            ).then((res) => {
                setrefundMsg(res.data.msg)
            })
        setcheck(false)
    }

    return (
        <div className='w-full p-5 rounded-xl flex items-center justify-between screen4:p-3 screen4:px-4 hover:scale-[1.01] ease-in-out'>
            {/* LEFT */}
            <div className='flex items-center gap-x-3'>
                <div className='w-[57px] h-[57px] rounded-xl screen4:w-[50px] screen4:h-[50px]'>
                    <img
                        src={activity.img}
                        alt=''
                        className='w-[inherit] h-[inherit] rounded-xl object-cover shadow'
                    />
                </div>
                <div className='flex min-h-[57px] flex-col justify-between'>
                    <p className='font-[600] text-2xl screen3:text-xl'>
                        {activity.name}
                    </p>
                    <p className='font-[400] text-sm screen3:text-xs'>
                        {new Date(activity.timestamp).toLocaleString()}
                    </p>
                </div>
            </div>
            {/* RIGHT */}
            <span onMouseEnter={() => sethover(true)} onMouseLeave={() => sethover(false)} className='p-2 px-4 rounded-full flex items-center justify-center gap-x-2 text-2xl font-[700]'>
                {(hover && (activity.name == 'Transfered to KURAMA')) ? <button onClick={checkRefund} style={{
                        borderColor: 'rgba(58, 60, 64, 1)',
                        backgroundColor: 'rgba(13, 14, 18, 1)',
                        borderWidth: '1px',
                        padding: '0.5rem 1.5rem',
                        fontSize: '18px',
                        borderRadius: '0.5rem',
                }}>{refundMsg ? refundMsg : (check ? 'Checking...' : 'Refund')}</button> : <><span>{activity.cnt ? (activity.price * activity.cnt) : activity.price}</span>
                <img src={coin} alt='' /></>}
            </span>
        </div>
    )
}

export default ActivityCard
