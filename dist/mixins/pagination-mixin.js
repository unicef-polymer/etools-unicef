import { __decorate } from "tslib";
import { property } from 'lit/decorators.js';
const DEFAULT_LIST_SIZE = 10;
class Paginator {
    constructor() {
        this.page = 1;
        this.page_size = 10;
        this.count = null;
        this.visible_range = [0, 0];
    }
}
function PaginationMixin(baseClass) {
    class PaginationClass extends baseClass {
        constructor() {
            super(...arguments);
            this._paginator = new Paginator();
            this._prevLocalName = '';
        }
        get paginator() {
            return this._paginator;
        }
        set paginator(newVal) {
            this._paginator = {
                ...newVal,
                visible_range: this.getVisibleRange(newVal.page_size, newVal.page, newVal.count)
            };
            this.paginatorChanged();
        }
        set pageSize(pageSize) {
            this.resetPageNumber();
            this.paginator = Object.assign({}, this.paginator, {
                page_size: pageSize
            });
        }
        getVisibleRange(pageSize, page, count) {
            if (!count) {
                return [0, 0];
            }
            const from = (page - 1) * pageSize;
            const to = from + pageSize;
            if (from > count) {
                return [0, 0];
            }
            return [from + 1, Math.min(to, count)];
        }
        pageSizeChanged(e) {
            this.resetPageNumber();
            this.setPageSize(parseInt(e.detail.value, 10));
        }
        pageNumberChanged(e) {
            this.setPageNumber(parseInt(e.detail.value, 10));
        }
        visibleRangeChanged(e) {
            this.paginator = Object.assign({}, this.paginator, {
                visible_range: e.detail.value
            });
        }
        getRequestPaginationParams() {
            return {
                page: this.paginator.page,
                page_size: this.paginator.page_size
            };
        }
        updatePaginatorTotalResults(reqResponse) {
            if (reqResponse && reqResponse.count) {
                const count = parseInt(reqResponse.count, 10);
                if (!isNaN(count)) {
                    this.paginator = Object.assign({}, this.paginator, { count: count });
                    this._pageInsidePaginationRange(this.paginator.page, this.paginator.count);
                    return;
                }
            }
            this.paginator = Object.assign({}, this.paginator, { count: 0 });
            this._pageInsidePaginationRange(this.paginator.page, this.paginator.count);
        }
        setPageSize(size) {
            this.paginator = Object.assign({}, this.paginator, { page_size: size });
        }
        setPageNumber(page) {
            this.paginator = Object.assign({}, this.paginator, { page: page });
            this._pageInsidePaginationRange(this.paginator.page, this.paginator.count);
        }
        resetPageNumber() {
            this.setPageNumber(1);
        }
        setPaginationDataFromUrlParams(urlParams) {
            this.setPageNumber(urlParams.page ? parseInt(urlParams.page) : 1);
            this.setPageSize(urlParams.size ? parseInt(urlParams.size) : DEFAULT_LIST_SIZE);
        }
        _pageInsidePaginationRange(page, total) {
            if (page < 1) {
                this.resetPageNumber();
            }
            if (total === null) {
                return;
            }
            const lastPageNr = this._getLastPageNr(this.paginator.page_size, total);
            if (page > lastPageNr) {
                // page is bigger than last page number (possible by modifying url page param)
                // set page to last available page
                this.setPageNumber(lastPageNr);
            }
        }
        _getLastPageNr(pageSize, total) {
            return pageSize < total ? Math.ceil(total / pageSize) : 1;
        }
        paginatorChanged() {
            if (this._prevLocalName !== this.localName) {
                console.warn(this.localName, ' / pagination-mixin / paginatorChanged not implemented!');
                this._prevLocalName = this.localName;
            }
        }
    }
    __decorate([
        property({ type: Object })
    ], PaginationClass.prototype, "paginator", null);
    return PaginationClass;
}
export default PaginationMixin;
