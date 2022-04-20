import React from 'react';
import classNames from 'classnames';
import { DarkModeSwitcher } from '@pret/pret-ui-kit';

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
      <DarkModeSwitcher />
      <LangSwitcher />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </footer>
  );
}
