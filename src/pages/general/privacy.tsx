import React from "react";
import Navbar from "../../components/generics/navbar";
import { Footer } from "../../components/sales_components/footer_sales";
const PrivacyPolicy: React.FC = () => {
  const tabs = [
    { label: "Home", url: "/" },
  ];

  return (
    <>
      <Navbar
        leftLabel="Politicas de privacidad"
        topLabel="Ilios"
        tabs={tabs} userId={""} token={""} userRole={""} />
      <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
        <h1>Política de Privacidad</h1>
        <p>
          En nuestra empresa, la privacidad de nuestros usuarios es una prioridad. Nos comprometemos a proteger su información personal y garantizar el uso adecuado de sus datos.
        </p>
        <p>
          Toda la información recolectada será manejada bajo los principios de transparencia, responsabilidad y seguridad. Nunca compartiremos sus datos sin su consentimiento.
        </p>
        <p>
          Si tiene alguna pregunta o inquietud sobre cómo manejamos su información, por favor contáctenos directamente.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
