import {html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('app-toolbar')
export class AppToolbar extends LitElement {
  protected render() {
    return html`
      <style>
        :host {
          display: flex;
          flex-direction: row;
          align-items: center;
          position: relative;
          height: 64px;
          padding: 0 16px;
          pointer-events: none;
          font-size: var(--app-toolbar-font-size, var(--etools-font-size-20, 20px));
        }

        :host ::slotted(*) {
          pointer-events: auto;
        }

        :host ::slotted([main-title]),
        :host ::slotted([condensed-title]) {
          pointer-events: none;
          -ms-flex: 1 1 0.000000001px;
          -webkit-flex: 1;
          flex: 1;
          -webkit-flex-basis: 0.000000001px;
          flex-basis: 0.000000001px;
        }

        :host ::slotted([bottom-item]) {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
        }

        :host ::slotted([top-item]) {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
        }

        :host ::slotted([spacer]) {
          margin-left: 64px;
        }
      </style>
      <slot></slot>
    `;
  }
}
