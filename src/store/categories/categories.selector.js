// with selector you transform your data into the final shape that you wanted to be
// you can have multiple different selectors that perform different transformations on the base format of data you have
// imagine you have array of different collections, from here maybe you want select just one, or multiple, or maybe you wanna create categoriesMap
// selectors is where you do your transformation business logic

export const selectCategoriesMap = state =>
  state.categories.categories.reduce((acc, category) => {
    const { title, items } = category;

    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
