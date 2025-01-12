import React, { ReactNode, ReactNodeArray } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import WalletIcon from '../../../../images/wallet.svg';

import { BasicModal, useThemeContext } from '@pret/pret-ui-kit';

import messages from './messages';
import staticStyles from './style';

import closeIcon from '../../../../images/closeIcon.svg';
import whiteCloseIcon from '../../../../images/whiteCloseIcon.svg';

interface ConnectWalletWrapperProps {
  children: ReactNode | ReactNodeArray;
  className?: string;
  isVisible: boolean;
  onBackdropPress: () => void;
}

export default function ConnectWalletWrapper({
  children,
  className,
  isVisible,
  onBackdropPress,
}: ConnectWalletWrapperProps) {
  const intl = useIntl();
  const { isCurrentThemeDark } = useThemeContext();

  return (
    <BasicModal
      onBackdropPress={onBackdropPress}
      isVisible={isVisible}
      withCloseButton={true}
      className={classNames('ConnectWalletWrapper', className)}
      closeIcon={isCurrentThemeDark ? whiteCloseIcon : closeIcon}
    >
      <div className="ConnectWalletWrapper__inner">
        <div className="ConnectWalletWrapper__icon">
          <img src={WalletIcon} alt="wallet icon" />
        </div>
        <div className="ConnectWalletWrapper__caption-inner">
          <h2>{intl.formatMessage(messages.caption)}</h2>
        </div>

        {children}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </BasicModal>
  );
}
