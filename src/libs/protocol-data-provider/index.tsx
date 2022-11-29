import { ethers, providers } from 'ethers';
import React, { PropsWithChildren, useContext, useState } from 'react';
import { MarketDataType, NetworkConfig, TokenPrice } from '../../helpers/config/types';
import {
  availableMarkets,
  marketsData,
  getNetworkConfig,
  getProvider,
  CustomMarket,
} from '../../helpers/config/markets-and-network-config';
import { BigNumber } from '@aave/protocol-js';
import { useEffect } from 'react';
import { initCornerstoneSDKWithSigner } from '@corndao/corn-sdk';
import { Near } from 'near-api-js';
import { aggregatorV3InterfaceABI } from '../../ui-config/abi';

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
    if (!addresses.auroraPriceFeed) {
      throw new Error('need to config auroraPriceFeed');
    }
    const provider = new ethers.providers.JsonRpcProvider(publicJsonRPCUrl[0]);
    const priceFeed = new ethers.Contract(
      addresses.auroraPriceFeed,
      aggregatorV3InterfaceABI,
      provider
    );
    const lastRoundData = await priceFeed.latestRoundData();
    const decimals = await priceFeed.decimals();
    return new BigNumber(lastRoundData.answer.toString()).div(10 ** decimals).toFixed();
  }
  async function getCornPrice() {
    if (currentMarketData.cornPrice) {
      return currentMarketData.cornPrice;
    } else {
      if (!currentMarketData.cornerstoneSDKConfig || !currentMarketData.nearConfig) {
        throw new Error('Need to config cornerstoneSDK');
      }
      const cornerstoneSDK = await initCornerstoneSDKWithSigner(
        // no need to sign, pass empty
        '',
        new Near(currentMarketData.nearConfig),
        currentMarketData.cornerstoneSDKConfig
      );
      const cornMarketPrice = await cornerstoneSDK.dataService.cornMarketPriceInUSD();
      return cornMarketPrice.toFixed();
    }
  }
  useEffect(() => {
    setInterval(() => {
      Promise.all([getAuroraPrice(), getCornPrice()]).then(([auroraPrice, cornPrice]) => {
        setTokenPrice({
          aurora: auroraPrice,
          corn: cornPrice,
        });
      });
    }, 1000);
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
