import React from "react";
import "./css/footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h4>Contáctanos</h4>
        <p>Email: teamroblox520@gmail.com</p>
        <p>Teléfono: +57 3128728418</p>
      </div>
      <div className="footer-bottom">
        <div className="footer-links">
          <a href="/about">Sobre Nosotros</a>
          <a href="/privacy">Políticas de Privacidad</a>
          <a href="/terms">Términos y Condiciones</a>
        </div>
        <p className="footer-copyright">
          © 2025 Ilios. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export { Footer };
