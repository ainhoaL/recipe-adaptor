import React, { Component } from 'react';
import { Ingredient } from './Ingredient';

export class IngredientList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: [],
            ingredientsMacros: new Map(),
            caloriesPerServing: 0,
            proteinPerServig: 0,
            carbPerServing: 0,
            fatPerServing: 0
        }

        this.ingredientChange = this.ingredientChange.bind(this);
    }

    ingredientChange(ingredient) {
        let macros = new Map(this.state.ingredientsMacros);
        macros.set(ingredient.name, ingredient.macros);

        this.setState({ingredientsMacros: macros});
        this.calculateMacrosPerServing(macros);
    }

    calculateMacrosPerServing(macros) {
        let totalCalories = 0;
        let totalProtein = 0;
        let totalCarb = 0;
        let totalFat = 0;
        for (var macro of macros.values()) {
            totalCalories += macro.calories;
            totalProtein += macro.protein;
            totalCarb += macro.carb;
            totalFat += macro.fat;
        }
        this.setState({caloriesPerServing: totalCalories / this.props.servings});
        this.setState({proteinPerServig: totalProtein / this.props.servings});
        this.setState({carbPerServing: totalCarb / this.props.servings});
        this.setState({fatPerServing: totalFat / this.props.servings});
    }

    render() {
        let ingredientList = this.props.data.map(ingredient => <Ingredient data={ingredient} key={ingredient.name} recalculate={this.ingredientChange} />);
        return (
            <div>
            <div>
                {ingredientList}
            </div>
            <div>
                Per serving: <br />
                Calories: <input type="text" name="calories" id="calories" value={this.state.caloriesPerServing} /><br />
                Protein: <input type="text" name="protein" id="protein" value={this.state.proteinPerServig} /><br />
                Fat: <input type="text" name="fat" id="fat" value={this.state.fatPerServing} /><br />
                Carbs: <input type="text" name="carbs" id="carbs" value={this.state.carbPerServing} /><br />
            </div>
            </div>
        );
    }
}