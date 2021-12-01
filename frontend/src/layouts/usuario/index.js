import { useState } from "react";
import { Editor } from '@tinymce/tinymce-react';
import Card from "@material-ui/core/Card";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Footer from "examples/Footer";
import TextField from "@material-ui/core/TextField";
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
import axios from 'axios';

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

export default function Usuarios() {
  let info;

  function getInfo(){
    fetch("sesion/datos_usuario/")
    .then( (response) => {
      console.log(response.status)
      if (response.status === 404){
        hist.push('/authentication/sign-in')
      }
        return response.json()
  
    })
    .then(users => {
      info = users
      if (users.gestion_infante === true){
          ActualizarInfantes()
      }
      else if (users.gestion_infante === false){
          ActualizarInfantes_Aux()
      }
      

    });
  }

  function getInfo2(){
    fetch("sesion/datos_usuario/")
    .then( (response) => {
      console.log(response.status)
      if (response.status === 404){
        hist.push('/authentication/sign-in')
      }
        return response.json()
  
    })
    .then(users => {
      info = users
      if (users.gestion_infante === true ){
        if(users.gestion_ficha === true && users.gestion_evaluacion === true){ 
            setListo(4)
        }
        else if(users.gestion_ficha === true && users.gestion_evaluacion === false){ 
            setListo(9)
        }
        else if(users.gestion_ficha === false && users.gestion_evaluacion === true){
            setListo(10)
        }
        else if(users.gestion_ficha === false && users.gestion_evaluacion === false){
            setListo(11)
        }
    }
    else if (users.gestion_infante === false){
  
      if(users.gestion_ficha === true && users.gestion_evaluacion === true){
            setListo(5)
      }
      else if(users.gestion_ficha === true && users.gestion_evaluacion === false){ 
            setListo(6)
      }
      else if(users.gestion_ficha === false && users.gestion_evaluacion === true){
            setListo(7)
      }
      else if(users.gestion_ficha === false && users.gestion_evaluacion === false){
            setListo(8)
      } 
    }
      

    });
  }

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
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
  const [value, setValue] = useState('');
  const [text, setText] = useState('');
  const [Test, setTest] = useState('');
  const [id, setID] = useState(0);
  const columns = [
    { name: "nombre", align: "left" },
    { name: "rut", align: "left" },
    { name: "fecha_nacimiento", align: "center" },
    { name: "nombre_apoderado", align: "center" },
    { name: "telefono_apoderado", align: "center" },
    {name: "visualizar", align:"center" },
    {name: "eliminar", align:"center" },
  ];
  const columns_aux    = [
    { name: "nombre", align: "left" },
    { name: "rut", align: "left" },
    { name: "fecha_nacimiento", align: "center" },
    { name: "nombre_apoderado", align: "center" },
    { name: "telefono_apoderado", align: "center" },
    {name: "visualizar", align:"center" },
  ];
  const columns2 = [
    { name: "id", align: "left" },
    { name: "fecha", align: "center" },
    {name: "visualizar", align:"right" },
    {name: "acciones", align:"right" }
  ];
  const columns2_aux = [
    { name: "id", align: "left" },
    { name: "fecha", align: "center" },
    {name: "visualizar", align:"right" }
  ];
  let rut_infante;
  let nombre_infante;
  let fecha_nacimiento;
  let rut_apoderado;
  let nombre_a;
  let telefono;
  let email;
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isSelected,setIsSelected] = useState(false);
  const [loaded, setLoaded] = useState();
  const changeHandler = (event) => {
  setSelectedFile(event.target.files[0]);
  setIsSelected(true);
  setLoaded(0);
};
  const handleSubmission = () => {
  const formData = new FormData();
  formData.append('file', selectedFile);
  axios.post("/infante/importar_ficha/"+RutInfante, formData, { // receive two parameter endpoint url ,form data 
  })
  .then(response => {
    console.log(response.status)
    if(response.status == 200){
      alert("Ficha importada");
    }
  })
  .catch((err) => {
    alert("La Ficha debe ser un PDF");
  })
  
  };
  
  const [rows] = useState([]);
  const [rows2] = useState([]);

  function Colocao(rut){
      setRutInfante(rut)
      setListo(3)
  }
  function RecibirFicha(){
    fetch('/infante/ver_ficha/'+RutInfante.toString(), {
  method: "POST",
  headers: {
    Accept: 'application/pdf',
    "Content-Type": "application/json"
  },
})
  .then(res => res.blob())
  .then(response => {
    //Create a Blob from the PDF Stream
    console.log(response);
    const file = new Blob([response], {
      type: "application/pdf"
    });

    if(response.size == 9){
      alert("No existe la Ficha técnica")
    }else{

    //Build a URL from the file
    const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
    window.open(fileURL);
    }
  })
  .catch(error => {
    alert("Este infante no tiene ficha.");
    console.log(error);
  });
  }
  function RecibirInforme(){
    fetch('/informe/ver_informe', {
      method: "POST",
      headers: {
      Accept: 'application/pdf',
      "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id_informe: id
      })
    })
    .then(res => res.blob())
    .then(response => {
      //Create a Blob from the PDF Stream
      console.log(response);
      const file = new Blob([response], {
        type: "application/pdf"
      });

      if(response.size == 9){
        alert("Debe guardar el informe")
      }else{
      //Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
      window.open(fileURL);
      }
    })
    .catch(error => {
      alert("Error en la conexión");
    });
  }
  function RecibirInformeid(id){
    fetch('/informe/ver_informe', {
      method: "POST",
      headers: {
      Accept: 'application/pdf',
      "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id_informe: id
      })
    })
    .then(res => res.blob())
    .then(response => {
      //Create a Blob from the PDF Stream
      console.log(response);
      const file = new Blob([response], {
        type: "application/pdf"
      });
      //Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
      window.open(fileURL);
    })
    .catch(error => {
      console.log(error);
    });
  }
  function Texto({rut}){
    setRutInfante(rut)
    return(
        <p>¿Esta seguro que desea eliminar este usuario?</p>
    )
  }
  function Texto2({id}){
    setID(id)
    return(
        <p>¿Esta seguro que desea eliminar esta evaluación?</p>
    )
  }
  function Boton1({rut}){
    return(
      <>
      <SuiButton buttonColor="info" iconOnly onClick = { async() => Colocao(rut)}>
        <Icon classsName="material-icons-round">visibility</Icon>
      </SuiButton>
      </> 
    );
  }
  function Boton2({rut}){
    return(
      <>
      <SuiButton buttonColor="info" iconOnly
        onClick={async () => {
          const result = await Confirm(<Texto rut={rut}/>, 
            'Confirmación de eliminación '+rut.toString());
          
          if (result) {
            EliminarInfante(rut)
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
  function EliminarInfante(rut){
    rut_infante = rut;
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
        alert("Eliminado correctamente");
        setListo(0);
      }
      else{
        alert("Error en la conexión")
        console.log(response.status)
      }
    })
  }
  function VisualizarDatos_Aux(rut_infante){
    let bolean = true;
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
        if(res.status === 404) {
          bolean = false;
          alert("Error en la conexión")
      }
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

      });
      if (bolean == true){
        fetch('/infante/ver_informes/'+rut_infante.toString(),{
          method:'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        })
        .then(res => {
          if(res.status === 404) {
            bolean = false;
            alert("Error en la conexión")
        }
            return res.json()
        })
        .then(users => {
          for(let i=0; i < users.length;i++){
            let aux = true;
            for(let e=0;e < rows2.length;e++){
              if(users[i].id == rows2[e].id){
                aux=false;
              }
            }
            if(aux == true){
              console.log(users[i])
              let date = users[i].fecha;
              date = date.toString();
              date = date.slice(0,9);
              rows2.push({id: users[i].id,
                fecha: date,
                visualizar: <Boton3 id = {users[i].id}/>,
              })
            }
          }
          
        });
      }
    }
    if(bolean == true){
      setListo(3);
    }
  }
  function VisualizarDatos(rut_infante){
    let bolean = true;
      while(rows.length > 0) {
        rows.pop();
      }
      while(rows2.length > 0) {
        rows2.pop();
      }
      fetch('/infante/ver_infante/'+rut_infante.toString(),{
          method:'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
      })
      .then(res => {
        if(res.status === 404) {
          bolean = false;
          alert("Error en la conexión")
      }
          return res.json()
      })
      .then(users => {

          let date = users.fecha_nacimiento;
          date = date.toString();
          date = date.slice(0,10);
          setNameChild(users.nombre)
          setDate(date)
          setRutApoderado(users.rut_apoderado)
          setNameFather(users.nombre_apoderado)
          setEmail(users.email)
          setPhone(users.telefono)

      });
      if (bolean == true){
        fetch('/infante/ver_informes/'+rut_infante.toString(),{
          method:'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        })
        .then(res => {
          if(res.status === 404) {
            bolean = false;
        }
            return res.json()
        })
        .then(users => {
          for(let i=0; i < users.length;i++){
            let aux = true;
            for(let e=0;e < rows2.length;e++){
              if(users[i].id == rows2[e].id){
                aux=false;
              }
            }
            if(aux == true){
              console.log(users[i])
              let date = users[i].fecha;
              date = date.toString();
              date = date.slice(0,10);
              rows2.push({id: users[i].id,
                fecha: date,
                visualizar: <Boton3 id = {users[i].id}/>,
                acciones: <AccionesInforme id={users[i].id}/>
              })
            }
          }
          console.log(users)
        });
      }
    
    if(bolean == true){
      getInfo2()
    }
  }
  function Formulario(){
    return(
      <>
      <h3>Datos del Usuario</h3>
      <Grid container spacing={0}display="row">

        <Grid item xs={6}>
        <label>RUT Usuario: </label>

        </Grid>
        
        <Grid item xs={6}>
          <TextField
          variant="outlined"
          type="text"
          name="rut_infante"
          helperText="Sin puntos y con guión."
          onChange={(e) => {
            rut_infante = e.target.value;
          }}/>
        </Grid>
        
        <Grid item xs={6}>
        <label>Nombre Usuario: </label>
        </Grid>
        
        <Grid item xs={6}>
          <TextField
          variant="outlined"
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
          <TextField
                      variant="outlined"
            type="date"
            name="fecha_nacimiento"
            display="flex"
            onChange={(e) => {
              fecha_nacimiento = e.target.value;
            }}
          />
        </Grid>
</Grid>
<br />
<h3>Datos del Apoderado</h3>
        <Grid container spacing={0}display="row">

        <Grid item xs={6}>
        <label>Nombre Apoderado: </label>
        </Grid>
        
        <Grid item xs={6}>
          <TextField
          variant="outlined"
            type="text"
            name="nombre_a"
            display="flex"
            onChange={(e) => {
              nombre_a = e.target.value;
            }}
          />
        </Grid>

        <Grid item xs={6}>
        <label>RUT Apoderado: </label>
        </Grid>
        
        <Grid item xs={6}>
          <TextField
          variant="outlined"
            type="text"
            name="rut_apoderado"
            helperText = "Sin puntos y con guión"
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
          <TextField
          variant="outlined"
            type="text"
            name="telefono"
            display="flex"
            defaultValue = "569"
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
        Agregar Usuario
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
           alert("Agregado correctamente")
            
        }else if(response.status === 404){
          alert("Error en la conexión")
        }else if(response.status === 405){
          alert("Datos ingresados inválidos")
        }else if (response.status === 406){
          alert("Usuario ya existe")
        }
        setListo(0);
    })
  }
  function ActualizarInfantes_Aux(){
    fetch('/infante/ver_infantes')
    .then(res => {
      if(res.status == 404){
        alert("Error en la conexión")
      }
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
            visualizar: <Boton1 rut={users[i].rut}/>
          })
        }
      }
      setListo(2);
    });
  }
  function ActualizarInfantes(){
    if(info == null){
      hist.push('/authentication/sign-in');
    }

    if (Listo == 0){
          while(rows.length > 0) {
            rows.pop();
          }

         
              fetch('/infante/ver_infantes')
                .then(res => {
                  if(res.status == 404){
                    alert("Error en la conexión")
                  }
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
                    fecha_nacimiento = fecha_nacimiento.slice(0,10);
                    if(aux == true){
                      rows.push({nombre:users[i].nombre,
                        rut: users[i].rut,
                        fecha_nacimiento: fecha_nacimiento,
                        nombre_apoderado: users[i].nombre_apoderado,
                        telefono_apoderado: users[i].telefono,
                        visualizar: <Boton1 rut={users[i].rut}/>,
                        eliminar: <Boton2 rut={users[i].rut}/>
                      })
                    }
                  }
                  
                  setListo(1);
                });
     
       
      }
  }
  function Formulario2({r_i, n_i, f_n, r_a, n_a, t, e}){
    rut_infante = r_i;
    nombre_infante= n_i;
    fecha_nacimiento =  f_n;

    rut_apoderado = r_a;
    nombre_a = n_a;
    telefono = t;
    email = e;
  
    return(
      <>
      <h3>Datos del infante</h3>
      <Grid container spacing={3} display="row">

      <Grid item xs={6}>
        <label>RUT:</label>
      </Grid>
      <Grid item xs={6}>
          {rut_infante}
      </Grid>


      <Grid item xs={6}>
        <label>Nombre del usuario: </label>
        </Grid>
        
        <Grid item xs={6}>
          <TextField
          variant="outlined"
            type="text"
            name="nombre_infante"
            defaultValue={nombre_infante}
            display="flex"
            onChange={(e) => {
              nombre_infante = e.target.value;
            }}
          />
        </Grid>

        <Grid item xs={6}>
        <label>Fecha de nacimiento: </label>
        </Grid>
        
        <Grid item xs={6}>
            {fecha_nacimiento}
        </Grid>
        

        <Grid item xs={6}>
        <h3>Datos del apoderado</h3>        
        </Grid>
        <Grid item xs={6}></Grid>


        <Grid item xs={6}>
        <label>RUT del apoderado: </label>
        </Grid>
        
        <Grid item xs={6}>
            {rut_apoderado}
        </Grid>

        <Grid item xs={6}>
        <label>Nombre del apoderado: </label>
        </Grid>
        
        <Grid item xs={6}>
          <TextField
          variant="outlined"
            type="text"
            name="nombre_a"
            defaultValue={nombre_a}
            display="flex"
            onChange={(e) => {
              nombre_a = e.target.value;
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
        

      </Grid>
      </>
    )
  }
  function EnviarInforme(){
    fetch('/informe/guardar_informe',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rut_infante: RutInfante,
        contenido: value,
        id_informe: id
      })
    })
    .then((response) => {
      if(response.status == 405){
        alert("El informe debe tener algún contenido")
      }else if(response.status !== 404){
        alert("Informe guardado")
        return response.json()
      }else{
        alert("Error en la conexión.")
      }
    })
    .then(users => {
      setID(users.id_informe);
    })
    .catch((error) => {
      console.log(error)
    });
  }
  function EditarInfante(rut_infante) {
    let rut = rut_infante
    fetch('/infante/editar_infante/'+rut.toString(), {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({

      nombre: nombre_infante,
      rut_apoderado: rut_apoderado,
      nombre_apoderado: nombre_a,
      telefono: telefono,
      email: email,

    })
    })
    .then( (response) => {
        if(response.status === 200) {

            alert("Editado correctamente")
            setListo(3)

        }else if(response.status === 404){
            alert("Error en la conexión")
        } 
        
        else if(response.status === 405){
            alert("Datos ingresados inválidos")
        }
    })
    .catch((error) => {
        console.log(error)
    });
  }
  function EliminarEvaluacion(id) {
    fetch('/informe/eliminar_informe/', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id_informe: id,
    })
    })
    .then( (response) => {
        if(response.status == 200) {
            alert("Eliminado correctamente");
            window.location.href = window.location.href;
        } else {
            alert('Error en la conexión')
        }
    })
    .catch((error) => {
        console.log(error)
    });
  }
  function EditarEvaluacion(id){
    setID(id);
    fetch('/informe/editar_informe',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_informe: id
      })
    })
    .then((response) => {
      if(response.status !== 404){
        return response.json()
      }else{
        alert("Error en la conexión")
      }
    })
    .then(users => {
      setValue(users.contenido);
      setListo(12);
    })
    .catch((error) => {
      console.log(error)
    });
  }

  function Boton3({id}){
    return(
      <>
      <SuiButton buttonColor="info" iconOnly onClick = { async() => RecibirInformeid(id)}>
        <Icon classsName="material-icons-round">visibility</Icon>
      </SuiButton>
      </>
    );
  }

  function AccionesInforme({id}){
    return(
      <>
      <SuiButton buttonColor="info" iconOnly onClick = { async() => EditarEvaluacion(id)}>
        <Icon classsName="material-icons-round">edit</Icon>
      </SuiButton>

      <SuiButton buttonColor="info" iconOnly
        onClick={async () => {
          const result = await Confirm(<Texto2 id={id}/>, 
            'Confirmación de eliminación '+id.toString());
          
          if (result) {
            EliminarEvaluacion(id)
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

  if (Listo === 0){
          getInfo();
        return(
          <DashboardLayout>
            <DashboardNavbar/>
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

  else if(Listo === 1){
  return (
    <DashboardLayout>
      <DashboardNavbar/>
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
  }
  
  else if(Listo === 2){
    return (
      <DashboardLayout>
      <DashboardNavbar/>
        <SuiBox py={6}>
          <SuiBox mb={6}>
            <Card>

              <SuiBox customClass={classes.tables_table}>
                <Table columns={columns_aux} rows={rows} />
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

  else if (Listo === 3){

      VisualizarDatos(RutInfante)
    
    return(
        <DashboardLayout>
          <DashboardNavbar/>
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

  else if (Listo === 4){
    return(
    <DashboardLayout>
      <DashboardNavbar/>
    <SuiBox py={6}>
      <SuiBox mb={6}>
      <Tabs value={tabValue} onChange={handleSetTabValue}>
        <Tab label="Datos" {...a11yProps(0)}/>
        <Tab label="Fichas Técnicas" {...a11yProps(1)}/>
        <Tab label="Informes de Evaluaciones" {...a11yProps(2)}/>
      </Tabs>
      <SuiButton  buttonColor="info" iconOnly onClick = {async() => {setListo(0); setTabValue(0)}}>
        <Icon classsName="material-icons-round">keyboard_backspace</Icon>
        </SuiButton>
        <Card>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ width: '100%' }}>
            <h3>Datos personales del usuario</h3>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <Item>RUT del usuario: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{RutInfante}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Nombre del usuario: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{NameChild}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Fecha de nacimiento: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{Date}</Item>
                </Grid>
              </Grid>
              <h3>Datos personales del apoderado</h3>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <Item>RUT del apoderado: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{RutApoderado}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Nombre del apoderado: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{NameFather}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Email: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{Email}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Telefóno: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{Phone}</Item>
                </Grid>
            </Grid>
          </Box>
          <SuiButton buttonColor="info" 
          onClick={async () => {
            const result = await Confirm(<Formulario2 r_i={RutInfante} n_i={NameChild} f_n={Date} r_a={RutApoderado} n_a ={NameFather} t={Phone} e={Email}   />, 
              'Edición infante '+RutInfante.toString());
            if (result) {
              EditarInfante(RutInfante);
            } else {
              // Сonfirmation not confirmed
            }
          }}
          >
            Editar usuario
            <Icon classsName="material-icons-round">edit</Icon>
          </SuiButton>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <center>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
            <SuiTypography variant="h3" textColor="text" display="flex" fontWeight="medium">
              Subir una ficha medica
              <br/>
            </SuiTypography>
            <SuiInput type="file" name="file" id ="file" onChange={changeHandler} />
            <SuiButton onClick={handleSubmission} buttonColor = "secondary">
              Subir
            <Icon classsName="material-icons-round">file_upload</Icon>
            </SuiButton>
            </Grid>
            <Grid item xs={12} lg={5}>
            <SuiTypography variant="h3" textColor="text" display="flex" fontWeight="medium">
              Visualizar ficha medica existente
              <br/>
            </SuiTypography>
            <SuiButton variant="gradient" buttonColor="info"  onClick={RecibirFicha}    >
              Visualizar
            </SuiButton>
            </Grid>
          </Grid>
          </center>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <SuiBox>
            <SuiButton onClick={async() => {setListo(12)
            setValue('')
            setID(0)}}>
              <Icon classsName="material-icons-round">
                add
              </Icon>
              Agregar Evaluación
            </SuiButton>
          </SuiBox>
          <SuiBox customClass={classes.tables_table}>
            <Table columns={columns2} rows={rows2} />
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

  else if (Listo === 5){
    return(
    <DashboardLayout>
      <DashboardNavbar/>
    <SuiBox py={6}>
      <SuiBox mb={6}>
      <Tabs value={tabValue} onChange={handleSetTabValue}>
        <Tab label="Datos" {...a11yProps(0)}/>
        <Tab label="Fichas Técnicas" {...a11yProps(1)}/>
        <Tab label="Informes de Evaluaciones" {...a11yProps(2)}/>
      </Tabs>
      <SuiButton  buttonColor="info" iconOnly onClick = {async() => {setListo(0); setTabValue(0)}}>
        <Icon classsName="material-icons-round">keyboard_backspace</Icon>
        </SuiButton>
        <Card>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ width: '100%' }}>
            <h3>Datos personales del usuario</h3>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <Item>RUT del usuario: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{RutInfante}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Nombre del usuario: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{NameChild}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Fecha de nacimiento: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{Date}</Item>
                </Grid>
              </Grid>
              <h3>Datos personales del apoderado</h3>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <Item>RUT del apoderado: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{RutApoderado}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Nombre del apoderado: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{NameFather}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Email: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{Email}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Telefóno: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{Phone}</Item>
                </Grid>
            </Grid>
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <center>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
            <SuiTypography variant="h3" textColor="text" display="flex" fontWeight="medium">
              Subir una ficha medica
              <br/>
            </SuiTypography>
            <SuiInput type="file" name="file" id ="file" onChange={changeHandler} />
            <SuiButton onClick={handleSubmission} buttonColor = "secondary">
              Subir
            <Icon classsName="material-icons-round">file_upload</Icon>
            </SuiButton>
            </Grid>
            <Grid item xs={12} lg={5}>
            <SuiTypography variant="h3" textColor="text" display="flex" fontWeight="medium">
              Visualizar ficha medica existente
              <br/>
            </SuiTypography>
            <SuiButton variant="gradient" buttonColor="info"  onClick={RecibirFicha}    >
              Visualizar
            </SuiButton>
            </Grid>
          </Grid>
          </center>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <SuiBox>
            <SuiButton onClick={async() => {setListo(12)
            setValue('')
            setID(0)}}>
              <Icon classsName="material-icons-round">
                add
              </Icon>
              Agregar Evaluación
            </SuiButton>
          </SuiBox>
          <SuiBox customClass={classes.tables_table}>
            <Table columns={columns2} rows={rows2} />
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

  else if (Listo === 6){
    return(
    <DashboardLayout>
      <DashboardNavbar/>
    <SuiBox py={6}>
      <SuiBox mb={6}>
      <Tabs value={tabValue} onChange={handleSetTabValue}>
        <Tab label="Datos" {...a11yProps(0)}/>
        <Tab label="Fichas Técnicas" {...a11yProps(1)}/>
        <Tab label="Informes de Evaluaciones" {...a11yProps(2)}/>
      </Tabs>
      <SuiButton  buttonColor="info" iconOnly onClick = {async() => {setListo(0);setTabValue(0)}}>
        <Icon classsName="material-icons-round">keyboard_backspace</Icon>
        </SuiButton>
        <Card>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ width: '100%' }}>
            <h3>Datos personales del usuario</h3>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <Item>RUT del usuario: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{RutInfante}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Nombre del usuario: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{NameChild}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Fecha de nacimiento: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{Date}</Item>
                </Grid>
              </Grid>
              <h3>Datos personales del apoderado</h3>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <Item>RUT del apoderado: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{RutApoderado}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Nombre del apoderado: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{NameFather}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Email: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{Email}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Telefóno: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{Phone}</Item>
                </Grid>
            </Grid>
          </Box>

        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <center>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
            <SuiTypography variant="h3" textColor="text" display="flex" fontWeight="medium">
              Subir una ficha medica
              <br/>
            </SuiTypography>
            <SuiInput type="file" name="file" id ="file" onChange={changeHandler} />
            <SuiButton onClick={handleSubmission} buttonColor = "secondary">
              Subir
            <Icon classsName="material-icons-round">file_upload</Icon>
            </SuiButton>
            </Grid>
            <Grid item xs={12} lg={5}>
            <SuiTypography variant="h3" textColor="text" display="flex" fontWeight="medium">
              Visualizar ficha medica existente
              <br/>
            </SuiTypography>
            <SuiButton variant="gradient" buttonColor="info"  onClick={RecibirFicha}    >
              Visualizar
            </SuiButton>
            </Grid>
          </Grid>
          </center>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>

          <SuiBox customClass={classes.tables_table}>
            <Table columns={columns2_aux} rows={rows2} />
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

  else if (Listo === 7){
    return(
    <DashboardLayout>
      <DashboardNavbar/>
    <SuiBox py={6}>
      <SuiBox mb={6}>
      <Tabs value={tabValue} onChange={handleSetTabValue}>
        <Tab label="Datos" {...a11yProps(0)}/>
        <Tab label="Fichas Técnicas" {...a11yProps(1)}/>
        <Tab label="Informes de Evaluaciones" {...a11yProps(2)}/>
      </Tabs>
      <SuiButton  buttonColor="info" iconOnly onClick = {async() => {setListo(0);setTabValue(0)}}>
        <Icon classsName="material-icons-round">keyboard_backspace</Icon>
        </SuiButton>
        <Card>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ width: '100%' }}>
            <h3>Datos personales del usuario</h3>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <Item>RUT del usuario: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{RutInfante}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Nombre del usuario: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{NameChild}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Fecha de nacimiento: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{Date}</Item>
                </Grid>
              </Grid>
              <h3>Datos personales del apoderado</h3>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <Item>RUT del apoderado: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{RutApoderado}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Nombre del apoderado: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{NameFather}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Email: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{Email}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Telefóno: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{Phone}</Item>
                </Grid>
            </Grid>
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <center>
            <SuiTypography variant="h3" textColor="text" display="flex" fontWeight="medium">
              Visualizar ficha medica existente
              <br/>
            </SuiTypography>
            <SuiButton variant="gradient" buttonColor="info"  onClick={RecibirFicha}    >
              Visualizar
            </SuiButton>
          </center>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <SuiBox>
            <SuiButton onClick={async() => {setListo(12)
            setValue('')
            setID(0)}}>
              <Icon classsName="material-icons-round">
                add
              </Icon>
              Agregar Evaluación
            </SuiButton>
          </SuiBox>
          <SuiBox customClass={classes.tables_table}>
            <Table columns={columns2} rows={rows2} />
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

  else if (Listo === 8){
    return(
    <DashboardLayout>
      <DashboardNavbar/>
    <SuiBox py={6}>
      <SuiBox mb={6}>
      <Tabs value={tabValue} onChange={handleSetTabValue}>
        <Tab label="Datos" {...a11yProps(0)}/>
        <Tab label="Fichas Técnicas" {...a11yProps(1)}/>
        <Tab label="Informes de Evaluaciones" {...a11yProps(2)}/>
      </Tabs>
      <SuiButton  buttonColor="info" iconOnly onClick = {async() => {setListo(0);setTabValue(0)}}>
        <Icon classsName="material-icons-round">keyboard_backspace</Icon>
        </SuiButton>
        <Card>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ width: '100%' }}>
            <h3>Datos personales del usuario</h3>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <Item>RUT del usuario: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{RutInfante}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Nombre del usuario: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{NameChild}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Fecha de nacimiento: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{Date}</Item>
                </Grid>
              </Grid>
              <h3>Datos personales del apoderado</h3>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <Item>RUT del apoderado: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{RutApoderado}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Nombre del apoderado: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{NameFather}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Email: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{Email}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Telefóno: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{Phone}</Item>
                </Grid>
            </Grid>
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <center>
            <SuiTypography variant="h3" textColor="text" display="flex" fontWeight="medium">
              Visualizar ficha medica existente
              <br/>
            </SuiTypography>
            <SuiButton variant="gradient" buttonColor="info"  onClick={RecibirFicha}    >
              Visualizar
            </SuiButton>
          </center>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <SuiBox>

          </SuiBox>
          <SuiBox customClass={classes.tables_table}>
            <Table columns={columns2_aux} rows={rows2} />
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

  else if (Listo === 9){
    return(
    <DashboardLayout>
      <DashboardNavbar/>
    <SuiBox py={6}>
      <SuiBox mb={6}>
      <Tabs value={tabValue} onChange={handleSetTabValue}>
        <Tab label="Datos" {...a11yProps(0)}/>
        <Tab label="Fichas Técnicas" {...a11yProps(1)}/>
        <Tab label="Informes de Evaluaciones" {...a11yProps(2)}/>
      </Tabs>
      <SuiButton  buttonColor="info" iconOnly onClick = {async() => {setListo(0);setTabValue(0)}}>
        <Icon classsName="material-icons-round">keyboard_backspace</Icon>
        </SuiButton>
        <Card>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ width: '100%' }}>
            <h3>Datos personales del usuario</h3>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <Item>RUT del usuario: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{RutInfante}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Nombre del usuario: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{NameChild}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Fecha de nacimiento: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{Date}</Item>
                </Grid>
              </Grid>
              <h3>Datos personales del apoderado</h3>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <Item>RUT del apoderado: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{RutApoderado}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Nombre del apoderado: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{NameFather}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Email: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{Email}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Telefóno: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{Phone}</Item>
                </Grid>
            </Grid>
          </Box>

          <SuiButton buttonColor="info" 
          onClick={async () => {
            const result = await Confirm(<Formulario2 r_i={RutInfante} n_i={NameChild} f_n={Date} r_a={RutApoderado} n_a ={NameFather} t={Phone} e={Email}   />, 
              'Edición infante '+RutInfante.toString());
            if (result) {
              EditarInfante(RutInfante);
            } else {
              // Сonfirmation not confirmed
            }
          }}
          >
            Editar usuario
            <Icon classsName="material-icons-round">edit</Icon>
          </SuiButton>

        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <center>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
            <SuiTypography variant="h3" textColor="text" display="flex" fontWeight="medium">
              Subir una ficha medica
              <br/>
            </SuiTypography>
            <SuiInput type="file" name="file" id ="file" onChange={changeHandler} />
            <SuiButton onClick={handleSubmission} buttonColor = "secondary">
              Subir
            <Icon classsName="material-icons-round">file_upload</Icon>
            </SuiButton>
            </Grid>
            <Grid item xs={12} lg={5}>
            <SuiTypography variant="h3" textColor="text" display="flex" fontWeight="medium">
              Visualizar ficha medica existente
              <br/>
            </SuiTypography>
            <SuiButton variant="gradient" buttonColor="info"  onClick={RecibirFicha}    >
              Visualizar
            </SuiButton>
            </Grid>
          </Grid>
          </center>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>

          <SuiBox customClass={classes.tables_table}>
            <Table columns={columns2_aux} rows={rows2} />
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

  else if (Listo === 11){
    return(
    <DashboardLayout>
      <DashboardNavbar/>
    <SuiBox py={6}>
      <SuiBox mb={6}>
      <Tabs value={tabValue} onChange={handleSetTabValue}>
        <Tab label="Datos" {...a11yProps(0)}/>
        <Tab label="Fichas Técnicas" {...a11yProps(1)}/>
        <Tab label="Informes de Evaluaciones" {...a11yProps(2)}/>
      </Tabs>
      <SuiButton  buttonColor="info" iconOnly onClick = {async() => {setListo(0);setTabValue(0);}}>
        <Icon classsName="material-icons-round">keyboard_backspace</Icon>
        </SuiButton>
        <Card>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ width: '100%' }}>
            <h3>Datos personales del usuario</h3>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <Item>RUT del usuario: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{RutInfante}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Nombre del usuario: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{NameChild}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Fecha de nacimiento: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{Date}</Item>
                </Grid>
              </Grid>
              <h3>Datos personales del apoderado</h3>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <Item>RUT del apoderado: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{RutApoderado}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Nombre del apoderado: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{NameFather}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Email: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{Email}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Telefóno: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{Phone}</Item>
                </Grid>
            </Grid>
          </Box>

          <SuiButton buttonColor="info" 
          onClick={async () => {
            const result = await Confirm(<Formulario2 r_i={RutInfante} n_i={NameChild} f_n={Date} r_a={RutApoderado} n_a ={NameFather} t={Phone} e={Email}   />, 
              'Edición infante '+RutInfante.toString());
            if (result) {
              EditarInfante(RutInfante);
            } else {
              // Сonfirmation not confirmed
            }
          }}
          >
            Editar usuario
            <Icon classsName="material-icons-round">edit</Icon>
          </SuiButton>

        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <center>
            <SuiTypography variant="h3" textColor="text" display="flex" fontWeight="medium">
              Visualizar ficha medica existente
              <br/>
            </SuiTypography>
            <SuiButton variant="gradient" buttonColor="info"  onClick={RecibirFicha}    >
              Visualizar
            </SuiButton>
          </center>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>


          <SuiBox customClass={classes.tables_table}>
            <Table columns={columns2_aux} rows={rows2} />
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

  else if (Listo === 10){
    return(
    <DashboardLayout>
      <DashboardNavbar/>
    <SuiBox py={6}>
      <SuiBox mb={6}>
      <Tabs value={tabValue} onChange={handleSetTabValue}>
        <Tab label="Datos" {...a11yProps(0)}/>
        <Tab label="Fichas Técnicas" {...a11yProps(1)}/>
        <Tab label="Informes de Evaluaciones" {...a11yProps(2)}/>
      </Tabs>
      <SuiButton  buttonColor="info" iconOnly onClick = {async() => {setListo(0);setTabValue(0)}}>
        <Icon classsName="material-icons-round">keyboard_backspace</Icon>
        </SuiButton>
        <Card>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ width: '100%' }}>
            <h3>Datos personales del usuario</h3>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <Item>RUT del usuario: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{RutInfante}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Nombre del usuario: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{NameChild}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Fecha de nacimiento: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{Date}</Item>
                </Grid>
              </Grid>
              <h3>Datos personales del apoderado</h3>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <Item>RUT del apoderado: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{RutApoderado}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Nombre del apoderado: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{NameFather}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Email: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{Email}</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>Telefóno: </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{Phone}</Item>
                </Grid>
            </Grid>
          </Box>

          <SuiButton buttonColor="info" 
          onClick={async () => {
            const result = await Confirm(<Formulario2 r_i={RutInfante} n_i={NameChild} f_n={Date} r_a={RutApoderado} n_a ={NameFather} t={Phone} e={Email}   />, 
              'Edición infante '+RutInfante.toString());
            if (result) {
              EditarInfante(RutInfante);
            } else {
              // Сonfirmation not confirmed
            }
          }}
          >
            Editar usuario
            <Icon classsName="material-icons-round">edit</Icon>
          </SuiButton>

        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <center>
            <SuiTypography variant="h3" textColor="text" display="flex" fontWeight="medium">
              Visualizar ficha medica existente
              <br/>
            </SuiTypography>
            <SuiButton variant="gradient" buttonColor="info"  onClick={RecibirFicha}    >
              Visualizar
            </SuiButton>
          </center>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <SuiBox>
            <SuiButton onClick={async() => {setListo(12)
            setValue('')
            setID(0)}}>
              <Icon classsName="material-icons-round">
                add
              </Icon>
              Agregar Evaluación
            </SuiButton>
          </SuiBox>
          <SuiBox customClass={classes.tables_table}>
            <Table columns={columns2} rows={rows2} />
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

  else if(Listo === 12){
    return(
      <DashboardLayout>
        <DashboardNavbar/>
      <SuiBox py={6}>
        <SuiBox mb={6}>
        <Tabs value={tabValue} onChange={handleSetTabValue}>
          <Tab label="Datos" {...a11yProps(0)}/>
          <Tab label="Fichas Técnicas" {...a11yProps(1)}/>
          <Tab label="Informes de Evaluaciones" {...a11yProps(2)}/>
        </Tabs>
        <SuiButton  buttonColor="info" iconOnly onClick = {async() => {setListo(0);setTabValue(0)}}>
          <Icon classsName="material-icons-round">keyboard_backspace</Icon>
          </SuiButton>
          <Card>
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ width: '100%' }}>
              <h3>Datos personales del usuario</h3>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={6}>
                    <Item>RUT del usuario: </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>{RutInfante}</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>Nombre del usuario: </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>{NameChild}</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>Fecha de nacimiento: </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>{Date}</Item>
                  </Grid>
                </Grid>
                <h3>Datos personales del apoderado</h3>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={6}>
                    <Item>RUT del apoderado: </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>{RutApoderado}</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>Nombre del apoderado: </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>{NameFather}</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>Email: </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>{Email}</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>Telefóno: </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>{Phone}</Item>
                  </Grid>
              </Grid>
            </Box>
            <SuiButton buttonColor="info" 
            onClick={async () => {
              const result = await Confirm(<Formulario2 r_i={RutInfante} n_i={NameChild} f_n={Date} r_a={RutApoderado} n_a ={NameFather} t={Phone} e={Email}   />, 
                'Edición infante '+RutInfante.toString());
              if (result) {
                EditarInfante(RutInfante);
              } else {
                // Сonfirmation not confirmed
              }
            }}
            >
              Editar usuario
              <Icon classsName="material-icons-round">edit</Icon>
            </SuiButton>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
          <center>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
            <SuiTypography variant="h3" textColor="text" display="flex" fontWeight="medium">
              Subir una ficha medica
              <br/>
            </SuiTypography>
            <SuiInput type="file" name="file" id ="file" onChange={changeHandler} />
            <SuiButton onClick={handleSubmission} buttonColor = "secondary">
              Subir
            <Icon classsName="material-icons-round">file_upload</Icon>
            </SuiButton>
            </Grid>
            <Grid item xs={12} lg={5}>
            <SuiTypography variant="h3" textColor="text" display="flex" fontWeight="medium">
              Visualizar ficha medica existente
              <br/>
            </SuiTypography>
            <SuiButton variant="gradient" buttonColor="info"  onClick={RecibirFicha}    >
              Visualizar
            </SuiButton>
            </Grid>
          </Grid>
          </center>
        </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <Editor
              value={value}
              onInit={(evt, editor) => {
                setText(editor.getContent({format: 'text'}));
              }}
              onEditorChange={(newValue, editor) => {
                setValue(newValue);
                setText(editor.getContent({format: 'text'}));
              }}
              init={{
                height: 500,
                menubar: true,
                selector: 'textarea#default',
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
            />
            <SuiBox mb={2}>
            <SuiBox mb={1} ml={0.5}>  
                <SuiButton variant="gradient" buttonColor="info" fullWidth onClick={EnviarInforme} mb={2}>
                Guardar
                </SuiButton>
            </SuiBox>
            </SuiBox>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiButton variant="gradient" buttonColor="info" fullWidth onClick={RecibirInforme} mb={2}>
                Visualizar
              </SuiButton>
            </SuiBox>
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
}