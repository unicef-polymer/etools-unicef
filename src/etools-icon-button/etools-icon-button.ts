import {LitElement, html} from 'lit';
import {property, query, customElement} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import SlIconButton from '@shoelace-style/shoelace/dist/components/icon-button/icon-button.component.js';

/**
 * `etools-icon`
 *  Info icon element, on click will trigger tooltip open.
 *
 * @customElement
 * @demo demo/index.html
 */
@customElement('etools-icon-button')
export class EtoolsIconButton extends LitElement {
  @property({type: String})
  name: string | undefined;

  @property({type: String})
  src: string | undefined;

  @property({type: String})
  label = '';

  @property({type: String})
  library = 'default';

  @property({type: String})
  href: string | undefined;

  @property({type: String})
  target: '_blank' | '_parent' | '_self' | '_top' | undefined;

  @property({type: String})
  download: string | undefined;

  @property({type: Boolean, reflect: true})
  disabled = false;

  @query('sl-icon-button')
  slIconButton!: SlIconButton;

  render() {
    // language=HTML
    return html`
      <style>
        :host {
          line-height: 1;
          display: inline-flex;
          vertical-align: middle;
          justify-content: center;
          align-items: center;
        }

        sl-icon-button {
          font-size: var(--etools-icon-font-size, var(--etools-font-size-24, 24px));
          color: inherit;
        }

        sl-icon-button::part(base) {
          color: inherit;
        }
      </style>
      <sl-icon-button
        part="base"
        name="${ifDefined(this.name)}"
        src="${ifDefined(this.src)}"
        label="${ifDefined(this.label)}"
        href=${ifDefined(this.href)}
        target=${ifDefined(this.target)}
        download=${ifDefined(this.download)}
        disabled=${ifDefined(this.disabled ? this.disabled : undefined)}
        library="${this.library}"
      ></sl-icon-button>
    `;
  }

  override async getUpdateComplete() {
    const result = await super.getUpdateComplete();
    await this.slIconButton.updateComplete;
    return result;
  }
}
