import { __decorate } from "tslib";
import { css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';
import SlRadioGroup from '@shoelace-style/shoelace/dist/components/radio-group/radio-group.component.js';
let EtoolsRadioGroup = class EtoolsRadioGroup extends SlRadioGroup {
    render() {
        // language=HTML
        return super.render();
    }
};
EtoolsRadioGroup.styles = [
    SlRadioGroup.styles,
    css `
      :host {
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 10px;
      }
      ::slotted(sl-radio) {
        display: inline-block;
        margin-inline-end: 15px;
        --sl-input-border-width: 2px;
        --sl-input-border-color: var(--secondary-text-color, rgba(0, 0, 0, 0.54));
      }
      ::slotted(sl-radio)[disabled]::part(base) {
        opacity: 0.65;
      }
      ::slotted(sl-radio)[disabled]::part(control--checked) {
        opacity: 0.65;
      }
    `
];
EtoolsRadioGroup = __decorate([
    customElement('etools-radio-group')
], EtoolsRadioGroup);
export { EtoolsRadioGroup };
