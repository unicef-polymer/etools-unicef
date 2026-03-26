import { ITranslateConfig, Key, Values, ValuesCallback } from '../types';
import { LangChangedDirectiveBase } from './lang-changed-base';
/**
 * A lit directive that updates the translation when the language changes.
 */
export declare class TranslateDirective extends LangChangedDirectiveBase {
    render<T extends Key>(key: T, values?: Values | ValuesCallback | null, config?: ITranslateConfig): unknown;
}
export declare const translate: (key: string, values?: Values | ValuesCallback | null | undefined, config?: ITranslateConfig | undefined) => import("lit-html/directive").DirectiveResult<typeof TranslateDirective>;
