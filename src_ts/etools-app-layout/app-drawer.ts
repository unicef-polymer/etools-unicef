import {html, LitElement, PropertyValueMap, PropertyValues} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {fireEvent} from '@unicef-polymer/etools-utils/dist/fire-event.util';

@customElement('app-drawer')
export class AppDrawer extends LitElement {
  render() {
    return html`
      <style>
        :host {
          position: fixed;
          top: -120px;
          right: 0;
          bottom: -120px;
          left: 0;
          visibility: hidden;
          transition-property: visibility;
        }

        :host([opened]) {
          visibility: visible;
        }

        :host([persistent]) {
          width: var(--app-drawer-width, 256px);
        }

        :host([persistent][position='left']) {
          right: auto;
        }

        :host([persistent][position='right']) {
          left: auto;
        }

        #contentContainer {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;

          width: var(--app-drawer-width, 256px);
          padding: var(--app-drawer-content-padding, 120px 0);

          transition-property: -webkit-transform;
          transition-property: transform;
          -webkit-transform: translate3d(-100%, 0, 0);
          transform: translate3d(-100%, 0, 0);
          background-color: #fff;
        }

        #contentContainer[persistent] {
          width: 100%;
        }

        #contentContainer[position='right'] {
          right: 0;
          left: auto;

          -webkit-transform: translate3d(100%, 0, 0);
          transform: translate3d(100%, 0, 0);
        }

        #contentContainer[swipe-open]::after {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 100%;

          visibility: visible;

          width: 20px;

          content: '';
        }

        #contentContainer[swipe-open][position='right']::after {
          right: 100%;
          left: auto;
        }

        #contentContainer[opened] {
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
        }

        #scrim {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;

          transition-property: opacity;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);

          opacity: 0;
          background: var(--app-drawer-scrim-background, rgba(0, 0, 0, 0.5));
        }

        #scrim.visible {
          opacity: 1;
        }

        :host([no-transition]) #contentContainer {
          transition-property: none;
        }
      </style>

      <div id="scrim" @click="${this.close}"></div>

      <div id="contentContainer" ?opened="${this.opened}" .position="${this.position}" ?persistent="${this.persistent}">
        <slot></slot>
      </div>
    `;
  }

  @property({type: Boolean, reflect: true})
  opened = false;

  @property({type: Boolean, reflect: true})
  persistent = true;

  /**
   * The alignment of the drawer on the screen ('left', 'right', 'start' or
   * 'end'). 'start' computes to left and 'end' to right in LTR layout and
   * vice versa in RTL layout.
   */
  @property({type: String})
  align = 'left';

  /**
   * The computed, read-only position of the drawer on the screen ('left' or
   * 'right').
   */
  @property({type: String, reflect: true})
  position!: string;

  @property({type: Number})
  transitionDuration = 350;

  @query('#scrim') private scrim!: HTMLElement;

  @query('#contentContainer') private contentContainer!: HTMLElement;

  protected firstUpdated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);
    this._resetPosition();
    this.setContainerTransition();
  }

  updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('align')) {
      this._resetPosition();
    }
    if (changedProperties.has('opened') || changedProperties.has('persistent')) {
      if (this.opened !== changedProperties.get('opened')) {
        fireEvent(this, 'app-drawer-transitioned');
      }
      this._openedPersistentChanged(this.opened, this.persistent);
    }
  }

  async setContainerTransition() {
    this.updateComplete.then(() => {
      setTimeout(() => {
        if(this.contentContainer) {
          this.contentContainer.style.transitionDuration = this.transitionDuration + 'ms';
        }
      }, 1000);
    })
  }

  open() {
    this.opened = true;
  }

  close() {
    this.opened = false;
  }

  toggle() {
    this.opened = !this.opened;
  }

  _isRTL() {
    return window.getComputedStyle(this).direction === 'rtl';
  }

  _resetPosition() {
    switch (this.align) {
      case 'start':
        this.position = this._isRTL() ? 'right' : 'left';
        return;
      case 'end':
        this.position = this._isRTL() ? 'left' : 'right';
        return;
    }
    this.position = this.align;
  }

  _openedPersistentChanged(opened: boolean, persistent: boolean) {
    if (opened && !persistent) {
      if (!this.scrim.classList.contains('visible')) {
        this.scrim.classList.add('visible');
      }
    } else {
      this.scrim.classList.remove('visible');
    }
  }
}
