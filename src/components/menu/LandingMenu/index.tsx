import { useHistory, useLocation } from 'react-router-dom';
import { rgba, useThemeContext } from '@pret/pret-ui-kit';

import { useUserWalletDataContext } from '../../../libs/web3-data-provider';
import goToTop from '../../../helpers/goToTop';
import { LOGO } from '../../../ui-config';

import staticStyles from './style';

import backIcon from '../../../images/mobileBackArrow.svg';
import Link from '../../basic/Link';
import LandingMobileContent from '../LandingMobileConetnt';

interface MenuProps {
  title: string;
}

export default function LandingMenu({ title }: MenuProps) {
  const location = useLocation();
  const history = useHistory();
  const { currentTheme } = useThemeContext();
  const { currentAccount } = useUserWalletDataContext();

  const isActive = (url: string) => {
    return `/${url.split('/')[1]}` === `/${location.pathname.split('/')[1]}`;
  };

  const topLineColor = rgba(`${currentTheme.white.rgb}, 0.1`);

  return (
    <header className="Menu">
      <div className="Menu__logo-inner">
        <Link className="Menu__logo-link" to="/" onClick={() => goToTop()}>
          <img src={LOGO} alt="Pret" />
        </Link>
      </div>

      <div className="Menu__title-inner">
        {history.length > 2 && (
          <button className="Menu__back-button" onClick={history.goBack}>
            <img src={backIcon} alt="" />
          </button>
        )}

        <p>{title}</p>
      </div>

      <div className="Menu__right-inner">
        <div className="Menu__burger-inner">
          <LandingMobileContent isActive={isActive} currentAccount={currentAccount} />
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';

        .Menu {
          background: #181a20;
          &:after {
            background: ${topLineColor};
          }

          &__title-inner {
            p {
              color: ${currentTheme.white.hex};
            }
          }
        }
      `}</style>
    </header>
  );
}
