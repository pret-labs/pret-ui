import { useThemeContext } from '@pret/pret-ui-kit';
import ConnectButton from '../ConnectButton';
import staticStyles from './style';

function LoginModal() {
  const { sm } = useThemeContext();
  return (
    <section className="LoginModal">
      <div className="LoginModal__container">
        <h3 className="LoginModal__title">Please connect your wallet</h3>
        <p className="LoginModal__content">
          To see your deposited / borrowed assets, you need to connect your wallet.
        </p>
        <ConnectButton size={sm ? 'medium' : 'large'} />
        <style jsx={true} global={true}>
          {staticStyles}
        </style>
      </div>
    </section>
  );
}

export default LoginModal;
