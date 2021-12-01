import React from 'react';
import PropTypes from 'prop-types';
import styles from './SiteDetails.module.scss';

const SiteDetails = () => (
  <div className={styles.SiteDetails} data-testid="SiteDetails">
    SiteDetails Component
  </div>
);

SiteDetails.propTypes = {};

SiteDetails.defaultProps = {};

export default SiteDetails;
