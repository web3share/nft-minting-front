import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { createClient, configureChains, Chain, } from 'wagmi';
import { goerli } from 'wagmi/chains'
import { RPC_URL } from './contracts';

export const { chains, provider } = configureChains(
    [goerli],
    [
        jsonRpcProvider({
            rpc: (chain: Chain) => ({
                http: chain.id === goerli.id ? RPC_URL : '',
            }),
        }),
        publicProvider(),
    ]
);

export const connectors = [new InjectedConnector({ chains })];

export const client = createClient({
    autoConnect: false,
    provider,
    connectors,
});
