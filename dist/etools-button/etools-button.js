import { __decorate } from "tslib";
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import SlButton from '@shoelace-style/shoelace/dist/components/button/button.component.js';
import { buttonsStyles } from './styles/button-styles';
let EtoolsButton = class EtoolsButton extends SlButton {
    static get styles() {
        return [
            SlButton.styles,
            css `
        ${buttonsStyles}
      `
        ];
    }
    render() {
        // language=HTML
        return html `<etools-media-query
        query="(max-width: 767px)"
        @query-matches-changed="${(e) => {
            if (e.detail.value) {
                this.originalSize = this.size;
                this.size = 'small';
            }
            else if (this.originalSize) {
                this.size = this.originalSize;
            }
        }}"
      ></etools-media-query>
      ${super.render()}`;
    }
};
__decorate([
    state()
], EtoolsButton.prototype, "originalSize", void 0);
EtoolsButton = __decorate([
    customElement('etools-button')
], EtoolsButton);
export { EtoolsButton };
