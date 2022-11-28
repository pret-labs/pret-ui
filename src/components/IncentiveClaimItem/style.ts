import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .IncentiveClaimItem {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: $transition;
    border: 1px solid #d4747f;

    &:last-of-type {
      margin: 8px 0;
    }

    &__title {
      font-size: 12px;
      font-weight: 500;
      padding: 8px 12px;
      background: rgba(255, 255, 255, 0.16);
      color: white;
      max-width: 124px;
      @include respond-to(sm) {
        color: black;
      }
    }

    &__valueOuter {
      display: flex;
      padding: 0 12px;
    }

    &__valueInner {
      display: flex;
      align-items: center;
      margin-right: 8px;
      @include respond-to(xl) {
        margin-right: 4px;
      }
    }

    &__icon,
    .TokenIcon__image {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }

    .Value__white .Value__value {
      font-size: $regular;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(md) {
        font-size: $medium;
      }
    }

    .ButtonLink {
      padding: 3px 8px;
      background: #b046bf;
      font-size: $regular;
      color: white;
      border-radius: 3px;
      margin-left: 10px;
      &:hover {
        opacity: 0.8;
      }
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(md) {
        font-size: $medium;
      }
    }

    .CustomTooltip {
      padding: 5px 8px;
      .CustomTooltip__content {
        font-size: $small;
        @include respond-to(xl) {
          font-size: $extraSmall;
        }
      }
    }

    .CustomTooltip.place-top {
      margin-top: -5px !important;
    }
  }
`;

export default staticStyles;
