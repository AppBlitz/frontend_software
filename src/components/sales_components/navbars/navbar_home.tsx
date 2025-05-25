import React from "react";
import Navbar from "../../generics/navbar";

interface roleProps {
  userRole: string,
  userId: string,
  token: string,
}
const Navbar_home: React.FC<roleProps> = ({ userRole, userId, token }) => {
  const tabs = [

    { label: "home", url: "/home", allowedRoles: ["ADMIN", "CashierEmployee"] },
    { label: "empleados", url: "/employee", allowedRoles: ["ADMIN"] },
    //{ label: "crear proveedores", url: "/register/supplier", allowedRoles: ["ADMIN"] },
    { label: "proveedores", url: "/supplier", allowedRoles: ["ADMIN", "warehouseEmployee"] },
    { label: "ProductosAdmin", url: "/productsAdmin", allowedRoles: ["ADMIN"] },
    { label: "Productos", url: "/product", allowedRoles: ["warehouseEmployee"] },
    //{ label: "crear recetas", url: "/recipes", allowedRoles: ["ADMIN","KitchenEmployee"]  },
    { label: "recetas", url: "/recipes/all", allowedRoles: ["ADMIN", "KitchenEmployee"] },
    { label: "Facturas", url: "/sales/invoice/list", allowedRoles: ["ADMIN", "CashierEmployee", "SalesManager"] },
    { label: "Menu", url: "/sales/menu", allowedRoles: ["ADMIN", "CashierEmployee", "SalesManager", "KitchenManager", "KitchenEmployee", "waiterEmployee"] },
    { label: "Pedidos", url: "/sales/shop-cart/list", allowedRoles: ["ADMIN", "waiterEmployee", "SalesManager"] },
    { label: "Cerrar sesión", url: "/" }
  ];

  return <Navbar leftLabel="Inicio" topLabel="Módulo de ventas" userRole={userRole} userId={userId} token={token} tabs={tabs} />;
};

export default Navbar_home;
