import { LitElement } from 'lit';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import SlIcon from '@shoelace-style/shoelace/dist/components/icon/icon.component.js';
/**
 * `etools-icon`
 *  Info icon element, on click will trigger tooltip open.
 *
 * @customElement
 * @demo demo/index.html
 */
export declare class EtoolsIcon extends LitElement {
    render(): import("lit-html").TemplateResult<1>;
    name: string | undefined;
    src: string | undefined;
    label: string;
    library: string;
    slIcon: SlIcon;
    getUpdateComplete(): Promise<boolean>;
}
