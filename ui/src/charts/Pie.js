import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useEffect, useRef } from "react";

export const PieChart = ({ data }) => {
  const chart = useRef(null);
  am4core.useTheme(am4themes_animated);

  useEffect(() => {
    let isSubscribed = true

    if (isSubscribed)
      chartView();

    return () => {
      isSubscribed = false;
    };
  }, []);

  const chartView = () => {
    var chart = am4core.create("chartdiv", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = data;

    chart.innerRadius = am4core.percent(40);
    chart.depth = 180;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";
    chart.legend.disabled = false;
    chart.legend.scrollable = true;

    var series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "litres";
    series.dataFields.depthValue = "litres";
    series.dataFields.category = "country";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 3;
  }


  return (
    <div id="chartdiv"></div>
  )
}