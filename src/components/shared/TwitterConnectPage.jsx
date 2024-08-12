import React, { useContext } from 'react'
import DefaultLoader from './loaders/DefaultLoader'
import { useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { BACKEND_URL, WalletConnectContext } from '../../hooks/WalletLogin'
import axios from 'axios'

const TwitterConnectPage = () => {
    const location = useLocation()
    const oauth_token_line = location.search.split('&')[0]
    const oauth_token = oauth_token_line.split('=')[1]
    const oauth_verifier_line = location.search.split('&')[1]
    const oauth_verifier = oauth_verifier_line.split('=')[1]

    // console.log(oauth_verifier, oauth_token)
    const { updateLocalUserInfo, isWalletLogin, userInfo } =
        useContext(WalletConnectContext)

    useEffect(() => {
        const getTwitterConnect = async () => {
            await axios
                .post(
                    `${BACKEND_URL}/auth/twitter?oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}`,
                    { walletAddress: userInfo.walletAddress }
                )
                .then((res) => {
                    updateLocalUserInfo()
                    window.location.assign('/')
                })
                .catch((err) => {
                    console.log(err)
                    window.location.assign('/')
                })
        }

        getTwitterConnect()
    }, [isWalletLogin])

    return (
        <div className='flex h-full w-full items-center justify-center relative'>
            <DefaultLoader />
        </div>
    )
}

export default TwitterConnectPage
