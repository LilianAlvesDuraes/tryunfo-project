import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '',
    cardAttr2: '',
    cardAttr3: '',
    cardImage: '',
    cardRare: 'normal',
    disabledButton: true,
    cardTrunfo: false,
    cardSaved: [],
  };

  onSaveButtonClick = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.isSaveButtonDisabled());
  };

  isSaveButtonDisabled = () => {
    const { name, description, image, atrib1, atrib2, atrib3 } = this.state;
    const areaChange = name.length > 0 && description.length > 0 && image.length > 0;
    const atribMax = 90;
    const sumAtribMax = 210;
    const verifyAtb1 = Number(atrib1) >= 0 && Number(atrib1) <= atribMax;
    const verifyAtb2 = Number(atrib2) >= 0 && Number(atrib2) <= atribMax;
    const verifyAtb3 = Number(atrib3) >= 0 && Number(atrib3) <= atribMax;
    const resultAtributs = Number(atrib1) + Number(atrib2) + Number(atrib3);
    const resultSum = resultAtributs <= sumAtribMax;
    const validation = areaChange && verifyAtb1 && verifyAtb2 && verifyAtb3 && resultSum;
    this.setState({ disabledButton: !validation });
  };

  handleClick = () => {
    const { cardSaved, trunfo, hasTrunfo } = this.state;
    this.setState((previousState) => (
      {
        cardName: '',
        cardDescription: '',
        cardAttr1: 0,
        cardAttr2: 0,
        cardAttr3: 0,
        cardImage: '',
        cardRare: 'normal',
        disabledButton: true,
        cardTrunfo: false,
        cardSaved: [...cardSaved, previousState],
        hasTrunfo: hasTrunfo || trunfo,
      }));
  };

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      disabledButton,
      cardSaved,
      hasTrunfo,
    } = this.state;
    return (
      <>
        <div>
          <h1>Tryunfo</h1>
        </div>
        <Form
          onSaveButtonClick={ this.onSaveButtonClick }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          isSaveisSaveButtonDisabled={ disabledButton }
          handleClick={ this.handleClick }
          hasTrunfo={ hasTrunfo }
        />
        <Card
          onSaveButtonClick={ this.onSaveButtonClick }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        {
          cardSaved
            .map((keyObj) => (<Card
              key={ keyObj.cardName }
              cardName={ keyObj.cardName }
              cardDescription={ keyObj.cardDescription }
              cardAttr1={ keyObj.cardAttr1 }
              cardAttr2={ keyObj.cardAttr2 }
              cardAttr3={ keyObj.cardAttr3 }
              cardImage={ keyObj.cardImage }
              cardRare={ keyObj.cardRare }
              cardTrunfo={ keyObj.cardTrunfo }
            />))
        }
      </>
    );
  }
}

export default App;
