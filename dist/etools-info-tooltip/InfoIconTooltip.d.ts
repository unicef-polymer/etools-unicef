import { LitElement } from 'lit';
import '../etools-icons/etools-icon';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
/**
 * `info-icon-tooltip`
 *  Info icon element, on click will trigger tooltip open.
 *
 * @customElement
 * @demo demo/index.html
 */
export declare class InfoIconTooltip extends LitElement {
    static get styles(): import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
    tooltipText: string;
    tooltipHtml: any;
    position: string;
    offset: string | number;
    language: string;
    private _tooltipHandler;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    handleLanguageChange(e: any): void;
    showTooltip(e: any): void;
    /**
     * stopImmediatePropagation stops dropdown openning also when this component is inside it.
     * Conditional stopping of propagation is for timing issues, when this method executes before showTooltip.
     */
    hideTooltip(e: any): void;
    /**
     * Avoid 2 clicks needed to open a second info tooltip
     */
    clickedOnOtherInfoIcon(path: any): boolean;
    close(e: any): void;
    _isInPath(path: any, propertyName: any, elementName: any): boolean;
    callClickOnEnterPushListener(htmlElement: any): void;
}
