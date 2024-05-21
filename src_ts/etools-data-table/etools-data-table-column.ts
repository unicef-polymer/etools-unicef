import {LitElement, html} from 'lit';
import '../etools-icons/etools-icon';
import {customElement, property} from 'lit/decorators.js';

/**
 * `etools-data-table-column`
 * @LitElement
 * @customElement
 * @extends {LitElement}
 * @demo demo/index.html
 */
@customElement('etools-data-table-column')
export class EtoolsDataTableColumn extends LitElement {
  @property({type: Boolean, reflect: true, attribute: 'selected'})
  selected!: boolean;

  @property({type: String, reflect: true, attribute: 'direction'})
  direction!: string;

  @property({type: String, reflect: true, attribute: 'field'})
  field!: string;

  render() {
    // language=HTML
    return html`
      <style>
        :host {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: var(--list-header-column-height, 56px);
          font-size: var(--etools-font-size-12, 12px);
          color: var(--list-secondary-text-color, #757575);
          font-weight: bold;
          padding-right: 8px !important;
          padding-left: 8px !important;
        }

        :host([sortable]) {
          cursor: pointer;
        }

        #label {
          margin-inline-end: 5px;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        #icon-wrapper,
        etools-icon {
          --etools-icon-font-size: var(--etools-font-size-16, 16px);
        }

        #up,
        #down,
        #icon-wrapper {
          display: none;
        }

        :host(:not([selected]):hover[sortable]) #up {
          display: block;
        }

        :host([selected]) #label,
        :host(:not([selected]):hover[sortable]) #label {
          color: var(--list-text-color, rgba(0, 0, 0, 0.87));
        }

        :host([selected][direction='asc']) #up,
        :host([selected][direction='asc']) #icon-wrapper {
          display: block;
        }

        :host([selected][direction='desc']) #down,
        :host([selected][direction='desc']) #icon-wrapper {
          display: block;
        }

        :host(:not([selected])) etools-icon {
          color: var(--list-icon-hover-color, rgba(0, 0, 0, 0.38));
        }

        :host([selected]) etools-icon {
          color: var(--list-icon-color, rgba(0, 0, 0, 0.87));
        }
      </style>

      <span id="label" part="edt-list-column-label">
        <slot></slot>
      </span>
      <div id="icon-wrapper">
        <etools-icon id="up" name="arrow-upward"></etools-icon>
        <etools-icon id="down" name="arrow-downward"></etools-icon>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._sort);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._sort);
  }

  _sort() {
    if (!this.hasAttribute('sortable')) {
      return;
    }
    if (!this.selected || !this.direction) {
      this.selected = true;
      this.direction = 'asc';
    } else {
      this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    }
    this.dispatchEvent(
      new CustomEvent('sort-changed', {
        detail: {field: this.field, direction: this.direction},
        bubbles: true,
        composed: true
      })
    );
  }
}
