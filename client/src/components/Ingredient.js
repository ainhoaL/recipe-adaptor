import React, { Component } from 'react';

export class Ingredient extends Component {
    constructor(props) {
        super(props);

        this.state = {selectedOption: 0, selectedServing: 0, qty: parseFloat(this.props.data.quantity), calories: 0, carbohydrate: 0, fat: 0, protein: 0 };

        this.handleIngredientChange = this.handleIngredientChange.bind(this);
        this.handleServingChange = this.handleServingChange.bind(this);
        this.handleQtyChange = this.handleQtyChange.bind(this);

        this.calculateMacros(0, 0, this.props.data.quantity);
    }

    handleIngredientChange(event) {
        let selectedOption = event.target.value;
        let selectedServing = 0;
        this.setState({selectedOption, selectedServing});

        this.calculateMacros(selectedOption, selectedServing, this.state.qty);
    }

    handleServingChange(event) {
        let selectedServing =  event.target.value;
        this.setState({selectedServing});

        this.calculateMacros(this.state.selectedOption, selectedServing, this.state.qty);
    }

    handleQtyChange(event) {
        let qty = parseFloat(event.target.value);
        this.setState({qty});

        this.calculateMacros(this.state.selectedOption, this.state.selectedServing, qty);
    }

    calculateMacros(selectedOption, selectedServing, qty) {

        let ingredientInfo = this.props.data.results[selectedOption].servings[selectedServing];

        if (ingredientInfo) {
            let calories = ingredientInfo.calories;
            let protein = ingredientInfo.protein;
            let carb = ingredientInfo.carbohydrate;
            let fat = ingredientInfo.fat;

            this.setState({calories, carb, fat, protein});
            
            this.props.recalculate({name: this.props.data.name, macros: {calories, protein, carb, fat}, selectedOption, selectedServing, qty });
        }
    }

    render() {
        if (!this.props.data) {
            return null;
        }
        let ingredientOptions = this.props.data.results.map((ingredientOption, index) => <option value={index} key={ingredientOption.food_id}>{ingredientOption.food_name}</option>);
        let servingOptions = this.props.data.results[this.state.selectedOption].servings.map((servingOption, index) => <option value={index} key={servingOption.serving_id}>{servingOption.serving_description}</option>);
        return (
            <div>
                <select name={this.props.data.name} onChange={this.handleIngredientChange}>
                    {ingredientOptions}
                </select>
                <select onChange={this.handleServingChange}>
                    {servingOptions}
                </select>
                <input type="number" name="qty" value={this.state.qty} onChange={this.handleQtyChange} />
                {this.state.calories} {this.state.protein} {this.state.carb} {this.state.fat}
            </div>
        );   
    }
}