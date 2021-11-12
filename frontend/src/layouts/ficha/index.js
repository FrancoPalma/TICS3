import { useState } from "react";
import Card from "@material-ui/core/Card";

// Soft UI Dashboard Material-UI components
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import styles from "layouts/tables/styles";
// Soft UI Dashboard Material-UI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MaterialTable from 'material-table';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
//npm install axios --save

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

  function Ficha(){
    const classes = styles();
    const [tabValue, setTabValue] = useState(0);
    const handleSetTabValue = (event, newValue) => setTabValue(newValue);
    const [Listo, setListo] = useState(0);
    let info = JSON.parse(localStorage.getItem('usuario'));
    let Lista;

    const [selectedFile, setSelectedFile] = useState();
	  const [isFilePicked, setIsFilePicked] = useState(false);
    const [isSelected,setIsSelected] = useState(false);

	  const changeHandler = (event) => {
      setSelectedFile(event.target.files[0]);
      setIsSelected(true);
    };

    const handleSubmission = () => {
      const formData = new FormData();
      formData.append('File', selectedFile);
      fetch('/importar_ficha/12345',{
          method: 'POST',
          body: JSON.stringify({
            nombre: formData})
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log('Success:', result);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };



/*
    function CrearInforme(){
      fetch('informe/crear_informe')
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

    if(Listo ===1){*/
      return(
        <DashboardLayout>
        <DashboardNavbar />
        <SuiBox py={3}>
          <SuiBox mb={3}>
          <Tabs value={tabValue} onChange={handleSetTabValue}>
            <Tab label="Subir" {...a11yProps(0)}/>
            <Tab label="Buscar" {...a11yProps(1)}/>
          </Tabs>
            <Card>
            <TabPanel value={tabValue} index={0}>       
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>

            <SuiInput type="file" name="file" onChange={changeHandler} />
              <SuiButton onClick={handleSubmission}>Subir</SuiButton>
            </SuiBox>
            
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>

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

  
 // }
  export default Ficha;