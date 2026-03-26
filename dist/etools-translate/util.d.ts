import { ITranslateConfig, Key, LangChangedEvent, LangChangedSubscription, LanguageIdentifier, Translation, Values, ValuesCallback } from './types';
export declare const LANG_CHANGED_EVENT = "langChanged";
/**
 * Dispatches a language changed event.
 * @param detail
 */
export declare function dispatchLangChanged(detail: LangChangedEvent): void;
/**
 * Listens for changes in the language.
 * Returns a method for unsubscribing from the event.
 * @param callback
 * @param options
 */
export declare function listenForLangChanged(callback: (e: LangChangedEvent) => void, options?: AddEventListenerOptions): LangChangedSubscription;
/**
 * Sets a new current language and dispatches a global language changed event.
 * The strings will be shallow merged together.
 * @param lang
 * @param config
 */
export declare function use(lang: LanguageIdentifier, config?: ITranslateConfig): Promise<void>;
/**
 * Translates a key and interpolates if values are defined.
 * Uses the current strings and translation cache to fetch the translation.
 * @param key (eg. "common.get_started")
 * @param values (eg. { count: 42 })
 * @param config
 */
export declare function get<T extends Key>(key: T, values?: Values | ValuesCallback | null, config?: ITranslateConfig): Translation;
