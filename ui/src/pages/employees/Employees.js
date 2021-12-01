import React from 'react';
import PropTypes from 'prop-types';
import styles from './Employees.module.scss';

const Employees = () => (
  <div className={styles.Employees} data-testid="Employees">
    Employees Component
  </div>
);

Employees.propTypes = {};

Employees.defaultProps = {};

export default Employees;
