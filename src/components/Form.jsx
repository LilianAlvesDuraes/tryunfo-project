import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="name">
          <input type="text" id="name" data-testid="name-input" />
        </label>
        <label htmlFor="description">
          <textarea id="description" data-testid="description-input" />
        </label>
        <label htmlFor="atributo">
          <input id="atributo" number="" data-testid="attr1-input" />
          <input id="atributo" number="" data-testid="attr2-input" />
          <input id="atributo" number="" data-testid="attr3-input" />
        </label>
        <label htmlFor="image">
          <input id="image" type="text" data-testid="image-input" />
        </label>
        <label htmlFor="raridade">
          <select id="raridade" data-testid="rare-input">
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>
        <label htmlFor="trunfo">
          <input type="checkbox" name="" id="trunfo" data-testid="trunfo-input" />
        </label>
        <button type="button" id="botao" data-testid="save-button">Salvar</button>
      </form>
    );
  }
}

export default Form;
