import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .Markets {
    display: flex;
    flex-direction: column;
    flex: 1;
    @include respond-to(sm) {
      margin-top: 0 !important;
    }

    &__top-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 47px 32px;
      @include respond-to(md) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
    }

    &__size,
    &__market-switcher {
      display: none;
      @include respond-to(sm) {
        display: block;
      }
    }

    &__marketSwitcher--title {
      width: 100%;
      text-align: center;
      margin-bottom: 10px;
      font-size: $regular;
    }

    &__mobile--cards {
      display: none;
      @include respond-to(sm) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }

    &__help--modalInner {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .Markets__help--modal {
      .TextWithModal__text {
        font-size: $medium;
      }
    }

    &__price-switcher {
      margin-top: 30px;
      @include respond-to(xl) {
        margin-top: 20px;
      }
      @include respond-to(sm) {
        display: none;
      }
    }
  }
`;

export default staticStyles;
