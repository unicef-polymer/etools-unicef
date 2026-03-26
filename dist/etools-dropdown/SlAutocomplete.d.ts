import { LitElement, PropertyValues } from 'lit';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/tag/tag.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import '@shoelace-style/shoelace/dist/components/popup/popup.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import '../etools-button/etools-button';
import '../etools-icons/etools-icon';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
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
export declare class SlAutocomplete extends LitElement {
    static styles: import("lit").CSSResult[];
    searchInput: SlInput;
    private hasFocus;
    private loading;
    private _open;
    private search;
    private totalOptionsToShow;
    private language;
    private observerInfiniteScroll;
    private page;
    private prevPage;
    private prevSearch;
    private searchHasChanged;
    private pageHasChanged;
    private noMoreItemsToLoad;
    private collectingKeyboardKeysTimeout;
    private collectedKeyboardKeys;
    label: string | undefined;
    noLabelFloat: boolean | undefined;
    placeholder: string;
    searchPlaceholder: string;
    optionValue: string;
    optionLabel: string;
    required: boolean | undefined;
    errorMessage: string;
    disabled: boolean;
    readonly: boolean;
    invalid: boolean;
    noOptionsAvailableText: string;
    noResultsText: string;
    loadingText: string;
    options: any[];
    loadDataMethod: (search: string, page: number, shownOptionsLimit: number) => void;
    multiple: boolean;
    maxOptionsVisible: number;
    pill: boolean;
    size: string;
    filled: boolean;
    placement: string;
    helpText: any;
    clearable: boolean;
    hoist: boolean;
    hideSearch: boolean;
    preserveSearchOnClose: boolean;
    hideClose: boolean;
    enableNoneOption: boolean;
    noneOptionLabel: string;
    enableAddNew: boolean;
    addNewLabel: string;
    shownOptionsLimit: number;
    capitalize: boolean;
    transparent: boolean;
    minWidth: string;
    maxWidth: string;
    minHeight: string;
    maxHeight: string;
    syncWidth: boolean;
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
    boundary: Element | Element[] | HTMLElement | HTMLElement[] | undefined;
    selectedItems: any[];
    selectedValues: string[];
    autoValidate: boolean | undefined;
    _autoValidate: boolean;
    expandIcon: string;
    get selected(): any | null;
    set selected(value: any | null);
    get selectedItem(): any | null;
    set selectedItem(value: any | null);
    get open(): boolean;
    set open(value: boolean);
    render(): import("lit-html").TemplateResult<1>;
    constructor();
    connectedCallback(): void;
    preventDeselectByEnter(e: KeyboardEvent): void;
    renderMenuItem(option: any): import("lit-html").TemplateResult<1>;
    preventDeselectByClick(e: MouseEvent): void;
    disconnectedCallback(): void;
    updated(changedProperties: PropertyValues): void;
    restoreSelectedItemsIfNecessary(): void;
    handleKeyDown(e: KeyboardEvent): void;
    handleParentFocus(event: FocusEvent): void;
    handleFocusOut(event: FocusEvent): void;
    /**
     * Handle language change
     */
    private handleLanguageChange;
    /**
     * Register document event listeners
     */
    private addOpenListeners;
    private removeOpenListeners;
    /**
     * Dropdown input mouse down handler. Responsible to open the dropdown popup on input click
     */
    private handleComboboxMouseDown;
    /**
     * Document Mouse Down handler function. On document mouse down it is hiding the dropdown popup
     * @param event MouseEvent
     */
    private handleDocumentMouseDown;
    /**
     * Document Focus In handler function. On document focus in it is hiding the dropdown popup
     * @param event MouseEvent
     */
    private handleDocumentFocusIn;
    /**
     * Clear all click handler function.Will clear entire selection
     * @param event MouseEvent
     */
    private handleClearClick;
    /**
     * Clear all mouse down handler function. It is used to stop propagation to the elements
     * @param event MouseEvent
     */
    private handleClearMouseDown;
    /**
     * Tag remove handler function
     * @param option - Item that need to be removed
     */
    private handleTagRemove;
    /**
     * Clear all mouse down handler function. It is used to stop propagation to the elements
     * @param event MouseEvent
     */
    private handleTagMouseDown;
    /**
     * Trigger remove option event
     * @param item - Item that has been removed
     */
    private triggerRemovedOptionsEvent;
    /**
     * Trigger popup open event
     * @param boolean - If dialog is opened or closed
     */
    private triggerPopupOpenEvent;
    /**
     * Search change handler function
     * @param e SlInputEvent
     */
    private handleSearchChanged;
    /**
     * Getter used to return selected options values as a comma separated list.
     */
    private get selectedValueCommaList();
    /**
     * Getter used to return select options labels used to display in the select input display
     */
    private get selectedLabels();
    /**
     * Getter to return the list of options to show in the dropdown.
     * It is responsible to make loadDataMethod function call if defined and
     * to filter the options based on the search value
     */
    private get filteredOptions();
    private get noOptionsAvailable();
    private showNoSearchResultsWarning;
    /**
     * Check if we should show the "add new" option
     * Shows when enableAddNew is true, there's a search value, and no results are found
     * Also checks if the search value is already selected (to avoid duplicates)
     */
    private shouldShowAddNewOption;
    /**
     * Set selected options. Has logic to resolve multiple selections and single selection
     * @param option Option that has been selected
     */
    private setSelectedOption;
    /**
     * Set selected values using 'optionValue' from selectedItems and
     * triggers and also selection-changed event
     */
    private setSelectedValues;
    saveSelectedItemsToSessionStorage(selectedItems: any[]): void;
    getSelectedItemsFromSessionStorage(): any;
    /**
     * Clears selected options
     */
    clearSelection(): void;
    /**
     * Hide dropdown popup.
     */
    show(): void;
    /**
     * Show dropdown popup
     */
    hide(): void;
    /**
     * Function to check if a specific option has been selected.
     * It is checking if it is available in selectedItems by matching 'optionValue'
     * @param option - The option to check if it has been selected
     * @returns
     */
    isSelected(option: any): boolean;
    /**
     * Validate dropdown selection
     * @param selected
     * @returns {boolean}
     */
    validate(): boolean;
    /**
     * Reset invalid state
     */
    resetInvalidState(): boolean;
    /**
     * Responsbile to call loadDataMethod function if has been provided in order to fetch data directly from server
     * and to directly filter & search via API Requests
     * @param options - List of options currently available
     * @param search - Search value
     * @param loadDataMethod  - The load data method to call
     * @returns Existing options or empty list depending on some specific cases
     */
    private loadOptionsData;
    /**
     * Checks if an options contains a search string by first converting the 'optionLabel' and search value to lowercase
     * @param item - Item to check against
     * @returns Boolean
     */
    private itemContainsSearchString;
    /**
     * Function to disable infinite scroll functionality
     */
    private disableInfiniteScroll;
    /**
     * Function to enable infinite scroll functionality by adding a intersection observer.
     */
    private enableInfiniteScroll;
    /**
     * Function to set the number of options to show in dropdown based on the shown options limit and by
     * the infinite scroll trigger. Total options to show will increase when the list reaches the end of list
     * @returns
     */
    private showMoreOptions;
    /**
     * Checks if this dropdown is a child of etools-dialog and returns the etools-dialog element reference if any.
     */
    private getParentDialog;
    /**
     * Handle "add new" option click
     * Dispatches a custom event with the search value so parent can handle adding the new item
     */
    private handleAddNewClick;
}
