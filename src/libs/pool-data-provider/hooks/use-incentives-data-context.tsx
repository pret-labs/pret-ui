import {
  Denominations,
  IncentivesController,
  IncentivesControllerInterface,
} from '@pret/contract-helpers';
import {
  calculateAllUserIncentives,
  calculateAllReserveIncentives,
  ReserveIncentiveDict,
  UserIncentiveDict,
  WEI_DECIMALS,
  ReserveCalculationData,
  UserReserveCalculationData,
} from '@aave/math-utils';
import { API_ETH_MOCK_ADDRESS, calculateSupplies } from '@aave/protocol-js';
import React, { ReactNode, useContext } from 'react';
import Preloader from '../../../components/basic/Preloader';
import ErrorPage from '../../../components/ErrorPage';
import { getProvider } from '../../../helpers/config/markets-and-network-config';
import { useApolloConfigContext } from '../../apollo-config';
import {
  PoolIncentivesWithCache,
  useCachedIncentivesData,
} from '../../caching-server-data-provider/hooks/use-cached-incentives-data';
import { ConnectionMode, useConnectionStatusContext } from '../../connection-status-provider';
import { useProtocolDataContext } from '../../protocol-data-provider';
import { useStaticPoolDataContext } from '../providers/static-pool-data-provider';
import { useCurrentTimestamp } from './use-current-timestamp';
import { IncentiveDataResponse, useIncentivesData } from './use-incentives-data';

export interface IncentivesContext {
  reserveIncentives: ReserveIncentiveDict[];
  userIncentives: UserIncentiveDict[];
  incentivesTxBuilder: IncentivesControllerInterface;
  refresh: () => void;
}

const IncentivesDataContext = React.createContext({} as IncentivesContext);

