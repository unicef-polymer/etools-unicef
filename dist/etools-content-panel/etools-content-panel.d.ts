import { LitElement } from 'lit';
import '../etools-icon-button/etools-icon-button';
import '../etools-collapse/etools-collapse';
/**
 * `etools-content-panel`
 * A simple panel with header to display a collapsible content.
 *
 * ### Styling
 *
 * You can use defined variables and css shadow parts to change panel style.
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--ecp-header-height` | Header height | `48px`
 * `--ecp-header-bg` | Header background color | `#0099ff`
 * `--ecp-header-color` | Header color | `#ffffff`
 * `etools-content-panel::part(ecp-header)` | CSS Shadow Part applied to header | `{}`
 * `etools-content-panel::part(ecp-toggle-btn)` | CSS Shadow Part applied to expand content button | `{}`
 * `etools-content-panel::part(ecp-header-title)` | CSS Shadow Part applied to the header title | `{}`
 * `etools-content-panel::part(ecp-header-btns-wrapper)`
 *        | CSS Shadow Part appplied to panel header right btns container
 *        | `{}`
 * `etools-content-panel::part(ecp-content)` | CSS Shadow Part applied to content | `{}`
 * `--ecp-content-bg-color` | Content Header color | `#ffffff`
 * `etools-content-panel::part(ecp-header):disabled` | CSS Shadow Part applied in disabled state | `{}`
 * `--ecp-content-padding` | CSS Shadow Part applied to content |  `8px 24px 16px 24px`
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
export declare class EtoolsContentPanel extends LitElement {
    panelTitle: string;
    elevation: number;
    open: boolean;
    noHeader: boolean;
    disabled: boolean;
    showExpandBtn: boolean;
    static get styles(): import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
    constructor();
    _toggle(): void;
    _getExpandBtnIcon(open: any): "expand-more" | "chevron-right";
}
