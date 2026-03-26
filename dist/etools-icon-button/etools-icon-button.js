import { __decorate } from "tslib";
import { LitElement, html } from 'lit';
import { property, query, customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
/**
 * `etools-icon`
 *  Info icon element, on click will trigger tooltip open.
 *
 * @customElement
 * @demo demo/index.html
 */
let EtoolsIconButton = class EtoolsIconButton extends LitElement {
    constructor() {
        super(...arguments);
        this.label = '';
        this.library = 'default';
        this.disabled = false;
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

        sl-icon-button {
          font-size: var(--etools-icon-font-size, var(--etools-font-size-24, 24px));
          color: inherit;
        }

        sl-icon-button::part(base) {
          color: inherit;
        }
      </style>
      <sl-icon-button
        part="base"
        name="${ifDefined(this.name)}"
        src="${ifDefined(this.src)}"
        label="${ifDefined(this.label)}"
        href=${ifDefined(this.href)}
        target=${ifDefined(this.target)}
        download=${ifDefined(this.download)}
        disabled=${ifDefined(this.disabled ? this.disabled : undefined)}
        library="${this.library}"
      ></sl-icon-button>
    `;
    }
    async getUpdateComplete() {
        const result = await super.getUpdateComplete();
        await this.slIconButton.updateComplete;
        return result;
    }
};
__decorate([
    property({ type: String })
], EtoolsIconButton.prototype, "name", void 0);
__decorate([
    property({ type: String })
], EtoolsIconButton.prototype, "src", void 0);
__decorate([
    property({ type: String })
], EtoolsIconButton.prototype, "label", void 0);
__decorate([
    property({ type: String })
], EtoolsIconButton.prototype, "library", void 0);
__decorate([
    property({ type: String })
], EtoolsIconButton.prototype, "href", void 0);
__decorate([
    property({ type: String })
], EtoolsIconButton.prototype, "target", void 0);
__decorate([
    property({ type: String })
], EtoolsIconButton.prototype, "download", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], EtoolsIconButton.prototype, "disabled", void 0);
__decorate([
    query('sl-icon-button')
], EtoolsIconButton.prototype, "slIconButton", void 0);
EtoolsIconButton = __decorate([
    customElement('etools-icon-button')
], EtoolsIconButton);
export { EtoolsIconButton };
