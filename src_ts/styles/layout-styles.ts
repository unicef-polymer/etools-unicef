import {css} from 'lit';

export const layoutStyles = css`
  * {
    box-sizing: border-box;
  }
  *::before,
  *::after {
    box-sizing: inherit;
  }
  .container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }
  .container-dialog {
    width: 100%;
    padding: 15px 15px;
    margin-right: auto;
    margin-left: auto;
  }
  .layout-horizontal,
  .layout-vertical {
    box-sizing: border-box;
  }
  .layout-horizontal {
    display: flex;
    flex-direction: row;
  }
  .layout-vertical {
    display: flex;
    flex-direction: column;
  }
  .layout-wrap {
    flex-wrap: wrap;
  }
  .center-align {
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .align-items-center {
    align-items: center;
  }
  .right-align {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    text-align: right;
  }
  .bottom-aligned {
    align-items: flex-end;
  }
  @media (min-width: 576px) {
    .container {
      max-width: 540px;
    }
  }
  @media (min-width: 768px) {
    .container {
      max-width: 720px;
    }
  }
  @media (min-width: 1024px) {
    .container {
      max-width: 960px;
    }
  }
  @media (min-width: 1200px) {
    .container {
      max-width: 1140px;
    }
  }
  .container-fluid {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }
  .padding-v {
    padding-block-start: 8px;
    padding-block-end: 8px;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
  }
  .no-gutters {
    margin-right: 0;
    margin-left: 0;
  }
  .row.b-border {
    border-bottom: 1px solid var(--light-divider-color);
  }
  .row-second-bg {
    background-color: var(--light-theme-background-color);
  }
  .no-gutters > .col,
  .no-gutters > [class*='col-'] {
    padding-right: 0;
    padding-left: 0;
  }
  .no-padding {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
  .col-1,
  .col-2,
  .col-3,
  .col-4,
  .col-5,
  .col-6,
  .col-7,
  .col-8,
  .col-9,
  .col-10,
  .col-11,
  .col-12,
  .col,
  .col-auto,
  .col-sm-1,
  .col-sm-2,
  .col-sm-3,
  .col-sm-4,
  .col-sm-5,
  .col-sm-6,
  .col-sm-7,
  .col-sm-8,
  .col-sm-9,
  .col-sm-10,
  .col-sm-11,
  .col-sm-12,
  .col-sm,
  .col-sm-auto,
  .col-md-1,
  .col-md-2,
  .col-md-3,
  .col-md-4,
  .col-md-5,
  .col-md-6,
  .col-md-7,
  .col-md-8,
  .col-md-9,
  .col-md-10,
  .col-md-11,
  .col-md-12,
  .col-md,
  .col-md-auto,
  .col-lg-1,
  .col-lg-2,
  .col-lg-3,
  .col-lg-4,
  .col-lg-5,
  .col-lg-6,
  .col-lg-7,
  .col-lg-8,
  .col-lg-9,
  .col-lg-10,
  .col-lg-11,
  .col-lg-12,
  .col-lg,
  .col-lg-auto,
  .col-xl-1,
  .col-xl-2,
  .col-xl-3,
  .col-xl-4,
  .col-xl-5,
  .col-xl-6,
  .col-xl-7,
  .col-xl-8,
  .col-xl-9,
  .col-xl-10,
  .col-xl-11,
  .col-xl-12,
  .col-xl,
  .col-xl-auto {
    position: relative;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }
  .col {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
  }
  .col-auto {
    flex: 0 0 auto;
    width: auto;
    max-width: 100%;
  }
  .col-1 {
    flex: 0 0 8.3333333333%;
    max-width: 8.3333333333%;
  }
  .col-2 {
    flex: 0 0 16.6666666667%;
    max-width: 16.6666666667%;
  }
  .col-3 {
    flex: 0 0 25%;
    max-width: 25%;
  }
  .col-4 {
    flex: 0 0 33.3333333333%;
    max-width: 33.3333333333%;
  }
  .col-5 {
    flex: 0 0 41.6666666667%;
    max-width: 41.6666666667%;
  }
  .col-6 {
    flex: 0 0 50%;
    max-width: 50%;
  }
  .col-7 {
    flex: 0 0 58.3333333333%;
    max-width: 58.3333333333%;
  }
  .col-8 {
    flex: 0 0 66.6666666667%;
    max-width: 66.6666666667%;
  }
  .col-9 {
    flex: 0 0 75%;
    max-width: 75%;
  }
  .col-10 {
    flex: 0 0 83.3333333333%;
    max-width: 83.3333333333%;
  }
  .col-11 {
    flex: 0 0 91.6666666667%;
    max-width: 91.6666666667%;
  }
  .col-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .offset-1 {
    margin-left: 8.3333333333%;
  }
  .offset-2 {
    margin-left: 16.6666666667%;
  }
  .offset-3 {
    margin-left: 25%;
  }
  .offset-4 {
    margin-left: 33.3333333333%;
  }
  .offset-5 {
    margin-left: 41.6666666667%;
  }
  .offset-6 {
    margin-left: 50%;
  }
  .offset-7 {
    margin-left: 58.3333333333%;
  }
  .offset-8 {
    margin-left: 66.6666666667%;
  }
  .offset-9 {
    margin-left: 75%;
  }
  .offset-10 {
    margin-left: 83.3333333333%;
  }
  .offset-11 {
    margin-left: 91.6666666667%;
  }
  @media (min-width: 576px) {
    .col-sm {
      flex-basis: 0;
      flex-grow: 1;
      max-width: 100%;
    }
    .col-sm-auto {
      flex: 0 0 auto;
      width: auto;
      max-width: 100%;
    }
    .col-sm-1 {
      flex: 0 0 8.3333333333%;
      max-width: 8.3333333333%;
    }
    .col-sm-2 {
      flex: 0 0 16.6666666667%;
      max-width: 16.6666666667%;
    }
    .col-sm-3 {
      flex: 0 0 25%;
      max-width: 25%;
    }
    .col-sm-4 {
      flex: 0 0 33.3333333333%;
      max-width: 33.3333333333%;
    }
    .col-sm-5 {
      flex: 0 0 41.6666666667%;
      max-width: 41.6666666667%;
    }
    .col-sm-6 {
      flex: 0 0 50%;
      max-width: 50%;
    }
    .col-sm-7 {
      flex: 0 0 58.3333333333%;
      max-width: 58.3333333333%;
    }
    .col-sm-8 {
      flex: 0 0 66.6666666667%;
      max-width: 66.6666666667%;
    }
    .col-sm-9 {
      flex: 0 0 75%;
      max-width: 75%;
    }
    .col-sm-10 {
      flex: 0 0 83.3333333333%;
      max-width: 83.3333333333%;
    }
    .col-sm-11 {
      flex: 0 0 91.6666666667%;
      max-width: 91.6666666667%;
    }
    .col-sm-12 {
      flex: 0 0 100%;
      max-width: 100%;
    }
    .offset-sm-0 {
      margin-left: 0;
    }
    .offset-sm-1 {
      margin-left: 8.3333333333%;
    }
    .offset-sm-2 {
      margin-left: 16.6666666667%;
    }
    .offset-sm-3 {
      margin-left: 25%;
    }
    .offset-sm-4 {
      margin-left: 33.3333333333%;
    }
    .offset-sm-5 {
      margin-left: 41.6666666667%;
    }
    .offset-sm-6 {
      margin-left: 50%;
    }
    .offset-sm-7 {
      margin-left: 58.3333333333%;
    }
    .offset-sm-8 {
      margin-left: 66.6666666667%;
    }
    .offset-sm-9 {
      margin-left: 75%;
    }
    .offset-sm-10 {
      margin-left: 83.3333333333%;
    }
    .offset-sm-11 {
      margin-left: 91.6666666667%;
    }
  }
  @media (min-width: 768px) {
    .col-md {
      flex-basis: 0;
      flex-grow: 1;
      max-width: 100%;
    }
    .col-md-auto {
      flex: 0 0 auto;
      width: auto;
      max-width: 100%;
    }
    .col-md-1 {
      flex: 0 0 8.3333333333%;
      max-width: 8.3333333333%;
    }
    .col-md-2 {
      flex: 0 0 16.6666666667%;
      max-width: 16.6666666667%;
    }
    .col-md-3 {
      flex: 0 0 25%;
      max-width: 25%;
    }
    .col-md-4 {
      flex: 0 0 33.3333333333%;
      max-width: 33.3333333333%;
    }
    .col-md-5 {
      flex: 0 0 41.6666666667%;
      max-width: 41.6666666667%;
    }
    .col-md-6 {
      flex: 0 0 50%;
      max-width: 50%;
    }
    .col-md-7 {
      flex: 0 0 58.3333333333%;
      max-width: 58.3333333333%;
    }
    .col-md-8 {
      flex: 0 0 66.6666666667%;
      max-width: 66.6666666667%;
    }
    .col-md-9 {
      flex: 0 0 75%;
      max-width: 75%;
    }
    .col-md-10 {
      flex: 0 0 83.3333333333%;
      max-width: 83.3333333333%;
    }
    .col-md-11 {
      flex: 0 0 91.6666666667%;
      max-width: 91.6666666667%;
    }
    .col-md-12 {
      flex: 0 0 100%;
      max-width: 100%;
    }
    .offset-md-0 {
      margin-left: 0;
    }
    .offset-md-1 {
      margin-left: 8.3333333333%;
    }
    .offset-md-2 {
      margin-left: 16.6666666667%;
    }
    .offset-md-3 {
      margin-left: 25%;
    }
    .offset-md-4 {
      margin-left: 33.3333333333%;
    }
    .offset-md-5 {
      margin-left: 41.6666666667%;
    }
    .offset-md-6 {
      margin-left: 50%;
    }
    .offset-md-7 {
      margin-left: 58.3333333333%;
    }
    .offset-md-8 {
      margin-left: 66.6666666667%;
    }
    .offset-md-9 {
      margin-left: 75%;
    }
    .offset-md-10 {
      margin-left: 83.3333333333%;
    }
    .offset-md-11 {
      margin-left: 91.6666666667%;
    }
  }
  @media (min-width: 1024px) {
    .col-lg {
      flex-basis: 0;
      flex-grow: 1;
      max-width: 100%;
    }
    .col-lg-auto {
      flex: 0 0 auto;
      width: auto;
      max-width: 100%;
    }
    .col-lg-1 {
      flex: 0 0 8.3333333333%;
      max-width: 8.3333333333%;
    }
    .col-lg-2 {
      flex: 0 0 16.6666666667%;
      max-width: 16.6666666667%;
    }
    .col-lg-3 {
      flex: 0 0 25%;
      max-width: 25%;
    }
    .col-lg-4 {
      flex: 0 0 33.3333333333%;
      max-width: 33.3333333333%;
    }
    .col-lg-5 {
      flex: 0 0 41.6666666667%;
      max-width: 41.6666666667%;
    }
    .col-lg-6 {
      flex: 0 0 50%;
      max-width: 50%;
    }
    .col-lg-7 {
      flex: 0 0 58.3333333333%;
      max-width: 58.3333333333%;
    }
    .col-lg-8 {
      flex: 0 0 66.6666666667%;
      max-width: 66.6666666667%;
    }
    .col-lg-9 {
      flex: 0 0 75%;
      max-width: 75%;
    }
    .col-lg-10 {
      flex: 0 0 83.3333333333%;
      max-width: 83.3333333333%;
    }
    .col-lg-11 {
      flex: 0 0 91.6666666667%;
      max-width: 91.6666666667%;
    }
    .col-lg-12 {
      flex: 0 0 100%;
      max-width: 100%;
    }
    .offset-lg-0 {
      margin-left: 0;
    }
    .offset-lg-1 {
      margin-left: 8.3333333333%;
    }
    .offset-lg-2 {
      margin-left: 16.6666666667%;
    }
    .offset-lg-3 {
      margin-left: 25%;
    }
    .offset-lg-4 {
      margin-left: 33.3333333333%;
    }
    .offset-lg-5 {
      margin-left: 41.6666666667%;
    }
    .offset-lg-6 {
      margin-left: 50%;
    }
    .offset-lg-7 {
      margin-left: 58.3333333333%;
    }
    .offset-lg-8 {
      margin-left: 66.6666666667%;
    }
    .offset-lg-9 {
      margin-left: 75%;
    }
    .offset-lg-10 {
      margin-left: 83.3333333333%;
    }
    .offset-lg-11 {
      margin-left: 91.6666666667%;
    }
  }
  @media (min-width: 1200px) {
    .col-xl {
      flex-basis: 0;
      flex-grow: 1;
      max-width: 100%;
    }
    .col-xl-auto {
      flex: 0 0 auto;
      width: auto;
      max-width: 100%;
    }
    .col-xl-1 {
      flex: 0 0 8.3333333333%;
      max-width: 8.3333333333%;
    }
    .col-xl-2 {
      flex: 0 0 16.6666666667%;
      max-width: 16.6666666667%;
    }
    .col-xl-3 {
      flex: 0 0 25%;
      max-width: 25%;
    }
    .col-xl-4 {
      flex: 0 0 33.3333333333%;
      max-width: 33.3333333333%;
    }
    .col-xl-5 {
      flex: 0 0 41.6666666667%;
      max-width: 41.6666666667%;
    }
    .col-xl-6 {
      flex: 0 0 50%;
      max-width: 50%;
    }
    .col-xl-7 {
      flex: 0 0 58.3333333333%;
      max-width: 58.3333333333%;
    }
    .col-xl-8 {
      flex: 0 0 66.6666666667%;
      max-width: 66.6666666667%;
    }
    .col-xl-9 {
      flex: 0 0 75%;
      max-width: 75%;
    }
    .col-xl-10 {
      flex: 0 0 83.3333333333%;
      max-width: 83.3333333333%;
    }
    .col-xl-11 {
      flex: 0 0 91.6666666667%;
      max-width: 91.6666666667%;
    }
    .col-xl-12 {
      flex: 0 0 100%;
      max-width: 100%;
    }
    .offset-xl-0 {
      margin-left: 0;
    }
    .offset-xl-1 {
      margin-left: 8.3333333333%;
    }
    .offset-xl-2 {
      margin-left: 16.6666666667%;
    }
    .offset-xl-3 {
      margin-left: 25%;
    }
    .offset-xl-4 {
      margin-left: 33.3333333333%;
    }
    .offset-xl-5 {
      margin-left: 41.6666666667%;
    }
    .offset-xl-6 {
      margin-left: 50%;
    }
    .offset-xl-7 {
      margin-left: 58.3333333333%;
    }
    .offset-xl-8 {
      margin-left: 66.6666666667%;
    }
    .offset-xl-9 {
      margin-left: 75%;
    }
    .offset-xl-10 {
      margin-left: 83.3333333333%;
    }
    .offset-xl-11 {
      margin-left: 91.6666666667%;
    }
  }
`;
