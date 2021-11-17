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



export default function Perfil(){
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    const [Rut, setRut] = useState('');
    const [Telefono, setTelefono] = useState('');
    const [Nombre, setNombre] = useState('');
    const [Email, setEmail] = useState('');
    const [Especialidad,setEspecialidad] = useState('');

    function VisualizarDatos(rut_infante){
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
            return 
        });
  
    };

    VisualizarDatos();
    return(
        <DashboardLayout>
        <DashboardNavbar />
        <SuiBox mb={3}>
      <SuiTypography variant="h6"></SuiTypography>

        <Card>

        <Box sx={{ width: '50%' }}>
          <h3>Datos personales</h3>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <Item>Nombre: </Item>
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

        

        </Card>

        <Card>

<Box sm={{ width: '50%' }}>
  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={6}>
        <Item>Nombre: </Item>
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



</Card>


      </SuiBox>
        <Footer />
      </DashboardLayout>
    );

};
