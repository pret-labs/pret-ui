import { useIntl } from 'react-intl';
import MetamaskIcon from '../../images/metamask.svg';
import RightArrowIcon from '../../images/rightArrow.svg';
import {
  AvailableWeb3Connectors,
  ConnectWalletModalProps,
  getWeb3ProviderFromBrowser,
} from '../../libs/web3-data-provider';

import UnlockWalletWrapper from './components/ConnectWalletWrapper';

import messages from './messages';
import staticStyles from './style';

import * as icons from './images';
import { useThemeContext } from '@pret/pret-ui-kit';
import { useEffect, useState } from 'react';

export interface Wallet {
  title: string;
  description?: string;
  providerName: AvailableWeb3Connectors;
  icon: string;
  disabled?: boolean;
  notSupported?: boolean;
  errorMessage?: string;
}

export default function ConnectWalletModal({
  preferredChainId,
  onSelectPreferredChainId,
  supportedChainIds,
  onUnlockExternalWallet,
  connectorConfig,
  error,
  showLedgerBanner,
  isVisible,
  onBackdropPress,
}: ConnectWalletModalProps) {
  const intl = useIntl();
  const browserWalletProvider = getWeb3ProviderFromBrowser();
  const { currentTheme } = useThemeContext();
  const handleUnlockExternalWallet = (providerName: AvailableWeb3Connectors) =>
    onUnlockExternalWallet(
      providerName,
      preferredChainId,
      supportedChainIds,
      connectorConfig,
      false
    );

  // @ts-ignore
  // const isImToken = !!window.imToken;

  const wallets: Wallet[] = [
    {
      title: 'METAMASK',
      description: '(MetaMask, Trustwallet, Enjin)',
      providerName: 'browser',
      icon: MetamaskIcon,
      disabled: !browserWalletProvider,
      errorMessage: intl.formatMessage(messages.noBrowserBrowserWallet),
    },
    // {
    //   title: 'Portis',
    //   providerName: 'portis',
    //   icon: icons.portisIcon,
    //   notSupported: !PORTIS_DAPP_ID || preferredChainId === ChainId.avalanche,
    // },
    // {
    //   title: 'Ledger',
    //   providerName: 'ledger',
    //   icon: icons.ledgerIcon,
    //   notSupported: preferredChainId === ChainId.polygon || preferredChainId === ChainId.avalanche,
    // },
    // {
    //   title: 'MEW wallet',
    //   providerName: 'mew-wallet',
    //   icon: icons.MEWIcon,
    //   notSupported: preferredChainId !== ChainId.mainnet,
    // },
    // {
    //   title: 'Coinbase',
    //   providerName: 'wallet-link',
    //   icon: icons.coinbaseIcon,
    //   notSupported: preferredChainId === ChainId.avalanche,
    // },
    // {
    //   title: 'Authereum',
    //   providerName: 'authereum',
    //   icon: icons.authereumIcon,
    //   notSupported: !AUTHEREUM_API_KEY || preferredChainId !== ChainId.mainnet,
    // },
    {
      title: 'Wallet Connect',
      providerName: 'wallet-connect',
      icon: icons.walletConnectIcon,
    },
    // {
    //   title: 'Torus',
    //   providerName: 'torus',
    //   icon: icons.torusIcon,
    //   notSupported: preferredChainId === ChainId.avalanche,
    // },
    // {
    //   title: 'Fortmatic',
    //   providerName: 'fortmatic',
    //   icon: icons.formaticIcon,
    //   notSupported:
    //     !getFortmaticKeyByChainId(preferredChainId) ||
    //     preferredChainId === ChainId.polygon ||
    //     preferredChainId === ChainId.avalanche,
    // },
    // {
    //   title: 'imToken',
    //   providerName: 'wallet-connect',
    //   icon: icons.imToken,
    //   notSupported:
    //     isImToken || preferredChainId === ChainId.polygon || preferredChainId === ChainId.avalanche,
    // },
  ];

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage(
      wallets.length > 0 &&
        wallets[0].errorMessage &&
        wallets[0].errorMessage !== 'No browser wallet detected.'
        ? wallets[0].errorMessage
        : ''
    );
  }, [wallets]);
  return (
    <UnlockWalletWrapper
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      className="ConnectWalletModal"
    >
      <div className="ConnectWalletModal__wallets">
        {wallets
          .filter((wallet) => !wallet.notSupported)
          .map((wallet) => (
            <div
              key={wallet.title}
              className="ConnectWalletModal__wallet-wrapper"
              onClick={() => handleUnlockExternalWallet(wallet.providerName)}
              onKeyPress={() => handleUnlockExternalWallet(wallet.providerName)}
              tabIndex={0}
              role="button"
            >
              <div className="ConnectWalletModal__wallet-left">
                <img src={wallet.icon} alt="metamask" />
                <span className="ConnectWalletModal__wallet-name">{wallet.title}</span>
              </div>
              <div className="ConnectWalletModal__wallet-right">
                <img src={RightArrowIcon} alt="metamask" />
              </div>
            </div>
          ))}
      </div>

      {(error || errorMessage) && (
        <p className="ConnectWalletModal__error">{error || errorMessage}</p>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .ConnectWalletModal__error {
          color: ${currentTheme.red.hex};
        }
      `}</style>
    </UnlockWalletWrapper>
  );
}
