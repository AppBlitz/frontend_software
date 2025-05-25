import React from "react";
import Navbar from "../../components/generics/navbar";
import { Footer } from "../../components/sales_components/footer_sales";
const TermsConditions: React.FC = () => {
  const tabs = [
    { label: "Home", url: "/" },
  ];

  return (
    <>
      <Navbar
        leftLabel="Terminos y condiciones"
        topLabel="Ilios"
        tabs={tabs} userId={""} token={""} userRole={""} />
      <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
        <h1>Términos y Condiciones</h1>
        <p>
          Al usar nuestra plataforma, usted acepta cumplir con estos términos y condiciones. Nos reservamos el derecho de actualizar este documento en cualquier momento.
        </p>
        <p>
          No se permite el uso de nuestros servicios para fines ilegales o no autorizados. Cualquier violación de estas normas puede resultar en la suspensión de su cuenta.
        </p>
        <p>
          Para más detalles sobre el uso adecuado de nuestra plataforma, no dude en comunicarse con nuestro equipo de soporte.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default TermsConditions;
