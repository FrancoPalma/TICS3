import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import SuiBox from "components/SuiBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";

export default function Horario() {
    const hist = useHistory();
    let info;
    localStorage.clear();
    function LogOut(){
        fetch('/sesion/logout')
        .then( (response) => {
            if(response.status !== 404) {
                hist.push('/authentication/sign-in');
            }
        })
        .catch((error) => {
            console.log(error)
        });
    }
    function Datos(){
      fetch('/sesion/datos_usuario')
      .then( (response) => {
        if(response.status !== 404) {
          return response.json()
        } else {
          hist.push('/authentication/sign-in')
        }
      })
      .then(users => {
        info = users;
        console.log(info)
      })
      .catch((error) => {
        console.log(error)
      });
      setTimeout(()=>{
        LogOut();;
      },500);
    }
    Datos();
    return(
        <DashboardLayout>
          <SuiBox py={3}>
            <SuiBox mb={3}>
              <Card>
                Cerrando Sesión...
              </Card>
            </SuiBox>
            <Card>
            </Card>
          </SuiBox>
          <Footer />
        </DashboardLayout>
    );
}