export function IncentivesDataProvider({ children }: { children: ReactNode }) {
  const { userId, rawReservesWithBase, rawUserReservesWithBase } = useStaticPoolDataContext();
  const { chainId, networkConfig, currentMarketData } = useProtocolDataContext();
  const { chainId: apolloClientChainId } = useApolloConfigContext();
  const { preferredConnectionMode, isRPCActive } = useConnectionStatusContext();
  const currentTimestamp = useCurrentTimestamp(1);
  const currentAccount = userId ? userId.toLowerCase() : undefined;
  const incentivesTxBuilder: IncentivesControllerInterface = new IncentivesController(
    getProvider(chainId)
  );

  const { loading: cachedDataLoading, error: cachedDataError }: PoolIncentivesWithCache =
    useCachedIncentivesData(
      currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
      currentAccount,
      networkConfig.addresses.chainlinkFeedRegistry,
      networkConfig.usdMarket ? Denominations.usd : Denominations.eth,
      preferredConnectionMode === ConnectionMode.rpc ||
        chainId !== apolloClientChainId ||
        !networkConfig.addresses.uiIncentiveDataProvider
    );

  const incentiveControllers = Object.values(networkConfig.addresses.incentiveControllers ?? {});

  let rpcDatas = [],
    rpcDataLoading = false,
    rpcDataError = false,
    refresh = async () => {};

  if (incentiveControllers && incentiveControllers.length) {
    for (const uiIncentiveDataController of incentiveControllers) {
      const {
        data,
        loading,
        error,
        refresh: _refresh,
      }: IncentiveDataResponse = useIncentivesData(
        currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
        chainId,
        networkConfig.addresses.uiIncentiveDataProvider,
        !isRPCActive || !networkConfig.addresses.uiIncentiveDataProvider,
        uiIncentiveDataController,
        currentAccount
      );
      rpcDatas.push(data);
      if (loading) rpcDataLoading = true;
      if (error) rpcDataError = true;
      refresh = _refresh;
    }
  }

  // Create array of formatted user and reserve data used for user incentive calculations
  let computedUserReserves: UserReserveCalculationData[] = [];
  if (rawUserReservesWithBase) {
    rawUserReservesWithBase.forEach((userReserve) => {
      const reserve = rawReservesWithBase.find(
        (reserve) =>
          reserve.underlyingAsset.toLowerCase() ===
          userReserve.reserve.underlyingAsset.toLowerCase()
      );
      if (reserve) {
        const reserveSupplyData = {
          totalScaledVariableDebt: reserve.totalScaledVariableDebt,
          variableBorrowIndex: reserve.variableBorrowIndex,
          variableBorrowRate: reserve.variableBorrowRate,
          totalPrincipalStableDebt: reserve.totalPrincipalStableDebt,
          averageStableRate: reserve.averageStableRate,
          availableLiquidity: reserve.availableLiquidity,
          stableDebtLastUpdateTimestamp: reserve.stableDebtLastUpdateTimestamp,
          lastUpdateTimestamp: reserve.lastUpdateTimestamp,
        };
        const supplies = calculateSupplies(reserveSupplyData, currentTimestamp);
        // Construct UserReserveData object from reserve and userReserve fields
        computedUserReserves.push({
          underlyingAsset: userReserve.reserve.underlyingAsset.toLowerCase(),
          totalLiquidity: supplies.totalLiquidity.toString(),
          liquidityIndex: reserve.liquidityIndex,
          totalScaledVariableDebt: reserve.totalScaledVariableDebt,
          totalPrincipalStableDebt: reserve.totalPrincipalStableDebt,
          scaledATokenBalance: userReserve.scaledATokenBalance,
          scaledVariableDebt: userReserve.scaledVariableDebt,
          principalStableDebt: userReserve.principalStableDebt,
        });
      }
    });
  }
  // Create array of formatted reserve data used for reserve incentive calculations
  const computedReserves: ReserveCalculationData[] = rawReservesWithBase.map((reserve) => {
    const reserveSupplyData = {
      totalScaledVariableDebt: reserve.totalScaledVariableDebt,
      variableBorrowIndex: reserve.variableBorrowIndex,
      variableBorrowRate: reserve.variableBorrowRate,
      totalPrincipalStableDebt: reserve.totalPrincipalStableDebt,
      averageStableRate: reserve.averageStableRate,
      availableLiquidity: reserve.availableLiquidity,
      stableDebtLastUpdateTimestamp: reserve.stableDebtLastUpdateTimestamp,
      lastUpdateTimestamp: reserve.lastUpdateTimestamp,
    };
    const supplies = calculateSupplies(reserveSupplyData, currentTimestamp);
    return {
      underlyingAsset: reserve.underlyingAsset,
      symbol: reserve.symbol,
      totalLiquidity: supplies.totalLiquidity.toString(),
      totalVariableDebt: supplies.totalVariableDebt.toString(),
      totalStableDebt: supplies.totalStableDebt.toString(),
      priceInMarketReferenceCurrency: reserve.priceInMarketReferenceCurrency,
      marketReferenceCurrencyDecimals: WEI_DECIMALS,
      decimals: reserve.decimals,
    };
  });

  if ((isRPCActive && rpcDataLoading) || (!isRPCActive && cachedDataLoading)) {
    return <Preloader withBackground={true} />;
  }

  if (rpcDatas.length === 0 || (isRPCActive && rpcDataError) || (!isRPCActive && cachedDataError)) {
    return <ErrorPage />;
  }

  // Compute the incentive APYs for all reserve assets, returned as dictionary indexed by underlyingAsset
  let reserveIncentives = rpcDatas.map((rpcData) => {
    return calculateAllReserveIncentives({
      reserveIncentives:
        rpcData && rpcData.reserveIncentiveData ? rpcData.reserveIncentiveData : [],
      reserves: computedReserves,
    });
  });

  for (let i = 0; i < reserveIncentives.length; i++) {
    // Add entry with mock address (0xeeeee..) for base asset incentives
    if (
      networkConfig.baseAssetWrappedAddress &&
      reserveIncentives[i][networkConfig.baseAssetWrappedAddress.toLowerCase()]
    ) {
      reserveIncentives[i][API_ETH_MOCK_ADDRESS.toLowerCase()] =
        reserveIncentives[i][networkConfig.baseAssetWrappedAddress.toLowerCase()];
    }
  }

  const userIncentives = rpcDatas.map((rpcData) => {
    return calculateAllUserIncentives({
      reserveIncentives:
        rpcData && rpcData.reserveIncentiveData ? rpcData.reserveIncentiveData : [],
      userReserveIncentives: rpcData && rpcData.userIncentiveData ? rpcData.userIncentiveData : [],
      userReserves: computedUserReserves,
      currentTimestamp,
    });
  });

  return (
    <IncentivesDataContext.Provider
      value={{
        incentivesTxBuilder,
        reserveIncentives,
        userIncentives,
        refresh: isRPCActive ? refresh : async () => {},
      }}
    >
      {children}
    </IncentivesDataContext.Provider>
  );
}

export const useIncentivesDataContext = () => useContext(IncentivesDataContext);
