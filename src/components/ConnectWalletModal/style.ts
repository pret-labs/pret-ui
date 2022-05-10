import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ConnectWalletModal {
    &__error {
      margin-top: 20px;
      font-size: 14px;
      text-align: left;
      width: 100%;
    }

    &__content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      max-width: 825px;
      position: relative;
      z-index: 3;
      @include respond-to(xl) {
        grid-template-columns: repeat(auto-fit, minmax(145px, 1fr));
        max-width: 660px;
      }
      @include respond-to(md) {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 540px;
      }
    }

    &__wallets {
      margin-top: 20px;
      @include respond-to(sm) {
        width: 100%;
      }
    }

    &__wallet-left,
    &__wallet-right {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__wallet-left img {
      width: 40px;
      height: 40px;
      @include respond-to(sm) {
        width: 30px;
        height: 30px;
      }
    }
    &__wallet-right img {
      width: 10px;
      height: 20px;
      @include respond-to(sm) {
        width: 5px;
        height: 10px;
      }
    }

    &__wallet-wrapper {
      min-width: 400px;
      padding: 16px;
      border-radius: 6px;
      margin-top: 20px;

      @include respond-to(sm) {
        padding: 12px;
        min-width: auto;
        width: 100%;
      }

      background: #1e2329;
      display: flex;
      justify-content: space-between;
      align-items: center;

      cursor: pointer;
    }

    &__wallet-name {
      color: white !important;
      margin-left: 15px;
      font-weight: 400;
      font-size: 22px;
      line-height: 30px;
      @include respond-to(sm) {
        font-size: 18px;
      }
    }
  }
`;

export default staticStyles;
