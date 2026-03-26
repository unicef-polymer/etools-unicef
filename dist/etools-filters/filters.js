import { EtoolsFilterTypes } from './etools-filters';
export const isJsonStrMatch = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
};
let selectedValueTypeByFilterKey;
export function setselectedValueTypeByFilterKey(val) {
    selectedValueTypeByFilterKey = val;
}
export const getSelectedFiltersFromUrlParams = (params) => {
    const selectedFilters = {};
    for (const filterKey in params) {
        if (params[filterKey]) {
            if (selectedValueTypeByFilterKey &&
                selectedValueTypeByFilterKey[filterKey] === 'Array' &&
                !Array.isArray(params[filterKey])) {
                selectedFilters[filterKey] = params[filterKey].split(',');
            }
            else if (selectedValueTypeByFilterKey && selectedValueTypeByFilterKey[filterKey] === 'boolean') {
                selectedFilters[filterKey] = params[filterKey] === 'true';
            }
            else {
                selectedFilters[filterKey] = params[filterKey];
            }
        }
    }
    return selectedFilters;
};
export const updateFiltersSelectedValues = (params, filters) => {
    const availableFilters = [...filters];
    if (!Object.keys(params).length) {
        clearSelectedValuesInFilters(filters);
    }
    const selectedFilters = getSelectedFiltersFromUrlParams(params);
    for (const fKey in selectedFilters) {
        if (fKey) {
            const selectedValue = selectedFilters[fKey];
            if (selectedValue) {
                const filter = availableFilters.find((f) => f.filterKey === fKey);
                if (filter) {
                    if (filter.type === EtoolsFilterTypes.DropdownMulti && typeof selectedValue === 'string') {
                        filter.selectedValue = selectedValue.split(',');
                    }
                    else {
                        filter.selectedValue = selectedValue instanceof Array ? [...selectedValue] : selectedValue;
                    }
                    filter.selected = true;
                }
            }
        }
    }
    return availableFilters;
};
export function clearSelectedValuesInFilters(filters) {
    filters.forEach((f) => {
        f.selectedValue = getFilterEmptyValue(f.type);
    });
}
export function getFilterEmptyValue(filterType) {
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
export const updateFilterSelectionOptions = (filters, fKey, options) => {
    const filter = filters.find((f) => f.filterKey === fKey);
    if (filter && options) {
        if (!isJsonStrMatch(filter.selectionOptions, options)) {
            filter.selectionOptions = [...options];
        }
    }
};
