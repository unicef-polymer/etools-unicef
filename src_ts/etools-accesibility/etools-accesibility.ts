import {html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import '../etools-media-query/etools-media-query';
import '../etools-icon-button/etools-icon-button';
import '@shoelace-style/shoelace/dist/components/popup/popup.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import {getTranslation} from './utils/translate';

@customElement('etools-accesibility')
export class EtoolsAccesibility extends LitElement {
  @property({type: String, attribute: 'language'})
  language: string = window.EtoolsLanguage || 'en';

  @state()
  counter = 1;

  @state()
  optionsActiveStatus = {
    contrastMonochrome: false,
    contrastHard: false,
    contrastSoft: false,
    cursorBigWhite: false,
    cursorBigBlack: false,
    zoomScreen: false,
    readableText: false
  };

  @state()
  opened = false;

  protected render() {
    return html`
      <style>
        .toolbox {
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
          background: #fff;
          border-radius: 3px;
          flex-wrap: wrap;
          display: flex;
          overflow: hidden;
          width: 270px;
        }

        .toolbox-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 10px;
          max-width: 33.33%;
          width: 100%;
          box-sizing: border-box;
          border-bottom: 1px solid #dee2e6;
          border-right: 1px solid #dee2e6;
          height: 90px;
        }

        .toolbox-item:nth-child(3n) {
          border-right: 0;
        }

        .toolbox-item:nth-last-child(-n + 3) {
          border-bottom: 0;
        }

        .toolbox-item[active] {
          color: #0099ff;
        }

        .toolbox-item:active {
          background: var(--secondary-background-color);
        }

        .toolbox-item label,
        .toolbox-item etools-icon {
          pointer-events: none;
          user-select: none;
        }

        .toolbox-item etools-icon {
          --etools-icon-font-size: 32px;
          margin-bottom: 3px;
        }

        .toolbox-item:not([active]) etools-icon {
          color: var(--sl-input-icon-color);
        }

        .toolbox-item label {
          text-align: center;
          font-size: 12px;
        }

        etools-icon-button {
          color: #fff;
        }

        etools-icon.cursor-white {
          border-radius: 50%;
          color: #fff;
        }

        .toolbox-item:not([active]) etools-icon.cursor-white {
          background: var(--sl-input-icon-color);
          color: #fff;
        }

        .toolbox-item[active] etools-icon.cursor-white {
          background: #0099ff;
        }
      </style>
      <etools-icon-button
        id="toggleAccesibility"
        name="accessibility"
        label="${getTranslation(this.language, 'ACCESIBILITY_TOOLBAR')}"
        title="${getTranslation(this.language, 'ACCESIBILITY_TOOLBAR')}"
        @click="${() => this.toggle()}"
      ></etools-icon-button>
      <sl-popup anchor="toggleAccesibility" placement="bottom-end" ?active=${this.opened}>
        <div class="toolbox">
          <div
            class="toolbox-item"
            ?active=${this.optionsActiveStatus.contrastMonochrome}
            @click="${() =>
              this.toggleOption('contrastMonochrome', ['contrastMonochrome', 'contrastHard', 'contrastSoft'])}"
          >
            <etools-icon name="palette" label="${getTranslation(this.language, 'MONOCHROME_FILTER')}"></etools-icon>
            <label>${getTranslation(this.language, 'MONOCHROME_FILTER')}</label>
          </div>
          <div
            class="toolbox-item"
            ?active=${this.optionsActiveStatus.contrastHard}
            @click="${() => this.toggleOption('contrastHard', ['contrastMonochrome', 'contrastHard', 'contrastSoft'])}"
          >
            <etools-icon name="wb-auto" label="${getTranslation(this.language, 'REVERSE_CONTRAS')}"></etools-icon>
            <label>${getTranslation(this.language, 'REVERSE_CONTRAS')}</label>
          </div>
          <div
            class="toolbox-item"
            ?active=${this.optionsActiveStatus.contrastSoft}
            @click="${() => this.toggleOption('contrastSoft', ['contrastMonochrome', 'contrastHard', 'contrastSoft'])}"
          >
            <etools-icon name="tonality" label="${getTranslation(this.language, 'STRONG_CONTRAST')}"></etools-icon>
            <label>${getTranslation(this.language, 'STRONG_CONTRAST')}</label>
          </div>

          <div
            class="toolbox-item"
            ?active=${this.optionsActiveStatus.cursorBigWhite}
            @click="${() => this.toggleOption('cursorBigWhite', ['cursorBigWhite', 'cursorBigBlack'])}"
          >
            <etools-icon
              class=" cursor-white"
              name="mouse"
              label="${getTranslation(this.language, 'BIG_CURSOR_WHITE')}"
            ></etools-icon>
            <label>${getTranslation(this.language, 'BIG_CURSOR_WHITE')}</label>
          </div>
          <div
            class="toolbox-item"
            ?active=${this.optionsActiveStatus.cursorBigBlack}
            @click="${() => this.toggleOption('cursorBigBlack', ['cursorBigWhite', 'cursorBigBlack'])}"
          >
            <etools-icon name="mouse" label="${getTranslation(this.language, 'BIG_CURSOR_BLACK')}"></etools-icon>
            <label>${getTranslation(this.language, 'BIG_CURSOR_BLACK')}</label>
          </div>
          <div
            class="toolbox-item"
            ?active=${this.optionsActiveStatus.zoomScreen}
            @click="${() => this.toggleOption('zoomScreen')}"
          >
            <etools-icon name="zoom-in" label="${getTranslation(this.language, 'ZOOM_SCREEN')}"></etools-icon>
            <label>${getTranslation(this.language, 'ZOOM_SCREEN')}</label>
          </div>

          <div class="toolbox-item" @click="${() => this.fontsChange('fontsUp')}">
            <etools-icon name="exposure-plus-1" label="${getTranslation(this.language, 'INCREASE_TEXT')}"></etools-icon>
            <label>${getTranslation(this.language, 'INCREASE_TEXT')}</label>
          </div>
          <div class="toolbox-item" @click="${() => this.fontsChange('fontsDown')}">
            <etools-icon name="exposure-neg-1" label="${getTranslation(this.language, 'DECREASE_TEXT')}"></etools-icon>
            <label>${getTranslation(this.language, 'DECREASE_TEXT')}</label>
          </div>
          <div
            class="toolbox-item"
            ?active=${this.optionsActiveStatus.readableText}
            @click="${() => this.toggleOption('readableText')}"
          >
            <etools-icon name="text-format" label="${getTranslation(this.language, 'READABLE_TEXT')}"></etools-icon>
            <label>${getTranslation(this.language, 'READABLE_TEXT')}</label>
          </div>
        </div>
      </sl-popup>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('mousedown', this.handleDocumentMouseDown.bind(this));
    document.addEventListener('language-changed', this.handleLanguageChange.bind(this));
    this.injectStyles();
  }

  toggle() {
    this.opened = !this.opened;
  }

  handleLanguageChange(e: any) {
    this.language = e.detail.language;
  }

  /**
   * Document Mouse Down handler function. On document mouse down it is hiding the dropdown popup
   * @param event MouseEvent
   */
  private handleDocumentMouseDown(event: MouseEvent) {
    // Close when clicking outside of the select
    const path = event.composedPath();
    if (this && !path.includes(this)) {
      this.opened = false;
    }
  }

  /**
   * Define the following 2 classes in app-theme.css
   *  html.readableText { }
   *  html.contrastSoft { }
   */
  /* eslint-disable max-len */
  injectStyles() {
    const styleTag = document.createElement('style');
    styleTag.textContent = `
        html.contrastMonochrome {
            -webkit-filter: grayscale(1) !important;
            filter: grayscale(1) !important;
        }

        html.zoomScreen {
          zoom: 1.4;
        }

        html.contrastHard {
            background-color: #fff !important;
            color: #000 !important;
            -webkit-filter: invert(100%) !important;
            filter: invert(100%) !important;
        }

        html.cursorBigWhite {
            cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAzCAYAAAAZ+mH/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDA1OTE2NURCQzkyMTFFN0IwODJCQjE5QzZFMDg2QjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDA1OTE2NUVCQzkyMTFFN0IwODJCQjE5QzZFMDg2QjYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEMDU5MTY1QkJDOTIxMUU3QjA4MkJCMTlDNkUwODZCNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEMDU5MTY1Q0JDOTIxMUU3QjA4MkJCMTlDNkUwODZCNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Phwph8YAAAWrSURBVHjavFldSGxVFF7zq+N4/RtTuY1SU2SWoqUW/iAZhL1UFD4kVBD02Jv45os/+Psi+CCU9hRYkGVF1kOUmEYZpmGJEpqJ4Ev5e/XqzDi7tU5rz92zx7nqzBwXfBxn73P2/va311pnnS0AwDuI3xG34H9zIGwMC8NUsyIOEU8iphAexDnCzn2mE5AkrPx3PRPJZiJSEavZiqgkyJ5BfInIQQSZiOmKXDRBDSuSc1OKxFplJWISkasQMU2RiIF9Ph+kpqbKn88ivmAiIYTTLEVUfzAIeL1ecLlcsulpxKdmKxIxYFpaGrS0tEBOTg44nU7VWT83W5G3EIJQWVkpyAYGBkRBQYFAZYTsQ/yM8JJgxDfZqoRJVFRUiGAwaBDp6uoS+fn5AhVRiSwoRNxK5CSsSAQJv98vpPX19Ym8vLwbUSQmiZtU5L4kVEVSUlJMU+RSElKR3Nxc4XA4TFHkSiTIent7hcfjMUWRK5OQihCRZCtyLRJmKXJtElIRzKxJUyQuElKR7OxsPXzjUiRuEmSdnZ0GkUQVSYhEshRJmIRUJCsrK25FkkKCrKenR2RmZsalSNJIkHV0dIiMjAxht9uvpUhSScSrSNJJXKLIgxoRm2kkyPr7+w0imiI/MZEUScSeSCESCoXg9PQULJboqKO21tZW2Nvbg7GxMeOKVZtaxb+E+DdhEoeHh1BbWwv7+/sxidhsNkB14fz8XO2SVfxrRORKJI6OjoyJsPgFzAPhdrfbbUyws7MTzxqkIq9YL7uzu7sbsAqHkpISWFpaitqOsrIyQOeLV0z60hu779PoWDA8PAy7u7uGnFjmwcTERLgfX+XQ1tYGk5OThvToi9T8B+JDzgdB/lYJ8ceT/DvIvwOI7SgSVqs1rAARoG1gh4KFhQWYnZ2F+vr6yOWgUouLi5IE2TziH46GAE94rhChq5/7QhHbQU5EGBwchKGhITg4ODD2XNrW1haMj49HECDHbGxsNJ5jowOXF3i1enq2cJuNv+RSOVfcyxNVVVWivb39ooI2jObmZrG9vR2RD3C7RGFhoXrfPqIC8RjiIcRtRB5/Snr42IGQhUgnRuWIV4kNJhaYn583YlpVAO2uZLyysgINDQ1QXFwcDkvyDdqy6elpw1k5EZ0hvmf5z1j6gOIPQcVn7ilB3xZadiN8gHhZ/qb+8vLyqOw4MzNj9KNPyee+46On23x1MzknL8jBZ2P2CCWOj4/VpLKMGER8hjhA0HlBOfXTyskJa2pqIhLTxsYGrK6uhtMI4hfEX+wLAc05Q3JhsfIEhdm7iK/5YUqvi6qD0oSqFRUVQVNTE2AVLpvIB15n59MdVFcb3tQafuVzK/LyUkQx4mHEUwhapsBVi9LSUrG8vBy1LT6fz+hXxitmQrd4O2x6QaMr8RvibY5xku2YQV76J+ITkpG2Ym1tDaampiAQCIQfPjk5gerqasPB2fycngXvvy1WjfmGUnQ8TsoiHuVrgRJSHn4F79L9FMK0at0wmYn09HRVjTlW4gEKR3bMiO0hZnWIR/jVesRee8bwK2FFA95hvEihSMdKlC3JH1TfoCw7Nzcnmyg61tmnbJpTGkYSzSC+ReyxR9/lmwJKLAO3+fk+2irb+vo6jI6OQl1dHZydncHIyAhsbm4a+UJNxIhMmWeUA1yhErGyRJmcwTJYNpd22O5kkuTtP8icQNkV07yRbb1e74VZlsk/weO7lS0Jm1Op+dJ48hStELWyai5Gs5zA5XIZH8daRKggZd/jbfFofhEhl13LYvq/GiyKYum8oh9jTCoU//kK8TyHuJffHVFK2Hmv9bAR2hUUvwjxvyfe53yiP0eVz0cc5tM8oUV5Xwh9XHuMyWKZ4MFoFX8zGZkUyME/5lrijqx7tEiTL6+I+a57yCVrAQcP+BznFLJvlC1Vixa/gqDy/ggr8p8AAwB38ep+f+/fmwAAAABJRU5ErkJggg==), auto !important;
        }
        html.cursorBigBlack {
            cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAzCAYAAAAZ+mH/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODM1RTg1NDJCQzhFMTFFNzhFNDdGMzY5NjY0M0JBMTQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODM1RTg1NDNCQzhFMTFFNzhFNDdGMzY5NjY0M0JBMTQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4MzVFODU0MEJDOEUxMUU3OEU0N0YzNjk2NjQzQkExNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4MzVFODU0MUJDOEUxMUU3OEU0N0YzNjk2NjQzQkExNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PisYaokAAAcASURBVHjavFhrTFRH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), auto !important;
        }
    `;
    document.head.appendChild(styleTag);
  }
  /* eslint-enable max-len */

  setCSSVariables(vars: any) {
    return Object.entries(vars).forEach((v: any) => {
      return (document.querySelector(':root') as any).style.setProperty(v[0], v[1]);
    });
  }

  // FONTS CHANGE
  fontsChange(type: string) {
    if (type === 'fontsUp') {
      if (this.counter >= 1.6) {
        return;
      }

      this.counter = Number((this.counter + 0.1).toFixed(2));
    }
    if (type === 'fontsDown') {
      if (this.counter <= 1) {
        return;
      }
      this.counter = Number((this.counter - 0.1).toFixed(2));
    }

    this.setCSSVariables({
      '--etools-font-size-zoom': this.counter
    });
  }

  toggleOption(type: string, disableOthers?: string[]) {
    if (document.documentElement.classList.contains(type)) {
      this.optionsActiveStatus[type] = false;
      document.documentElement.classList.remove(type);
    } else {
      if (disableOthers) {
        for (let i = 0; i < disableOthers.length; i++) {
          this.optionsActiveStatus[disableOthers[i]] = false;
          document.documentElement.classList.remove(disableOthers[i]);
        }
      }
      this.optionsActiveStatus[type] = true;
      document.documentElement.classList.add(type);
    }

    this.requestUpdate();
  }

  reset() {
    window.location.reload();
  }
}
