import { Constructor } from '@unicef-polymer/etools-types';
declare class Paginator {
    page: number;
    page_size: number;
    count: number | null;
    visible_range: string[] | number[];
}
declare function PaginationMixin<T extends Constructor<any>>(baseClass: T): {
    new (...args: any[]): {
        [x: string]: any;
        _paginator: Paginator;
        _prevLocalName: string;
        paginator: Paginator;
        pageSize: number;
        getVisibleRange(pageSize: number, page: number, count: number | null): number[];
        pageSizeChanged(e: CustomEvent): void;
        pageNumberChanged(e: CustomEvent): void;
        visibleRangeChanged(e: CustomEvent): void;
        getRequestPaginationParams(): {
            page: number;
            page_size: number;
        };
        updatePaginatorTotalResults(reqResponse: any): void;
        setPageSize(size: number): void;
        setPageNumber(page: number): void;
        resetPageNumber(): void;
        setPaginationDataFromUrlParams(urlParams: any): void;
        _pageInsidePaginationRange(page: number, total: number | null): void;
        _getLastPageNr(pageSize: number, total: number): number;
        paginatorChanged(): void;
    };
} & T;
export default PaginationMixin;
