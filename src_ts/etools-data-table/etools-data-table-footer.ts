import {LitElement, html} from 'lit';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import {getTranslation} from './utils/translate';
import {customElement, property} from 'lit/decorators.js';

/**
 * `etools-data-table-footer`
 * @LitElement
 * @customElement
 * @extends {LitElement}
 * @demo demo/index.html
 */
@customElement('etools-data-table-footer')
export class EtoolsDataTableFooter extends LitElement {
  private _totalResults: any;
  private _pageNumber: any;
  private _pageSize: any;

  @property({type: String})
  language!: string;

  @property({type: String})
  direction!: string;

  @property({type: Array})
  pageSizeOptions!: any[];

  @property({type: Number})
  totalPages!: number;

  @property({type: Array})
  visibleRange!: any[];

  @property({type: Boolean, reflect: true, attribute: 'do-not-show'})
  doNotShow!: boolean;

  @property({type: Boolean, reflect: true, attribute: 'low-resolution-layout'})
  lowResolutionLayout!: boolean;

  @property({type: String})
  rowsPerPageText!: string;

  @property({type: String})
  get pageSize() {
    return this._pageSize;
  }

  set pageSize(pageSize) {
    if (this._pageSize !== pageSize) {
      this._pageSize = pageSize;
      this._computeTotalPages(this.pageSize, this.totalResults);
      this._computeVisibleRange(this.pageNumber, this.pageSize, this.totalResults, this.totalPages);
      this._dispatchEvent('page-size-changed', this.pageSize);
    }
  }

  @property({type: Number})
  get pageNumber() {
    return this._pageNumber;
  }

  set pageNumber(pageNumber) {
    if (this._pageNumber !== pageNumber) {
      this._pageNumber = pageNumber;
      this._computeVisibleRange(this.pageNumber, this.pageSize, this.totalResults, this.totalPages);
      this._dispatchEvent('page-number-changed', this.pageNumber);
    }
  }

  @property({type: Number})
  get totalResults() {
    return this._totalResults;
  }

  set totalResults(totalResults) {
    this._totalResults = totalResults;
    this._computeTotalPages(this.pageSize, this.totalResults);
    this._computeVisibleRange(this.pageNumber, this.pageSize, this.totalResults, this.totalPages);
    this._hideFooter(this.totalResults);
    this.requestUpdate();
  }

