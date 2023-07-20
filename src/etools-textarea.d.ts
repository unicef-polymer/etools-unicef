import { LitElement } from 'lit-element';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import SlTextarea from '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import '@unicef-polymer/etools-info-tooltip/info-icon-tooltip';
export declare class EtoolsTextarea extends LitElement {
    label: string;
    pattern: string;
    placeholder: string;
    private _value;
    get value(): string;
    set value(val: string);
    required: boolean;
    readonly: boolean;
    errorMessage: string;
    infoIconMessage: string;
    charCounter: boolean;
    charCount: number;
    rows: number;
    maxlength: number;
    slTextarea: SlTextarea;
    static get styles(): import("lit-element").CSSResult[];
    render(): import("lit-element").TemplateResult;
    connectedCallback(): void;
    getInfoIconTemplate(): import("lit-element").TemplateResult;
    validate(): boolean;
}
