import { useState } from "react";
import Card from "@material-ui/core/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styles from "layouts/tables/styles";
import Table from "examples/Table";
import { func } from "prop-types";
import SuiButton from "components/SuiButton";

import Icon from "@material-ui/core/Icon";
import typography from "assets/theme/base/typography";

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

function Boton(){
  return(
    <>
    <SuiButton buttonColor="primary" iconOnly>
      <Icon classsName="material-icons-round">edit</Icon>
    </SuiButton>
    <SuiButton buttonColor="primary" iconOnly>
      <Icon classsName="material-icons-round">delete</Icon>
    </SuiButton>
    </>
  )
}

function Check({boleano}){
const { size } = typography;
if(boleano){
  return(
    <SuiBox fontSize={size.regular} color="text" mb={-0.5} mx={0.25}>
      <Icon className="material-icons-round" color="inherit" fontSize="inherit">
        done
      </Icon>
    </SuiBox>
  )
}else{
  return(
    <SuiBox fontSize={size.regular} color="text" mb={-0.5} mx={0.25}>
      <Icon className="material-icons-round" color="inherit" fontSize="inherit">
        clear
      </Icon>
    </SuiBox>

  )

}
}

function Profesionales() {
  const classes = styles();
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const [Listo, setListo] = useState(0);
  const columns = [
    { name: "nombre", align: "left" },
    { name: "rut", align: "left" },
    { name: "evaluación", align: "center" },
    { name: "ficha", align: "center" },
    { name: "infante", align: "center" },
    { name: "privilegios", align: "right" },
    { name: "usuario", align: "right" },
    { name: "acciones", align: "right" }
  ];
  const [rows] = useState([]);

  function ActualizarEmpleados(){
    while(rows.length > 0) {
      rows.pop();
    }
    fetch('/usuario/ver_privilegios')
      .then(res => {
          return res.json()
      })
      .then(users => {
        let aux;
        for(let i=0; i < users.length;i++){
          aux = [];
          rows.push({nombre:users[i].nombre,
            rut: users[i].rut,
            evaluación: <Check boleano={ users[i].gestion_evaluacion}/>,
            ficha: <Check boleano={users[i].gestion_ficha}/>,
            infante: <Check boleano={users[i].gestion_infante}/>,
            privilegios: <Check boleano={users[i].gestion_priv}/>,
            usuario: <Check boleano={users[i].gestion_usuario}/>,
            acciones: <Boton/>
          })
        }
        setListo(1);
      });
    }
    console.log(rows)
  if(Listo === 1){
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={6}>
        <SuiBox mb={6}>
        <Tabs value={tabValue} onChange={handleSetTabValue}>
            <Tab label="Datos" {...a11yProps(0)}/>
            <Tab label="Privilegios" {...a11yProps(1)}/>
          </Tabs>
          <Card>
          <TabPanel value={tabValue} index={0}>
            <SuiBox customClass={classes.tables_table}>
            <Table columns={columns} rows={rows} />
            </SuiBox>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            
          </TabPanel>
          </Card>
        </SuiBox>
        <Card>
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
  }else{
    ActualizarEmpleados();
    return(
      <DashboardLayout>
        <DashboardNavbar />
        <SuiBox py={3}>
          <SuiBox mb={3}>
          <Tabs value={tabValue} onChange={handleSetTabValue}>
              <Tab label="Datos" {...a11yProps(0)}/>
              <Tab label="Privilegios" {...a11yProps(1)}/>
            </Tabs>
            <Card>
            <TabPanel value={tabValue} index={0}>
              Cargando...
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              Cargando...
            </TabPanel>
            </Card>
          </SuiBox>
          <Card>
          </Card>
        </SuiBox>
        <Footer />
      </DashboardLayout>
    );
  }
}
export default Profesionales;
