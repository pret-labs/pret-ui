import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .Footer {
    background: #181a20;
    position: relative;
    z-index: 2;
    padding: 10px 15px 10px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    @include respond-to(xl) {
      padding: 10px 10px 5px;
    }
    @include respond-to(sm) {
      display: none;
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
    }
    &__incubatedby {
      color: #a3a3a6;
      margin-right: 10px;
    }

    .DarkModeSwitcher {
      margin-right: 10px;
    }
  }

  .Footer__bottom {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
  }
`;

export default staticStyles;
