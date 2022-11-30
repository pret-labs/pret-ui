import { BigNumber } from '@aave/protocol-js';
import { useThemeContext, getAssetInfo } from '@pret/pret-ui-kit';
import { useEffect, useState } from 'react';
import { RewardsAssets } from '../../../../helpers/config/types';
import { isValid } from '../../../../helpers/number';
import { useMarketTableItemAPYCellContext } from '../../../../libs/market-table-item-apy-cell-provider';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';

/*
 * APY = (1+daily ROI)^365-1
 * daily ROI = （deposit rewards per day * vwap price) / current supply TVL
 */
function calculateApy({
  rewardsPerDay,
  tokenPrice,
  currentSupplyTVL,
}: {
  rewardsPerDay: string;
  tokenPrice: string;
  currentSupplyTVL: string;
}) {
  const dailyROI = new BigNumber(rewardsPerDay).multipliedBy(tokenPrice).div(currentSupplyTVL);
  const apy = dailyROI.plus(1).pow(365).minus(1);
  if (!isValid(apy.toString())) return '-';
  return apy.multipliedBy(100).toFixed(2);
}

interface MarketTableItemAPYCellProps {
  withPercentage?: boolean;
  symbol: RewardsAssets;
  type: 'deposit' | 'borrow';
  currentSupplyTVL: string;
}

function MarketTableItemAPYCell({
  withPercentage = true,
  symbol,
  type,
  currentSupplyTVL,
}: MarketTableItemAPYCellProps) {
  const { isCurrentThemeDark, currentTheme } = useThemeContext();
  const { showMarketTableItemAPYCell } = useMarketTableItemAPYCellContext();
  const { currentMarketData, tokenPrice } = useProtocolDataContext();
  const auroraReward = currentMarketData.auroraRewards[symbol as RewardsAssets];
  const cornReward = currentMarketData.cornRewards[symbol as RewardsAssets];
  const auroraRewardsPerDay = auroraReward
    ? type.includes('deposit')
      ? auroraReward.depositRewardsPerDay
      : auroraReward.borrowRewardsPerDay
    : '';
  const cornRewardsPerDay = cornReward
    ? type.includes('deposit')
      ? cornReward.depositRewardsPerDay
      : cornReward.borrowRewardsPerDay
    : '';
  const [apy, setApy] = useState<{ auroraApy: string; cornApy: string }>({
    auroraApy: '-',
    cornApy: '-',
  });
  useEffect(() => {
    if (tokenPrice) {
      const auroraApy = calculateApy({
        rewardsPerDay: auroraRewardsPerDay.toString(),
        tokenPrice: tokenPrice.aurora,
        currentSupplyTVL,
      });
      const cornApy = calculateApy({
        rewardsPerDay: cornRewardsPerDay.toString(),
        tokenPrice: tokenPrice.corn,
        currentSupplyTVL,
      });
      const limitSize = (num: string) => (new BigNumber(num).gt(1000) ? '>1000.00' : num);
      setApy({
        auroraApy: limitSize(auroraApy),
        cornApy: limitSize(cornApy),
      });
    }
  }, [tokenPrice, auroraRewardsPerDay, cornRewardsPerDay, currentSupplyTVL]);

  if (!showMarketTableItemAPYCell) return null;
  return (
    <div className="MarketTableItemAPYCell">
      <div className="MarketTableItemAPYCell__item">
        <div>
          <img src={getAssetInfo('aurora').icon} alt="aurora icon" />
        </div>
        <div>{apy.auroraApy}</div>
        <div>{withPercentage && '%'}</div>
      </div>
      <div className="MarketTableItemAPYCell__item">
        <div>
          <img src={getAssetInfo('corn').icon} alt="corn icon" />
        </div>
        <div>{apy.cornApy}</div>
        <div>{withPercentage && '%'}</div>
      </div>
      <style jsx={true} global={true}>{`
        .MarketTableItemAPYCell {
          &__item {
            margin-top: 4px;
            width: auto;
            display: flex;
            align-items: center;

            font-size: 12px;
            font-weight: 500;

            color: ${isCurrentThemeDark ? currentTheme.white.hex : currentTheme.textDarkBlue.hex};
            border: 1px solid ${isCurrentThemeDark ? 'rgba(255, 255, 255, 0.28)' : '#b7b7b7'};
            padding: 5px 8px;
            border-radius: 3px;

            img {
              width: 18px;
              height: 18px;
              margin-right: 4px;
            }
          }
        }
      `}</style>
    </div>
  );
}

export default MarketTableItemAPYCell;
