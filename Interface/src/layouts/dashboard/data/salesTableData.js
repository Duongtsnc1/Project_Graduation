/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Countries flags
import moment from "moment";
import sensorDatas from "layouts/dashboard/data/sensorDatas";

const data = () =>
  sensorDatas.sensors.reduce((result, value, index) => {
    {
      result[value.title] = Math.random() * 105 + 1;
      return result;
    }
  }, {});
const salesTableData = [
  {
    time: moment(Date.now()).format("DD/MM/yyyy HH:mm:ss"),
    error: Math.random(),
    ...data(),
  },
  {
    time: moment(Date.now()).add(1,"minute").format("DD/MM/yyyy HH:mm:ss"),
    error: Math.random(),
    ...data(),
  },
  {
    time: moment(Date.now()).add(1,"hour").format("DD/MM/yyyy HH:mm:ss"),
    error: Math.random(),
    ...data(),
  },
  {
    time: moment(Date.now()).add(1,"day").format("DD/MM/yyyy HH:mm:ss"),
    error: Math.random(),
    ...data(),
  },
  {
    time: moment(Date.now()).add(1,"month").format("DD/MM/yyyy HH:mm:ss"),
    error: Math.random(),
    ...data(),
  },
];

export default salesTableData;
