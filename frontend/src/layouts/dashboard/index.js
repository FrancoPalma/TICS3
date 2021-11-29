import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Card from "@material-ui/core/Card";
import React, { useState } from "react";
// Soft UI Dashboard Material-UI components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import Table from "examples/Table";
import styles from "layouts/tables/styles";
// Soft UI Dashboard Material-UI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

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
let info = JSON.parse(localStorage.getItem('usuario'));

function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const classes = styles();
  
  const [Listo, setListo] = useState(0);
  const [rows, setRow] = useState([]);
  const columns = [
    { label: "Nombre",name: "hora", align: "left" },
    { name: "descripcion", align: "center" },
    { name: "sala", align: "center" }
  ];

  function EnviarFecha(){
      let dia;
      let mes;
      let ano;
      while(rows.length > 0) {
        rows.pop();
      }
      var today = new Date()
      today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      console.log(today)
      fetch('/horario/ver_horario',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fecha: today
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
          setListo(1)
        }
        else
        setListo(2);
      })
      .catch((error) => {
        console.log(error)
      });
  }
  if(Listo === 0){
    EnviarFecha();
    return(
      <DashboardLayout>
        <SuiBox py={3}>
          <SuiBox mb={3}>
            <Card>
              Cargando...
            </Card>
          </SuiBox>
        </SuiBox>
        <Footer />
      </DashboardLayout>
    );
  }else if(Listo === 1){
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <SuiBox py={3}>
          
          <SuiBox mb={1.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={5}>
                <Card>
                  <center>
                  <SuiTypography variant="h1" textColor="text" display="flex" fontWeight="medium">
                    <br/>
                    Centro Nunca más solos
                    
                  </SuiTypography>
                  <SuiTypography variant="h3" textColor="text" display="flex" fontWeight="medium">
                    <br/>
                   Ten un buen día querido {info.nombre}!
                    
                  </SuiTypography>
                  <br/><br/><br/><br/>
                  </center>
                </Card>
              </Grid>
  
              <Grid item xs={12} lg={7}>
                <Card>
                <center>
                  <SuiTypography variant="h4" textColor="text" display="flex" fontWeight="medium">
                    <br/>
                   Las actividades para hoy son:                    
                  </SuiTypography>
                </center>
                  <SuiBox customClass={classes.tables_table}>
                    <Table columns={columns} rows={rows} />
                  </SuiBox>
                  <br/><br/>
                </Card>
              </Grid>
            </Grid>
  
          </SuiBox>
        </SuiBox>
        <Footer />
      </DashboardLayout>
    );
  }else if(Listo === 2){
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <SuiBox py={3}>
          
          <SuiBox mb={1.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={5}>
                <Card>
                  <center>
                  <SuiTypography variant="h1" textColor="text" display="flex" fontWeight="medium">
                    <br/>
                    Centro Nunca más solos
                    
                  </SuiTypography>
                  <SuiTypography variant="h3" textColor="text" display="flex" fontWeight="medium">
                    <br/>
                   Ten un buen día querido {info.nombre}!
                    
                  </SuiTypography>
                  <br/><br/><br/><br/>
                  </center>
                </Card>
              </Grid>
  
              <Grid item xs={12} lg={7}>
                <Card>
                <center>
                  <SuiTypography variant="h2" textColor="text" display="flex" fontWeight="medium">
                    <br/>
                    Aun no tienes actividades asignadas para hoy                    
                  </SuiTypography>
                  <SuiTypography variant="h3" textColor="text" display="flex" fontWeight="medium">
                    <br/>
                    En caso de que si las tengas y no aparezcan contacte con el administrador
                  </SuiTypography>
                  <br/><br/><br/><br/>
                  </center>
                </Card>
              </Grid>
            </Grid>
  
          </SuiBox>
        </SuiBox>
        <Footer />
      </DashboardLayout>
    );
  }
  
}

export default Dashboard;
