import { CSSProperties } from 'react';
import { SocialIcon, SocialIcons, SocialType } from '@pret/pret-ui-kit';

const icons: SocialIcon[] = [
  {
    type: SocialType.Discord,
    url: 'https://discord.com/invite/bkkvWwMf2T',
  },
  {
    type: SocialType.Medium,
    url: 'https://medium.com/@PretProtocol',
  },
  {
    type: SocialType.Twitter,
    url: 'https://twitter.com/PretProtocol',
  },
  {
    type: SocialType.Gitbook,
    url: 'https://docs.pret.app',
  },
  {
    type: SocialType.Github,
    url: 'https://github.com/pret-labs',
  },
];

function SocialMedia({
  style,
  className,
  iconSize = 24,
}: {
  style?: CSSProperties;
  className?: string;
  iconSize?: number;
}) {
  return (
    <div className={className} style={style}>
      <SocialIcons
        className="SocialIconsLinks"
        linkClassName="SocialIconsLink"
        icons={icons}
        iconHeight={iconSize}
        iconWidth={iconSize}
      />
      <style jsx={true} global={true}>{`
        .SocialIconsLinks {
          margin: 0 10px;
        }
        .SocialIconsLink {
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
}

export default SocialMedia;
