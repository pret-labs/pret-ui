import React from 'react';

import TableCol from '../TableCol';
import LiquidityMiningCard from '../../../../../components/liquidityMining/LiquidityMiningCard';

import staticStyles from './style';

interface TableAprColProps {
  value: number;
  rewardTokenSymbol: string;
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
  rewardTokenSymbol,
}: TableAprColProps) {
  return (
    <TableCol>
      <LiquidityMiningCard
        value={value}
        thirtyDaysValue={thirtyDaysAverage}
        liquidityMiningValue={liquidityMiningValue}
        symbol={symbol}
        rewardTokenSymbol={rewardTokenSymbol}
        type={type}
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </TableCol>
  );
}
