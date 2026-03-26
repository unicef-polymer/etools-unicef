import { LitElement } from 'lit';
import '@shoelace-style/shoelace/dist/components/radio/radio.js';
export declare class EtoolsRadio extends LitElement {
    value?: string;
    size: 'small' | 'medium' | 'large';
    form: string | undefined;
    disabled?: boolean;
    render(): import("lit-html").TemplateResult<1>;
    protected createRenderRoot(): any;
}
