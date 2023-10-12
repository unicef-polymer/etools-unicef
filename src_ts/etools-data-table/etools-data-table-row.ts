import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '../etools-collapse/etools-collapse';

/**
 * `etools-data-table-row`
 * @LitElement
 * @customElement
 * @extends {LitElement}
 * @demo demo/index.html
 */
@customElement('etools-data-table-row')
export class EtoolsDataTableRow extends LitElement {
  @property({type: Boolean})
  detailsOpened!: boolean;

  @property({type: Boolean, reflect: true, attribute: 'no-collapse'})
  noCollapse!: boolean;

  @property({type: Boolean, reflect: true, attribute: 'no-animation'})
  noAnimation!: boolean;

  @property({type: Boolean, reflect: true, attribute: 'low-resolution-layout'})
  lowResolutionLayout!: boolean;

  @property({type: Boolean, reflect: true, attribute: 'medium-resolution-layout'})
  mediumResolutionLayout!: boolean;

  render() {
    // language=HTML
    return html`
      <style>
        *[hidden] {
          display: none !important;
        }

        :host {
          display: block;
        }

        :host([no-collapse]) div#wrapper:hover {
          background: var(--list-bg-color, #ffffff);
        }

        :host([secondary-bg-on-hover]) div#wrapper:hover {
          background-color: var(--list-second-bg-color, #eeeeee);
        }

        div#wrapper:hover {
          background-color: var(--list-second-bg-color, #eeeeee);
        }

        div#wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding-inline: var(--list-row-wrapper-padding-inline, 0 24px);
          font-size: 13px;
          color: var(--list-text-color, #2b2b2b);
          background-color: var(--list-bg-color, #ffffff);
        }

        :host div#wrapper ::slotted([slot='row-data']) {
          text-overflow: ellipsis;
          width: calc(100% - 96px);
        }

        :host([no-collapse]) div#wrapper ::slotted([slot='row-data']) {
          width: 100%;
        }

        :host([no-collapse]) div#wrapper ::slotted([slot='row-data']) {
          width: 100%;
        }

        div#wrapper,
        #collapse-wrapper {
          border-bottom: 1px solid var(--list-divider-color, #9d9d9d);
        }

        #iconWrapper {
          min-height: 48px;
          line-height: 48px;
          padding: 0 16px;
          cursor: pointer;
          width: 24px;
        }

        etools-icon:focus {
          outline: 0;
          background-color: rgba(170, 165, 165, 0.3);
          border-radius: 50%;
        }

        etools-icon {
          color: var(--list-icon-color, #2b2b2b);
        }

        etools-icon:hover {
          color: var(--list-icon-hover-color, rgba(0, 0, 0, 0.87));
        }

        :host-context([dir='rtl']) #more {
          transform: rotate(180deg);
        }

        #collapse-wrapper {
          padding: 16px 0;
          padding-inline: 58px 24px;
          background-color: var(--list-second-bg-color, #eeeeee);
        }

        :host([no-collapse]) #details,
        :host([no-collapse]) #iconWrapper {
          display: none;
        }

        :host([no-collapse]) #wrapper {
          padding-inline: var(--list-row-wrapper-padding-inline, 24px);
          background-color: var(--list-row-no-collapse-bg-color, var(--list-bg-color, #ffffff));
        }

        /* Mobile view CSS */
        :host([medium-resolution-layout]) div#wrapper,
        :host([low-resolution-layout]) div#wrapper {
          padding-inline-end: 0;
        }

        :host([medium-resolution-layout]) #iconWrapper,
        :host([low-resolution-layout]) #iconWrapper {
          min-height: 0;
          line-height: normal;
          padding: 8px;
        }

        :host([medium-resolution-layout]) #collapse-wrapper,
        :host([low-resolution-layout]) #collapse-wrapper {
          padding: 0;
          padding-inline-start: 40px;
        }
      </style>

      <div id="wrapper" part="edt-list-row-wrapper">
        <div id="iconWrapper" part="edt-icon-wrapper">
          <etools-icon
            id="more"
            name="chevron-right"
            ?hidden="${this.detailsOpened}"
            @keyup="${this._callClickOnSpace}"
            @click="${this._toggleRowDetails}"
            tabindex="0"
          >
          </etools-icon>
          <etools-icon
            id="less"
            name="expand-more"
            ?hidden="${!this.detailsOpened}"
            @keyup="${this._callClickOnSpace}"
            @click="${this._toggleRowDetails}"
            tabindex="0"
          >
          </etools-icon>
        </div>
        <slot name="row-data"></slot>
      </div>

      <etools-collapse id="details" ?opened="${this.detailsOpened}">
        <div id="collapse-wrapper" part="edt-list-row-collapse-wrapper">
          <slot name="row-data-details"></slot>
        </div>
      </etools-collapse>
    `;
  }

  static get properties() {
    return {
      detailsOpened: {
        type: Boolean
      },
      noCollapse: {
        type: Boolean,
        reflect: true,
        attribute: 'no-collapse'
      },
      noAnimation: {
        type: Boolean,
        attribute: 'no-animation'
      },
      lowResolutionLayout: {
        type: Boolean,
        reflect: true,
        attribute: 'low-resolution-layout'
      },
      mediumResolutionLayout: {
        type: Boolean,
        reflect: true,
        attribute: 'medium-resolution-layout'
      }
    };
  }

  constructor() {
    super();
    this.detailsOpened = false;
    this.noAnimation = false;
  }

  _toggleRowDetails() {
    // if (!this.detailsOpened) {
    //   (this.shadowRoot!.querySelector('#details') as HTMLElement)!.style.maxHeight =
    //     this.shadowRoot!.querySelector('#collapse-wrapper')!.getBoundingClientRect().height + 'px';
    // } else {
    //   (this.shadowRoot!.querySelector('#details') as HTMLElement)!.style.maxHeight = '0px';
    // }
    this.detailsOpened = !this.detailsOpened;
    this.dispatchEvent(
      new CustomEvent('opened-changed', {
        detail: {opened: this.detailsOpened},
        bubbles: true,
        composed: true
      })
    );
  }

  _callClickOnSpace(event) {
    if (event.key === ' ' && !event.ctrlKey) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      event.target.click();
      event.target.focus();
    }
  }
}
