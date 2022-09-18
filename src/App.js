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
    hasTrunfo: false,
    cardSaved: [],
    filterName: '',
  };

  onInputChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.isSaveButtonDisabled());
  };

  isSaveButtonDisabled = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
    } = this.state;
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
  };

  handleClick = async ({
    cardName,
    cardDescription,
    cardAttr1,
    cardAttr2,
    cardAttr3,
    cardImage,
    cardRare,
    cardTrunfo,
  }) => {
    const { cardSaved } = this.state;
    await this.setState((previousState) => (
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
        cardSaved: [...previousState.cardSaved, {
          cardName,
          cardDescription,
          cardAttr1,
          cardAttr2,
          cardAttr3,
          cardImage,
          cardRare,
          cardTrunfo,
        }],
      }), () => {
      this.setState(() => {
        const teste = cardSaved.some((item) => item.cardTrunfo === true);
        return { hasTrunfo: teste };
      });
    });
    // if (!cardTrunfo) {
    //   this.setState({ hasTrunfo: false });
    // } else {
    //   this.setState({ hasTrunfo: true });
    // }
  };

  cardDelete = ({ target }) => {
    const { name } = target;
    const { cardSaved } = this.state;
    const cards = cardSaved.filter((iten) => iten.cardName !== name);
    this.setState({ cardSaved: cards }, () => {
      this.setState({ hasTrunfo: cardSaved.some((item) => item.cardTrunfo === true) });
    });
    // target.parentElement.remove();
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
      filterName,
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
          hasTrunfo={ hasTrunfo }
          onSaveButtonClick={ () => this.handleClick({
            cardName,
            cardDescription,
            cardAttr1,
            cardAttr2,
            cardAttr3,
            cardImage,
            cardRare,
            cardTrunfo,
          }) }
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
          cardDelete={ this.cardDelete }
        />
        {
          cardSaved
            .filter((iten) => iten.cardName.includes(filterName))
            .map((keyObj) => (
              <div key={ keyObj.cardName }>
                <Card
                  cardName={ keyObj.cardName }
                  cardDescription={ keyObj.cardDescription }
                  cardAttr1={ keyObj.cardAttr1 }
                  cardAttr2={ keyObj.cardAttr2 }
                  cardAttr3={ keyObj.cardAttr3 }
                  cardImage={ keyObj.cardImage }
                  cardRare={ keyObj.cardRare }
                  cardTrunfo={ keyObj.cardTrunfo }
                />
                <button
                  data-testid="delete-button"
                  type="button"
                  onClick={ this.cardDelete }
                  name={ keyObj.cardName }
                >
                  Excluir
                </button>
              </div>
            ))
        }
        <input
          type="text"
          data-testid="name-filter"
          name="filterName"
          value={ filterName }
          onChange={ this.onInputChange }
        />
      </>
    );
  }
}

export default App;
