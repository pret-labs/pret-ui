import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .PartnersPanel {
    margin: 0 auto;
    margin-bottom: 100px;
    padding: 0 20px;

    width: 1200px;
    margin-top: 80px;

    @include respond-to(md) {
      width: auto;
    }

    h2 {
      margin-bottom: 8px;
      text-align: center;
      font-weight: 700;
      font-size: 44px;
      line-height: 52px;
      color: black;
    }

    &__description {
      margin-bottom: 50px;
      text-align: center;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
    }

    &__gallerys {
      margin-top: 50px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);

      @include respond-to(md) {
        grid-template-columns: repeat(2, 1fr);
      }
      @include respond-to(sm) {
        grid-template-columns: repeat(1, 1fr);
      }

      gap: 28px;
    }

    &__gallery {
      min-height: 150;
      background: white;
      display: grid;
      place-items: center;

      img {
        max-width: 75%;
        max-height: 50%;
      }
    }
  }
`;

export default staticStyles;
