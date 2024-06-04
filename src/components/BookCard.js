// src/components/BookCard.js
import React from 'react';
import { motion } from 'framer-motion';

const BookCard = ({ book, addToBookshelf }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="card"
    >
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">Author: {book.author_name?.join(', ')}</p>
        <button className="btn btn-success" onClick={() => addToBookshelf(book)}>
          Add to Bookshelf
        </button>
      </div>
    </motion.div>
  );
};

export default BookCard;
