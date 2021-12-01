import React from 'react';
import PropTypes from 'prop-types';
import styles from './SiteLogs.module.scss';

const SiteLogs = () => (
  <div className={styles.SiteLogs} data-testid="SiteLogs">
    SiteLogs Component
  </div>
);

SiteLogs.propTypes = {};

SiteLogs.defaultProps = {};

export default SiteLogs;
