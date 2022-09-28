// @mui material components
import Grid from "@mui/material/Grid";
import { PaginationItem, Pagination } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SalesTable from "examples/Tables/SalesTable";
import CategoriesList from "examples/Lists/CategoriesList";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Data
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import salesTableData from "layouts/dashboard/data/salesTableData";
import categoriesListData from "layouts/dashboard/data/categoriesListData";
import sensorDatas from "layouts/dashboard/data/sensorDatas";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Default() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sensors, setSensors] = useState(
    window.localStorage.getItem(sensorDatas.sensorDatas)
      ? JSON.parse(window.localStorage.getItem(sensorDatas.sensorDatas))
      : sensorDatas.sensors
  );
  const count = Math.ceil(sensors.filter((item) => item.show).length / 8);

  useEffect(() => {
    (id > count || id <= 0) && navigate("/dashboard/1");
  }, []);

  const renderCharSensors = () => {
    let i = 4 * (id - 1) * 2;
    let showSensors = sensors.filter((item) => item.show);
    let result = [];
    let temp = [];
    while (i < 4 * id * 2 && i < showSensors.length) {
      temp.push(
        <Grid key={showSensors[i].title} item xs={5} lg={3}>
          <GradientLineChart title={showSensors[i].title} index={i} chart={gradientLineChartData} />
        </Grid>
      );
      if ((i + 1) % 4 === 0 || i + 1 >= showSensors.length) {
        result.push(
          <Grid key={i} container spacing={3} mb={3}>
            {temp}
          </Grid>
        );
        temp = [];
      }
      i++;
    }
    if (result.length === 0) navigate("/dashboard" + (id - 1));
    return result;
  };

  const handlePageChange = (event, value) => {
    if (value !== Number(id)) {
      navigate("/dashboard/" + value);
      window.scrollTo(0, 0);
    }
  };

  const useStyles = makeStyles((theme) => ({
    selected: {
      backgroundColor: "green",
      color: "red",
    },
  }));
  // .... rest of code
  const classes = useStyles();
  return (
    <DashboardLayout>
      <DashboardNavbar sensors={sensors} onChangeFilter={setSensors} />
      <ArgonBox py={3}>
        {renderCharSensors()}
        <Grid alignItems="center" justifyContent="center" container spacing={3} mb={3}>
          <ArgonBox mt={3} px={0.8} sx={{ padding: "5px" }}>
            <Pagination
              count={count}
              variant="outlined"
              color="primary"
              size="small"
              shape="rounded"
              showFirstButton={count >= 8}
              showLastButton={count >= 8}
              page={id ? Number(id) : 1}
              siblingCount={1}
              boundaryCount={1}
              renderItem={(item) => {
                return <PaginationItem {...item} />;
              }}
              onChange={handlePageChange}
              value={id}
            />
          </ArgonBox>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <SalesTable title="Anomaly logs" rows={salesTableData} />
          </Grid>
         
        </Grid>
      </ArgonBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Default;
