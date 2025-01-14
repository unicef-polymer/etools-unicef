import {html, LitElement, PropertyValues} from 'lit';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/tag/tag.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import '@shoelace-style/shoelace/dist/components/popup/popup.js';
import '../etools-button/etools-button';
import '../etools-icons/etools-icon';
import styles from './styles/sl-autocomplete-styles';
import etoolsStyles from './styles/sl-autocomplete-etools-styles';

import SlMenuItem from '@shoelace-style/shoelace/dist/components/menu-item/menu-item.component.js';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import {SlInputEvent} from '@shoelace-style/shoelace/dist/events/sl-input.js';
import SlMenu from '@shoelace-style/shoelace/dist/components/menu/menu.component.js';
import {styleMap} from 'lit/directives/style-map.js';

import {classMap} from 'lit/directives/class-map.js';
import {property, query, state} from 'lit/decorators.js';
import {getTranslation} from './utils/translate';
import {callClickOnEnterPushListener} from '@unicef-polymer/etools-utils/dist/accessibility.util';
import {ifDefined} from 'lit/directives/if-defined.js';

/**
 * @summary Advanced dropdown capable of searching and filtering options,
 * get data dynamically, scroll by key typing etc.
 *
 * @since unreleased
 * @status unknown
 *
 * @dependency sl-menu
 * @dependency sl-menu-item
 * @dependency sl-input
 * @dependency sl-tag
 * @dependency sl-button
 * @dependency sl-spinner
 *
 *
 */
export class SlAutocomplete extends LitElement {
  static styles = [styles, etoolsStyles];

  @query('sl-input') searchInput!: SlInput;

  @state() private hasFocus = false;
  @state() private loading = false;
  @state() private _open = false;
  @state() private search = '';
  @state() private totalOptionsToShow = 0;
  @state() private language = '';

  private observerInfiniteScroll: IntersectionObserver | undefined;
  private page = 0;
  private prevPage = 0;
  private prevSearch = '';
  private searchHasChanged = false;
  private pageHasChanged = false;
  private noMoreItemsToLoad = false;
  private collectingKeyboardKeysTimeout: any = undefined;
  private collectedKeyboardKeys = '';

  @property({type: String, attribute: 'label'})
  label: string | undefined;

  @property({type: Boolean, attribute: 'no-label-float'})
  noLabelFloat: boolean | undefined;

  @property({type: String, attribute: 'placeholder'})
  placeholder = '—';

  @property({type: String, attribute: 'search-placeholder'})
  searchPlaceholder = '';

  @property({type: String, attribute: 'option-value'})
  optionValue = 'value';

  @property({type: String, attribute: 'option-label'})
  optionLabel = 'label';

  @property({type: Boolean, attribute: 'required', reflect: true})
  required: boolean | undefined;

  @property({type: String, attribute: 'error-message'})
  errorMessage = '';

  @property({type: Boolean, attribute: 'disabled', reflect: true})
  disabled = false;

  @property({type: Boolean, attribute: 'readonly', reflect: true})
  readonly = false;

  @property({type: Boolean, attribute: 'invalid', reflect: true})
  invalid = false;

  @property({type: String, attribute: 'no-options-available-text'})
  noOptionsAvailableText = '';

  @property({type: String, attribute: 'no-results-text'})
  noResultsText = '';

  @property({type: String, attribute: 'loading-text'})
  loadingText = '';

  @property({type: Number})
  options: any[] = [];

  @property({type: Object})
  loadDataMethod!: (search: string, page: number, shownOptionsLimit: number) => void;

  @property({type: Boolean, reflect: true, attribute: 'multiple'})
  multiple = false;

  @property({type: Boolean, attribute: 'max-options-available'})
  maxOptionsVisible = 0;

  @property({type: Boolean, reflect: true, attribute: 'pill'})
  pill = false;

  @property({type: String, reflect: true, attribute: 'size'})
  size = 'medium';

  @property({type: Boolean, reflect: true, attribute: 'filled'})
  filled = false;

  @property({type: String, reflect: true, attribute: 'placement'})
  placement = 'bottom-start';

  @property({type: String, reflect: true, attribute: 'help-text'})
  helpText: any;

  @property({type: Boolean, reflect: true, attribute: 'clearable'})
  clearable = true;

  @property({type: Boolean, reflect: true, attribute: 'hoist'})
  hoist = false;

  @property({type: Boolean, reflect: true, attribute: 'hide-search'})
  hideSearch = false;

