import { CornerstoneSDKConfig } from '@corndao/corn-sdk/dist/types/common';
import { RewardsAssets } from './../../helpers/config/types';
import { ChainId } from '@pret/contract-helpers';
import { MarketDataType } from '../../helpers/config/types';
import { keyStores } from 'near-api-js';

import * as logos from './images';

export type TokenPrice = Record<'aurora' | 'corn', string>;

export enum CustomMarket {
  // proto_kovan = 'proto_kovan',
  // proto_mainnet = 'proto_mainnet',
  proto_aurora_testnet = 'proto_aurora_testnet',
  proto_aurora_mainnet = 'proto_aurora_mainnet',
  // proto_avalanche = 'proto_avalanche',
  // proto_matic = 'proto_matic',
  // proto_mumbai = 'proto_mumbai',
  // amm_kovan = 'amm_kovan',
  // amm_mainnet = 'amm_mainnet',
  // proto_fuji = 'proto_fuji',
  proto_hardhat = 'proto_hardhat',
}

export const marketsData: { [key in keyof typeof CustomMarket]: MarketDataType } = {
  [CustomMarket.proto_aurora_mainnet]: {
    chainId: ChainId.aurora_mainnet,
    logo: logos.aaveLogo,
    activeLogo: logos.aaveActiveLogo,
    subLogo: logos.aurora,
    aTokenPrefix: 'AP',
    enabledFeatures: {
      liquiditySwap: false,
      incentives: true,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0x94DE7fCd50f33D2598639F9abaFED90Ba0eB9a11'.toLowerCase(),
      LENDING_POOL: '0xF0a2a17FD7E086ba158102fe3BD1cd9C39C8DcE8',
      WETH_GATEWAY: '0x3C53EBE3b6560EB54e9C5eeb287b139Be766A0Fc',
      // SWAP_COLLATERAL_ADAPTER: '0x2EcF2a2e74B19Aab2a62312167aFF4B78E93B6C5',
    },
    auroraRewards: {
      [RewardsAssets.WNEAR]: {
        depositRewardsPerDay: 1000,
        borrowRewardsPerDay: 500,
      },
      [RewardsAssets.LINEAR]: {
        depositRewardsPerDay: 1500,
        borrowRewardsPerDay: 0,
      },
      [RewardsAssets.USDC]: {
        depositRewardsPerDay: 500,
        borrowRewardsPerDay: 500,
      },
      [RewardsAssets.USDT]: {
        depositRewardsPerDay: 500,
        borrowRewardsPerDay: 500,
      },
    },
    cornRewards: {
      [RewardsAssets.WNEAR]: {
        depositRewardsPerDay: 80,
        borrowRewardsPerDay: 40,
      },
      [RewardsAssets.LINEAR]: {
        depositRewardsPerDay: 120,
        borrowRewardsPerDay: 0,
      },
      [RewardsAssets.USDC]: {
        depositRewardsPerDay: 40,
        borrowRewardsPerDay: 40,
      },
      [RewardsAssets.USDT]: {
        depositRewardsPerDay: 40,
        borrowRewardsPerDay: 40,
      },
    },
    cornTokenParams: {
      type: 'ERC20',
      options: {
        address: '0x2F0becD13b5372188B5E05b7DfD31283b4b11789',
        symbol: 'CORN',
        decimals: 18,
      },
    },
    cornAirdropAddress: '0xae763973B873718e084a2ea3F7aE50B0c670bdF0',
    nearConfig: {
      networkId: 'mainnet',
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      nodeUrl: 'https://rpc.mainnet.near.org',
      walletUrl: 'https://wallet.mainnet.near.org',
      helperUrl: 'https://helper.mainnet.near.org',
      headers: {},
    },
    cornerstoneSDKConfig: {
      cornerstoneConfig: {
        cornContractId: 'corn.v1.corn-staging.near',
        xcornContractId: 'xcorn.v1.corn-staging.near',
        vecornContractId: 'vecorn.v1.corn-staging.near',
      },
      dataServiceConfig: {
        cornTokenDecimals: 18,
        xcornTokenDecimals: 18,
        vecornTokenDecimals: 18,
        refContractId: 'v2.ref-finance.near',
        refPoolForXcorn: {
          poolId: 3709,
          otherTokenId: 'usdc.mocks.near',
          otherTokenDecimals: 6,
        },
        cornOracleContractId: 'lpt.corn-oracle.near',
        fluxOracleContractId: 'fpo.opfilabs.near',
        fluxPairInfos: {
          'wnear.mocks.near': {
            pair: 'NEAR/USD',
            provider: 'opfilabs.near',
          },
          'linear.mocks.near': {
            pair: 'LINEAR/USD',
            provider: 'corn-oracle.near',
          },
          'usn..mocks.near': {
            pair: 'USN/USD',
            provider: 'corn-oracle.near',
          },
          'usdc.mocks.near': {
            pair: 'USDC/USD',
            provider: 'corn-oracle.near',
          },
          'dai.mocks.near': {
            pair: 'DAI/USD',
            provider: 'opfilabs.near',
          },
          'usdt.mocks.near': {
            pair: 'USDT/USD',
            provider: 'opfilabs.near',
          },
          'wbtc.mocks.near': {
            pair: 'BTC/USD',
            provider: 'opfilabs.near',
          },
          'weth.mocks.near': {
            pair: 'ETH/USD',
            provider: 'opfilabs.near',
          },
          'eth.mocks.near': {
            pair: 'ETH/USD',
            provider: 'opfilabs.near',
          },
          'aurora.mocks.near': {
            pair: 'AURORA/USD',
            provider: 'opfilabs.near',
          },
          'ref.mocks.near': {
            pair: 'REF/USD',
            provider: 'corn-oracle.near',
          },
          'brrr.mocks.near': {
            pair: 'BRRR/USD',
            provider: 'corn-oracle.near',
          },
        },
        coinGeckoIds: {
          'wnear.mocks.near': 'wrapped-near', // wnear
          'linear.mocks.near': 'linear-protocol', // linear
          'usn.mocks.near': 'usn', // usn
          'usdc.mocks.near': 'usd-coin', // usdc
          'dai.mocks.near': 'dai', // dai
          'usdt.mocks.near': 'tether', // usdt
          'wbtc.mocks.near': 'wrapped-bitcoin', // wbtc
          'weth.mocks.near': 'weth', // weth
          'eth.mocks.near': 'ethereum', // eth
          'aurora.mocks.near': 'aurora-near', // aurora
          'ref.mocks.near': 'ref-finance', // ref
          'brrr.mocks.near': 'burrow', // burrow
        },
        treasuryWhiteListTokens: {
          ft: [
            {
              tokenId: 'wnear.mocks.near', // wnear
              decimals: 24,
            },
            // {
            //   tokenId: "linear.mocks.near", // linear
            //   decimals: 24,
            // },
            {
              tokenId: 'usn.mocks.near', // usn
              decimals: 18,
            },
            {
              tokenId: 'usdc.mocks.near', // usdc
              decimals: 6,
            },
            // {
            //   tokenId: "dai.mocks.near", // dai
            //   decimals: 18,
            // },
            {
              tokenId: 'usdt.mocks.near', // usdt
              decimals: 6,
            },
            // {
            //   tokenId: "wbtc.mocks.near", // wbtc
            //   decimals: 8,
            // },
            // {
            //   tokenId: "weth.mocks.near", /// weth
            //   decimals: 18,
            // },
            // {
            //   tokenId: "eth.mocks.near", // eth
            //   decimals: 18,
            // },
            {
              tokenId: 'aurora.mocks.near', // aurora
              decimals: 18,
            },
            {
              tokenId: 'ref.mocks.near', // ref
              decimals: 18,
            },
            {
              tokenId: 'brrr.mocks.near', // burrow
              decimals: 18,
            },
          ],
          mft: [
            {
              tokenId: ':3709',
              decimals: 24,
              tokenAddress: 'v2.ref-finance.near',
            },
            {
              tokenId: ':3717',
              decimals: 24,
              tokenAddress: 'v2.ref-finance.near',
            },
          ],
        },
      },
    } as CornerstoneSDKConfig,
  },
  [CustomMarket.proto_hardhat]: {
    chainId: ChainId.hardhat,
    logo: logos.aaveLogo,
    activeLogo: logos.aaveActiveLogo,
    aTokenPrefix: 'AP',
    enabledFeatures: {
      liquiditySwap: false,
      incentives: true,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0xdfAA34CC1E8882303a07dFF23DaFcbE16566aD2c'.toLowerCase(),
      LENDING_POOL: '0x195BC31110bfE5206Ea048a2bF4d6cfD895209cA',
      WETH_GATEWAY: '0xB89998C526240aaF1588d20343421C6f730634b5',
      // SWAP_COLLATERAL_ADAPTER: '0x2EcF2a2e74B19Aab2a62312167aFF4B78E93B6C5',
    },
    auroraRewards: {
      [RewardsAssets.WNEAR]: {
        depositRewardsPerDay: 1000,
        borrowRewardsPerDay: 500,
      },
      [RewardsAssets.LINEAR]: {
        depositRewardsPerDay: 1500,
        borrowRewardsPerDay: 0,
      },
      [RewardsAssets.USDC]: {
        depositRewardsPerDay: 500,
        borrowRewardsPerDay: 500,
      },
      [RewardsAssets.USDT]: {
        depositRewardsPerDay: 500,
        borrowRewardsPerDay: 500,
      },
    },
    cornRewards: {
      [RewardsAssets.WNEAR]: {
        depositRewardsPerDay: 80,
        borrowRewardsPerDay: 40,
      },
      [RewardsAssets.LINEAR]: {
        depositRewardsPerDay: 120,
        borrowRewardsPerDay: 0,
      },
      [RewardsAssets.USDC]: {
        depositRewardsPerDay: 40,
        borrowRewardsPerDay: 40,
      },
      [RewardsAssets.USDT]: {
        depositRewardsPerDay: 40,
        borrowRewardsPerDay: 40,
      },
    },
    cornTokenParams: {
      type: 'ERC20',
      options: {
        address: '0x2F0becD13b5372188B5E05b7DfD31283b4b11789',
        symbol: 'CORN',
        decimals: 18,
      },
    },
    cornAirdropAddress: '0xae763973B873718e084a2ea3F7aE50B0c670bdF0',
  },
  // [CustomMarket.proto_kovan]: {
  //   chainId: ChainId.kovan,
  //   logo: logos.aavev2Logo,
  //   activeLogo: logos.aavev2ActiveLogo,
  //   aTokenPrefix: 'A',
  //   enabledFeatures: {
  //     faucet: true,
  //     governance: true,
  //     staking: true,
  //     incentives: true,
  //   },
  //   addresses: {
  //     LENDING_POOL_ADDRESS_PROVIDER: '0x88757f2f99175387ab4c6a4b3067c77a695b0349'.toLowerCase(),
  //     LENDING_POOL: '0xE0fBa4Fc209b4948668006B2bE61711b7f465bAe',
  //     WETH_GATEWAY: '0xA61ca04DF33B72b235a8A28CfB535bb7A5271B70',
  //     FAUCET: '0x600103d518cC5E8f3319D532eB4e5C268D32e604',
  //   },
  // },
  // [CustomMarket.proto_mainnet]: {
  //   chainId: ChainId.mainnet,
  //   logo: logos.aavev2Logo,
  //   activeLogo: logos.aavev2ActiveLogo,
  //   aTokenPrefix: 'A',
  //   enabledFeatures: {
  //     governance: true,
  //     staking: true,
  //     liquiditySwap: true,
  //     collateralRepay: true,
  //     incentives: true,
  //   },
  //   addresses: {
  //     LENDING_POOL_ADDRESS_PROVIDER: '0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5'.toLowerCase(),
  //     LENDING_POOL: '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9',
  //     WETH_GATEWAY: '0xcc9a0B7c43DC2a5F023Bb9b738E45B0Ef6B06E04',
  //     REPAY_WITH_COLLATERAL_ADAPTER: '0x498c5431eb517101582988fbb36431ddaac8f4b1',
  //     SWAP_COLLATERAL_ADAPTER: '0x135896DE8421be2ec868E0b811006171D9df802A',
  //   },
  // },
  // [CustomMarket.amm_kovan]: {
  //   chainId: ChainId.kovan,
  //   logo: logos.ammLogo,
  //   activeLogo: logos.ammActiveLogo,
  //   aTokenPrefix: 'AAMM',
  //   addresses: {
  //     LENDING_POOL_ADDRESS_PROVIDER: '0x67FB118A780fD740C8936511947cC4bE7bb7730c'.toLowerCase(),
  //     LENDING_POOL: '0x762E2a3BBe729240ea44D31D5a81EAB44d34ef01',
  //     WETH_GATEWAY: '0xA61ca04DF33B72b235a8A28CfB535bb7A5271B70',
  //     FAUCET: '0x600103d518cC5E8f3319D532eB4e5C268D32e604',
  //   },
  // },
  // [CustomMarket.amm_mainnet]: {
  //   chainId: ChainId.mainnet,
  //   logo: logos.ammLogo,
  //   activeLogo: logos.ammActiveLogo,
  //   aTokenPrefix: 'AAMM',
  //   addresses: {
  //     LENDING_POOL_ADDRESS_PROVIDER: '0xacc030ef66f9dfeae9cbb0cd1b25654b82cfa8d5'.toLowerCase(),
  //     LENDING_POOL: '0x7937d4799803fbbe595ed57278bc4ca21f3bffcb',
  //     WETH_GATEWAY: '0xcc9a0B7c43DC2a5F023Bb9b738E45B0Ef6B06E04',
  //   },
  // },
  // [CustomMarket.proto_mumbai]: {
  //   chainId: ChainId.mumbai,
  //   logo: logos.aaveLogo,
  //   activeLogo: logos.aaveActiveLogo,
  //   subLogo: logos.polygon,
  //   aTokenPrefix: 'AM',
  //   enabledFeatures: {
  //     incentives: true,
  //     faucet: true,
  //   },
  //   addresses: {
  //     LENDING_POOL_ADDRESS_PROVIDER: '0x178113104fEcbcD7fF8669a0150721e231F0FD4B'.toLowerCase(),
  //     LENDING_POOL: '0x9198F13B08E299d85E096929fA9781A1E3d5d827',
  //     WETH_GATEWAY: '0xee9eE614Ad26963bEc1Bec0D2c92879ae1F209fA',
  //     FAUCET: '0x0b3C23243106A69449e79C14c58BB49E358f9B10',
  //   },
  // },
  // [CustomMarket.proto_matic]: {
  //   chainId: ChainId.polygon,
  //   logo: logos.aaveLogo,
  //   activeLogo: logos.aaveActiveLogo,
  //   subLogo: logos.polygon,
  //   aTokenPrefix: 'AM',
  //   enabledFeatures: {
  //     liquiditySwap: true,
  //     incentives: true,
  //   },
  //   addresses: {
  //     LENDING_POOL_ADDRESS_PROVIDER: '0xd05e3E715d945B59290df0ae8eF85c1BdB684744'.toLowerCase(),
  //     LENDING_POOL: '0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf',
  //     WETH_GATEWAY: '0xbEadf48d62aCC944a06EEaE0A9054A90E5A7dc97',
  //     SWAP_COLLATERAL_ADAPTER: '0x35784a624D4FfBC3594f4d16fA3801FeF063241c',
  //   },
  // },
  // [CustomMarket.proto_fuji]: {
  //   chainId: ChainId.fuji,
  //   logo: logos.aaveLogo,
  //   activeLogo: logos.aaveActiveLogo,
  //   subLogo: logos.avalanche,
  //   aTokenPrefix: 'AAVA',
  //   enabledFeatures: {
  //     faucet: true,
  //     incentives: true,
  //   },
  //   addresses: {
  //     LENDING_POOL_ADDRESS_PROVIDER: '0x7fdC1FdF79BE3309bf82f4abdAD9f111A6590C0f'.toLowerCase(),
  //     LENDING_POOL: '0x76cc67FF2CC77821A70ED14321111Ce381C2594D',
  //     WETH_GATEWAY: '0x1648C14DbB6ccdd5846969cE23DeEC4C66a03335',
  //     FAUCET: '0x90E5BAc5A98fff59617080848959f44eACB4Cd7B',
  //   },
  // },
  // [CustomMarket.proto_avalanche]: {
  //   chainId: ChainId.avalanche,
  //   logo: logos.aaveLogo,
  //   activeLogo: logos.aaveActiveLogo,
  //   subLogo: logos.avalanche,
  //   aTokenPrefix: 'AV',
  //   enabledFeatures: {
  //     liquiditySwap: true,
  //     incentives: true,
  //   },
  //   addresses: {
  //     LENDING_POOL_ADDRESS_PROVIDER: '0xb6A86025F0FE1862B372cb0ca18CE3EDe02A318f'.toLowerCase(),
  //     LENDING_POOL: '0x4F01AeD16D97E3aB5ab2B501154DC9bb0F1A5A2C',
  //     WETH_GATEWAY: '0x8a47F74d1eE0e2edEB4F3A7e64EF3bD8e11D27C8',
  //     SWAP_COLLATERAL_ADAPTER: '0x2EcF2a2e74B19Aab2a62312167aFF4B78E93B6C5',
  //   },
  // },
  [CustomMarket.proto_aurora_testnet]: {
    chainId: ChainId.aurora_testnet,
    logo: logos.aaveLogo,
    activeLogo: logos.aaveActiveLogo,
    subLogo: logos.aurora,
    aTokenPrefix: 'AV',
    enabledFeatures: {
      liquiditySwap: false,
      incentives: true,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0x75F987Edc7F9B9745e5C6397813476F9B40b45CB'.toLowerCase(),
      LENDING_POOL: '0x10e08bF4b3a3408127b7C04349D80319972d34E2',
      WETH_GATEWAY: '0x3e9dd45050475fB75494De2217056dB5a54d5299',
      // SWAP_COLLATERAL_ADAPTER: '0x2EcF2a2e74B19Aab2a62312167aFF4B78E93B6C5',
    },
    auroraRewards: {
      [RewardsAssets.WNEAR]: {
        depositRewardsPerDay: 1000,
        borrowRewardsPerDay: 500,
      },
      [RewardsAssets.LINEAR]: {
        depositRewardsPerDay: 1500,
        borrowRewardsPerDay: 0,
      },
      [RewardsAssets.USDC]: {
        depositRewardsPerDay: 500,
        borrowRewardsPerDay: 500,
      },
      [RewardsAssets.USDT]: {
        depositRewardsPerDay: 500,
        borrowRewardsPerDay: 500,
      },
    },
    cornRewards: {
      [RewardsAssets.WNEAR]: {
        depositRewardsPerDay: 80,
        borrowRewardsPerDay: 40,
      },
      [RewardsAssets.LINEAR]: {
        depositRewardsPerDay: 120,
        borrowRewardsPerDay: 0,
      },
      [RewardsAssets.USDC]: {
        depositRewardsPerDay: 40,
        borrowRewardsPerDay: 40,
      },
      [RewardsAssets.USDT]: {
        depositRewardsPerDay: 40,
        borrowRewardsPerDay: 40,
      },
    },
    cornTokenParams: {
      type: 'ERC20',
      options: {
        address: '0x2F0becD13b5372188B5E05b7DfD31283b4b11789',
        symbol: 'CORN',
        decimals: 18,
      },
    },
    cornAirdropAddress: '0xae763973B873718e084a2ea3F7aE50B0c670bdF0',
  },
} as const;

export const aggregatorV3InterfaceABI = [
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'description',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint80', name: '_roundId', type: 'uint80' }],
    name: 'getRoundData',
    outputs: [
      { internalType: 'uint80', name: 'roundId', type: 'uint80' },
      { internalType: 'int256', name: 'answer', type: 'int256' },
      { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
      { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
      { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'latestRoundData',
    outputs: [
      { internalType: 'uint80', name: 'roundId', type: 'uint80' },
      { internalType: 'int256', name: 'answer', type: 'int256' },
      { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
      { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
      { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'version',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];
