import React from "react";

interface PermissionProps {
  allowedRoles: string[];
  userRole: string;
}

/**
 * HOC para controlar qué componentes se muestran según los roles permitidos
 * @param Component - Componente que se renderizará si el usuario tiene permiso.
 */
const withPermission = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & PermissionProps> => ({ allowedRoles, userRole, ...props }) => {
  return allowedRoles.includes(userRole) ? <Component {...(props as P)} /> : null;
};

export default withPermission;
