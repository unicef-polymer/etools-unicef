import { __decorate } from "tslib";
import { css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
let EtoolsCheckbox = class EtoolsCheckbox extends SlCheckbox {
    render() {
        // language=HTML
        return super.render();
    }
};
EtoolsCheckbox.styles = [
    SlCheckbox.styles,
    css `
      :host {
        --sl-input-border-width: 2px;
        --sl-input-border-color: var(--secondary-text-color, rgba(0, 0, 0, 0.54));
      }
      :host([disabled])::part(base) {
        opacity: 0.65;
      }
      :host([disabled])::part(control--checked) {
        opacity: 0.65;
      }
    `
];
EtoolsCheckbox = __decorate([
    customElement('etools-checkbox')
], EtoolsCheckbox);
export { EtoolsCheckbox };
