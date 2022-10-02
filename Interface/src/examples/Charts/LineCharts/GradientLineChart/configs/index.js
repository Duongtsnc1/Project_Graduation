function configs() {
  return {
    data: {
      datasets: [
        {
          data: [],
          borderColor: "#11cdef",
          backgroundColor: "#41b3a3",
          borderJoinStyle: "round",
          pointRadius: [],
          pointBackgroundColor: [],
          pointBorderColor: [],
          showLine: true,
          fill: "#85dcb",
        },
      ],
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
            duration: 30000,
            // refresh: 1000,
            delay: 1500,
          },
        },
      },
    },
  };
}

export default configs;
