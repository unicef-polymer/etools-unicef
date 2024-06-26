import {css} from 'lit';
// language=HTML
export const etoolsTableResponsiveStyles = css`
  /*
    Max width before this PARTICULAR table gets nasty
    This query will take effect for any screen smaller than 760px
    and also iPads specifically.
  */
  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
    :host {
      padding-top: 6px;
    }
    table {
      border: 0;
    }
    table caption {
      font-size: var(--etools-font-size-20, 20px);
      line-height: 1.5em;
      height: auto;
      padding-bottom: 6px;
    }
    table thead {
      border: none;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }
    table tr:not(.child-row) td {
      padding: 1.25rem 0;
      padding-inline-start: 36%;
    }
    table td,
    table th {
      display: block !important;
      text-align: start !important;
    }
    table tr td.pagination {
      padding: 0px 8px !important;
    }
    table tr td.pagination:before {
      content: '';
    }
    tr {
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
    td {
      border: none !important;
      line-height: inherit;
      position: relative;
      padding-inline-start: 45% !important;
    }
    tr:not(.child-row) td:before {
      position: absolute;
      content: attr(data-label) ':';
      color: var(--etools-table-secondary-text-color, rgba(0, 0, 0, 0.54));
      inset-inline-start: 5px;
      inset-inline-end: 5px;
      max-width: 42%;
      white-space: break-spaces;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    td[data-label] {
      width: 53%;
    }
    .row-actions .actions {
      visibility: visible !important;
    }
    .expand-cell {
      display: none;
    }
    .child-row {
      display: var(--child-row-responsive-display, flex);
    }
    .child-row td {
      padding: var(--child-row-td-padding, 0.5rem 0.75rem) !important;
    }
  }
`;
