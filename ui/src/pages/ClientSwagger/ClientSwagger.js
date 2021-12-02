import React from 'react';
import PropTypes from 'prop-types';
import styles from './ClientSwagger.module.scss';

const ClientSwagger = () => (
  <div className={styles.ClientSwagger} data-testid="ClientSwagger">
    <iframe className={styles.IFrame} src="http://localhost:4567/api/client-docs/"></iframe>
  </div>
);

ClientSwagger.propTypes = {};

ClientSwagger.defaultProps = {};

export default ClientSwagger;
