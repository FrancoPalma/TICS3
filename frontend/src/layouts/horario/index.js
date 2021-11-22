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
  const [row, setRow] = useState([]);
  const [selectedDay, setSelectedDay] = useState(undefined);
  function handleDayClick(day, { selected }) {
    if (selected) {
      setSelectedDay(undefined);
      return;
    }
    setSelectedDay(day);
  }
  function EnviarFecha(){
    if(selectedDay != undefined){
      let aux = selectedDay.toLocaleDateString()
      fetch('/horario/ver_horario',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fecha: aux[6]+aux[7]+aux[8]+aux[8]+aux[5]+aux[3]+aux[4]+aux[2]+aux[0]+aux[1]
        })
      })
      .then((response) => {
        if(response.status !== 404){
          console.log("ok")
          /*setListo(1)*/
          return response.json()
        }else{
          console.log("error")
        }
      })
      .then(users => {
        console.log(users);
      })
      .catch((error) => {
        console.log(error)
      });
    }else{
      alert("Seleccione una fecha")
    }
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
              <SuiButton buttonColor="info" onClick={EnviarFecha}>
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

