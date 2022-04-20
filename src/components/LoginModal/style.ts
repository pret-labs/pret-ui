import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .LoginModal,
  .LoginModal__container {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .LoginModal {
    width: 100%;
    height: 100%;
    background: #1e2329;
    border-radius: 16px;
    &__title {
      color: #9936ce;
      font-weight: 400;
      font-size: 34px;
      line-height: 40px;
      margin-bottom: 10px;
    }
    &__content {
      color: white;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      margin-bottom: 50px;
    }
    @include respond-to(sm) {
      &__title {
        font-size: 20px;
      }
    }
  }
`;

export default staticStyles;
