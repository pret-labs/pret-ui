import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ScreensWrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    overflow-y: auto;

    &__content {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow-x: hidden;
      position: relative;
      z-index: 2;
    }

    &__top-contentWrapper {
      /* menu height 50px fixed on top */
      padding-top: 50px;

      position: relative;
      background: #181a20;

      @include respond-to(sm) {
        display: none;
      }
    }

    &__topPanelSmall {
      .ScreensWrapper__top-contentWrapper {
        &:after {
          height: 80px;
        }
      }
    }

    &__background {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      object-fit: cover;

      @include respond-to(sm) {
        display: none;
      }
    }
  }
`;

export default staticStyles;
