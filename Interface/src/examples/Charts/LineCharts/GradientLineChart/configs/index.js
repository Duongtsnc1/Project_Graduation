/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Argon Dashboard 2 MUI base styles
import typography from "assets/theme/base/typography";
import axios from "axios";

function getGradient(ctx, chartArea) {
  let width, height, gradient;
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, "blue");
    gradient.addColorStop(0.5, "yellow");
    gradient.addColorStop(1, "red");
  }
  return gradient;
}

function configs(index) {
  return {
    data: {
      datasets: [
        {
          data: [],
          borderColor: "#11cdef",
          backgroundColor: "#41b3a3 #2aa7d5 #6ac2e2",
          borderJoinStyle: "round",
          pointRadius: 2,
          pointBackgroundColor: "#11cdef",
          showLine: true,
          fill: "#85dcb",
        },
      ],
    },
    options: {
      // responsive: true,
      // maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          type: "realtime",
          realtime: {
            onRefresh: (chart) => {
              chart.data.datasets.forEach(async (dataset) => {
                await axios.get("http://localhost:3001/").then((response) => {
                  var newDataPoint = {
                    x: Date.now(),
                    y: response.data[index - 1],
                  };
                  console.log(index, newDataPoint);
                  dataset.data.push(newDataPoint);
                });
                // var newDataPoint = {
                //   x: Date.now(),
                //   y: Math.floor(Math.random() * 105) + 1
                // };
                // dataset.data.push(newDataPoint);
              });
            },

            duration: 90000,
            refresh: 2000,
            delay: 1000,
          },
          title: {
            display: false,
            text: "Time",
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: false,
            text: "Value",
          },
        },
      },
    },
    // options: {
    //   responsive: true,
    //   maintainAspectRatio: false,
    //   plugins: {
    //     legend: {
    //       display: false,
    //     },
    //   },
    //   interaction: {
    //     intersect: false,
    //     mode: "index",
    //   },
    //   scales: {
    //     y: {
    //       grid: {
    //         drawBorder: false,
    //         display: true,
    //         drawOnChartArea: true,
    //         drawTicks: false,
    //         borderDash: [5, 5],
    //       },
    //       ticks: {
    //         display: true,
    //         padding: 10,
    //         color: "#b2b9bf",
    //         font: {
    //           size: 11,
    //           family: typography.fontFamily,
    //           style: "normal",
    //           lineHeight: 2,
    //         },
    //       },
    //     },
    //     x: {
    //       grid: {
    //         drawBorder: false,
    //         display: false,
    //         drawOnChartArea: false,
    //         drawTicks: false,
    //         borderDash: [5, 5],
    //       },
    //       ticks: {
    //         display: true,
    //         color: "#b2b9bf",
    //         padding: 20,
    //         font: {
    //           size: 11,
    //           family: typography.fontFamily,
    //           style: "normal",
    //           lineHeight: 2,
    //         },
    //       },
    //     },
    //   },
    // },
  };
}

export default configs;
