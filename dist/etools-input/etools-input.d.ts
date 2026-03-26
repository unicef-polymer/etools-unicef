import '@shoelace-style/shoelace/dist/components/input/input.js';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import { EtoolsInputBase } from './etools-input-base';
import '../etools-icons/etools-icon';
export declare class EtoolsInput extends EtoolsInputBase {
    slInput: SlInput;
    /**
     * Disable shoelace internal input interaction/input. Mark internal input as readonly while keeping
     * standard shoelace input styles and functionalities. Used by datepicker at this point.
     */
    preventUserDirectInput: boolean;
    static get styles(): import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
    protected updated(_changedProperties: any): void;
    hideReadonlyText(): boolean;
    validate(): boolean;
    focus(): void;
}
