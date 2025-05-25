import React from "react";
import Form from "../../generics/form";
import SeeAllPayrolls from "../buttons/seeAllPayrolls"; // Ejemplo de botón adicional

interface FormData {
  name: string;
  email: string;
  age: number;
}

const TestFormWithComponents: React.FC = () => {
  const handleFormSubmit = (data: FormData) => {
    console.log("Datos enviados:", data);
  };

  const fields = [
    { label: "Nombre", name: "name", type: "text", placeholder: "Tu nombre" },
    { label: "Correo Electrónico", name: "email", type: "email", placeholder: "Tu correo" },
    { label: "Edad", name: "age", type: "number", placeholder: "Tu edad" },
  ];

  return (
    <div>
      <h1>Formulario con Componentes Adicionales</h1>
      <Form fields={fields} onSubmit={handleFormSubmit}>
        <SeeAllPayrolls />
        <p style={{ marginTop: "10px", fontStyle: "italic", color: "gray" }}>
          Todos los campos son obligatorios.
        </p>
        <div style={{ marginTop: "15px" }}>
          <label>
            Recuerda confirmar antes de enviar:
            <input type="checkbox" required />
          </label>
        </div>
      </Form>
    </div>
  );
};

export default TestFormWithComponents;
