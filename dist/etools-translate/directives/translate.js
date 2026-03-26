import { directive } from 'lit/directive.js';
import { get } from '../util';
import { LangChangedDirectiveBase } from './lang-changed-base';
/**
 * A lit directive that updates the translation when the language changes.
 */
export class TranslateDirective extends LangChangedDirectiveBase {
    render(key, values, config) {
        return this.renderValue(() => get(key, values, config));
    }
}
export const translate = directive(TranslateDirective);
