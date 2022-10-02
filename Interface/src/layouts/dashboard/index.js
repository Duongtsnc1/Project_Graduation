// @mui material components
import Grid from "@mui/material/Grid";
import { PaginationItem, Pagination } from "@mui/material";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SalesTable from "examples/Tables/SalesTable";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Data
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import salesTableData from "layouts/dashboard/data/salesTableData";
import sensorDatas from "layouts/dashboard/data/sensorDatas";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import useWebSocket from "react-use-websocket";
import FilterSensors from "./components/FilterSensors.js";

function Default() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sensors, setSensors] = useState(sensorDatas.sensors);

  const count = Math.ceil(sensors.filter((item) => item.show).length / 8);
  const arrayRef = Array.from({ length: 60 }, () => useRef(null));
  // const [data, setData] = useState({ array: [], error: 0, anomaly: false });
  // const [error, setError] = useState([]);
  const { sendJsonMessage, getWebSocket } = useWebSocket("ws://127.0.0.1:8888/", {
    onOpen: () => console.log("WebSocket connection opened."),
    onClose: () => console.log("WebSocket connection closed."),
    shouldReconnect: (closeEvent) => true,
    onMessage: (event) => {
      const data = JSON.parse(event.data);
      const { array, error, anomaly } = data;
      [...array, error].map((value, index) => {
        if (arrayRef[index].current) {
          arrayRef[index].current.data.datasets[0].data.push({ x: Date.now(), y: value });
          arrayRef[index].current.data.datasets[0].pointBackgroundColor.push(
            anomaly ? "#ff3333" : "#3d15b0"
          );
          arrayRef[index].current.data.datasets[0].pointBorderColor.push(
            anomaly ? "#ff3333" : "#3d15b0"
          );
          arrayRef[index].current.data.datasets[0].pointRadius.push(anomaly ? 3 : 2);
          arrayRef[index].current.update();
        }
      });
    },
  });

  useEffect(() => {
    (id > count || id <= 0) && navigate("/dashboard/1");
  }, []);

  const renderCharSensors = useMemo(() => {
    let i = 4 * (id - 1) * 2;
    let showSensors = sensors.filter((item) => item.show);
    let result = [];
    let temp = [];
    while (i < 4 * id * 2 && i < showSensors.length) {
      temp.push(
        <Grid key={showSensors[i].title} item xs={5} lg={3}>
          <GradientLineChart title={showSensors[i].title} index={i} ref={arrayRef[i]} />
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
  }, [id, sensors]);

  const handlePageChange = (event, value) => {
    if (value !== Number(id)) {
      navigate("/dashboard/" + value);
      window.scrollTo(0, 1000);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <ArgonBox py={3}>
        {useMemo(
          () => (
            <Grid container spacing={3} mb={3}>
              <Grid item xs={5} lg={12}>
                <GradientLineChart
                  title="error"
                  index={2}
                  chart={gradientLineChartData}
                  lineHeight={"40%"}
                  ref={arrayRef[59]}
                />
              </Grid>
            </Grid>
          ),
          [id, sensors]
        )}
        <FilterSensors sensors={sensors} onChangeFilter={setSensors} />
        {renderCharSensors}
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
      {/* <ArgonBox py={3}></ArgonBox> */}
      <Footer />
    </DashboardLayout>
  );
}

export default Default;
