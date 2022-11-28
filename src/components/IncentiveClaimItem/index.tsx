import { useIntl } from 'react-intl';
import { CustomTooltip, TokenIcon, useThemeContext } from '@pret/pret-ui-kit';

import Value from '../basic/Value';
import Link from '../basic/Link';

import defaultMessages from '../../defaultMessages';
import staticStyles from './style';

import tribeIcon from '../../images/tirbe.svg';

interface IncentiveClaimItemProps {
  title: string;
  symbol: string;
  claimableRewards: string;
  incentiveControllerAddress: string;
  hasClaimButton?: boolean;
}

export default function IncentiveClaimItem({
  symbol,
  claimableRewards,
  incentiveControllerAddress,
  hasClaimButton,
  title,
}: IncentiveClaimItemProps) {
  const intl = useIntl();
  const { xl, sm } = useThemeContext();

  const iconSize = xl && !sm ? 16 : 20;

  const rewardClaimLink = `/rewards/confirm/${incentiveControllerAddress}`;
  const tooltipId = `incentiveClaimItem--${symbol}`;

  return (
    <div className="IncentiveClaimItem" data-tip={true} data-for={tooltipId}>
      <p className="IncentiveClaimItem__title">{title}</p>
      <div className="IncentiveClaimItem__valueOuter">
        <div className="IncentiveClaimItem__valueInner">
          {symbol === 'TRIBE' ? (
            <img
              className="IncentiveClaimItem__icon"
              src={tribeIcon}
              style={{ width: iconSize, height: iconSize }}
              alt=""
            />
          ) : (
            <TokenIcon tokenSymbol={symbol} height={iconSize} width={iconSize} />
          )}
          <Value value={claimableRewards} compact={true} color={sm ? 'dark' : 'white'} />
        </div>

        {hasClaimButton && (
          <Link
            to={rewardClaimLink}
            className="ButtonLink"
            disabled={claimableRewards === '0'}
            title={intl.formatMessage(defaultMessages.claim)}
          />
        )}

        {!sm && (
          <CustomTooltip
            tooltipId={tooltipId}
            text={`${Number(claimableRewards).toFixed(10)} ${symbol}`}
          />
        )}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
