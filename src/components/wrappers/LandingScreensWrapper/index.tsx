import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@pret/pret-ui-kit';

import Footer from '../../Footer';
import { BottomDisclaimer, TopDisclaimer } from '../../../ui-config';

import messages from './messages';
import staticStyles from './style';

import background from '../../../images/background.svg';
import backgroundDark from '../../../images/backgroundDark.svg';
import LandingMenu from '../../menu/LandingMenu';

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

export default function LandingScreensWrapper({ children }: ScreensWrapperProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  const [title, setTitle] = useState(intl.formatMessage(messages.pageTitle));
  const [isTopPanelSmall, setTopPanelSmall] = useState(
    localStorage.getItem('isTopPanelSmall') === 'true' || false
  );

  return (
    <div
      className={classNames('ScreensWrapper', {
        ScreensWrapper__topPanelSmall: isTopPanelSmall,
      })}
    >
      <BottomDisclaimer />

      <TopDisclaimer />
      <LandingMenu title={title} />

      <main className="ScreensWrapper__content" id="ScreensWrapper__content-wrapper">
        <div className="ScreensWrapper__top-contentWrapper" />

        <TitleContext.Provider value={{ title, setTitle }}>
          <TopPanelSmallContext.Provider value={{ isTopPanelSmall, setTopPanelSmall }}>
            {children}
          </TopPanelSmallContext.Provider>
        </TitleContext.Provider>
      </main>

      <Footer />

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

        .ScreensWrapper {
          background: ${currentTheme.mainBg.hex};
        }
      `}</style>
    </div>
  );
}
