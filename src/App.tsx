import './App.css';
import { WagmiConfig } from 'wagmi';
import { client } from './constants/wagmi';
import ConnectButton from './components/ConnectButton';
import MintButton from './components/MintButton';


function App() {
  return (
    <WagmiConfig client={client}>
      <div className="App">
        <div className="connect-button-section">
          <ConnectButton />
        </div>
        <div className="mint-button-section">
          <MintButton />
        </div>
      </div>
    </WagmiConfig>
  );
}

export default App;
