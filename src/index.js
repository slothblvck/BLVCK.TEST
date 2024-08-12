import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { WalletConnectProviderHook } from './hooks/WalletLogin'

ReactDOM.render(
    <WalletConnectProviderHook>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </WalletConnectProviderHook>,
    document.getElementById('root')
)