  @property({type: Boolean, reflect: true, attribute: 'preserve-search-on-close'})
  preserveSearchOnClose = false;

  @property({type: Boolean, reflect: true, attribute: 'hide-close'})
  hideClose = false;

  @property({type: Boolean, reflect: true, attribute: 'enable-none-option'})
  enableNoneOption = false;

  @property({type: String, attribute: 'none-option-label'})
  noneOptionLabel = '';

  @property({type: Number, attribute: 'shown-options-limit'})
  shownOptionsLimit = 30;

  @property({type: Boolean, reflect: true, attribute: 'capitalize'})
  capitalize = false;

  @property({type: Boolean, reflect: true, attribute: 'transparent'})
  transparent = false;

  @property({type: String, attribute: 'min-width'})
  minWidth = '30px';

  @property({type: String, attribute: 'max-width'})
  maxWidth = '';

  @property({type: String, attribute: 'max-height'})
  minHeight = '0px';

  @property({type: String, attribute: 'max-height'})
  maxHeight = '';

  @property({type: String, attribute: 'sync-width'})
  syncWidth = true;

  /**
   * The container relative to which the autosize clipping and shifting of the dropdown occurs.
   * Expected value is either a DOM element reference or an array of DOM element references.
   *
   * EX: document
   *   .querySelector('app-shell')
   *   ?.shadowRoot?.querySelector('app-drawer-layout')
   *   ?.querySelector('app-header-layout')
   *   ?.querySelector('main')
   *
   * SL-POUP uses float-ui(https://floating-ui.com/) behind the scences in case we don't provide
   * a value for this field it tries to find the clipping and boundary ancetors by it's self.
   * This feature does not work when we are using the hoisted dropdown (position: fixed) and
   * in this case we have to provide a boundary manually.
   */
  @property({type: Object, attribute: 'boundary'})
  boundary: Element | Element[] | HTMLElement | HTMLElement[] | undefined = undefined;

  @property({type: Array})
  selectedItems: any[] = [];

  @property({type: Array})
  selectedValues: string[] = [];

  @property({type: Boolean, attribute: 'auto-validate'})
  autoValidate: boolean | undefined;

  // Enable autoValidate only after first focus on input
  @property({type: Boolean})
  _autoValidate = false;

  @property({type: Boolean, attribute: 'expand-icon'})
  expandIcon = 'expand-more'; // arrow-drop-down

  @property({type: String})
  get selected() {
    return this.selectedValues?.[0] || null;
  }

  set selected(value: any | null) {
    this.selectedValues = value !== undefined && value !== null ? [value] : [];
    // sl-select is not fired when selected is set through binding
    // timeout to wait for selectedItems to be set
    if (this.options?.length) {
      setTimeout(() => this.setSelectedValues());
    }
  }

  @property({type: String})
  get selectedItem() {
    return this.selectedItems?.[0];
  }

  set selectedItem(value: any | null) {
    this.selectedItems = value ? [value] : [];
  }

  @property({type: Boolean})
  get open() {
    return this._open;
  }

  set open(value) {
    if (this.readonly || this.disabled) {
      return;
    }

    this._open = value;

    if (this._open) {
      this.addOpenListeners();
      this.enableInfiniteScroll();
      this.shadowRoot?.querySelector('sl-menu')!.addEventListener('keydown', this.handleKeyDown);
      const parentDialog = this.getParentDialog();
      if (parentDialog) {
        if (!this.boundary) {
          // console.warn('Missing boundary for dropdown in dialog', this);
          this.hoist = true;
        }
      }
      setTimeout(() => {
        if (!this.hideSearch) {
          this.searchInput.focus({preventScroll: true});
        } else {
          const selItem = this.shadowRoot!.querySelector<SlMenuItem>('sl-menu-item[checked]');
          if (selItem && !this.multiple) {
            selItem!.focus();
          } else {
            this.shadowRoot?.querySelector('sl-menu-item')?.focus({preventScroll: true});
          }
        }
      }, 0);
    }

    if (!this._open) {
      this.removeOpenListeners();
      this.disableInfiniteScroll();
      this.shadowRoot?.querySelector('sl-menu')!.removeEventListener('keydown', this.handleKeyDown);

      if (!this.hideSearch) {
        this.searchInput?.blur();
        if (!this.preserveSearchOnClose) {
          setTimeout(() => {
            this.search = '';
          });
        }
      }

      if (this._autoValidate) {
        this.validate();
      }
    }

    this.triggerPopupOpenEvent(this._open);
  }

