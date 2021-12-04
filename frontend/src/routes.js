// Soft UI Dashboard Material-UI layouts
import Dashboard from "layouts/dashboard";
import Profesionales from "layouts/profesionales";
import Perfil from "layouts/perfil";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Horario from "layouts/horario";
import LogOut from "layouts/logout";
import Usuarios from "layouts/usuario";
// Soft UI Dashboard Material-UI icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import Basket from "examples/Icons/Basket";



const info = JSON.parse(localStorage.getItem('usuario'));


const routes = [
  {
    type: "collapse",
    name: "Inicio",
    key: "dashboard",
    route: "/dashboard",
    icon: <Cube size="12px" />,
    component: Dashboard,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Horario",
    key: "horario",
    route: "/horario",
    icon: <Document size="12px" />,
    component: Horario,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Usuarios",
    key: "usuarios",
    route: "/usuarios",
    icon: <Document size="12px" />,
    component: Usuarios,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Perfil",
    key: "perfil",
    route: "/perfil",
    icon: <CustomerSupport size="12px" />,
    component: Perfil,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Profesionales",
    key: "profesionales",
    route: "/profesionales",
    icon: <Document size="12px" />,
    component: Profesionales,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Cerrar Sesión",
    key: "logout",
    route: "/logout",
    icon: <Settings size="12px" />,
    component: LogOut,
    noCollapse: true,
  },
  {
    type: "title",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: SignIn,
    noCollapse: true,
  },
  {
    type: "title",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: SignUp,
    noCollapse: true,
  }
];


export default routes;
