import {css} from 'lit';
import {customElement} from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/button-group/button-group.js';
import SlButtonGroup from '@shoelace-style/shoelace/dist/components/button-group/button-group.component.js';
import {buttonsGroupStyles} from './styles/button-group-styles';

@customElement('etools-button-group')
export class EtoolsButtonGroup extends SlButtonGroup {
  static styles = [
    SlButtonGroup.styles,
    css`
      ${buttonsGroupStyles}
    `
  ];

  render() {
    // language=HTML
    return super.render();
  }
}
