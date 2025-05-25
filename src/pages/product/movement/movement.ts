import { instance } from "../../../service/api"
import type { Movements } from "../../../types/movementProduct"


function registerMovement(idproduct: string, entry: Movements) {

  instance.post(`http://localhost:8080/product/movement/${idproduct}`, {

    action: entry.action,
    amount: Number(entry.amount),
    reason: entry.reason,
    timestamp: entry.timestamp,
    expiration: entry.expiration
  }).then(() => console.log("Entrada registrada"))
    .catch((err) => console.error("Error al registrar entrada:", err));
}

export { registerMovement };
