import React, { Component } from 'react';
import { Ingredient } from './Ingredient';

export class IngredientList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: [],
            ingredientsInfo: {},
            caloriesPerServing: 0,
            proteinPerServig: 0,
            carbPerServing: 0,
            fatPerServing: 0
        }

        this.ingredientChange = this.ingredientChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    ingredientChange(ingredient) {
        let ingredientsInfo = this.state.ingredientsInfo;
        ingredientsInfo[ingredient.name] = { macros: ingredient.macros, qty: ingredient.qty };

        this.setState({ingredientsInfo});
        this.calculateMacrosPerServing(ingredientsInfo);
    }

    calculateMacrosPerServing(ingredientsInfo) {
        let totalCalories = 0;
        let totalProtein = 0;
        let totalCarb = 0;
        let totalFat = 0;
        let ingredientMacros;
        let qty = 0;

        for (let ingredientName in ingredientsInfo) {
            if(ingredientsInfo.hasOwnProperty(ingredientName)) {
                ingredientMacros = ingredientsInfo[ingredientName].macros;
                qty = ingredientsInfo[ingredientName].qty;
                totalCalories += ingredientMacros.calories * qty;
                totalProtein += ingredientMacros.protein * qty;
                totalCarb += ingredientMacros.carb * qty;
                totalFat += ingredientMacros.fat * qty;
            }
        }

        this.setState({caloriesPerServing: totalCalories / this.props.servings});
        this.setState({proteinPerServig: totalProtein / this.props.servings});
        this.setState({carbPerServing: totalCarb / this.props.servings});
        this.setState({fatPerServing: totalFat / this.props.servings});
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        let calories = data.get('calories');
        let protein = data.get('protein');
        let fat = data.get('fat');
        let carbs = data.get('carbs');
        let macros = {calories, protein, fat, carbs};

        let bodydata = JSON.stringify({ ingredientsInfo: this.state.ingredientsInfo, servings: this.props.servings, wantedMacros: macros });

        fetch('/api/recalculaterecipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: bodydata
        })
        .then(res => res.json())
        .then(response => {
            console.log("RECALCULATED RECIPE");
            console.log(response);
        });

    }

    handleOnChange(event) {
    }

    render() {
        let ingredientList = this.props.data.map(ingredient => <Ingredient data={ingredient} key={ingredient.name} recalculate={this.ingredientChange} />);
        return (
            <div>
            <div>
                {ingredientList}
            </div>
            <div>
                <form id="macrosform" onSubmit={this.handleSubmit}>
                    Per serving: <br />
                    Calories: <input type="text" name="calories" id="calories" value={this.state.caloriesPerServing} onChange={this.handleOnChange} /><br />
                    Protein: <input type="text" name="protein" id="protein" value={this.state.proteinPerServig} onChange={this.handleOnChange} /><br />
                    Fat: <input type="text" name="fat" id="fat" value={this.state.fatPerServing} onChange={this.handleOnChange} /><br />
                    Carbs: <input type="text" name="carbs" id="carbs" value={this.state.carbPerServing} onChange={this.handleOnChange} /><br />
                    <input type="submit" value="Recalculate ingredient quantities" />
                </form>
            </div>
            </div>
        );
    }
}