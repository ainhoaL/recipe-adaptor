const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
// chai.use(sinonChai);

const ingredientsController =  require('../../controllers/ingredients_controller');

describe('Ingredients Controller', () => {

  describe('parseIngredients', () => {
    describe('when the recipe has only one type of unit:', () => {
      describe('grams', () => {
        let expectedIngredients = [{quantity: "10", unit: 'g', name: 'butter'}, {quantity: "1", unit: 'g', name: 'salt'}, {quantity: "1/2", unit: 'g', name: 'pepper'}, {quantity: "1 3/4", unit: 'g', name: 'flour'}, {quantity: "20.5", unit: 'g', name: 'sugar'}];
          
        it('returns the correct parsed ingredients when it is formatted "Qty grams Ingredient"', () => {
          let recipe = '10 grams butter\n1 gram salt\n1/2 gram pepper\n1 3/4 gram flour\n20.5 grams sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qty g Ingredient"', () => {
          let recipe = '10 g butter\n1 g salt\n1/2 g pepper\n1 3/4 g flour\n20.5 g sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qtyg Ingredient"', () => {
          let recipe = '10g butter\n1g salt\n1/2g pepper\n1 3/4g flour\n20.5g sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qty g. Ingredient"', () => {
          let recipe = '10 g. butter\n1 g. salt\n1/2 g. pepper\n1 3/4 g. flour\n20.5 g. sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qtyg. Ingredient"', () => {
          let recipe = '10g. butter\n1g. salt\n1/2g. pepper\n1 3/4g. flour\n20.5g. sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qty gr Ingredient"', () => {
          let recipe = '10 gr butter\n1 gr salt\n1/2 gr pepper\n1 3/4 gr flour\n20.5 grs sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });
      });

      describe('cups', () => {
        let expectedIngredients = [{quantity: "10", unit: 'cup', name: 'butter'}, {quantity: "1", unit: 'cup', name: 'salt'}, {quantity: "1/2", unit: 'cup', name: 'pepper'}, {quantity: "1 3/4", unit: 'cup', name: 'flour'}, {quantity: "20.5", unit: 'cup', name: 'sugar'}];
          
        it('returns the correct parsed ingredients when it is formatted "Qty cups Ingredient"', () => {
          let recipe = '10 cups butter\n1 cup salt\n1/2 cup pepper\n1 3/4 cups flour\n20.5 cups sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qty c Ingredient"', () => {
          let recipe = '10 c butter\n1 c salt\n1/2 c pepper\n1 3/4 c flour\n20.5 c sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qtycups Ingredient"', () => {
          let recipe = '10cups butter\n1cup salt\n1/2cup pepper\n1 3/4cup flour\n20.5cups sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qty C Ingredient"', () => {
          let recipe = '10 C butter\n1 C salt\n1/2 C pepper\n1 3/4 C flour\n20.5 C sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qtyc Ingredient"', () => {
          let recipe = '10c butter\n1c salt\n1/2c pepper\n1 3/4c flour\n20.5c sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });
      });

      describe('tbsp', () => {
        let expectedIngredients = [{quantity: "10", unit: 'tbsp', name: 'butter'}, {quantity: "1", unit: 'tbsp', name: 'salt'}, {quantity: "1/2", unit: 'tbsp', name: 'pepper'}, {quantity: "1 3/4", unit: 'tbsp', name: 'flour'}, {quantity: "20.5", unit: 'tbsp', name: 'sugar'}];
          
        it('returns the correct parsed ingredients when it is formatted "Qty tbsp Ingredient"', () => {
          let recipe = '10 tbsps butter\n1 tbsp salt\n1/2 tbsp pepper\n1 3/4 tbsp flour\n20.5 tbsp sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qty Tbsp Ingredient"', () => {
          let recipe = '10 Tbsp butter\n1 Tbsp salt\n1/2 Tbsp pepper\n1 3/4 Tbsps flour\n20.5 Tbsps sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qtytbsp Ingredient"', () => {
          let recipe = '10tbsps butter\n1tbsp salt\n1/2tbsp pepper\n1 3/4tbsp flour\n20.5tbsp sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qty T Ingredient"', () => {
          let recipe = '10 Ts butter\n1 T salt\n1/2 T pepper\n1 3/4 T flour\n20.5 T sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qty Tbl Ingredient"', () => {
          let recipe = '10 Tbls butter\n1 Tbl salt\n1/2 Tbl pepper\n1 3/4 Tbl flour\n20.5 Tbl sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qty TB Ingredient"', () => {
          let recipe = '10 TBs butter\n1 TB salt\n1/2 TB pepper\n1 3/4 TB flour\n20.5 TBs sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qty tablespoon Ingredient"', () => {
          let recipe = '10 tablespoons butter\n1 tablespoon salt\n1/2 tablespoon pepper\n1 3/4 tablespoons flour\n20.5 tablespoons sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });
      });

      describe('tsp', () => {
        let expectedIngredients = [{quantity: "10", unit: 'tsp', name: 'butter'}, {quantity: "1", unit: 'tsp', name: 'salt'}, {quantity: "1/2", unit: 'tsp', name: 'pepper'}, {quantity: "1 3/4", unit: 'tsp', name: 'flour'}, {quantity: "20.5", unit: 'tsp', name: 'sugar'}];
          
        it('returns the correct parsed ingredients when it is formatted "Qty tsp Ingredient"', () => {
          let recipe = '10 tsps butter\n1 tsp salt\n1/2 tsp pepper\n1 3/4 tsp flour\n20.5 tsps sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qtytsp Ingredient"', () => {
          let recipe = '10tsps butter\n1tsp salt\n1/2tsp pepper\n1 3/4tsp flour\n20.5tsp sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qty t Ingredient"', () => {
          let recipe = '10 t butter\n1 t salt\n1/2 t pepper\n1 3/4 t flour\n20.5 t sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qtyt Ingredient"', () => {
          let recipe = '10t butter\n1t salt\n1/2t pepper\n1 3/4t flour\n20.5t sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qty teaspoon Ingredient"', () => {
          let recipe = '10 teaspoons butter\n1 teaspoon salt\n1/2 teaspoon pepper\n1 3/4 teaspoons flour\n20.5 teaspoons sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });
      });

      describe('ml', () => {
        let expectedIngredients = [{quantity: "10", unit: 'ml', name: 'butter'}, {quantity: "1", unit: 'ml', name: 'salt'}, {quantity: "1/2", unit: 'ml', name: 'pepper'}, {quantity: "1 3/4", unit: 'ml', name: 'flour'}, {quantity: "20.5", unit: 'ml', name: 'sugar'}];
          
        it('returns the correct parsed ingredients when it is formatted "Qty ml Ingredient"', () => {
          let recipe = '10 ml butter\n1 ml salt\n1/2 ml pepper\n1 3/4 ml flour\n20.5 mls sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qtyml Ingredient"', () => {
          let recipe = '10ml butter\n1ml salt\n1/2ml pepper\n1 3/4mls flour\n20.5mls sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qty mL Ingredient"', () => {
          let recipe = '10 mL butter\n1 mL salt\n1/2 mL pepper\n1 3/4mLs flour\n20.5 mLs sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qty milliliter Ingredient"', () => {
          let recipe = '10 milliliters butter\n1 milliliter salt\n1/2 milliliter pepper\n1 3/4 milliliters flour\n20.5 milliliters sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qty mil Ingredient"', () => {
          let recipe = '10 mils butter\n1 mil salt\n1/2 mil pepper\n1 3/4 mil flour\n20.5 mils sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });
      });

      describe('ounce', () => {
        let expectedIngredients = [{quantity: "10", unit: 'oz', name: 'butter'}, {quantity: "1", unit: 'oz', name: 'salt'}, {quantity: "1/2", unit: 'oz', name: 'pepper'}, {quantity: "1 3/4", unit: 'oz', name: 'flour'}, {quantity: "20.5", unit: 'oz', name: 'sugar'}];
          
        it('returns the correct parsed ingredients when it is formatted "Qty oz Ingredient"', () => {
          let recipe = '10 oz butter\n1 oz salt\n1/2 oz pepper\n1 3/4 oz flour\n20.5 ozs sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qtyoz Ingredient"', () => {
          let recipe = '10oz butter\n1oz salt\n1/2oz pepper\n1 3/4oz flour\n20.5ozs sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qty ounce Ingredient"', () => {
          let recipe = '10 ounces butter\n1 ounce salt\n1/2 ounce pepper\n1 3/4 ounces flour\n20.5 ounces sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qtyounce Ingredient"', () => {
          let recipe = '10ounces butter\n1ounce salt\n1/2ounce pepper\n1 3/4ounces flour\n20.5ounces sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });
      });

      describe('liter', () => {
        let expectedIngredients = [{quantity: "10", unit: 'l', name: 'butter'}, {quantity: "1", unit: 'l', name: 'salt'}, {quantity: "1/2", unit: 'l', name: 'pepper'}, {quantity: "1 3/4", unit: 'l', name: 'flour'}, {quantity: "20.5", unit: 'l', name: 'sugar'}];
          
        it('returns the correct parsed ingredients when it is formatted "Qty l Ingredient"', () => {
          let recipe = '10 l butter\n1 l salt\n1/2 l pepper\n1 3/4 l flour\n20.5 ls sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qty L Ingredient"', () => {
          let recipe = '10 Ls butter\n1 L salt\n1/2 L pepper\n1 3/4 L flour\n20.5 Ls sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qty liter Ingredient"', () => {
          let recipe = '10 liters butter\n1 liter salt\n1/2 liter pepper\n1 3/4 liters flour\n20.5 liters sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "QtyL Ingredient"', () => {
          let recipe = '10L butter\n1L salt\n1/2L pepper\n1 3/4L flour\n20.5L sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });
      });

      describe('kg', () => {
        let expectedIngredients = [{quantity: "10", unit: 'kg', name: 'butter'}, {quantity: "1", unit: 'kg', name: 'salt'}, {quantity: "1/2", unit: 'kg', name: 'pepper'}, {quantity: "1 3/4", unit: 'kg', name: 'flour'}, {quantity: "20.5", unit: 'kg', name: 'sugar'}];
          
        it('returns the correct parsed ingredients when it is formatted "Qty kg Ingredient"', () => {
          let recipe = '10 kgs butter\n1 kg salt\n1/2 kg pepper\n1 3/4 kg flour\n20.5 kgs sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qtykg Ingredient"', () => {
          let recipe = '10kgs butter\n1kg salt\n1/2kg pepper\n1 3/4kgs flour\n20.5kgs sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qty kilogram Ingredient"', () => {
          let recipe = '10 kilograms butter\n1 kilogram salt\n1/2 kilogram pepper\n1 3/4 kilograms flour\n20.5 kilograms sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });

        it('returns the correct parsed ingredients when it is formatted "Qty kg. Ingredient"', () => {
          let recipe = '10 kg. butter\n1 kg. salt\n1/2 kg. pepper\n1 3/4 kg. flour\n20.5 kg. sugar';

          let parsedIngredients = ingredientsController.parseIngredients(recipe);
          expect(parsedIngredients.length).to.equal(5);
          expect(parsedIngredients).to.deep.equal(expectedIngredients);
        });
      });
    });
  });

  describe('getIngredientsFromFatAPI', () => {
    let fakeAPI;
    let fatAPIStub;

    beforeEach(() => {

      fakeAPI = {
        method: sinon.stub()
      };
      fatAPIStub = sinon.stub(ingredientsController, 'fatAPI').value(fakeAPI);
    });

    afterEach(() => {
      fatAPIStub.restore();
    });

    context('fatAPI call succeeds', () => {
      describe('and returns more than 5 generic results', () => {

        let apiResults = {
          foods: {
            food: [
              { id: 1, food_type: 'Generic', name: 'test' },
              { id: 2, food_type: 'Generic', name: 'testing' },
              { id: 3, food_type: 'NonGeneric', name: 'test2' },
              { id: 4, food_type: 'Generic', name: 'ingredient' },
              { id: 5, food_type: 'NonGeneric', name: 'ingredient2' },
              { id: 6, food_type: 'Generic', name: 'tester' },
              { id: 7, food_type: 'Generic', name: 'test3' },
              { id: 8, food_type: 'Generic', name: 'one more test' },
              { id: 9, food_type: 'Generic', name: 'last test' }
            ]
          }
        };

        let expectedResults = [
          { id: 1, food_type: 'Generic', name: 'test' },
          { id: 2, food_type: 'Generic', name: 'testing' },
          { id: 4, food_type: 'Generic', name: 'ingredient' },
          { id: 6, food_type: 'Generic', name: 'tester' },
          { id: 7, food_type: 'Generic', name: 'test3' }
        ];

        it('returns first 5 results that are generic ingredients', () => {
          fakeAPI.method.resolves(apiResults);
          return expect(ingredientsController.getIngredientsFromFatAPI('test ingredient')).to.not.be.rejected.then((results) => {
            expect(fakeAPI.method.callCount).to.equal(1);
            expect(fakeAPI.method).to.have.been.calledWith('foods.search', { search_expression: 'test ingredient', max_results: 15 });
            expect(results.length).to.equal(5);
            expect(results).to.deep.equal(expectedResults);
          });
        });
      });

      describe('and returns less than 5 generic results', () => {

        let apiResults = {
          foods: {
            food: [
              { id: 1, food_type: 'Generic', name: 'test' },
              { id: 2, food_type: 'Generic', name: 'testing' },
              { id: 3, food_type: 'NonGeneric', name: 'test2' },
              { id: 4, food_type: 'Generic', name: 'ingredient' },
              { id: 5, food_type: 'NonGeneric', name: 'ingredient2' },
              { id: 6, food_type: 'NonGeneric', name: 'tester' },
              { id: 7, food_type: 'NonGeneric', name: 'test3' },
              { id: 8, food_type: 'Generic', name: 'one more test' },
              { id: 9, food_type: 'NonGeneric', name: 'last test' }
            ]
          }
        };

        let expectedResults = [
          { id: 1, food_type: 'Generic', name: 'test' },
          { id: 2, food_type: 'Generic', name: 'testing' },
          { id: 4, food_type: 'Generic', name: 'ingredient' },
          { id: 8, food_type: 'Generic', name: 'one more test' }
        ];

        it('returns the results that are generic ingredients', () => {
          fakeAPI.method.resolves(apiResults);
          return expect(ingredientsController.getIngredientsFromFatAPI('test ingredient')).to.not.be.rejected.then((results) => {
            expect(fakeAPI.method.callCount).to.equal(1);
            expect(fakeAPI.method).to.have.been.calledWith('foods.search', { search_expression: 'test ingredient', max_results: 15});
            expect(results.length).to.equal(4);
            expect(results).to.deep.equal(expectedResults);
          });
        });
      });

      describe('and returns less than 5 results', () => {
        let apiResults = {
          foods: {
            food: [
              { id: 1, food_type: 'Generic', name: 'test' },
              { id: 2, food_type: 'Generic', name: 'testing' },
              { id: 3, food_type: 'NonGeneric', name: 'test2' }
            ]
          }
        };

        let expectedResults = [
          { id: 1, food_type: 'Generic', name: 'test' },
          { id: 2, food_type: 'Generic', name: 'testing' }
        ];

        it('returns the results that are generic ingredients', () => {
          fakeAPI.method.resolves(apiResults);
          return expect(ingredientsController.getIngredientsFromFatAPI('test ingredient')).to.not.be.rejected.then((results) => {
            expect(fakeAPI.method.callCount).to.equal(1);
            expect(fakeAPI.method).to.have.been.calledWith('foods.search', { search_expression: 'test ingredient', max_results: 15 });
            expect(results.length).to.equal(2);
            expect(results).to.deep.equal(expectedResults);
          });
        });
      });

      describe('and returns no results', () => {
        it('returns empty array for results', () => {
          fakeAPI.method.resolves({});
          return expect(ingredientsController.getIngredientsFromFatAPI('test ingredient')).to.not.be.rejected.then((results) => {
            expect(fakeAPI.method.callCount).to.equal(1);
            expect(fakeAPI.method).to.have.been.calledWith('foods.search', { search_expression: 'test ingredient', max_results: 15});
            expect(results.length).to.equal(0);
            expect(results).to.deep.equal([]);
          });
        });
      });

      describe('and returns an empty array for food results', () => {
        let apiResults = {
          foods: {
            food: []
          }
        };

        it('returns empty array for results', () => {
          fakeAPI.method.resolves(apiResults);
          return expect(ingredientsController.getIngredientsFromFatAPI('test ingredient')).to.not.be.rejected.then((results) => {
            expect(fakeAPI.method.callCount).to.equal(1);
            expect(fakeAPI.method).to.have.been.calledWith('foods.search', { search_expression: 'test ingredient', max_results: 15 });
            expect(results.length).to.equal(0);
            expect(results).to.deep.equal([]);
          });
        });
      });
    });

    context('fatAPI call fails', () => {
      it('returns a rejected promise', () => {
          fakeAPI.method.rejects();
          return expect(ingredientsController.getIngredientsFromFatAPI('test ingredient')).to.be.rejected;
        });
    });
  });

  describe('getFoodMacros', () => {
    let fakeAPI;
    let fatAPIStub;

    let food = {
      food_id: 'tesdId1'
    };

    beforeEach(() => {

      fakeAPI = {
        method: sinon.stub()
      };
      fatAPIStub = sinon.stub(ingredientsController, 'fatAPI').value(fakeAPI);
    });

    afterEach(() => {
      fatAPIStub.restore();
    });

    context('fatAPI call succeeds', () => {
      describe('and returns a food item with servings', () => {
        let apiResults = {
          food: {
            food_id: '1',
            food_name: 'test ingredient',
            food_type: 'Generic',
            food_url: 'http://testurl',
            servings: {
              serving: [
                { calories: '5', serving_id: '123', serving_description: '10 g'},
                { calories: '50', serving_id: '568', serving_description: '100 g'}
              ]
            }
          }
        };

        let expectedResults = [
          { calories: '5', serving_id: '123', serving_description: '10 g'},
          { calories: '50', serving_id: '568', serving_description: '100 g'}
        ];

        it('returns macros per serving data for the ingredient', () => {
          fakeAPI.method.resolves(apiResults);
          return expect(ingredientsController.getFoodMacros(food)).to.not.be.rejected.then((results) => {
            expect(fakeAPI.method.callCount).to.equal(1);
            expect(fakeAPI.method).to.have.been.calledWith('food.get', { food_id: 'tesdId1', max_results: 5 });
            expect(results.length).to.equal(2);
            expect(results).to.deep.equal(expectedResults);
          });
        });
      });

      describe('and returns a food item with no servings', () => {
        let apiResults = {
          food: {
            food_id: '1',
            food_name: 'test ingredient',
            food_type: 'Generic',
            food_url: 'http://testurl'
          }
        };

        it('returns an empty array for results', () => {
          fakeAPI.method.resolves(apiResults);
          return expect(ingredientsController.getFoodMacros(food)).to.not.be.rejected.then((results) => {
            expect(fakeAPI.method.callCount).to.equal(1);
            expect(fakeAPI.method).to.have.been.calledWith('food.get', { food_id: 'tesdId1', max_results: 5 });
            expect(results.length).to.equal(0);
            expect(results).to.deep.equal([]);
          });
        });
      });

      describe('and returns no food item', () => {
        it('returns empty array for results', () => {
          fakeAPI.method.resolves({});
          return expect(ingredientsController.getFoodMacros(food)).to.not.be.rejected.then((results) => {
            expect(fakeAPI.method.callCount).to.equal(1);
            expect(fakeAPI.method).to.have.been.calledWith('food.get', { food_id: 'tesdId1', max_results: 5 });
            expect(results.length).to.equal(0);
            expect(results).to.deep.equal([]);
          });
        });
      });
    });

    context('fatAPI call fails', () => {
      it('returns a rejected promise', () => {
          fakeAPI.method.rejects();
          return expect(ingredientsController.getFoodMacros(food)).to.be.rejected;
        });
    });

    context('food to search does not have food_id', () => {
      it('returns a rejected promise', () => {
          return expect(ingredientsController.getFoodMacros({})).to.be.rejected.then((results) => {
            expect(fakeAPI.method.callCount).to.equal(0);
          });
        });
    });
  });

  describe('getAllFoods', () => {
    let getIngredientsFromFatAPIStub;
    let ingredients;

    beforeEach(() => {
      ingredients = [
        {quantity: "10", unit: 'g', name: 'butter'}, 
        {quantity: "1", unit: 'g', name: 'salt'}
      ];
      getIngredientsFromFatAPIStub = sinon.stub(ingredientsController, 'getIngredientsFromFatAPI');
    });

    afterEach(() => {
      getIngredientsFromFatAPIStub.restore();
    });

    context('when there is an array of ingredients', () => {
      describe('and ingredients calls succeed', () => {
        let butterResults = [
          { id: 'id1', food_type: 'Generic', name: 'butter' },
          { id: 'id2', food_type: 'Generic', name: 'unsalted butter' }
        ];

        let saltResults = [
          { id: 'id3', food_type: 'Generic', name: 'salt' },
          { id: 'id4', food_type: 'Generic', name: 'pink salt' }
        ];

        it('returns a resolved promise and populates ingredients array', () => {

          getIngredientsFromFatAPIStub.withArgs('butter').returns(Promise.resolve(butterResults));
          getIngredientsFromFatAPIStub.withArgs('salt').returns(Promise.resolve(saltResults));

          return expect(ingredientsController.getAllFoods(ingredients)).to.not.be.rejected.then(() => {
            expect(getIngredientsFromFatAPIStub.callCount).to.equal(2);
            expect(getIngredientsFromFatAPIStub).to.have.been.calledWith('butter');
            expect(getIngredientsFromFatAPIStub).to.have.been.calledWith('salt');
            expect(ingredients[0].results).to.deep.equal(butterResults);
            expect(ingredients[1].results).to.deep.equal(saltResults);            
          });
        });
      });
    });

    context('when there is an empty array of ingredients', () => {
        it('returns a resolved promise', () => {
          return expect(ingredientsController.getAllFoods([])).to.not.be.rejected.then(() => {
            expect(getIngredientsFromFatAPIStub.callCount).to.equal(0);           
          });
        });
    });

    context('getIngredientsFromFatAPI call fails', () => {

      let saltResults = [
        { id: 'id3', food_type: 'Generic', name: 'salt' },
        { id: 'id4', food_type: 'Generic', name: 'pink salt' }
      ];

      it('returns a rejected promise', () => {
        getIngredientsFromFatAPIStub.withArgs('butter').returns(Promise.reject());
        getIngredientsFromFatAPIStub.withArgs('salt').returns(Promise.resolve(saltResults));

          return expect(ingredientsController.getAllFoods(ingredients)).to.be.rejected.then(() => {
            expect(getIngredientsFromFatAPIStub.callCount).to.equal(2);
            expect(getIngredientsFromFatAPIStub).to.have.been.calledWith('butter');
            expect(getIngredientsFromFatAPIStub).to.have.been.calledWith('salt');
            expect(ingredients[0].results).to.equal(undefined);
            expect(ingredients[1].results).to.deep.equal(saltResults);            
          });
      });
    });
  });

  describe('getAllMacros', () => {
    let getFoodMacrosStub;
    let ingredients;

    beforeEach(() => {
      ingredients = [
        {quantity: "10", unit: 'g', name: 'butter', results: [{ id: '1', food_type: 'Generic', name: 'butter' }, { id: '2', food_type: 'Generic', name: 'unsalted butter' }]}, 
        {quantity: "1", unit: 'g', name: 'salt', results: [{ id: '34', food_type: 'Generic', name: 'salt' }, { id: '22', food_type: 'Generic', name: 'pink salt' }]}
      ];
      getFoodMacrosStub = sinon.stub(ingredientsController, 'getFoodMacros');
    });

    afterEach(() => {
      getFoodMacrosStub.restore();
    });

    context('when there is an array of ingredients', () => {
      describe('and ingredients calls succeed', () => {
        let butterResults = [
          { calories: '5', serving_id: '123', serving_description: '10 g'},
          { calories: '50', serving_id: '568', serving_description: '100 g'}
        ];

        let saltResults = [
          { calories: '8', serving_id: '123', serving_description: '10 g'},
          { calories: '903', serving_id: '568', serving_description: '120 g'}
        ];

        it('returns a resolved promise and populates ingredients array', () => {

          getFoodMacrosStub.withArgs(ingredients[0].results[0]).returns(Promise.resolve(butterResults));
          getFoodMacrosStub.withArgs(ingredients[0].results[1]).returns(Promise.resolve(butterResults));
          getFoodMacrosStub.withArgs(ingredients[1].results[0]).returns(Promise.resolve(saltResults));
          getFoodMacrosStub.withArgs(ingredients[1].results[1]).returns(Promise.resolve(saltResults));

          return expect(ingredientsController.getAllMacros(ingredients)).to.not.be.rejected.then(() => {
            expect(getFoodMacrosStub.callCount).to.equal(4);
            expect(getFoodMacrosStub).to.have.been.calledWith(ingredients[0].results[0]);
            expect(getFoodMacrosStub).to.have.been.calledWith(ingredients[0].results[1]);
            expect(getFoodMacrosStub).to.have.been.calledWith(ingredients[1].results[0]);
            expect(getFoodMacrosStub).to.have.been.calledWith(ingredients[1].results[1]);
            expect(ingredients[0].results[0].servings).to.deep.equal(butterResults);
            expect(ingredients[1].results[1].servings).to.deep.equal(saltResults);            
          });
        });
      });
    });

    context('when there is an empty array of ingredients', () => {
        it('returns a resolved promise', () => {
          return expect(ingredientsController.getAllMacros([])).to.not.be.rejected.then(() => {
            expect(getFoodMacrosStub.callCount).to.equal(0);           
          });
        });
    });

    context('getIngredientsFromFatAPI call fails', () => {

        let butterResults = [
          { calories: '5', serving_id: '123', serving_description: '10 g'},
          { calories: '50', serving_id: '568', serving_description: '100 g'}
        ];

        let saltResults = [
          { id: 'id3', food_type: 'Generic', name: 'salt' },
          { id: 'id4', food_type: 'Generic', name: 'pink salt' }
        ];

      it('returns a rejected promise', () => {
        getFoodMacrosStub.withArgs(ingredients[0].results[0]).returns(Promise.reject());
        getFoodMacrosStub.withArgs(ingredients[0].results[1]).returns(Promise.resolve(butterResults));
        getFoodMacrosStub.withArgs(ingredients[1].results[0]).returns(Promise.resolve(saltResults));
        getFoodMacrosStub.withArgs(ingredients[1].results[1]).returns(Promise.resolve(saltResults));

          return expect(ingredientsController.getAllMacros(ingredients)).to.be.rejected.then(() => {
            expect(getFoodMacrosStub.callCount).to.equal(4);
            expect(getFoodMacrosStub).to.have.been.calledWith(ingredients[0].results[0]);
            expect(getFoodMacrosStub).to.have.been.calledWith(ingredients[0].results[1]);
            expect(getFoodMacrosStub).to.have.been.calledWith(ingredients[1].results[0]);
            expect(getFoodMacrosStub).to.have.been.calledWith(ingredients[1].results[1]);
            expect(ingredients[0].results[0].servings).to.equal(undefined);
            expect(ingredients[1].results[1].servings).to.deep.equal(saltResults);              
          });
      });
    });
  });

  describe('recalculateRecipe', () => {
    let ingredientsInfo;
    let servings = 1;

    beforeEach(() => {
      ingredientsInfo = {
        'chicken': {
          macros: { calories: 191, protein: 28.96, carb: 0, fat: 7.57 },
          qty: 2
        },
        'chickpeas': {
          macros: { calories: 180, protein: 9.54, carb: 29.98, fat: 2.99 },
          qty: 0.2
        }
      }
    });

    context('when the change is not possible', () => {
      describe('calories have changed but macros have not', () => {
        let recipe;
        beforeEach(() => {
          recipe = {
            ingredientsInfo,
            servings,
            wantedMacros: { calories: 200, protein: 59.83, carb: 6, fat: 15.74 }
          }
        });
        it('returns a rejected promise', () => {
          return expect(ingredientsController.recalculateRecipe(recipe)).to.be.rejectedWith('Impossible to change overall calories without changing macros');
        });
      });
    });

    context('when calories and macros have been changed', () => {
      describe('calories and macros have been reduced in the same ratio (+- 10%)', () => {
        let recipe;
        beforeEach(() => {
          recipe = {
            ingredientsInfo,
            servings,
            wantedMacros: { calories: 335, protein: 48, carb: 5, fat: 12 }
          }
        });
        it('returns correct new recipe quantities', () => {
          let expectedMacros = { calories: 334.4, protein: 47.86, carb: 4.8, fat: 12.59 }
          let expectedIngredients = { 
            'chicken': {macros: { calories: 191, protein: 28.96, carb: 0, fat: 7.57 }, qty: 1.6 },
            'chickpeas': { macros: { calories: 180, protein: 9.54, carb: 29.98, fat: 2.99 }, qty: 0.16 }
          };
          return expect(ingredientsController.recalculateRecipe(recipe)).to.not.be.rejected.then((response) => {
            expect(response.macros).to.deep.equal(expectedMacros);
            expect(response.ingredientsInfo).to.deep.equal(expectedIngredients);
          });
        });
      });

      describe('calories and macros have been increased in the same ratio (+- 10%)', () => {
        let recipe;
        beforeEach(() => {
          recipe = {
            ingredientsInfo,
            servings,
            wantedMacros: { calories: 627, protein: 90, carb: 9, fat: 23 }
          }
        });
        it('returns correct new recipe quantities', () => {
          let expectedMacros = { calories: 627, protein: 89.74, carb: 8.99, fat: 23.61 }
          let expectedIngredients = { 
            'chicken': {macros: { calories: 191, protein: 28.96, carb: 0, fat: 7.57 }, qty: 3 },
            'chickpeas': { macros: { calories: 180, protein: 9.54, carb: 29.98, fat: 2.99 }, qty: 0.3 }
          };
          return expect(ingredientsController.recalculateRecipe(recipe)).to.not.be.rejected.then((response) => {
            expect(response.macros).to.deep.equal(expectedMacros);
            expect(response.ingredientsInfo).to.deep.equal(expectedIngredients);
          });
        });
      });

      describe('calories and macros have changed in different ratios', () => {
        let recipe;
        beforeEach(() => {
          recipe = {
            ingredientsInfo,
            servings,
            wantedMacros: { calories: 600, protein: 80, carb: 12, fat: 10 }
          }
        });
        it('returns correct new recipe quantities', () => {
          let expectedMacros = { calories: 602.28, protein: 86.17, carb: 8.69, fat: 22.67 }
          let expectedIngredients = { 
            'chicken': {macros: { calories: 191, protein: 28.96, carb: 0, fat: 7.57 }, qty: 2.88 },
            'chickpeas': { macros: { calories: 180, protein: 9.54, carb: 29.98, fat: 2.99 }, qty: 0.29 }
          };
          return expect(ingredientsController.recalculateRecipe(recipe)).to.not.be.rejected.then((response) => {
            expect(response.macros).to.deep.equal(expectedMacros);
            expect(response.ingredientsInfo).to.deep.equal(expectedIngredients);
          });
        });
      });
    });

    context('when only one metric has changed', () => {
      describe('only calories have ben changed', () => {
        let recipe;
        beforeEach(() => {
          recipe = {
            ingredientsInfo,
            servings,
            wantedMacros: { calories: 500 }
          }
        });

        it('returns correct new recipe quantities', () => {
          let expectedMacros = { calories: 501.60, protein: 71.79, carb: 7.20, fat: 18.89 }
          let expectedIngredients = { 
            'chicken': {macros: { calories: 191, protein: 28.96, carb: 0, fat: 7.57 }, qty: 2.4 },
            'chickpeas': { macros: { calories: 180, protein: 9.54, carb: 29.98, fat: 2.99 }, qty: 0.24 }
          };
          return expect(ingredientsController.recalculateRecipe(recipe)).to.not.be.rejected.then((response) => {
            expect(response.macros).to.deep.equal(expectedMacros);
            expect(response.ingredientsInfo).to.deep.equal(expectedIngredients);
          });
        });
      });

      describe('only protein has ben changed', () => {
        let recipe;
        beforeEach(() => {
          recipe = {
            ingredientsInfo,
            servings,
            wantedMacros: { protein: 70 }
          }
        });
        it('returns correct new recipe quantities', () => {
          let expectedMacros = { calories: 488.34, protein: 69.96, carb: 6.9, fat: 18.4 }
          let expectedIngredients = { 
            'chicken': {macros: { calories: 191, protein: 28.96, carb: 0, fat: 7.57 }, qty: 2.34 },
            'chickpeas': { macros: { calories: 180, protein: 9.54, carb: 29.98, fat: 2.99 }, qty: 0.23 }
          };
          return expect(ingredientsController.recalculateRecipe(recipe)).to.not.be.rejected.then((response) => {
            expect(response.macros).to.deep.equal(expectedMacros);
            expect(response.ingredientsInfo).to.deep.equal(expectedIngredients);
          });
        });
      });
    });
  });

  describe('calculateMacrosPerServing', () => {
    let ingredientsInfo = {
        'chicken': {
          macros: { calories: 191, protein: 28.96, carb: 0, fat: 7.57 },
          qty: 2
        },
        'chickpeas': {
          macros: { calories: 180, protein: 9.54, carb: 29.98, fat: 2.99 },
          qty: 0.2
        },
        'broccoli': {
          macros: { calories: 50, protein: 2, carb: 10, fat: 3 },
          qty: 1.5
        }
      };
    
    it('returns correct macros for 1 serving', () => {
      let macros = ingredientsController.calculateMacrosPerServing(ingredientsInfo, 1);
      expect(macros).to.deep.equal({calories: 493, protein: 62.83, carb: 21, fat: 20.24});
    });

    it('returns correct macros for 2 servings', () => {
      let macros = ingredientsController.calculateMacrosPerServing(ingredientsInfo, 2);
      expect(macros).to.deep.equal({calories: 246.5, protein: 31.41, carb: 10.5, fat: 10.12});
    });
  });
});