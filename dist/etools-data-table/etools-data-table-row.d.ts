import { LitElement } from 'lit';
import '../etools-collapse/etools-collapse';
/**
 * `etools-data-table-row`
 * @LitElement
 * @customElement
 * @extends {LitElement}
 * @demo demo/index.html
 */
export declare class EtoolsDataTableRow extends LitElement {
    detailsOpened: boolean;
    noCollapse: boolean;
    noAnimation: boolean;
    lowResolutionLayout: boolean;
    mediumResolutionLayout: boolean;
    render(): import("lit-html").TemplateResult<1>;
    static get properties(): {
        detailsOpened: {
            type: BooleanConstructor;
        };
        noCollapse: {
            type: BooleanConstructor;
            reflect: boolean;
            attribute: string;
        };
        noAnimation: {
            type: BooleanConstructor;
            attribute: string;
        };
        lowResolutionLayout: {
            type: BooleanConstructor;
            reflect: boolean;
            attribute: string;
        };
        mediumResolutionLayout: {
            type: BooleanConstructor;
            reflect: boolean;
            attribute: string;
        };
    };
    constructor();
    _toggleRowDetails(): void;
    _callClickOnSpace(event: any): void;
}
