import { useCallback, useEffect, useState } from 'react';
import { useAccount, useContract, useProvider, useSigner } from 'wagmi';
import { BigNumber, ethers } from 'ethers';
import { FaMinus, FaPlus } from 'react-icons/fa'
import NFTABI from '../constants/abi/NFT.json';
import { NFT_CONTRACT_ADDRESS } from '../constants/contracts';
import './MintButton.css'
const MAX_SUPPLY = 2023

function MintButton() {
    const { address, } = useAccount()
    const { data: signer } = useSigner()
    const provider = useProvider()
    
    const [count, setCount] = useState(1)
    const [totalSupply, setTotalSupply] = useState(0)
    const [price, setPrice] = useState(BigNumber.from(0))
    const [hint, setHint] = useState('')


    const nftContract = useContract({
        address: NFT_CONTRACT_ADDRESS,
        abi: NFTABI,
        signerOrProvider: signer || provider,
    })    

    const handleMint = useCallback(async () => {
        if (address && nftContract && signer && count > 0) {
            try {
                await nftContract.mint(count, {
                    value: price.mul(count)
                })
                setHint(`Congradulations! You minted ${count} NFT`)
            } catch (e: any) {
                setHint(`Mint Failed`)
            }
        }

    },[address, count, nftContract, price, signer])


    useEffect(() => {
        const update = async () => {
            if (nftContract) {
                const totalSupplyTemp = await nftContract.totalSupply()
                const priceTemp = await nftContract.getPricePerNFT()
                setTotalSupply(totalSupplyTemp.toNumber())
                setPrice(priceTemp)
                
            }
        }
        update();
    }, [nftContract])


    useEffect(() => {
        const update = async () => {
            if (address) {
                const totalCost = await price.mul(count)
                const balance = await provider.getBalance(address)
                if (totalCost.gt(balance)) {
                    setHint('You don\'t have enough balance')
                }
            }
        }
        update();
    }, [price, count, provider, address])


    return <div className="mint-wrapper">
    <div className="mint-hint-text">{hint}</div>
    <div className="mint-button-wrapper">
        <div className="mint-button noselect" onClick={handleMint}>M I N T</div>
        <div className="mint-count-wrapper">
            <div className="mint-count-minus" onClick={() => {
                setCount(Math.max(count - 1, 1))
            }}>
                <FaMinus size={30} />
            </div>
            <div className="mint-count noselect">{count}</div>
            <div className="mint-count-plus" onClick={() => {
                setCount(Math.min(count + 1, MAX_SUPPLY - totalSupply))
            }}>
                <FaPlus size={30} />
            </div>
        </div>
    </div>
</div>


    
}




export default MintButton;