import { useIntl } from 'react-intl';
import { normalize } from '@aave/math-utils';
import { useThemeContext } from '@pret/pret-ui-kit';

import { ComputedReserveData, useDynamicPoolDataContext } from '../../../libs/pool-data-provider';
import { useIncentivesDataContext } from '../../../libs/pool-data-provider/hooks/use-incentives-data-context';
import IncentiveClaimItem from '../../IncentiveClaimItem';

import messages from './messages';
import staticStyles from './style';
import { useAirdropModalContext } from '../../../libs/airdrop-modal-provider';

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
    rewardTokenAddress.toLowerCase() === '0xa1835ac61a47be51a29681ba0626aef92f8d1c73' || // aurora
    rewardTokenAddress.toLowerCase() === '0x671c5118d31a2efb9ccf0d20e6939d92829ae74d' // hardhat
  ) {
    return 'AURORA';
  } else if (
    rewardTokenAddress.toLowerCase() === '0x096f9fdda1e6f59ad2a8216bbd64daa9140222cc' || // aurora
    rewardTokenAddress.toLowerCase() === '0xbf26ee1dbc902d72867cfc212b8110e89d45908a' // hardhat
  ) {
    return 'CORN';
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
  const { setShowAirdropModal } = useAirdropModalContext();

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
      <div className="IncentiveWrapper__incentives">
        {usersIncentivesFiltered.map((usersIncentivesFiltered, idx) => {
          return Object.entries(usersIncentivesFiltered).map((incentive) => {
            const rewardTokenSymbol = getRewardTokenSymbol(
              reserves,
              incentive[1].rewardTokenAddress
            );

            const rewardTokenDecimals = incentive[1].rewardTokenDecimals;
            const claimableRewards = normalize(incentive[1].claimableRewards, rewardTokenDecimals);

            const isCORN = rewardTokenSymbol === 'CORN';
            return (
              <IncentiveClaimItem
                title={
                  isCORN
                    ? intl.formatMessage(messages.totalPreMiningRewards)
                    : intl.formatMessage(messages.availableRewards)
                }
                key={incentive[0]}
                hasClaimButton
                onClickClaimButton={
                  isCORN
                    ? () => {
                        setShowAirdropModal(true);
                      }
                    : undefined
                }
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
