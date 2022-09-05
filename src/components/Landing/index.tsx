import { LandingMarkets } from '../../modules';
import CallToActionBanner from '../CallToActionBanner';
import PartnersPanel from '../PartnersPanel';

function Landing() {
  return (
    <>
      <CallToActionBanner />
      <LandingMarkets />
      <PartnersPanel />
    </>
  );
}

export default Landing;
