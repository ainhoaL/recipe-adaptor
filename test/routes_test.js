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
});