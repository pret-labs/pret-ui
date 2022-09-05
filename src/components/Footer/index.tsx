import React from 'react';
import classNames from 'classnames';
import { DarkModeSwitcher, useThemeContext } from '@pret/pret-ui-kit';

import LangSwitcher from '../basic/LangSwitcher';

import staticStyles from './style';

interface FooterProps {
  inside?: boolean;
  absoluteBottom?: boolean;
}

export default function Footer({ inside, absoluteBottom }: FooterProps) {
  const { isCurrentThemeDark } = useThemeContext();
  return (
    <footer
      className={classNames('Footer', absoluteBottom && 'Footer__bottom', {
        Footer__inside: inside,
      })}
    >
      <DarkModeSwitcher />
      <LangSwitcher />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .Footer__bottom {
          background: ${isCurrentThemeDark ? '#1e2329' : 'rgba(0, 0, 0, 0.04)'};
        }
      `}</style>
    </footer>
  );
}
