import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header>
        <input
          type="text"
          placeholder={this.props.tagline}
          ref={(input) => this.searchInput = input}
          onChange={() => this.props.handleSearch(this.searchInput.value)}
        >
        </input>
      </header>
    )
  }
}

export default Header;