  render() {
    const hasHelpText = !!this.helpText;
    const hasClearIcon =
      this.clearable && this.multiple && !this.disabled && !this.readonly && this.selectedValueCommaList.length > 0;
    const isPlaceholderVisible = this.placeholder && this.selectedValueCommaList.length === 0;
    // this.filteredOptions should be called only once otherwise it breaks pagination.
    const options = this.filteredOptions?.slice(0, this.totalOptionsToShow);

    return html`
      <style>
        :host {
          width: 100%;
        }
        sl-popup {
          ${this.maxWidth ? `--auto-size-available-width: ${this.maxWidth}` : ''}
          ${this.maxHeight ? `--auto-size-available-height: ${this.maxHeight}` : ''}
        }

        .dropdown {
          min-width: ${this.minWidth};
          min-height: ${this.minHeight};
        }
      </style>
      <div
        part="form-control"
        class=${classMap({
          'form-control': true,
          'form-control--small': this.size === 'small',
          'form-control--medium': this.size === 'medium',
          'form-control--large': this.size === 'large',
          'form-control--has-label': !this.noLabelFloat,
          'form-control--has-help-text': hasHelpText
        })}
      >
        <label
          id="label"
          part="form-control-label"
          class=${classMap({
            'form-control__label': true,
            'form-control__focused': this.open
          })}
          aria-hidden=${this.label ? 'false' : 'true'}
        >
          <slot name="label">${this.label || html`&nbsp;`}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-popup
            class=${classMap({
              select: true,
              'select--standard': true,
              'select--filled': this.filled,
              'select--pill': this.pill,
              'select--open': this.open,
              'select--disabled': this.disabled,
              'select--readonly': this.readonly,
              'select--invalid': this.invalid,
              'select--multiple': this.multiple,
              'select--focused': this.hasFocus,
              'select--placeholder-visible': isPlaceholderVisible,
              'select--top': this.placement === 'top',
              'select--bottom': this.placement === 'bottom',
              'select--small': this.size === 'small',
              'select--medium': this.size === 'medium',
              'select--large': this.size === 'large',
              'select--transparent': this.transparent
            })}
            placement=${this.placement}
            strategy=${this.hoist ? 'fixed' : 'absolute'}
            flip
            shift
            sync="${ifDefined(this.syncWidth ? 'width' : undefined)}"
            ?active="${this.open}"
            auto-size="vertical"
            auto-size-padding="10"
            .autoSizeBoundary="${this.boundary}"
            .shiftBoundary="${this.boundary}"
            .flipBoundary="${this.boundary}"
          >
            <div
              part="combobox"
              slot="anchor"
              tabindex="${this.readonly ? '-1' : '0'}"
              class="select__combobox"
              title="${this.selectedLabels.replaceAll(',', ' | ')}"
              @mousedown="${this.handleComboboxMouseDown}"
            >
              <slot part="prefix" name="prefix" class="select__prefix"></slot>

              <div
                part="display-input"
                class="select__display-input"
                ?is-placeholder=${!this.selectedLabels && this.placeholder}
                ?disabled=${this.disabled}
                ?invalid=${this.invalid}
                value=${this.selectedLabels}
                aria-label="${this.label || this.placeholder || this.id || this.selectedLabels || 'dropdown value'}"
                readonly
                aria-controls="listbox"
                aria-expanded=${this.open ? 'true' : 'false'}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled ? 'true' : 'false'}
                aria-readonly=${this.readonly ? 'true' : 'false'}
                aria-describedby="help-text"
                role="combobox"
                tabindex="-1"
              >
                <div class="outer-text">
                  <div class="inner-text">${this.selectedLabels || this.placeholder}</div>
                </div>
              </div>

              ${this.multiple && this.selectedItems?.length
                ? html`
                    <div part="tags" class="select__tags">
                      ${this.selectedItems?.map((option: any, index: number) => {
                        if (index < this.maxOptionsVisible || this.maxOptionsVisible <= 0) {
                          return html`
                            <sl-tag
                              part="tag"
                              exportparts="
                                base:tag__base,
                                content:tag__content,
                                remove-button:tag__remove-button,
                                remove-button__base:tag__remove-button__base
                              "
                              ?pill=${this.pill}
                              size=${this.size}
                              ?removable=${!this.disabled && !this.readonly}
                              @mousedown=${this.handleTagMouseDown}
                              @sl-remove=${() => this.handleTagRemove(option)}
                            >
                              ${option[this.optionLabel]}
                            </sl-tag>
                          `;
                        } else if (index === this.maxOptionsVisible) {
                          return html` <sl-tag size=${this.size}> +${this.selectedItems.length - index} </sl-tag> `;
                        } else {
                          return null;
                        }
                      })}
                    </div>
                  `
                : ''}

              <input
                class="select__value-input"
                type="text"
                ?disabled=${this.disabled}
                ?readonly=${this.readonly}
                ?invalid=${this.invalid}
                ?required=${this.required}
                .value=${this.selectedValueCommaList}
                tabindex="-1"
                aria-hidden="true"
              />

              ${hasClearIcon
                ? html`
                    <button
                      part="clear-button"
                      class="select__clear"
                      type="button"
                      aria-label="clear all"
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <etools-icon
                          name="cancel"
                          @mousedown=${this.handleClearMouseDown}
                          @click=${this.handleClearClick}
                        ></etools-icon>
                      </slot>
                    </button>
                  `
                : ''}

              <slot name="expand-icon" part="expand-icon" class="select__expand-icon">
                <etools-icon name="${this.expandIcon}"></etools-icon>
              </slot>
            </div>

            <div class="dropdown">
              <div part="search" id="search" class="search" ?hidden="${this.hideSearch}">
                <sl-input
                  role="presentation"
                  placeholder=${this.searchPlaceholder || getTranslation(this.language, 'SEARCH')}
                  .value="${this.search}"
                  @sl-input=${this.handleSearchChanged}
                  autocomplete="off"
                >
                  <etools-icon name="search" slot="prefix"></etools-icon>
                </sl-input>
              </div>
              <div
                role="list"
                aria-expanded=${this.open ? 'true' : 'false'}
                aria-multiselectable=${this.multiple ? 'true' : 'false'}
                aria-labelledby="label"
                part="list"
                class="list select__list"
              >
                <sl-menu>
                  ${
                    // We need to add it like this instead of hidden because sl-menu adds tabindex="0"
                    // dynamically to first sl-menu-item and this break tab navigation if hidden
                    this.enableNoneOption
                      ? html`<sl-menu-item
                          type="checkbox"
                          class="noneOption"
                          @click="${this.preventDeselectByClick}"
                          @keydown="${this.preventDeselectByEnter}"
                          ?checked=${!this.selectedItems?.length}
                          value=""
                          title="${this.noneOptionLabel || getTranslation(this.language, 'NONE')}"
                        >
                          ${this.noneOptionLabel || getTranslation(this.language, 'NONE')}
                        </sl-menu-item>`
                      : ''
                  }
                  ${options?.map(
                    (option: any) => html`
                      <sl-menu-item
                        type="checkbox"
                        ?checked=${this.isSelected(option)}
                        value="${option[this.optionValue]}"
                        tabindex="0"
                        @click="${this.preventDeselectByClick}"
                        @keydown="${this.preventDeselectByEnter}"
                        title="${option[this.optionLabel]}"
                      >
                        ${option[this.optionLabel]}
                      </sl-menu-item>
                    `
                  )}

                  <sl-menu-item
                    disabled
                    part="loading-text"
                    id="loading-text"
                    class="loading-text"
                    aria-hidden=${this.loading ? 'false' : 'true'}
                    ?hidden=${!this.loading}
                  >
                    <sl-spinner></sl-spinner>
                    <slot name="loading-text"> ${this.loadingText || getTranslation(this.language, 'LOADING')} </slot>
                  </sl-menu-item>
                  <sl-menu-item
                    disabled
                    part="no-options-available-text"
                    id="no-options-available-text"
                    class="no-options-available-text"
                    aria-hidden=${!this.noOptionsAvailable ? 'false' : 'true'}
                    ?hidden=${!this.noOptionsAvailable}
                  >
                    <slot name="no-options-available-text">
                      ${this.noOptionsAvailableText || getTranslation(this.language, 'NO_OPTIONS_AVAILABLE')}
                    </slot>
                  </sl-menu-item>
                  <sl-menu-item
                    disabled
                    part="no-results-text"
                    id="no-results-text"
                    class="no-results-text"
                    aria-hidden=${!this.showNoSearchResultsWarning(options.length) ? 'false' : 'true'}
                    ?hidden=${!this.showNoSearchResultsWarning(options.length)}
                  >
                    <slot name="no-results-text">
                      ${this.noResultsText || getTranslation(this.language, 'NO_RESULTS_FOUND_TRY_OTHER_KEYWORDS')}
                    </slot>
                  </sl-menu-item>
                  <div class="infinite-scroll-trigger" ?hidden=${this.loading || this.noMoreItemsToLoad}></div>
                </sl-menu>

                <div aria-hidden="true" style=${styleMap({width: `${this.clientWidth}px`})}></div>
              </div>
              <div class="footer" ?hidden="${!this.multiple || this.hideClose}">
                <etools-button id="closeBtn" size="small" variant="text" @click="${() => this.hide()}">
                  ${getTranslation(this.language, 'CLOSE')}
                </etools-button>
              </div>
            </div>
          </sl-popup>
        </div>

        <div class="invalid-message" ?visible=${this.invalid && this.errorMessage}>${this.errorMessage}</div>
      </div>
    `;
  }

