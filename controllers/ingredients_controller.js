const fatAPILibrary = new (require('fatsecret'))('KEY', 'SECRET');

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
        max_results: 15
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
  },

  recalculateRecipe(info) {

    let ingredientsInfo = info.ingredientsInfo;
    let servings = info.servings;
    let wantedMacros = info.wantedMacros;

    let wantedCalories = wantedMacros.calories;
    let wantedProtein = wantedMacros.protein;
    let wantedCarb = wantedMacros.carb;
    let wantedFat = wantedMacros.fat;

    let currentMacros = module.exports.calculateMacrosPerServing(ingredientsInfo, servings);
    let currentCalories = currentMacros.calories;
    let currentProtein = currentMacros.protein;
    let currentCarb = currentMacros.carb;
    let currentFat = currentMacros.fat;

    // If calories have canged but none of the other macros - it is not possible to recalculate recipe
    if (currentCalories != wantedCalories && currentProtein === wantedProtein && currentCarb == wantedCarb && currentFat === wantedFat) {
      return Promise.reject('Impossible to change overall calories without changing macros');
    }

    // Calculate change ratios:
    let ratios = [] // 0: Cals, 1: Protein, 2: Carb, 3: Fat
    if (wantedCalories) {
      ratios[0] = parseFloat(Number.parseFloat(wantedCalories / currentCalories).toFixed(2));
    }
    if (wantedProtein) {
      ratios[1] = parseFloat(Number.parseFloat(wantedProtein / currentProtein).toFixed(2));
    }
    if (wantedCarb) {
      ratios[2] = parseFloat(Number.parseFloat(wantedCarb / currentCarb).toFixed(2));
    }
    if (wantedFat) {
      ratios[3] = parseFloat(Number.parseFloat(wantedFat / currentFat).toFixed(2));
    }

    let ratio;
    // If only 1 metric needs to change:
    if (ratios[0] && !ratios[1] && !ratios[2] && !ratios[3]) {
      // Only need to adjust calories
      ratio = ratios[0];
    } else if (!ratios[0] && ratios[1] && !ratios[2] && !ratios[3]) {
      // Only need to adjust protein
      ratio = ratios[1];
    } else if (!ratios[0] && !ratios[1] && ratios[2] && !ratios[3]) {
      // Only need to adjust protein
      ratio = ratios[2];
    } else if (!ratios[0] && !ratios[1] && !ratios[2] && ratios[3]) {
      // Only need to adjust protein
      ratio = ratios[3];
    } 

    if (ratio) {
      // We have a ratio to apply to all ingredients: only 1 macro change was wantedso we apply that ratio change to all ingredients
      for (let ingredientName in ingredientsInfo) {
        if (ingredientsInfo.hasOwnProperty(ingredientName)) {
          ingredientsInfo[ingredientName].qty = parseFloat(Number.parseFloat(ingredientsInfo[ingredientName].qty * ratio).toFixed(2));
        }
      }

    } else {
      // Metrics have been changed in different ratios
      // Try to hit calories first and protein second
  
      // For now go through all the macro ratios and find the best one
      // TODO: be able to change different ingredients in different ratios, instead of all ingredients with the same ratio
      let nextMacros;
      let bestDifferences = [100, 100, 100, 100] //0: Cal, 1: Protein, 2: Carb, 3: Fat
      let bestRatio;
      let nextRatio;
      let newIngredientInfo = {};

      for (let index = 0; index < ratios.length; index++) {
        nextRatio = ratios[index];

        for (let ingredientName in ingredientsInfo) {
          if (ingredientsInfo.hasOwnProperty(ingredientName)) {
            newIngredientInfo[ingredientName] = Object.assign({}, ingredientsInfo[ingredientName]);
            newIngredientInfo[ingredientName].qty = parseFloat(Number.parseFloat(newIngredientInfo[ingredientName].qty * nextRatio).toFixed(2));
          }
        }

        // Decide if using this ratio makes for a wanted final macros better than previous
    
        nextMacros = module.exports.calculateMacrosPerServing(newIngredientInfo, servings);

        let calDifference = Math.abs(nextMacros.calories - wantedCalories) * 100 / wantedCalories;
        let proteinDifference = Math.abs(nextMacros.protein - wantedProtein) * 100 / wantedProtein;
        let carbDifference = Math.abs(nextMacros.carb - wantedCarb) * 100 / wantedCarb;
        let fatDifference = Math.abs(nextMacros.fat - wantedFat) * 100 / wantedFat;

        
        // For now only care about calories and protein
        if (calDifference < bestDifferences[0] && proteinDifference < bestDifferences[1]) {
          bestDifferences = [calDifference, proteinDifference, carbDifference, fatDifference];
          bestRatio = nextRatio;
        }        
      }

      for (let ingredientName in ingredientsInfo) {
        if (ingredientsInfo.hasOwnProperty(ingredientName)) {
          ingredientsInfo[ingredientName].qty = parseFloat(Number.parseFloat(ingredientsInfo[ingredientName].qty * bestRatio).toFixed(2));
        }
      }

    }
    
    let newMacros = module.exports.calculateMacrosPerServing(ingredientsInfo, servings);

    return Promise.resolve({
      ingredientsInfo,
      servings,
      macros: newMacros
    });

  },

  calculateMacrosPerServing(ingredientsInfo, servings) {

    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarb = 0;
    let totalFat = 0;
    let ingredientMacros;
    let qty = 0;

    for (let ingredientName in ingredientsInfo) {
      if (ingredientsInfo.hasOwnProperty(ingredientName)) {
        ingredientMacros = ingredientsInfo[ingredientName].macros;
        qty = ingredientsInfo[ingredientName].qty;
        totalCalories += ingredientMacros.calories * qty;
        totalProtein += ingredientMacros.protein * qty;
        totalCarb += ingredientMacros.carb * qty;
        totalFat += ingredientMacros.fat * qty;
      }
    }

    let calories = parseFloat(Number.parseFloat(totalCalories / servings).toFixed(2))
    let protein = parseFloat(Number.parseFloat(totalProtein / servings).toFixed(2))
    let carb = parseFloat(Number.parseFloat(totalCarb / servings).toFixed(2))
    let fat = parseFloat(Number.parseFloat(totalFat / servings).toFixed(2))

    let macros = { calories: calories, protein: protein, carb: carb, fat: fat }
    return { calories, protein, carb, fat };
  }
}
