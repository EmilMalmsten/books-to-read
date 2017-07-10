import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div className="header-div">
        <header>
          <input
            type="text"
            placeholder={this.props.tagline}
            ref={(input) => this.searchInput = input}
            onChange={() => this.props.handleSearch(this.searchInput.value)}
          >
          </input>
        </header>
        <a target="_new" href="https://twitter.com/NewBookToRead"><span className="twitter-button" title="Close"></span></a>
      </div>
    )
  }
}

export default Header;
