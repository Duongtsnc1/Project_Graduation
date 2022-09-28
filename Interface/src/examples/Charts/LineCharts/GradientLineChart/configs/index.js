import axios from "axios";

function configs(index) {
    return {
        data: {
            datasets: [{
                data: [],
                borderColor: "#11cdef",
                backgroundColor: "#41b3a3",
                borderJoinStyle: "round",
                pointRadius: 2,
                pointBackgroundColor: "#3d15b0",
                pointBorderColor: "#3d15b0",
                showLine: true,
                fill: "#85dcb",
                // anomaly color : #ff5722; normal color #3d15b0
            }, ],
        },
        options: {
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
                            chart.data.datasets.forEach(async(dataset) => {
                                await axios.get("http://localhost:3001/getdatas").then((response) => {
                                    var newDataPoint = {
                                        x: Date.now(),
                                        y: response.data[index],
                                        z: true,
                                    };
                                    dataset.data.push(newDataPoint);
                                });
                            });
                        },

                        duration: 90000,
                        refresh: 1000,
                        delay: 3000,
                    },
                    title: {
                        display: false,
                        text: "Time",
                    },
                },
                y: {
                    title: {
                        display: false,
                        text: "Value",
                    },
                },
            },
        },
    };
}

export default configs;