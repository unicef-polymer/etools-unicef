import { LitElement } from 'lit';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import '../etools-icon-button/etools-icon-button';
import '../etools-icons/etools-icon';
/**
 * `etools-data-table-footer`
 * @LitElement
 * @customElement
 * @extends {LitElement}
 * @demo demo/index.html
 */
export declare class EtoolsDataTableFooter extends LitElement {
    private _totalResults;
    private _pageNumber;
    private _pageSize;
    language: string;
    direction: string;
    pageSizeOptions: any[];
    totalPages: number;
    visibleRange: any[];
    doNotShow: boolean;
    lowResolutionLayout: boolean;
    rowsPerPageText: string;
    syncQueryParams: boolean;
    get pageSize(): any;
    set pageSize(pageSize: any);
    get pageNumber(): any;
    set pageNumber(pageNumber: any);
    get totalResults(): any;
    set totalResults(totalResults: any);
    render(): import("lit-html").TemplateResult<1>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    handleLanguageChange(e: any): void;
    constructor();
    initializeProperties(): void;
    _pageLeft(): void;
    _pageRight(): void;
    _firstPage(): void;
    _lastPage(): void;
    _computeTotalPages(pageSize: any, totalResults: any): void;
    _computeVisibleRange(pageNumber: any, pageSize: any, totalResults: any, totalPages: any): void;
    _pageBackDisabled(pageNumber: any): boolean;
    _pageForwardDisabled(pageNumber: any, totalPages: any): boolean;
    _hideFooter(totalResults: any): void;
    _dispatchEvent(eventName: any, eventValue: any): void;
    _selectRowsPerPage(e: any): void;
    _openRowsPerPageDropdown(): void;
    _closeRowsPerPageDropdown(): void;
    _updateQueryParam(key: string, value: any): void;
    _updateFromQueryParams(): void;
}
