import React from 'react';
import PropTypes from 'prop-types';
import styles from './ConfirmationDialog.module.scss';

const ConfirmationDialog = () => (
  <div className={styles.ConfirmationDialog} data-testid="ConfirmationDialog">
    ConfirmationDialog Component
  </div>
);

ConfirmationDialog.propTypes = {};

ConfirmationDialog.defaultProps = {};

export default ConfirmationDialog;
