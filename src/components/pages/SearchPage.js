import React from 'react'

import { Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI'
import Book from '../Book';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      results: [],
      query: ""
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then(resp => {
      this.setState({ books: resp });
    });
  }
// thi method to change the state
  updateQuery = (query) => {
    this.setState({query: query}, this.submitSearch);
  }
/* this method to check if the query is empty or undefined it will going to empty (clear) the result list
if not it will going to search for the query and then if we get an error it will clear the result list
else it will set the results to the results list*/
  submitSearch() {
    if(this.state.query === '' || this.state.query === undefined) {
      return this.setState({ results: [] });
    }
    BooksAPI.search(this.state.query.trim()).then(res => {
      if(res.error) {
        return this.setState({ results: [] });
      }
      else {
        res.forEach(b => {
          let find = this.state.books.filter(B => B.id === b.id);
          if(find[0]) { b.shelf = find[0].shelf; }
        });
        return this.setState({ results: res });
      }
    });
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(resp => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }));
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.results.map((book, key) => <Book updateBook={this.updateBook} book={book} key={key} />)
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
