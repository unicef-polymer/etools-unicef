import { AnyObject, RouteQueryParams } from '@unicef-polymer/etools-types';
import { EtoolsFilter, EtoolsFilterTypes } from './etools-filters';
/**
 * Implementation of ./filters.ts logic in class form
 */
export declare class FiltersHelper {
    private selectedValueTypeByFilterKey;
    constructor(selectedValueTypeByFilterKey: any);
    setselectedValueTypeByFilterKey(selectedValueTypeByFilterKey: any): void;
    getSelectedFiltersFromUrlParams(params: AnyObject): AnyObject;
    updateFiltersSelectedValues(params: RouteQueryParams, filters: EtoolsFilter[]): EtoolsFilter[];
    clearSelectedValuesInFilters(filters: EtoolsFilter[]): void;
    getFilterEmptyValue(filterType: EtoolsFilterTypes): false | "" | never[] | null;
    updateFilterSelectionOptions(filters: EtoolsFilter[], fKey: string, options: AnyObject[]): void;
    static isJsonStrMatch(a: any, b: any): boolean;
}
