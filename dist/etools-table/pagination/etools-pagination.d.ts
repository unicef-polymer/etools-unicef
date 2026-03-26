import { LitElement } from 'lit';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import '../../etools-icon-button/etools-icon-button';
export declare const defaultPaginator: {
    page: number;
    page_size: number;
    total_pages: number;
    count: number;
    visible_range: any[];
};
export type EtoolsPaginator = typeof defaultPaginator;
export declare const setPaginator: (paginator: EtoolsPaginator, data: any) => void;
export declare const getPaginatorWithBackend: (currentPaginator: EtoolsPaginator, count: number | string) => {
    page: number;
    page_size: number;
    total_pages: number;
    count: number;
    visible_range: any[];
};
export declare const getPagedData: (currentPaginator: EtoolsPaginator, data: any[]) => any[];
/**
 * TODO: add some page btns between page navigation controls
 * @customElement
 * @LitElement
 */
export declare class EtoolsPagination extends LitElement {
    static get styles(): import("lit").CSSResult[];
    paginator: EtoolsPaginator;
    pageSizeOptions: number[];
    language: string;
    direction: string;
    syncQueryParams: boolean;
    constructor();
    initializeProperties(): void;
    render(): import("lit-html").TemplateResult<1>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    handleLanguageChange(e: any): void;
    goToFirstPage(): void;
    goToLastPage(): void;
    pageLeft(): void;
    pageRight(): void;
    onPageSizeChanged(e: any): void;
    firePaginatorChangeEvent(paginatorData: Partial<EtoolsPaginator>): void;
    updateUrlQueryParams(paginator: EtoolsPaginator): void;
    updateFromQueryParams(): void;
}
