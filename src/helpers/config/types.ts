import { CornerstoneSDKConfig } from '@corndao/corn-sdk/dist/types/common';
import { ChainId } from '@pret/contract-helpers';
import { NearConfig } from 'near-api-js/lib/near';
import { ConnectConfig } from 'near-api-js';

export type ExplorerLinkBuilderProps = {
  tx?: string;
  address?: string;
};

export type ExplorerLinkBuilderConfig = {
  baseUrl: string;
  addressPrefix?: string;
  txPrefix?: string;
};

export enum RewardsAssets {
  WNEAR = 'WNEAR',
  LINEAR = 'LINEAR',
  USDC = 'USDC',
  USDT = 'USDT',
}

export type TokenPrice = Record<'aurora' | 'corn', string>;

export type NetworkConfig = {
  name: string;
  privateJsonRPCUrl?: string; // private rpc will be used for rpc queries inside the client. normally has private api key and better rate
  privateJsonRPCWSUrl?: string;
  publicJsonRPCUrl: readonly string[]; // public rpc used if not private found, and used to add specific network to wallets if user don't have them. Normally with slow rates
  publicJsonRPCWSUrl?: string;
  addresses: {
    walletBalanceProvider: string;
    /**
     * UiPoolDataProvider currently requires a non-master version
     * https://github.com/aave/protocol-v2/blob/feat/split-ui-dataprovider-logic/contracts/misc/UiPoolDataProvider.sol
     * If you deploy a market with the non default oracle or incentive controller you have to redeploy the UiPoolDataProvider as well as currently the addresses are static.
     * In the upcoming version this will no longer be needed.
     */
    uiPoolDataProvider: string;
    uiIncentiveDataProvider?: string;
    incentiveControllers?: Record<string, string>;
    chainlinkFeedRegistry?: string;
    auroraPriceFeed?: string;
  };
  protocolDataUrl: string;
  cachingServerUrl?: string;
  cachingWSServerUrl?: string;
  baseUniswapAdapter?: string;
  baseAsset: string;
  baseAssetWrappedAddress?: string;
  rewardTokens: readonly {
    rewardTokenSymbol: string;
    rewardTokenAddress: string;
    rewardTokenDecimals: number;
  }[];
  incentivePrecision: number;
  usdMarket?: boolean;
  // function returning a link to etherscan et al
  explorerLink: string;
  explorerLinkBuilder: (props: ExplorerLinkBuilderProps) => string;
  rpcOnly: boolean;
  // set this to show faucets and similar
  isTestnet?: boolean;
  // get's automatically populated on fork networks
  isFork?: boolean;
  // contains the forked off chainId
  underlyingChainId?: number;
  bridge?: {
    brandColor: string;
    name: string;
    url: string;
    logo: string;
  };
};

export type BaseNetworkConfig = Omit<NetworkConfig, 'explorerLinkBuilder'>;

export type MarketDataType = {
  // the network the market operates on
  chainId: ChainId;
  // market logo in the topbar
  logo: string;
  // logo for the active market in dropdown
  activeLogo?: string;
  // additional logo on the right hand side
  subLogo?: string;
  // aToken prefix string, which will be cut of in the ui
  aTokenPrefix: string;
  // corn token price - if not exist, fallback to sdk price
  cornPrice?: string;
  enabledFeatures?: {
    liquiditySwap?: boolean;
    staking?: boolean;
    governance?: boolean;
    faucet?: boolean;
    collateralRepay?: boolean;
    incentives?: boolean;
    permissions?: boolean;
  };
  addresses: {
    LENDING_POOL_ADDRESS_PROVIDER: string;
    LENDING_POOL: string;
    WETH_GATEWAY?: string;
    SWAP_COLLATERAL_ADAPTER?: string;
    REPAY_WITH_COLLATERAL_ADAPTER?: string;
    FAUCET?: string;
    PERMISSION_MANAGER?: string;
  };
  auroraRewards: {
    [key in keyof typeof RewardsAssets]: {
      depositRewardsPerDay: number;
      borrowRewardsPerDay: number;
    };
  };
  cornRewards: {
    [key in keyof typeof RewardsAssets]: {
      depositRewardsPerDay: number;
      borrowRewardsPerDay: number;
    };
  };
  cornTokenParams: {
    type: string;
    options: {
      address: string;
      symbol: string;
      decimals: number;
    };
  };
  cornAirdropAddress: string;
  cornerstoneSDKConfig?: CornerstoneSDKConfig;
  nearConfig?: NearConfig & ConnectConfig;
};
