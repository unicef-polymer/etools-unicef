import { ITranslateConfig, Key, Values, ValuesCallback } from './types';
/**
 * Interpolates the values into the string using the {{ key }} syntax.
 * @param text
 * @param values
 * @param config
 */
export declare function interpolate(text: string, values: Values | ValuesCallback | null, _config: ITranslateConfig): string;
/**
 * Returns a string based on a chain of keys using the dot notation.
 * @param key
 * @param config
 */
export declare function lookup(key: Key, config: ITranslateConfig): string | null;
/**
 * Extracts either the value from the function or returns the value that was passed in.
 * @param obj
 */
export declare function extract<T>(obj: T | (() => T)): T;
