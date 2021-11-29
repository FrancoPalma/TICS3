import { useState } from "react";
import Card from "@material-ui/core/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from "@material-ui/core/TextField";
import Checkbox from '@mui/material/Checkbox';
import Footer from "examples/Footer";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styles from "layouts/tables/styles";
import Table from "examples/Table";
import SuiButton from "components/SuiButton";
import Icon from "@material-ui/core/Icon";
import typography from "assets/theme/base/typography";
import { Confirm,} from 'react-st-modal';
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
/*npm install @mui/material @emotion/react @emotion/styled*/

let info = JSON.parse(localStorage.getItem('usuario'));
console.log(info)
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
  const [Confirmar, setConfirmar] = useState(true)
  const hist = useHistory();
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
    { name: "privilegios", align: "center" },
    { name: "usuario", align: "center" },
    { name: "horario", align: "center" },
    { name: "acciones", align: "right" }
  ];
  const columns2 = [
    { name: "nombre", align: "left" },
    { name: "rut", align: "left" },
    { name: "telefono", align: "center" },
    { name: "email", align: "center" },
    { name: "especialidad", align: "center" },
    { name: "acciones", align: "right" }
  ];
  const [rows] = useState([]);
  const [rows2] = useState([]);
  const [aux] = useState([]);
  const [datos] = useState([]);
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
  const handleChange5 = (event) => {
    aux[5]=event.target.checked;
  };
  const handleChange6 = (event) => {
    datos[1]=event.target.value;
  };
  const handleChange7 = (event) => {
    datos[2]=event.target.value;
  };
  const handleChange8 = (event) => {
    datos[3]=event.target.value;
  };
  const handleChange9 = (event) => {
    datos[4]=event.target.value;
  };

  let rut;
  let nombre;
  let email;
  let telefono;
  let especialidad;

  function Checks({rut, p1,p2,p3,p4,p5,p6}){
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    while(aux.length > 0) {
      aux.pop();
    }
    aux.push(p1)
    aux.push(p2)
    aux.push(p3)
    aux.push(p4)
    aux.push(p5)
    aux.push(p6)
    aux.push(rut)
    return(
      <div>
        <FormGroup>
          <FormControlLabel control={<Checkbox onChange={handleChange0} defaultChecked={aux[0]} />} label="Gestión Evaluación" />
          <FormControlLabel control={<Checkbox onChange={handleChange1} defaultChecked={aux[1]}/>} label="Gestión Ficha" />
          <FormControlLabel control={<Checkbox onChange={handleChange2} defaultChecked={aux[2]}/>} label="Gestión Infante" />
          <FormControlLabel control={<Checkbox onChange={handleChange3} defaultChecked={aux[3]}/>} label="Gestión Privilegios" />
          <FormControlLabel control={<Checkbox onChange={handleChange4} defaultChecked={aux[4]}/>} label="Gestión Usuarios" />
          <FormControlLabel control={<Checkbox onChange={handleChange5} defaultChecked={aux[5]}/>} label="Gestión Horarios" />


        </FormGroup>
      </div>
    )
  }
  function Texto({rut}){
    while(aux.length > 0) {
      aux.pop();
    }
    aux.push(rut)
    return(
        <p>¿Esta seguro que desea eliminar este usuario?</p>
    )
  }
  function Boton({rut,p1,p2,p3,p4,p5,p6}){
    return(
      <>
      <SuiButton buttonColor="info" iconOnly
          onClick={async () => {
            const result = await Confirm(<Checks rut={rut} p1={p1} p2={p2} p3={p3} p4={p4} p5={p5} p6={p6}/>, 
              'Edición usuario '+rut.toString());
            
            if (result) {
              EditarEmpleado(rut={rut})
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
              'Confirmación de eliminación '+rut.toString());
            
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
  function Boton2({rut,nombre, telefono, email,especialidad}){
    let nom = nombre;
    return(
      <>
      <SuiButton buttonColor="info" iconOnly
          onClick={async () => {
            const result = await Confirm(<Formulario2 r={rut} n={nom} t={telefono} e={email}  es={especialidad} />, 
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
              'Confirmación de eliminación '+rut.toString());
            
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
  function Formulario(){
    return(
      <>
      <Grid container spacing={3}display="row">
        <Grid item xs={6}>
        <label>RUT: </label>
        </Grid>
        
        <Grid item xs={6}>
          <TextField
          variant="outlined"
          type="text"
          name="rut"
          display="flex"
          helperText = "Sin punto y con guión"
          onChange={(e) => {
            rut = e.target.value;
          }}/>
        </Grid>
        
        <Grid item xs={6}>
        <label>Nombre: </label>
        </Grid>
        
        <Grid item xs={6}>
          <TextField
          variant="outlined"
            type="text"
            name="nombre"
            display="flex"
            onChange={(e) => {
              nombre = e.target.value;
            }}
          />
        </Grid>
        <Grid item xs={6}>
        <label>Teléfono: </label>
        </Grid>
        
        <Grid item xs={6}>
          <TextField
          variant="outlined"
            type="text"
            name="telefono"
            display="flex"
            onChange={(e) => {
              telefono = e.target.value;
            }}
          />
        </Grid>
        
        <Grid item xs={6}>
        <label>Email: </label>
        </Grid>
        
        <Grid item xs={6}>
          <TextField
          variant="outlined"
            type="text"
            name="email"
            display="flex"
            onChange={(e) => {
              email = e.target.value;
            }}
          />
        </Grid>
        
        <Grid item xs={6}>
        <label>Especialidad: </label>
        </Grid>
        
        <Grid item xs={6}>
          <TextField
          variant="outlined"
            type="text"
            name="especialidad"
            display="flex"
            onChange={(e) => {
              especialidad = e.target.value;
              console.log(especialidad);
            }}
          />
        </Grid>
      </Grid>
      </>
    )
  }


  function Formulario2({r, n, t, e, es}){
    rut = r;
    nombre= n;
    telefono = t;
    email = e;
    especialidad = es;
    return(
      <>
      <Grid container spacing={3}display="row">
      <Grid item xs={6}>
        <label>Nombre: </label>
        </Grid>
        
        <Grid item xs={6}>
          <TextField
          variant="outlined"
            type="text"
            name="nombre"
            defaultValue={nombre}
            display="flex"
            onChange={(e) => {nombre = e.target.value}}
          />
        </Grid>

        <Grid item xs={6}>
        <label>Teléfono: </label>
        </Grid>
        
        <Grid item xs={6}>
          <TextField
          variant="outlined"
            type="tel"
            name="telefono"
            defaultValue={telefono}
            display="flex"
            onChange={(e) => {
              telefono = e.target.value;
            }}
          />
        </Grid>
        
        <Grid item xs={6}>
        <label>Email: </label>
        </Grid>
        
        <Grid item xs={6}>
          <TextField
          variant="outlined"
            type="text"
            name="email"
            defaultValue={email}
            display="flex"
            onChange={(e) => {
              email = e.target.value;
            }}
          />
        </Grid>
        
        <Grid item xs={6}>
        <label>Especialidad: </label>
        </Grid>
        
        <Grid item xs={6}>
          <TextField
          variant="outlined"
            type="text"
            name="especialidad"
            defaultValue={especialidad}
            display="flex"
            onChange={(e) => {
              especialidad = e.target.value;
            }}
          />
        </Grid>
      </Grid>
      </>
    )
  }
  function EditarEmpleado2() {
    if(Confirmar === true){
          fetch('/usuario/editar_usuario/'+rut.toString(), {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            rut_usuario: rut,
            nombre: nombre,
            telefono: telefono,
            email: email,
            especialidad: especialidad
          })
          })
          .then( (response) => {
              if(response.status === 200) {
                  alert("Editado correctamente")
                  window.location.href = window.location.href;
              } else if(response.status === 404) {
                  alert('Error en la conexión por favor volver a intentarlo')
              } else if (response.status === 405){
                  alert("Datos ingresado inválidos")
              }
          })
          .catch((error) => {
              console.log(error)
          });}
          else{
            alert("Error")
          }
  }
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
  }
  function Fuera(){
    hist.push('/authentication/sign-in');
  }
  function ActualizarEmpleados(){
    if(info == null){
      hist.push('/authentication/sign-in');
    }
    if (Listo == 0){
      while(rows.length > 0) {
        rows.pop();
      }
      while(rows2.length > 0) {
        rows2.pop();
      }
      fetch('/usuario/ver_privilegios')

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
            if(aux == true){
              rows.push({nombre:users[i].nombre,
                rut: users[i].rut,
                evaluación: <Check boleano={ users[i].gestion_evaluacion}/>,
                ficha: <Check boleano={users[i].gestion_ficha}/>,
                infante: <Check boleano={users[i].gestion_infante}/>,
                privilegios: <Check boleano={users[i].gestion_priv}/>,
                usuario: <Check boleano={users[i].gestion_usuario}/>,
                horario: <Check boleano={users[i].gestion_horario}/> ,
                acciones: <Boton rut={users[i].rut} p1={users[i].gestion_evaluacion} p2={users[i].gestion_ficha} p3 ={users[i].gestion_infante} p4={users[i].gestion_priv} p5={users[i].gestion_usuario} p6={users[i].gestion_horario}/>
              })
            }
          }
        });

        fetch('/usuario/ver_usuarios')
        .then(res => {
            return res.json()
        })
        .then(users => {
          for(let i=0; i < users.length;i++){
            let aux = true;
            for(let e=0;e < rows2.length;e++){
              if(users[i].rut == rows2[e].rut){
                aux=false;
              }
            }
            if(aux == true){
              rows2.push({nombre:users[i].nombre,
                rut: users[i].rut,
                telefono: users[i].telefono,
                email: users[i].email,
                especialidad: users[i].especialidad,
                acciones: <Boton2 rut={users[i].rut} nombre={users[i].nombre} telefono={users[i].telefono} email={users[i].email} especialidad={users[i].especialidad}/>
              })
            }
          }
          setListo(1);
        });


    }
  }
  function EditarEmpleado() {
    fetch('/usuario/editar_privilegios/'+aux[6].toString(), {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      rut_usuario: aux[6],
      gestion_evaluacion: aux[0],
      gestion_ficha: aux[1],
      gestion_infante: aux[2],
      gestion_priv: aux[3],
      gestion_usuario: aux[4],
      gestion_horario: aux[5],
    })
    })
    .then( (response) => {
        if(response.status === 200) {
           alert("Editado correctamente");
            window.location.href = window.location.href;
        } else if (response.status === 405){
            alert('Datos ingresados inválidos')
        }else{
          alert('Hubo un error')
        }
    })
    .catch((error) => {
        console.log(error)
    });
  }
  function AgregarProfesional(){
    fetch('sesion/agregar_usuario', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      rut: rut,
      nombre: nombre,
      telefono: telefono,
      email: email,
      especialidad: especialidad,
      password: "defecto"
    })
    })
    .then( (response) => {
        if(response.status === 200) {
            alert("Agregado correctamente")
            window.location.href = window.location.href;
        } else if (response.status === 405){
          alert('Datos ingresados inválidos')
        }else{
          alert('Hubo un error')
        }
    })
    .catch((error) => {
        console.log(error)
    });
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
        if(response.status == 200) {
            console.log("Eliminado correctamente")
            alert("Eliminado correctamente");
            window.location.href = window.location.href;
        } else {
            console.log('Hubo un error')
        }
    })
    .catch((error) => {
        console.log(error)
    });
  }

  if(info == null){
    Fuera();
  }else{
    if (info.gestion_usuario === false){
      return(
        <DashboardLayout>
          <DashboardNavbar/>
          <SuiBox py={3}>
            <SuiBox mb={3}>
  
              <Card>
              <center>
                <h1>Usted no tiene acceso a este módulo</h1>
              </center>
              </Card>
            </SuiBox>
            <Card>
            </Card>
          </SuiBox>
          <Footer />
        </DashboardLayout>
      );
    }
    else{
    if(Listo === 1 && info.gestion_priv === true){
      return (
        <DashboardLayout>
          <DashboardNavbar/>
          <SuiBox py={6}>
            <SuiBox mb={6}>
            <Tabs value={tabValue} onChange={handleSetTabValue}>
                <Tab label="Datos" {...a11yProps(0)}/>
                <Tab label="Privilegios" {...a11yProps(1)}/>
            </Tabs>
              <Card>
              <TabPanel value={tabValue} index={0}>
                <BotonAgregar/>
                <SuiBox customClass={classes.tables_table}>
                  <Table columns={columns2} rows={rows2} />
                </SuiBox>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
      
                <SuiBox customClass={classes.tables_table}>
                  <Table columns={columns} rows={rows} />
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
      if(Listo === 1 && info.gestion_priv === false){
        return (
          <DashboardLayout>
            <DashboardNavbar/>
            <SuiBox py={6}>
              <SuiBox mb={6}>
    
                <Card>
                  <h3>Datos</h3>
                  <BotonAgregar/>
                  <SuiBox customClass={classes.tables_table}>
                    <Table columns={columns2} rows={rows2} />
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
      if (Listo === 0 && info.gestion_usuario === true){
        ActualizarEmpleados();
        return(
          <DashboardLayout>
            <DashboardNavbar/>
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
  }
}

