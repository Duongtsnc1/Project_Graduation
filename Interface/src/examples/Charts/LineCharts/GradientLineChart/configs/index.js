function configs(type = "sensor", threshold = 0) {
  // const annotation =
  //   threshold && type === "error"
  //     ? {
  //         annotations: [
  //           {
  //             type: "line",
  //             mode: "horizontal",
  //             scaleID: "y-axis-0",
  //             value: threshold,
  //             borderColor: "rgb(75, 192, 192)",
  //             borderWidth: 4,
  //             label: {
  //               enabled: true,
  //               content: "Threshold",
  //             },
  //           },
  //         ],
  //       }
  //     : null;
  const datasets =
    type === "sensor"
      ? [
          {
            data: [],
            borderColor: "#11cdef",
            backgroundColor: "#41b3a3",
            borderJoinStyle: "round",
            pointRadius: 1,
            pointBackgroundColor: "#3d15b0",
            pointBorderColor: "#3d15b0",
            showLine: true,
          },
          {
            data: [],
            borderColor: "#06cc7d",
            backgroundColor: "#41b3a3",
            borderJoinStyle: "round",
            pointRadius: 1,
            pointBackgroundColor: "#cc7a00",
            pointBorderColor: "#cc7a00",
            showLine: true,
          },
        ]
      : [
          {
            data: [],
            borderColor: "#11cdef",
            backgroundColor: "#41b3a3",
            borderJoinStyle: "round",
            pointRadius: [],
            pointBackgroundColor: [],
            pointBorderColor: [],
            showLine: true,
          },
        ];

  return {
    data: {
      datasets,
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          type: "realtime",
          realtime: {
            duration: type === "sensor" ? 40000 : 120000,
            // refresh: 1000,
            delay: 1500,
          },
        },
      },
      // annotation
    },
  };
}

export default configs;
