import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@pret/pret-ui-kit';

import Footer from '../../Footer';
import Menu from '../../menu/Menu';
import { BottomDisclaimer, TopDisclaimer } from '../../../ui-config';

import messages from './messages';
import staticStyles from './style';

import background from '../../../images/background.svg';
import backgroundDark from '../../../images/backgroundDark.svg';
import { useWeb3React } from '@web3-react/core';
import LoginModal from '../../LoginModal';

export interface ScreensWrapperProps {
  children: ReactNode;
}

export const TitleContext = createContext({
  title: '',
  setTitle: (title: string) => {},
});

export function useHeaderTitle() {
  const { title, setTitle } = useContext(TitleContext);
  return { title, setTitle };
}

export const TopPanelSmallContext = createContext({
  isTopPanelSmall: false,
  setTopPanelSmall: (isSmallTopLine: boolean) => {},
});

export function useWithDesktopTitle() {
  const { isTopPanelSmall, setTopPanelSmall } = useContext(TopPanelSmallContext);
  return { isTopPanelSmall, setTopPanelSmall };
}

export default function ScreensWrapper({ children }: ScreensWrapperProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  const [title, setTitle] = useState(intl.formatMessage(messages.pageTitle));
  const [isTopPanelSmall, setTopPanelSmall] = useState(
    localStorage.getItem('isTopPanelSmall') === 'true' || false
  );

  const { account: _isLoggedIn } = useWeb3React();
  const isLoggedIn = !!_isLoggedIn;

  return (
    <div
      className={classNames(isLoggedIn ? 'ScreensWrapper' : 'NoLoginScreensWrapper', {
        ScreensWrapper__topPanelSmall: isTopPanelSmall,
      })}
    >
      <BottomDisclaimer />

      <TopDisclaimer />
      <Menu title={title} />

      <main
        className={isLoggedIn ? 'ScreensWrapper__content' : 'NoLoginScreensWrapper__content'}
        id="ScreensWrapper__content-wrapper"
      >
        {isLoggedIn && <div className="ScreensWrapper__top-contentWrapper" />}
        {!isLoggedIn && <LoginModal />}

        <TitleContext.Provider value={{ title, setTitle }}>
          <TopPanelSmallContext.Provider value={{ isTopPanelSmall, setTopPanelSmall }}>
            {children}
          </TopPanelSmallContext.Provider>
        </TitleContext.Provider>
      </main>

      <Footer inside={true} absoluteBottom={!isLoggedIn} />

      <img
        className="ScreensWrapper__background"
        src={isCurrentThemeDark ? backgroundDark : background}
        alt=""
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';
        .NoLoginScreensWrapper__content {
          background: ${isCurrentThemeDark ? '#181a20' : '#f4f6f8'};
        }
        .ScreensWrapper {
          background: ${currentTheme.mainBg.hex};

          &__top-contentWrapper {
            background: ${currentTheme.headerBg.hex};
            &:after {
              background: ${currentTheme.headerBg.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
