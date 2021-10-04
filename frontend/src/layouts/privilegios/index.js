import { useState } from "react";
import Card from "@material-ui/core/Card";

// Soft UI Dashboard Material-UI components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import styles from "layouts/tables/styles";
// Soft UI Dashboard Material-UI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MaterialTable from 'material-table';
import Data from "layouts/privilegios/data/DataPrivilegios"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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

function Privilegios() {
  const classes = styles();
  const { columns, rows } = Data;
  const [datos, setDatos] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  let info = JSON.parse(localStorage.getItem('usuario'));
  let ListaPriv
  const [gestion_privilegio, setGestion_privilegio] = useState(false);
  console.log(info)

  function ActualizarEmpleados() {
    fetch('/empleados')
      .then(res => {
          return res.json()
      })
      .then(users => {
        ListaPriv = users;
          
      });
    }
    ActualizarEmpleados();


  return (
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
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">Tabla de Datos</SuiTypography>
            </SuiBox>
            <SuiBox customClass={classes.tables_table}>
            <MaterialTable
                      title=''
                      columns={[{ title: 'Nombre', field: 'nombre', editable: 'never'},
                      {title: 'Gestión de Usuarios', field: 'gestion_usuarios', type:'boolean'},
                      {title: 'Gestión Ficha Técnica', field: 'gestion_ficha', type:'boolean'},
                      { title: 'Gestión Privilegios', field: 'gestion_privilegios', type:'boolean'},
                      { title: 'Gestión de Evaluación', field: 'gestion_evaluacion', type:'boolean'},
                      { title: 'Gestión de Infante', field: 'gestion_infante', type:'boolean'}]}
                      data={[]}
                      editable={{
                        onRowAdd: newData =>
                          new Promise((resolve, reject) => {
                            setTimeout(() => {
                              resolve();
                              this.ActualizarEmpleados();
                            }, 2000)
                            this.AgregarEmpleado(newData);

                          }),
                        onRowUpdate: (newData, oldData) =>
                          new Promise((resolve) => {
                            setTimeout(() => {
                              resolve();
                              this.ActualizarEmpleados();
                            }, 2000)
                            this.EditarEmpleado(newData)
                          }),
                        onRowDelete: (oldData) =>
                          new Promise((resolve) => {
                            setTimeout(() => {
                              resolve();
                              this.ActualizarEmpleados();
                            }, 2000)
                            this.EliminarEmpleado(oldData)
                          }),
                      }}
                    />
            </SuiBox>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">Tabla de privilegios</SuiTypography>
            </SuiBox>
            <SuiBox customClass={classes.tables_table}>
            <MaterialTable
                      title=''
                      columns={[{ title: 'Nombre', field: 'nombre', editable: 'never'},
                      {title: 'Gestión de Usuarios', field: 'gestion_usuarios', type:'boolean'},
                      {title: 'Gestión Ficha Técnica', field: 'gestion_ficha', type:'boolean'},
                      { title: 'Gestión Privilegios', field: 'gestion_privilegios', type:'boolean'},
                      { title: 'Gestión de Evaluación', field: 'gestion_evaluacion', type:'boolean'},
                      { title: 'Gestión de Infante', field: 'gestion_infante', type:'boolean'}]}
                      data={[]}
                      editable={{
                        onRowAdd: newData =>
                          new Promise((resolve, reject) => {
                            setTimeout(() => {
                              resolve();
                              this.ActualizarEmpleados();
                            }, 2000)
                            this.AgregarEmpleado(newData);

                          }),
                        onRowUpdate: (newData, oldData) =>
                          new Promise((resolve) => {
                            setTimeout(() => {
                              resolve();
                              this.ActualizarEmpleados();
                            }, 2000)
                            this.EditarEmpleado(newData)
                          }),
                        onRowDelete: (oldData) =>
                          new Promise((resolve) => {
                            setTimeout(() => {
                              resolve();
                              this.ActualizarEmpleados();
                            }, 2000)
                            this.EliminarEmpleado(oldData)
                          }),
                      }}
                    />
            </SuiBox>
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

export default Privilegios;
