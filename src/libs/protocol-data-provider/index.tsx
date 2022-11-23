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
import { initCornerstoneSDKWithSigner } from '@corndao/corn-sdk';
import { Near } from 'near-api-js';
import { IncentivesController } from '@pret/contract-helpers';

const LS_KEY = 'selectedMarket';

export interface ProtocolContextData {
  showMarketTableItemAPYCell: boolean;
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
  const [showMarketTableItemAPYCell, setShowMarketTableItemAPYCell] = useState(false);

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
  const incentivesTxBuilder = new IncentivesController(getProvider(currentMarketData.chainId));
  const incentivesControllerAddress = addresses.incentiveControllers?.corn;
  useEffect(() => {
    (async function () {
      setShowMarketTableItemAPYCell(true);
      if (currentMarketData.cornPrice) {
        setTokenPrice({
          aurora: await getAuroraPrice(),
          corn: currentMarketData.cornPrice,
        });
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
        setTokenPrice({
          aurora: await getAuroraPrice(),
          corn: cornMarketPrice.toFixed(),
        });
      }
    })();
    (async function () {
      console.log({ incentivesControllerAddress });
      if (!incentivesControllerAddress) return;
      const distributionEnd = await incentivesTxBuilder.DISTRIBUTION_END({
        incentivesControllerAddress,
      });
      const distributionEndTimestamp = Number(distributionEnd.toString());
      const nowTimestamp = Math.floor(Date.now() / 1000);
      if (distributionEndTimestamp < nowTimestamp) setShowMarketTableItemAPYCell(false);
      console.log({
        distributionEndTimestamp,
        nowTimestamp,
      });
    })();
  }, []);

  return (
    <PoolDataContext.Provider
      value={{
        showMarketTableItemAPYCell,
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
