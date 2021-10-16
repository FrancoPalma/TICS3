import { useState } from "react";
import Card from "@material-ui/core/Card";

// Soft UI Dashboard Material-UI components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
//import styles from "layouts/tables/styles";
// Soft UI Dashboard Material-UI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MaterialTable from 'material-table';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import styles from "layouts/tables/styles";



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

function Profesionales() {
  const classes = styles();
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const [Listo, setListo] = useState(0);
  const [Lista, setLista] = useState([]);

  let info = JSON.parse(localStorage.getItem('usuario'));

  function ActualizarEmpleados(){
    fetch('/usuario/ver_privilegios')
      .then(res => {
          return res.json()
      })
      .then(users => {
        console.log("hola")
        console.log(users)
        for(let i=0; i < users.length;i++){
          Lista.push({nombre:users[i].nombre, gestion_evaluacion: users[i].gestion_evaluacion, gestion_ficha: users[i].gestion_ficha, gestion_infante: users[i].gestion_infante,
            gestion_priv: users[i].gestion_priv, gestion_usuario: users[i].gestion_usuario, rut: users[i].rut})
        }
        setListo(1);
      });
    }
    console.log(Lista)
    
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
            <MaterialTable
                      title=''
                      columns={[{ title: 'Nombre', field: 'nombre', editable: 'never',align: "left"},
                      {title: 'Gestión de Usuarios', field: 'gestion_usuarios', type:'boolean', align: "left"},
                      {title: 'Gestión Ficha Técnica', field: 'gestion_ficha', type:'boolean', align: "left"},
                      { title: 'Gestión Privilegios', field: 'gestion_privilegios', type:'boolean', align: "left"},
                      { title: 'Gestión de Evaluación', field: 'gestion_evaluacion', type:'boolean', align: "left"},
                      { title: 'Gestión de Infante', field: 'gestion_infante', type:'boolean', align: "left"}]}
                      data={Lista}
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
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
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