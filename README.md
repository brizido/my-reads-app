# Ricardo MyReads Project

This project is part of Udacity Nanodegree. 

## Installation and running

How to run this application:

* install all project dependencies with `yarn install`
* start the development server with `yarn start`

## The application

The application has 2 screens:

- Bookshelves screen
- Search screen

The contents of the bookshelves are persisted in localstorage.

## The components

The application has been broken down in the following components:

- `Bookshelf` - Component wrapping each bookshelf (e.g. Want to Read)
- `Book` - Representation of the Book, including cover, title and authors
- `SearchBooks` - Screen where new books can be added. This screen implements a "as-you-type" search. Throttling on the search input field has been implemented here. Once a search is performed the books available are displayed in a grid format.

## Areas that I would improve with more time

- Add testing
- Cache the API requests
- Improve usability / UX
- Abstract a few more components like BookCover, etc.
