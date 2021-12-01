import React from "react";
import PropTypes from "prop-types";
import Plot from "react-plotly.js";
import styles from "./LineChart.module.scss";
import { lineChartLayout } from "../layouts";

const LineChart = ({ data }) => (
  <div className={styles.LineChart} data-testid="LineChart">
    <Plot data={data} layout={lineChartLayout} />
  </div>
);

LineChart.propTypes = {
  data: PropTypes.object.isRequired
};

LineChart.defaultProps = {};

export default LineChart;
