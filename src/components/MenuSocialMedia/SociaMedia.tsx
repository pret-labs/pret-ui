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

function SocialMedia({ style }: { style?: CSSProperties }) {
  return (
    <div style={style}>
      <SocialIcons
        className="SocialIconsLinks"
        linkClassName="SocialIconsLink"
        icons={icons}
        iconHeight={24}
        iconWidth={24}
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