  constructor() {
    super();

    if (!this.language) {
      this.language = (window as any).EtoolsLanguage || 'en';
    }

    this.handleDocumentMouseDown = this.handleDocumentMouseDown.bind(this);
    this.handleDocumentFocusIn = this.handleDocumentFocusIn.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.setSelectedOption = this.setSelectedOption.bind(this);
    this.handleParentFocus = this.handleParentFocus.bind(this);
    this.handleFocusOut = this.handleFocusOut.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('sl-select', this.setSelectedOption);
    this.addEventListener('focusin', this.handleParentFocus);
    this.addEventListener('focusout', this.handleFocusOut);
    document.addEventListener('language-changed', this.handleLanguageChange);

    if (this.multiple) {
      callClickOnEnterPushListener(this.shadowRoot?.querySelector('#closeBtn'));
    }
  }

  preventDeselectByEnter(e: KeyboardEvent) {
    if (!this.multiple && e.key === 'Enter' && (e.currentTarget as any).hasAttribute('checked')) {
      e.stopImmediatePropagation();
    }
  }

  preventDeselectByClick(e: MouseEvent) {
    if (!this.multiple && (e.currentTarget as any).hasAttribute('checked')) {
      e.stopImmediatePropagation();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('sl-select', this.setSelectedOption);
    this.removeEventListener('focusin', this.handleParentFocus);
    this.removeEventListener('focusout', this.handleFocusOut);
    document.removeEventListener('language-changed', this.handleLanguageChange);
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('options') || changedProperties.has('selectedValues')) {
      const strSelectedVals = this.selectedValues ? this.selectedValues?.map((v) => String(v)) : this.selectedValues;
      this.selectedItems = (this.options || []).filter((o: any) =>
        strSelectedVals?.includes(String(o[this.optionValue]))
      );
    }
    if (changedProperties.has('shownOptionsLimit')) {
      this.totalOptionsToShow = this.shownOptionsLimit;
    }
  }

