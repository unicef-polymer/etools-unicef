import {css} from 'lit';

// language=HTML
export const etoolsTableStyles = css`
  :host {
    display: block;
    width: 100%;
    overflow-x: hidden;
    padding-top: 12px;
  }

  a:focus {
    border-bottom: 2px solid var(--primary-color);
  }

  table {
    width: 100%;
    color: #212529;
    border-collapse: collapse;
    box-sizing: border-box;
    display: table;
    border-spacing: 2px;
    border-color: var(--dark-divider-color, gray);
  }

  table td,
  table th {
    padding: 0.75rem;
    vertical-align: middle;
    display: table-cell;
    text-align: start;
  }

  table th {
    font-size: var(--etools-table-col-header-font-size, var(--etools-font-size-12, 12px));
  }

  table td.align-right,
  table th.align-right {
    text-align: end;
  }

  table td {
    border-top: 1px solid var(--etools-table-rows-border-color, #dee2e6);
    font-size: var(--etools-table-col-font-size, var(--etools-font-size-13, 13px));
  }

  table td a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    outline: none;
  }

  table th {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: var(--etools-table-secondary-text-color, rgba(0, 0, 0, 0.54));
  }

  table th.sort:hover {
    color: var(--etools-table-primary-text-color, rgba(0, 0, 0, 0.84));
    cursor: pointer;
  }

  table th.sort etools-icon {
    --etools-icon-font-size: var(--etools-font-size-20, 20px);
    line-height: 0;
    vertical-align: middle;
  }

  caption {
    width: 100%;
    height: 64px;
    line-height: 64px;
    font-size: var(--etools-font-size-20, 20px);
    text-align: start;
    color: var(--etools-table-text-color, #2b2b2b);
    padding: 0 var(--etools-table-side-padding, 24px);
    box-sizing: border-box;
  }

  table tr th:first-child,
  table tr td:first-child {
    padding-inline-start: var(--etools-table-side-padding, 24px);
  }

  table tr th:last-of-type,
  table tr td:last-of-type {
    padding-inline-end: var(--etools-table-side-padding, 24px);
  }

  table tr td.pagination {
    padding-inline-end: 16px;
  }

  /* action styles */
  .row-actions {
    position: relative;
    min-width: 130px;
  }

  .row-actions .actions {
    opacity: 0;
    position: absolute;
    inset-inline-end: var(--etools-table-side-padding, 16px);
    top: 0;
    bottom: 0;
    -ms-flex-direction: row;
    -webkit-flex-direction: row;
    flex-direction: row;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    -ms-flex-pack: end;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;
    background: transparent;
  }

  .row-actions .actions etools-icon-button {
    height: 100%;
    display: inline-flex;
    align-items: center;
    --etools-icon-font-size: var(--etools-font-size-24, 24px);
  }

  tr:hover .row-actions .actions {
    opacity: 1;
  }

  tr:focus-within .row-actions .actions {
    opacity: 1;
  }

  .row-actions etools-icon-button {
    color: var(--dark-icon-color, #6f6f70);
  }

  .row-editable:hover {
    background-color: var(--row-editable-hover-bg-color, #eeeeee);
  }

  .capitalize {
    text-transform: capitalize;
  }

  sl-checkbox[readonly] {
    pointer-events: none;
  }

  .expand-cell {
    padding-inline-start: 5px !important;
    padding-inline-end: 5px !important;
    color: var(--expand-icon-color, --primary-color);
    cursor: pointer;
    line-height: 0;
    vertical-align: middle;
  }

  :host-context([dir='rtl']) .expand-cell [name='chevron-right'] {
    transform: rotate(180deg);
  }

  .child-row,
  .child-row td {
    background-color: #f5f5f5;
  }

  .child-row .child-row-inner-container {
    min-height: var(--child-row-inner-container-height);
  }

  .child-row .child-item {
    background-color: var(--child-item-background);
    border: var(--child-item-border);
    padding: var(--child-item-padding);
    margin: var(--child-item-margin);
    cursor: var(--child-item-cursor);
    line-height: var(--child-item-line-height);
    float: var(--child-item-float);
    white-space: var(--child-item-white-space);
  }

  .display-none {
    display: none;
  }

  .icon-add {
    float: right;
    padding: 0px;
    width: 25px;
    height: 25px;
    color: var(--primary-color);
  }

  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
    .icon-add {
      float: left;
    }
  }
`;
