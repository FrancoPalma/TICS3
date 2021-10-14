import { useState } from "react";
import Card from "@material-ui/core/Card";

import SuiButton from "components/SuiButton";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Color from "@material-ui/core/colors"
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveIcon from "@material-ui/icons/Remove";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";


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
import container from "assets/theme/components/container";


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
  const [inputField, setInputField] = useState([
    {second:''},

  ]);
  const handleAddFields  = () =>{
    console.log("Hola")
    setInputField([...inputField,{second:''}])
  }

  return(
      <Container>
        <form>
          {inputField.map((inputField,index)=>(
          <div key= {index}>
            <TextField 
              name= "first"
              placeholder = "First"
              
            />
            <TextField 
              name= "second"
              placeholder = "Second"
              value={inputField.second}
            />
            <IconButton
              onClick={() => handleAddFields()}
            >
              <AddIcon/>
            </IconButton>
            </div>
          ) )}
        </form>
      </Container>
    );
}

  export default Formulario;