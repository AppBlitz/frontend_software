// components/productSelector.tsx
import React, { useEffect, useState } from "react";
import { instance } from "../../../service/api";
import type { Products } from "../../../types/Product";

type Props = {
  selectedProductIds: string[];
  onChange: (newSelectedIds: string[]) => void;
};

const ProductSelector: React.FC<Props> = ({ selectedProductIds, onChange }) => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await instance.get("/product/allProducts");
        setProducts(res.data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAdd = (productId: string) => {
    if (!selectedProductIds.includes(productId)) {
      onChange([...selectedProductIds, productId]);
    }
  };

  const handleRemove = (productId: string) => {
    onChange(selectedProductIds.filter((id) => id !== productId));
  };

  return (
    <div className="bg-white border rounded p-3">
      <div className="mb-2">
        <strong>Seleccionados:</strong>
        <ul className="list-disc pl-5">
          {selectedProductIds.map((id) => {
            const product = products.find((p) => p.id === id);
            return (
              <li key={id} className="flex justify-between items-center">
                {product ? product.nameProduct : "Producto no encontrado"}
                <button
                  onClick={() => handleRemove(id)}
                  className="text-red-500 ml-2 hover:underline"
                >
                  Quitar
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-4">
        <strong>Agregar productos:</strong>
        <ul className="max-h-40 overflow-y-auto border rounded p-2 mt-2">
          {products
            .filter((product) => !selectedProductIds.includes(product.id)) // ← Filtra los ya seleccionados
            .map((product) => (
              <li key={product.id} className="flex justify-between items-center">
                {product.nameProduct}
                <button
                  onClick={() => handleAdd(product.id)}
                  className="text-blue-500 ml-2 hover:underline"
                >
                  Agregar
                </button>
              </li>
            ))}
        </ul>

      </div>
    </div>
  );
};

export default ProductSelector;
