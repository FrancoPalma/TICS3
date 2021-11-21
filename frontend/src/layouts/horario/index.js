import React, { useState } from "react";
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Card from "@material-ui/core/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import styles from "layouts/tables/styles";
import Table from "examples/Table";
import { useHistory } from "react-router-dom";
import SuiButton from "components/SuiButton";

/*npm install @mui/material @emotion/react @emotion/styled*/

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
  const MONTHS = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  const WEEKDAYS_SHORT = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];

  const hist = useHistory();
  const classes = styles();
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const [Listo, setListo] = useState(0);
  const [selectedDay, setSelectedDay] = useState(undefined);
  function handleDayClick(day) {
    setSelectedDay(day);
  }
  function EnviarFecha(){
    setListo(1);
  }

  if(Listo === 0){
  return (
    <DashboardLayout> 
    <DashboardNavbar/>
    <SuiBox py={6}>
          <SuiBox mb={6}>
            <Card>
            <DayPicker onDayClick={handleDayClick}
            months={MONTHS}
            selectedDays={selectedDay}
            weekdaysShort={WEEKDAYS_SHORT}
            disabledDays={{ daysOfWeek: [0,6] }}
            firstDayOfWeek={1}/>
             {selectedDay ? (
          <p>You clicked {selectedDay.toLocaleDateString()}</p>
        ) : (
          <p>Please select a day.</p>
        )}
            </Card>
            <Card>
              <SuiButton buttonColor="info" onClick={console.log("hola")}>
                Subir
              </SuiButton>
            </Card>
          </SuiBox>
        </SuiBox>
      <Footer />
    </DashboardLayout>
  );
  }else if(Listo === 1){
    return (
      <DashboardLayout>
      <DashboardNavbar/>
        <SuiBox py={6}>
          <SuiBox mb={6}>
            <Card>
            </Card>
          </SuiBox>
        </SuiBox>
        <Footer />
      </DashboardLayout>
    );
  }
}

