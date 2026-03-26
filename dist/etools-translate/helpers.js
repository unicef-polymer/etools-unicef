/**
 * Interpolates the values into the string using the {{ key }} syntax.
 * @param text
 * @param values
 * @param config
 */
export function interpolate(text, values, _config) {
    return Object.entries(extract(values || {})).reduce((text, [key, value]) => text.replace(new RegExp(`{{[  ]*${key}[  ]*}}`, `gm`), String(extract(value))), text);
}
/**
 * Returns a string based on a chain of keys using the dot notation.
 * @param key
 * @param config
 */
export function lookup(key, config) {
    // Split the key in parts (example: hello.world)
    const parts = key.split('.');
    // Find the string by traversing through the strings matching the chain of keys
    let string = config.strings;
    // Shift through all the parts of the key while matching with the strings.
    // Do not continue if the string is not defined or if we have traversed all the key parts
    while (string != null && parts.length > 0) {
        string = string[parts.shift()];
    }
    // Make sure the string is in fact a string!
    return string != null ? string.toString() : null;
}
/**
 * Extracts either the value from the function or returns the value that was passed in.
 * @param obj
 */
export function extract(obj) {
    return typeof obj === 'function' ? obj() : obj;
}
