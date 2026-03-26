import { AnyObject, RouteQueryParams } from '@unicef-polymer/etools-types';
import { EtoolsFilter, EtoolsFilterTypes } from './etools-filters';
export declare const isJsonStrMatch: (a: any, b: any) => boolean;
export declare function setselectedValueTypeByFilterKey(val: any): void;
export declare const getSelectedFiltersFromUrlParams: (params: AnyObject) => AnyObject;
export declare const updateFiltersSelectedValues: (params: RouteQueryParams, filters: EtoolsFilter[]) => EtoolsFilter[];
export declare function clearSelectedValuesInFilters(filters: EtoolsFilter[]): void;
export declare function getFilterEmptyValue(filterType: EtoolsFilterTypes): false | "" | never[] | null;
export declare const updateFilterSelectionOptions: (filters: EtoolsFilter[], fKey: string, options: AnyObject[]) => void;
