import { useState } from "react";
import Card from "@material-ui/core/Card";
import { styled } from '@mui/material/styles';
import SuiInput from "components/SuiInput";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Table from "examples/Table";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
// Soft UI Dashboard Material-UI components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// Soft UI Dashboard Material-UI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import SuiButton from "components/SuiButton";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useHistory } from "react-router-dom";

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

let info = JSON.parse(localStorage.getItem('usuario'));
export default function Perfil(){
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    const [tabValue, setTabValue] = useState(0);
    const handleSetTabValue = (event, newValue) => setTabValue(newValue);
    const hist = useHistory();
    const [Rut, setRut] = useState('');
    const [Telefono, setTelefono] = useState('');
    const [Nombre, setNombre] = useState('');
    const [Email, setEmail] = useState('');
    const [Especialidad,setEspecialidad] = useState('');
    const [Listo, setListo] = useState(0);
    const [NewPassword, setNewPassword] = useState('');
    const [CopyPassword, setCopyPassword] = useState('');
    const [OldPassword, setOldPassword] = useState ('');

    function VisualizarDatos(){
      if(info == null){
        hist.push('/authentication/sign-in');
      }
            fetch('/usuario/ver_perfil/',{
            method:'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(res => {
            return res.json()
        })
        .then(users => {            
            setRut(users.rut)
            setTelefono(users.telefono)
            setNombre(users.nombre)
            setEmail(users.email)
            setEspecialidad(users.especialidad)
            setListo(1);
        });
  
    };

    function CambiarPassword(){
      if (NewPassword == CopyPassword){
      fetch('/usuario/editar_password/'+Rut,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password_nueva: NewPassword,
            password_antigua: OldPassword
        })
      })
      .then( (response) => {
        if(response.status === 200) {
            alert("Contraseña actualizada")
            
        } else {
            alert('Hubo un error')
        }
        setListo(0);
    })}
    else{
      alert("Contraseña nueva ingresada no coincide")
    }
  }

    
    if(Listo === 0){
      VisualizarDatos();
      return(
        <DashboardLayout>
          <DashboardNavbar />
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
    else if (Listo === 1){
    return(
        <DashboardLayout>
        <DashboardNavbar />
        <SuiBox py={6}>
        <SuiBox mb={6}>
        <Tabs value={tabValue} onChange={handleSetTabValue}>
            <Tab label="Datos" {...a11yProps(0)}/>
            <Tab label="Cambio de contraseña" {...a11yProps(1)}/>
        </Tabs>
      <SuiTypography variant="h6"></SuiTypography>

        <Card>
        <TabPanel value={tabValue} index={0}>
        <center>        
        <Box sx={{ width: '50%',        backgroundColor: 'primary',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7]}, }}>

          <h2>Datos personales</h2>
          <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center" justify="center" justifyContent="center">
              <Grid item xs={6}>
                <Item>Nombre: </Item>
              </Grid>

              <Grid item xs={6}>
                <Item>{Nombre}</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>RUT: </Item>
              </Grid>
        
              <Grid item xs={6}>
                <Item>{Rut}</Item>
              </Grid>
              
              <Grid item xs={6}>
                <Item>Teléfono: </Item>
              </Grid>
        
              <Grid item xs={6}>
                <Item>{Telefono}</Item>
              </Grid>

              <Grid item xs={6}>
                <Item>Email: </Item>
              </Grid>
        
              <Grid item xs={6}>
                <Item>{Email}</Item>
              </Grid>

              <Grid item xs={6}>
                <Item>Especialidad: </Item>
              </Grid>
        
              <Grid item xs={6}>
                <Item>{Especialidad}</Item>
              </Grid>
            </Grid>

        </Box>
        </center>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>

          <center>
        <Box
            sx={{
            width: "50%"
        }}>
              <SuiBox component="form" role="form">
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              <h2>Contraseña antigua</h2>
            </SuiTypography>
          </SuiBox>
          <SuiInput type="password" placeholder="Contraseña antigua"  onChange={(event) => setOldPassword(event.target.value)}/>
                
        </SuiBox>
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
            <h2>Contraseña nueva</h2>
            </SuiTypography>
          </SuiBox>
          <SuiInput type="password" placeholder="Contraseña nueva" onChange={(event) => setNewPassword(event.target.value)}/>
        </SuiBox>

        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
            <h2>Contraseña nueva</h2>
            </SuiTypography>
          </SuiBox>
          <SuiInput type="password" placeholder="Contraseña nueva" onChange={(event) => setCopyPassword(event.target.value)}/>
        </SuiBox>

        <SuiBox mt={4} mb={1}>
          <SuiButton variant="gradient" buttonColor="success" onClick={CambiarPassword}>
            Guardar
          </SuiButton>
        </SuiBox>

      </SuiBox>
 
              </Box></center>

        </TabPanel>
        

        </Card>

        <Card>




</Card>

</SuiBox>
      </SuiBox>
        <Footer />
      </DashboardLayout>
    );}

};
