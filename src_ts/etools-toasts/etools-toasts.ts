import {LitElement, html, CSSResultArray, css} from 'lit';
import {repeat} from 'lit/directives/repeat.js';

import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import SlAlert from '@shoelace-style/shoelace/dist/components/alert/alert.js';

const MAX_TOAST_SHOWN = 3;

export type ToastOptions = {
  text: string;
  hideCloseBtn: boolean;
  duration?: number;
  variant?: string;
  icon?: string;
};

export const DefaultToastOptions = {
  duration: 30000,
  variant: 'primary'
};

export class EtoolsToasts extends LitElement {
  private toastQueue: ToastOptions[] = [];

  protected render() {
    return repeat(
      this.toastQueue.slice(0, MAX_TOAST_SHOWN),
      (toastOptions: ToastOptions) => toastOptions.text,
      (toastOptions: ToastOptions, index: number) =>
        html`<sl-alert
          open
          variant="${toastOptions.variant || DefaultToastOptions.variant}"
          duration="${toastOptions.duration || DefaultToastOptions.duration}"
          ?closable=${!toastOptions.hideCloseBtn}
          @sl-after-hide="${() => this.showNext(index)}"
        >
          ${toastOptions.icon ? html`<sl-icon slot="icon" name="${toastOptions.icon}"></sl-icon>` : html``}
          <div .innerHTML=${toastOptions.text?.replaceAll('\n', '<br/>')}></div>
        </sl-alert>`
    );
  }

  public connectedCallback() {
    super.connectedCallback();
    // @ts-ignore
    document.body.addEventListener('toast', (event: CustomEvent<ToastOptions>) => this.queueToast(event));
    document.body.addEventListener('close-toasts', () => this.closeAllToasts());
  }

  closeAllToasts() {
    this.shadowRoot?.querySelectorAll<SlAlert>('sl-alert').forEach((t: SlAlert) => t.hide());
    this.toastQueue = [];
  }

  public queueToast({detail}: CustomEvent<ToastOptions>) {
    const alreadyInQueue: boolean = this.toastQueue.some(
      (toastDetails) => JSON.stringify(toastDetails) === JSON.stringify(detail)
    );
    if (alreadyInQueue) {
      return;
    }

    this.toastQueue.push(detail);
    this.requestUpdate();
  }

  public showNext(index: any) {
    if (index >= 0 && index < this.toastQueue?.length) {
      this.toastQueue.splice(index, 1);
      this.requestUpdate();
    }
  }

  static get styles(): CSSResultArray {
    // language=css
    return [
      css`
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

        sl-alert::part(close-button) {
          color: var(--etools-toasts-color, #fff);
        }

        sl-alert::part(message) {
          padding: var(--sl-spacing-small);
        }

        sl-alert::part(base) {
          border-width: 0px;
          border-top-width: calc(var(--sl-panel-border-width) * 3);
          min-width: 288px;
          box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
          margin-top: 6px;
          font-size: 14px;
          color: var(--etools-toasts-color, #fff);
        }
      `
    ];
  }
}

customElements.define('etools-toasts', EtoolsToasts);
