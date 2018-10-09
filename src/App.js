import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'

import MainPage from './components/pages/MainPage';
import SearchPage from './components/pages/SearchPage';
import Book from './components/Book';


class BooksApp extends React.Component {
  render() {
// this would be easier to mount a spesific page to a specific route
    return (
      <div>
        <Route exact path="/" component={ MainPage } />
        <Route exact path="/search" component={ SearchPage } />
        <Route path="/book/:id" component={ Book } />
      </div>
    );
  }
}
export default BooksApp
