// src/components/BookshelfPage.js
import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import { Link } from 'react-router-dom';
// import './BookshelfPage.css';

const BookshelfPage = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>My Bookshelf</h1>
        <Link to="/" className="btn gradient-button">
          Back to Search
        </Link>
      </div>
      <div className="row">
        {bookshelf.length > 0 ? (
          bookshelf.map((book) => (
            <div key={book.key} className="col-md-4 mb-4">
              <BookCard book={book} addToBookshelf={() => {}} />
            </div>
          ))
        ) : (
          <p>Your bookshelf is empty. Go to the <Link to="/">Search Page</Link> to add books.</p>
        )}
      </div>
    </div>
  );
};

export default BookshelfPage;
