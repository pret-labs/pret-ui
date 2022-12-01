import React from 'react';

import TableCol from '../TableCol';
import LiquidityMiningCard from '../../../../../components/liquidityMining/LiquidityMiningCard';

import staticStyles from './style';
import MarketTableItemAPYCell from '../../../../markets/components/MarketTableItemAPYCell';
import { RewardsAssets } from '../../../../../helpers/config/types';

interface TableAprColProps {
  value: number;
  currentSupplyTVL: string;
  thirtyDaysAverage?: string;
  liquidityMiningValue: string | number;
  condition?: boolean;
  symbol?: string;
  type?: string;
}

export default function TableAprCol({
  value,
  thirtyDaysAverage,
  liquidityMiningValue,
  condition,
  type,
  symbol,
  currentSupplyTVL,
}: TableAprColProps) {
  return (
    <TableCol>
      <LiquidityMiningCard
        value={value}
        thirtyDaysValue={thirtyDaysAverage}
        liquidityMiningValue={liquidityMiningValue}
        symbol={symbol}
        type={type}
      />
      <MarketTableItemAPYCell
        symbol={symbol as RewardsAssets}
        type={type === 'deposit' ? 'deposit' : 'borrow'}
        currentSupplyTVL={currentSupplyTVL}
      />
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </TableCol>
  );
}
