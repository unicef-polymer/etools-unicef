import { EtoolsFilterTypes } from './etools-filters';
/**
 * Implementation of ./filters.ts logic in class form
 */
export class FiltersHelper {
    constructor(selectedValueTypeByFilterKey) {
        this.selectedValueTypeByFilterKey = selectedValueTypeByFilterKey;
    }
    setselectedValueTypeByFilterKey(selectedValueTypeByFilterKey) {
        this.selectedValueTypeByFilterKey = selectedValueTypeByFilterKey;
    }
    getSelectedFiltersFromUrlParams(params) {
        const selectedFilters = {};
        for (const filterKey in params) {
            if (params[filterKey]) {
                if (this.selectedValueTypeByFilterKey[filterKey] === 'Array' && !Array.isArray(params[filterKey])) {
                    selectedFilters[filterKey] = params[filterKey].split(',');
                }
                else if (this.selectedValueTypeByFilterKey[filterKey] === 'boolean') {
                    selectedFilters[filterKey] = params[filterKey] === 'true';
                }
                else {
                    selectedFilters[filterKey] = params[filterKey];
                }
            }
        }
        return selectedFilters;
    }
    updateFiltersSelectedValues(params, filters) {
        const availableFilters = [...filters];
        if (!Object.keys(params).length) {
            this.clearSelectedValuesInFilters(filters);
        }
        const selectedFilters = this.getSelectedFiltersFromUrlParams(params);
        for (const fKey in selectedFilters) {
            if (fKey) {
                const selectedValue = selectedFilters[fKey];
                if (selectedValue) {
                    const filter = availableFilters.find((f) => f.filterKey === fKey);
                    if (filter) {
                        filter.selectedValue = selectedValue instanceof Array ? [...selectedValue] : selectedValue;
                        filter.selected = true;
                    }
                }
            }
        }
        return availableFilters;
    }
    clearSelectedValuesInFilters(filters) {
        filters.forEach((f) => {
            f.selectedValue = this.getFilterEmptyValue(f.type);
        });
    }
    getFilterEmptyValue(filterType) {
        switch (filterType) {
            case EtoolsFilterTypes.Search:
                return '';
            case EtoolsFilterTypes.Toggle:
                return false;
            case EtoolsFilterTypes.Date:
            case EtoolsFilterTypes.Dropdown:
                return null;
            case EtoolsFilterTypes.DropdownMulti:
                return [];
        }
    }
    updateFilterSelectionOptions(filters, fKey, options) {
        const filter = filters.find((f) => f.filterKey === fKey);
        if (filter && options) {
            if (!FiltersHelper.isJsonStrMatch(filter.selectionOptions, options)) {
                filter.selectionOptions = [...options];
            }
        }
    }
    static isJsonStrMatch(a, b) {
        return JSON.stringify(a) === JSON.stringify(b);
    }
}
