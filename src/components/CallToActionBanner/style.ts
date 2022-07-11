import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .CallToActionBanner {
    * {
      font-family: 'Montserrat';
    }
    padding: 0 20px;
    background: #181a20;
    &__content {
      padding: 43px 0 73px 0;
      color: white;
      text-align: center;
      max-width: 784px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      h1 {
        display: flex;
        margin-bottom: 8px;
        font-weight: 700;
        font-size: 26px;
        line-height: 30px;

        display: flex;
        justify-content: center;
        align-items: center;
        img {
          margin-left: 20px;
        }

        @include respond-to(md) {
          margin-top: 20px;
          font-size: 24px;
        }
        @include respond-to(sm) {
          margin-top: 20px;
          font-size: 20px;
        }
      }
    }
    &__double-rewards {
      font-style: normal;
      font-weight: 900;
      font-size: 30px;
      line-height: 37px;
    }
    &__amount {
      font-size: 40px;
      font-weight: 900;
      line-height: 70px;
      @include respond-to(md) {
        font-size: 60px;
      }
      @include respond-to(sm) {
        font-size: 40px;
      }

      background: linear-gradient(90.54deg, #d98f4e 6.59%, #c750b7 49.94%, #9033d0 98.75%);
      -webkit-background-clip: text;
      -moz-background-clip: text;
      -webkit-text-fill-color: transparent;
      -moz-text-fill-color: transparent;
      text-shadow: 0px 4px 4px rgba(98, 98, 98, 0.25);
    }

    &__description {
      font-size: 16px;
      line-height: 20px;
      text-align: center;

      margin-bottom: 15px;
      max-width: 520px;
    }

    &__coin-list {
      margin-bottom: 30px;
      display: flex;
      div {
        width: 50px;
        height: 50px;
        margin-right: 40px;
      }
      @include respond-to(md) {
        transform: scale(0.75);
      }
      @include respond-to(sm) {
        transform: scale(0.5);
      }
    }

    &__primary-btn {
      color: white;
      background: linear-gradient(90deg, #db8f57 0%, #cc53b6 56.48%, #6324da 106.82%);
      border-radius: 9999px;
      border: 0;
      width: 240px;
      height: 60px;
      overflow: hidden;

      font-weight: 700;
      font-size: 20px;
      line-height: 30px;

      @include respond-to(md) {
        width: 200px;
        height: 50px;
        font-size: 18px;
      }
      @include respond-to(sm) {
        width: 160px;
        height: 44px;
        font-size: 16px;
      }

      &:hover {
        filter: drop-shadow(0px 0px 4px #8533cf);
      }
    }
    &__footnotes {
      margin-bottom: 20px;
      font-style: normal;
      font-weight: 700;
      font-size: 28px;
      line-height: 34px;
      color: #d6797a;

      @include respond-to(md) {
        font-size: 24px;
      }
      @include respond-to(sm) {
        font-size: 20px;
      }

      span {
        color: #d7826b;
      }
    }
  }
`;

export default staticStyles;
