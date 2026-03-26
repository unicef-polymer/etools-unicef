import { LitElement, html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import './etools-alert';
const MAX_TOAST_SHOWN = 3;
export const DefaultToastOptions = {
    duration: 30000,
    variant: 'primary'
};
export class EtoolsToasts extends LitElement {
    constructor() {
        super(...arguments);
        this.toastQueue = [];
    }
    render() {
        return repeat(this.toastQueue.slice(0, MAX_TOAST_SHOWN), (toastOptions) => toastOptions.text, (toastOptions, index) => {
            var _a;
            return html `<etools-alert
          open
          variant="${toastOptions.variant || DefaultToastOptions.variant}"
          duration="${toastOptions.duration || DefaultToastOptions.duration}"
          ?closable=${!toastOptions.hideCloseBtn}
          @sl-after-hide="${() => this.showNext(index)}"
        >
          ${toastOptions.icon ? html `<sl-icon slot="icon" name="${toastOptions.icon}"></sl-icon>` : html ``}
          <div .innerHTML=${(_a = toastOptions.text) === null || _a === void 0 ? void 0 : _a.replaceAll('\n', '<br/>')}></div>
        </etools-alert>`;
        });
    }
    connectedCallback() {
        super.connectedCallback();
        // @ts-ignore
        document.body.addEventListener('toast', (event) => this.queueToast(event));
        document.body.addEventListener('close-toasts', () => this.closeAllToasts());
    }
    closeAllToasts() {
        var _a;
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('etools-alert').forEach((t) => t.hide());
        this.toastQueue = [];
    }
    queueToast({ detail }) {
        const alreadyInQueue = this.toastQueue.some((toastDetails) => JSON.stringify(toastDetails) === JSON.stringify(detail));
        if (alreadyInQueue) {
            return;
        }
        this.toastQueue.push(detail);
        this.requestUpdate();
    }
    showNext(index) {
        var _a;
        if (index >= 0 && index < ((_a = this.toastQueue) === null || _a === void 0 ? void 0 : _a.length)) {
            this.toastQueue.splice(index, 1);
            this.requestUpdate();
        }
    }
    static get styles() {
        // language=css
        return [
            css `
        :host {
          position: fixed;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 10px;
          bottom: 0;
          inset-inline-start: 0;
          z-index: 999;
          --sl-panel-background-color: var(--etools-toasts-background-color, #323232);
        }
      `
        ];
    }
}
customElements.define('etools-toasts', EtoolsToasts);
