import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import SuiBox from "components/SuiBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";

export default function Horario() {
    const hist = useHistory();
    localStorage.clear();
    function LogOut(){
        fetch('/sesion/logout')
        .then( (response) => {
            if(response.status !== 404) {
                localStorage.setItem('usuario', JSON.stringify({cerrar: true}));
                hist.push('/authentication/sign-in');
            }
        })
        .catch((error) => {
            console.log(error)
        });
    }
    LogOut();
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
