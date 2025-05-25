import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// 🔹 Función para verificar el token decodificado
const verifyTokenBase64 = (token: string, role: string, id: string) => {
  try {
    const decodedData = JSON.parse(atob(token));

    console.log("🔍 Token decodificado:", decodedData);

    if (!decodedData.role || !decodedData.id) {
      console.error("Faltan datos dentro del token decodificado.");
      return false;
    }

    if (
      decodedData.role === role &&
      decodedData.id === id
    ) {
      console.log("Token válido.");
      return true;
    } else {
      console.error("Token inválido: los datos no coinciden.");
      return false;
    }
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return false;
  }
};

// 🔹 Componente `ProtectedRoute`
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Capturar datos de la URL (query parameters)
  const token = queryParams.get("token");
  const userRole = queryParams.get("role");
  const userId = queryParams.get("id");

  // 🔍 Mostrar datos en consola antes de verificar
  console.log("🔍 Datos recibidos:");
  console.log("Token recibido:", token);
  console.log("Role recibido:", userRole);
  console.log("ID recibido:", userId);

  // 🔹 Evitar redirección innecesaria si falta algún dato
  if (!token || !userRole || !userId) {
    console.warn("No se enviaron todos los datos, revisa el login.");

    return <Navigate to="/" />;

  }

  // ⚡️ Verificación del token
  const isValidToken = verifyTokenBase64(token, userRole, userId);

  if (!isValidToken) {
    console.warn("Token inválido, revisa si los datos dentro del token coinciden.");

    return <Navigate to="/" />;

  }

  console.log("Token válido, permitiendo acceso.");
  return <>{children}</>;
};

export default ProtectedRoute;
