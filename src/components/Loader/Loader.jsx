import React from 'react';
import { BounceLoader } from 'react-spinners';
import css from './Loader.module.css';

const Loader = () => (
  <div className={css.loader}>
    <BounceLoader color="#0077ff" />
  </div>
);

export default Loader;
