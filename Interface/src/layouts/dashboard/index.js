/* eslint-disable no-unused-vars */
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

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";
import SalesTable from "examples/Tables/SalesTable";
import CategoriesList from "examples/Lists/CategoriesList";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Argon Dashboard 2 MUI base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import Slider from "layouts/dashboard/components/Slider";

// Data
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import salesTableData from "layouts/dashboard/data/salesTableData";
import categoriesListData from "layouts/dashboard/data/categoriesListData";
import axios from "axios";
import {useEffect,useState} from 'react'
function Default() {
  const { size } = typography;  
  // const renderChart=()=>{
  //   const result=<></>;
  //   let numChart = 12;
  //   while()
  // }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        
        <Grid container spacing={3} mb={3}>
          <Grid item xs={5} lg={4}>
            <GradientLineChart
              title="Sales Overview"
              index={1}
              chart={gradientLineChartData}
            />
          </Grid>
          <Grid item xs={5} lg={4}>
            <GradientLineChart
              title="Sales Overview"
              index={2}
              chart={gradientLineChartData}
            />
          </Grid>
           <Grid item xs={5} lg={4}>
            <GradientLineChart
              title="Sales Overview"
              index={3}
              chart={gradientLineChartData}
            />
          </Grid>          
        </Grid>
        {/* <Grid container spacing={3} mb={3}>
          <Grid item xs={5} lg={4}>
            <GradientLineChart
              title="Sales Overview"
              index={4}
              chart={gradientLineChartData}
            />
          </Grid>
          <Grid item xs={5} lg={4}>
            <GradientLineChart
              title="Sales Overview"
              index={5}
              chart={gradientLineChartData}
            />
          </Grid>
           <Grid item xs={5} lg={4}>
            <GradientLineChart
              title="Sales Overview"
              index={6}
              chart={gradientLineChartData}
            />
          </Grid>          
        </Grid> */}
        {/* <Grid container spacing={3} mb={3}>
          <Grid item xs={5} lg={4}>
            <GradientLineChart
              title="Sales Overview"
              
              chart={gradientLineChartData}
            />
          </Grid>
          <Grid item xs={5} lg={4}>
            <GradientLineChart
              title="Sales Overview"
              
              chart={gradientLineChartData}
            />
          </Grid>
           <Grid item xs={5} lg={4}>
            <GradientLineChart
              title="Sales Overview"
              
              chart={gradientLineChartData}
            />
          </Grid>          
        </Grid>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={5} lg={4}>
            <GradientLineChart
              title="Sales Overview"
              
              chart={gradientLineChartData}
            />
          </Grid>
          <Grid item xs={5} lg={4}>
            <GradientLineChart
              title="Sales Overview"
              
              chart={gradientLineChartData}
            />
          </Grid>
           <Grid item xs={5} lg={4}>
            <GradientLineChart
              title="Sales Overview"
              
              chart={gradientLineChartData}
            />
          </Grid>          
        </Grid> */}
       
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <SalesTable title="Sales by Country" rows={salesTableData} />
          </Grid>
          <Grid item xs={12} md={4}>
            <CategoriesList title="categories" categories={categoriesListData} />
          </Grid>
        </Grid>
      </ArgonBox> 
      
      <Footer />
    </DashboardLayout>
  );
}

export default Default;
