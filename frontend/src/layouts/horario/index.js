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
import Icon from "@material-ui/core/Icon";

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
  const [rows, setRow] = useState([]);
  const columns = [
    { name: "inicio", align: "left" },
    { name: "fin", align: "left" },
    { name: "descripcion", align: "center" },
    { name: "sala", align: "center" }
  ];
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
      let dia;
      let mes;
      let ano;
      while(rows.length > 0) {
        rows.pop();
      }
      if (aux[1]=='/'){
        //D/MM/AAAA
        dia= '0'+aux[0];
        if(aux[3]=='/'){
          mes = '0'+aux[2];
          ano = aux[4]+aux[5]+aux[6]+aux[7]; 
        }else{
          mes = aux[2]+aux[3];
          ano = aux[5]+aux[6]+aux[7]+aux[8];
        }

      }else{
        //DD/MM/AAAA
        dia= aux[0]+aux[1];
        if(aux[4]=='/'){
          mes = '0'+aux[3];
          ano = aux[5]+aux[6]+aux[7]+aux[8];
        }else{
          mes = aux[3]+aux[4];
          ano = aux[6]+aux[7]+aux[8]+aux[9];
        }
      }
      console.log(ano+'-'+mes+'-'+dia)
      fetch('/horario/ver_horario',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fecha: ano+'-'+mes+'-'+dia
        })
      })
      .then((response) => {
        if(response.status == 200){
          console.log("ok")
          return response.json()
        }else{
          console.log("error")
        }
      })
      .then(users => {
        for(let i=0; i < users.length;i++){
          let aux = true;
          for(let e=0;e < rows.length;e++){
            if(users[i].rut == rows[e].rut){
              aux=false;
            }
          }
          if(aux == true){
            rows.push({id:users[i].id,
              descripcion: users[i].descripcion,
              inicio: users[i].inicio,
              fin: users[i].fin,
              sala: users[i].sala
            })
          }
        }
        if(rows.length > 0)
        setListo(1)
        else
        alert("No hay nada asignado")
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
            disabledDays={{ daysOfWeek: [0] }}
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
            <SuiButton  buttonColor="info" iconOnly onClick = {async() => {setListo(0)}}>
              <Icon classsName="material-icons-round">keyboard_backspace</Icon>
            </SuiButton>
            <SuiBox customClass={classes.tables_table}>
              <Table columns={columns} rows={rows} />
            </SuiBox>
            </Card>
          </SuiBox>
        </SuiBox>
        <Footer />
      </DashboardLayout>
    );
  }
}

