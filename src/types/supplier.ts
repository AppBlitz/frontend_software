
type Supplier = {
  id: string
  nameSupplier: string;         // Nombre del proveedor
  location: string;             // Ubicación del proveedor
  orderDate: Date;              // Fecha de pedido
  offeredProducts: string[];    // Lista de productos ofrecidos por el proveedor
  stateActivity: "ACTIVO" | "INACTIVO"; // Estado de actividad del proveedor (puede ser 'ACTIVO' o 'INACTIVO')
};

type registerSuppliers = {

  id: string
  nameSupplier: string;
  location: string;
  orderDate: Date;
  offeredProducts: string[];
  stateActivity: string
}
export type { Supplier, registerSuppliers }
