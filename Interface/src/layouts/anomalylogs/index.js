import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ArgonBox from "components/ArgonBox";
import { Grid } from "@material-ui/core";
import SalesTable from "examples/Tables/SalesTable";
import moment from "moment/moment";
const AnomalyLogs = () => {
  const data = [
    { time: moment(Date.now()).format("DD/MM/yyyy HH:mm:ss"), P1: "15", P2: 19 },
    { time: moment(Date.now()).format("DD/MM/yyyy HH:mm:ss"), P1: "15", P2: 19 },
    { time: moment(Date.now()).format("DD/MM/yyyy HH:mm:ss"), P1: "15", P2: 19 },
  ];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <Grid container spacing={6} mb={3}>
          <Grid item xs={12} md={12}>
            <SalesTable rows={data} />
          </Grid>
        </Grid>
      </ArgonBox>
    </DashboardLayout>
  );
};

export default AnomalyLogs;
