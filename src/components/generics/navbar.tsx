import React from "react";
import { useNavigate } from "react-router-dom";
import GenerateData from "../../service/generateRoute";
import "./css/navbar.css";

interface NavbarProps {
  leftLabel: string;
  topLabel: string;
  userId: string;
  token: string;
  userRole: string;
  tabs: { label: string; url: string; allowedRoles?: string[] }[];
}

const Navbar: React.FC<NavbarProps> = ({ leftLabel, topLabel, userRole, userId, token, tabs }) => {
  const navigate = useNavigate(); // Inicializa el hook de navegación

  const xd = (path: string, role: string, id: string, token: string): string => {
    if (path == "/") {
      return "/"
    } else {
      return path + GenerateData(role, id, token);
    }
  }

  // Asignación de roles en español
  const roleMap: Record<string, string> = {
    KitchenEmployee: "Empleado de cocina",
    CashierEmployee: "Cajero",
    WarehouseEmployee: "Bodeguista",
    WaiterEmployee: "Mesero",
    ADMIN: "Administrador"
  };
  const role = roleMap[userRole] || "Desconocido"; // Mejora la asignación de roles

  return (
    <nav className="navbar">
      <h3 className="navbar-top-label">{topLabel}</h3>
      <div className="navbar-main">
        <h2 className="navbar-left-label">{leftLabel}</h2>
        <div className="navbar-center"></div>

        {/* Lista de pestañas con navegación dinámica */}
        <h3 className="navbar-role-label">{role}</h3>
        <ul className="navbar-tabs">
          {tabs.map((tab, index) =>
            !tab.allowedRoles || tab.allowedRoles.includes(userRole) ? (
              <li key={index}>
                <button
                  className="navbar-tab"
                  onClick={() =>
                    navigate(xd(tab.url, userRole, userId, token))}

                >
                  {tab.label}
                </button>
              </li>
            ) : null
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
