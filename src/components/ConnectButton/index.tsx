import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@pret/pret-ui-kit';

import { useUserWalletDataContext } from '../../libs/web3-data-provider';
import { useMenuContext } from '../../libs/menu';

import messages from './messages';
import staticStyles from './style';

interface ConnectButtonProps {
  className?: string;
  size?: 'small' | 'normal' | 'medium';
}

export default function ConnectButton({ className, size = 'normal' }: ConnectButtonProps) {
  const intl = useIntl();
  const { currentTheme, sm, isCurrentThemeDark } = useThemeContext();
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
        <span>{intl.formatMessage(sm ? messages.connectWallet : messages.connect)}</span>
      </div>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .ConnectButton {
          &:hover {
            .ConnectButton__inner {
              border-color: ${currentTheme.white.hex};
            }
          }

          &__inner {
            background: linear-gradient(
              105.53deg,
              #da8b5c -11.31%,
              #d06697 39.1%,
              #bd4cbb 69.87%,
              #752cd3 114.39%
            );
            border-radius: 9999px;
            box-shadow: 1px 0px 2px rgba(0, 0, 0, 0.38);
            border-color: ${currentTheme.darkBlue.hex};
            color: ${currentTheme.white.hex};
          }
        }

        .ConnectButton__normal,
        .ConnectButton__medium {
          &:hover {
            .ConnectButton__inner {
              border-color: ${currentTheme.white.hex};
            }
          }

          .ConnectButton__inner {
            background: ${isCurrentThemeDark
              ? currentTheme.whiteItem.hex
              : currentTheme.textDarkBlue.hex};
            color: ${currentTheme.white.hex};
          }
        }
      `}</style>
    </button>
  );
}
