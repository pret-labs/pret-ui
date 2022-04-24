import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ConnectButton {
    position: relative;
    &:hover {
      &:before,
      &:after {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
    }
    &:active {
      transform: scale(0.98);
    }

    &:after,
    &:before {
      content: '';
      position: absolute;
      transition: all 0.3s ease;
      background-size: 300% !important;
      animation: animate 4.5s infinite;
    }

    &:before,
    &:after {
      top: -2px;
      bottom: -2px;
      left: -2px;
      right: -2px;
    }

    &:before {
      filter: blur(2px);
    }

    &__inner {
      width: 100px;
      min-height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 2;
      @include respond-to(sm) {
        width: 110px;
        min-height: 54px;
        padding: 0 10px;
      }
    }
  }

  .ConnectButton__normal {
    .ConnectButton__inner {
      width: 160px;
      min-height: 40px;
      @include respond-to(xl) {
        width: 120px;
        min-height: 32px;
      }
      @include respond-to(sm) {
        width: 300px;
        min-height: 50px;
      }
      span {
        font-size: $regular;
        @include respond-to(xl) {
          font-size: $small;
        }
        @include respond-to(sm) {
          font-size: $regular;
        }
      }
    }
  }

  .ConnectButton__medium {
    .ConnectButton__inner {
      font-size: 16px;
      font-weight: bold;
      width: 150px;
      min-height: 40px;
    }
  }

  .ConnectButton__large {
    .ConnectButton__inner {
      width: 220px;
      font-weight: 700;
      line-height: 60px;
      span {
        font-size: 20px;
      }
    }
  }

  .ConnectButton {
    &__inner {
      border-radius: 9999px;
      background: linear-gradient(
        105.53deg,
        #da8b5c -11.31%,
        #d06697 39.1%,
        #bd4cbb 69.87%,
        #752cd3 114.39%
      );
      box-shadow: 1px 0px 2px rgba(0, 0, 0, 0.38);
      transition: $transition;
      &:hover {
        filter: drop-shadow(0px 0px 4px #8533cf);
      }
    }
  }

  @keyframes animate {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
`;

export default staticStyles;
