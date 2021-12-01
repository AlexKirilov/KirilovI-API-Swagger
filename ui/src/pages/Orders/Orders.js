import React from 'react';
import PropTypes from 'prop-types';
import styles from './Orders.module.scss';

const Orders = () => (
  <div className={styles.Orders} data-testid="Orders">
    Orders Component
  </div>
);

Orders.propTypes = {};

Orders.defaultProps = {};

export default Orders;
