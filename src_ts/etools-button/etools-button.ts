import {css} from 'lit';
import {customElement} from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import SlButton from '@shoelace-style/shoelace/dist/components/button/button.component.js';
import {buttonsStyles} from './styles/button-styles';

@customElement('etools-button')
export class EtoolsButton extends SlButton {
  static get styles() {
    return [
      SlButton.styles,
      css`
        ${buttonsStyles}
      `
    ];
  }

  render() {
    // language=HTML
    return super.render();
  }
}
