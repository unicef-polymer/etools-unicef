import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/tag/tag.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import '@shoelace-style/shoelace/dist/components/popup/popup.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import '../etools-button/etools-button';
import '../etools-icons/etools-icon';
import styles from './styles/sl-autocomplete-styles';
import etoolsStyles from './styles/sl-autocomplete-etools-styles';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { property, query, state } from 'lit/decorators.js';
import { getTranslation } from './utils/translate';
import { callClickOnEnterPushListener } from '@unicef-polymer/etools-utils/dist/accessibility.util';
import { ifDefined } from 'lit/directives/if-defined.js';
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
    get selected() {
        var _a;
        return ((_a = this.selectedValues) === null || _a === void 0 ? void 0 : _a[0]) || null;
    }
    set selected(value) {
        var _a;
        this.selectedValues = value !== undefined && value !== null ? [value] : [];
        // sl-select is not fired when selected is set through binding
        // timeout to wait for selectedItems to be set
        if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.length) {
            setTimeout(() => this.setSelectedValues());
        }
    }
    get selectedItem() {
        var _a;
        return (_a = this.selectedItems) === null || _a === void 0 ? void 0 : _a[0];
    }
    set selectedItem(value) {
        this.selectedItems = value ? [value] : [];
    }
    get open() {
        return this._open;
    }
    set open(value) {
        var _a, _b, _c;
        if (this.readonly || this.disabled) {
            return;
        }
        this._open = value;
        if (this._open) {
            this.addOpenListeners();
            this.enableInfiniteScroll();
            (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('sl-menu').addEventListener('keydown', this.handleKeyDown);
            const parentDialog = this.getParentDialog();
            if (parentDialog) {
                if (!this.boundary) {
                    // console.warn('Missing boundary for dropdown in dialog', this);
                    this.hoist = true;
                }
            }
            setTimeout(() => {
                var _a, _b;
                if (!this.hideSearch) {
                    this.searchInput.focus({ preventScroll: true });
                }
                else {
                    const selItem = this.shadowRoot.querySelector('sl-menu-item[checked]');
                    if (selItem && !this.multiple) {
                        selItem.focus();
                    }
                    else {
                        (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('sl-menu-item')) === null || _b === void 0 ? void 0 : _b.focus({ preventScroll: true });
                    }
                }
            }, 0);
        }
        if (!this._open) {
            this.removeOpenListeners();
            this.disableInfiniteScroll();
            (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('sl-menu').removeEventListener('keydown', this.handleKeyDown);
            if (!this.hideSearch) {
                (_c = this.searchInput) === null || _c === void 0 ? void 0 : _c.blur();
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
        var _a, _b, _c, _d;
        const hasHelpText = !!this.helpText;
        const hasClearIcon = this.clearable && this.multiple && !this.disabled && !this.readonly && this.selectedValueCommaList.length > 0;
        const isPlaceholderVisible = this.placeholder && this.selectedValueCommaList.length === 0;
        // this.filteredOptions should be called only once otherwise it breaks pagination.
        const options = (_a = this.filteredOptions) === null || _a === void 0 ? void 0 : _a.slice(0, this.totalOptionsToShow);
        return html `
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
          <slot name="label">${this.label || html `&nbsp;`}</slot>
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

              ${this.multiple && ((_b = this.selectedItems) === null || _b === void 0 ? void 0 : _b.length)
            ? html `
                    <div part="tags" class="select__tags">
                      ${(_c = this.selectedItems) === null || _c === void 0 ? void 0 : _c.map((option, index) => {
                if (index < this.maxOptionsVisible || this.maxOptionsVisible <= 0) {
                    return html `
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
                              ?removable=${!this.disabled && !this.readonly && !option.disabled}
                              @mousedown=${this.handleTagMouseDown}
                              @sl-remove=${() => this.handleTagRemove(option)}
                            >
                              ${Object.hasOwn(option, 'selectedTemplate')
                        ? option.selectedTemplate
                        : Object.hasOwn(option, 'itemTemplate')
                            ? option.itemTemplate
                            : option[this.optionLabel]}
                            </sl-tag>
                          `;
                }
                else if (index === this.maxOptionsVisible) {
                    return html ` <sl-tag size=${this.size}> +${this.selectedItems.length - index} </sl-tag> `;
                }
                else {
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
            ? html `
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
            ? html `<sl-menu-item
                          type="checkbox"
                          class="noneOption"
                          @click="${this.preventDeselectByClick}"
                          @keydown="${this.preventDeselectByEnter}"
                          ?checked=${!((_d = this.selectedItems) === null || _d === void 0 ? void 0 : _d.length)}
                          value=""
                          title="${this.noneOptionLabel || getTranslation(this.language, 'NONE')}"
                        >
                          ${this.noneOptionLabel || getTranslation(this.language, 'NONE')}
                        </sl-menu-item>`
            : ''}
                  ${options === null || options === void 0 ? void 0 : options.map((option) => html `
                      ${option.disabled && option.disabledTooltip
            ? html `<sl-tooltip hoist content="${option.disabledTooltip}"
                            >${this.renderMenuItem(option)}</sl-tooltip
                          >`
            : this.renderMenuItem(option)}
                    `)}

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

                <div aria-hidden="true" style=${styleMap({ width: `${this.clientWidth}px` })}></div>
              </div>
              <div class="footer" ?hidden="${!this.multiple || this.hideClose}">
                ${this.shouldShowAddNewOption(options.length)
            ? html `<etools-button
                      class="add-new-button"
                      variant="text"
                      size="small"
                      @click="${this.handleAddNewClick}"
                    >
                      <etools-icon name="add-box" slot="prefix"></etools-icon>
                      ${this.addNewLabel || getTranslation(this.language, 'ADD_NEW')} "${this.search}"
                    </etools-button>`
            : ''}
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
        this.hasFocus = false;
        this.loading = false;
        this._open = false;
        this.search = '';
        this.totalOptionsToShow = 0;
        this.language = '';
        this.page = 0;
        this.prevPage = 0;
        this.prevSearch = '';
        this.searchHasChanged = false;
        this.pageHasChanged = false;
        this.noMoreItemsToLoad = false;
        this.collectingKeyboardKeysTimeout = undefined;
        this.collectedKeyboardKeys = '';
        this.placeholder = '—';
        this.searchPlaceholder = '';
        this.optionValue = 'value';
        this.optionLabel = 'label';
        this.errorMessage = '';
        this.disabled = false;
        this.readonly = false;
        this.invalid = false;
        this.noOptionsAvailableText = '';
        this.noResultsText = '';
        this.loadingText = '';
        this.options = [];
        this.multiple = false;
        this.maxOptionsVisible = 0;
        this.pill = false;
        this.size = 'medium';
        this.filled = false;
        this.placement = 'bottom-start';
        this.clearable = true;
        this.hoist = false;
        this.hideSearch = false;
        this.preserveSearchOnClose = false;
        this.hideClose = false;
        this.enableNoneOption = false;
        this.noneOptionLabel = '';
        this.enableAddNew = false;
        this.addNewLabel = '';
        this.shownOptionsLimit = 30;
        this.capitalize = false;
        this.transparent = false;
        this.minWidth = '30px';
        this.maxWidth = '';
        this.minHeight = '0px';
        this.maxHeight = '';
        this.syncWidth = true;
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
        this.boundary = undefined;
        this.selectedItems = [];
        this.selectedValues = [];
        // Enable autoValidate only after first focus on input
        this._autoValidate = false;
        this.expandIcon = 'expand-more'; // arrow-drop-down
        if (!this.language) {
            this.language = window.EtoolsLanguage || 'en';
        }
        this.handleDocumentMouseDown = this.handleDocumentMouseDown.bind(this);
        this.handleDocumentFocusIn = this.handleDocumentFocusIn.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.setSelectedOption = this.setSelectedOption.bind(this);
        this.handleParentFocus = this.handleParentFocus.bind(this);
        this.handleFocusOut = this.handleFocusOut.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    connectedCallback() {
        var _a;
        super.connectedCallback();
        this.addEventListener('sl-select', this.setSelectedOption);
        this.addEventListener('focusin', this.handleParentFocus);
        this.addEventListener('focusout', this.handleFocusOut);
        document.addEventListener('language-changed', this.handleLanguageChange);
        if (this.multiple) {
            callClickOnEnterPushListener((_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('#closeBtn'));
        }
    }
    preventDeselectByEnter(e) {
        if (!this.multiple && e.key === 'Enter' && e.currentTarget.hasAttribute('checked')) {
            e.stopImmediatePropagation();
        }
    }
    renderMenuItem(option) {
        return html `<sl-menu-item
      type="checkbox"
      ?checked=${this.isSelected(option)}
      value="${option[this.optionValue]}"
      tabindex="0"
      @click="${this.preventDeselectByClick}"
      @keydown="${this.preventDeselectByEnter}"
      title="${option[this.optionLabel]}"
      disabled="${ifDefined(option.disabled ? true : undefined)}"
    >
      ${Object.hasOwn(option, 'itemTemplate') ? option.itemTemplate : option[this.optionLabel]}
    </sl-menu-item>`;
    }
    preventDeselectByClick(e) {
        if (!this.multiple && e.currentTarget.hasAttribute('checked')) {
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
    updated(changedProperties) {
        var _a;
        if (changedProperties.has('options') || changedProperties.has('selectedValues')) {
            const strSelectedVals = this.selectedValues ? (_a = this.selectedValues) === null || _a === void 0 ? void 0 : _a.map((v) => String(v)) : this.selectedValues;
            const matchedItems = (this.options || []).filter((o) => strSelectedVals === null || strSelectedVals === void 0 ? void 0 : strSelectedVals.includes(String(o[this.optionValue])));
            // In multiple mode with "add new", preserve temporary items that haven't been replaced yet
            if (this.multiple && this.selectedItems) {
                const tempItems = this.selectedItems.filter((item) => item._isTemporary);
                // Try to match temporary items with newly added options by label
                const updatedItems = [...matchedItems];
                tempItems.forEach((tempItem) => {
                    var _a, _b;
                    const tempLabel = (_a = tempItem[this.optionLabel]) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase().trim();
                    const foundMatch = (_b = this.options) === null || _b === void 0 ? void 0 : _b.find((o) => {
                        var _a;
                        const optionLabel = (_a = o[this.optionLabel]) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase().trim();
                        return optionLabel === tempLabel && !(strSelectedVals === null || strSelectedVals === void 0 ? void 0 : strSelectedVals.includes(String(o[this.optionValue])));
                    });
                    if (foundMatch) {
                        // Replace temporary item with actual option
                        updatedItems.push(foundMatch);
                    }
                    else {
                        // Keep temporary item if no match found yet
                        updatedItems.push(tempItem);
                    }
                });
                this.selectedItems = updatedItems;
            }
            else {
                this.selectedItems = matchedItems;
            }
            // this.restoreSelectedItemsIfNecessary();
        }
        if (changedProperties.has('shownOptionsLimit')) {
            this.totalOptionsToShow = this.shownOptionsLimit;
        }
    }
    restoreSelectedItemsIfNecessary() {
        var _a, _b, _c;
        const storageSelectedItems = this.getSelectedItemsFromSessionStorage();
        if ((storageSelectedItems === null || storageSelectedItems === void 0 ? void 0 : storageSelectedItems.length) &&
            ((_a = this.selectedValues) === null || _a === void 0 ? void 0 : _a.length) &&
            ((_b = this.selectedValues) === null || _b === void 0 ? void 0 : _b.length) !== ((_c = this.selectedItems) === null || _c === void 0 ? void 0 : _c.length)) {
            if (!this.selectedItems) {
                this.selectedItems = [];
            }
            const selectedIDs = this.selectedItems.map((x) => x[this.optionValue]);
            const selectedItemsFromStorage = storageSelectedItems.filter((x) => this.selectedValues.includes(x[this.optionValue]) && !selectedIDs.includes(x[this.optionValue]));
            this.selectedItems = [...this.selectedItems, ...selectedItemsFromStorage];
        }
    }
    handleKeyDown(e) {
        // TO BE DEVELOPED FURTHER
        if (this.collectingKeyboardKeysTimeout) {
            clearTimeout(this.collectingKeyboardKeysTimeout);
        }
        if (e.key.match(/(\w|\s)/g) && e.key.length === 1) {
            this.collectedKeyboardKeys += e.key;
        }
        this.collectingKeyboardKeysTimeout = setTimeout(() => {
            var _a;
            if (this.collectedKeyboardKeys) {
                const list = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('sl-menu');
                const foundItems = Array.from((list === null || list === void 0 ? void 0 : list.querySelectorAll('sl-menu-item')) || []).filter((item) => {
                    var _a;
                    const text = (_a = item.textContent) === null || _a === void 0 ? void 0 : _a.replace(/(\r\n|\n|\r)/gm, '').trim();
                    return text === null || text === void 0 ? void 0 : text.toLowerCase().startsWith(this.collectedKeyboardKeys.toLowerCase());
                });
                // If already selected one with same starting letters then move to next found if any available
                let itemToFocusIndex = 0;
                const oneElementHasFocusIndex = foundItems.findIndex((item) => item.tabIndex === 0);
                if (oneElementHasFocusIndex > -1 && oneElementHasFocusIndex < foundItems.length - 1) {
                    itemToFocusIndex = oneElementHasFocusIndex + 1;
                }
                if (foundItems === null || foundItems === void 0 ? void 0 : foundItems[itemToFocusIndex]) {
                    // According to shoelace the order of calling this is important
                    list.setCurrentItem(foundItems === null || foundItems === void 0 ? void 0 : foundItems[itemToFocusIndex]);
                    foundItems === null || foundItems === void 0 ? void 0 : foundItems[itemToFocusIndex].focus({ preventScroll: !(list.scrollHeight > list.clientHeight) });
                }
            }
            this.collectedKeyboardKeys = '';
        }, 250);
    }
    handleParentFocus(event) {
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
    handleFocusOut(event) {
        const path = event.composedPath();
        if (this && !path.includes(this)) {
            event.stopImmediatePropagation();
            this.hide();
        }
    }
    /**
     * Handle language change
     */
    handleLanguageChange(e) {
        this.language = e.detail.language;
    }
    /**
     * Register document event listeners
     */
    addOpenListeners() {
        document.addEventListener('focusin', this.handleDocumentFocusIn);
        document.addEventListener('mousedown', this.handleDocumentMouseDown);
    }
    removeOpenListeners() {
        document.removeEventListener('focusin', this.handleDocumentFocusIn);
        document.removeEventListener('mousedown', this.handleDocumentMouseDown);
    }
    /**
     * Dropdown input mouse down handler. Responsible to open the dropdown popup on input click
     */
    handleComboboxMouseDown(event) {
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
    handleDocumentMouseDown(event) {
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
    handleDocumentFocusIn(event) {
        const path = event.composedPath();
        if (this && !path.includes(this)) {
            this.hide();
        }
    }
    /**
     * Clear all click handler function.Will clear entire selection
     * @param event MouseEvent
     */
    handleClearClick(event) {
        event.stopPropagation();
        this.clearSelection();
    }
    /**
     * Clear all mouse down handler function. It is used to stop propagation to the elements
     * @param event MouseEvent
     */
    handleClearMouseDown(event) {
        event.stopPropagation();
        event.preventDefault();
    }
    /**
     * Tag remove handler function
     * @param option - Item that need to be removed
     */
    handleTagRemove(option) {
        const itemSelectedAtIndex = this.selectedItems.findIndex((x) => (x === null || x === void 0 ? void 0 : x[this.optionValue].toString()) === option[this.optionValue].toString());
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
    handleTagMouseDown(event) {
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
    triggerRemovedOptionsEvent(item) {
        this.dispatchEvent(new CustomEvent('removed-selected-items', {
            detail: { value: item },
            bubbles: true,
            composed: true
        }));
    }
    /**
     * Trigger popup open event
     * @param boolean - If dialog is opened or closed
     */
    triggerPopupOpenEvent(opened) {
        if (opened) {
            this.dispatchEvent(new CustomEvent('dropdown-opened', {
                detail: { value: opened },
                bubbles: true,
                composed: true
            }));
        }
        if (!opened) {
            this.dispatchEvent(new CustomEvent('dropdown-closed', {
                detail: { value: opened },
                bubbles: true,
                composed: true
            }));
        }
    }
    /**
     * Search change handler function
     * @param e SlInputEvent
     */
    handleSearchChanged(e) {
        var _a;
        this.search = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value;
        this.totalOptionsToShow = this.shownOptionsLimit;
        this.noMoreItemsToLoad = false;
        this.enableInfiniteScroll();
        this.dispatchEvent(new CustomEvent('search-changed', {
            detail: { value: this.search },
            bubbles: true,
            composed: true
        }));
    }
    /**
     * Getter used to return selected options values as a comma separated list.
     */
    get selectedValueCommaList() {
        var _a;
        return ((_a = this.selectedValues) === null || _a === void 0 ? void 0 : _a.join(',')) || '';
    }
    /**
     * Getter used to return select options labels used to display in the select input display
     */
    get selectedLabels() {
        var _a;
        return ((_a = this.selectedItems) === null || _a === void 0 ? void 0 : _a.map((x) => x === null || x === void 0 ? void 0 : x[this.optionLabel]).join(',')) || '';
    }
    /**
     * Getter to return the list of options to show in the dropdown.
     * It is responsible to make loadDataMethod function call if defined and
     * to filter the options based on the search value
     */
    get filteredOptions() {
        var _a;
        if (typeof this.loadDataMethod === 'function') {
            return this.loadOptionsData(this.options, this.search, this.loadDataMethod);
        }
        if (this.search) {
            return ((_a = this.options) === null || _a === void 0 ? void 0 : _a.filter(this.itemContainsSearchString.bind(this))) || [];
        }
        return this.options || [];
    }
    get noOptionsAvailable() {
        var _a;
        return !this.loading && !((_a = this.options) === null || _a === void 0 ? void 0 : _a.length);
    }
    showNoSearchResultsWarning(totalFilteredItems = 0) {
        if (this.noOptionsAvailable) {
            return false;
        }
        return this.options && this.options.length > 0 && totalFilteredItems === 0;
    }
    /**
     * Check if we should show the "add new" option
     * Shows when enableAddNew is true, there's a search value, and no results are found
     * Also checks if the search value is already selected (to avoid duplicates)
     */
    shouldShowAddNewOption(_totalFilteredItems = 0) {
        if (!this.enableAddNew || !this.search || this.loading) {
            return false;
        }
        // Don't show if no results found but search value is already in selectedItems
        if (this.selectedItems && this.selectedItems.length > 0) {
            const searchLower = this.search.toLowerCase().trim();
            const isAlreadySelected = this.selectedItems.some((item) => {
                var _a;
                const itemLabel = (_a = item[this.optionLabel]) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase().trim();
                return itemLabel === searchLower;
            });
            if (isAlreadySelected) {
                return false;
            }
        }
        // Show when no results found (either no options at all, or search returned no results)
        return true;
    }
    /**
     * Set selected options. Has logic to resolve multiple selections and single selection
     * @param option Option that has been selected
     */
    setSelectedOption(e) {
        const { detail: { item } } = e;
        if (!this.selectedItems) {
            this.selectedItems = [];
        }
        if (!this.selectedValues) {
            this.selectedValues = [];
        }
        if (item.classList.contains('noneOption')) {
            this.selectedItems = [];
        }
        else {
            const selectedItem = this.options.find((x) => x[this.optionValue].toString() === item.value.toString());
            if (selectedItem) {
                const itemSelectedAtIndex = this.selectedItems.findIndex((x) => (x === null || x === void 0 ? void 0 : x[this.optionValue].toString()) === selectedItem[this.optionValue].toString());
                if (itemSelectedAtIndex >= 0) {
                    if (this.multiple) {
                        this.selectedItems.splice(itemSelectedAtIndex, 1);
                    }
                }
                else {
                    if (this.multiple) {
                        this.selectedItems = [...this.selectedItems, selectedItem];
                    }
                    else {
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
    setSelectedValues() {
        var _a, _b;
        this.selectedValues = (this.selectedItems || []).map((x) => x === null || x === void 0 ? void 0 : x[this.optionValue]);
        if (this._autoValidate) {
            this.validate();
        }
        this.saveSelectedItemsToSessionStorage(this.selectedItems);
        this.dispatchEvent(new CustomEvent('selection-changed', {
            detail: { value: this.multiple ? this.selectedItems : ((_a = this.selectedItems) === null || _a === void 0 ? void 0 : _a[0]) || undefined },
            bubbles: true,
            composed: true
        }));
        this.dispatchEvent(new CustomEvent('etools-selected-item-changed', {
            detail: { selectedItem: ((_b = this.selectedItems) === null || _b === void 0 ? void 0 : _b[0]) || undefined },
            bubbles: true,
            composed: true
        }));
        this.dispatchEvent(new CustomEvent('etools-selected-items-changed', {
            detail: { selectedItems: this.selectedItems },
            bubbles: true,
            composed: true
        }));
        // FOR POLYMER SUPORT
        this.dispatchEvent(new CustomEvent('selected-changed', {
            detail: { value: this.selected },
            bubbles: true,
            composed: true
        }));
        this.dispatchEvent(new CustomEvent('selected-values-changed', {
            detail: { value: this.selectedValues },
            bubbles: true,
            composed: true
        }));
    }
    saveSelectedItemsToSessionStorage(selectedItems) {
        if (typeof this.loadDataMethod === 'function' && this.id) {
            if (selectedItems === null || selectedItems === void 0 ? void 0 : selectedItems.length) {
                sessionStorage.setItem(`dd_${this.id}_selected`, JSON.stringify(selectedItems));
            }
            else {
                sessionStorage.removeItem(`dd_${this.id}_selected`);
            }
        }
    }
    getSelectedItemsFromSessionStorage() {
        if (typeof this.loadDataMethod === 'function' && this.id) {
            const selectedItems = sessionStorage.getItem(`dd_${this.id}_selected`);
            if (selectedItems) {
                return JSON.parse(selectedItems);
            }
            return null;
        }
    }
    /**
     * Clears selected options
     */
    clearSelection() {
        // filter out selected disabled items, this items should not be removable if they came like this from backend
        const itemsToBeRemoved = [...this.selectedItems.filter((x) => !x.disabled)];
        // keeps disabled items selected in case of clear all
        this.selectedItems = [...this.selectedItems.filter((x) => !!x.disabled)];
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
    isSelected(option) {
        var _a;
        return (((_a = this.selectedItems) === null || _a === void 0 ? void 0 : _a.findIndex((x) => { var _a, _b; return ((_a = x === null || x === void 0 ? void 0 : x[this.optionValue]) === null || _a === void 0 ? void 0 : _a.toString()) === ((_b = option[this.optionValue]) === null || _b === void 0 ? void 0 : _b.toString()); })) >
            -1);
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
    loadOptionsData(options, search, loadDataMethod) {
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
            if (loadDataMethodReturn &&
                typeof loadDataMethodReturn === 'object' &&
                typeof loadDataMethodReturn.then === 'function') {
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
            }
            else if (this.pageHasChanged) {
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
    itemContainsSearchString(item) {
        return (item[this.optionLabel] && item[this.optionLabel].toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1);
    }
    /**
     * Function to disable infinite scroll functionality
     */
    disableInfiniteScroll() {
        if (this.observerInfiniteScroll) {
            this.observerInfiniteScroll.disconnect();
            this.observerInfiniteScroll = undefined;
        }
    }
    /**
     * Function to enable infinite scroll functionality by adding a intersection observer.
     */
    enableInfiniteScroll() {
        var _a, _b;
        this.disableInfiniteScroll();
        var options = {
            root: (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.listInnerWrapper'),
            treshold: 1.0
        };
        this.observerInfiniteScroll = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.showMoreOptions();
                }
            });
        }, options);
        this.observerInfiniteScroll.observe((_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('.infinite-scroll-trigger'));
    }
    /**
     * Function to set the number of options to show in dropdown based on the shown options limit and by
     * the infinite scroll trigger. Total options to show will increase when the list reaches the end of list
     * @returns
     */
    showMoreOptions() {
        if (!this.options || !this.options.length) {
            this.totalOptionsToShow = this.shownOptionsLimit;
            return;
        }
        // If we are not using loadDataMethod. we disable infinite scroll by total number options
        if (typeof this.loadDataMethod !== 'function' && this.options.length < this.totalOptionsToShow) {
            this.noMoreItemsToLoad = true;
        }
        if (this.options.length >= this.totalOptionsToShow) {
            this.totalOptionsToShow += this.shownOptionsLimit;
        }
    }
    /**
     * Checks if this dropdown is a child of etools-dialog and returns the etools-dialog element reference if any.
     */
    getParentDialog() {
        var _a, _b;
        return (_b = ((_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getRootNode()).host) === null || _b === void 0 ? void 0 : _b.closest('etools-dialog');
    }
    /**
     * Handle "add new" option click
     * Dispatches a custom event with the search value so parent can handle adding the new item
     */
    handleAddNewClick() {
        if (this.multiple && this.search) {
            // Check if not already selected
            const isAlreadySelected = this.selectedItems.some((item) => {
                var _a;
                return ((_a = item[this.optionLabel]) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase().trim()) === this.search.toLowerCase().trim();
            });
            if (!isAlreadySelected) {
                let tempItem = this.options.find((x) => x[this.optionValue].toString().toLowerCase().trim() === this.search.toString().toLowerCase().trim());
                if (!tempItem) {
                    tempItem = {};
                    tempItem[this.optionValue] = this.search;
                    tempItem[this.optionLabel] = this.search;
                    tempItem._isTemporary = true;
                }
                this.selectedItems = [...this.selectedItems, tempItem];
            }
            this.search = '';
            this.setSelectedValues();
        }
    }
}
SlAutocomplete.styles = [styles, etoolsStyles];
__decorate([
    query('sl-input')
], SlAutocomplete.prototype, "searchInput", void 0);
__decorate([
    state()
], SlAutocomplete.prototype, "hasFocus", void 0);
__decorate([
    state()
], SlAutocomplete.prototype, "loading", void 0);
__decorate([
    state()
], SlAutocomplete.prototype, "_open", void 0);
__decorate([
    state()
], SlAutocomplete.prototype, "search", void 0);
__decorate([
    state()
], SlAutocomplete.prototype, "totalOptionsToShow", void 0);
__decorate([
    state()
], SlAutocomplete.prototype, "language", void 0);
__decorate([
    property({ type: String, attribute: 'label' })
], SlAutocomplete.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, attribute: 'no-label-float' })
], SlAutocomplete.prototype, "noLabelFloat", void 0);
__decorate([
    property({ type: String, attribute: 'placeholder' })
], SlAutocomplete.prototype, "placeholder", void 0);
__decorate([
    property({ type: String, attribute: 'search-placeholder' })
], SlAutocomplete.prototype, "searchPlaceholder", void 0);
__decorate([
    property({ type: String, attribute: 'option-value' })
], SlAutocomplete.prototype, "optionValue", void 0);
__decorate([
    property({ type: String, attribute: 'option-label' })
], SlAutocomplete.prototype, "optionLabel", void 0);
__decorate([
    property({ type: Boolean, attribute: 'required', reflect: true })
], SlAutocomplete.prototype, "required", void 0);
__decorate([
    property({ type: String, attribute: 'error-message' })
], SlAutocomplete.prototype, "errorMessage", void 0);
__decorate([
    property({ type: Boolean, attribute: 'disabled', reflect: true })
], SlAutocomplete.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, attribute: 'readonly', reflect: true })
], SlAutocomplete.prototype, "readonly", void 0);
__decorate([
    property({ type: Boolean, attribute: 'invalid', reflect: true })
], SlAutocomplete.prototype, "invalid", void 0);
__decorate([
    property({ type: String, attribute: 'no-options-available-text' })
], SlAutocomplete.prototype, "noOptionsAvailableText", void 0);
__decorate([
    property({ type: String, attribute: 'no-results-text' })
], SlAutocomplete.prototype, "noResultsText", void 0);
__decorate([
    property({ type: String, attribute: 'loading-text' })
], SlAutocomplete.prototype, "loadingText", void 0);
__decorate([
    property({ type: Number })
], SlAutocomplete.prototype, "options", void 0);
__decorate([
    property({ type: Object })
], SlAutocomplete.prototype, "loadDataMethod", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'multiple' })
], SlAutocomplete.prototype, "multiple", void 0);
__decorate([
    property({ type: Boolean, attribute: 'max-options-available' })
], SlAutocomplete.prototype, "maxOptionsVisible", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'pill' })
], SlAutocomplete.prototype, "pill", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'size' })
], SlAutocomplete.prototype, "size", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'filled' })
], SlAutocomplete.prototype, "filled", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'placement' })
], SlAutocomplete.prototype, "placement", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'help-text' })
], SlAutocomplete.prototype, "helpText", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'clearable' })
], SlAutocomplete.prototype, "clearable", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'hoist' })
], SlAutocomplete.prototype, "hoist", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'hide-search' })
], SlAutocomplete.prototype, "hideSearch", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'preserve-search-on-close' })
], SlAutocomplete.prototype, "preserveSearchOnClose", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'hide-close' })
], SlAutocomplete.prototype, "hideClose", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'enable-none-option' })
], SlAutocomplete.prototype, "enableNoneOption", void 0);
__decorate([
    property({ type: String, attribute: 'none-option-label' })
], SlAutocomplete.prototype, "noneOptionLabel", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'enable-add-new' })
], SlAutocomplete.prototype, "enableAddNew", void 0);
__decorate([
    property({ type: String, attribute: 'add-new-label' })
], SlAutocomplete.prototype, "addNewLabel", void 0);
__decorate([
    property({ type: Number, attribute: 'shown-options-limit' })
], SlAutocomplete.prototype, "shownOptionsLimit", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'capitalize' })
], SlAutocomplete.prototype, "capitalize", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'transparent' })
], SlAutocomplete.prototype, "transparent", void 0);
__decorate([
    property({ type: String, attribute: 'min-width' })
], SlAutocomplete.prototype, "minWidth", void 0);
__decorate([
    property({ type: String, attribute: 'max-width' })
], SlAutocomplete.prototype, "maxWidth", void 0);
__decorate([
    property({ type: String, attribute: 'max-height' })
], SlAutocomplete.prototype, "minHeight", void 0);
__decorate([
    property({ type: String, attribute: 'max-height' })
], SlAutocomplete.prototype, "maxHeight", void 0);
__decorate([
    property({ type: String, attribute: 'sync-width' })
], SlAutocomplete.prototype, "syncWidth", void 0);
__decorate([
    property({ type: Object, attribute: 'boundary' })
], SlAutocomplete.prototype, "boundary", void 0);
__decorate([
    property({ type: Array })
], SlAutocomplete.prototype, "selectedItems", void 0);
__decorate([
    property({ type: Array })
], SlAutocomplete.prototype, "selectedValues", void 0);
__decorate([
    property({ type: Boolean, attribute: 'auto-validate' })
], SlAutocomplete.prototype, "autoValidate", void 0);
__decorate([
    property({ type: Boolean })
], SlAutocomplete.prototype, "_autoValidate", void 0);
__decorate([
    property({ type: Boolean, attribute: 'expand-icon' })
], SlAutocomplete.prototype, "expandIcon", void 0);
__decorate([
    property({ type: String })
], SlAutocomplete.prototype, "selected", null);
__decorate([
    property({ type: String })
], SlAutocomplete.prototype, "selectedItem", null);
__decorate([
    property({ type: Boolean })
], SlAutocomplete.prototype, "open", null);
