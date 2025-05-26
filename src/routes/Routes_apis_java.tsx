const Routes_api_java: Record<string, string> = {
  "url_base": "http://localhost:8080",
  "crear_empleado": "/employees",
  "actualizar_empleado": "/employees",
  "obtener_todos_empleados": "/employees/getAll",
  "login": "/employees/user/login",

  "obtener_productos": "/product/available",
  "obtener_recetas": "/api/recipes/all",
  "guardar_menu": "/api/menus/createMenu",
  "get_menu": "/api/menus/",
  "get_all_menu": "/api/menus/getAllMenu",
  "obtener_pedidos": "/cart/getAll",
  "obtener_pedido": "/cart/search/"
};

export default Routes_api_java;
