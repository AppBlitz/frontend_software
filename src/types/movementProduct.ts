
type Movements = {
  action: "ENTRADA" | "SALIDA"; // puedes ajustar según los valores permitidos
  amount: number;
  reason: string;
  timestamp: string;   // en formato ISO
  expiration: string;  // en formato YYYY-MM-DD
}

type Movementsconsult = {
  nameProduct: string;
  action: "ENTRADA" | "SALIDA"; // puedes ajustar según los valores permitidos
  amount: number;
  reason: string;
  timestamp: string;   // en formato ISO
  expiration: string;  // en formato YYYY-MM-DD
}



export type { Movements, Movementsconsult };
