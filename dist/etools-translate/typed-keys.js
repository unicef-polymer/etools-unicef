import { translateConfig } from './config';
import { get } from './util';
import { translate } from './directives/translate';
import { translateUnsafeHTML } from './directives/translate-unsafe-html';
/**
 * A factory function that wraps get, translate and translateUnsafeHTML to make the keys typesafe.
 */
export function typedKeysFactory() {
    return {
        get(key, values, config = translateConfig) {
            return get(key, values, config);
        },
        translate(key, values, config) {
            return translate(key, values, config);
        },
        translateUnsafeHTML(key, values, config) {
            return translateUnsafeHTML(key, values, config);
        }
    };
}
