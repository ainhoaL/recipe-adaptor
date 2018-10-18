const express = require('express');
const fatAPI = new (require('fatsecret'))('apikey', 'secret');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  getMacros();
  res.send({ express: 'Hello From Express' });
});

function getMacros() {
  fatAPI
    .method('foods.search', {
      search_expression: 'Chicken',
      max_results: 10
    })
    .then(function (results) {
      console.log(results.foods.food);
    })
    .catch(err => console.error(err));
}

app.listen(port, () => console.log(`Listening on port ${port}`));