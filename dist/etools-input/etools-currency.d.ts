import './etools-input';
import { EtoolsInputBase } from './etools-input-base';
import { EtoolsInput } from './etools-input';
/**
 * `etools-currency`
 *
 * A shoelace-input element that allows only currency amount values (US format). It accepts only digits, comma, a
 * a single floating point (period), and allows 2 decimals. The maximum number you can have 12 digits until
 * floating point.
 * The value displayed it's shoelace-input's internal value. The `value` property of this element will update and format
 * the internal value and when internal value is changed, element's value will be updated with current float value.
 *
 * ### Usage
 * ```html
 * <etools-currency label="Amount value"
 * value="[[value]]" currency="$"></etools-currency>
 * ```
 *
 * ### Style
 *
 * Use CSS properties and mixin of shoelace-input to style the element or:
 *
 * `--etools-currency` | Mixin applied to currency element | `{}`
 *
 * @customElement
 * @lit
 * @appliesMixin EtoolsCurrency
 */
export declare class EtoolsCurrency extends EtoolsInputBase {
    value: number | null;
    currency: string;
    noOfDecimals: number;
    noOfSignificantDigits: number;
    onCurrencyChange: ((event: any) => any) | undefined;
    private internalValue;
    etoolsInput: EtoolsInput;
    render(): import("lit-html").TemplateResult<1>;
    get inputElement(): import("@shoelace-style/shoelace/dist/components/input/input.component").default;
    get nativeInput(): HTMLInputElement | null | undefined;
    protected updated(_changedProperties: any): void;
    validate(): boolean;
    _getStrValue(value: number): string;
    _onValueChange(value: any): void;
    _restoreDamagedInternalValue(value: any, oldValue: any): void;
    /**
     * Internal value changed, needs to be checked and changed to US currency format
     */
    _onInternalValueChange(value: any, oldValue: any): void;
    /**
     * Update element value with the float value of internalValue
     */
    _setExternalValue(value: any, preserveFloatingPoint: any): void;
    _formatValue(value: any): any;
    _getCaretPosition(oField: any): number;
    _getUpdatedCursorPosition(value: any, oldValue: any, cursorPos: any): any;
    _updateElementInternalValue(value: any, oldValue: any): void;
    _updateValueAndPreserveCaretPosition(value: any, oldValue: any): void;
    _applyCurrencyAmountFormat(value: any): string;
    _getValueWithoutFormat(value: any, decimalsNr?: any, needsStrValue?: any): any;
    _emptyValue(value: any): boolean;
    _getRealNumberValue(value: any, decimals?: any): number | null;
    _onKeyDown(e: any): void;
    _onBlur(): void;
    _onFocus(_e: any): void;
}
