import {LitElement, html} from 'lit';
import {property, customElement, state} from 'lit/decorators.js';
import {getTranslation} from './utils/translate.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
/**
 * `etools-loading`
 *
 * Loading spinner.

 * You can use this loading element:
 * - with an overlay: the loading spinner, message and overlay will be shown over your content area;
 * - simple, no overlay: the loading spinner and the message will be displayed inline-block.
 *
 * ### Styling
 *
 * You can use defined variables for styling.
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--etools-loading-overlay-transparency` | Overlay transparency | `0.6`
 * `--etools-loading-msg-color` | Loading message color | `#333333`
 * `--etools-loading-spinner-size` | Spinner size (width & height) | `20px`
 * `--etools-loading-bg-color` | Background color | `#ffffff`
 * `--etools-loading-border-color` | Border color | `#dedede`
 * `--etools-loading-shadow-color` | Shadow color | `#333333`
 * `etools-loading::part(container)` | CSS Shadow Part applied to loading container | `{}`
 * `etools-loading::part(message)` | CSS Shadow Part applied to loading message | `{}`

 * To change spinner colors use sl-spinner styling variables([sl-spinner docs]
 * (https://shoelace.style/components/spinner))
 *
 * @extends HTMLElement
 * @polymer
 * @customElement
 * @demo demo/index.html
 */
@customElement('etools-loading')
export class EtoolsLoading extends LitElement {
  private _active: boolean;
  messages!: string[];

  @property({type: Boolean, reflect: true})
  set active(val) {
    this._active = val;
    this._loadingStateChanged(val);
    // reflect: true doesn't work in this case
    if (val) {
      this.setAttribute('active', '');
    } else {
      this.removeAttribute('active');
    }
  }

  get active() {
    return this._active;
  }

  @property({type: String, attribute: 'loading-text'})
  loadingText?: string;

  @state()
  defaultLoadingText!: string;

  @property({type: String, attribute: 'language'})
  language!: string;

  render() {
    return html`
      <style>
        :host {
          display: flex;
          flex-direction: row;
          justify-content: center;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-color: rgba(180, 180, 180, var(--etools-loading-overlay-transparency, 0.6));
          z-index: 50;
          text-align: center;
        }

        :host([no-overlay]) {
          background-color: transparent;
          display: inline-block !important;
          position: static;
          width: auto;
        }

        :host(:not([active])) {
          display: none !important;
        }

        .loading-message {
          margin-inline-start: 15px;
          color: var(--etools-loading-msg-color, #333333);
        }

        sl-spinner {
          font-size: var(--etools-loading-spinner-size, var(--etools-font-size-20, 20px));
          --track-width: var(--etools-loading-spinner-track-width, 3px);
          --indicator-color: var(--etools-loading-spinner-indicator-color, #659cf7);
          --track-color: var(--etools-loading-spinner-track-color, #dfdfdf);
        }

        :host(:not([no-overlay])) .loading-content {
          background: var(--etools-loading-bg-color, #ffffff);
          border: 1px solid var(--etools-loading-border-color, #dedede);
          box-shadow: 0px 2px 5px -2px var(--etools-loading-shadow-color, #333333);
          padding: 10px;
          border-radius: 4px;
        }

        :host([absolute]) {
          position: fixed;
          z-index: 1000000;
        }
        .flex-h {
          display: flex;
          flex-direction: row;
        }
        .self-center {
          align-self: center;
        }
      </style>
      <div class="flex-h self-center">
        <div class="flex-h self-center loading-content" part="container">
          <sl-spinner></sl-spinner>
          <span class="loading-message self-center" part="message">${this.loadingText || this.defaultLoadingText}</span>
        </div>
      </div>
    `;
  }

  constructor() {
    super();
    this._active = false;

    if (!this.language) {
      this.language = window.EtoolsLanguage || 'en';
    }

    this.defaultLoadingText = getTranslation(this.language, 'LOADING');
  }

  async connectedCallback() {
    super.connectedCallback();
    document.addEventListener('language-changed', this.handleLanguageChange.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('language-changed', this.handleLanguageChange.bind(this));
  }

  handleLanguageChange(e) {
    this.language = e.detail.language;
    this.defaultLoadingText = getTranslation(this.language, 'LOADING');
  }

  _loadingStateChanged(active) {
    if (active) {
      this.style.display = 'flex';
    } else {
      this.style.display = 'none';
    }
  }
}
