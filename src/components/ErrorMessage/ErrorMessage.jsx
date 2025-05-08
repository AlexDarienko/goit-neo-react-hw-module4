import React from 'react';
import css from './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => (
  <p className={css.error}>{message}</p>
);

export default ErrorMessage;
