
import { instance } from "../../../service/api";
import type { registerSuppliers } from "../../../types/supplier";

function registerSupplierss(supplier: registerSuppliers,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setMessageType: React.Dispatch<React.SetStateAction<"success" | "error" | " ">>): void {
  let state: string = "INACTIVE";

  if (supplier.stateActivity === "Activo") {
    state = "ACTIVE";
  }

  const offeredProducts = supplier.offeredProducts
    ? splitString(supplier.offeredProducts.toString(), ",")
    : [];

  instance.post("supplier/add", {
    nameSupplier: supplier.nameSupplier,
    location: supplier.location,
    orderDate: supplier.orderDate,
    offeredProducts: offeredProducts,
    stateActivity: state,
  })
    .then(response => {
      console.log("Supplier registered successfully:", response.data);
      setMessage("Proveedor registrado con éxito");
      setMessageType("success");

    })
    .catch(error => {
      console.error("Error registering supplier:", error);
      setMessage("Error al registrar el proveedor");
      setMessageType("error");

    });


}

export { registerSupplierss };

function splitString(input: string, separator: string): string[] {
  return input.split(separator);
}
