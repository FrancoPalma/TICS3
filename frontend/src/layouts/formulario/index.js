import React, { useState, useRef, useEffect} from "react";
import { Editor } from '@tinymce/tinymce-react';



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
// Core viewer
import { Viewer } from '@react-pdf-viewer/core';
import { useHistory } from "react-router-dom";


// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';

//npm install react-draft-wysiwyg draft-js react react-dom
//npm install pdfjs-dist@2.6.347
//npm install @react-pdf-viewer/core@2.10.1
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
  const hist = useHistory();
  const [Listo,setListo] = useState(0);
  const [value, setValue] = useState('');
  const [text, setText] = useState('');

  const editor = useRef(null);
  const [contenido, setContent] = useState("");
  const [id, setID] = useState(0);
  const [rows] = useState([]);
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

  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

  function ActualizarInfantes(){
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
                telefono_apoderado: users[i].telefono
              })
              
              console.log(rows[0].telefono);
            }
          }
          setListo(1);
        });
  }

  function EnviarInforme(){
    fetch('/informe/guardar_informe',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rut_infante: "12345678-9",
        contenido: value,
        id_informe: id
      })
    })
    .then((response) => {
      if(response.status !== 404){
        console.log("ok")
        return response.json()
      }else{
        console.log("error")
      }
    })
    .then(users => {
      setID(users.id_informe);
    })
    .catch((error) => {
      console.log(error)
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
    //Build a URL from the file
    const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
    window.open(fileURL);
  })
  .catch(error => {
    console.log(error);
  });
  }

  

  if (Listo == 1){
    return(
      <DashboardLayout>
      <DashboardNavbar/>
      <SuiBox py={1}>
      </SuiBox>
      <SuiBox py={1}>
        <SuiBox mb={1}>
          <Card>
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
          </Card>
      </SuiBox>
        </SuiBox>
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
          
      
      <Footer/>
      </DashboardLayout>
    );
    }else{
      ActualizarInfantes();
      return(
        <DashboardLayout>
        <DashboardNavbar/>
        <SuiBox py={6}>
          <SuiBox mb={6}>
            <Card>
              <h1>Cargando</h1>
            </Card>
          </SuiBox>
        </SuiBox>
        <Footer/>
        </DashboardLayout>
      );
    }
}


  
                    

  export default Formulario;