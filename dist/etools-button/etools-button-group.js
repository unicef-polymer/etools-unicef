import { __decorate } from "tslib";
import { css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/button-group/button-group.js';
import SlButtonGroup from '@shoelace-style/shoelace/dist/components/button-group/button-group.component.js';
import { buttonsGroupStyles } from './styles/button-group-styles';
let EtoolsButtonGroup = class EtoolsButtonGroup extends SlButtonGroup {
    render() {
        // language=HTML
        return super.render();
    }
};
EtoolsButtonGroup.styles = [
    SlButtonGroup.styles,
    css `
      ${buttonsGroupStyles}
    `
];
EtoolsButtonGroup = __decorate([
    customElement('etools-button-group')
], EtoolsButtonGroup);
export { EtoolsButtonGroup };
