import { LitElement } from 'lit';
import '../etools-icons/etools-icon';
/**
 * `etools-data-table-column`
 * @LitElement
 * @customElement
 * @extends {LitElement}
 * @demo demo/index.html
 */
export declare class EtoolsDataTableColumn extends LitElement {
    selected: boolean;
    direction: string;
    field: string;
    render(): import("lit-html").TemplateResult<1>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    _sort(): void;
}
