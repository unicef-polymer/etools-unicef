import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import '@shoelace-style/shoelace/dist/components/radio/radio.js';

// TODO remove this
@customElement('etools-radio')
export class EtoolsRadio extends LitElement {
  @property({type: String})
  value?: string;

  @property({type: String})
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({type: String})
  form: string | undefined;

  @property({type: Boolean, reflect: true})
  disabled?: boolean;

  render() {
    // language=HTML
    return html`
      <style>
        sl-radio {
          display: inline-block;
          margin-inline-end: 15px;
        }
      </style>
      <sl-radio
        part="sl-radio"
        value="${ifDefined(this.value)}"
        size="${ifDefined(this.size)}"
        ?disabled=${ifDefined(this.disabled)}
      >
        <slot></slot>
      </sl-radio>
    `;
  }
  protected createRenderRoot() {
    // @ts-ignore
    return this.renderOptions!.host!.parentNode.querySelector('sl-radio-group') as any;
  }
}
