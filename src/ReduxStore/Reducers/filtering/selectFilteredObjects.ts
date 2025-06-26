import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@ReduxStore/store";

const applyFilters = (
  obj: Record<string, any>,
  filterTitleQuery: string | null,
  filterParamsList: Record<string, any> | null
): boolean => {
  const matchesTitle =
    !filterTitleQuery || obj.Title?.toLowerCase().includes(filterTitleQuery.toLowerCase());

  const matchesParams =
    !filterParamsList ||
    Object.entries(filterParamsList).every(([paramKey, paramValue]) => {
      if (paramValue === null) return true;

      const actualKey = Object.keys(obj).find(
        objKey => objKey.toLowerCase() === paramKey.toLowerCase()
      );

      if (!actualKey) return false;

      const objValue = obj[actualKey];

      if (Array.isArray(paramValue)) {
        if (typeof objValue === "string") {
          return paramValue.some(
            val =>
              typeof val === "string" &&
              objValue.toLowerCase().includes(val.toString().toLowerCase())
          );
        }
        return paramValue.includes(objValue);
      }

      if (typeof objValue === "string" && typeof paramValue === "string") {
        return objValue.toLowerCase().includes(paramValue.toLowerCase());
      }

      return objValue === paramValue;
    });

  return matchesTitle && matchesParams;
};

export const selectFilteredObjects = createSelector(
  [
    (state: RootState) => state.objectsFilteredResult.objectsData,
    (state: RootState) => state.objectsFilteredResult.filterTitleQuery,
    (state: RootState) => state.objectsFilteredResult.filterParamsList,
    (state: RootState) => state.objectsFilteredResult.filterByCategory
  ],
  (objectsData, filterTitleQuery, filterParamsList, filterByCategory) => {
    const result: Record<string, any[]> = {};

    const categoriesToProcess =
      filterByCategory && filterByCategory.length > 0
        ? Object.keys(objectsData).filter(category =>
          filterByCategory.some(filter =>
            filter.toLowerCase() === category.toLowerCase()
          )
        )
        : Object.keys(objectsData);

    categoriesToProcess.forEach(category => {
      const entries = objectsData[category];
      if (Array.isArray(entries)) {
        const filtered = entries.filter(obj =>
          applyFilters(obj, filterTitleQuery, filterParamsList)
        );
        if (filtered.length > 0) {
          result[category] = filtered;
        }
      }
    });

    return result;
  }
);

export const selectIsFiltered = createSelector(
  [
    (state: RootState) => state.objectsFilteredResult.filterTitleQuery,
    (state: RootState) => state.objectsFilteredResult.filterParamsList,
    (state: RootState) => state.objectsFilteredResult.filterByCategory
  ],
  (filterTitleQuery, filterParamsList, filterByCategory) => {
    const hasTitle = typeof filterTitleQuery === 'string' && filterTitleQuery.trim() !== '';
    const hasParams = !!filterParamsList && Object.keys(filterParamsList).length > 0;
    const hasCategoryFilter = !!filterByCategory && filterByCategory.length > 0;

    return hasTitle || hasParams || hasCategoryFilter;
  }
);