import { LangChangedDirectiveBase } from './lang-changed-base';
/**
 * A lit directive that reacts when the language changes and renders the getValue callback.
 */
export declare class LangChangedDirective extends LangChangedDirectiveBase {
    render(getValue: () => unknown): unknown;
}
export declare const langChanged: (getValue: () => unknown) => import("lit-html/directive").DirectiveResult<typeof LangChangedDirective>;
