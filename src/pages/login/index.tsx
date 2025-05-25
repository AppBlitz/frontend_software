
import Navbar from "../../components/sales_components/navbars/navbar_login";

import { useForm } from "react-hook-form"
import type { loginUser } from "../../types/user";
import { instance } from "../../service/api";
import { useLocation, useNavigate } from "react-router"
import { useState, useEffect } from "react";

function Login() {

  const { register, handleSubmit } = useForm<loginUser>();
  const navigate = useNavigate()
  const [message, setMessage] = useState(" "); // 🔹 Estado para mostrar el mensaje
  const [messageType, setMessageType] = useState<"success" | "error" | " ">(" ");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userRole = queryParams.get("role");

  // Redirigir si no hay role
  useEffect(() => {
    if (!userRole || userRole == "") {
      navigate("/"); // Redirige a la página de login
    }
  }, [userRole, navigate]);


  // Redirigir si no hay role
  useEffect(() => {
    if (!userRole || userRole == "") {
      navigate("/"); // Redirige a la página de login
    }
  }, [userRole, navigate]);


  const loginConfirmation = async (user: loginUser) => {
    try {
      const response = await instance.post("employees/user/login", {
        email: user.emailUser,
        password: user.passwordUser,
      });

      if (response.status === 200) {
        window.location.href = "/home";
        setMessageType("success");
        setMessage("Inicio de sesión exitoso");

      } else {
        setMessageType("error");
        setMessage(response.data.error || "Ocurrio un problema")
      }

    } catch (error: any) {

      setMessageType("error");
      setMessage(error.response?.data?.error || "No se pudo conectar con el servidor");

    }
  };

  return (<>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 font-serif">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        <form onSubmit={handleSubmit(loginConfirmation)}>
          {/* Título */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">Inicio de sesión</h2>
          <p className="text-sm text-gray-500 mb-6">Bienvenido a <strong>Ilios</strong></p>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-gray-700 text-sm mb-2">Correo electrónico</label>
            <input
              type="text"
              placeholder="ejemplo@correo.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("emailUser", {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
            />
          </div>

          {/* Contraseña */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("passwordUser", { required: true })}
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full transition duration-200"
          >
            Ingresar
          </button>

          {/* Mensaje de error o éxito */}
          {message && (
            <div className={`mt-4 text-center text-sm ${messageType === "error" ? "text-red-500" : "text-green-600"}`}>
              {message}
            </div>
          )}

          {/* Enlace olvidó contraseña */}
          <div className="mt-6 text-center">
            <a
              onClick={() => navigate("")}
              className="text-blue-500 hover:text-blue-700 text-sm cursor-pointer"
            >
              ¿Olvidó la contraseña?
            </a>
          </div>
        </form>
      </div>
    </div>

  </>)
};
export { Login }
