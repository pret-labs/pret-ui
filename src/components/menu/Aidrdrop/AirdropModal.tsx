import ReactModal from 'react-modal';
import clsx from 'classnames';
import CloseIcon from '../../../images/close.svg';
import FireIcon from '../../../images/fire.svg';
import { useIntl } from 'react-intl';
import messages from './messages';
import { CSSProperties } from 'react';
import css from 'styled-jsx/css';

function _OverlayElement(
  _props: React.ComponentPropsWithRef<'div'>,
  contentEl: React.ReactElement
) {
  const { className, ...props } = _props;
  return (
    <div className={clsx(className, 'AirdropModal__Overlay')} {...props}>
      {contentEl}
      <style jsx={true} global={true}>{`
        .AirdropModal__Overlay {
          transition: backdrop-filter 0.3s ease-in-out;
          backdrop-filter: blur(10px);
          padding: 0 14px !important;
        }
      `}</style>
    </div>
  );
}
function _ContentElement(_props: React.ComponentPropsWithRef<'div'>, children: React.ReactNode) {
  const { className, style, ...props } = _props;
  return (
    <div className={clsx(className, 'AirdropModal__Content')} {...props}>
      {children}
      <style jsx={true} global={true}>{`
        .AirdropModal__Content {
          width: 560px;
          max-width: 100% !important;
          padding: 30px !important;
          background: #181a20;
          border-radius: 12px;
          color: white;
          align-items: flex-start;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}

function SpaceLine({ style }: { style?: CSSProperties }) {
  return (
    <>
      <hr className="AirdropModal__space-line" style={style} />
      <style jsx={true} global={true}>{`
        .AirdropModal {
          &__space-line {
            width: 100%;
            height: 1px;
            border-radius: 9999px;
            background: rgba(255, 255, 255, 0.2);
          }
        }
      `}</style>
    </>
  );
}
function AirdropModal() {
  const intl = useIntl();
  return (
    <ReactModal isOpen={true} overlayElement={_OverlayElement} contentElement={_ContentElement}>
      <img className="AirdropModal__close-icon" src={CloseIcon} alt="close" />
      <div className="AirdropModal__title-section">
        <img src={FireIcon} alt="fire" />
        <h3>{intl.formatMessage(messages.airdropModalName)}</h3>
      </div>
      <SpaceLine style={{ margin: '16px 0' }} />
      <div className="AirdropModal__CORN-balance">
        <div>
          <div className="corn-balance">1111.1111 CORN</div>
          <p className="corn-balance-title">
            {intl.formatMessage(messages.yourCORNBalanceOn)} <span>AURORA</span>
          </p>
        </div>
        <button className="AirdropModal__purple-button">
          {intl.formatMessage(messages.addCORNToMetamask)}
        </button>
      </div>
      <SpaceLine style={{ margin: '15px 0 8px' }} />
      <div className="AirdropModal__data-section">
        <p className="AirdropModal__subtitle">Pret Premining</p>
        <div className="AirdropModal__data-row">
          <div>
            <p className="data">111.1111 CORN</p>
            <p className="title">Total Rewards</p>
          </div>
          <div>
            <p className="data">111.1111 CORN</p>
            <p className="title">Total Rewards</p>
          </div>
          <div>
            <p className="data">111.1111 CORN</p>
            <p className="title">Total Rewards</p>
          </div>
          <button className="AirdropModal__purple-button">
            {intl.formatMessage(messages.claim)}
          </button>
        </div>
      </div>
      <SpaceLine style={{ margin: '15px 0 8px' }} />
      <div className="AirdropModal__data-section">
        <p className="AirdropModal__subtitle">{intl.formatMessage(messages.airdrop)}</p>
        <div className="AirdropModal__data-row">
          <div>
            <p className="data">111.1111 CORN</p>
            <p className="title">Total Rewards</p>
          </div>
          <div>
            <p className="data">111.1111 CORN</p>
            <p className="title">Total Rewards</p>
          </div>
          <div>
            <p className="data">111.1111 CORN</p>
            <p className="title">Total Rewards</p>
          </div>
          <button className="AirdropModal__purple-button">
            {intl.formatMessage(messages.claim)}
          </button>
        </div>
      </div>
      <style jsx={true} global={true}>{`
        .AirdropModal {
          &__data-section {
            width: 100%;
          }
          &__data-row {
            width: 100%;
            margin-top: 8px;
            text-align: left;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .data {
              font-size: 16px;
              font-weight: bold;
            }
            .title {
              font-size: 12px;
              font-weight: 500;
              color: #656565;
              margin-top: 2px;
            }
          }
          &__subtitle {
            text-align: left;
            font-size: 12px;
            font-weight: 500;
            color: #4c38dc;
          }
          &__title-section {
            display: flex;
            img {
              width: 12px;
              height: 16px;
              margin-right: 15px;
            }
          }

          &__CORN-balance {
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: left;
            width: 100%;

            .corn-balance {
              font-size: 16px;
              font-weight: 500;
            }

            .corn-balance-title {
              margin-top: 2px;
              font-weight: 500;
              font-size: 12px;
              span {
                color: #3ab563;
              }
            }
          }

          &__purple-button {
            color: white;
            background: #4c38dc;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 12px;
            font-weight: bold;
            transition: all 300ms linear;
            &:hover {
              background: #4c38dccc;
              color: #ffffffcc;
            }
          }
          &__close-icon {
            width: 24px;
            height: 24px;
            position: absolute;
            right: 24px;
            top: 15px;
          }
        }
      `}</style>
    </ReactModal>
  );
}

export default AirdropModal;
