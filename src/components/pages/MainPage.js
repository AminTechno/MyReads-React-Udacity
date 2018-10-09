import React from 'react'
import * as BooksAPI from '../../BooksAPI'
import { Link } from 'react-router-dom'
import Shelf from '../Shelf'

class MainPage extends React.Component {

//to have some starting books state
  constructor(props) {
    super(props);
    this.state = {
      books : []
    }
  }
//to load all the books that we are currentlyReading
  componentDidMount() {
    BooksAPI.getAll()
    .then(resp => {
    console.log(resp);
    this.setState({books:resp});
    });
  }
 render() {
   return (
     <div className="list-books">
       <div className="list-books-title">
         <h1>MyReads</h1>
       </div>
       <div className="list-books-content">
         <div>
          <Shelf name="Curently Reading" books={this.state.books.filter(b => b.Shelf === "currentlyReading")} />
          <Shelf name="Want To Read" books={this.state.books.filter(b => b.Shelf === "wantToRead")} />
          <Shelf name="Read" books={this.state.books.filter(b => b.Shelf === "read")} />
        </div>
       </div>
       <div className="open-search">
         <Link to="/search">Add a book</Link>
       </div>
     </div>
   );
 }
}
export default MainPage;
