import React from 'react';

import TableItem from '../../../../components/BasicAssetsTable/TableItem';
import TableColumn from '../../../../components/BasicTable/TableColumn';
import Value from '../../../../components/basic/Value';
import LiquidityMiningCard from '../../../../components/liquidityMining/LiquidityMiningCard';
import NoData from '../../../../components/basic/NoData';
import { isAssetStable } from '../../../../helpers/config/assets-config';

import { DepositTableItem } from './types';
import MarketTableItemAPYCell from '../../../markets/components/MarketTableItemAPYCell';
import { RewardsAssets } from '../../../../helpers/config/types';

export default function DepositItem({
  id,
  symbol,
  rewardTokenSymbol,
  underlyingAsset,
  walletBalance,
  walletBalanceInUSD,
  liquidityRate,
  avg30DaysLiquidityRate,
  userId,
  borrowingEnabled,
  isFreezed,
  aincentivesAPR,
  totalLiquidityInUSD,
}: DepositTableItem) {
  const url = `/deposit/${underlyingAsset}-${id}`;

  return (
    <TableItem symbol={symbol} url={url} isFreezed={isFreezed} darkOnDarkMode={true}>
      <TableColumn>
        {!userId || Number(walletBalance) <= 0 ? (
          <NoData color="dark" />
        ) : (
          <Value
            value={Number(walletBalance)}
            subValue={walletBalanceInUSD}
            maximumSubValueDecimals={2}
            subSymbol="USD"
            maximumValueDecimals={isAssetStable(symbol) ? 2 : 5}
            minimumValueDecimals={isAssetStable(symbol) ? 2 : 5}
          />
        )}
      </TableColumn>

      {!isFreezed && (
        <TableColumn>
          <LiquidityMiningCard
            value={liquidityRate}
            thirtyDaysValue={avg30DaysLiquidityRate}
            liquidityMiningValue={aincentivesAPR}
            symbol={symbol}
            type="deposit"
          />
          <MarketTableItemAPYCell
            symbol={symbol as RewardsAssets}
            type={'deposit'}
            currentSupplyTVL={totalLiquidityInUSD.toString()}
          />
        </TableColumn>
      )}
    </TableItem>
  );
}
