import React, { useContext } from 'react'
import DefaultLoader from './loaders/DefaultLoader'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { WalletConnectContext } from '../../hooks/WalletLogin'

const DiscordConnectPage = () => {
    const location = useLocation()
    const code = location.search.split('=')[1]
    const { connectToDiscord, isWalletLogin } = useContext(WalletConnectContext)

    useEffect(() => {
        const getDiscordUser = async () => {
            if (code && isWalletLogin) {
                connectToDiscord(code)
            }
        }

        getDiscordUser()
    }, [code, isWalletLogin])
    return (
        <div className='flex h-full w-full items-center justify-center relative'>
            <DefaultLoader />
        </div>
    )
}

export default DiscordConnectPage
