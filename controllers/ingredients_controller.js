const fatAPILibrary = new (require('fatsecret'))('ed15ae7b770e49779aa820de37c768a9', 'b100eeb32b954de59b25a4ad05363c19');

module.exports = {

  fatAPI: fatAPILibrary,
  /**
   * Get info from fatAPI for all the ingredients
   */
  getIngredientsInfo(recipe) {
    let parsedIngredients = module.exports.parseIngredients(recipe.ingredients);
    return module.exports.getAllFoods(parsedIngredients).then(() => {
      return module.exports.getAllMacros(parsedIngredients);
    }).then(() => {
      return parsedIngredients;
    });
  },

  getIngredientsFromFatAPI(ingredientName) {
    return module.exports.fatAPI
    .method('foods.search', {
      search_expression: ingredientName,
      max_results: 10
    })
    .then((results) => {
      if (results && results.foods && results.foods.food) {
        let foods = results.foods.food;
        let genericTopResults = [];
        let resultsIndex = 0;
        while (genericTopResults.length < 5 && foods.length > resultsIndex) {
          if (foods[resultsIndex].food_type === 'Generic') {
            genericTopResults.push(foods[resultsIndex]);
          }
          resultsIndex++;
        }
        return Promise.resolve(genericTopResults);
      }
      return [];
    })
    .catch((err) => {
      // console.error(err);
      return Promise.reject(err);
    });
  },

  getFoodMacros(food) {
    if (food.food_id) {
      return module.exports.fatAPI.method('food.get', {
        food_id: food.food_id,
        max_results: 5
      })
      .then((results) => {
        let serving = [];
        if (results.food && results.food.servings && results.food.servings.serving) {
          serving = results.food.servings.serving;
        }
        return Promise.resolve(serving);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
    }

    return Promise.reject(); // TODO: return error
  },

  getAllFoods(ingredientsArray) {
    let promiseArray = [];
    ingredientsArray.forEach((ingredient) => {
        promiseArray.push(module.exports.getIngredientsFromFatAPI(ingredient.name).then((results) => {
            ingredient.results = results;
        }));
    });

    return Promise.all(promiseArray);
  },

  getAllMacros(ingredientsArray) {
    let promiseArray = [];
    ingredientsArray.forEach((ingredient) => {
        ingredient.results.forEach((result) => {
            promiseArray.push(module.exports.getFoodMacros(result).then((servingResults) => {
               result.servings = servingResults; 
            }));
        });
    });

    return Promise.all(promiseArray);
  },

  parseIngredients(ingredientsText) {
    const units = [{ name: 'cup', regex: /cup[s]?/ }, { name: 'cup', regex: /[cC][s]?[.]?\s/ }, { name: 'tsp', regex: /tsp[s]?[.]?/ }, { name: 'tsp', regex: /teaspoon[s]?/ }, { name: 'tsp', regex: /t[s]?\s/ }, { name: 'tbsp', regex: /[Tt]bsp[s]?[.]?/ }, { name: 'tbsp', regex: /T[B]?[s]?[.]?\s/ }, { name: 'tbsp', regex: /[Tt]bl?[s]?[.]?\s/ }, { name: 'tbsp', regex: /tablespoon[s]*[.]*/ }, { name: 'kg', regex: /[Kk][g]?[s]?[.]?\s/ }, { name: 'kg', regex: /kilogram[s]?/ }, { name: 'g', regex: /g[r]?[s]?[.]?\s/ }, { name: 'g', regex: /gram[s]?/ }, { name: 'ml', regex: /m[Ll][s]?[.]?/ }, { name: 'ml', regex: /milliliter[s]?/ }, { name: 'ml', regex: /mil[s]?[.]?/ }, { name: 'oz', regex: /oz[s]?[.]?/ }, { name: 'oz', regex: /ounce[s]?[.]?/ }, { name: 'l', regex: /[Ll][s]?[.]?\s/ }, { name: 'l', regex: /liter[s]?/ }];
    let formattedIngrediets = [];
    let ingredientsArray = ingredientsText.split(/\r?\n/);
    ingredientsArray.forEach((ingredient) => {
        let foundPosition = -1;
        let unitCount = 0;
        let found = false;
        while (!found && unitCount < units.length) {
          found = units[unitCount].regex.test(ingredient);
          unitCount++;
        }
        if (found) {
          let splitArray = ingredient.split(units[unitCount - 1].regex)
          let quantity = splitArray[0].trim(); // TODO: check it is a number
          let unit = units[unitCount - 1].name;
          let name = splitArray[1].trim();
          formattedIngrediets.push({ quantity, unit, name });
        } else {
          // If there is no unit, then this ingredient has the shape Quantity Name
          // Separate by space
          let firstSeparation = ingredient.indexOf(' ');
          let quantity = ingredient.substr(0, firstSeparation).trim(); // TODO: check it is a number
          let name = ingredient.substr(firstSeparation + 1, ingredient.length - 1).trim();
          formattedIngrediets.push({ quantity, name });
        }
    });
    return formattedIngrediets;
  }
}
