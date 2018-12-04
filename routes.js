const express = require('express');
const router = express.Router();
const IngredientsController = require('./controllers/ingredients_controller');


router.post('/api/calculatemacros', (req, res) => {
  IngredientsController.getIngredientsInfo(req.body).then((ingredientResults) => {
    res.send(ingredientResults);      
  });
});

module.exports = router;