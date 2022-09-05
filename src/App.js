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

  onInputChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.isSaveButtonDisabled);
  };

  isSaveButtonDisabled = () => {
    this.setState(({
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
    }) => {
      const areaChang = cardName
        .length > 0 && cardDescription
        .length > 0 && cardImage
        .length > 0;
      const atribMax = 90;
      const sumAtribMax = 210;
      const verifyAtb1 = Number(cardAttr1) >= 0 && Number(cardAttr1) <= atribMax;
      const verifyAtb2 = Number(cardAttr2) >= 0 && Number(cardAttr2) <= atribMax;
      const verifyAtb3 = Number(cardAttr3) >= 0 && Number(cardAttr3) <= atribMax;
      const resultAtributs = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);
      const resultSum = resultAtributs <= sumAtribMax;
      const validation = areaChang && verifyAtb1 && verifyAtb2 && verifyAtb3 && resultSum;
      this.setState({ disabledButton: !validation });
    });
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
          onInputChange={ this.onInputChange }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          isSaveButtonDisabled={ disabledButton }
          // handleClick={ this.handleClick }
          hasTrunfo={ hasTrunfo }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        {/* {
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
        } */}
      </>
    );
  }
}

export default App;
