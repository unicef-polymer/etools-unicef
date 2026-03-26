import { LitElement } from 'lit';
/**
 * @customElement
 * @polymer
 */
export declare class TimeInput extends LitElement {
    private _value;
    private _hoursInput;
    private _minutesInput;
    set value(value: string | null | undefined);
    get value(): string | null | undefined;
    readonly: boolean;
    required: boolean;
    disabled: boolean;
    autoValidate: boolean;
    set hoursInput(hoursInput: string | undefined);
    get hoursInput(): string | undefined;
    set minutesInput(minutesInput: string | undefined);
    get minutesInput(): string | undefined;
    label: string;
    invalid: boolean;
    hideIcon: boolean;
    errorMessage: string;
    noLabelFloat: boolean | undefined;
    render(): import("lit-html").TemplateResult<1>;
    constructor();
    _valueChanged(newValue: any): void;
    computeTime(hours: any, minutes: any): void;
    _formatHour(): void;
    _formatMinutes(): void;
    _isValidHours(): boolean;
    _isValidMinutes(): boolean;
    _clearData(): void;
    validate(): boolean;
}
