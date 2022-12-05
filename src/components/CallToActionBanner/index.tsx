import { Button } from '@pret/pret-ui-kit';
import staticStyles from './style';

import USDC from '../../images/tokens/usdc.svg';
import USDT from '../../images/tokens/usdt.svg';
import NEAR from '../../images/tokens/near.svg';
import LiNear from '../../images/tokens/linear.svg';
import AuroraTexture from '../../images/auroraTexture.svg';
import Link from '../basic/Link';
import { useWeb3React } from '@web3-react/core';
import { useStaticPoolDataContext } from '../../libs/pool-data-provider';

const images = [
  {
    image: USDC,
    title: 'USDC',
  },
  {
    image: USDT,
    title: 'USDT',
  },
  {
    image: NEAR,
    title: 'NEAR',
  },
  {
    image: LiNear,
    title: 'LINEAR',
  },
];

function CallToActionBanner() {
  const { account } = useWeb3React();
  const { isUserHasDeposits } = useStaticPoolDataContext();
  const isSignedIn = !!account;
  const pathname = isSignedIn && isUserHasDeposits ? '/dashboard' : '/markets';

  return (
    <section className="CallToActionBanner">
      <div className="CallToActionBanner__content">
        <h1>
          THE LENDING PROTOCOL ON
          <img src={AuroraTexture} alt="aurora" />
        </h1>
        <p className="CallToActionBanner__description">
          Pret is a decentralised non-custodial liquidity protocol where users can participate as
          depositors or borrowers.
        </p>
        <div className="CallToActionBanner__coin-list">
          {images.map((image) => (
            <div key={image.title}>
              <img src={image.image} alt={image.title} />
            </div>
          ))}
        </div>
        <p className="CallToActionBanner__double-rewards">DOUBLE REWARDS</p>
        <p className="CallToActionBanner__amount">20k $CORN for Pre-mining</p>
        <p className="CallToActionBanner__footnotes">50k $AURORA super boost</p>
        <Link to={pathname}>
          <Button className="CallToActionBanner__primary-btn" title="ENTER APP" />
        </Link>
      </div>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </section>
  );
}

export default CallToActionBanner;
