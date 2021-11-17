import * as React from 'react';
import { useState } from "react";
import Card from "@material-ui/core/Card";
import { styled } from '@mui/material/styles';
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";

// Soft UI Dashboard Material-UI components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard Material-UI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard Material-UI base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    MonthView,
    Appointments,
    Toolbar,
    DateNavigator,
    AppointmentTooltip,
    AppointmentForm,
    EditRecurrenceMenu,
    Resources,
    DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';


const schedulerData = [
  { startDate: '2021-11-01T09:45', endDate: '2021-11-01T11:00', title: 'Meeting' },
  { startDate: '2021-11-01T12:00', endDate: '2021-11-01T13:30', title: 'Go to a gym' },
];

export default function Horario () {
return(
<DashboardLayout>
<DashboardNavbar />
  <Paper>
    <Scheduler
    data={schedulerData}
    >
      <ViewState
        currentDate="2021-11-01"
      />
          <EditingState
            
          />
      <MonthView/>
      <Appointments
          />
          <Resources

          />

          <Toolbar

          />
          <DateNavigator />

          <EditRecurrenceMenu />
          <AppointmentTooltip

          />
          <AppointmentForm />
          <DragDropProvider />
    </Scheduler>
  </Paper>
</DashboardLayout>
);}
