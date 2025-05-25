
import Navbar from "../../../components/sales_components/navbars/navbar_home_admin";
import { useForm, Controller } from "react-hook-form";
import type { registerSuppliers } from "../../../types/supplier";
import { registerSupplierss } from "./options";
import { useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import ProductSelector from "../allSupplier/productSelector";
import { messageValidation } from "../../../components/button/messageValidation/message";

function RegisterSupplier() {
  const { register, handleSubmit, control } = useForm<registerSuppliers>();

  const location = useLocation();
  const navigate = useNavigate(); // Inicializamos useNavigate
  const queryParams = new URLSearchParams(location.search);
  const userRole = queryParams.get("role");
  const token = queryParams.get("token");
  const userId = queryParams.get("id");

  const [message, setMessage] = useState(" "); // 🔹 Estado para mostrar el mensaje
  const [messageType, setMessageType] = useState<"success" | "error" | " ">(" ");

  // Redirigir si no hay role
  useEffect(() => {
    if (!userRole || userRole == "") {
      navigate("/"); // Redirige a la página de login
    }
  }, [userRole, navigate]);


  return (
    <>
      <Navbar userRole={userRole || ""} userId={userId || ""} token={token || ""} />
      <div className="bg-gray-200 text-black font-serif min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Registro Proveedor</h1>
          <form onSubmit={handleSubmit((data) => registerSupplierss(data, setMessage, setMessageType)
          )} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <input
                className="w-full h-10 text-black border border-gray-300 rounded-full pl-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre"
                {...register("nameSupplier", { required: true })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Locación</label>
              <input
                className="w-full h-10 text-black border border-gray-300 rounded-full pl-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Locación"
                {...register("location", { required: true })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Fecha de la Orden</label>
              <input
                type="date"
                className="w-full h-10 text-black border border-gray-300 rounded-full pl-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("orderDate", { required: true })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Productos Ofrecidos</label>
              <Controller
                name="offeredProducts"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <ProductSelector
                    selectedProductIds={field.value || []}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Estado del Proveedor</label>
              <select
                className="w-full h-10 text-black border border-gray-300 rounded-full pl-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("stateActivity", { required: true })}
              >
                <option value="" disabled selected>
                  Selecciona el estado
                </option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full h-12 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition duration-300"
              >
                Registrar
              </button>
              {messageValidation(messageType, message)}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export { RegisterSupplier };
