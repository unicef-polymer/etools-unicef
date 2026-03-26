import { __decorate } from "tslib";
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * `etools-media-query` component detects when a media query is true or false
 *
 * @customElement
 */
let EtoolsMediaQuery = class EtoolsMediaQuery extends LitElement {
    render() {
        return html `
      <style>
        :host {
          display: none;
        }
      </style>
    `;
    }
    constructor() {
        super();
        this.query = '(max-width: 767px)';
        this.queryMatches = false;
        this.handleResize = this.handleResize.bind(this);
    }
    firstUpdated() {
        // check when initialized
        this.handleResize();
    }
    connectedCallback() {
        super.connectedCallback();
        // if Visual Viewport is supported use it, else use window.resize
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', this.handleResize);
        }
        else {
            window.addEventListener('resize', this.handleResize);
        }
    }
    disconnectedCallback() {
        if (window.visualViewport) {
            window.visualViewport.removeEventListener('resize', this.handleResize);
        }
        else {
            window.removeEventListener('resize', this.handleResize);
        }
        super.disconnectedCallback();
    }
    handleResize() {
        if (!this.query) {
            return;
        }
        const queryMatches = window.matchMedia(this.query).matches;
        // If match state is different from previous one then trigger query-matches-changed event
        if (queryMatches !== this.queryMatches) {
            this.dispatchEvent(new CustomEvent('query-matches-changed', {
                detail: {
                    value: queryMatches
                },
                composed: true,
                bubbles: true
            }));
            this.queryMatches = queryMatches;
        }
    }
};
__decorate([
    property({ type: String })
], EtoolsMediaQuery.prototype, "query", void 0);
__decorate([
    property({ type: Boolean })
], EtoolsMediaQuery.prototype, "queryMatches", void 0);
EtoolsMediaQuery = __decorate([
    customElement('etools-media-query')
], EtoolsMediaQuery);
export { EtoolsMediaQuery };
