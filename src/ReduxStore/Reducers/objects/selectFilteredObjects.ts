import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@ReduxStore/store";

export const selectFilteredObjects = createSelector(
  [
    (state: RootState) => state.objectsFilteredResult.objectsData,
    (state: RootState) => state.objectsFilteredResult.filterTitleQuery,
    (state: RootState) => state.objectsFilteredResult.filterParamsList,
    (state: RootState) => state.objectsFilteredResult.isFilterByCategory
  ],
  (objectsData, filterTitleQuery, filterParamsList, isFilterByCategory) => {
    console.log(objectsData)
    console.log(isFilterByCategory)

    const applyFilters = (obj: any) => {
      const matchesTitle =
        !filterTitleQuery || obj.Title?.toLowerCase().includes(filterTitleQuery.toLowerCase());

      const matchesParams =
        !filterParamsList ||
        Object.entries(filterParamsList).every(([key, value]) => {
          if (value === null) return true;
          if (Array.isArray(value)) {
            return value.includes(obj[key]);
          }
          return obj[key] === value;
        });

      return matchesTitle && matchesParams;
    };

    if (isFilterByCategory) {
      const resultWithCategories = objectsData.map(categoryObj => {
        const [categoryName, rawItems] = Object.entries(categoryObj)[0] as [string, Record<string, any>];

        const filteredItems = Object.values(rawItems).filter(applyFilters);

        return {
          [categoryName]: filteredItems
        };
      }).filter(category => {
        const values = Object.values(category)[0];
        return values.length > 0;
      });

      return resultWithCategories;
    }

    return objectsData.filter(applyFilters);
  }
);
