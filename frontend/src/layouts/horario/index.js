import React from 'react';
import Scheduler, { Resource } from 'devextreme-react/scheduler';

import { useState } from "react";
import Card from "@material-ui/core/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Footer from "examples/Footer";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styles from "layouts/tables/styles";
import Table from "examples/Table";
import SuiButton from "components/SuiButton";
import Icon from "@material-ui/core/Icon";
import typography from "assets/theme/base/typography";
import { Confirm,} from 'react-st-modal';
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
/*npm install @mui/material @emotion/react @emotion/styled*/
//npm install devextreme@21.2 devextreme-react@21.2 --save --save-exact
//npx -p devextreme-cli devextreme add devextreme-react
import { employees, data } from './data.js';
import DataCell from './DataCell.js';
import ResourceCell from './ResourceCell.js';

const currentDate = new Date(2021, 5, 2, 11, 30);
const groups = ['employeeID'];
const views = ['month'];



function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <SuiBox p={3}>
          <SuiTypography>{children}</SuiTypography>
        </SuiBox>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Horario() {
  const hist = useHistory();
  const classes = styles();
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const [Listo, setListo] = useState(0);

  return (
    <DashboardLayout>
    <DashboardNavbar/>
      <SuiBox py={6}>
        <SuiBox mb={6}>
          <Card>
            <Scheduler
              timeZone="America/Los_Angeles"
              dataSource={data}
              dataCellComponent={DataCell}
              resourceCellComponent={ResourceCell}
              groups={groups}
              views={views}
              defaultCurrentView="month"
              defaultCurrentDate={currentDate}
              height={600}
              showAllDayPanel={true}
              firstDayOfWeek={1}
              startDayHour={8}
              endDayHour={18}
            >
              <Resource
                label="Employee"
                fieldExpr="employeeID"
                dataSource={employees}
                allowMultiple={false}
              />
            </Scheduler>
          </Card>
        </SuiBox>
        <Card>
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

