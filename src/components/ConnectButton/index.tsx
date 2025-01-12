import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@pret/pret-ui-kit';
import ConnectWalletRightArrowImage from '../../images/connectWalletRightArrow.svg';
import { useUserWalletDataContext } from '../../libs/web3-data-provider';
import { useMenuContext } from '../../libs/menu';

import messages from './messages';
import staticStyles from './style';

interface ConnectButtonProps {
  className?: string;
  size?: 'small' | 'normal' | 'medium' | 'large';
}

export default function ConnectButton({ className, size = 'normal' }: ConnectButtonProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { showSelectWalletModal } = useUserWalletDataContext();
  const { closeMobileMenu } = useMenuContext();

  return (
    <button
      className={classNames('ConnectButton', `ConnectButton__${size}`, className)}
      type="button"
      onClick={() => {
        showSelectWalletModal();
        closeMobileMenu();
      }}
    >
      <div className="ConnectButton__inner">
        <span>{intl.formatMessage(messages.connectWallet)}</span>
        <img src={ConnectWalletRightArrowImage} alt="connect wallet" />
      </div>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .ConnectButton {
          &__inner {
            color: ${currentTheme.white.hex};
          }
        }
      `}</style>
    </button>
  );
}
