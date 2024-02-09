import {LitElement, html} from 'lit';
import {property, query, customElement} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import SlIcon from '@shoelace-style/shoelace/dist/components/icon/icon.component.js';

/**
 * `etools-icon`
 *  Info icon element, on click will trigger tooltip open.
 *
 * @customElement
 * @demo demo/index.html
 */
@customElement('etools-icon')
export class EtoolsIcon extends LitElement {
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

        sl-icon {
          font-size: var(--etools-icon-font-size, var(--etools-font-size-24, 24px));
        }

        sl-icon::part(svg) {
          fill: var(--etools-icon-fill-color, currentColor);
          color: var(--etools-icon-fill-color, currentColor);
        }
      </style>
      <sl-icon
        part="base"
        name="${ifDefined(this.name)}"
        src="${ifDefined(this.src)}"
        label="${ifDefined(this.label)}"
        library="${this.library}"
      ></sl-icon>
    `;
  }

  @property({type: String})
  name: string | undefined;

  @property({type: String})
  src: string | undefined;

  @property({type: String})
  label = '';

  @property({type: String})
  library = 'default';

  @query('sl-icon')
  slIcon!: SlIcon;

  override async getUpdateComplete() {
    const result = await super.getUpdateComplete();
    await this.slIcon.updateComplete;
    return result;
  }
}
