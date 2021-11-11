import { useState } from "react";
import Card from "@material-ui/core/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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
  const columns = [
    { name: "nombre", align: "left" },
    { name: "rut", align: "left" },
    { name: "fecha_nacimiento", align: "center" },
    { name: "telefono_apoderado", align: "center" },
    { name: "acciones", align: "center" }
  ];
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');


  const [rows] = useState([]);
  const [rows2] = useState([]);

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


  const [Rut_infante,setRutinfante] = useState('');
  const [Nombre_infante,setNombreinfante] = useState('');
  const [Fecha_nacimiento, setFechanacimiento] = useState('');
  
  const [Nombre_apoderado,setNombreapoderado] = useState('');
  const [Rut_apoderado,setRutapoderado] = useState('');
  const [email,setEmail] = useState('');
  const [telefono,setTelefono] = useState('');
/*  
  let rut_infante;
  let nombre_infante;
  let fecha_nacimiento;
  let rut_apoderado;
  let nombre_apoderado; 
  let email;
  let telefono;*/

  let fecha_nacimiento;
  

  function DatosPersonales(rut_infante){


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
      return res.json()
    })
    .then(users => {
      rows2.push({nombre_infante: users.nombre})
      console.log(rows2[0].nombre_infante);
    })
  
  
  
    setListo(5);
  }

  function Colocao (rut){
    setListo(4);
    DatosPersonales(rut);
  
    console.log(rows2.length)
    if(rows2.length > 0){console.log(rows2[0])}    
    console.log(rows2)
    

  }

  function Boton2({rut}){
    return(
      <>
      <SuiButton buttonColor="info" iconOnly onClick = { async() => Colocao(rut)}>
            <Icon classsName="material-icons-round">visibility</Icon>
        </SuiButton>
      </>  
    )
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
                telefono_apoderado: users[i].telefono,
                acciones: <Boton2 rut={users[i].rut}/>
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
  else if (Listo === 0){
    if(Listo === 0){
    ActualizarInfantes();}

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
  else if (Listo === 4){
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
  else if (Listo === 5){


    return(
      <DashboardLayout>
        <DashboardNavbar />
        <SuiBox py={3}>
          <SuiBox mb={3}>


            <Card>
            <SuiBox customClass={classes.tables_table}>
              <Table columns={columns} rows={rows} />
            </SuiBox>
            <SuiBox>

            </SuiBox>
            
            </Card>

      
          </SuiBox>


        </SuiBox>
        <Footer />
      </DashboardLayout>
    );
  }
  
}

