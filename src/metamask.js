import Web3Modal from 'web3modal'
import Web3 from 'web3'
// import { useDispatch } from 'react-redux'

export function Connection() {
    // const dispatch = useDispatch()
    const providerOptions = {}
    const web3Modal = new Web3Modal({
        network: 'testnet',
        cacheProvider: true,
        providerOptions, // required
    })

    async function connectPrompt(isConnected, setOpen, setLoading) {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3) {
            try {
                const provider = await web3Modal.connect()
                const web3 = new Web3(provider)
                if (isConnected === true) {
                    const address = await web3.eth
                        .getAccounts()
                        .then((data) => data[0])
                    // if (setLoading) setLoading(false)
                    // localStorage.setItem('metamaskInfo', JSON.stringify({ address }))
                    return address
                } else {
                    // if (setLoading) setLoading(false)
                    const data = await web3Modal.clearCachedProvider()
                }
            } catch (e) {
                console.log(e)
                // if (setLoading) setLoading(false)
            }
        } else {
            // setOpen(true)
            // if (setLoading) setLoading(false)
        }
    }

    return [web3Modal, connectPrompt]
}
