import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '../etools-icon-button/etools-icon-button';
import '../etools-collapse/etools-collapse';
import {elevationStyles} from './styles/elevation-styles';

/**
 * `etools-content-panel`
 * A simple panel with header to display a collapsible content.
 *
 * ### Styling
 *
 * You can use defined variables and css shadow parts to change panel style.
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--ecp-header-height` | Header height | `48px`
 * `--ecp-header-bg` | Header background color | `#0099ff`
 * `--ecp-header-color` | Header color | `#ffffff`
 * `etools-content-panel::part(ecp-header)` | CSS Shadow Part applied to header | `{}`
 * `etools-content-panel::part(ecp-toggle-btn)` | CSS Shadow Part applied to expand content button | `{}`
 * `etools-content-panel::part(ecp-header-title)` | CSS Shadow Part applied to the header title | `{}`
 * `etools-content-panel::part(ecp-header-btns-wrapper)`
 *        | CSS Shadow Part appplied to panel header right btns container
 *        | `{}`
 * `etools-content-panel::part(ecp-content)` | CSS Shadow Part applied to content | `{}`
 * `--ecp-content-bg-color` | Content Header color | `#ffffff`
 * `etools-content-panel::part(ecp-header):disabled` | CSS Shadow Part applied in disabled state | `{}`
 * `--ecp-content-padding` | CSS Shadow Part applied to content |  `8px 24px 16px 24px`
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
@customElement('etools-content-panel')
export class EtoolsContentPanel extends LitElement {
  @property({type: String, reflect: true, attribute: 'panel-title'})
  panelTitle!: string;

  @property({type: Number})
  elevation!: number;

  @property({type: Boolean, reflect: true, attribute: 'open'})
  open!: boolean;

  @property({type: Boolean, reflect: true, attribute: 'no-header'})
  noHeader!: boolean;

  @property({type: Boolean, reflect: true, attribute: 'type'})
  disabled!: boolean;

  @property({type: Boolean, reflect: true, attribute: 'show-expand-btn'})
  showExpandBtn!: boolean;

  static get styles() {
    return [elevationStyles];
  }

  render() {
    // language=HTML
    return html`
      <style>
        :host {
          display: block;
          position: var(--ecp-host-position, relative);
        }

        *[hidden] {
          display: none !important;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          box-sizing: border-box;
          background-color: var(--ecp-header-bg, #0099ff);
          min-height: var(--ecp-header-height, 48px);
          height: auto;
          padding: 4px 16px;
        }

        :host(:not([show-expand-btn])) .panel-header {
          padding: 4px 0px;
          padding-inline: 24px 16px;
        }

        h2.title,
        .toggle-btn,
        .panel-btns-wrapper ::slotted(*) {
          color: var(--ecp-header-color, #ffffff);
        }

        .toggle-btn,
        .panel-btns-wrapper ::slotted(*) {
          opacity: 0.8;
        }

        .panel-btns-wrapper ::slotted(*) {
          display: flex;
          align-items: center;
        }

        .panel-btns-wrapper {
          margin-inline-start: auto;
        }

        h2.title {
          margin: auto;
          font-size: var(--etools-font-size-20, 20px);
          font-weight: bold;
          flex: 1;
        }

        h2.title span {
          white-space: var(--ecp-title-white-space, nowrap);
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
        }

        .content-wrapper {
          background-color: var(--ecp-content-bg-color, #ffffff);
          box-sizing: border-box;
          padding: var(--ecp-content-padding, 8px 24px 16px 24px);
        }

        :host([disabled]) .panel-header,
        :host([disabled]) ::slotted(*) {
          opacity: 0.5;
        }

        :host([disabled]) ::slotted(*) {
        }

        .panel-header .flex-h {
          display: flex;
          max-width: 100%;
          flex-wrap: wrap;
          align-items: center;
        }

        :host-context([dir='rtl']) [name='chevron-right'] {
          transform: rotate(180deg);
        }

        etools-icon-button {
          --etools-icon-font-size: var(--etools-font-size-24, 24px);
        }
        @media (max-width: 576px) {
          .panel-header {
            padding: 4px;
          }
        }
      </style>

      <div class="elevation" elevation="${this.elevation}">
        <div class="panel-header" part="ecp-header" ?hidden="${this.noHeader}">
          <div class="flex-h">
            <etools-icon-button
              label="toggle content panel"
              class="toggle-btn"
              part="ecp-toggle-btn"
              @click="${this._toggle}"
              name="${this._getExpandBtnIcon(this.open)}"
              ?hidden="${!this.showExpandBtn}"
              ?disabled="${this.disabled}"
            ></etools-icon-button>
            <h2 class="title" part="ecp-header-title" title="${this.panelTitle}">
              <span>${this.panelTitle}</span>
            </h2>
            <slot name="after-title" part="ecp-header-after-title"></slot>
          </div>

          <div class="panel-btns-wrapper" part="ecp-header-btns-wrapper">
            <slot name="panel-btns"></slot>
          </div>
        </div>
        <etools-collapse ?opened="${this.open}">
          <div class="content-wrapper" part="ecp-content">
            <slot></slot>
          </div>
        </etools-collapse>
      </div>
    `;
  }

  constructor() {
    super();
    this.panelTitle = 'Panel Title';
    this.elevation = 1;
    this.open = true;
    this.noHeader = false;
    this.disabled = false;
    this.showExpandBtn = false;
  }

  _toggle() {
    this.open = !this.open;
  }

  _getExpandBtnIcon(open) {
    return open ? 'expand-more' : 'chevron-right';
  }
}
