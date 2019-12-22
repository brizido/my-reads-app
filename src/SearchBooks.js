import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { throttle } from "throttle-debounce";
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import * as Constants from './Constants'

class SearchBooks extends Component {
  static propTypes = {
    bookshelfs: PropTypes.object,
    onChangeBookshelf: PropTypes.func
  }

  state = {
    term: '',
    books: []
  }

  handleChange = (event) => {
    let term = event.target.value
    this.setState({ term }, () => {
      this.searchBooksThrottled(this.state.term);
    })
  }

  searchBooks = (term) => {
    BooksAPI.search(term).then((books) => {
      if(books === undefined || books.error) {
        this.setState({ books: [] })
      } else {
        this.setState({ books })
      }
    })
  }

  searchBooksThrottled = throttle(500, this.searchBooks)

  findBookshelfForBook = (book, bookshelfs) => {
    const bookshelfNames = Object.keys(bookshelfs)
    let bookshelf = Constants.NONE_BOOKSHELF

    bookshelfNames.forEach((name) => {
      if (bookshelfs[name].filter(el => el.id === book.id).length > 0) {
        bookshelf = name
      }
    })

    return bookshelf
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.term} onChange={this.handleChange} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map((book) => (
              <li key={book.id}>
                <Book book={book} onChangeBookshelf={this.props.onChangeBookshelf} bookshelf={this.findBookshelfForBook(book, this.props.bookshelfs)} />
              </li>
            ))}
          </ol>
        </div>
    </div>
    )
  }
}

export default SearchBooks