import { useForm } from "react-hook-form";
import { registerMovement } from "./movement.ts";
//import { Header } from "../../../components/index.ts";
import type { Movements } from "../../../types/movementProduct"

interface MovementFormProps {
  productId: string;
  onClose: () => void;
}


function MovementForm({ productId, onClose }: MovementFormProps) {
  const { register, handleSubmit } = useForm<Movements>();

  const onSubmit = (data: Movements) => {
    if (!data.timestamp) {
      data.timestamp = new Date().toISOString();
    }
    registerMovement(productId, data);
    window.location.reload();
    onClose();
  };


  return (
    <>

      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <section>
            <label className="block text-lg">Acción</label>
            <select {...register("action", { required: true })} className="w-full p-2 border rounded-md" >
              <option value="ENTRADA">ENTRADA</option>
              <option value="SALIDA">SALIDA</option>
            </select>
          </section>
          <section>
            <label className="block text-lg">Cantidad</label>
            <input type="number" {...register("amount", { required: true, min: 1 })} className="w-full p-2 border rounded-md" />
          </section>
          <section>
            <label className="block text-lg">Razón</label>
            <input type="text" {...register("reason", { required: true })} className="w-full p-2 border rounded-md" />
          </section>
          <section>
            <label className="block text-lg">Fecha de expiración</label>
            <input type="date" {...register("expiration", { required: true })} className="w-full p-2 border rounded-md" />
          </section>
          <section>
            <label className="block text-lg">Fecha de movimiento</label>
            <input type="datetime-local" {...register("timestamp")} className="w-full p-2 border rounded-md" />
          </section>
          <section>
            <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">Registrar movimiento</button>
          </section>
        </form>
      </div>
    </>
  );
}

export { MovementForm };
