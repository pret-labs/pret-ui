import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TotalMarketsSize {
    padding-right: 10px;
    @include respond-to(md) {
      padding-right: 0;
      margin-bottom: 10px;
    }
    @include respond-to(sm) {
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      padding: 15px 10px;
      width: calc(100% + 20px);
      position: relative;
      left: -10px;
    }
    p {
      font-size: 16px;
      margin-bottom: 5px;
      @include respond-to(sm) {
        font-weight: 300;
        margin-bottom: 2px;
        font-size: $regular;
      }
    }
    h2 {
      white-space: nowrap;
      font-size: 48px;
      @include respond-to(sm) {
        font-size: 30px;
      }
    }
  }
`;

export default staticStyles;
