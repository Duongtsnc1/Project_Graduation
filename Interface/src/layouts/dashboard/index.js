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
import salesTableData from "layouts/dashboard/data/salesTableData";
import sensorDatas from "layouts/dashboard/data/sensorDatas";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, useCallback, useMemo, useLayoutEffect } from "react";
import useWebSocket from "react-use-websocket";
import FilterSensors from "./components/FilterSensors.js";
import ArgonButton from "components/ArgonButton/index.js";
import { render } from "@testing-library/react";
import moment from "moment";

function Default() {
  const [id, setId] = useState(1);
  const navigate = useNavigate();
  const [sensors, setSensors] = useState(sensorDatas.sensors);
  const [mode, setMode] = useState(true);
  const [duong, setDuong] = useState(true);
  const [rawData, setRawData] = useState([]);
  const [scaledData, setScaledData] = useState([]);
  // const [anomalyLogs, setAnomalyLogs] = useState([]);

  const count = useMemo(
    () => Math.ceil(sensors.filter((item) => item.show).length / 8),
    [sensors, id]
  );
  const sensorRef = Array.from({ length: 59 }, () => useRef(null));
  const errorRef = useRef(null);

  const getLastpoint = useCallback((oldArray, newValue, maxPoint = 80) => {
    oldArray.length >= maxPoint && oldArray.shift();
    return [...oldArray, newValue];
  }, []);

  const renderData = useCallback(() => {
    sensorRef.map((sensor) => {
      if (sensor.current) {
        sensor.current.data.datasets[0].data = [];
        sensor.current.data.datasets[1].data = [];
        // sensor.current.update();
      }
    });
    if (!mode) {
      rawData.length &&
        rawData.map((value) => {
          value.data.map((item, index) => {
            sensorRef[index].current &&
              sensorRef[index].current.data.datasets[0].data.push({ x: value.time, y: item });
          });
          value.point_predicted.map((item, index) => {
            sensorRef[index].current &&
              sensorRef[index].current.data.datasets[1].data.push({ x: value.time, y: item });
          });
        });
    } else {
      scaledData.length &&
        scaledData.map((value) => {
          value.point_scaled.map((item, index) => {
            sensorRef[index].current &&
              sensorRef[index].current.data.datasets[0].data.push({ x: value.time, y: item });
          });
          value.point_scaled_predicted.map((item, index) => {
            sensorRef[index].current &&
              sensorRef[index].current.data.datasets[1].data.push({ x: value.time, y: item });
          });
        });
    }
    sensorRef.map((sensor) => {
      if (sensor.current) sensor.current.update();
    });
  }, [mode, scaledData, rawData]);

  // const { sendJsonMessage, getWebSocket } = useWebSocket("ws://192.168.180.23:8012/", {
  const { sendJsonMessage, getWebSocket } = useWebSocket("ws://127.0.0.1:8888/", {
    onOpen: () => console.log("WebSocket connection opened."),
    onClose: () => console.log("WebSocket connection closed."),
    shouldReconnect: (closeEvent) => true,
    onMessage: (event) => {
      const dataSocket = JSON.parse(event.data);
      // console.log(dataSocket)
      const { data, datetime, label, predict = {} } = dataSocket[0];

      let {
        anomaly = false,
        point_scaled = null,
        point_scaled_predicted = null,
        score_error = null,
        threshold = 0,
        point_predicted,
      } = predict;

      let newData = getLastpoint([...rawData], { data, point_predicted, time: Date.now() }, 80);
      setRawData(newData);
      if (point_scaled_predicted) {
        let newData = getLastpoint(
          [...scaledData],
          { point_scaled, point_scaled_predicted, time: Date.now() },
          80
        );
        setScaledData(newData);
      }

      if (mode) {
        point_scaled &&
          point_scaled.map((item, index) => {
            if (sensorRef[index].current) {
              sensorRef[index].current.data.datasets[0].data.push({ x: Date.now(), y: item });
              sensorRef[index].current.data.datasets[1].data.push({
                x: Date.now(),
                y: point_scaled_predicted[index],
              });
            }
          });
      } else {
        data.map((item, index) => {
          if (sensorRef[index].current) {
            sensorRef[index].current.data.datasets[0].data.push({ x: Date.now(), y: item });
            sensorRef[index].current.data.datasets[1].data.push({
              x: Date.now(),
              y: point_predicted[index],
            });
          }
        });
      }

      if (errorRef.current && score_error) {
        errorRef.current.data.datasets[0].data.push({ x: Date.now(), y: score_error });
        errorRef.current.data.datasets[0].pointRadius.push(anomaly ? 2 : 1);
        errorRef.current.data.datasets[0].pointBackgroundColor.push(
          anomaly ? "#ff3333" : "#3d15b0"
        );
        errorRef.current.data.datasets[0].pointBorderColor.push(anomaly ? "#ff3333" : "#3d15b0");
        errorRef.current.options.plugins.annotation.annotations.line1.value = Number(threshold);
        errorRef.current.options.plugins.annotation.annotations.line1.label.content =
          "Threshold " + Number(threshold);
        errorRef.current.update();
      }

      if (anomaly) {
        // let valueAtAnomaly = data.reduce((result, value, index) => {
        //   result[sensorDatas.sensors[index].title] = value;
        //   return result;
        // }, {});
        // let newLog = {
        //   error: score_error,
        //   time: moment(Date.now()).format("DD/MM/yyyy HH:mm:ss"),
        // };
        // setAnomalyLogs([newLog, ...anomalyLogs]);
      }
    },
  });
  const renderCharSensors = useMemo(() => {
    let i = 4 * (id - 1) * 2;
    let showSensors = sensors.filter((item) => item.show);
    let result = [];
    let temp = [];
    while (i < 4 * id * 2 && i < showSensors.length) {
      temp.push(
        <Grid key={showSensors[i].title} item xs={5} lg={3}>
          <GradientLineChart title={showSensors[i].title} ref={sensorRef[i]} />
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

  // console.log("Rerender Dashboard", Date.now())F

  const hanldeChangeMode = () => {
    // renderData();
    setMode(!mode);
  };

  const handlePageChange = (event, value) => {
    if (value !== Number(id)) {
      // renderData();
      setId(Number(value));
    }
  };
  useEffect(() => {
    setDuong(!duong);
  }, [renderCharSensors]);

  useEffect(() => {
    renderData();
  }, [duong, id, mode]);

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
                  lineHeight={"40%"}
                  ref={errorRef}
                  type="error"
                  // threshold={threshold}
                />
              </Grid>
            </Grid>
          ),
          [id, sensors]
        )}

        <Grid display="flex" alignItems="center" justifyContent={"space-between"} mb={3}>
          <ArgonBox spacing={1}>
            <ArgonBox pr={1}>
              <ArgonButton
                color="primary"
                variant="gradient"
                size="small"
                onClick={hanldeChangeMode}
              >
                {`Switch to ${mode ? "Raw data" : "Scaled data"}`}
              </ArgonButton>
            </ArgonBox>
          </ArgonBox>
          {useMemo(
            () => (
              <ArgonBox spacing={3}>
                <FilterSensors sensors={sensors} onChangeFilter={setSensors} />
              </ArgonBox>
            ),
            [sensors, mode]
          )}
        </Grid>

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
        {/* {useMemo(
          () => (
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <SalesTable title="Anomaly logs" rows={anomalyLogs} />
              </Grid>
            </Grid>
          ),
          [anomalyLogs]
        )} */}
      </ArgonBox>
      {/* <ArgonBox py={3}></ArgonBox> */}
      <Footer />
    </DashboardLayout>
  );
}

export default Default;
