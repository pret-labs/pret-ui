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
  size?: 'small' | 'normal' | 'medium' | 'large';
}

export default function ConnectButton({ className, size = 'normal' }: ConnectButtonProps) {
  const intl = useIntl();
  const { currentTheme, sm } = useThemeContext();
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
        }

        .ConnectButton__normal,
        .ConnectButton__medium {
          &:hover {
            .ConnectButton__inner {
              border-color: ${currentTheme.white.hex};
            }
          }

          .ConnectButton__inner {
            color: ${currentTheme.white.hex};
          }
        }

        .ConnectButton {
          &__inner {
            border-color: ${currentTheme.darkBlue.hex};
            color: ${currentTheme.white.hex};
          }
        }
      `}</style>
    </button>
  );
}
