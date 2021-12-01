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
import TimePicker from '@mui/lab/TimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Stack from '@mui/material/Stack';
import Select from 'react-select';


/*npm install @mui/material @emotion/react @emotion/styled
npm install -s @date-io/dayjs
npm install @mui/lab
npm i --save react-select*/
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
    { name: "sala", align: "center" },
    { name: "acciones", align: "right" }
  ];
  const columns2 = [
    { label: "Nombre",name: "hora", align: "left" },
    { name: "descripcion", align: "center" },
    { name: "sala", align: "center" }
  ];
  const [priv, setPriv] = useState(false);
  const [options] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleChange3 = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(selectedOption)

  };
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
  let info;
  let sala ="";
  let descripcion="";
  function handleDayClick(day, { selected }) {
    if (selected) {
      setSelectedDay(undefined);
      return;
    }
    setSelectedDay(day);
  }
  function ActualizarEmpleados(){
    if(info == null){
      hist.push('/authentication/sign-in');
    }
    if (Listo == 0){
      while(options.length > 0) {
        options.pop();
      }
      fetch('/usuario/ver_usuarios')
      .then(res => {
          if(res.status === 404){
            setListo(1);
          }
          return res.json()
      })
      .then(users => {
        for(let i=0; i < users.length;i++){
          let aux = true;
          for(let e=0;e < options.length;e++){
            if(users[i].rut == options[e].value){
              aux=false;
            }
          }
          if(aux == true){
            options.push({label:users[i].nombre,
              value: users[i].rut
            })
          }
          setSelectedOption({label: info.nombre, value: info.rut});
        }
        setListo(1);
      });
      
    }
  }
  function EliminarHorario(id){
    fetch('/horario/eliminar_horario',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_horario: id
      })
    })
    .then((response) => {
      if(response.status == 200){
        alert("Eliminado correctamente")
        window.location.href = window.location.href;
        return response.json()
      }else{
        console.log("error")
      }
    })
  }
  function Boton({id}){
    return(
      <SuiButton buttonColor="info" iconOnly
          onClick={async () => {
            const result = await Confirm("¿Esta seguro que desea eliminar este horario?", 
              'Confirmación de eliminación '+id.toString());
            
            if (result) {
              EliminarHorario(id)
            } else {
              // Сonfirmation not confirmed
            }
          }}
        >
            <Icon classsName="material-icons-round">delete</Icon>
        </SuiButton>
    )
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
          alert('Error en la conexión')
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
              sala: users[i].sala,
              acciones: <Boton id={users[i].id}/>
            })
          }
        }
        if(rows.length > 0){
          for(let x=0;x<rows.length-1;x++){
            for(let y=1;y<rows.length;y++){
              let aux;
              if(parseInt(rows[y-1].hora[0]+rows[y-1].hora[1]) > parseInt(rows[y].hora[0]+rows[y].hora[1])){
                aux = rows[y]
                rows[y] =rows[y-1]
                rows[y-1] = aux
              }else if(parseInt(rows[y-1].hora[0]+rows[y-1].hora[1]) == parseInt(rows[y].hora[0]+rows[y].hora[1])){
                if(parseInt(rows[y-1].hora[4]+rows[y-1].hora[5]) > parseInt(rows[y].hora[4]+rows[y].hora[5])){
                  aux = rows[y]
                  rows[y] =rows[y-1]
                  rows[y-1] = aux
                }
              }
            }
          }
          setListo(2)
        }
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
  function EnviarFechaAdmin(){
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
      fetch('/horario/ver_horario_admin',{
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
        console.log(selectedOption.value)
        for(let i=0; i < users.length;i++){
          if(users[i].rut_usuario === selectedOption.value){
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
              sala: users[i].sala,
              acciones: <Boton id={users[i].id}/>
            })
          }
          }
        }
        if(rows.length > 0){
          for(let x=0;x<rows.length-1;x++){
            for(let y=1;y<rows.length;y++){
              let aux;
              if(parseInt(rows[y-1].hora[0]+rows[y-1].hora[1]) > parseInt(rows[y].hora[0]+rows[y].hora[1])){
                aux = rows[y]
                rows[y] =rows[y-1]
                rows[y-1] = aux
              }else if(parseInt(rows[y-1].hora[0]+rows[y-1].hora[1]) == parseInt(rows[y].hora[0]+rows[y].hora[1])){
                if(parseInt(rows[y-1].hora[4]+rows[y-1].hora[5]) > parseInt(rows[y].hora[4]+rows[y].hora[5])){
                  aux = rows[y]
                  rows[y] =rows[y-1]
                  rows[y-1] = aux
                }
              }
            }
          }
          setListo(2)
        }
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
    if(selectedDay != undefined){
      if(descripcion == "" || sala==""){
        alert("Datos ingresados inválidos");
      }else{
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
                alert('Error en la conexión')
                console.log(response.status)
            }
        })
        .catch((error) => {
            console.log(error)
        });
      }
    }else{
      alert("Seleccione una fecha")
    }
  }
  function AgregarHorarioAdmin(){
    let ini = value.toString()
          let fin = value2.toString()
    if(selectedDay != undefined){
      if(descripcion === "" || sala ===""){
        alert("Agregue la descripción y sala");
      }else{
        if(parseInt(ini[16]+ini[17]+ini[19]+ini[20]) < parseInt(fin[16]+fin[17]+fin[19]+fin[20])){
          let aux = selectedDay.toLocaleDateString()
          let dia;
          let mes;
          let ano;
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
              rut_usuario: selectedOption.value,
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
                  alert('Error en la conexión')
                  console.log(response.status)
              }
          })
          .catch((error) => {
              console.log(error)
          });
        }else{
          alert("La hora de fin no puede ser antes o igual que la hora de inicio")
        }
      }
    }else{
      alert("Seleccione una fecha")
    }
  }
  function Datos(){
    fetch('/sesion/datos_usuario')
    .then( (response) => {
      if(response.status !== 404) {
        return response.json()
      } else {
        hist.push('/authentication/sign-in')
      }
    })
    .then(users =>{
      info = users;
      setPriv(users.gestion_usuario);
      ActualizarEmpleados();
    })
    .catch((error) => {
      console.log(error)
    });
  }
  
  if(Listo === 0 ){
    Datos();
    return(
      <DashboardLayout>
        <SuiBox py={3}>
          <SuiBox mb={3}>
            <Card>
              Cargando...
            </Card>
          </SuiBox>
          <Card>
          </Card>
        </SuiBox>
        <Footer />
      </DashboardLayout>
    );
  }
  if(priv){
    if(Listo === 1){
      return (
        <DashboardLayout> 
        <DashboardNavbar/>
        <SuiBox py={3}>
            <Tabs value={tabValue} onChange={handleSetTabValue}>
              <Tab label="Buscar" {...a11yProps(0)}/>
              <Tab label="Agregar" {...a11yProps(1)}/>
            </Tabs>
          
            <TabPanel value={tabValue} index={0}>
            <Card>
              <center>
            <SuiTypography variant="h3" textColor="text" display="flex" fontWeight="medium">

               Seleccione un profesional y una fecha
            
            </SuiTypography>
            <Select
                value={selectedOption}
                onChange={handleChange3}
                options={options}
              />
              </center>
            <DayPicker onDayClick={handleDayClick}
              months={MONTHS}
              selectedDays={selectedDay}
              weekdaysShort={WEEKDAYS_SHORT}
              disabledDays={{ daysOfWeek: [0,6] }}
              firstDayOfWeek={1}/>
            </Card>
            <Card>
              <SuiButton buttonColor="info" onClick={EnviarFechaAdmin}>
                Consultar
              </SuiButton>
            </Card>
            </TabPanel>
    
            <TabPanel value={tabValue} index={1}>
              <SuiBox mb={1.5} display="center">
                <center>
                <Grid  alignItems="center" justify="center" container spacing={3}>
                  <Grid item xs={12} lg={7}>
                  <Card>
                    <SuiTypography variant="h3" textColor="text" fontWeight="medium">
                      <center>
                    Seleccione una fecha
                    </center>
                    </SuiTypography>
                    <DayPicker onDayClick={handleDayClick}
                    months={MONTHS}
                    selectedDays={selectedDay}
                    weekdaysShort={WEEKDAYS_SHORT}
                    disabledDays={{ daysOfWeek: [0,6] }}
                    firstDayOfWeek={1}/>
                    <br/>
                    <br/>
                  </Card>
                  </Grid>
                  <Grid  justify="center" item xs={12} lg={5}>
                    <Card>
                      <center>
                      <br/>
                      <Select
                        value={selectedOption}
                        onChange={handleChange3}
                        options={options}
                      />
                    <Grid item xs={6}>
                    <label>Inicio: </label>
                    </Grid>
                    
                    <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={3}>
                        <TimePicker
                          label=""
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
                          label=""
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
                      <SuiInput
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
                      <SuiInput
                        type="text"
                        name="descripcion"
                        display="flex"
                        onChange={(e) => {
                          descripcion = e.target.value;
                        }}
                      />
                    </Grid>
                    <br/>
                    </center>
                    </Card>
                  </Grid>
                </Grid>
                </center>
              </SuiBox>
            <Card>
              <SuiButton buttonColor="info" onClick={AgregarHorarioAdmin}>
                Agregar
              </SuiButton>
            </Card>
            </TabPanel>
    
        </SuiBox>
        <Footer />
        </DashboardLayout>
      );
    }else if(Listo === 2){
      return (
        <DashboardLayout>
        <DashboardNavbar/>
          <SuiBox py={6}>
            <SuiBox mb={6}>
              <Card>
              <SuiButton  buttonColor="info" iconOnly onClick = {async() => {setListo(1)}}>
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
  }else{
    if(Listo === 1){
      return (
        <DashboardLayout> 
        <DashboardNavbar/>
        <SuiBox py={3}>
            <Card>
            <SuiTypography variant="h3" textColor="text" display="flex" fontWeight="medium">
              <center>
               Seleccione una fecha
               </center>
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
        </SuiBox>
        <Footer />
        </DashboardLayout>
      );
    }else if(Listo === 2){
      return (
        <DashboardLayout>
        <DashboardNavbar/>
          <SuiBox py={6}>
            <SuiBox mb={6}>
              <Card>
              <SuiButton  buttonColor="info" iconOnly onClick = {async() => {setListo(1)}}>
                <Icon classsName="material-icons-round">keyboard_backspace</Icon>
              </SuiButton>
              <SuiBox customClass={classes.tables_table}>
                <Table columns={columns2} rows={rows} />
              </SuiBox>
              </Card>
            </SuiBox>
          </SuiBox>
          <Footer />
        </DashboardLayout>
      );
    }
  }
  
}

