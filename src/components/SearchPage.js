// src/components/SearchPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import './SearchPage.css';
import { Spinner } from 'react-bootstrap';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Default books for good UI
  const defaultBooks = [
    { key: 'OL1M', title: '1984', author_name: ['George Orwell'] },
    { key: 'OL2M', title: 'To Kill a Mockingbird', author_name: ['Harper Lee'] },
    { key: 'OL3M', title: 'Pride and Prejudice', author_name: ['Jane Austen'] },
    { key: 'OL4M', title: 'The Great Gatsby', author_name: ['F. Scott Fitzgerald'] },
    { key: 'OL5M', title: 'Moby Dick', author_name: ['Herman Melville'] },
    { key: 'OL6M', title: 'War and Peace', author_name: ['Leo Tolstoy'] },
    { key: 'OL7M', title: 'The Catcher in the Rye', author_name: ['J.D. Salinger'] },
    { key: 'OL8M', title: 'Brave New World', author_name: ['Aldous Huxley'] },
    { key: 'OL9M', title: 'The Hobbit', author_name: ['J.R.R. Tolkien'] },
    { key: 'OL10M', title: 'Fahrenheit 451', author_name: ['Ray Bradbury'] },
  ];

  useEffect(() => {
    if (query.length > 2) {
      setLoading(true);
      axios
        .get(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`)
        .then(response => {
          setResults(response.data.docs);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    } else {
      setResults(defaultBooks);
    }
  }, [query]);

  const addToBookshelf = (book) => {
    let bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    if (!bookshelf.some(b => b.key === book.key)) {
      bookshelf.push(book);
      localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
      toast.success('Book added to your bookshelf!');
    } else {
      toast.info('Book is already in your bookshelf.');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Search for Books</h1>
        <Link to="/bookshelf" className="btn gradient-button">
          My Bookshelf
        </Link>
      </div>
      <input
        type="text"
        className="form-control search-bar"
        placeholder="Enter book name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading ? (
        <div className="spinner-container">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="row">
          {results.map((book) => (
            <motion.div
              key={book.key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="col-md-4 mb-4"
            >
              <BookCard book={book} addToBookshelf={addToBookshelf} />
            </motion.div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default SearchPage;
