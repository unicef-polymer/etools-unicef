import { LitElement } from 'lit-element';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.js';
export declare class EtoolsInput extends LitElement {
    label: string;
    pattern: string;
    placeholder: string;
    value: string;
    required: boolean;
    readonly: boolean;
    errorMessage: string;
    slInput: SlInput;
    static get styles(): import("lit-element").CSSResult[];
    render(): import("lit-element").TemplateResult;
    connectedCallback(): void;
    validate(): boolean;
}
