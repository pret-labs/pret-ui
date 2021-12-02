import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';

import { useCurrentTimestamp } from '../hooks/use-current-timestamp';
import { useStaticPoolDataContext } from './static-pool-data-provider';
import {
  formatReserves,
  formatUserSummary,
  FormatUserSummaryResponse,
  FormatReservesUSDRequest,
} from '@aave/math-utils';
import { ReserveDataHumanized } from '@aave/contract-helpers';

const humanizedFormatReserves = (
  reserves: Array<ReserveDataHumanized & { underlyingAsset: string }>,
  params: FormatReservesUSDRequest
) => formatReserves<ReserveDataHumanized>(reserves, params);
export type ComputedReserveData = ReturnType<typeof humanizedFormatReserves>[0];

export interface UserSummary extends FormatUserSummaryResponse {
  id: string;
  isInIsolationMode: boolean;
  // isolatedAvailableBorrows: string;
}

export interface DynamicPoolDataContextData {
  reserves: ComputedReserveData[];
  user?: UserSummary;
}

const DynamicPoolDataContext = React.createContext({} as DynamicPoolDataContextData);

export function DynamicPoolDataProvider({ children }: PropsWithChildren<{}>) {
  const {
    rawReserves,
    rawUserReserves,
    userId,
    marketRefCurrencyDecimals,
    marketRefPriceInUsd,
    userEmodeCategoryId,
  } = useStaticPoolDataContext();
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
          rawUserReserves,
          userEmodeCategoryId,
        })
      : undefined;

  const formattedPoolReserves = humanizedFormatReserves(rawReserves, {
    currentTimestamp,
    marketRefCurrencyDecimals,
    marketRefPriceInUsd,
  });

  let userSummary: UserSummary | undefined = undefined;
  if (computedUserData && userId) {
    userSummary = {
      id: userId,
      ...computedUserData,
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
