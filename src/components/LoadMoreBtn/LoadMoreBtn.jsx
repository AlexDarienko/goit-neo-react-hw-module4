import React from 'react';
import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick }) => (
  <button onClick={onClick} className={css.button}>
    Load more
  </button>
);

export default LoadMoreBtn;
