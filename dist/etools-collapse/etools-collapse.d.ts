import { LitElement, PropertyValues } from 'lit';
/**
 * `etools-collapse`
 * A collapsable element

 * @customElement
 * @polymer
 * @demo demo/index.html
 */
export declare class EtoolsCollapse extends LitElement {
    /**
     * Set opened to true to show the collapse element and to false to hide it.
     */
    opened: boolean;
    /**
     * Set noAnimation to true to disable animations.
     */
    noAnimation: boolean;
    private _desiredSize;
    private _timeout?;
    render(): import("lit-html").TemplateResult<1>;
    constructor();
    firstUpdated(): void;
    updated(changedProperties: PropertyValues<this>): void;
    toggle(): void;
    prepareBeforeToggle(): void;
    setDesiredSize(value: any): void;
    getSlotContent(): Element;
    _calcSize(): string;
}
