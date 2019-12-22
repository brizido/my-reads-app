import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    bookshelf: PropTypes.string.isRequired,
    onChangeBookshelf: PropTypes.func.isRequired
  }

  state = {
    books: this.props.books || []
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.state.books.map((book) => (
            <li key={book.id}>
              <Book book={book} onChangeBookshelf={this.props.onChangeBookshelf} bookshelf={this.props.bookshelf} />
            </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
