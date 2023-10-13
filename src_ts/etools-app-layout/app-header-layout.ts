import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('app-header-layout')
export class AppHeaderLayout extends LitElement {
  protected render() {
    return html` <style>
        :host {
          display: block;
          /**
         * Force app-header-layout to have its own stacking context so that its parent can
         * control the stacking of it relative to other elements (e.g. app-drawer-layout).
         * This could be done using \`isolation: isolate\`, but that's not well supported
         * across browsers.
         */
          position: relative;
          z-index: 0;
        }

        #wrapper ::slotted([slot='header']) {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1;
        }

        #wrapper.initializing ::slotted([slot='header']) {
          position: relative;
        }

        :host([has-scrolling-region]) {
          height: 100%;
        }

        :host([has-scrolling-region]) #wrapper ::slotted([slot='header']) {
          position: absolute;
        }

        :host([has-scrolling-region]) #wrapper.initializing ::slotted([slot='header']) {
          position: relative;
        }

        :host([has-scrolling-region]) #wrapper #contentContainer {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        :host([has-scrolling-region]) #wrapper.initializing #contentContainer {
          position: relative;
        }

        :host([fullbleed]) {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }

        :host([fullbleed]) #wrapper,
        :host([fullbleed]) #wrapper #contentContainer {
          display: flex;
          flex: 1;
          flex-basis: 0.000000001px;
          flex-direction: column;
        }

        #contentContainer {
          /* Create a stacking context here so that all children appear below the header. */
          position: relative;
          z-index: 0;
        }

        @media print {
          :host([has-scrolling-region]) #wrapper #contentContainer {
            overflow-y: visible;
          }
        }
      </style>

      <div id="wrapper" class="initializing">
        <slot id="headerSlot" name="header"></slot>

        <div id="contentContainer">
          <slot></slot>
        </div>
      </div>`;
  }

  @property({type: Boolean, attribute: 'has-scrolling-region', reflect: true})
  hasScrollingRegion = false;
}
