import {LitElement, html, css} from 'lit';
import {property} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import '../etools-icons/etools-icon';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';

/**
 * `info-icon-tooltip`
 *  Info icon element, on click will trigger tooltip open.
 *
 * @customElement
 * @demo demo/index.html
 */
export class InfoIconTooltip extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          --iit-max-width: 50vw;
        }
        #info-icon {
          color: var(--primary-color);
          cursor: pointer;
        }

        #etools-iit-content {
          padding: 20px;
          position: relative;
        }

        .tooltip-info {
          padding: 6px;
          margin: 10px 0px;
          box-sizing: border-box;
          font-size: var(--iit-font-size, var(--etools-font-size-14, 14px));
          color: var(--primary-text-color);
          line-height: 22px;
          font-weight: bold;
          user-select: text;
        }

        .tooltip-info.gray-border {
          border: solid 1px var(--secondary-background-color);
        }
        etools-icon {
          margin: var(--iit-margin, 0);
          --etools-icon-font-size: var(--iit-icon-size, var(--etools-font-size-24, 24px));
        }

        sl-tooltip {
          --sl-tooltip-background-color: white;
          --max-width: var(--iit-max-width);
        }

        sl-tooltip::part(body) {
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
            0 3px 1px -2px rgba(0, 0, 0, 0.2);
          pointer-events: all;
        }
        etools-icon:focus-visible {
          outline: 0;
          background-color: rgba(170, 165, 165, 0.5);
          box-shadow: 0 0 0 10px rgb(170 165 165 / 30%) !important;
          border-radius: 50%;
        }
      `
    ];
  }

  render() {
    // language=HTML
    return html`
      <sl-tooltip id="tooltip" trigger="manual" .position="${this.position}">
        <div slot="content">
          <div id="etools-iit-content" part="etools-iit-content">
            <div class="tooltip-info gray-border">
              ${this.tooltipText ? unsafeHTML(this.tooltipText) : this.tooltipHtml}
            </div>
          </div>
        </div>

        <etools-icon
          tabindex="0"
          id="info-icon"
          part="etools-iit-icon"
          name="info-outline"
          @click="${this.showTooltip}"
        ></etools-icon>
      </sl-tooltip>
    `;
  }

  @property({type: String})
  tooltipText!: string;
  @property({type: Object})
  tooltipHtml!: any;
  @property({type: String})
  position!: string;
  @property({type: String})
  offset!: string | number;
  @property({type: String})
  language!: string;

  private _tooltipHandler!: any;

  constructor() {
    super();

    this.tooltipText = '';
    this.position = 'right';
    this.offset = 14;
    this.language = window.EtoolsLanguage || 'en';
    this._tooltipHandler = this.hideTooltip.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => this.callClickOnEnterPushListener(this.shadowRoot!.querySelector('#info-icon')), 200);
    document.addEventListener('language-changed', this.handleLanguageChange.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('language-changed', this.handleLanguageChange.bind(this));
  }

  handleLanguageChange(e) {
    this.language = e.detail.language;
  }

  showTooltip(e) {
    e.stopImmediatePropagation();
    const tooltip = this.shadowRoot!.querySelector('#tooltip')! as any;
    tooltip.show();

    document.addEventListener('click', this._tooltipHandler, true);
  }

  /**
   * stopImmediatePropagation stops dropdown openning also when this component is inside it.
   * Conditional stopping of propagation is for timing issues, when this method executes before showTooltip.
   */
  hideTooltip(e) {
    const path = e.composedPath() || [];
    if (path.length && path[0].id !== 'close-link' && this._isInPath(path, 'tagName', 'A')) {
      e.stopImmediatePropagation();
      return;
    }

    const paperTooltip = this.shadowRoot!.querySelector('#tooltip')! as any;
    if (paperTooltip.open) {
      document.removeEventListener('click', this._tooltipHandler);
      paperTooltip.hide();
      if (!this.clickedOnOtherInfoIcon(path)) {
        e.stopImmediatePropagation();
      }
    }
  }

  /**
   * Avoid 2 clicks needed to open a second info tooltip
   */
  clickedOnOtherInfoIcon(path) {
    if (path[0] && path[0].id == 'info-icon' && path[0].getRootNode().host != this) {
      return true;
    }
    return false;
  }

  close(e) {
    e.preventDefault();
    this.hideTooltip(e);
  }

  _isInPath(path, propertyName, elementName) {
    path = path || [];
    for (let i = 0; i < path.length; i++) {
      if (path[i][propertyName] === elementName) {
        return true;
      }
    }
    return false;
  }

  callClickOnEnterPushListener(htmlElement) {
    if (htmlElement && htmlElement.addEventListener) {
      htmlElement.addEventListener('keyup', function (event) {
        if (event.key === 'Enter' && !event.ctrlKey) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          htmlElement.click();
        }
      });
    }
  }
}
