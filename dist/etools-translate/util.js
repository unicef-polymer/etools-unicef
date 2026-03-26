import { extract } from './helpers';
import { translateConfig } from './config';
export const LANG_CHANGED_EVENT = 'langChanged';
/**
 * Dispatches a language changed event.
 * @param detail
 */
export function dispatchLangChanged(detail) {
    window.dispatchEvent(new CustomEvent(LANG_CHANGED_EVENT, { detail }));
}
/**
 * Listens for changes in the language.
 * Returns a method for unsubscribing from the event.
 * @param callback
 * @param options
 */
export function listenForLangChanged(callback, options) {
    const handler = (e) => callback(e.detail);
    window.addEventListener(LANG_CHANGED_EVENT, handler, options);
    return () => window.removeEventListener(LANG_CHANGED_EVENT, handler);
}
/**
 * Sets a new current language and dispatches a global language changed event.
 * The strings will be shallow merged together.
 * @param lang
 * @param config
 */
export async function use(lang, config = translateConfig) {
    // Load the translations and set the cache
    const strings = await config.loader(lang, config);
    // Update the config with new information
    config.translationCache = {};
    config.strings = strings;
    config.lang = lang;
    // Dispatch global language changed event while setting the new values
    dispatchLangChanged({ lang, strings, config });
}
/**
 * Translates a key and interpolates if values are defined.
 * Uses the current strings and translation cache to fetch the translation.
 * @param key (eg. "common.get_started")
 * @param values (eg. { count: 42 })
 * @param config
 */
export function get(key, values, config = translateConfig) {
    var _a;
    // Either use the translation from the cache or get it and add it to the cache
    const translation = (_a = config.translationCache[key]) !== null && _a !== void 0 ? _a : (config.translationCache[key] = config.lookup(key, config) || config.empty(key, config));
    // Extract the values
    values = values != null ? extract(values) : null;
    // Interpolate the values and return the translation
    return values != null ? config.interpolate(translation, values, config) : translation;
}
