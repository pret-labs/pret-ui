import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@pret/pret-ui-kit';

import DefaultButton from '../../basic/DefaultButton';
import AccessMaticMarketHelpModal from '../../HelpModal/AccessMaticMarketHelpModal';
import {
  AvailableWeb3Connectors,
  useUserWalletDataContext,
} from '../../../libs/web3-data-provider';
import { getNetworkConfig } from '../../../helpers/config/markets-and-network-config';

import messages from './messages';
import staticStyles from './style';
import { ChainId } from '@pret/contract-helpers';

interface NetworkMismatchProps {
  neededChainId: ChainId;
  currentChainId: ChainId;
  currentProviderName: AvailableWeb3Connectors;
}

export const ADD_CONFIG: {
  [key: number]: {
    name: string;
    explorerUrls: string[];
    nativeCurrency: { name: string; symbol: string; decimals: number };
  };
} = {
  [ChainId.polygon]: {
    name: 'Polygon',
    explorerUrls: ['https://explorer.matic.network'],
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
  [ChainId.mumbai]: {
    name: 'Mumbai',
    explorerUrls: ['https://explorer-mumbai.maticvigil.com'],
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
  [ChainId.avalanche]: {
    name: 'Avalanche',
    explorerUrls: ['https://cchain.explorer.avax.network'],
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
    },
  },
  [ChainId.fuji]: {
    name: 'Avalanche Fuji',
    explorerUrls: ['https://cchain.explorer.avax-test.network'],
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
    },
  },
  [ChainId.aurora_mainnet]: {
    name: 'Aurora',
    explorerUrls: ['https://explorer.mainnet.aurora.dev'],
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  [ChainId.aurora_testnet]: {
    name: 'Aurora Testnet',
    explorerUrls: ['https://explorer.testnet.aurora.dev'],
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
  },
};

export default function NetworkMismatch({
  neededChainId,
  currentChainId,
  currentProviderName,
}: NetworkMismatchProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { handleNetworkChange } = useUserWalletDataContext();

  const config = ADD_CONFIG[neededChainId];
  const isAddableByMetamask =
    (global.window as any)?.ethereum?.isMetaMask && currentProviderName === 'browser' && config;
  const { publicJsonRPCWSUrl, publicJsonRPCUrl } = getNetworkConfig(neededChainId);

  // const isExternalNetworkUpdateNeeded =
  //   !isMetaMaskForMatic && ['browser', 'wallet-connect'].includes(currentProviderName);
  const isManualNetworkUpdateNeeded = ['torus', 'portis'].includes(currentProviderName);
  const isNeededNetworkNotSupported =
    neededChainId === ChainId.polygon &&
    ['authereum', 'fortmatic', 'mew-wallet', 'ledger'].includes(currentProviderName);

  const neededNetworkConfig = getNetworkConfig(neededChainId);
  const currentNetworkConfig = getNetworkConfig(currentChainId);

  return (
    <div className="NetworkMismatch">
      <div
        className={classNames('NetworkMismatch__top-inner', {
          NetworkMismatch__onlyText: isAddableByMetamask,
        })}
      >
        <h4>
          {isNeededNetworkNotSupported
            ? intl.formatMessage(messages.networkIsNotSupportedCaption)
            : intl.formatMessage(messages.caption, {
                networkName: neededNetworkConfig.isFork
                  ? neededNetworkConfig.name + ' Fork'
                  : neededNetworkConfig.name,
              })}
        </h4>

        <div className="NetworkMismatch__textInner">
          <p>
            {isNeededNetworkNotSupported
              ? intl.formatMessage(messages.networkIsNotSupportedDescription, {
                  networkName: neededNetworkConfig.name,
                  walletName: currentProviderName,
                })
              : intl.formatMessage(messages.description, {
                  networkName: currentNetworkConfig.name,
                  additional: !isAddableByMetamask
                    ? intl.formatMessage(messages.additionalDescription)
                    : '',
                })}
          </p>

          {isAddableByMetamask && config && (
            <DefaultButton
              title={intl.formatMessage(messages.changeNetwork)}
              onClick={() => {
                (window as any).ethereum?.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: `0x${neededChainId.toString(16)}`,
                      chainName: config.name,
                      nativeCurrency: config.nativeCurrency,
                      rpcUrls: [...publicJsonRPCUrl, publicJsonRPCWSUrl],
                      blockExplorerUrls: config.explorerUrls,
                    },
                  ],
                });
              }}
            />
          )}

          {isManualNetworkUpdateNeeded && (
            <DefaultButton
              title={intl.formatMessage(messages.changeNetwork)}
              onClick={() => handleNetworkChange(neededChainId)}
            />
          )}
        </div>
      </div>

      {!isAddableByMetamask && (
        <div className="NetworkMismatch__bottom-inner">
          <div className="NetworkMismatch__bottom-text">
            {isAddableByMetamask && (
              <div>
                {intl.formatMessage(messages.howToChange)}{' '}
                <AccessMaticMarketHelpModal
                  className="NetworkMismatch__bottomText"
                  text="Polygon POS"
                />
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .NetworkMismatch {
          color: ${currentTheme.textDarkBlue.hex};
          background: ${currentTheme.whiteItem.hex};
          border: 1px solid ${currentTheme.darkBlue.hex};
          h4 {
            color: ${currentTheme.primary.hex};
          }

          .NetworkMismatch__bottomText {
            .TextWithModal__text {
              color: ${currentTheme.secondary.hex} !important;
            }
          }
        }
      `}</style>
    </div>
  );
}
