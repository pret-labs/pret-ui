import Discord from './icon/discord.svg';
import Medium from './icon/medium.svg';
import Twitter from './icon/twitter.svg';
import Github from './icon/github.svg';
import Gitbook from './icon/gitbook.svg';
import { CSSProperties } from 'react';

interface SocialLink
  extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  href: string;
}

// TODO: move icons to pret-ui-kit after confirmed
// & twitter icon need design providing
const socialLinks: SocialLink[] = [
  {
    src: Discord,
    alt: 'Discord',
    href: 'https://discord.com/invite/bkkvWwMf2T',
  },
  {
    src: Medium,
    alt: 'Medium',
    href: 'https://medium.com/@PretProtocol',
  },
  {
    src: Twitter,
    alt: 'Twitter',
    href: 'https://twitter.com/PretProtocol',
  },
  {
    src: Gitbook,
    alt: 'Gitbook',
    href: 'https://docs.pret.app',
  },
  {
    src: Github,
    alt: 'Github',
    href: 'https://github.com/pret-labs',
  },
];

function SocialMediaItem(props: SocialLink) {
  const { href, ..._props } = props;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <img style={{ marginLeft: '8px' }} {..._props} alt={_props.alt} width={24} height={24} />
    </a>
  );
}

function SocialMedia({ style }: { style?: CSSProperties }) {
  return (
    <div style={style}>
      {socialLinks.map((socialLink) => (
        <SocialMediaItem {...socialLink} key={socialLink.alt} />
      ))}
    </div>
  );
}

export default SocialMedia;
