// with selector you transform your data into the final shape that you wanted to be
// you can have multiple different selectors that perform different transformations on the base format of data you have
// imagine you have array of different collections, from here maybe you want select just one, or multiple, or maybe you wanna create categoriesMap
// selectors is where you do your transformation business logic

import { createSelector } from 'reselect';

const selectCategoriesReducer = state => state.categories;

export const selectCategoriesArray = createSelector(
  [selectCategoriesReducer],
  categoriesSlice => categoriesSlice.categories
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesReducer],
  categoriesSlice => categoriesSlice.isLoading
);

export const selectCategoriesMap = createSelector(
  [selectCategoriesArray],
  categories =>
    categories.reduce((acc, category) => {
      const { title, items } = category;

      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
