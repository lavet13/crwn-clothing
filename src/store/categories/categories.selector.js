// with selector you transform your data into the final shape that you wanted to be
// you can have multiple different selectors that perform different transformations on the base format of data you have
// imagine you have array of different collections, from here maybe you want select just one, or multiple, or maybe you wanna create categoriesMap
// selectors is where you do your transformation business logic

import { createSelector } from 'reselect';

const selectCategoriesReducer = state => {
  console.log('selector 1 fired');
  return state.categories;
};

export const selectCategories = createSelector(
  [selectCategoriesReducer],
  categoriesSlice => {
    console.log('selector 2 fired');
    return categoriesSlice.categories;
  }
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  categories => {
    console.log('selector 3 fired');

    return categories.reduce((acc, category) => {
      const { title, items } = category;

      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);
