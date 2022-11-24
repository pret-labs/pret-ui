import { useIntl } from 'react-intl';

import TableItem from '../../../dashboard/components/DashboardTable/TableItem';
import TableValueCol from '../../../dashboard/components/DashboardTable/TableValueCol';
import TableButtonsWrapper from '../../../dashboard/components/DashboardTable/TableButtonsWrapper';
import TableButtonCol from '../../../dashboard/components/DashboardTable/TableButtonCol';
import TableAprCol from '../../../dashboard/components/DashboardTable/TableAprCol';
import { BorrowRateMode } from '../../../../libs/pool-data-provider/graphql';

import defaultMessages from '../../../../defaultMessages';

import { BorrowTableItem } from './types';

export default function BorrowItem({
  reserve: { symbol },
  uiColor,
  currentBorrows,
  currentBorrowsUSD,
  borrowRate,
  avg30DaysVariableRate,
  borrowRateMode,
  isActive,
  isFrozen,
  borrowingEnabled,
  repayLink,
  borrowLink,
  index,
  vincentivesAPR,
  sincentivesAPR,
}: BorrowTableItem) {
  const intl = useIntl();

  return (
    <TableItem tokenSymbol={symbol} color={uiColor}>
      <TableValueCol
        value={Number(currentBorrows)}
        subValue={Number(currentBorrowsUSD)}
        tooltipId={`borrow-${symbol}__${index}`}
      />
      <TableAprCol
        currentSupplyTVL={currentBorrowsUSD}
        value={Number(borrowRate)}
        thirtyDaysAverage={borrowRateMode === BorrowRateMode.Variable ? avg30DaysVariableRate : ''}
        liquidityMiningValue={
          borrowRateMode === BorrowRateMode.Variable ? vincentivesAPR : sincentivesAPR
        }
        symbol={symbol}
        type={borrowRateMode === BorrowRateMode.Variable ? 'borrow-variable' : 'borrow-stable'}
      />

      {/* <TableCol maxWidth={125}>
        <CustomSwitch
          value={borrowRateMode === BorrowRateMode.Variable}
          offLabel={intl.formatMessage(messages.offLabel)}
          onLabel={intl.formatMessage(messages.onLabel)}
          onColor={isCurrentThemeDark ? currentTheme.lightBlue.hex : currentTheme.darkBlue.hex}
          offColor={isCurrentThemeDark ? currentTheme.lightBlue.hex : currentTheme.darkBlue.hex}
          onSwitch={onSwitchToggle}
          disabled={!stableBorrowRateEnabled || isFrozen || !isActive}
          swiperHeight={swiperHeight}
          swiperWidth={swiperWidth}
        />
      </TableCol> */}

      <TableButtonsWrapper>
        <TableButtonCol
          disabled={!isActive || !borrowingEnabled || isFrozen}
          title={intl.formatMessage(defaultMessages.borrow)}
          linkTo={borrowLink}
        />
        <TableButtonCol
          disabled={!isActive}
          title={intl.formatMessage(defaultMessages.repay)}
          linkTo={repayLink}
          withoutBorder={true}
        />
      </TableButtonsWrapper>
    </TableItem>
  );
}
