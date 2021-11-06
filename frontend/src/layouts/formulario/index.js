import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import Card from "@material-ui/core/Card";
import SuiButton from "components/SuiButton";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Color from "@material-ui/core/colors"
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import styles from "layouts/tables/styles";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MaterialTable from 'material-table';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from "@material-ui/core/TextField";
import SuiInput from "components/SuiInput";
import { OutlinedInput } from "@material-ui/core";
//npm install react-draft-wysiwyg draft-js react react-dom
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
  const editor = useRef(null);
  const [contenido, setContent] = useState("Start writing");
  const config = {
    readonly: false,
    height: 400,
    "uploader": {
      "insertImageAsBase64URI": true
    },
    "language": "es",
    "maxHeight": 1000
  };
  
  let info = JSON.parse(localStorage.getItem('usuario'));
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  function EnviarInforme(){
    fetch('/informe/guardar_informe',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rut: "0",
        contenido: contenido
      })

    })
    .then((response) => {
      if(response.status !== 404){
        console.log("chupame el pico")
        return response.json()
      }else{
        console.log("holi")
      }
    })
  }

    return(
      <DashboardLayout>
      <DashboardNavbar/>
      <SuiBox py={6}>
        <SuiBox mb={6}>
          <Card>
              <JoditEditor
                ref={editor}
                value={contenido}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => {}}
              />
              <p></p>
              <SuiBox>
                <SuiButton variant="gradient" buttonColor="info" fullWidth onClick={EnviarInforme}>
                Enviar
                </SuiButton>
              </SuiBox>
          </Card>
        </SuiBox>
      </SuiBox>
      <Footer/>
      </DashboardLayout>
);}


  
                    

  export default Formulario;