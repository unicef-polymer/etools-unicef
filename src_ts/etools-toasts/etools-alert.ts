import {html, css} from 'lit';
import {SlAlert} from '@shoelace-style/shoelace';

class EtoolsAlert extends SlAlert {
  static styles = [
    SlAlert.styles,
    css`
      .close-btn {
        max-width: 20px;
        margin-left: 24px;
      }

      .alert__text {
        display: flex;
        align-items: center;
        padding: unset;
        min-height: 40px;
      }

      .alert {
        border-radius: 2px;
        margin: 12px;
        padding: 16px 24px;
        border: unset;
        min-width: 288px;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
        font-size: 14px;
        color: var(--etools-toasts-color, #fff);
      }
    `
  ];

  render() {
    return html`
      <div part="base" class="alert" role="alert">
        <div part="message" class="alert__text">
          <slot></slot>
        </div>
        ${this.closable
          ? html`<sl-button class="close-btn" variant="text" @click="${this.hide}">OK</sl-button>`
          : html``}
      </div>
    `;
  }
}

customElements.define('etools-alert', EtoolsAlert);
