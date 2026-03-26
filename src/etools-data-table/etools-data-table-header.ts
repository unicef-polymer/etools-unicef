import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '../etools-icons/etools-icon';

/**
 * `etools-data-table-header`
 * @LitElement
 * @customElement
 * @extends {LitElement}
 * @demo demo/index.html
 */
@customElement('etools-data-table-header')
export class EtoolsDataTableHeader extends LitElement {
  private _sortOrder: any;

  @property({type: Object})
  _lastSelectedCol: any;

  @property({type: Boolean, reflect: true, attribute: 'no-title'})
  noTitle!: boolean;

  @property({type: Boolean, reflect: true, attribute: 'no-collapse'})
  noCollapse!: boolean;

  @property({type: String})
  label!: string;

  @property({type: Boolean, reflect: true, attribute: 'low-resolution-layout'})
  lowResolutionLayout!: boolean;

  @property({type: Boolean, reflect: true, attribute: 'medium-resolution-layout'})
  mediumResolutionLayout!: boolean;

  @property({type: Object})
  set sortOrder(sortOrder) {
    this._sortOrder = sortOrder;
    this._sortOrderChanged(this._sortOrder);
  }

  get sortOrder() {
    return this._sortOrder;
  }

  render() {
    // language=HTML
    return html`
      <style>
        :host {
          display: block;
          border-bottom: 1px solid var(--list-divider-color, #9d9d9d);
        }

        div#header-wrapper {
          height: var(--list-header-wrapper-height, 118px);
          padding-inline: var(--list-row-wrapper-padding-inline, 16px);
          background-color: var(--list-bg-color, #ffffff);
        }

        :host div#header-wrapper {
          padding-inline: var(--list-row-wrapper-padding-inline, 36px 16px);
          height: auto;
        }

        :host([no-collapse]) div#header-wrapper {
          padding-inline: var(--list-row-wrapper-padding-inline, 16px);
          height: auto;
        }

        #title {
          width: 100%;
          height: 64px;
          line-height: 64px;
          font-size: var(--etools-font-size-20, 20px);
          color: var(--list-text-color, #2b2b2b);
        }

        :host([no-title]) #title {
          display: none;
        }

        #columns {
          display: flex;
          flex-direction: row;
          justify-content: center;
          height: var(--list-header-wrapper-column-height, 56px);
        }

        :host([no-collapse]) #columns {
          margin-inline-start: 0;
          flex: 1;
        }

        /* Mobile view CSS */
        :host([medium-resolution-layout]) div#header-wrapper,
        :host([low-resolution-layout]) div#header-wrapper {
          height: auto;
        }

        :host([medium-resolution-layout]) #columns,
        :host([low-resolution-layout]) #columns {
          display: none;
        }
      </style>

      <div id="header-wrapper" part="edt-data-table-header">
        <div id="title" part="edt-header-title">
          <span>${this.label}</span>
        </div>

        <div id="columns" part="edt-header-columns">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static get is() {
    return 'etools-data-table-header';
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('sort-changed', this._handleSortChanged);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('sort-changed', this._handleSortChanged);
  }

  _handleSortChanged(e) {
    const column = e.target;
    this._clearSelected(column);
    this.sortOrder = {...this.sortOrder, field: e.detail.field, direction: e.detail.direction};
  }

  _sortOrderChanged(sortOrder) {
    const column = this.querySelector('*[field="' + sortOrder.field + '"]') as any;
    this._clearSelected(column);
    column.selected = true;
    column.direction = sortOrder.direction;
  }

  _clearSelected(column) {
    if (this._lastSelectedCol && this._lastSelectedCol !== column) {
      this._lastSelectedCol = {...this._lastSelectedCol, selected: null};
    }
    this._lastSelectedCol = column;
  }
}
