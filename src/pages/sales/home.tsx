import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Importamos useNavigate
import Navbar from "../../components/sales_components/navbars/navbar_home";
import { Footer } from "../../components/sales_components/footer_sales";
import Section from "../../components/generics/section";

const Home_sales: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Inicializamos useNavigate
  const queryParams = new URLSearchParams(location.search);
  const userRole = queryParams.get("role");
  const token = queryParams.get("token");
  const userId = queryParams.get("id");

  // Redirigir si no hay role
  useEffect(() => {
    if (!userRole || userRole == "") {

      navigate("/"); // Redirige a la página de login

    }
  }, [userRole, navigate]);

  return (
    <div>
      <Navbar userRole={userRole || ""} userId={userId || ""} token={token || ""} />
      <Section centered>
        <header>
          <h1>Bienvenido a Ventas Pro</h1>
          <p>Impulsa tus ventas al siguiente nivel</p>
        </header>
        <img
          src="https://cdn.pixabay.com/photo/2020/08/17/04/04/businessman-5494308_1280.jpg"
          alt="imagen"
          className="w-full h-auto rounded-lg shadow-md"
        />
      </Section>
      <Footer />
    </div>
  );
};

export default Home_sales;
