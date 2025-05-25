import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../../components/sales_components/navbars/navbar_shopCart"
import { Footer } from "../../../components/sales_components/footer_sales";

const ShopCart_new: React.FC = () => {
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

      <Footer />
    </div>
  );
};

export default ShopCart_new;
