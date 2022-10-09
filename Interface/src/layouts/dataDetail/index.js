import React, { useState, useEffect } from "react";
import axios from "axios";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import PieChart from "examples/Charts/PieChart";
import Detail from "./components/Detail";
import ArgonBox from "components/ArgonBox";

import { Grid } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

const data = [
  { title: "Train set", anomalyRate: 30, min: 12, max: 16, average: 13, job: "good job" },
  { title: "Test set", anomalyRate: 20, min: 18, max: 19, average: 54, job: "beautiful" },
  { title: "Real data", anomalyRate: 60, min: 89, max: 24, average: 34, job: "wonderful" },
];

const DataDetail = () => {
  let chartData = data.map((dataset) => ({
    labels: ["anomaly", "normal"],
    datasets: {
      backgroundColors: ["error", "success"],
      data: [dataset.anomalyRate, 100 - dataset.anomalyRate],
    },
  }));
  const [mode, setMode] = useState(false);
  return (
    <DashboardLayout>
      <ArgonBox py={3}>
        <Grid container spacing={3} mb={3}>
          {data.map((dataset, index) => {
            let detail = {
              Min: dataset.min,
              Max: dataset.max,
              Average: dataset.average,
              job: dataset.job,
            };
            return (
              <Grid key={dataset.title} item xs={5} lg={4}>
                <PieChart title={dataset.title} chart={chartData[index]} detail={detail} />
              </Grid>
            );
          })}
        </Grid>
        {/* <Grid container spacing={3} mb={3}> */}
        {/* <Grid item xs={5} lg={6}> */}
        {/* <GradientLineChart title="Line chart" /> */}
        {/* </Grid> */}
        {/* <Grid item xs={5} lg={3}></Grid> */}
        {/* </Grid> */}
      </ArgonBox>
      <button
        onClick={() => {
          console.log(mode);
          setMode(!mode);
          console.log(mode);
        }}
      >
        Hello
      </button>
    </DashboardLayout>
  );
};

export default DataDetail;
