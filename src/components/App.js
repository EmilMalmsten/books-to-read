import React from 'react';
import Header from './Header';
import peopleData from '../persons.json';

class App extends React.Component {
  constructor(){
    super();
    this.handleSearch = this.handleSearch.bind(this);
    this.createModal = this.createModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.lightBackground = this.lightBackground.bind(this);
    this.darkBackground = this.darkBackground.bind(this);
    this.calculateAge = this.calculateAge.bind(this);
    this.state = {
      people: peopleData,
      results: true,
      modal: {
        Born: '2000-01-01',
        Books: {
          Book1: {
            Title: "title1",
            Author: "author1"
          },
          Book2: {
            Title: "title2",
            Author: "author2"
          }
        }
      },
      show: 'hidden',
      background: 'dark'
    }
  }

  handleSearch(wordToMatch){
    const result = peopleData.filter(d => {
      const regex = new RegExp(wordToMatch, 'gi');
      return d.Name.match(regex);
    });
    if(result.length === 0){
      this.setState({ results: false });
    } else {
      this.setState({ results: true });
    }
    this.setState({ people: result });
  }

  createModal(e){
    const currentId = e.currentTarget.getAttribute('data-attribute');
    const Modal = this.state.people[currentId];
    this.setState({
       modal: Modal,
       show: 'active'
     });
  }

  hideModal(){
    this.setState({
      show: 'hidden'
    });
  }

  darkBackground(){
    if(this.state.show === 'active'){
      this.setState({ background: 'dark' });
    }
  }

  lightBackground(){
    if(this.state.show === 'active'){
      this.setState({ background: 'light' });
      //yo
    }
  }

  calculateAge(birthday){ /* Format: YYYYMMDD */
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  render() {
    const list = this.state.people.map((d, i) => {
      const imgUrl = process.env.PUBLIC_URL + `/img/${d.Picture}`;
      return <li
        key={i}
        className="content"
        data-attribute={i}
        onClick={ (e) => this.createModal(e) }
        >
        <img src={imgUrl} alt={d.Name} />
        <p className="person-name">{d.Name}</p>
        <p className="hover-title">Click to see {d.Name}s book recommendations!</p>
      </li>});
    const bookItems = this.state.modal.Books;
    const bookList = Object.keys(bookItems).map(key => {
      const items = this.state.modal.Books[key];
      return (
        <div
          key={key}
          className="book-item"
        >
          <div className="book-description">
            <h2>{items.Title}</h2>
            <p>{`By ${items.Author}`}</p>
            <p><span>{`Quote from ${this.state.modal.Name} - `}</span>{items.Quote}</p>
            <button><a target="_new" href={items.BookLink}>View Details</a></button>
          </div>
          <a target="_new" href={items.BookLink}><img src={items.BookCover} alt={items.Author} height="200px"></img></a>
        </div>
        )
    });
    let searchError = "";
    if(this.state.results === false){
      searchError = <p>No results found with your search input</p>
    }

    return (
      <div
        className="books-to-read"
        onMouseLeave={(e) => this.darkBackground(e)}
        onMouseEnter={(e) => this.lightBackground(e)}
        >

        <Header
          tagline={"Who's your role model?"}
          handleSearch={this.handleSearch}
        />
        <ul className="contentBody">
          {list}
        </ul>
        <div className="no-results">{searchError}</div>
        <div className={this.state.show}>
          <div
            className={`modal ${this.state.background}`}
            onClick={ (e) => {
              if(e.target.className !== 'modal-container' && this.state.background === 'light'){
                this.hideModal();
              }
              this.darkBackground();
            }}
          >
            <div className="modal-content">
              <div
                className="modal-container"
                onMouseEnter={(e) => this.darkBackground(e)}
                onMouseLeave={(e) => this.lightBackground(e)}
              >
                <div className="modal-header">
                  <span className="modal-close" onClick={this.hideModal}>&times;</span>
                  <h1>{this.state.modal.Name}</h1>
                </div>

                <div className="person-description">
                  <img
                    src={process.env.PUBLIC_URL + `/img/${this.state.modal.Picture}`}
                    alt={this.state.modal.Name}
                    >
                  </img>
                  <div className="person-description-text">
                    <h2>{`Who is ${this.state.modal.Name}?`}</h2>
                    <h3>{`Age: ${this.calculateAge(this.state.modal.Born)}`}</h3>
                    <p>{this.state.modal.Description}</p>
                  </div>
                </div>
                <div className="books-header">
                  <h3>{`${this.state.modal.Name}'s top book recommendations`}</h3>
                </div>
                <div className="display-books">
                  {bookList}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
