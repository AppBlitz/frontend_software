type Products = {
  id: string;
  nameProduct: string;
  suppliers: string[];
  dateExpiration: string[];
  controldateExpiration: number[];
  dateRegister: string;
  weightProduct: number;
  priceProduct: number;
  stock: number;
  images: string[]; // Base64 or URL strings
  estate: string;
  typeStock: string;
}
type updateProducts = {
  id: string
  nameProduct: string
  dateExpiration: Date
  dateAdd: Date
  weightProduct: number
  priceProduct: number
  amount: number
  images?: File[] | null
  suppliers: string[]
}
export type { Products, updateProducts }
