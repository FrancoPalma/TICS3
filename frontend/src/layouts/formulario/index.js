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

  function Formulario(){
    const classes = styles();
    const [tabValue, setTabValue] = useState(0);
    const handleSetTabValue = (event, newValue) => setTabValue(newValue);
    const [Listo, setListo] = useState(0);

    let info = JSON.parse(localStorage.getItem('usuario'));
    let Lista;

    function CrearInforme(){
      fetch('/crear_informe')
      .then(res => {
            return res.json()
      })
      .then(users => {
        Lista = users;
        console.log(users)
        setListo(1);
      });
    }
    CrearInforme();
    if(Listo ===1){
      return(
        <DashboardLayout>
        <DashboardNavbar />
        <SuiBox py={3}>
          <SuiBox mb={3}>
         
            <Card>
            
           
              <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SuiTypography variant="h6">Tabla de Privilegios</SuiTypography>
              </SuiBox>
              <SuiBox customClass={classes.tables_table}>
              <MaterialTable
                        title=''
                        rows={[{ title: 'Nombre', field: 'nombre', editable: 'never'},
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
  export default Formulario;