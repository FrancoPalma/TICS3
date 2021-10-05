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

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  picker: {
    height: 50
  },
  formControl: {
    marginHorizontal: 10,
    minWidth: 160,
  },
  selectEmpty: {
    marginTop: 20,
  },
  root: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
  },
  botonera: {
    marginRight: "auto",
    marginLeft: 20,
    marginBottom: 10
  },
  botonañadir: {
    width: 150,
  },
  añadirestilo: {
    margin: 'auto',
    marginBottom:20,
  },
  formañadir: {
    marginLeft: 5,
    marginRight: 5
  }
};


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
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const [Listo, setListo] = useState(0);
  const [Lista, setLista] = useState(0);

  let info = JSON.parse(localStorage.getItem('usuario'));

  function ActualizarEmpleados(){
    fetch('/usuario/ver_privilegios')
      .then(res => {
          return res.json()
      })
      .then(users => {
        setLista( users);
        setListo(1);
      });
    }
    console.log(Lista)
    
  if(Listo === 1){
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={1}>
        <SuiBox mb={1}>
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
export default Privilegios;