  handleKeyDown(e: KeyboardEvent) {
    // TO BE DEVELOPED FURTHER
    if (this.collectingKeyboardKeysTimeout) {
      clearTimeout(this.collectingKeyboardKeysTimeout);
    }

    if (e.key.match(/(\w|\s)/g) && e.key.length === 1) {
      this.collectedKeyboardKeys += e.key;
    }

    this.collectingKeyboardKeysTimeout = setTimeout(() => {
      if (this.collectedKeyboardKeys) {
        const list = this.shadowRoot?.querySelector('sl-menu')! as SlMenu;
        const foundItems = Array.from(list?.querySelectorAll('sl-menu-item') || []).filter((item: SlMenuItem) => {
          const text = item.textContent?.replace(/(\r\n|\n|\r)/gm, '').trim();
          return text?.toLowerCase().startsWith(this.collectedKeyboardKeys.toLowerCase());
        });

        // If already selected one with same starting letters then move to next found if any available
        let itemToFocusIndex = 0;
        const oneElementHasFocusIndex = foundItems.findIndex((item) => item.tabIndex === 0);

        if (oneElementHasFocusIndex > -1 && oneElementHasFocusIndex < foundItems.length - 1) {
          itemToFocusIndex = oneElementHasFocusIndex + 1;
        }

        if (foundItems?.[itemToFocusIndex]) {
          // According to shoelace the order of calling this is important
          list.setCurrentItem(foundItems?.[itemToFocusIndex]);
          foundItems?.[itemToFocusIndex].focus({preventScroll: !(list.scrollHeight > list.clientHeight)});
        }
      }

      this.collectedKeyboardKeys = '';
    }, 250);
  }

  handleParentFocus(event: FocusEvent) {
    const path = event.composedPath();
    const isIconButton = path.some((el) => el instanceof Element && el.tagName.toLowerCase() === 'etools-icon-button');

    if (this.disabled || this.readonly || isIconButton) {
      return;
    }

    if (this.autoValidate) {
      this._autoValidate = true;
    }

    if (!this.open) {
      this.show();
    }
  }

