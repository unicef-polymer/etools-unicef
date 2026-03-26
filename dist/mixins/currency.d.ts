import { Constructor } from '../utils/types';
/**
 * Currency amount input. US format only.
 * @polymer
 * @mixinFunction
 */
export declare function EtoolsCurrency<T extends Constructor<any>>(baseClass: T): {
    new (...args: any[]): {
        [x: string]: any;
        /**
         * Format value as currency amount. Delimited used ', '
         */
        addCurrencyAmountDelimiter(value?: any): any;
        /**
         * Format value as currency amount and return it to be displayed
         * Use this to display readonly currency amounts on interface
         */
        displayCurrencyAmount(value?: any, placeholder?: any, noOfDecimals?: any): any;
    };
} & T;
