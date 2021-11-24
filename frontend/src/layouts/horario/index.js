import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
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
import SuiInput from "components/SuiInput";
import Icon from "@material-ui/core/Icon";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@mui/material/TextField';
import { Confirm,} from 'react-st-modal';
import DateAdapter from '@mui/lab/AdapterDayjs';
import TimePicker from '@mui/lab/TimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Stack from '@mui/material/Stack';

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
    { label: "Nombre",name: "hora", align: "left" },
    { name: "descripcion", align: "center" },
    { name: "sala", align: "center" }
  ];
  const [selectedDay, setSelectedDay] = useState(undefined);

  const [value, setValue] = React.useState(new Date());
  const handleChange = (newValue) => {
    setValue(newValue);
    console.log(newValue)
  };

  const [value2, setValue2] = React.useState(new Date());
  const handleChange2 = (newValue) => {
    setValue2(newValue);
  };

  let info = JSON.parse(localStorage.getItem('usuario'));
  let sala;
  let descripcion;
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
        console.log(users)
        for(let i=0; i < users.length;i++){
          let aux = true;
          for(let e=0;e < rows.length;e++){
            if(users[i].id == rows[e].id){
              aux=false;
            }
          }
          if(aux == true){
            let hora1 = users[i].inicio[0]+users[i].inicio[1]+users[i].inicio[2]+users[i].inicio[3]+users[i].inicio[4]+'-'+users[i].fin[0]+users[i].fin[1]+users[i].fin[2]+users[i].fin[3]+users[i].fin[4]
            rows.push({id:users[i].id,
              descripcion: users[i].descripcion,
              hora: hora1,
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
  function AgregarHorario(){
    let aux = selectedDay.toLocaleDateString()
    let dia;
    let mes;
    let ano;
    
    let ini = value.toString()
    let fin = value2.toString()
    console.log(ini[16]+ini[17]+ini[18]+ini[19]+ini[20])
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
    
    fetch('horario/anadir_horario/', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rut_usuario: info.rut,
        fecha: ano+'-'+mes+'-'+dia,
        inicio: ini[16]+ini[17]+ini[18]+ini[19]+ini[20],
        fin: fin[16]+fin[17]+fin[18]+fin[19]+fin[20],
        descripcion: descripcion,
        sala: sala
      })
      })
      .then( (response) => {
        if(response.status === 200) {
            alert("Agregado correctamente")
            window.location.href = window.location.href;
        } else {
            alert('Hubo un error')
            console.log(response.status)
        }
    })
    .catch((error) => {
        console.log(error)
    });
  }
  function BotonAgregar(){
    return(
      <SuiButton buttonColor="info" 
            onClick={async () => {
              const result = await Confirm(<Formulario/>, 
                'Agregar ');
              if (result) {
                AgregarHorario();
              } else {
                // Сonfirmation not confirmed
              }
            }}
      >
        Agregar Horario
        <Icon className="material-icons-round" color="inherit" fontSize="inherit">
          add
        </Icon>
      </SuiButton>
    )
  }
  function Formulario(){
    return(
      <>
      <Grid container spacing={3}display="row">
        <Grid item xs={6}>
        <label>Inicio: </label>
        </Grid>
        
        <Grid item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <TimePicker
              label="Time"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
        </Grid>
        
        <Grid item xs={6}>
        <label>Fin: </label>
        </Grid>
        
        <Grid item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <TimePicker
              label="Time"
              value={value2}
              onChange={handleChange2}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
        
        </Grid>
        <Grid item xs={6}>
        <label>Sala: </label>
        </Grid>
        
        <Grid item xs={6}>
          <input
            type="text"
            name="sala"
            display="flex"
            onChange={(e) => {
              sala = e.target.value;
            }}
          />
        </Grid>
        
        <Grid item xs={6}>
        <label>Descripción: </label>
        </Grid>
        
        <Grid item xs={6}>
          <input
            type="text"
            name="descripcion"
            display="flex"
            onChange={(e) => {
              descripcion = e.target.value;
            }}
          />
        </Grid>
      </Grid>
      </>
    )
  }

  if(Listo === 0){
  return (
    <DashboardLayout> 
    <DashboardNavbar/>
    <SuiBox py={6}>
      <SuiBox mb={6}>
        <Tabs value={tabValue} onChange={handleSetTabValue}>
          <Tab label="Buscar" {...a11yProps(0)}/>
          <Tab label="Añadir" {...a11yProps(1)}/>
        </Tabs>
        <TabPanel value={tabValue} index={0}>
        <Card>
        <SuiTypography variant="body2" textColor="text" fontWeight="medium">
           Seleccione una fecha
        </SuiTypography>
        <DayPicker onDayClick={handleDayClick}
          months={MONTHS}
          selectedDays={selectedDay}
          weekdaysShort={WEEKDAYS_SHORT}
          disabledDays={{ daysOfWeek: [0,6] }}
          firstDayOfWeek={1}/>
        </Card>
        <Card>
          <SuiButton buttonColor="info" onClick={EnviarFecha}>
            Consultar
          </SuiButton>
        </Card>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Card>
          <SuiTypography variant="body2" textColor="text" fontWeight="medium">
           Seleccione una fecha
        </SuiTypography>
          <DayPicker onDayClick={handleDayClick}
          months={MONTHS}
          selectedDays={selectedDay}
          weekdaysShort={WEEKDAYS_SHORT}
          disabledDays={{ daysOfWeek: [0,6] }}
          firstDayOfWeek={1}/>
        <Grid container spacing={3}display="row">
          <Grid item xs={6}>
          <label>Inicio: </label>
          </Grid>
          
          <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <TimePicker
                label="Time"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
          </Grid>
          
          <Grid item xs={6}>
          <label>Fin: </label>
          </Grid>
          
          <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <TimePicker
                label="Time"
                value={value2}
                onChange={handleChange2}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
          
          </Grid>
          <Grid item xs={6}>
          <label>Sala: </label>
          </Grid>
          
          <Grid item xs={6}>
            <input
              type="text"
              name="sala"
              display="flex"
              onChange={(e) => {
                sala = e.target.value;
              }}
            />
          </Grid>
          
          <Grid item xs={6}>
          <label>Descripción: </label>
          </Grid>
          
          <Grid item xs={6}>
            <input
              type="text"
              name="descripcion"
              display="flex"
              onChange={(e) => {
                descripcion = e.target.value;
              }}
            />
          </Grid>
        </Grid>
        </Card>
        <Card>
          <SuiButton buttonColor="info" onClick={AgregarHorario}>
            Agregar
          </SuiButton>
        </Card>
        </TabPanel>
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

