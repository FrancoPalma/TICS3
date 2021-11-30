import { useState } from "react";
import ReactDOM from 'react-dom';
// react-router-dom components
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
// @material-ui core components
import Alert from '@mui/material/Alert';
import Grid from "@material-ui/core/Grid";
// Soft UI Dashboard Material-UI components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
// Images
import curved9 from "assets/images/curved-images/curved14.jpg";

export default function SignIn() {
  const hist = useHistory();
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [isAutentificado, setsetisAutentificado] = useState(false);
  const [EstadoRut,setEstadoRut] = useState(false)
  function handleChangeInput(valor) {
    //destructurin de los valores enviados por el metodo onchange de cada input
    const value  = valor;
    let regex = new RegExp("^[0-9 k]+$");
    
    if (regex.test(value) && value.length <10 && value.length >= 7 && (value.indexOf('k') === -1 || value.indexOf('k') === 8 || value.indexOf('k') === 9)) {
      setRut(value)
      setEstadoRut(true)
    } else if(value.length <10 && regex.test(value)){
      setRut(value)
    }else if(value.length <10){
      setRut(value)
    }
  }
  
  function EnviarDatos(){
    if(EstadoRut === true){
      fetch('/sesion/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rut: rut,
        password: password,
      })
      })
      .then( (response) => {
        if(response.status !== 404) {
          setsetisAutentificado(true)
          return response.json()
        } else {
          console.log('FALLO EL INGRESO');
          setsetisAutentificado(false)
          alert("Rut o contraseña inválido");
        }
      })
      .then(users => {
        localStorage.setItem('usuario', JSON.stringify(users));
        if(isAutentificado === true) {
          localStorage.setItem('usuario', JSON.stringify(users));
          console.log("LOGEADO")
          console.log(users)
          hist.push('/dashboard')
        }
      })
      .catch((error) => {
        console.log(error)
      });
    }else{
        Alert()
        alert("Rut o contraseña inválido");
    }
  }
  function GO(){
    hist.push('/dashboard')
  }
  function Alert(){
    return(        
      <>
      <Grid container spacing={3}display="row">
        <Grid item xs={6}>
          <Alert severity="error">This is an error alert — check it out!</Alert>
        </Grid>
      </Grid>
      </>
      
      );
  }
  if(isAutentificado){

    return (
      <CoverLayout
        title="Bienvenido"
        description="Ingresa tu Rut y contraseña"
        image={curved9}
      >
        <SuiBox component="form" role="form">
          <SuiBox mb={2}>
            <SuiBox mb={1} ml={0.5}>
              <SuiTypography component="label" variant="caption" fontWeight="bold">
                <h3>RUT</h3>
              </SuiTypography>
            </SuiBox>
            <SuiInput type="text" placeholder="RUT" onChange={(event) => handleChangeInput(event.target.value)}
              /><h5>Sin puntos ni dígito verificador</h5>
                  
          </SuiBox>
          <SuiBox mb={2}>
            <SuiBox mb={1} ml={0.5}>
              <SuiTypography component="label" variant="caption" fontWeight="bold">
              <h3>Contraseña</h3>
              </SuiTypography>
            </SuiBox>
            <SuiInput type="password" placeholder="Contraseña" onChange={(event) => setPassword(event.target.value)}/>
          </SuiBox>
          <SuiBox mt={4} mb={1}>
            <SuiButton variant="gradient" buttonColor="info" fullWidth onClick={EnviarDatos}>
              Ingresar
            </SuiButton>
          </SuiBox>
        </SuiBox>
      </CoverLayout>
    );
  }else{
    return (
      <CoverLayout
        title="Bienvenido"
        description="Ingresa tu Rut y contraseña"
        image={curved9}
      >
        <SuiBox component="form" role="form">
          <SuiBox mb={2}>
            <SuiBox mb={1} ml={0.5}>
              <SuiTypography component="label" variant="caption" fontWeight="bold">
                <h3>RUT</h3>
              </SuiTypography>
            </SuiBox>
            <SuiInput type="text" placeholder="RUT" onChange={(event) => handleChangeInput(event.target.value)}
              /><h5>Sin puntos ni dígito verificador</h5>
                  
          </SuiBox>
          <SuiBox mb={2}>
            <SuiBox mb={1} ml={0.5}>
              <SuiTypography component="label" variant="caption" fontWeight="bold">
              <h3>Contraseña</h3>
              </SuiTypography>
            </SuiBox>
            <SuiInput type="password" placeholder="Contraseña" onChange={(event) => setPassword(event.target.value)}/>
          </SuiBox>
          <SuiBox mt={4} mb={1}>
            <SuiButton variant="gradient" buttonColor="info" fullWidth onClick={EnviarDatos}>
              Ingresar
            </SuiButton>
          </SuiBox>
        </SuiBox>
      </CoverLayout>
    );
  }
}