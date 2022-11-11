import React, { useState, useEffect } from "react";
import axios from "axios";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import PieChart from "examples/Charts/PieChart";
import Detail from "./components/Detail";
import ArgonBox from "components/ArgonBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { Grid } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import MyTable from "./components/MyTable";
import SalesTable from "examples/Tables/SalesTable";
import sensorDatas from "layouts/dashboard/data/sensorDatas";
const data = [
  { title: "Train set", anomalyRate: 30, min: 12, max: 16, average: 13, job: "good job" },
  { title: "Test set", anomalyRate: 20, min: 18, max: 19, average: 54, job: "beautiful" },
  // { title: "Real data", anomalyRate: 60, min: 89, max: 24, average: 34, job: "wonderful" },
];

const DataDetail = () => {
  const [detail, setDetail] = useState({ data: [], loading: true, rate: [] })

  const setLoading = (value) => {
    setDetail({ ...detail, loading: value })
  }

  let chartData = data.map((dataset) => ({
    labels: ["anomaly", "normal"],
    datasets: {
      backgroundColors: ["error", "success"],
      data: [dataset.anomalyRate, 100 - dataset.anomalyRate],
    },
  }));

  const [mode, setMode] = useState(false);

  const getdata = async () => {
    const titleCell = ["count", "mean", "std", "min", "25%", "50%", "75%", "max"]
    setLoading(true)
    const data = await axios.get("http://192.168.46.23:5012/statistic/").then(res => res.data)
    let duong = data.reduce((duong1, value, index) => {
      let temp = titleCell.reduce((result, item, index) => {
        let temp1 = {}
        temp1[" "] = item
        let v = sensorDatas.shortName.reduce((result1, i, id) => {
          result1[i] = value[item][id]
          return result1
        }, {})
        temp1 = { ...temp1, ...v }
        result.push(temp1)
        return result
      }, [])
      duong1.push(temp)
      return duong1
    }, [])
    let chartData = data.reduce((result, value, index) => {
      result.push(
        {
          labels: ["anomaly", "normal"],
          datasets: {
            backgroundColors: ["error", "success"],
            data: [value["anomaly_len"], value["len"] - value["anomaly_len"]],
          },
        }
      )
      return result
    }, [])
    console.log(duong)
    setDetail({ loading: false, detail: duong, rate: chartData })
  }
  useEffect(() => {
    getdata()
  }, [])
  const logDatas = [
    {
      " ": "Count",
      "P1_B2004": "558400",
      "P1_B2005": "558400",
      "P1_B2006": "558400",
      "P1_B2007": "558400",
      "P1_B2008": "558400",
      "P1_B2009": "558400",
      "P1_B2010": "558400",
      "P1_B2002": "558400",
      "P1_B203": "558400",
      "P1_B204": "558400",
      "P1_B205": "558400",
      "P1_B206": "558400",
      "P1_B207": "558400",
      "P1_B208": "558400",
      "P1_B209": "558400",
      "P1_B20010": "558400",
      "P1_B21": "558400",
      "P1_B2208": "558400",
      "P1_B2308": "558400",
      "P1_B2508": "558400",
      "P1_B2608": "558400",
      "P1_B2708": "558400",
      "P1_B2808": "558400",
      "P1_B2908": "558400",
      "P1_B21108": "558400",
      "P1_B20118": "558400",
      "P1_B201308": "558400",
      "P1_B201508": "558400",
      "P1_B200158": "558400",
      "P1_B200188": "558400",
    },
    {
      " ": "Min",
      "P1_B2004": "558400",
      "P1_B2005": "558400",
      "P1_B2006": "558400",
      "P1_B2007": "558400",
      "P1_B2008": "558400",
      "P1_B2009": "558400",
      "P1_B2010": "558400",
      "P1_B2002": "558400",
      "P1_B203": "558400",
      "P1_B204": "558400",
      "P1_B205": "558400",
      "P1_B206": "558400",
      "P1_B207": "558400",
      "P1_B208": "558400",
      "P1_B209": "558400",
      "P1_B20010": "558400",
      "P1_B21": "558400",
      "P1_B2208": "558400",
      "P1_B2308": "558400",
      "P1_B2508": "558400",
      "P1_B2608": "558400",
      "P1_B2708": "558400",
      "P1_B2808": "558400",
      "P1_B2908": "558400",
      "P1_B21108": "558400",
      "P1_B20118": "558400",
      "P1_B201308": "558400",
      "P1_B201508": "558400",
      "P1_B200158": "558400",
      "P1_B200188": "558400",
    },
    {
      " ": "Min",
      "P1_B2004": "558400",
      "P1_B2005": "558400",
      "P1_B2006": "558400",
      "P1_B2007": "558400",
      "P1_B2008": "558400",
      "P1_B2009": "558400",
      "P1_B2010": "558400",
      "P1_B2002": "558400",
      "P1_B203": "558400",
      "P1_B204": "558400",
      "P1_B205": "558400",
      "P1_B206": "558400",
      "P1_B207": "558400",
      "P1_B208": "558400",
      "P1_B209": "558400",
      "P1_B20010": "558400",
      "P1_B21": "558400",
      "P1_B2208": "558400",
      "P1_B2308": "558400",
      "P1_B2508": "558400",
      "P1_B2608": "558400",
      "P1_B2708": "558400",
      "P1_B2808": "558400",
      "P1_B2908": "558400",
      "P1_B21108": "558400",
      "P1_B20118": "558400",
      "P1_B201308": "558400",
      "P1_B201508": "558400",
      "P1_B200158": "558400",
      "P1_B200188": "558400",
    },
    {
      " ": "Min",
      "P1_B2004": "558400",
      "P1_B2005": "558400",
      "P1_B2006": "558400",
      "P1_B2007": "558400",
      "P1_B2008": "558400",
      "P1_B2009": "558400",
      "P1_B2010": "558400",
      "P1_B2002": "558400",
      "P1_B203": "558400",
      "P1_B204": "558400",
      "P1_B205": "558400",
      "P1_B206": "558400",
      "P1_B207": "558400",
      "P1_B208": "558400",
      "P1_B209": "558400",
      "P1_B20010": "558400",
      "P1_B21": "558400",
      "P1_B2208": "558400",
      "P1_B2308": "558400",
      "P1_B2508": "558400",
      "P1_B2608": "558400",
      "P1_B2708": "558400",
      "P1_B2808": "558400",
      "P1_B2908": "558400",
      "P1_B21108": "558400",
      "P1_B20118": "558400",
      "P1_B201308": "558400",
      "P1_B201508": "558400",
      "P1_B200158": "558400",
      "P1_B200188": "558400",
    },
    {
      " ": "Min",
      "P1_B2004": "558400",
      "P1_B2005": "558400",
      "P1_B2006": "558400",
      "P1_B2007": "558400",
      "P1_B2008": "558400",
      "P1_B2009": "558400",
      "P1_B2010": "558400",
      "P1_B2002": "558400",
      "P1_B203": "558400",
      "P1_B204": "558400",
      "P1_B205": "558400",
      "P1_B206": "558400",
      "P1_B207": "558400",
      "P1_B208": "558400",
      "P1_B209": "558400",
      "P1_B20010": "558400",
      "P1_B21": "558400",
      "P1_B2208": "558400",
      "P1_B2308": "558400",
      "P1_B2508": "558400",
      "P1_B2608": "558400",
      "P1_B2708": "558400",
      "P1_B2808": "558400",
      "P1_B2908": "558400",
      "P1_B21108": "558400",
      "P1_B20118": "558400",
      "P1_B201308": "558400",
      "P1_B201508": "558400",
      "P1_B200158": "558400",
      "P1_B200188": "558400",
    },
    {
      " ": "Min",
      "P1_B2004": "558400",
      "P1_B2005": "558400",
      "P1_B2006": "558400",
      "P1_B2007": "558400",
      "P1_B2008": "558400",
      "P1_B2009": "558400",
      "P1_B2010": "558400",
      "P1_B2002": "558400",
      "P1_B203": "558400",
      "P1_B204": "558400",
      "P1_B205": "558400",
      "P1_B206": "558400",
      "P1_B207": "558400",
      "P1_B208": "558400",
      "P1_B209": "558400",
      "P1_B20010": "558400",
      "P1_B21": "558400",
      "P1_B2208": "558400",
      "P1_B2308": "558400",
      "P1_B2508": "558400",
      "P1_B2608": "558400",
      "P1_B2708": "558400",
      "P1_B2808": "558400",
      "P1_B2908": "558400",
      "P1_B21108": "558400",
      "P1_B20118": "558400",
      "P1_B201308": "558400",
      "P1_B201508": "558400",
      "P1_B200158": "558400",
      "P1_B200188": "558400",
    },

  ];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3} >
        <Grid container spacing={6} mb={3}>
          {detail.loading ? "LOADING....." : data.map((dataset, index) => {
            return (
              <Grid key={dataset.title} container spacing={3} style={{ marginBottom: "15px" }}>
                <Grid item xs={12} md={3}>
                  <PieChart title={dataset.title} chart={detail.rate[index]} />
                </Grid>
                <Grid item xs={12} md={9}>
                  <SalesTable maxHeight="449px" rows={detail.detail[index]} />
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </ArgonBox>
    </DashboardLayout>
  );
};

export default DataDetail;
