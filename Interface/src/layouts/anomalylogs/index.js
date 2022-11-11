import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ArgonBox from "components/ArgonBox";
import { Grid } from "@material-ui/core";
import SalesTable from "examples/Tables/SalesTable";
import moment from "moment/moment";
import axios from "axios";
import sensorDatas from "layouts/dashboard/data/sensorDatas";
const AnomalyLogs = () => {
  const [logs, setLogs] = useState({ loading: true, data: [] })
  const setLoading = (value) => {
    setLogs({ ...logs, loading: value })
  }

  const data = [
    { time: moment(Date.now()).format("DD/MM/yyyy HH:mm:ss"), P1: "15", P2: 19 },
    { time: moment(Date.now()).format("DD/MM/yyyy HH:mm:ss"), P1: "15", P2: 19 },
    { time: moment(Date.now()).format("DD/MM/yyyy HH:mm:ss"), P1: "15", P2: 19 },
  ];
  const getdata = async () => {
    setLoading(true)
    const data = await axios.get("http://192.168.46.23:5014/anomaly_log/").then(res => res.data)
    console.log(data)
    let duong = data.slice(data.length-20, data.length ).reduce((result, value, index) => {
      let a = sensorDatas.shortName.reduce((result1, value1, index1) => {
        result1[value1] = value["data"][index1]
        return result1
      }, {})
      result.push({ time: value["DateTime"], ...a })
      return result
    }, [])
    setLogs({ loading: false, data: duong })
  }

  useEffect(() => {
    getdata()
  }, [])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <Grid container spacing={6} mb={3}>
          <Grid item xs={12} md={12}>
            {logs.loading ? "LOADING......" : <SalesTable maxHeight="600px" rows={logs.data} />}
          </Grid>
        </Grid>
      </ArgonBox>
    </DashboardLayout>
  );
};

export default AnomalyLogs;
