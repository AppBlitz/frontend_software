import React from "react";
import "./css/section.css"; // Archivo CSS aparte

interface SectionProps {
  children: React.ReactNode; // El contenido que irá dentro del Section
  centered?: boolean; // Opcional: Si el contenido debe estar centrado
  direction?: "row" | "column"; // Dirección del contenido: horizontal (row) o vertical (column)
}

const Section: React.FC<SectionProps> = ({
  children,
  centered = false,
  direction = "column",
}) => {
  return (
    <section
      className={`section-container ${centered ? "centered" : ""} ${direction}`}
    >
      {children}
    </section>
  );
};

export default Section;
