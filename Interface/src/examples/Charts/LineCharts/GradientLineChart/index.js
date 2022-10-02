import React, { useRef, useEffect, useState } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeSeriesScale,
} from "chart.js";
import { RealTimeScale, StreamingPlugin } from "chartjs-plugin-streaming";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeSeriesScale,
  RealTimeScale,
  // ChartDataLabels,
  Title,
  StreamingPlugin,
  Tooltip,
  Legend
);

// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// GradientLineChart configurations
import configs from "examples/Charts/LineCharts/GradientLineChart/configs";

const GradientLineChart = React.forwardRef(({ title, description, height, lineHeight }, ref) => {
  const [chartData, setChartData] = useState({});
  const { data, options } = chartData;
  useEffect(() => {
    setChartData(configs());
  }, []);
  const renderChart = (
    <ArgonBox p={2}>
      {title || description ? (
        <ArgonBox px={description ? 1 : 0} pt={description ? 1 : 0}>
          {title && (
            <ArgonBox mb={1}>
              <ArgonTypography variant="h6">{title}</ArgonTypography>
            </ArgonBox>
          )}
          <ArgonBox mb={2}>
            <ArgonTypography component="div" variant="button" fontWeight="regular" color="text">
              {description}
            </ArgonTypography>
          </ArgonBox>
        </ArgonBox>
      ) : null}
      <ArgonBox sx={{ height }}>
        <Line data={data} for ref={ref} height={lineHeight} options={options} />
      </ArgonBox>
    </ArgonBox>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
});

// Setting default values for the props of GradientLineChart
GradientLineChart.defaultProps = {
  title: "",
  description: "",
};

// Typechecking props for the GradientLineChart
GradientLineChart.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  index: PropTypes.any,
  lineHeight: PropTypes.any,
  newData: PropTypes.any,
};

export default GradientLineChart;
