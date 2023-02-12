import { Component } from 'react';

import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.reset();
  };

  reset() {
    this.setState({ search: '' });
  }

  render() {
    const { search } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <form class="form" onSubmit={handleSubmit}>
        <button type="submit" class="button">
          <span class="button-label">Search</span>
        </button>

        <input
          onChange={handleChange}
          name="search"
          value={search}
          class="input"
          type="text"
          autocomplete="off"
          autofocus
        />
      </form>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
