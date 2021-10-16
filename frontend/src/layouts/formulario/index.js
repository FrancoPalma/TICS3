import { useState } from "react";
import Card from "@material-ui/core/Card";
import SuiButton from "components/SuiButton";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Color from "@material-ui/core/colors"
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
<<<<<<< HEAD
import { makeStyles } from "@material-ui/core/styles";
=======
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
>>>>>>> 2b1277b71147474f49fed276d526ecb09bab116c

// Soft UI Dashboard Material-UI components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import styles from "layouts/tables/styles";


// Soft UI Dashboard Material-UI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MaterialTable from 'material-table';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from "@material-ui/core/TextField";


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
    const classes = styles();
    const [tabValue, setTabValue] = useState(0);
    const handleSetTabValue = (event, newValue) => setTabValue(newValue);
    const [Listo, setListo] = useState(0);
    const [inputFields, setInputField] = useState([
        {Second: ''},
    ]);

    let info = JSON.parse(localStorage.getItem('usuario'));
    let Lista;

  const handleAddFields = () =>{
    console.log("Hola")
    setInputField([...inputFields,{Second: ''}])
  }
  const handleRemoveFields = (index) =>{
      const values = [...inputFields];
      values.splice(index,1);
      setInputField(values);
  }   

      return(
        <DashboardLayout>
        <DashboardNavbar />
        <SuiBox py={3}>
          <SuiBox mb={3}>
          <SuiTypography variant="h6">Informe</SuiTypography>
          <Tabs value={tabValue} onChange={handleSetTabValue}>
            <Tab label="Metodología" {...a11yProps(0)}/>
            <Tab label="Evaluación" {...a11yProps(1)}/>
            <Tab label="Objetivo" {...a11yProps(2)}/>
            <Tab label="Análisis" {...a11yProps(3)}/>
          </Tabs>
            <Card>
            <TabPanel value={tabValue} index={0}>       
            <SuiBox display="inrow" justifyContent="space-between" alignItems="center" p={3}>
            <SuiTypography variant="h6"></SuiTypography>
            <TextField
              label="Metodología"
              variant = "outlined"
              fullWidth
              multiline
              rows={10}
              required            
            />
        <SuiBox display="flex" mt={4} mb={1}>
          <SuiButton startIcon ={<SaveIcon />} variant="gradient" buttonColor="success" halfWidth >
            
          </SuiButton>
          <SuiButton startIcon ={<DeleteIcon />} variant="gradient" buttonColor="error" halfWidth >
            
          </SuiButton>
         
        </SuiBox>
          {inputFields.map((inputField,index)=>(
          <div key= {index}>
          <SuiBox>
    
            <TextField 
              name= "sesion"
              placeholder = "Sesion"
              label="Sesion"
              variant = "outlined"
              fullWidth
              multiline
              rows={10}
              required   
              value={inputField.second}
            />
            <IconButton onClick={() => handleRemoveFields(index)}>
              <RemoveIcon color="secondary"/>
            </IconButton>
            <IconButton onClick={() => handleAddFields()}>
              <AddIcon color="primary"/>
            </IconButton>
            </SuiBox>
            </div>
          ) )}
              
            </SuiBox>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6"></SuiTypography>
              <TextField
              label="Metodología"
              variant = "outlined"
              fullWidth
              multiline
              rows={30}
              required            
            />
            </SuiBox>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6"></SuiTypography>
              <SuiTypography variant="h6"></SuiTypography>
              <TextField
              label="Objetivo"
              variant = "outlined"
              fullWidth
              multiline
              rows={30}
              required            
            />
            </SuiBox>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SuiTypography variant="h6"></SuiTypography>
              <TextField
              label="Metodología"
              variant = "outlined"
              fullWidth
              multiline
              rows={30}
              required            
            />
              <SuiTypography variant="h6"></SuiTypography>
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
  export default Formulario;