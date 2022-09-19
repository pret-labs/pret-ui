import { useIntl } from 'react-intl';
import { normalize } from '@aave/math-utils';
import { useThemeContext } from '@pret/pret-ui-kit';

import { ComputedReserveData, useDynamicPoolDataContext } from '../../../libs/pool-data-provider';
import { useIncentivesDataContext } from '../../../libs/pool-data-provider/hooks/use-incentives-data-context';
import IncentiveClaimItem from '../../IncentiveClaimItem';

import messages from './messages';
import staticStyles from './style';

// Fetch reward token symbol from hard coded non-reserve tokens or from reserves array
export function getRewardTokenSymbol(
  reserves: ComputedReserveData[],
  rewardTokenAddress: string
): string {
  if (rewardTokenAddress.toLowerCase() === '0x4da27a545c0c5b758a6ba100e3a049001de870f5') {
    return 'stkAAVE';
  } else if (rewardTokenAddress.toLowerCase() === '0xc7283b66eb1eb5fb86327f08e1b5816b0720212b') {
    return 'TRIBE';
  } else if (rewardTokenAddress.toLowerCase() === '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7') {
    return 'WAVAX';
  } else if (rewardTokenAddress.toLowerCase() === '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270') {
    return 'WMATIC';
  } else if (
    rewardTokenAddress === '0x81118Cb1b3257aa92C568648b2d668d9f80727d2' || // aurora
    rewardTokenAddress.toLowerCase() === '0x53810e4c71BC89d39Df76754c069680B26b20c3d' // hardhat
  ) {
    return 'AURORA';
  } else {
    let rewardReserve = reserves.find(
      (reserve) => reserve.underlyingAsset.toLowerCase() === rewardTokenAddress.toLowerCase()
    );
    if (rewardReserve) {
      return rewardReserve.symbol;
    } else {
      return '';
    }
  }
}

export default function IncentiveWrapper() {
  const intl = useIntl();
  const { currentTheme, sm } = useThemeContext();

  const { user, reserves } = useDynamicPoolDataContext();
  const { userIncentives } = useIncentivesDataContext();

  // Only display assets for which user has claimable rewards
  const usersIncentivesFiltered = userIncentives
    .map((userIncentive) =>
      Object.fromEntries(
        Object.entries(userIncentive).filter((entry) => Number(entry[1].claimableRewards) > 0)
      )
    )
    .filter((userIncentivesFiltered) => Object.keys(userIncentivesFiltered).length > 0);

  if (!user || usersIncentivesFiltered.length === 0) return null;

  return (
    <div className="IncentiveWrapper">
      <p className="IncentiveWrapper__title">{intl.formatMessage(messages.availableReward)}</p>

      <div className="IncentiveWrapper__incentives">
        {usersIncentivesFiltered.map((usersIncentivesFiltered, idx) => {
          return Object.entries(usersIncentivesFiltered).map((incentive) => {
            const rewardTokenSymbol = getRewardTokenSymbol(
              reserves,
              incentive[1].rewardTokenAddress
            );

            // it should be fixed 26 decimals when idx === 1, just for testing
            // need to be changed later.
            // TODO
            const rewardTokenDecimals =
              'WNEAR' !== rewardTokenSymbol ? 26 : incentive[1].rewardTokenDecimals;
            const claimableRewards = normalize(incentive[1].claimableRewards, rewardTokenDecimals);

            return (
              <IncentiveClaimItem
                key={incentive[0]}
                hasClaimButton={'WNEAR' === rewardTokenSymbol} // hardcoded to let second item not have claim button
                symbol={rewardTokenSymbol}
                claimableRewards={claimableRewards}
                incentiveControllerAddress={incentive[0]}
              />
            );
          });
        })}
      </div>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .IncentiveWrapper__title {
          color: ${sm ? currentTheme.textDarkBlue.hex : currentTheme.white.hex};
        }
      `}</style>
    </div>
  );
}
