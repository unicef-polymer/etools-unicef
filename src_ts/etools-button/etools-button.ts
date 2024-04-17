import {css, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import SlButton from '@shoelace-style/shoelace/dist/components/button/button.component.js';
import {buttonsStyles} from './styles/button-styles';

@customElement('etools-button')
export class EtoolsButton extends SlButton {
  @state() originalSize;

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

    return html`
      <etools-media-query
        query="(max-width: 767px)"
        @query-matches-changed="${(e: CustomEvent) => {
          if (e.detail.value) {
            this.originalSize = this.size;
            this.size = 'small';
          } else if (this.originalSize) {
            this.size = this.originalSize;
          }
        }}"
      ></etools-media-query>
    ${super.render()}`;
  }
}
