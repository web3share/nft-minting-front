import { useAccount, useConnect, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi';
import { goerli } from 'wagmi/chains'
import './ConnectButton.css'
// import { simplifyAddress } from '../utils/string';


function ConnectButton(){
    const { chain } = useNetwork();
    const { address } = useAccount();
    const { connect, connectors } = useConnect()
    const { disconnect } = useDisconnect();
    const { switchNetwork } = useSwitchNetwork();
    return address ? (
        <div
            className='connect-button'
            onClick={() => (chain?.unsupported ? switchNetwork?.(goerli.id) : disconnect())}
        >
             Chain:{chain?.name}    
             <p>{chain?.unsupported ? 'NETWORK UNSUPPORTED' : address}</p>
        </div>
    ) : (
        <div
            className='connect-button'
            onClick={() =>
                connect({ connector: connectors[0] })
            }
        >
            CONNECT WALLET
        </div>
    );

}

export default ConnectButton;