  handleFocusOut(e: FocusEvent) {
    if (this.open) {
      e.stopImmediatePropagation();
      this.hide();
    }
  }

  /**
   * Handle language change
   */
  private handleLanguageChange(e: any) {
    this.language = e.detail.language;
  }

  /**
   * Register document event listeners
   */
  private addOpenListeners() {
    document.addEventListener('focusin', this.handleDocumentFocusIn);
    document.addEventListener('mousedown', this.handleDocumentMouseDown);
  }

  private removeOpenListeners() {
    document.removeEventListener('focusin', this.handleDocumentFocusIn);
    document.removeEventListener('mousedown', this.handleDocumentMouseDown);
  }

  /**
   * Dropdown input mouse down handler. Responsible to open the dropdown popup on input click
   */
  private handleComboboxMouseDown(event: MouseEvent) {
    const path = event.composedPath();
    const isIconButton = path.some((el) => el instanceof Element && el.tagName.toLowerCase() === 'etools-icon-button');

    if (this.disabled || this.readonly || isIconButton) {
      return;
    }
    event.preventDefault();

    this.open = !this.open;
  }

  /**
   * Document Mouse Down handler function. On document mouse down it is hiding the dropdown popup
   * @param event MouseEvent
   */
  private handleDocumentMouseDown(event: MouseEvent) {
    // Close when clicking outside of the select
    const path = event.composedPath();
    if (this && !path.includes(this)) {
      this.hide();
    }
  }

  /**
   * Document Focus In handler function. On document focus in it is hiding the dropdown popup
   * @param event MouseEvent
   */
  private handleDocumentFocusIn(event: FocusEvent) {
    const path = event.composedPath();
    if (this && !path.includes(this)) {
      this.hide();
    }
  }

  /**
   * Clear all click handler function.Will clear entire selection
   * @param event MouseEvent
   */
  private handleClearClick(event: MouseEvent) {
    event.stopPropagation();

    this.clearSelection();
  }

