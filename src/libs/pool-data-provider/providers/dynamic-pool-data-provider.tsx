import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';

import { useCurrentTimestamp } from '../hooks/use-current-timestamp';
import { useStaticPoolDataContext } from './static-pool-data-provider';
import {
  formatReserve,
  FormatReserveResponse,
  formatUserSummary,
  FormatUserSummaryResponse,
  normalize,
} from '@aave/math-utils';

export interface ComputedReserveData extends FormatReserveResponse {
  id: string;
  underlyingAsset: string;
  name: string;
  symbol: string;
  decimals: number;
  usageAsCollateralEnabled: boolean;
  borrowingEnabled: boolean;
  stableBorrowRateEnabled: boolean;
  isActive: boolean;
  isFrozen: boolean;
  aTokenAddress: string;
  stableDebtTokenAddress: string;
  variableDebtTokenAddress: string;
  priceInMarketReferenceCurrency: string;
  avg30DaysLiquidityRate?: string;
  avg30DaysVariableBorrowRate?: string;
}

export interface UserSummary extends FormatUserSummaryResponse {
  id: string;
}

export interface DynamicPoolDataContextData {
  reserves: ComputedReserveData[];
  user?: UserSummary;
}

const DynamicPoolDataContext = React.createContext({} as DynamicPoolDataContextData);

export function DynamicPoolDataProvider({ children }: PropsWithChildren<{}>) {
  const { rawReserves, rawUserReserves, userId, marketRefCurrencyDecimals, marketRefPriceInUsd } =
    useStaticPoolDataContext();
  const currentTimestamp = useCurrentTimestamp(1);
  const [lastAvgRatesUpdateTimestamp, setLastAvgRatesUpdateTimestamp] = useState(currentTimestamp);

  useEffect(() => {
    if (currentTimestamp > lastAvgRatesUpdateTimestamp + 1000 * 60 * 5) {
      setLastAvgRatesUpdateTimestamp(currentTimestamp);
    }
  }, [currentTimestamp, lastAvgRatesUpdateTimestamp]);

  const computedUserData =
    userId && rawUserReserves
      ? formatUserSummary({
          currentTimestamp,
          marketRefPriceInUsd,
          marketRefCurrencyDecimals,
          rawUserReserves: rawUserReserves,
        })
      : undefined;
  // transform `MOCK-{TOKEN}.{SUFFIX}` to `{TOKEN}`
  const formatSymbol = (symbol: string) =>
    symbol.startsWith('MOCK-') ? symbol.replace('MOCK-', '').split('.')[0].toUpperCase() : symbol;
  const formattedPoolReserves: ComputedReserveData[] = rawReserves.map((reserve) => {
    const formattedReserve = formatReserve({
      reserve,
      currentTimestamp,
    });
    const fullReserve: ComputedReserveData = {
      ...{
        ...reserve,
        symbol: formatSymbol(reserve.symbol),
      },
      ...formattedReserve,
      priceInMarketReferenceCurrency: normalize(
        reserve.priceInMarketReferenceCurrency,
        marketRefCurrencyDecimals
      ),
    };
    return fullReserve;
  });

  let userSummary: UserSummary | undefined = undefined;
  if (computedUserData && userId) {
    userSummary = {
      id: userId,
      ...computedUserData,
      userReservesData: computedUserData.userReservesData.map((userReserve) => ({
        ...userReserve,
        reserve: { ...userReserve.reserve, symbol: formatSymbol(userReserve.reserve.symbol) },
      })),
    };
  }
  return (
    <DynamicPoolDataContext.Provider
      value={{
        user: userSummary,
        reserves: formattedPoolReserves,
      }}
    >
      {children}
    </DynamicPoolDataContext.Provider>
  );
}

export const useDynamicPoolDataContext = () => useContext(DynamicPoolDataContext);
