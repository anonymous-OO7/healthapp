// Run this script to generate translation keys from your data
// node scripts/generateTranslations.js

const dataArray = require('../src/assets/data/data.js');

console.log('=== Recipe Keys Needed ===\n');

const recipeKeys = {};
const categoryKeys = {};

dataArray.forEach(item => {
  // Recipe key
  recipeKeys[item.name] = {
    name: item.display || item.name,
    description: item.desc || '',
  };

  // Category key
  if (!categoryKeys[item.category]) {
    categoryKeys[item.category] = {
      name: item.category,
      description: '',
    };
  }
});

console.log('recipes.items:');
console.log(JSON.stringify(recipeKeys, null, 2));

console.log('\n\ncategories.items:');
console.log(JSON.stringify(categoryKeys, null, 2));
