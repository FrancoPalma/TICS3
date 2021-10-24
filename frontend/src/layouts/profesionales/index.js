import { useState } from "react";
import Card from "@material-ui/core/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Footer from "examples/Footer";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styles from "layouts/tables/styles";
import Table from "examples/Table";
import { func } from "prop-types";
import SuiButton from "components/SuiButton";
import Icon from "@material-ui/core/Icon";
import typography from "assets/theme/base/typography";
import { Confirm,} from 'react-st-modal';

/*npm install @mui/material @emotion/react @emotion/styled*/
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
  const [aux] = useState([]);

  function Checks({p1,p2,p3,p4,p5}){
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  aux.push(p1)
  aux.push(p2)
  aux.push(p3)
  aux.push(p4)
  aux.push(p5)
  return(
    <div>
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked={aux[0]} />} label="Gestión Evaluación" />
        <FormControlLabel control={<Checkbox defaultChecked={aux[1]}/>} label="Gestión Ficha" />
        <FormControlLabel control={<Checkbox defaultChecked={aux[2]}/>} label="Gestión Infante" />
        <FormControlLabel control={<Checkbox defaultChecked={aux[3]}/>} label="Gestión Privilegios" />
        <FormControlLabel control={<Checkbox defaultChecked={aux[4]}/>} label="Gestión Usuarios" />

      </FormGroup>
    </div>
  )
}

function Boton({rut,p1,p2,p3,p4,p5}){
  return(
    <>
    <button buttonColor="primary" iconOnly
        onClick={async () => {
          const result = await Confirm(<Checks rut={rut} p1={p1} p2={p2} p3={p3} p4={p4} p5={p5}/>, 
            'Edición usuario '+rut.toString());
          
          if (result) {
            EditarEmpleado(rut={rut})
          } else {
            // Сonfirmation not confirmed
          }
        }}
      >
          <Icon classsName="material-icons-round">edit</Icon>
      </button>
      <button buttonColor="primary" iconOnly
        onClick={async () => {
          const result = await Confirm('¿Esta seguro que desea eliminar este usuario?', 
            'Confirmación de eliminación'+rut.toString());
          
          if (result) {
            EliminarEmpleado(rut={rut})
          } else {
            // Сonfirmation not confirmed
          }
        }}
      >
          <Icon classsName="material-icons-round">delete</Icon>
      </button>
    </>
  )
}

  function ActualizarEmpleados(){
    console.log("Corre")
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
            acciones: <Boton rut={users[i].rut} p1={users[i].gestion_evaluacion} p2={users[i].gestion_ficha} p3 ={users[i].gestion_infante} p4={users[i].gestion_priv} p5={users[i].gestion_usuario}/>
          })
        }
        setListo(1);
      });
    }
  
  function EditarEmpleado(rut) {
    let regex = new RegExp("^[a-z A-Z]+$");
    let regex3 = new RegExp("^[0-9]+$");
    fetch('/editar_privilegios/'+rut.toString(), {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      rut_usuario: rut,
      gestion_evaluacion: aux[0],
      gestion_ficha: aux[1],
      gestion_infante: aux[2],
      gestion_priv: aux[3],
      gestion_usuario: aux[4],
    })
    })
    .then( (response) => {
        if(response.status === 201) {
            console.log("Editado correctamente")
            this.setState({mensaje: 2});
        } else {
            console.log('Hubo un error')
            this.setState({mensaje: 4});
            console.log(response.status)
        }
    })
    .catch((error) => {
        console.log(error)
    });
    
  }

  function EliminarEmpleado(rut) {
    console.log(rut)
    fetch('/delete_empleado/' + rut.toString(), {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      rut_usuario: rut,
    })
    })
    .then( (response) => {
        if(response.status === 201) {
            console.log("Eliminado correctamente")
            this.setState({mensaje: 3});
        } else {
            console.log('Hubo un error')
            this.setState({mensaje: 4});
        }
    })
    .catch((error) => {
        console.log(error)
    });
  }


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
