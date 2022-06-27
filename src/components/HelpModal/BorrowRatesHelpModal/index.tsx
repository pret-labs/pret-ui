import { useIntl } from 'react-intl';

import HelpModalWrapper from '../HelpModalWrapper';
import { HelpModalProps } from '../types';

import messages from './messages';

export default function BorrowRatesHelpModal({
  text,
  iconSize,
  className,
  color,
  lightWeight,
  onWhiteBackground,
  rewardTokenSymbol,
}: HelpModalProps) {
  const intl = useIntl();
  return (
    <HelpModalWrapper
      text={text}
      iconSize={iconSize}
      className={className}
      color={color}
      lightWeight={lightWeight}
      caption={intl.formatMessage(messages.caption)}
      description={intl.formatMessage(messages.description, {
        token: rewardTokenSymbol,
      })}
      onWhiteBackground={onWhiteBackground}
      withGrayIcon={true}
    />
  );
}
