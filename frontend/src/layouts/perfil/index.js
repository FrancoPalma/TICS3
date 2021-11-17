import { useState } from "react";
import Card from "@material-ui/core/Card";
import { styled } from '@mui/material/styles';
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Table from "examples/Table";
import SaveIcon from "@material-ui/icons/Save";
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


export default function Perfil(){
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    const [tabValue, setTabValue] = useState(0);
    const handleSetTabValue = (event, newValue) => setTabValue(newValue);

    const [Rut, setRut] = useState('');
    const [Telefono, setTelefono] = useState('');
    const [Nombre, setNombre] = useState('');
    const [Email, setEmail] = useState('');
    const [Especialidad,setEspecialidad] = useState('');
    const [Listo, setListo] = useState(0);
    const [Password, setPassword] = useState('');

    function VisualizarDatos(){
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
      fetch('/usuario/editar_password/'+Rut,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: Password
        })
      })
      .then( (response) => {
        if(response.status === 200) {
            console.log("Agregado correctamente")
            
        } else {
            console.log('Hubo un error')
            console.log(response.status)
        }
        setListo(0);
    })
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
            <Tab label="Datos del usuario" {...a11yProps(0)}/>
            <Tab label="Cambio de contraseña" {...a11yProps(1)}/>
        </Tabs>
      <SuiTypography variant="h6"></SuiTypography>

        <Card>
        <TabPanel value={tabValue} index={0}>
        <Box sx={{ width: '50%' }}>
          <h3>Datos personales</h3>
          <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <Item><h5>Nombre: </h5></Item>
              </Grid>

              <Grid item xs={6}>
                <Item>{Nombre}</Item>
              </Grid>
              
              <Grid item xs={6}>
                <Item>Teléfono: </Item>
              </Grid>
        
              <Grid item xs={6}>
                <Item>{Telefono}</Item>
              </Grid>

              <Grid item xs={6}>
                <Item>Especialidad: </Item>
              </Grid>
        
              <Grid item xs={6}>
                <Item>{Especialidad}</Item>
              </Grid>
            </Grid>
        </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <input
            type="text"
            name="rut_infante"
            display="flex"
            onChange={(e) => 
             setPassword(e.target.value)}/>

        <SuiButton startIcon ={<SaveIcon />} variant="gradient" buttonColor="success" halfWidth onClick={CambiarPassword}>
                Guardar
              </SuiButton>
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
