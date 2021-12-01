import React from "react";
import Plot from "react-plotly.js";
import PropTypes from "prop-types";
import styles from "./PieChart.module.scss";
import { pieChartLayout } from "../layouts";

const PieChart = ({data}) => (
  <div className={styles.PieChart} data-testid="PieChart">
    <Plot data={data} layout={pieChartLayout} />
  </div>
);

PieChart.propTypes = {
  data: PropTypes.object.isRequired
};

PieChart.defaultProps = {};

export default PieChart;
