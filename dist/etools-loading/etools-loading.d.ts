import { LitElement } from 'lit';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
/**
 * `etools-loading`
 *
 * Loading spinner.

 * You can use this loading element:
 * - with an overlay: the loading spinner, message and overlay will be shown over your content area;
 * - simple, no overlay: the loading spinner and the message will be displayed inline-block.
 *
 * ### Styling
 *
 * You can use defined variables for styling.
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--etools-loading-overlay-transparency` | Overlay transparency | `0.6`
 * `--etools-loading-msg-color` | Loading message color | `#333333`
 * `--etools-loading-spinner-size` | Spinner size (width & height) | `20px`
 * `--etools-loading-bg-color` | Background color | `#ffffff`
 * `--etools-loading-border-color` | Border color | `#dedede`
 * `--etools-loading-shadow-color` | Shadow color | `#333333`
 * `etools-loading::part(container)` | CSS Shadow Part applied to loading container | `{}`
 * `etools-loading::part(message)` | CSS Shadow Part applied to loading message | `{}`

 * To change spinner colors use sl-spinner styling variables([sl-spinner docs]
 * (https://shoelace.style/components/spinner))
 *
 * @extends HTMLElement
 * @polymer
 * @customElement
 * @demo demo/index.html
 */
export declare class EtoolsLoading extends LitElement {
    private _active;
    messages: string[];
    set active(val: boolean);
    get active(): boolean;
    loadingText?: string;
    defaultLoadingText: string;
    language: string;
    render(): import("lit-html").TemplateResult<1>;
    constructor();
    connectedCallback(): Promise<void>;
    disconnectedCallback(): void;
    handleLanguageChange(e: any): void;
    _loadingStateChanged(active: any): void;
}
