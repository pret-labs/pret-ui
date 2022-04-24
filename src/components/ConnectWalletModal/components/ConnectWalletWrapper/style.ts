import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ConnectWalletWrapper {
    color: white;
    background: #181a20 !important;
    h2 {
      color: white;
    }
    &.ReactModal__Content {
      height: fit-content;
      display: flex !important;
      justify-content: center;
      align-items: center;
      padding: 50px 40px 40px 40px !important;
      max-width: 950px !important;
      @include respond-to(sm) {
        padding: 20px !important;
        display: flex;
        justify-content: center;
        align-items: center;
        width: calc(100% - 40px);
      }
    }

    &__inner {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    &__icon {
      width: 90px;
      height: 90px;
      margin-bottom: 20px;
      img {
        width: 50px;
        height: 50px;
      }
      @include respond-to(sm) {
        width: 75px;
        height: 75px;
        margin-bottom: 15px;
        img {
          width: 35px;
          height: 35px;
        }
      }
      display: grid;
      place-items: center;
      background: rgba(60, 66, 83, 0.51);
      border-radius: 9999px;
    }

    &__caption-inner {
      h2 {
        color: white;
        font-size: 26px;
        line-height: 30px;
        @include respond-to(sm) {
          font-size: 18px;
        }
      }
    }
  }

  @media (max-height: 900px) and (max-width: 767px) {
    .ConnectWalletWrapper.ReactModal__Content.ReactModal__Content--after-open {
      position: absolute !important;
      top: 30% !important;
      bottom: 30% !important;
      display: block;
      overflow: auto !important;
    }
  }
`;

export default staticStyles;
