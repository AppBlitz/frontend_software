import React from "react";
import Navbar from "../../components/generics/navbar";
import { Footer } from "../../components/sales_components/footer_sales";
const About: React.FC = () => {
  const tabs = [
    { label: "Home", url: "/" },
  ];

  return (
    <>
      <Navbar
        leftLabel="Sobre nosotros"
        topLabel="Ilios"
        tabs={tabs} userId={""} token={""} userRole={""} />
      <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
        <h1>Sobre Nosotros</h1>
        <p>
          Bienvenido a nuestra plataforma. Somos una empresa dedicada a ofrecer soluciones tecnológicas de alta calidad, centradas en satisfacer las necesidades de nuestros clientes.
        </p>
        <p>
          Nuestra misión es innovar y proporcionar herramientas que faciliten la vida y el trabajo diario. Nos enorgullece colaborar con negocios y personas alrededor del mundo.
        </p>
        <p>
          Si deseas saber más sobre nuestra historia, valores o servicios, no dudes en contactarnos. ¡Gracias por confiar en nosotros!
        </p>
      </div>
      <Footer />
    </>
  );
};

export default About;
