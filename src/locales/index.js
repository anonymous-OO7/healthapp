// locales/index.js

import enCommon from './en/common.json';
import enRecipes from './en/recipes.json';
import enCategories from './en/categories.json';

import hiCommon from './hi/common.json';
import hiRecipes from './hi/recipes.json';
import hiCategories from './hi/categories.json';

export const en = {
  ...enCommon,
  recipes: enRecipes,
  categories: enCategories,
};

export const hi = {
  ...hiCommon,
  recipes: hiRecipes,
  categories: hiCategories,
};

export default { en, hi };
