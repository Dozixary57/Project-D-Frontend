import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@ReduxStore/store";

export const selectFilteredObjects = createSelector(
  [
    (state: RootState) => state.objectsFilteredResult.objectsData,
    (state: RootState) => state.objectsFilteredResult.filterTitleQuery,
    (state: RootState) => state.objectsFilteredResult.filterParamsList,
    (state: RootState) => state.objectsFilteredResult.filterByCategory
  ],
  (objectsData, filterTitleQuery, filterParamsList, filterByCategory) => {
    const applyFilters = (obj: any) => {
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
            if (typeof objValue === 'string') {
              return paramValue.some(val => 
                typeof val === 'string' && 
                objValue.toLowerCase().includes(val.toString().toLowerCase())
              );
            }
            return paramValue.includes(objValue);
          } 
          
          if (typeof objValue === 'string' && typeof paramValue === 'string') {
            return objValue.toLowerCase().includes(paramValue.toLowerCase());
          }
          
          return objValue === paramValue;
        });

      return matchesTitle && matchesParams;
    };

    if (filterByCategory !== null) {
      const resultWithCategories = objectsData.map(categoryObj => {
        const categoryNames = Object.keys(categoryObj);
        const categoriesToProcess = filterByCategory.length > 0
          ? categoryNames.filter(name =>
            filterByCategory.some(category =>
              category.toLowerCase() === name.toLowerCase()))
          : categoryNames;
        const processedCategories: Record<string, any[]> = {};
        categoriesToProcess.forEach(categoryName => {
          if (categoryObj[categoryName]) {
            const filteredItems = Array.isArray(categoryObj[categoryName])
              ? categoryObj[categoryName].filter(applyFilters)
              : [];
            if (filteredItems.length > 0) {
              processedCategories[categoryName] = filteredItems;
            }
          }
        });
        return Object.keys(processedCategories).length ? processedCategories : null;
      }).filter(Boolean);
      return resultWithCategories;
    }
    return objectsData.filter(applyFilters);
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
    const hasParams =
      filterParamsList !== null &&
      Object.keys(filterParamsList).length > 0;

    const hasCategoryFilter = filterByCategory !== null && filterByCategory.length > 0;

    return hasTitle || hasParams || hasCategoryFilter;
  }
);
