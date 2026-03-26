import { ITranslateConfig } from './types';
/**
 * Default configuration object.
 */
export declare const defaultTranslateConfig: () => ITranslateConfig;
export declare let translateConfig: ITranslateConfig;
/**
 * Registers a translation config by merging it into the existing one.
 * The registered translation config can be accessed through the singleton called translateConfig.
 * @param config
 */
export declare function registerTranslateConfig(config: Partial<ITranslateConfig>): ITranslateConfig;
