const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const server = require('../server');

const ingredientsController =  require('../controllers/ingredients_controller');

describe('Routes', () => {

    describe('/api/calculatemacros', () => {
        let getIngredientsInfoStub;
        beforeEach(() => {
            getIngredientsInfoStub = sinon.stub(ingredientsController, 'getIngredientsInfo');
        });

        afterEach(() => {
            getIngredientsInfoStub.restore();
        });

        let testRecipe = {
            servings: '1',
            ingredients: '20g strawberries'
        };

        let result = [{
            name: 'strawberries',
            quantity: 20,
            unit: 'g',
            results: []
        }];

        it('POST gets ingredients info', (done) => {
            getIngredientsInfoStub.returns(Promise.resolve(result));
            request(server)
                .post('/api/calculatemacros')
                .send(testRecipe)
                .expect(200)
                .end((error, response) => {
                    expect(getIngredientsInfoStub.callCount).to.equal(1);
                    expect(getIngredientsInfoStub).to.have.been.calledWith(testRecipe);
                    expect(response.body).to.deep.equal(result);
                    done();
                });
        });
    });

    describe('/api/recalculaterecipe', () => {
        let recalculateRecipeStub;
        beforeEach(() => {
            recalculateRecipeStub = sinon.stub(ingredientsController, 'recalculateRecipe');
        });

        afterEach(() => {
            recalculateRecipeStub.restore();
        });

        let testRecipe = {
            ingredientsInfo: {
                'chicken': {
                    macros: { calories: 191, protein: 28.96, carb: 0, fat: 7.57 },
                    qty: 2
                },
                'chickpeas': {
                    macros: { calories: 180, protein: 9.54, carb: 29.98, fat: 2.99 },
                    qty: 0.2
                }
            },
            servings: 1,
            wantedMacros: { calories: 200, protein: 59.83, carb: 6, fat: 15.74 }
        };

        let result = {
            ingredientsInfo: {
                'chicken': {
                    macros: { calories: 191, protein: 28.96, carb: 0, fat: 7.57 },
                    qty: 3
                },
                'chickpeas': {
                    macros: { calories: 180, protein: 9.54, carb: 29.98, fat: 2.99 },
                    qty: 0.7
                }
            },
            servings: 1,
            macros: { calories: 600, protein: 40, carb: 10, fat: 8 }
        };

        it('POST recalculates the recipe ingredients', (done) => {
            recalculateRecipeStub.returns(Promise.resolve(result));
            request(server)
                .post('/api/recalculaterecipe')
                .send(testRecipe)
                .expect(200)
                .end((error, response) => {
                    expect(recalculateRecipeStub.callCount).to.equal(1);
                    expect(recalculateRecipeStub).to.have.been.calledWith(testRecipe);
                    expect(response.body).to.deep.equal(result);
                    done();
                });
        });
    });
});