import { useThemeContext } from '@pret/pret-ui-kit';
import AuroraIcon from '../../../../images/auroraIcon.svg';
import CornIcon from '../../../../images/cornIcon.svg';

interface MarketTableItemAPYCellProps {
  auroraValue: string;
  cornValue: string;
  withPercentage?: boolean;
}
function MarketTableItemAPYCell({
  auroraValue,
  cornValue,
  withPercentage = true,
}: MarketTableItemAPYCellProps) {
  const { isCurrentThemeDark, currentTheme } = useThemeContext();
  return (
    <div className="MarketTableItemAPYCell">
      <div className="MarketTableItemAPYCell__item">
        <div>
          <img src={AuroraIcon} alt="aurora icon" />
        </div>
        <div>{auroraValue}</div>
        <div>{withPercentage && '%'}</div>
      </div>
      <div className="MarketTableItemAPYCell__item">
        <div>
          <img src={CornIcon} alt="aurora icon" />
        </div>
        <div>{cornValue}</div>
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
