
import Navbar from "../../../components/sales_components/navbars/navbar_home_admin";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { DropdownMenu } from "../../../components";
import { saveEmployee } from "./options";
import type {
  EmployeeCreate,
} from "../../../types/employee";
import { useLocation, useNavigate } from "react-router";

function CreateEmployee() {
  const { register, handleSubmit, setValue, watch } = useForm<EmployeeCreate>();
  const [stateButton, setStateButton] = useState<boolean>(false);
  const formValues = watch();

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const userRole = queryParams.get("role");
  const token = queryParams.get("token");
  const userId = queryParams.get("id");

  useEffect(() => {
    if (!userRole || userRole === "") {
      navigate("/");
    }
  }, [userRole, navigate]);

  const handleDropdownSelect = (
    field: keyof EmployeeCreate,
    value: string | boolean
  ) => {
    setValue(field, value);
  };

  useEffect(() => {
    const isFormComplete = Object.values(formValues).every(
      (value) => value !== "" && value !== null && value !== undefined
    );
    setStateButton(isFormComplete);
  }, [formValues]);

  return (
    <>
      <Navbar
        userRole={userRole || ""}
        userId={userId || ""}
        token={token || ""}
      />

      <div className="bg-gray-200 min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
          <form onSubmit={handleSubmit(saveEmployee)}>
            <section>
              <h1 className="text-2xl font-bold text-black mb-4">
                Registrar empleado
              </h1>
            </section>

            {[{ label: "Nombre", name: "nameEmployee", type: "text" },
            { label: "Salario base", name: "baseSalary", type: "number" },
            { label: "Correo electrónico", name: "email", type: "email" },
            { label: "Dirección", name: "address", type: "text" },
            { label: "Ciudad", name: "city", type: "text" },
            { label: "Número de teléfono", name: "phoneNumber", type: "text" },
            { label: "Fecha de entrada", name: "entryDate", type: "date" },
            { label: "Contraseña", name: "password", type: "password" },
            ].map(({ label, name, type }) => (
              <section key={name} className="mb-4">
                <label className="block text-black font-medium mb-2">
                  {label}
                </label>
                <input
                  type={type}
                  className="w-full border border-gray-300 rounded p-2 text-black"
                  {...register(name as keyof EmployeeCreate, { required: true })}
                />
              </section>
            ))}

            <section className="mb-4">
              <label className="block text-black font-medium mb-2">
                ¿Está retirado?
              </label>
              <DropdownMenu
                opciones={["Sí", "No"]}
                onSelect={(value) =>
                  handleDropdownSelect("isRetired", value === "Sí")
                }
                name="Retirado"
              />
            </section>

            {[
              { label: "EPS", field: "eps", options: ["SALUD_Total", "NUEVA_EPS", "SURA", "SANITAS"] },
              { label: "Caja Compensación", field: "cff", options: ["COMFENALCO_QUINDIO", "COMFENALCO_ANTIOQUIA", "COMFAMA", "CAFAM"] },
              { label: "ARL", field: "arl", options: ["SURA", "AXA_COLPATRIA", "OTRA"] },
              { label: "Área", field: "area", options: ["KEICHEN", "WAREHOUSE", "SALES"] },
              { label: "Nivel de Riesgo", field: "level", options: ["LEVEL_I", "LEVEL_II", "LEVEL_III", "LEVEL_IV", "LEVEL_V"] },
              { label: "Pensión", field: "pension", options: ["COLPENSIONES", "PORVENIR", "PROTECCION"] },
              { label: "Cesantías", field: "cesantias", options: ["PORVENIR", "COLFONDOS", "FNA", "PROTECCION"] },
              { label: "Permisos", field: "roll.permissionsEmployee.permissions", options: ["CREAR", "ELIMINAR", "CONSULTAR", "EDITAR"] },
              { label: "Permisos sobre", field: "roll.permissionsEmployee.objeto", options: ["OB_PRODUCT", "OB_RECETA"] },
              { label: "Rol", field: "roll.rollEmployee", options: ["KITCHENEMPLOYEE", "CASHIEREMPLOYE", "WAREHOUSEEMPLOYEE"] },
            ].map(({ label, field, options }) => (
              <section key={field} className="mb-4 relative">
                <DropdownMenu
                  opciones={Object.values(options)}
                  onSelect={(value) =>
                    handleDropdownSelect(field as keyof EmployeeCreate, value)
                  }
                  name={label}
                />
              </section>
            ))}

            <section>
              <button
                type="submit"
                className={`w-full bg-black text-white p-2 rounded ${!stateButton && "opacity-50 cursor-not-allowed"
                  }`}
                disabled={!stateButton}
              >
                Registrar
              </button>
            </section>
          </form>
        </div>
      </div>
    </>
  );
}

export { CreateEmployee };
