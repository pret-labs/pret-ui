import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useSwipeable } from 'react-swipeable';
import { useThemeContext, DropdownWrapper } from '@pret/pret-ui-kit';

import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import { useMenuContext } from '../../../libs/menu';
import goToTop from '../../../helpers/goToTop';
import Link from '../../basic/Link';
import AddressInfo from '../AddressInfo';

import { mobileNavigation } from '../navigation';
import { moreMenuExtraItems } from '../../../ui-config';

import staticStyles from './style';
import SocialMedia from '../../MenuSocialMedia/SociaMedia';

interface MobileContentProps {
  isActive: (url: string) => boolean;
  currentAccount: string;
}

export default function LandingMobileContent({ isActive, currentAccount }: MobileContentProps) {
  const intl = useIntl();
  const { currentTheme, md } = useThemeContext();
  const { openMobileMenu, closeMobileMenu, mobileMenuVisible, setMobileMenuVisible } =
    useMenuContext();
  const { currentMarketData } = useProtocolDataContext();

  useEffect(() => {
    if (mobileMenuVisible && !md) {
      closeMobileMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [md]);

  const handleLinkClick = () => {
    goToTop();
    closeMobileMenu();
  };

  const handlers = useSwipeable({
    onSwipedRight: () => closeMobileMenu(),
  });

  return (
    <div {...handlers}>
      <div
        className={classNames('MobileContent__overlay', {
          MobileContent__overlayActive: mobileMenuVisible,
        })}
      />

      <DropdownWrapper
        visible={mobileMenuVisible}
        setVisible={setMobileMenuVisible}
        className="MobileContent"
        contentClassName="MobileContent__content-wrapper"
        contentId="MobileMenuContent"
        buttonComponent={
          <button
            className={classNames('MobileContent__button', {
              MobileContent__buttonActive: mobileMenuVisible,
            })}
            onClick={openMobileMenu}
            type="button"
          >
            <span className="MobileContent__button-box">
              <span className="MobileContent__button-inner" />
            </span>
          </button>
        }
      >
        <div className="MobileContent__content">
          <div className="MobileContent__top">
            {/* <MarketSwitcher /> */}
            <AddressInfo />
          </div>

          <div className="MobileContent__navigation">
            <ul>
              {mobileNavigation.map((link, index) => (
                <li
                  className={classNames('MobileContent__link-wrapper', {
                    MobileContent__linkHidden:
                      (!currentAccount && link.hiddenWithoutWallet) ||
                      (link.isVisible && !link.isVisible(currentMarketData)),
                  })}
                  key={index}
                >
                  {!link.onClick ? (
                    <Link
                      className={classNames('MobileContent__link', {
                        MobileContent__linkActive: isActive(link.link),
                      })}
                      to={link.link}
                      absolute={link.absolute}
                      inNewWindow={link.absolute}
                      onClick={() => !link.absolute && handleLinkClick()}
                      color="white"
                    >
                      <span>{intl.formatMessage(link.title)}</span>
                    </Link>
                  ) : (
                    <div
                      className="MobileContent__link MobileContent__link-chat"
                      onClick={link.onClick}
                    >
                      <span>{intl.formatMessage(link.title)}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="MobileContent__bottom">
            <ul className="MobileContent__bottom-links">
              {moreMenuExtraItems.map((link, index) => (
                <li className="MobileContent__bottom-linkInner" key={index}>
                  <Link
                    className="MobileContent__link"
                    to={link.link}
                    absolute={link.absolute}
                    inNewWindow={link.absolute}
                    color="white"
                  >
                    <span>{intl.formatMessage(link.title)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="MobileContent__SocialMediaWrapper">
          <SocialMedia className="SocialMedia_MB" iconSize={28} />
        </div>
      </DropdownWrapper>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';
        .SocialMedia_MB {
          display: none;
          @include respond-to(sm) {
            display: block;
          }
          @include respond-to(xs) {
            display: block;
          }
        }
        .MobileContent {
          &__button-inner,
          &__button-inner:before,
          &__button-inner:after {
            background: ${currentTheme.white.hex};
          }

          .MobileContent__content-wrapper.DropdownWrapper__content {
            background: ${currentTheme.headerBg.hex};
          }

          &__bottom,
          &__top {
            &:after {
              background: ${currentTheme.white.hex};
            }
          }

          .MobileContent__link {
            color: ${currentTheme.white.hex};
          }
        }
      `}</style>
    </div>
  );
}
