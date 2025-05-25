import { createBrowserRouter } from "react-router";
import Test from "../pages/test/Test";
import Payroll from "../pages/payroll/payroll/index"
import Pay from "../pages/payroll/pay/index"
import Update from "../pages/payroll/update/index"
import Payrolls from "../pages/payroll/index"
import { salesRoutes } from "./front/Routes_sales";
import { testsRoutes } from "./front/Routes_tests";
import { Register, UpdateSupplier } from "../pages";
import { generalRoutes } from "./front/Routes_general";
import { loginRoute } from "./front/Route_login";
import { Routes_home } from "./front/Routes_home";


export const router = createBrowserRouter([

  {
    path: "test", Component: Test
  },

  // Agregando rutas desde Route_login
  ...loginRoute,

  ...Routes_home,

  {
    path: "register", Component: Register
  },

  {
    path: "update/supplier", Component: UpdateSupplier
  },



  {
    path: "payrolls", Component: Payrolls
  },
  {
    path: "payrolls/payroll", Component: Payroll
  },
  {
    path: "payrolls/updates", Component: Update
  },
  {
    path: "payrolls/pay", Component: Pay
  },
  // Agregando rutas desde Routes_sales
  ...salesRoutes,

  // Agregando rutas desde Routes_tests
  ...testsRoutes,

  // Agregando rutas desde Routes_general
  ...generalRoutes,

]);
