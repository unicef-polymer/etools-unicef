import { LitElement } from 'lit';
import '../etools-icons/etools-icon.js';
import '@shoelace-style/shoelace/dist/components/switch/switch.js';
import '../etools-button/etools-button.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '../etools-dropdown/etools-dropdown-multi.js';
import '../etools-dropdown/etools-dropdown.js';
import '../etools-input/etools-input.js';
import '../etools-date-time/datepicker-lite.js';
import '../etools-loading/etools-loading.js';
import { Callback } from '@unicef-polymer/etools-types';
import { SlSelectEvent } from '@shoelace-style/shoelace/dist/events/sl-select';
export declare enum EtoolsFilterTypes {
    Search = 0,
    Dropdown = 1,
    DropdownMulti = 2,
    Toggle = 3,
    Date = 4
}
export interface EtoolsFilter {
    filterName: string | Callback;
    translationKey?: string;
    filterKey: string;
    type: EtoolsFilterTypes;
    selected: boolean;
    selectedValue: any;
    disabled?: boolean;
    selectionOptions?: any[];
    minWidth?: string;
    hideSearch?: boolean;
    optionValue?: string;
    optionLabel?: string;
    loadDataDropdownOptions?: (search: string, page: number, shownOptionsLimit: number) => void;
}
export declare class EtoolsFilters extends LitElement {
    filters: EtoolsFilter[];
    /** Set this to true if the Loading... overlay should be displayed over the page,
     *  not just over the etools-filter component */
    filterLoadingAbsolute: boolean;
    textClearAll: string;
    textFilters: string;
    language: string;
    lastSelectedValues: any;
    constructor();
    handleLanguageChange(e: CustomEvent): void;
    static get styles(): import("lit").CSSResult[];
    getSearchTmpl(f: EtoolsFilter): import("lit-html").TemplateResult<1>;
    getDropdownTmpl(f: EtoolsFilter): import("lit-html").TemplateResult<1>;
    getDropdownMultiTmpl(f: EtoolsFilter): import("lit-html").TemplateResult<1>;
    getDateTmpl(f: EtoolsFilter): import("lit-html").TemplateResult<1>;
    getToggleTmpl(f: EtoolsFilter): import("lit-html").TemplateResult<1>;
    selectedFiltersTmpl(filters: EtoolsFilter[]): any[] | import("lit-html").TemplateResult<1>;
    filterMenuOptions(filters: EtoolsFilter[]): any[];
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    setDefaultLastSelectedValues(): void;
    clearAllFilters(): void;
    selectFilter(e: SlSelectEvent): void;
    getFilterEmptyValue(filterType: EtoolsFilterTypes): false | "" | never[] | null;
    getFilterOption(filterElement: HTMLElement): EtoolsFilter;
    textInputChange(e: CustomEvent): void;
    filterSelectionChange(e: CustomEvent): void;
    filterMultiSelectionChange(e: CustomEvent): void;
    afterFilterChange(): void;
    filterDateChange(e: CustomEvent): void;
    filterToggleChange(e: CustomEvent): void;
    updateFilters(filterValues: any): void;
    fireFiltersChangeEvent(): void;
    getAllFiltersAndTheirValues(): any;
    getSelectedFiltersAndTheirValues(): any;
}
