import classNames from 'classnames';
import { DarkModeSwitcher } from '@pret/pret-ui-kit';
import CornerstoneFooterImage from '../../images/cornerstone-footer.svg';
import LangSwitcher from '../basic/LangSwitcher';

import staticStyles from './style';

interface FooterProps {
  inside?: boolean;
  absoluteBottom?: boolean;
}

export default function Footer({ inside, absoluteBottom }: FooterProps) {
  return (
    <footer
      className={classNames('Footer', absoluteBottom && 'Footer__bottom', {
        Footer__inside: inside,
      })}
    >
      <div className="Footer__innerdiv Footer__hideInMobile" />
      <div className="Footer__innerdiv">
        <p className="Footer__incubatedby">Incubated by</p>
        <img src={CornerstoneFooterImage} height={22} width="auto" alt="cornerstone" />
      </div>
      <div className="Footer__innerdiv Footer__hideInMobile">
        <DarkModeSwitcher />
        <LangSwitcher />
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </footer>
  );
}
