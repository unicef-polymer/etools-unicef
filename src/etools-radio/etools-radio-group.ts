import {css} from 'lit';
import {customElement} from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';
import SlRadioGroup from '@shoelace-style/shoelace/dist/components/radio-group/radio-group.component.js';

@customElement('etools-radio-group')
export class EtoolsRadioGroup extends SlRadioGroup {
  static styles = [
    SlRadioGroup.styles,
    css`
      :host {
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 10px;
      }
      ::slotted(sl-radio) {
        display: inline-block;
        margin-inline-end: 15px;
        --sl-input-border-width: 2px;
        --sl-input-border-color: var(--secondary-text-color, rgba(0, 0, 0, 0.54));
      }
      ::slotted(sl-radio)[disabled]::part(base) {
        opacity: 0.65;
      }
      ::slotted(sl-radio)[disabled]::part(control--checked) {
        opacity: 0.65;
      }
    `
  ];

  render() {
    // language=HTML
    return super.render();
  }
}
