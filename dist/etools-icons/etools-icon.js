import { __decorate } from "tslib";
import { LitElement, html } from 'lit';
import { property, query, customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
/**
 * `etools-icon`
 *  Info icon element, on click will trigger tooltip open.
 *
 * @customElement
 * @demo demo/index.html
 */
let EtoolsIcon = class EtoolsIcon extends LitElement {
    constructor() {
        super(...arguments);
        this.label = '';
        this.library = 'default';
    }
    render() {
        // language=HTML
        return html `
      <style>
        :host {
          line-height: 1;
          display: inline-flex;
          vertical-align: middle;
          justify-content: center;
          align-items: center;
        }

        sl-icon {
          font-size: var(--etools-icon-font-size, var(--etools-font-size-24, 24px));
        }

        sl-icon::part(svg) {
          fill: var(--etools-icon-fill-color, currentColor);
          color: var(--etools-icon-fill-color, currentColor);
        }
      </style>
      <sl-icon
        part="base"
        name="${ifDefined(this.name)}"
        src="${ifDefined(this.src)}"
        label="${ifDefined(this.label)}"
        library="${this.library}"
      ></sl-icon>
    `;
    }
    async getUpdateComplete() {
        const result = await super.getUpdateComplete();
        await this.slIcon.updateComplete;
        return result;
    }
};
__decorate([
    property({ type: String })
], EtoolsIcon.prototype, "name", void 0);
__decorate([
    property({ type: String })
], EtoolsIcon.prototype, "src", void 0);
__decorate([
    property({ type: String })
], EtoolsIcon.prototype, "label", void 0);
__decorate([
    property({ type: String })
], EtoolsIcon.prototype, "library", void 0);
__decorate([
    query('sl-icon')
], EtoolsIcon.prototype, "slIcon", void 0);
EtoolsIcon = __decorate([
    customElement('etools-icon')
], EtoolsIcon);
export { EtoolsIcon };
