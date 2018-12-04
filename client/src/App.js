import React, { Component } from 'react';
import './App.css';
import { IngredientList } from './components/IngredientList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      servings: 1
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    let servings = data.get('servings');
    let ingredients = data.get('ingredients');
    let bodydata = JSON.stringify({ servings, ingredients});

    this.setState({ servings });

    fetch('/api/calculatemacros', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: bodydata
    })
    .then(res => res.json())
    .then(response => {
      this.setState({ ingredients: response});
    });
  }

  render() {
    return (
      <div>
        <div>
          <form id="ingredientsform" onSubmit={this.handleSubmit}>
            Servings: <input type="text" name="servings" id="servings" value="1" /><br />
            Ingredients: <textarea name="ingredients" id="ingredients"></textarea><br />
            <input type="submit" value="Calculate Macros" />
            <span id="status-display"></span>
          </form>
        </div>
        <div>
          <IngredientList data={this.state.ingredients} servings={this.state.servings} />
        </div>
      </div>
    );
  }
}

export default App;
