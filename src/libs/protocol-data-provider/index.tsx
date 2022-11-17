import { ethers, providers } from 'ethers';
import React, { PropsWithChildren, useContext, useState } from 'react';
import { MarketDataType, NetworkConfig } from '../../helpers/config/types';
import {
  availableMarkets,
  marketsData,
  getNetworkConfig,
  getProvider,
  CustomMarket,
} from '../../helpers/config/markets-and-network-config';
import { aggregatorV3InterfaceABI, TokenPrice } from '../../ui-config/markets';
import { BigNumber } from '@aave/protocol-js';
import { useEffect } from 'react';

const LS_KEY = 'selectedMarket';

export interface ProtocolContextData {
  tokenPrice?: TokenPrice;
  currentMarket: CustomMarket;
  setCurrentMarket: (market: CustomMarket) => void;
  currentMarketData: MarketDataType;
  // currently selected one
  chainId: number;
  networkConfig: NetworkConfig;
  jsonRpcProvider: providers.Provider;
}

const PoolDataContext = React.createContext({} as ProtocolContextData);

/**
 * @returns the last accessed market if it's still available, the first market if not.
 */
const getInitialMarket = () => {
  const cachedMarket = localStorage.getItem(LS_KEY) as CustomMarket | undefined;
  if (cachedMarket && availableMarkets.includes(cachedMarket)) return cachedMarket;
  return availableMarkets[0];
};

export function ProtocolDataProvider({ children }: PropsWithChildren<{}>) {
  const [currentMarket, setCurrentMarket] = useState<CustomMarket>(getInitialMarket());

  const currentMarketData = marketsData[currentMarket];

  const handleSetMarket = (market: CustomMarket) => {
    localStorage.setItem(LS_KEY, market);
    setCurrentMarket(market);
  };

  const [tokenPrice, setTokenPrice] = useState<TokenPrice | undefined>();

  const { networkConfig } = useProtocolDataContext();
  async function getAuroraPrice(publicJsonRPCUrl: string) {
    const provider = new ethers.providers.JsonRpcProvider(publicJsonRPCUrl);
    // need to confirm this is chainlinkFeedRegistry
    const addr = '0xAe3F6EB5d0B4C0A4C8571aa1E40bE65FE84f4eE2';
    const priceFeed = new ethers.Contract(addr, aggregatorV3InterfaceABI, provider);
    const lastRoundData = await priceFeed.latestRoundData();
    const decimals = await priceFeed.decimals();
    return new BigNumber(lastRoundData.answer.toString()).div(10 ** decimals).toFixed();
  }
  useEffect(() => {
    (async function () {
      let errorArray = [];
      for (let publicJsonRPCUrl of networkConfig.publicJsonRPCUrl) {
        try {
          setTokenPrice({
            aurora: await getAuroraPrice(publicJsonRPCUrl),
            corn: '1', // todo, need to provide fixed corn price or chainlink feed
          });
          errorArray = []; // clear error array
          break;
        } catch (error) {
          errorArray.push(error);
          continue;
        }
      }
      errorArray.forEach((error) => {
        throw error;
      });
    })();
  }, []);

  return (
    <PoolDataContext.Provider
      value={{
        tokenPrice,
        currentMarket,
        chainId: currentMarketData.chainId,
        setCurrentMarket: handleSetMarket,
        currentMarketData: currentMarketData,
        networkConfig: getNetworkConfig(currentMarketData.chainId),
        jsonRpcProvider: getProvider(currentMarketData.chainId),
      }}
    >
      {children}
    </PoolDataContext.Provider>
  );
}

export const useProtocolDataContext = () => useContext(PoolDataContext);
