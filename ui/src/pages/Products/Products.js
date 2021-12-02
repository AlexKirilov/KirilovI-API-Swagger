import React from 'react';
import PropTypes from 'prop-types';
import styles from './Products.module.scss';

const Products = () => (
  <div className={styles.Products} data-testid="Products">
    Products Component
  </div>
);

Products.propTypes = {};

Products.defaultProps = {};

export default Products;