  render() {
    // language=HTML
    return html`
      <style>
        :host {
          display: block;
          font-size: 12px;
          color: var(--list-text-color, rgba(0, 0, 0, 0.54));
        }

        :host([do-not-show]) {
          display: none;
        }

        sl-icon-button {
          font-size: 18px;
          color: var(--dark-icon-color, #6f6f70);
        }

        #table-footer {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          padding: 0;
          padding-inline-end: 8px;
          padding-inline-start: 16px;
          height: 48px;
          background-color: var(--list-bg-color, #ffffff);
        }

        #table-footer sl-icon-button {
          color: var(--list-disabled-icon-color, rgba(0, 0, 0, 0.64));
        }

        #table-footer sl-icon-button:not([disabled]) {
          color: var(--list-icon-color, #2b2b2b);
        }

        #table-footer sl-icon-button:not([disabled]):hover {
          color: var(--list-icon-hover-color, rgba(0, 0, 0, 0.87));
        }

        #rows {
          margin-inline-end: 24px;
        }

        #range {
          margin: 0 32px;
        }

        sl-select {
          --sl-input-border-width: 0;
          --sl-input-font-size-small: 12px;
          --sl-input-color: var(--gray-mid);
          width: 70px;
        }

        .pagination-item {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        /* Mobile view CSS */
        :host([low-resolution-layout]) #table-footer {
          padding: 8px 0;
          height: auto;
          display: flex;
          flex-direction: column;
          justify-content: start;
        }

        :host([low-resolution-layout]) #range {
          margin: 0;
          margin-inline-start: 24px;
        }

        :host([low-resolution-layout]) .pag-btns {
          margin-inline-start: -12px;
        }
      </style>

      <div id="table-footer">
        <span class="pagination-item">
          <span id="rows">${this.rowsPerPageText || getTranslation(this.language, 'ROWS_PER_PAGE')}</span>

          <sl-select size="small" hoist @sl-change="${this._selectRowsPerPage}" value="${this.pageSize}">
            ${this.pageSizeOptions.map(
              (sizeOption) => html`<sl-option value="${sizeOption}">${sizeOption}</sl-option>`
            )}
          </sl-select>

          <span id="range"
            >${`${this.visibleRange[0]}-${this.visibleRange[1]} ${getTranslation(this.language, 'OF')} ${
              this.totalResults
            }`}</span
          >
        </span>

        <span class="pagination-item pag-btns">
          <sl-icon-button
            name="${this.direction === 'ltr' ? 'first-page' : 'last-page'}"
            @click="${this._firstPage}"
            ?disabled="${this._pageBackDisabled(this.pageNumber)}"
          ></sl-icon-button>

          <sl-icon-button
            name="${this.direction === 'ltr' ? 'chevron-left' : 'chevron-right'}"
            @click="${this._pageLeft}"
            ?disabled="${this._pageBackDisabled(this.pageNumber)}"
          ></sl-icon-button>

          <sl-icon-button
            name="${this.direction === 'ltr' ? 'chevron-right' : 'chevron-left'}"
            @click="${this._pageRight}"
            ?disabled="${this._pageForwardDisabled(this.pageNumber, this.totalPages)}"
          ></sl-icon-button>

          <sl-icon-button
            name="${this.direction === 'ltr' ? 'last-page' : 'first-page'}"
            @click="${this._lastPage}"
            ?disabled="${this._pageForwardDisabled(this.pageNumber, this.totalPages)}"
          ></sl-icon-button>
        </span>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('language-changed', this.handleLanguageChange.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('language-changed', this.handleLanguageChange.bind(this));
  }

  handleLanguageChange(e) {
    this.language = e.detail.language;
    this.direction = this.language === 'ar' ? 'rtl' : 'ltr';
  }

  constructor() {
    super();
    this.initializeProperties();
  }

  initializeProperties() {
    this.pageSizeOptions = [5, 10, 25, 50];
    this.lowResolutionLayout = false;
    this.direction = 'ltr';
    if (!this.language) {
      this.language = window.localStorage.defaultLanguage || 'en';
      this.direction = this.language === 'ar' ? 'rtl' : 'ltr';
    }
  }

  _pageLeft() {
    if (this.pageNumber > 1) {
      this.pageNumber = this.pageNumber - 1;
    }
  }

  _pageRight() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber = this.pageNumber + 1;
    }
  }

  _firstPage() {
    if (this.pageNumber > 1) {
      this.pageNumber = 1;
    }
  }

  _lastPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber = this.totalPages;
    }
  }

  _computeTotalPages(pageSize, totalResults) {
    let result = 1;
    if (pageSize < totalResults) {
      result = Math.ceil(totalResults / pageSize);
    }
    this.totalPages = result;
  }

  _computeVisibleRange(pageNumber, pageSize, totalResults, totalPages) {
    totalResults = Number(totalResults);
    pageSize = Number(pageSize);
    pageNumber = Number(pageNumber);
    totalPages = Number(totalPages);

    let start = 1;
    let end = totalResults;
    if (!totalResults) {
      start = 0;
    } else {
      if (pageNumber !== 1) {
        start = (pageNumber - 1) * pageSize + 1;
      }
      if (pageNumber !== totalPages) {
        end = start + pageSize - 1;
      }
    }

    if (JSON.stringify(this.visibleRange) !== JSON.stringify([start, end])) {
      this.visibleRange = [start, end];
      this._dispatchEvent('visible-range-changed', this.visibleRange);
    }
  }

  _pageBackDisabled(pageNumber) {
    return pageNumber === 1;
  }

  _pageForwardDisabled(pageNumber, totalPages) {
    return pageNumber === totalPages;
  }

  _hideFooter(totalResults) {
    this.doNotShow = totalResults <= 5;
  }

  _dispatchEvent(eventName, eventValue) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: {value: eventValue},
        bubbles: true,
        composed: true
      })
    );
  }

  _selectRowsPerPage(e: any) {
    if (!e.target.value) {
      return;
    }
    this.pageSize = Number(e.target.value);
    this._closeRowsPerPageDropdown();
  }

  _openRowsPerPageDropdown() {
    (this.shadowRoot!.querySelector('.rows-per-page-dropdown iron-dropdown') as any)?.open();
  }

  _closeRowsPerPageDropdown() {
    (this.shadowRoot!.querySelector('.rows-per-page-dropdown iron-dropdown') as any)?.close();
  }
}
