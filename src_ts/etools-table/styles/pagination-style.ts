import {css} from 'lit';

// language=HTML
export const etoolsPaginationStyles = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    font-size: var(--etools-font-size-12, 12px);
    color: var(--secondary-text-color, rgba(0, 0, 0, 0.54));
  }

  :host([do-not-show]) {
    display: none;
  }

  etools-icon-button {
    --etools-icon-font-size: var(--etools-font-size-24, 24px);
    color: var(--dark-icon-color, #6f6f70);
  }

  #rows {
    margin-inline-end: 24px;
  }

  #range {
    margin: 0 32px;
  }

  sl-select {
    --sl-input-border-width: 0;
    --sl-input-font-size-small: var(--etools-font-size-12, 12px);
    --sl-input-color: var(--gray-mid);
    width: 70px;
  }

  .pagination-item {
    display: flex;
    align-items: center;
  }

  /* Mobile view CSS */
  :host([low-resolution-layout]) {
    padding: 8px 0;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  :host([low-resolution-layout]) #range {
    margin: 0;
    margin-inline-start: 24px;
  }

  :host([low-resolution-layout]) .pagination-btns {
    margin-inline-start: -12px;
  }

  @media (max-width: 576px) {
    #range {
      margin: 0px 4px;
    }
    #rows {
      margin-inline-end: 4px;
    }
    :host {
      flex-wrap: wrap;
    }
  }
`;
