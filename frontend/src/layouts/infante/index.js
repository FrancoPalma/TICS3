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
import { useHistory } from "react-router-dom";
import SuiInput from "components/SuiInput";
import Grid from "@material-ui/core/Grid";
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

export default function Profesionales() {
  const hist = useHistory();
  const classes = styles();
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const [Listo, setListo] = useState(0);
  const columns = [
    { name: "nombre", align: "left" },
    { name: "rut", align: "left" },
    { name: "fecha_nacimiento", align: "center" },
    { name: "telefono_apoderado", align: "center" },
    { name: "acciones", align: "center" }
  ];

  const [rows] = useState([]);
  const [aux] = useState([]);
  const handleChange0 = (event) => {
    aux[0]=event.target.checked;
  };
  const handleChange1 = (event) => {
    aux[1]=event.target.checked;
  };
  const handleChange2 = (event) => {
    aux[2]=event.target.checked;
  };
  const handleChange3 = (event) => {
    aux[3]=event.target.checked;
  };
  const handleChange4 = (event) => {
    aux[4]=event.target.checked;
  };
  /*
  const handleChange5 = (event) => {
    console.log(event.target.value)
    setTelefono(event.target.value);
    alert("el numero nuevo es:"+telefono)
  };
  const handleChange6 = (event) => {
    setEmail(event.target.value);
  };
  const handleChange7 = (event) => {
    setEspecialidad(event.target.value);
  };*/

  const [rut_infante, setRutinfante] = useState();
  const [nombre_infante, setNombreinfante] = useState();
  const [fecha_nacimiento, setfecha_nacimiento] = useState();


  const [rut_apoderado, setRutapoderado] = useState();
  const [nombre_apoderado, setNombreapoderado] = useState();
  const [email, setEmail] = useState();
  const [telefonoApoderado, settelefonoApoderado] = useState();

  

   
/*
  function Texto({rut}){
    while(aux.length > 0) {
      aux.pop();
    }
    aux.push(rut)
    return(
        <p>¿Esta seguro que desea eliminar este usuario?</p>
    )
  }

  */

  function Boton({rut,nombre,fecha_nacimiento, rut_apoderado, nombre_apoderado, telefono, email}){
    setNombre(nombre)
    setRut(rut)
    return(
      <>
      <SuiButton buttonColor="info" iconOnly
          onClick={async () => {
            const result = await Confirm(<Formulario2 rut={rut} nombre={nombre} telefono={telefono} email={email}  especialidad={especialidad} />, 
              'Edición usuario '+rut.toString());
            
            if (result) {
              EditarEmpleado2(rut, nombre);
            } else {
              // Сonfirmation not confirmed
            }
          }}
        >
            <Icon classsName="material-icons-round">edit</Icon>
        </SuiButton>
        <SuiButton buttonColor="info" iconOnly
          onClick={async () => {
            const result = await Confirm(<Texto rut={rut}/>, 
              'Confirmación de eliminación'+rut.toString());
            
            if (result) {
              EliminarEmpleado()
            } else {
              // Сonfirmation not confirmed

            }
          }}
        >
            <Icon classsName="material-icons-round">delete</Icon>
        </SuiButton>
      </>
    )
  }

  function Formulario2(rut, nombre, telefono, email, especialidad){
    setNombre(nombre);
    setRut(rut);
    setTelefono(telefono);
    setEmail(email);
    setEspecialidad(especialidad);
    return(
      <>
      <Grid container spacing={3}display="row">
        <Grid item xs={6}>
        <label>Teléfono: </label>
        </Grid>
        
        <Grid item xs={6}>
          <input
            type="tel"
            name="telefono"
            display="flex"
            onChange={(e) => {
              setTelefono(e.target.value);
            }}
          />
        </Grid>
        
        <Grid item xs={6}>
        <label>Email: </label>
        </Grid>
        
        <Grid item xs={6}>
          <input
            type="text"
            name="email"
            display="flex"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Grid>
        
        <Grid item xs={6}>
        <label>Especialidad: </label>
        </Grid>
        
        <Grid item xs={6}>
          <input
            type="text"
            name="especialidad"
            display="flex"
            onChange={(e) => {
              setEspecialidad(e.target.value);
            }}
          />
        </Grid>
      </Grid>
      </>
    )
  }
  function EditarEmpleado2(rut, nombre) {
    let regex = new RegExp("^[a-z A-Z]+$");
    let regex3 = new RegExp("^[0-9]+$");
    console.log(rut)
    console.log(nombre)
    console.log(telefono)
    alert(telefono)
    console.log(email)
    fetch('/usuario/editar_usuario/'+rut.toString(), {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      rut_usuario: rut,
      nombre: "Diego",
      telefono: "123",
      email: "hola@gmail.com"
    })
    })
    .then( (response) => {
        if(response.status === 200) {
            console.log("Editado correctamente")
            window.location.href = window.location.href;
        } else {
            console.log('Hubo un error')
            console.log(response.status)
        }
    })
    .catch((error) => {
        console.log(error)
    });
  }/*
  function BotonAgregar(){
    return(
      <SuiButton buttonColor="info" 
            onClick={async () => {
              const result = await Confirm(<Formulario/>, 
                'Agregar ');
              if (result) {
                AgregarProfesional();
              } else {
                // Сonfirmation not confirmed
              }
            }}
      >
        Agregar Profesional
        <Icon className="material-icons-round" color="inherit" fontSize="inherit">
          add
        </Icon>
      </SuiButton>
    )
  }*/

  function ActualizarInfantes(){
    if (Listo == 0){
      while(rows.length > 0) {
      rows.pop();
      }

      fetch('/infante/ver_infantes')
        .then(res => {
            return res.json()
        })
        .then(users => {
          for(let i=0; i < users.length;i++){
            let aux = true;
            for(let e=0;e < rows.length;e++){
              if(users[i].rut == rows[e].rut){
                aux=false;
              }
            }
            let test = users[i].fecha_nacimiento;

            test = test.toString();
            test = test.slice(0,9);
            console.log(test)
            if(aux == true){
              rows.push({nombre:users[i].nombre,
                rut: users[i].rut,
                fecha_nacimiento: test,
                telefono_apoderado: users[i].telefono,
                acciones: <Boton />
              })
              

            }
          }
          setListo(1);
        });
    }
  }
  /*
  function EditarEmpleado() {
    let regex = new RegExp("^[a-z A-Z]+$");
    let regex3 = new RegExp("^[0-9]+$");
    console.log(aux[0])
    console.log(aux[1])
    console.log(aux[2])
    console.log(aux[3])
    console.log(aux[4])
    fetch('/usuario/editar_privilegios/'+aux[5].toString(), {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      rut_usuario: aux[5],
      gestion_evaluacion: aux[0],
      gestion_ficha: aux[1],
      gestion_infante: aux[2],
      gestion_priv: aux[3],
      gestion_usuario: aux[4],
    })
    })
    .then( (response) => {
        if(response.status === 200) {
            console.log("Editado correctamente")
            window.location.href = window.location.href;
        } else {
            console.log('Hubo un error')
            console.log(response.status)
        }
    })
    .catch((error) => {
        console.log(error)
    });
  }
  function AgregarProfesional(){
  }
  function EliminarEmpleado() {
    fetch('/usuario/eliminar_usuario/' + aux[0].toString(), {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      rut_usuario: aux[0],
    })
    })
    .then( (response) => {
        if(response.status === 201) {
            console.log("Eliminado correctamente")
            window.location.href = window.location.href;
        } else {
            console.log('Hubo un error')
        }
    })
    .catch((error) => {
        console.log(error)
    });
  }*/



  if(Listo === 1){
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={6}>
        <SuiBox mb={6}>

          <Card>

            <SuiBox customClass={classes.tables_table}>
              <Table columns={columns} rows={rows} />
            </SuiBox>
     
          </Card>
        </SuiBox>
        <Card>
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
  }else{
    ActualizarInfantes();
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
}

