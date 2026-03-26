import { LitElement } from 'lit';
/**
 * `etools-media-query` component detects when a media query is true or false
 *
 * @customElement
 */
export declare class EtoolsMediaQuery extends LitElement {
    render(): import("lit-html").TemplateResult<1>;
    query: string;
    queryMatches: boolean;
    constructor();
    firstUpdated(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    handleResize(): void;
}
