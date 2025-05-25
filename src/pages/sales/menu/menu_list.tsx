import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../../components/sales_components/navbars/navbar_menu"
import { Footer } from "../../../components/sales_components/footer_sales";
import Tabla_menu from "../../../components/sales_components/tablas/tabla_menu";
import Section from "../../../components/generics/section";
import Button from "../../../components/generics/button";

const Menu_list: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Inicializamos useNavigate
  const queryParams = new URLSearchParams(location.search);
  const userRole = queryParams.get("role");
  const token = queryParams.get("token");
  const userId = queryParams.get("id");

  // Redirigir si no hay role
  useEffect(() => {
    if (!userRole || userRole == "") {
      navigate("/sale/login"); // Redirige a la página de login
    }
  }, [userRole, navigate]);
  return (
    <div>
      <Navbar userRole={userRole || ""} userId={userId || ""} token={token || ""} />
      <Section>
        <h1>
          Historial de menus
        </h1>
      </Section>
      <Section>
        <Tabla_menu />
      </Section>
      <Section direction="row" centered>
        <Button label="Ver menu activo" url="#" />
        <a>     </a>
        <Button label="Relizar Pedido" url="#" />
        <a>     </a>
      </Section>

      <Footer />
    </div>
  );
};

export default Menu_list;
