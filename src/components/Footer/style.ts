import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .Footer {
    background: #181a20;
    position: relative;
    z-index: 2;
    padding-right: 15px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    @include respond-to(sm) {
      padding: 0;
      justify-content: center;
    }
    @include respond-to(xl) {
      padding: 10px 10px 5px;
    }

    &__inside {
      @include respond-to(md) {
        display: none;
      }
    }
    &__innerdiv {
      margin: 40px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      @include respond-to(sm) {
        margin: 20px 0;
      }
    }
    &__incubatedby {
      color: #a3a3a6;
      margin-right: 10px;
    }

    .DarkModeSwitcher {
      margin-right: 10px;
      @include respond-to(sm) {
        margin: 0;
      }
    }

    &__hideInMobile {
      @include respond-to(sm) {
        display: none;
      }
    }

    &__bottom {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
    }
  }
`;

export default staticStyles;
