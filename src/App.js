import React from 'react'
import { Route, Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import SearchBooks from './SearchBooks'
import * as Constants from './Constants'
import './App.css'

class BooksApp extends React.Component {
  getStateFromLocalStorage = () => {
    let defaultBooks = {
      currentlyReading: [],
      wantToRead: [],
      read: []
    };
    return localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : defaultBooks
  }

  state = {
    books: this.getStateFromLocalStorage()
  }

  addBookToBookshelf = (book, previousBookshelf, bookshelf) => {
    this.setState(state => {
        let mergeState = {}
        let processedShelfs = [previousBookshelf, bookshelf]
        let stateFiltered = Object.keys(state.books)
                                  .filter(key => !processedShelfs.includes(key))
                                  .reduce((obj, key) => {
                                    return {
                                      ...obj,
                                      [key]: state.books[key]
                                    };
                                  }, {});

        // Remove book from previous bookshelf
        if(previousBookshelf !== Constants.NONE_BOOKSHELF) {
          mergeState[previousBookshelf] = state.books[previousBookshelf].filter(item => item !== book)
        }

        // Add to the new bookshelf
        if(bookshelf !== Constants.NONE_BOOKSHELF) {
          mergeState[bookshelf] = state.books[bookshelf].concat([ book ])
        }

        return {
          books: {
            ...stateFiltered,
            ...mergeState
          }
        }
      }, () => {
        localStorage.setItem('books', JSON.stringify(this.state.books));
      })
  }

  // generating a unique key to help React identify that items have changed
  generateKey = (bookshelf, books) => {
    return bookshelf + '-' + books.length
  }

  render = () => {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>Ricardo's Reads</h1>
            </div>
            <div className="list-books-content">
              <Bookshelf key={this.generateKey("currentlyReading", this.state.books.currentlyReading)} bookshelf="currentlyReading" title="Currently Reading" books={this.state.books.currentlyReading} onChangeBookshelf={this.addBookToBookshelf} />
              <Bookshelf key={this.generateKey("wantToRead", this.state.books.wantToRead)} bookshelf="wantToRead" title="Want to Read" books={this.state.books.wantToRead} onChangeBookshelf={this.addBookToBookshelf} />
              <Bookshelf key={this.generateKey("read", this.state.books.read)} bookshelf="read" title="Read" books={this.state.books.read} onChangeBookshelf={this.addBookToBookshelf} />
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path='/search' render={() => (
          <SearchBooks bookshelfs={this.state.books} onChangeBookshelf={this.addBookToBookshelf} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
