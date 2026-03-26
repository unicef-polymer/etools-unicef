import { LitElement } from 'lit';
import '../etools-icons/etools-icon';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
/**
 * `etools-info-tooltip`
 * Tooltip element associated with form elements (or any other element), an icon is used to trigger tooltip open.
 *
 * @polymer
 * @customElement
 * @demo demo/index.html
 */
export declare class EtoolsInfoTooltip extends LitElement {
    render(): import("lit-html").TemplateResult<1>;
    position: string;
    icon: string;
    customIcon: boolean;
    hideTooltip: boolean;
    importantWarning: boolean;
    theme: string;
    /**
     * Used to align tooltip icon near a paper-input or a form input that uses paper-input-container
     */
    formFieldAlign: boolean;
    tooltipHandler: any;
    offset: number;
    hoist: boolean;
    language: string;
    get readingOrderConvertedPosition(): string;
    private _openOnClick;
    set openOnClick(val: boolean);
    get openOnClick(): boolean;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    _handleLanguageChange(e: any): void;
    _refreshStyles(importantWarning: any): void;
    _openOnClickChanged(openOnClick: any): void;
    _addClickEventListeners(): void;
    _removeClickEventListeners(): void;
    _openTooltip(): void;
    _closeTooltip(): void;
}
