import { useIntl } from 'react-intl';
import messages from './messages';
import Fire from '../../../images/fire.svg';
import AirdropModal from './AirdropModal';
import { useState } from 'react';

function AirdropButton() {
  const intl = useIntl();
  const [showAirdropModal, setShowAirdropModal] = useState(false);
  return (
    <div>
      <div className="AirdropButton" onClick={() => setShowAirdropModal(true)}>
        <img className="AirdropButton__logo" src={Fire} width={12} height={16} alt="fire" />
        <p className="AirdropButton__content">{intl.formatMessage(messages.airdropButtonName)}</p>
      </div>
      {showAirdropModal && <AirdropModal onRequestClose={() => setShowAirdropModal(false)} />}
      <style jsx={true} global={true}>{`
        .AirdropButton {
          display: flex;
          align-items: center;
          &:hover {
            opacity: 80%;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
          }
          &__logo {
            margin-right: 12px;
          }
          &__content {
            font-size: 14px;
            font-weight: 500;
            color: white;
          }
        }
      `}</style>
    </div>
  );
}

export default AirdropButton;
