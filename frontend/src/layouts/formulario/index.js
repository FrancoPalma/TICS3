import { useState } from "react";
import Card from "@material-ui/core/Card";
import SuiButton from "components/SuiButton";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Color from "@material-ui/core/colors"
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";



import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


// Soft UI Dashboard Material-UI components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import styles from "layouts/tables/styles";


// Soft UI Dashboard Material-UI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MaterialTable from 'material-table';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from "@material-ui/core/TextField";
import SuiInput from "components/SuiInput";
import { OutlinedInput } from "@material-ui/core";


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

  function Formulario(){

    
    let info = JSON.parse(localStorage.getItem('usuario'));
    let Lista;
    const classes = styles();
    const [tabValue, setTabValue] = useState(0);
    const handleSetTabValue = (event, newValue) => setTabValue(newValue);
    const [Listo, setListo] = useState(0);

    //METODOLOGÍA
    const [descripcion, setdescripcion] = useState('');
    const [NombreSesion, setNombreSesion] = useState('');
    const [DescripcionSesion,setDescripcionSesion] = useState('');
    
    //EVALUACION
    const [nombreEvaluacion, setnombreEvaluacion] = useState('');
    const [nombreCriterios, setnombreCriterios] = useState('');
    const [DescripcionCriterios, setDescripcionCriterios] = useState('');
    const [PuntajeCriterio, setPuntajeCriterio] = useState('');

    //OBJETIVO
    const [DescripcionObjetivo, setDescripcionObjetivo] = useState('');
    const [DescripcionActividad, setDescripcionActividad] = useState('');

    //ANALISIS
    const [Conclusion, setConclusion] = useState('')
    const [Recomendacion, setRecomendacion] = useState('');


    const [inputFields, setInputField] = useState([
        {Second: ''},
    ]);

    const [inputCriterios, setinputCriterios] = useState([
      {Nombre: ''},
      {Descripcion: ''},
      {Puntaje: ''}
    ]);




  const handleAddFields = () =>{
    setInputField([...inputFields,{Second: ''}])
  }
  const handleRemoveFields = (index) =>{
      const values = [...inputFields];
      values.splice(index,1);
      setInputField(values);
  }
  
  const AddFieldsCriterios = () =>{
    setinputCriterios([...inputCriterios,{Nombre: '', Descripcion: '', Puntaje:'',}])
  }
  const RemoveFieldsCriterios = (index) =>{
      const values = [...inputCriterios];
      values.splice(index,1);
      setinputCriterios(values);
  }

  function EnviarDescripcion(){
    if (1 == 1){
      let id = 2;
      console.log(descripcion)
      fetch('/informe/crear_metodologia/'+id.toString(),{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          descripcion: descripcion
        })

      })
      .then((response) => {

        if(response.status !== 404){
          return response.json()
        }else{
          console.log("ERROR")
        }
      })
    }
  }

  function EnviarSesion(){
    if (1 == 1){
      let id = 2;

      fetch('/informe/crear_sesion/'+id.toString(),{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          descripcion: DescripcionSesion
        })

      })
      .then((response) => {

        if(response.status !== 404){
          console.log("chupame el pico")
          return response.json()
        }else{
          console.log("holi")
        }
      })
    }
  }

  function EnviarEvaluacion(){
    if (1 == 1){
      let id = 2;

      fetch('/informe/crear_evaluacion/'+id.toString(),{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombreEvaluacion
        })

      })
      .then((response) => {

        if(response.status !== 404){
          console.log("chupame el pico")
          return response.json()
        }else{
          console.log("holi")
        }
      })
    }
  } 
  

  function EnviarCriterios(){
    if (1 == 1){
      let id = 2;

      fetch('/informe/crear_criterio/'+id.toString(),{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombreCriterios,
          descripcion: DescripcionCriterios,
          puntaje: PuntajeCriterio
        })

      })
      .then((response) => {

        if(response.status !== 404){
          console.log("chupame el pico")
          return response.json()
        }else{
          console.log("holi")
        }
      })
    }
  }
      return(
        <DashboardLayout>
        <DashboardNavbar />
        <SuiBox py={3}>
          <SuiBox mb={3}>
          <SuiTypography variant="h6">Informe</SuiTypography>
          <Tabs value={tabValue} onChange={handleSetTabValue}>
            <Tab label="Metodología" {...a11yProps(0)}/>
            <Tab label="Evaluación" {...a11yProps(1)}/>
            <Tab label="Objetivo" {...a11yProps(2)}/>
            <Tab label="Análisis" {...a11yProps(3)}/>
          </Tabs>
            <Card>



            <TabPanel value={tabValue} index={0}>   
            <SuiBox display="inrow" justifyContent="space-between" alignItems="center" p={3}>
          
            <TextField
              label="Metodología"
              variant = "outlined"
              fullWidth
              multiline
              rows={10}
              required
              onChange = {event => setdescripcion(event.target.value)}         
            />

        <SuiBox display="flex" mt={4} mb={1}>
          <SuiButton startIcon ={<SaveIcon />} variant="gradient" buttonColor="success" halfWidth onClick={EnviarDescripcion}>
            Guardar
          </SuiButton>
          <SuiButton startIcon ={<DeleteIcon />} variant="gradient" buttonColor="error" halfWidth >
            Cancelar
          </SuiButton>
         
        </SuiBox>


          {inputFields.map((inputField,index)=>(
            <div key= {index}>
              <SuiBox>
    
                <TextField 
                  name= "sesion"
                  placeholder = "Sesion"
                  label="Sesion"
                  variant = "outlined"
                  fullWidth
                  multiline
                  rows={10}
                  required   
                  value={inputField.second}
                  onChange = {event => setDescripcionSesion(event.target.value)}   
                />

                <IconButton onClick={() => handleRemoveFields(index)}>
                  <RemoveIcon color="secondary"/>
                </IconButton>
            
                <IconButton onClick={() => handleAddFields()}>
                  <AddIcon color="primary"/>
                </IconButton>            
              </SuiBox>
            
              <SuiButton startIcon ={<SaveIcon />} variant="gradient" buttonColor="success" halfWidth onClick={EnviarSesion}>
                Guardar
              </SuiButton>
              <SuiButton startIcon ={<DeleteIcon />} variant="gradient" buttonColor="error" halfWidth >
                Cancelar
              </SuiButton>
            </div>
            ) )}              
            </SuiBox>
            </TabPanel>





  

            <TabPanel value={tabValue} index={1}>
            <SuiBox display="inrows" justifyContent="space-between" alignItems="center" p={3}>

              <h1>Evaluación</h1>
              <SuiTypography variant="h6"></SuiTypography>
                <TextField
                  label="Nombre Evaluación"
                  variant = "outlined"
                  fullWidth
                  multiline
                  rows={5}
                  required            
                  onChange = {event => setnombreEvaluacion(event.target.value)}         

                />

              <SuiBox display="flex" mt={4} mb={1}>
                <SuiButton startIcon ={<SaveIcon />} variant="gradient" buttonColor="success" halfWidth onClick={EnviarEvaluacion}>
                Guardar
                </SuiButton>
              <SuiButton startIcon ={<DeleteIcon />} variant="gradient" buttonColor="error" halfWidth >
                Cancelar
              </SuiButton>
          </SuiBox>
            <h2> Criterios </h2>
            {inputCriterios.map((inputCriterios,index)=>(
                <div key= {index}>
                  <SuiBox>
                  <Grid container direction={"column"} spacing={5}>
                  <Grid item>
                    <TextField 
                      name= "nombre"
                      placeholder = "nombre"
                      label="Nombre"
                      variant = "outlined"
                      fullWidth
                      multiline
                      rows={1}
                      required   
                      value={inputCriterios.Nombre}
                      onChange = {event => setnombreCriterios(event.target.value)}   
                    /></Grid>
                  <Grid item>
                    <TextField 
                      name= "descripcion"
                      placeholder = "descripcion"
                      label="Descripción"
                      variant = "outlined"
                      fullWidth
                      multiline
                      rows={10}
                      required   
                      value={inputCriterios.Descripcion}
                      onChange = {event => setDescripcionCriterios(event.target.value)}   
                    /></Grid>
                  <Grid item>
                    <TextField 
                      name= "Puntaje"
                      placeholder = "puntaje"
                      label="Puntaje"
                      variant = "outlined"
                      rows={1}
                      required   
                      value={inputCriterios.Puntaje}
                      onChange = {event => setPuntajeCriterio(event.target.value)}   
                    /></Grid></Grid>

                <IconButton onClick={() => RemoveFieldsCriterios(index)}>
                  <RemoveIcon color="secondary"/>
                </IconButton>
            
                <IconButton onClick={() => AddFieldsCriterios()}>
                  <AddIcon color="primary"/>
                </IconButton>            
              </SuiBox>
            
              <SuiButton startIcon ={<SaveIcon />} variant="gradient" buttonColor="success" halfWidth onClick={EnviarSesion}>
                Guardar
              </SuiButton>
              <SuiButton startIcon ={<DeleteIcon />} variant="gradient" buttonColor="error" halfWidth >
                Cancelar
              </SuiButton>
            </div>
            ) )}        
            </SuiBox>


          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <SuiBox display="inrows" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6"></SuiTypography>
              <SuiTypography variant="h6"></SuiTypography>
              
              
              <TextField
                  label="Objetivo"
                  variant = "outlined"
                  fullWidth
                  multiline
                  rows={20}
                  required
                  value = {event => setDescripcionObjetivo(event.target.value)}            
              />



            </SuiBox>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SuiTypography variant="h6"></SuiTypography>
              <TextField
              label="Metodología"
              variant = "outlined"
              fullWidth
              multiline
              rows={30}
              required            
            />
              <SuiTypography variant="h6"></SuiTypography>
            </SuiBox>
          </TabPanel>
          </Card>
        </SuiBox>
        <Card>
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );}
                    

  export default Formulario;