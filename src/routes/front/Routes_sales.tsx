import Home_sales from "../../pages/sales/home";
import Invoice_details from "../../pages/sales/invoice/invoice_details";
import Invoice_list from "../../pages/sales/invoice/invoice_list";
import Menu_list from "../../pages/sales/menu/menu_list";
import MenuDetails from "../../pages/sales/menu/menu_details";
import Mercado_pago from "../../pages/sales/mercado_pago";
import ShopCart_details from "../../pages/sales/shopCart/shopCart_details";
import ShopCart_list from "../../pages/sales/shopCart/shopCart_list";
import ShopCart_new from "../../pages/sales/shopCart/shopCart_view";
import Invoice_new from "../../pages/sales/invoice/invoice_view";
import ProtectedRoute from "../../components/utils/protectedRoute";
import MenuView from "../../pages/sales/menu/menu_view";

export const salesRoutes = [
  {
    path: "/sales/home",
    Component: () => (
      <ProtectedRoute>
        <Home_sales />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sales/invoice/get/",
    Component: () => (
      <ProtectedRoute>
        <Invoice_details />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sales/invoice/view/",
    Component: () => (
      <ProtectedRoute>
        <Invoice_new />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sales/invoice/list",
    Component: () => (
      <ProtectedRoute>
        <Invoice_list />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sales/menu",
    Component: () => (
      <ProtectedRoute>
        <Menu_list />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sales/menu/details",
    Component: () => (
      <ProtectedRoute>
        <MenuDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sales/menu/view",
    Component: () => (
      <ProtectedRoute>
        <MenuView />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sales/mercado-pago",
    Component: () => (
      <ProtectedRoute>
        <Mercado_pago />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sales/shop-cart/details",
    Component: () => (
      <ProtectedRoute>
        <ShopCart_details />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sales/shop-cart/view",
    Component: () => (
      <ProtectedRoute>
        <ShopCart_new />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sales/shop-cart/get",
    Component: () => (
      <ProtectedRoute>
        <ShopCart_details />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sales/shop-cart/list",
    Component: () => (
      <ProtectedRoute>
        <ShopCart_list />
      </ProtectedRoute>
    ),
  },
];
