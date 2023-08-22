import {LitElement, html, PropertyValues} from 'lit';
import {customElement, property} from 'lit/decorators.js';

/**
 * `etools-collapse`
 * A collapsable element

 * @customElement
 * @polymer
 * @demo demo/index.html
 */
@customElement('etools-collapse')
export class EtoolsCollapse extends LitElement {
  /**
   * Set opened to true to show the collapse element and to false to hide it.
   */
  @property({type: Boolean, reflect: true, attribute: 'opened'})
  opened: boolean = false;

  /**
   * Set noAnimation to true to disable animations.
   */
  @property({type: Boolean, reflect: true, attribute: 'no-animation'})
  noAnimation: boolean = false;

  private _desiredSize: string = '';
  private _timeout?: any;

  render() {
    // language=HTML
    return html`
      <style>
        :host {
          transition: max-height 0s;
        }

        :host(:not([no-animation])) {
          display: block;
          overflow: hidden;
        }

        :host(:not([opened])) {
          max-height: 0;
        }
      </style>

      <slot></slot>
    `;
  }

  constructor() {
    super();
    this.addEventListener('transitionend', (event) => {
      if (event.propertyName === 'max-height') {
        this.style.transitionDuration = '0s';
      }
    });
  }

  firstUpdated() {
    this.setDesiredSize(this.opened ? 'auto' : '0px');
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('opened') && changedProperties.get('opened') !== undefined) {
      this.setDesiredSize(this.opened ? 'auto' : '0px');
      this.prepareBeforeToggle();
    }
  }

  prepareBeforeToggle() {
    if (this._desiredSize === 'auto') {
      this.style.transitionDuration = '0s';
      this.setDesiredSize(this._calcSize());
    }

    if (this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = undefined;
    }

    this._timeout = setTimeout(() => {
      this.style.transitionDuration = 'var(--etools-collapse-transition-duration, var(--sl-transition-medium, .3s))';
      this.setDesiredSize(this.opened ? this._calcSize() : '0px');
    }, 60);
  }

  setDesiredSize(value) {
    this._desiredSize = value;
    this.style.maxHeight = this._desiredSize;
  }

  getSlotContent() {
    const contents = this.shadowRoot!.querySelector('slot')!.assignedElements({flatten: true});

    if (contents.length != 1) {
      console.warn('[etools-collpase] You must have exactly one html node inside etools-collapse.', this);
    }

    return contents[0];
  }

  _calcSize() {
    const height = this.getSlotContent().getBoundingClientRect().height;
    return height > 0 ? height + 'px' : '';
  }
}
