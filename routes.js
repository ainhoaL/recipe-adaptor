const express = require('express');
const router = express.Router();
const IngredientsController = require('./controllers/ingredients_controller');


router.post('/api/calculatemacros', (req, res) => {
  IngredientsController.getIngredientsInfo(req.body).then((ingredientResults) => {
    res.send(ingredientResults);      
  });
  // TODO: handle errors
});

router.post('/api/recalculaterecipe', (req, res) => {
  IngredientsController.recalculateRecipe(req.body).then((recipeResults) => {
    res.send(recipeResults);      
  });
  // TODO: handle errors
});


module.exports = router;