  /**
   * Clear all mouse down handler function. It is used to stop propagation to the elements
   * @param event MouseEvent
   */
  private handleClearMouseDown(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  /**
   * Tag remove handler function
   * @param option - Item that need to be removed
   */
  private handleTagRemove(option?: any) {
    const itemSelectedAtIndex = this.selectedItems.findIndex(
      (x) => x?.[this.optionValue].toString() === option[this.optionValue].toString()
    );
    if (itemSelectedAtIndex >= 0) {
      const itemToBeRemoved = this.selectedItems[itemSelectedAtIndex];
      this.selectedItems.splice(itemSelectedAtIndex, 1);
      this.setSelectedValues();
      this.triggerRemovedOptionsEvent([itemToBeRemoved]);
    }
  }

  /**
   * Clear all mouse down handler function. It is used to stop propagation to the elements
   * @param event MouseEvent
   */
  private handleTagMouseDown(event: MouseEvent) {
    // Prevent open dialog in case we click on X, works together with pointer-events: none on sl-tag.
    // If pointer-events: none is removed from sl-tag this will prevent dialog popup to open on click of tag
    // as well.
    event.stopPropagation();
    event.preventDefault();
  }

  /**
   * Trigger remove option event
   * @param item - Item that has been removed
   */
  private triggerRemovedOptionsEvent(item: any[]) {
    this.dispatchEvent(
      new CustomEvent('removed-selected-items', {
        detail: {value: item},
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Trigger popup open event
   * @param boolean - If dialog is opened or closed
   */
  private triggerPopupOpenEvent(opened: boolean) {
    if (opened) {
      this.dispatchEvent(
        new CustomEvent('dropdown-opened', {
          detail: {value: opened},
          bubbles: true,
          composed: true
        })
      );
    }

    if (!opened) {
      this.dispatchEvent(
        new CustomEvent('dropdown-closed', {
          detail: {value: opened},
          bubbles: true,
          composed: true
        })
      );
    }
  }

  /**
   * Search change handler function
   * @param e SlInputEvent
   */
  private handleSearchChanged(e: SlInputEvent) {
    this.search = (e.target as SlInput)?.value;
    this.totalOptionsToShow = this.shownOptionsLimit;
    this.noMoreItemsToLoad = false;
    this.enableInfiniteScroll();
    this.dispatchEvent(
      new CustomEvent('search-changed', {
        detail: {value: this.search},
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Getter used to return selected options values as a comma separated list.
   */
  private get selectedValueCommaList() {
    return this.selectedValues?.join(',') || '';
  }

  /**
   * Getter used to return select options labels used to display in the select input display
   */
  private get selectedLabels() {
    return this.selectedItems?.map((x) => x?.[this.optionLabel]).join(',') || '';
  }

  /**
   * Getter to return the list of options to show in the dropdown.
   * It is responsible to make loadDataMethod function call if defined and
   * to filter the options based on the search value
   */
  private get filteredOptions() {
    if (typeof this.loadDataMethod === 'function') {
      return this.loadOptionsData(this.options, this.search, this.loadDataMethod);
    }

    if (this.search) {
      return this.options?.filter(this.itemContainsSearchString.bind(this)) || [];
    }

    return this.options || [];
  }

  private get noOptionsAvailable() {
    return !this.loading && !this.options?.length;
  }

  private showNoSearchResultsWarning(totalFilteredItems = 0) {
    if (this.noOptionsAvailable) {
      return false;
    }

    return this.options && this.options.length > 0 && totalFilteredItems === 0;
  }

  /**
   * Set selected options. Has logic to resolve multiple selections and single selection
   * @param option Option that has been selected
   */
  private setSelectedOption(e) {
    const {
      detail: {item}
    } = e;
    if (!this.selectedItems) {
      this.selectedItems = [];
    }

    if (!this.selectedValues) {
      this.selectedValues = [];
    }

    if (item.classList.contains('noneOption')) {
      this.selectedItems = [];
    } else {
      const selectedItem = this.options.find((x) => x[this.optionValue].toString() === item.value.toString());
      if (selectedItem) {
        const itemSelectedAtIndex = this.selectedItems.findIndex(
          (x) => x?.[this.optionValue].toString() === selectedItem[this.optionValue].toString()
        );

        if (itemSelectedAtIndex >= 0) {
          if (this.multiple) {
            this.selectedItems.splice(itemSelectedAtIndex, 1);
          }
        } else {
          if (this.multiple) {
            this.selectedItems = [...this.selectedItems, selectedItem];
          } else {
            this.selectedItems = [selectedItem];
          }
        }
      }
    }

    this.setSelectedValues();

    if (!this.multiple) {
      this.hide();
    }
  }

  /**
   * Set selected values using 'optionValue' from selectedItems and
   * triggers and also selection-changed event
   */
  private setSelectedValues() {
    this.selectedValues = (this.selectedItems || []).map((x) => x?.[this.optionValue]);
    if (this._autoValidate) {
      this.validate();
    }
    this.dispatchEvent(
      new CustomEvent('selection-changed', {
        detail: {value: this.multiple ? this.selectedItems : this.selectedItems?.[0] || undefined},
        bubbles: true,
        composed: true
      })
    );
    this.dispatchEvent(
      new CustomEvent('etools-selected-item-changed', {
        detail: {selectedItem: this.selectedItems?.[0] || undefined},
        bubbles: true,
        composed: true
      })
    );
    this.dispatchEvent(
      new CustomEvent('etools-selected-items-changed', {
        detail: {selectedItems: this.selectedItems},
        bubbles: true,
        composed: true
      })
    );

    // FOR POLYMER SUPORT
    this.dispatchEvent(
      new CustomEvent('selected-changed', {
        detail: {value: this.selected},
        bubbles: true,
        composed: true
      })
    );
    this.dispatchEvent(
      new CustomEvent('selected-values-changed', {
        detail: {value: this.selectedValues},
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Clears selected options
   */
  clearSelection() {
    const itemsToBeRemoved = [...this.selectedItems];
    this.selectedItems = [];
    this.setSelectedValues();
    this.triggerRemovedOptionsEvent(itemsToBeRemoved);
  }

  /**
   * Hide dropdown popup.
   */
  show() {
    this.open = true;
  }

  /**
   * Show dropdown popup
   */
  hide() {
    this.open = false;
  }

  /**
   * Function to check if a specific option has been selected.
   * It is checking if it is available in selectedItems by matching 'optionValue'
   * @param option - The option to check if it has been selected
   * @returns
   */
  isSelected(option: any) {
    return (
      this.selectedItems?.findIndex((x) => x?.[this.optionValue]?.toString() === option[this.optionValue]?.toString()) >
      -1
    );
  }

  /**
   * Validate dropdown selection
   * @param selected
   * @returns {boolean}
   */
  validate() {
    if (!this.hasAttribute('required') || this.hasAttribute('readonly')) {
      this.invalid = false;
      return true;
    }

    this.invalid = !this.selectedValueCommaList.length;
    return !this.invalid;
  }

  /**
   * Reset invalid state
   */
  resetInvalidState() {
    this.invalid = false;
    return this.invalid;
  }

  /**
   * Responsbile to call loadDataMethod function if has been provided in order to fetch data directly from server
   * and to directly filter & search via API Requests
   * @param options - List of options currently available
   * @param search - Search value
   * @param loadDataMethod  - The load data method to call
   * @returns Existing options or empty list depending on some specific cases
   */
  private loadOptionsData(options: any[], search: string, loadDataMethod: any) {
    if (search != this.prevSearch && this.totalOptionsToShow !== this.shownOptionsLimit) {
      // if search changed reset _shownOptionsCount in order to load  the first page for the new search
      this.totalOptionsToShow = this.shownOptionsLimit;
      return [];
    }

    this.page = this.totalOptionsToShow / this.shownOptionsLimit || 1;

    if (this.noMoreItemsToLoad) {
      return options || [];
    }

    if (search != this.prevSearch || this.page !== this.prevPage) {
      this.loading = true;

      this.searchHasChanged = this.prevSearch !== search;
      this.pageHasChanged = this.page !== this.prevPage;
      this.prevSearch = search;
      this.prevPage = this.page;

      const loadDataMethodReturn = loadDataMethod(this.search, this.page, this.shownOptionsLimit);

      // if it is a promise then we try to catch. If it returns error then most probably there is no more items to
      // load (the case were total items equals exactly limit * page)
      if (
        loadDataMethodReturn &&
        typeof loadDataMethodReturn === 'object' &&
        typeof loadDataMethodReturn.then === 'function'
      ) {
        loadDataMethodReturn.catch(() => {
          this.loading = false;
          this.noMoreItemsToLoad = true;
        });
      }

      if (this.searchHasChanged) {
        // if search is changed we return nothing as options to be shown, options (if any) will be set in loadDataMethod
        return [];
      }

      if (this.pageHasChanged) {
        // if page changed return current options so we don't have an empty list until request finishes
        return options || [];
      }
    }

    if (this.options !== undefined) {
      if (this.searchHasChanged) {
        this.searchHasChanged = false;
        this.loading = false;
      } else if (this.pageHasChanged) {
        this.pageHasChanged = false;
        this.loading = false;
        if (options.length && options.length < this.totalOptionsToShow) {
          this.noMoreItemsToLoad = true;
        }
      }

      return options || [];
    }

    return [];
  }

  /**
   * Checks if an options contains a search string by first converting the 'optionLabel' and search value to lowercase
   * @param item - Item to check against
   * @returns Boolean
   */
  private itemContainsSearchString(item: any) {
    return (
      item[this.optionLabel] && item[this.optionLabel].toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1
    );
  }

  /**
   * Function to disable infinite scroll functionality
   */
  private disableInfiniteScroll() {
    if (this.observerInfiniteScroll) {
      this.observerInfiniteScroll.disconnect();
      this.observerInfiniteScroll = undefined;
    }
  }

  /**
   * Function to enable infinite scroll functionality by adding a intersection observer.
   */
  private enableInfiniteScroll() {
    this.disableInfiniteScroll();

    var options = {
      root: this.shadowRoot?.querySelector('.listInnerWrapper'),
      treshold: 1.0
    };

    this.observerInfiniteScroll = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.showMoreOptions();
        }
      });
    }, options);
    this.observerInfiniteScroll.observe(this.shadowRoot?.querySelector('.infinite-scroll-trigger')!);
  }

  /**
   * Function to set the number of options to show in dropdown based on the shown options limit and by
   * the infinite scroll trigger. Total options to show will increase when the list reaches the end of list
   * @returns
   */
  private showMoreOptions() {
    if (!this.options || !this.options.length) {
      this.totalOptionsToShow = this.shownOptionsLimit;
      return;
    }

    // If we are not using loadDataMethod. we disable infinite scroll by total number options
    if (typeof this.loadDataMethod !== 'function' && this.options.length < this.totalOptionsToShow) {
      this.noMoreItemsToLoad = true;
    }
    this.totalOptionsToShow += this.shownOptionsLimit;
  }

  /**
   * Checks if this dropdown is a child of etools-dialog and returns the etools-dialog element reference if any.
   */
  private getParentDialog() {
    return ((this.shadowRoot?.getRootNode() as any).host as HTMLElement)?.closest('etools-dialog');
  }
}
