import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Constants from './Constants'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    bookshelf: PropTypes.string,
    onChangeBookshelf: PropTypes.func
  };

  state = {
    select: this.props.bookshelf || Constants.NONE_BOOKSHELF
  }

  changeBookshelf = (event, book) => {
    let prevBookshelf = this.state.select
    let newBookshelf = event.currentTarget.value
    this.setState({select: newBookshelf}) // controlled component

    this.props.onChangeBookshelf(book, prevBookshelf, newBookshelf)
  }

  render() {
    const { book } = this.props

    let authors = book.authors ? book.authors.map(author => {
      return (
        <div key={author}>
          <span>{author}</span>
          <br />
        </div>
      )
    }) : ''

    let coverImage = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : ''

    return (
      <div>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: this.props.coverWidth, height: this.props.coverHeight, backgroundImage: 'url("' + coverImage + '")' }}></div>
            <div className="book-shelf-changer">
              <select onChange={(e) => { this.changeBookshelf(e, book) }} value={this.state.select}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{authors}</div>
        </div>
      </div>
    )
  }
}

Book.defaultProps = {
  coverWidth: 128,
  coverHeight: 193
}

export default Book
