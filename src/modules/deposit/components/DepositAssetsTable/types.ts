import { BigNumber } from '@aave/protocol-js';

export type DepositTableItem = {
  id: string;
  underlyingAsset: string;
  symbol: string;
  rewardTokenSymbol: string;
  walletBalance: BigNumber;
  walletBalanceInUSD: number | string;
  totalLiquidityInUSD: number | string;
  underlyingBalance: number | string;
  underlyingBalanceInUSD: number | string;
  liquidityRate: number | string;
  avg30DaysLiquidityRate?: number;
  aincentivesAPR: string;
  userId?: string;
  borrowingEnabled: boolean;
  isFreezed?: boolean;
};
