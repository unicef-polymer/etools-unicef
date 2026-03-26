import { ITranslateConfig, Key, Values, ValuesCallback } from '../types';
import { TranslateDirective } from './translate';
/**
 * A lit directive that updates the translation as HTML when the language changes.
 */
export declare class TranslateUnsafeHTMLDirective extends TranslateDirective {
    render<T extends Key>(key: T, values?: Values | ValuesCallback | null, config?: ITranslateConfig): unknown;
}
export declare const translateUnsafeHTML: (key: string, values?: Values | ValuesCallback | null | undefined, config?: ITranslateConfig | undefined) => import("lit-html/directive").DirectiveResult<typeof TranslateUnsafeHTMLDirective>;
