import React from "react";
import PropTypes from "prop-types";
import styles from "./Dashboard.module.scss";

import PieChart from "../../components/charts/PieChart/PieChart.lazy";
import LineChart from "../../components/charts/LineChart/LineChart.lazy";

const Dashboard = () => {
  var lineChartData = [
    {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      type: "scatter",
      marker: { color: "red" },
      mode: "lines",
      name: "sales",
    },
  ];

  const pieChartData = [
    {
      values: [19, 26, 55],
      labels: ["Residential", "Non-Residential", "Utility"],
      type: "pie",
      hole: .5,
      text: "CO2",
      textposition: "inside",
      // domain: { column: 1 },
      name: "CO2 Emissions",
      hoverinfo: "label+percent+name",
    },
  ];

  return (
    <div className={styles.Dashboard} data-testid="Dashboard">
      <LineChart data={lineChartData} className={styles.SalesLineChart}></LineChart>
      <PieChart data={pieChartData}></PieChart>
      <PieChart data={pieChartData}></PieChart>
      <PieChart data={pieChartData}></PieChart>
      <PieChart data={pieChartData}></PieChart>
    </div>
  );
};

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
