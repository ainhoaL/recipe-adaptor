import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  render() {
    return (
      <div>
        <div>
          <form id="ingredientsform">
            Servings: <input type="text" name="servings" id="servings" /><br />
            Ingredients: <textarea name="ingredients" id="ingredients"></textarea><br />
            <input type="submit" value="Calculate Macros" />
            <span id="status-display"></span>
          </form>
        </div>
        <div>
          Per serving: <br />
          Calories: <input type="text" name="calories" id="calories" /><br />
          Protein: <input type="text" name="protein" id="protein" /><br />
          Fat: <input type="text" name="fat" id="fat" /><br />
          Carbs: <input type="text" name="carbs" id="carbs" /><br />
        </div>
      </div>
    );
  }
}

export default App;
