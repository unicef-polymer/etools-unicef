import { Constructor } from '../../utils/types';
export type MixinTarget<T extends object> = Constructor<{
    [p in keyof T]: T[p];
}>;
