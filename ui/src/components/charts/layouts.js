export const lineChartLayout = {
  title: "Sales",
  showlegend: false,
  xaxis: {
    showline: true,
    showgrid: true,
    showticklabels: true,
    linecolor: "rgb(204,204,204)",
    linewidth: 2,
    autotick: true,
    ticks: "outside",
    tickcolor: "rgb(204,204,204)",
    tickwidth: 2,
    ticklen: 5,
    tickfont: {
      family: "Arial",
      size: 12,
      color: "rgb(82, 82, 82)",
    },
  },
  yaxis: {
    showgrid: true,
    zeroline: true,
    showline: true,
    showticklabels: true,
  },
  autosize: true,
  margin: {
    autoexpand: true,
    // l: 100,
    // r: 20,
    // t: 100,
  },
//   annotations: [
//     {
//       xref: "paper",
//       yref: "paper",
//       x: 0.0,
//       y: 1.05,
//       xanchor: "left",
//       yanchor: "bottom",
//       // text: "Main Source for News",
//       font: {
//         family: "Arial",
//         size: 30,
//         color: "rgb(37,37,37)",
//       },
//       showarrow: false,
//     },
//     // {
//     //   xref: "paper",
//     //   yref: "paper",
//     //   x: 0.5,
//     //   y: -0.1,
//     //   xanchor: "center",
//     //   yanchor: "top",
//     //   text: "Source: Pew Research Center & Storytelling with data",
//     //   showarrow: false,
//     //   font: {
//     //     family: "Arial",
//     //     size: 12,
//     //     color: "rgb(150,150,150)",
//     //   },
//     // },
//   ],
};

export const pieChartLayout = {
  // height: 400,
  // width: 500
  title: 'Pie Chart',
  showlegend: true,
  margin: {"t": 0, "b": 0, "l": 0, "r": 0},
  // grid: {rows: 1, columns: 2}
  // annotations: [
  //   {
  //     font: {
  //       size: 20
  //     },
  //     showarrow: false,
  //     // text: 'GHG',
  //     x: 0.17,
  //     y: 0.5
  //   },
  //   {
  //     font: {
  //       size: 20
  //     },
  //     showarrow: false,
  //     text: 'CO2',
  //     x: 0.82,
  //     y: 0.5
  //   }
  // ],
}