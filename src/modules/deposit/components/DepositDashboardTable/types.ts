import { ComputedUserReserve, RawReserveData } from '@aave/math-utils';

export type DepositTableItem = {
  onToggleSwitch: () => void;
  isActive: boolean;
  isFrozen: boolean;
  usageAsCollateralEnabledOnThePool: boolean;
  uiColor: string;
  reserve: Pick<RawReserveData, 'id' | 'symbol' | 'name' | 'liquidityRate' | 'underlyingAsset'>;
  rewardTokenSymbol: string;
  avg30DaysLiquidityRate?: string;
  aincentivesAPR: string;
  borrowingEnabled: boolean;
  index?: number;
  totalLiquidityInUSD: string;
} & Pick<
  ComputedUserReserve,
  'usageAsCollateralEnabledOnUser' | 'underlyingBalance' | 'underlyingBalanceUSD'
>;
