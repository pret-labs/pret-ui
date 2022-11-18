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
  const { publicJsonRPCUrl, addresses } = getNetworkConfig(currentMarketData.chainId);
  async function getAuroraPrice() {
    if (publicJsonRPCUrl.length === 0) {
      throw new Error('need to config publicJsonRPCUrl');
    }
    if (!addresses.auroraPriceFeedAddress) {
      throw new Error('need to config auroraPriceFeedAddress');
    }
    const provider = new ethers.providers.JsonRpcProvider(publicJsonRPCUrl[0]);
    const priceFeed = new ethers.Contract(
      addresses.auroraPriceFeedAddress,
      aggregatorV3InterfaceABI,
      provider
    );
    const lastRoundData = await priceFeed.latestRoundData();
    const decimals = await priceFeed.decimals();
    return new BigNumber(lastRoundData.answer.toString()).div(10 ** decimals).toFixed();
  }
  useEffect(() => {
    (async function () {
      if (currentMarketData.cornPrice) {
        setTokenPrice({
          aurora: await getAuroraPrice(),
          corn: currentMarketData.cornPrice,
        });
      } else {
        setTokenPrice({
          aurora: await getAuroraPrice(),
          corn: '0', // fetch from sdk
        });
      }
    })();
  }, []);
  console.log({ tokenPrice });

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
