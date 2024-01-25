import {css} from 'lit';

// language=CSS
export const etoolsFiltersStyles = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;

    box-sizing: border-box;
    min-height: 62px;
    height: auto;
  }

  #filters {
    display: flex;
    flex-direction: row;
    align-items: center;

    flex-wrap: wrap;
    flex: 1;

    margin-inline-end: auto;
  }

  #filters .filter {
    min-width: 160px;
    width: auto;
    min-height: 62px;
    height: auto;
  }

  #filters etools-dropdown.filter {
    /* TODO: 160px as requested makes etools-dropdown a little bit too small, no resize here...
    we might need to change this in the future (used only on reports filters) */
    width: 160px;
  }

  #filters .search {
    min-width: 280px;
  }

  etools-icon[name='search'] {
    color: var(--secondary-text-color, rgba(0, 0, 0, 0.54));
  }

  #filters .filter.date {
    min-width: 180px;
  }

  #filters .filter.toggle {
    display: flex;
    flex-direction: row;
    align-items: center;

    cursor: pointer;
    font-weight: normal;
    font-size: 16px;
  }

  #filters .filter.toggle sl-switch {
    margin-inline-start: 10px;
  }

  #filters-selector {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: stretch;

    padding-inline-start: 8px;
    margin-top: 8px;
    margin-bottom: 8px;
    margin-inline-start: 24px;
    border-inline-start: 2px solid var(--light-divider-color, rgba(0, 0, 0, 0.12));
  }

  /* Should be configured from app on --sl-color-primary-600
   #filterMenu sl-button {
     --sl-color-primary-600: var(--primary-color, rgba(0, 0, 0, 0.87));
   }
  */

  #filterMenu etools-button::part(label) {
    font-size: 16px;
    text-transform: uppercase;
  }

  #filterMenu .trigger-button {
    font-weight: 500;
    margin: 0;
  }

  datepicker-lite::part(dp-etools-icon) {
    color: var(--secondary-text-color, rgba(0, 0, 0, 0.54));
  }

  #filterMenu .trigger-button::part(prefix) {
    font-size: 24px;
  }

  #filterMenu sl-menu-item::part(base) {
    line-height: 24px;
    min-height: 48px;
    align-items: center;
  }

  #filterMenu sl-menu-item:focus-visible::part(base) {
    background-color: rgba(0, 0, 0, 0.1);
    color: var(--sl-color-neutral-1000);
  }

  #filterMenu sl-menu-item[checked]::part(base) {
    font-weight: var(--sl-font-weight-bold);
    background: var(--etools-filters-menu-selected-bg, #dcdcdc);
  }

  #filterMenu sl-menu-item[checked]:focus-visible::part(base) {
    background-color: #cfcfcf;
  }

  .clear-all-filters::part(base) {
    min-height: 48px;
    display: flex;
    flex-direction: row;

    align-items: center;
    color: var(--primary-color, rgba(0, 0, 0, 0.87));
    padding-inline-end: 16px;
    border-bottom: 1px solid var(--light-divider-color, rgba(0, 0, 0, 0.12));
  }

  .clear-all-filters etools-button {
    pointer-events: none;
  }

  .clear-all-filters::part(checked-icon) {
    display: none;
  }

  @media (min-width: 577px) {
    #filters > *:not(:last-child) {
      margin-inline-end: 16px;
    }
  }

  @media (max-width: 576px) {
    :host {
      flex-direction: row;
    }
    #filters .filter,
    #filters .search,
    #filters .filter.date {
      width: 100%;
      min-width: 220px;
    }
    #filters etools-dropdown.filter {
      width: 100%;
    }
    #filters .filter.date {
      margin-inline-end: unset;
    }
    #filters-selector {
      border-inline-start: none;
      padding-inline-start: 8px;
      margin-top: 0;
      margin-bottom: 0;
      margin-inline-start: 0;
      margin: 0 auto;
      padding: 0px;
    }
  }
`;
