import React from "react";
import "./css/form.css";

interface FormField {
  label?: string;
  name?: string;
  type?: string
  placeholder?: string;
}

interface FormProps<T> {
  fields: FormField[];
  onSubmit: (data: T) => void;
  children?: React.ReactNode; // Para componentes adicionales
}

const Form = <T,>({ fields, onSubmit, children }: FormProps<T>) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as T;

    onSubmit(data);
  };

  return (
    <form className="generic-form" onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <div className="form-field" key={index}>
          <label htmlFor={String(field.name)}>{field.label}</label>
          <input
            id={String(field.name)}
            name={String(field.name)}
            type={field.type}
            placeholder={field.placeholder || ""}
            required
          />
        </div>
      ))}
      {children} {/* Aquí renderizamos componentes adicionales */}
      <button className="form-submit-button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
