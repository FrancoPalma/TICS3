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

export default function Infantes() {
  const hist = useHistory();
  const classes = styles();
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const [Listo, setListo] = useState(0);


  const [RutInfante, setRutInfante] = useState('');
  const [NameChild, setNameChild] = useState('');
  const [Date, setDate] = useState('');

  const [RutApoderado, setRutApoderado] = useState('');
  const [NameFather,setNameFather] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');


  const [Test, setTest] = useState('');

  const columns = [
    { name: "nombre", align: "left" },
    { name: "rut", align: "left" },
    { name: "fecha_nacimiento", align: "center" },
    { name: "nombre_apoderado", align: "center" },
    { name: "telefono_apoderado", align: "center" },
    {name: "acciones", align:"center" }
  ];

  let rut_infante;
  let nombre_infante;
  let fecha_nacimiento;

  let rut_apoderado;
  let nombre_a;
  let telefono;
  let email;


  const [rows] = useState([]);
  function Colocao(rut){
      setRutInfante(rut)
      setListo(2)
  }

  function Texto({rut}){
    setRutInfante(rut)
    return(
        <p>¿Esta seguro que desea eliminar este usuario?</p>
    )}
  function Boton({rut}){
    return(
      <>
      <SuiButton buttonColor="info" iconOnly onClick = { async() => Colocao(rut)}>
            <Icon classsName="material-icons-round">visibility</Icon>
        </SuiButton>

        <SuiButton buttonColor="info" iconOnly
          onClick={async () => {
            const result = await Confirm(<Texto rut={rut}/>, 
              'Confirmación de eliminación '+rut.toString());
            
            if (result) {
              EliminarInfante()
            } else {
              // Сonfirmation not confirmed
            }
          }}
        >
            <Icon classsName="material-icons-round">delete</Icon>
        </SuiButton>
      </>  
    );
  }

  function EliminarInfante(){
    rut_infante = RutInfante;
    fetch('/infante/eliminar_infante/'+rut_infante.toString(),{
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      rut_infante: rut_infante,
    })
    })
    .then((response) => {
      if (response.status == 200){
        console.log("Eliminado correctamente")
        alert("Eliminado correctamente");
        setListo(0);
      }
      else{
        console.log("Hubo un error")
        console.log(response.status)
      }
    })
  }

  function VisualizarDatos(rut_infante){
      if(Listo === 2){
        while(rows.length > 0) {
            rows.pop();
            }
        fetch('/infante/ver_infante/'+rut_infante.toString(),{
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }
        })

        .then(res => {
            return res.json()
        })
        .then(users => {

            let date = users.fecha_nacimiento;
            date = date.toString();
            date = date.slice(0,9);


            setNameChild(users.nombre)
            setDate(date)
            
            setRutApoderado(users.rut_apoderado)
            setNameFather(users.nombre_apoderado)
            setEmail(users.email)
            setPhone(users.telefono)

            //rows.push({rut: users.rut, nombre: users.nombre});
            
            setListo(3);
        });

  }}

  function Formulario(){
    return(
      <>
      <h1>Datos del Infante</h1>
      <Grid container spacing={3}display="row">

        <Grid item xs={6}>
        <label>RUT Infante: </label>
        </Grid>
        
        <Grid item xs={6}>
          <input
          type="text"
          name="rut_infante"
          display="flex"
          onChange={(e) => {
            rut_infante = e.target.value;
          }}/>
        </Grid>
        
        <Grid item xs={6}>
        <label>Nombre Infante: </label>
        </Grid>
        
        <Grid item xs={6}>
          <input
            type="text"
            name="nombre_infante"
            display="flex"
            onChange={(e) => {
              nombre_infante = e.target.value;
            }}
          />
        </Grid>

        <Grid item xs={6}>
        <label>Fecha de Nacimiento: </label>
        </Grid>
        
        <Grid item xs={6}>
          <input
            type="date"
            name="fecha_nacimiento"
            display="flex"
            onChange={(e) => {
              fecha_nacimiento = e.target.value;
            }}
          />
        </Grid>
</Grid>

<h1>Datos del Apoderado</h1>
        <Grid container spacing={3}display="row">

        <Grid item xs={6}>
        <label>Nombre apoderado: </label>
        </Grid>
        
        <Grid item xs={6}>
          <input
            type="text"
            name="nombre_a"
            display="flex"
            onChange={(e) => {
              nombre_a = e.target.value;
            }}
          />
        </Grid>

        <Grid item xs={6}>
        <label>RUT apoderado: </label>
        </Grid>
        
        <Grid item xs={6}>
          <input
            type="text"
            name="rut_apoderado"
            display="flex"
            onChange={(e) => {
              rut_apoderado = e.target.value;
            }}
          />
        </Grid>

        <Grid item xs={6}>
        <label>Teléfono: </label>
        </Grid>
        
        <Grid item xs={6}>
          <input
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
          <input
            type="text"
            name="email"
            display="flex"
            onChange={(e) => {
              email = e.target.value;
            }}
          />
        </Grid>
        
     </Grid>
      </>
    )
  }

  function BotonAgregar(){
    return(
      <SuiButton buttonColor="info" 
            onClick={async () => {
              const result = await Confirm(<Formulario/>, 
                'Agregar ');
              if (result) {
                AgregarInfante();
              } else {
                // Сonfirmation not confirmed
              }
            }}
      >
        Agregar Infante
        <Icon className="material-icons-round" color="inherit" fontSize="inherit">
          add
        </Icon>
      </SuiButton>
    )
  }

  function AgregarInfante(){
    let id_jardin = 1;


      fetch('/infante/agregar_infante/',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_jardin: id_jardin,
        rut_infante: rut_infante,
        nombre_infante: nombre_infante,
        fecha_nacimiento: fecha_nacimiento,
        nombre_apoderado:nombre_a,
        rut_apoderado : rut_apoderado,
        email: email,
        telefono: telefono
      })
      })
      .then( (response) => {
        if(response.status === 200) {
            console.log("Agregado correctamente")
            
        } else {
            console.log('Hubo un error')
            console.log(response.status)
        }
        setListo(0);
    })

  }

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
            let fecha_nacimiento = users[i].fecha_nacimiento;

            fecha_nacimiento = fecha_nacimiento.toString();
            fecha_nacimiento = fecha_nacimiento.slice(0,9);

            if(aux == true){
              rows.push({nombre:users[i].nombre,
                rut: users[i].rut,
                fecha_nacimiento: fecha_nacimiento,
                nombre_apoderado: users[i].nombre_apoderado,
                telefono_apoderado: users[i].telefono,
                acciones: <Boton rut={users[i].rut}/>
              })
              


            }
          }

          setListo(1);

        });
    }
  }






  if(Listo === 1){

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={6}>
        <SuiBox mb={6}>

          <Card>
          <BotonAgregar/>
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
  }else if (Listo === 0){
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
  else if (Listo === 2){
      if(Listo === 2){
    VisualizarDatos(RutInfante)}
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
  else if (Listo === 3){

    return(
        
    <DashboardLayout>
    <DashboardNavbar />
    <SuiBox py={3}>
      <SuiBox mb={3}>
      <SuiTypography variant="h6"></SuiTypography>
        <Card>

        <SuiBox display="inrow" justifyContent="space-between" alignItems="center" p={5} spacing = {3}>
          <SuiBox item>
            <label>Rut: </label>
          {RutInfante}
          </SuiBox>
          <SuiBox item>
          {NameChild}
          </SuiBox>
          <SuiBox item>
          {Date}
          </SuiBox>
          </SuiBox>

          <SuiBox display="inrow" justifyContent="space-between" alignItems="center" p={5} spacing = {3}>
          <SuiBox item>
          {RutApoderado}
          </SuiBox>
          <SuiBox item>
          
          {NameFather}
          </SuiBox>
          <SuiBox item>
          {Email}
          </SuiBox>
          <SuiBox item>

          {Phone}
          </SuiBox>
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