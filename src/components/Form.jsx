import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
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
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;
    return (
      <form>
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            value={ cardName }
            name="cardName"
            data-testid="name-input"
            onChange={ onInputChange }
            required
          />
        </label>
        <label htmlFor="description">
          <textarea
            id="description"
            value={ cardDescription }
            name="cardDescription"
            data-testid="description-input"
            onChange={ onInputChange }
            required
          />
        </label>
        <label htmlFor="atributo1">
          <input
            type="number"
            id="atributo1"
            value={ cardAttr1 }
            name="cardAttr1"
            data-testid="attr1-input"
            onChange={ onInputChange }
            required
          />
        </label>
        <label htmlFor="atributo2">
          <input
            type="number"
            id="atributo2"
            value={ cardAttr2 }
            name="cardAttr2"
            data-testid="attr2-input"
            onChange={ onInputChange }
            required
          />
        </label>
        <label htmlFor="atributo3">
          <input
            type="number"
            id="atributo3"
            value={ cardAttr3 }
            name="cardAttr3"
            data-testid="attr3-input"
            onChange={ onInputChange }
            required
          />
        </label>
        <label htmlFor="image">
          <input
            id="image"
            type="text"
            value={ cardImage }
            name="cardImage"
            data-testid="image-input"
            onChange={ onInputChange }
            required
          />
        </label>
        <label htmlFor="raridade">
          <select
            id="raridade"
            value={ cardRare }
            name="cardRare"
            data-testid="rare-input"
            onChange={ onInputChange }
            required
          >
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>
        <label htmlFor="trunfo">
          Super Trunfo
          {!hasTrunfo ? (
            <input
              type="checkbox"
              name="cardTrunfo"
              checked={ cardTrunfo }
              id="trunfo"
              data-testid="trunfo-input"
              onChange={ onInputChange }
              required
            />) : (<p>Você já tem um Super Trunfo em seu baralho</p>)}
        </label>
        <button
          type="button"
          name="button"
          data-testid="save-button"
          onClick={ () => onSaveButtonClick({
            cardName,
            cardDescription,
            cardAttr1,
            cardAttr2,
            cardAttr3,
            cardImage,
            cardRare,
            cardTrunfo,
          }) }
          disabled={ isSaveButtonDisabled }
        >
          Salvar
        </button>
      </form>
    );
  }
}
Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
