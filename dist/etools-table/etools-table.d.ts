import '../etools-icon-button/etools-icon-button';
import '../etools-icons/etools-icon';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import { LitElement, TemplateResult } from 'lit';
import './pagination/etools-pagination';
import { EtoolsPaginator } from './pagination/etools-pagination';
export type EtoolsTableColumn = {
    label?: string | (() => TemplateResult<1>);
    name?: string;
    type?: string;
    sort?: string | boolean;
    link_tmpl?: string;
    isExternalLink?: string;
    capitalize?: boolean;
    placeholder?: string;
    customMethod?: any;
    sortMethod?: string;
    cssClass?: string;
};
export type EtoolsTableChildRow = {
    rowHTML?: any;
    showExpanded?: boolean;
};
export declare enum EtoolsTableColumnType {
    Text = "Text",
    Date = "Date",
    Link = "Link",
    Number = "Number",
    Checkbox = "Checkbox",
    Custom = "Custom"
}
export declare enum EtoolsTableColumnSort {
    Asc = "asc",
    Desc = "desc"
}
export declare enum EtoolsTableActionType {
    Edit = "Edit",
    Delete = "Delete",
    Copy = "Copy",
    View = "View"
}
export declare class EtoolsTable extends LitElement {
    static get styles(): import("lit").CSSResult[];
    dateFormat: string;
    showEdit: boolean;
    showDelete: boolean;
    showCopy: boolean;
    showView: boolean;
    caption: string;
    actionsLabel: string;
    columns: any[];
    items: any[];
    paginator: EtoolsPaginator | undefined;
    defaultPlaceholder: string;
    getChildRowTemplateMethod: ((item: any) => any) | undefined;
    setRowActionsVisibility: ((item: any) => any) | undefined;
    customData: any;
    showChildRows: boolean;
    extraCSS: any;
    singleSort: boolean;
    render(): TemplateResult<1>;
    getColumnHtml(column: any): TemplateResult<1>;
    getColumnHtmlWithSort(column: any): TemplateResult<1>;
    getLinkTmpl(pathTmpl: string, item: any, key: string, isExternalLink: boolean): TemplateResult<1>;
    getRowDataHtml(item: any, showEdit: boolean, customData: any): TemplateResult<1>;
    getChildRowTemplate(item: any): any;
    getRowActionsTmpl(item: any): TemplateResult<1>;
    get paginationHtml(): TemplateResult<1>;
    showCaption(caption?: string): boolean;
    getColumnClassList(column: any): string;
    columnHasSort(sort: string): boolean;
    getSortIcon(sort: string): "arrow-upward" | "arrow-downward";
    getExpandIcon(expanded: boolean): "expand-more" | "chevron-right";
    toggleChildRow(ev: any): void;
    callClickOnSpace(event: any): boolean;
    getColumnDetails(name: string): any;
    getRowDataColumnClassList(column: any): any;
    getColumnsKeys(): any[];
    getItemValue(item: any, column: any, showEdit: boolean, customData: any): any;
    _getCheckbox(item: any, key: string, showEdit: boolean): TemplateResult<1>;
    _getValueByKey(item: any, key: string, placeholder: string, ignorePlaceholder?: boolean): any;
    showRowActions(): boolean | ((item: any) => any);
    triggerAction(type: string, item: any): void;
    toggleAndSortBy(column: any): void;
    toggleColumnSort(sort: string): EtoolsTableColumnSort;
    triggerItemChanged(item: any, field: string, filedValue: any): void;
}
