import classNames from 'classnames';
import { useThemeContext, LabeledSwitch } from '@pret/pret-ui-kit';

type LabeledSwitcherProps = {
  value: boolean;
  leftOption: string;
  rightOption: string;
  onToggle: (value: boolean) => void;
  className?: string;
  width?: number;
  height?: number;
  fontSize?: number;
  disabled?: boolean;
  white?: boolean;
  darkOnDarkMode?: boolean;
};

export default function LandingLabeledSwitcher({
  value,
  leftOption,
  rightOption,
  onToggle,
  className,
  width,
  height,
  fontSize,
  disabled,
  white,
  darkOnDarkMode,
}: LabeledSwitcherProps) {
  const { currentTheme, xl, lg, md } = useThemeContext();

  const baseWidth = xl && !md ? 160 : 240;
  const baseHeight = xl && !md ? (lg ? 26 : 32) : 36;
  const baseFontSize = xl && !md ? (lg ? 10 : 11) : 14;

  return (
    <>
      <LabeledSwitch
        value={value}
        leftOption={leftOption}
        rightOption={rightOption}
        onToggle={onToggle}
        disabled={disabled}
        className={classNames({ LabeledSwitch__white: white }, className)}
        width={width || baseWidth}
        height={height || baseHeight}
        fontSize={fontSize || baseFontSize}
      />

      <style jsx={true} global={true}>{`
        .LabeledSwitch {
          &__pointer {
            width: 100px;
            ${value && 'transform: translateX(100px) !important;'}
            span {
              background: linear-gradient(
                105.53deg,
                #da8b5c -11.31%,
                #d06697 39.1%,
                #bd4cbb 69.87%,
                #752cd3 114.39%
              );
              box-shadow: 1px 1px 2px rgba(37, 37, 37, 0.56);
              border-radius: 6px;
            }
          }

          &__inner {
            width: 200px;
            min-height: 44px;
            border: 0;
            background: #e1e1e1;
            border-radius: 6px;
          }

          button {
            padding: 6px 26px;
            span {
              font-weight: 700;
              font-size: 18px;
              line-height: 27px;
              background: ${currentTheme.darkBlue.hex} !important;
              -webkit-background-clip: text !important;
            }
          }

          button.LabeledSwitch__buttonActive {
            span {
              background: ${currentTheme.white.hex} !important;
              -webkit-background-clip: text !important;
            }
          }
        }

        .LabeledSwitch__white {
          .LabeledSwitch__inner {
            background: ${currentTheme.textDarkBlue.hex};
            border-color: ${currentTheme.textDarkBlue.hex};
          }

          .LabeledSwitch__pointer {
            span {
              background: ${currentTheme.whiteElement.hex};
            }
          }

          button {
            span {
              background: ${currentTheme.whiteElement.hex};
            }
          }
        }

        .LabeledSwitchDisabled {
          .LabeledSwitch__inner {
            background: ${currentTheme.disabledGray.hex};
            border-color: ${currentTheme.disabledGray.hex};
          }
        }
      `}</style>
    </>
  );
}
