import { LitElement } from 'lit';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import SlIconButton from '@shoelace-style/shoelace/dist/components/icon-button/icon-button.component.js';
/**
 * `etools-icon`
 *  Info icon element, on click will trigger tooltip open.
 *
 * @customElement
 * @demo demo/index.html
 */
export declare class EtoolsIconButton extends LitElement {
    name: string | undefined;
    src: string | undefined;
    label: string;
    library: string;
    href: string | undefined;
    target: '_blank' | '_parent' | '_self' | '_top' | undefined;
    download: string | undefined;
    disabled: boolean;
    slIconButton: SlIconButton;
    render(): import("lit-html").TemplateResult<1>;
    getUpdateComplete(): Promise<boolean>;
}
