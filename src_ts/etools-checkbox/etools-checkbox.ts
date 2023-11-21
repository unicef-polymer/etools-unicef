import {css} from 'lit';
import {customElement} from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import {SlCheckbox} from '@shoelace-style/shoelace';

@customElement('etools-checkbox')
export class EtoolsCheckbox extends SlCheckbox {
  static styles = [
    SlCheckbox.styles,
    css`
      :host {
        --sl-input-border-width: 2px;
        --sl-input-border-color: var(--secondary-text-color, rgba(0, 0, 0, 0.54));
      }
      :host[disabled]::part(base) {
        opacity: 0.65;
      }
      :host[disabled]::part(control--checked) {
        opacity: 0.65;
      }
    `
  ];

  render() {
    // language=HTML
    return super.render();
  }
}
