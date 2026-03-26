import { LitElement } from 'lit';
import '../etools-icons/etools-icon';
/**
 * `etools-data-table-header`
 * @LitElement
 * @customElement
 * @extends {LitElement}
 * @demo demo/index.html
 */
export declare class EtoolsDataTableHeader extends LitElement {
    private _sortOrder;
    _lastSelectedCol: any;
    noTitle: boolean;
    noCollapse: boolean;
    label: string;
    lowResolutionLayout: boolean;
    mediumResolutionLayout: boolean;
    set sortOrder(sortOrder: any);
    get sortOrder(): any;
    render(): import("lit-html").TemplateResult<1>;
    static get is(): string;
    connectedCallback(): void;
    disconnectedCallback(): void;
    _handleSortChanged(e: any): void;
    _sortOrderChanged(sortOrder: any): void;
    _clearSelected(column: any): void;
}
