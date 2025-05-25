import React from "react";
import Navbar from "../../generics/navbar";

interface roleProps {
  userRole: string;
  userId: string;
  token: string;
}
const Navbar_home: React.FC<roleProps> = ({ userRole, userId, token }) => {
  const tabs = [
    { label: "Inicio", url: "/home" },
    { label: "Menu", url: "/sales/menu", allowedRoles: ["ADMIN", "waiterEmployee", "SalesManager"] },
    { label: "Pedidos", url: "/sales/shop-cart/list", allowedRoles: ["ADMIN", "waiterEmployee", "SalesManager"] },
  ];

  return <Navbar leftLabel="Inicio" topLabel="Módulo de ventas" userRole={userRole} userId={userId} token={token} tabs={tabs} />;
};
export default Navbar_home;
