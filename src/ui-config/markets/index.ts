import { CORNRewardsAssets } from './../../helpers/config/types';
import { ChainId } from '@pret/contract-helpers';
import { MarketDataType } from '../../helpers/config/types';

import * as logos from './images';

export enum CustomMarket {
  // proto_kovan = 'proto_kovan',
  // proto_mainnet = 'proto_mainnet',
  // proto_aurora_testnet = 'proto_aurora_testnet',
  proto_aurora_mainnet = 'proto_aurora_mainnet',
  // proto_avalanche = 'proto_avalanche',
  // proto_matic = 'proto_matic',
  // proto_mumbai = 'proto_mumbai',
  // amm_kovan = 'amm_kovan',
  // amm_mainnet = 'amm_mainnet',
  // proto_fuji = 'proto_fuji',
  // proto_hardhat = 'proto_hardhat',
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
      LENDING_POOL_ADDRESS_PROVIDER: '0x8fcc9f65BF153371f4B06542446eE51aCcDb635C'.toLowerCase(),
      LENDING_POOL: '0x8ca1db9e43305636e9b4bf8ca1ff8f97579009ad',
      WETH_GATEWAY: '0x33318ba00a220cab6da06f625c0d80ad5a2f37a9',
      // SWAP_COLLATERAL_ADAPTER: '0x2EcF2a2e74B19Aab2a62312167aFF4B78E93B6C5',
    },
    cornRewards: {
      [CORNRewardsAssets.WNEAR]: {
        depositRewardsPerDay: 40,
        borrowRewardsPerDay: 20,
      },
      [CORNRewardsAssets.LINEAR]: {
        depositRewardsPerDay: 60,
        borrowRewardsPerDay: 0,
      },
      [CORNRewardsAssets.USDC]: {
        depositRewardsPerDay: 20,
        borrowRewardsPerDay: 20,
      },
      [CORNRewardsAssets.USDT]: {
        depositRewardsPerDay: 20,
        borrowRewardsPerDay: 20,
      },
    },
  },
  // [CustomMarket.proto_hardhat]: {
  //   chainId: ChainId.hardhat,
  //   logo: logos.aaveLogo,
  //   activeLogo: logos.aaveActiveLogo,
  //   aTokenPrefix: 'AP',
  //   enabledFeatures: {
  //     liquiditySwap: false,
  //     incentives: true,
  //   },
  //   addresses: {
  //     LENDING_POOL_ADDRESS_PROVIDER: '0x4aC3d3e1E45f08957480F38AA903c563eA05B743'.toLowerCase(),
  //     LENDING_POOL: '0x6076c09450c1C793532463642aEbfAbcACb27417',
  //     WETH_GATEWAY: '0x099bC74E26d3eaE24Ca3135d86678DD1b13AeAAe',
  //     // SWAP_COLLATERAL_ADAPTER: '0x2EcF2a2e74B19Aab2a62312167aFF4B78E93B6C5',
  //   },
  //   cornRewards: {
  //     [CORNRewardsAssets.WNEAR]: {
  //       depositRewardsPerDay: 30,
  //       borrowRewardsPerDay: 20,
  //     },
  //     [CORNRewardsAssets.LINEAR]: {
  //       depositRewardsPerDay: 40,
  //       borrowRewardsPerDay: 0,
  //     },
  //     [CORNRewardsAssets.USDC]: {
  //       depositRewardsPerDay: 15,
  //       borrowRewardsPerDay: 15,
  //     },
  //     [CORNRewardsAssets.USDT]: {
  //       depositRewardsPerDay: 15,
  //       borrowRewardsPerDay: 15,
  //     },
  //   },
  // },
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
  // [CustomMarket.proto_aurora_testnet]: {
  //   chainId: ChainId.aurora_testnet,
  //   logo: logos.aaveLogo,
  //   activeLogo: logos.aaveActiveLogo,
  //   subLogo: logos.aurora,
  //   aTokenPrefix: 'AV',
  //   enabledFeatures: {
  //     liquiditySwap: false,
  //     incentives: true,
  //   },
  //   addresses: {
  //     LENDING_POOL_ADDRESS_PROVIDER: '0x75F987Edc7F9B9745e5C6397813476F9B40b45CB'.toLowerCase(),
  //     LENDING_POOL: '0x10e08bF4b3a3408127b7C04349D80319972d34E2',
  //     WETH_GATEWAY: '0x3e9dd45050475fB75494De2217056dB5a54d5299',
  //     // SWAP_COLLATERAL_ADAPTER: '0x2EcF2a2e74B19Aab2a62312167aFF4B78E93B6C5',
  //   },
  // },
} as const;
