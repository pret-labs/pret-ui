import staticStyles from './style';
import Flux from '../../images/flux.svg';
import Aurora from '../../images/aurora.svg';
import Trisolaris from '../../images/trisolaris.svg';
import Pinkpea from '../../images/pinkpea.svg';
import Proximity from '../../images/proximity.svg';
import MetaWeb from '../../images/metaweb.svg';
import NEAR from '../../images/near.svg';
import LiNear from '../../images/linear.svg';
import Cornerstone from '../../images/cornerstone.svg';

interface IPartner {
  src: string;
  alt: string;
  url: string;
}

const partners: IPartner[] = [
  {
    src: NEAR,
    alt: 'near',
    url: 'https://near.org',
  },
  {
    src: Aurora,
    alt: 'aurora',
    url: 'https://aurora.dev',
  },
  {
    src: Flux,
    alt: 'flux',
    url: 'https://www.fluxprotocol.org',
  },
  {
    src: Trisolaris,
    alt: 'trisolaris',
    url: 'https://www.trisolaris.io',
  },
  {
    src: Pinkpea,
    alt: 'pinkpea',
    url: 'https://pinkpea.finance',
  },
  {
    src: Proximity,
    alt: 'proximity',
    url: 'https://www.proximity.dev',
  },
  {
    src: MetaWeb,
    alt: 'metaweb',
    url: 'https://metaweb.vc',
  },
  {
    src: LiNear,
    alt: 'linear',
    url: 'https://linearprotocol.org',
  },
  {
    src: Cornerstone,
    alt: 'cornerstone',
    url: 'https://corndao.org',
  },
];
function PartnersPanel() {
  return (
    <section className="PartnersPanel">
      <h2>PARTNERS</h2>
      <div className="PartnersPanel__gallerys">
        {partners.map((partner) => (
          <a
            key={partner.alt}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="PartnersPanel__gallery"
          >
            <img src={partner.src} alt={partner.alt} />
          </a>
        ))}
      </div>
      <style jsx>{staticStyles}</style>
    </section>
  );
}

export default PartnersPanel;
