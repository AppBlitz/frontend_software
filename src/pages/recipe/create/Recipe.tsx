import Navbar from "../../../components/sales_components/navbars/navbar_home_admin.tsx";
import { useState, useEffect } from "react";
import { instance } from "../../../service/api";
import { useForm, useFieldArray } from "react-hook-form";
import { saveRecipe } from "./options.ts";
import type { Products } from "../../../types/Product.ts";
import type { createRecipe } from "../../../types/recipe.ts";
import { useNavigate, useLocation } from "react-router";

function CreateRecipes() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<createRecipe>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const [products, setProducts] = useState<Products[]>([]);
  const location = useLocation();
  const navigate = useNavigate(); // Inicializamos useNavigate
  const queryParams = new URLSearchParams(location.search);
  const userRole = queryParams.get("role");
  const token = queryParams.get("token");
  const userId = queryParams.get("id");

  // Redirigir si no hay role
  useEffect(() => {
    if (!userRole || userRole == "") {
      navigate("/"); // Redirige a la página de login
    }
  }, [userRole, navigate]);


  // Cargar los productos al cargar el componente
  useEffect(() => {
    instance
      .get("product/allProducts")
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("La respuesta no contiene una lista válida de productos.");
        }
      })
      .catch((error) => {
        console.error("Error al cargar los productos:", error);
      });
  }, []);

  const addIngredient = () => {
    append({ productId: "", quantity: 0, unitOfMeasure: "", additionalNotes: "" });
  };

  return (
    <>
      <Navbar userRole={userRole || ""} userId={userId || ""} token={token || ""} />
      <div className="bg-gray-300 min-h-screen flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-lg w-full">
          <h1 className="text-black text-2xl font-bold text-center mb-6">Crear Receta</h1>
          <form onSubmit={handleSubmit(saveRecipe)}>
            {/* Nombre */}
            <section className="mb-4">
              <label className="block text-black font-medium mb-2">Nombre</label>
              <input
                className="w-full p-2 border border-black rounded"
                {...register("name", { required: "Este campo es obligatorio." })}
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </section>

            {/* Ingredientes */}
            <section className="mb-4">
              <label className="block text-black font-medium mb-2">Ingredientes</label>
              {fields.map((item, index) => (
                <div key={item.id} className="mb-4 border p-4 rounded">
                  <label className="block text-black font-medium">Ingrediente</label>
                  <select
                    className="w-full p-2 border border-black rounded mb-2"
                    {...register(`ingredients.${index}.productId`, {
                      required: "Seleccione un ingrediente.",
                    })}
                  >
                    <option value="">Seleccione un ingrediente</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.nameProduct}
                      </option>
                    ))}
                  </select>
                  {errors.ingredients?.[index]?.productId && (
                    <span className="text-red-500 text-sm">
                      {errors.ingredients[index].productId?.message}
                    </span>
                  )}

                  <label className="block text-black font-medium">Cantidad</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-black rounded mb-2"
                    {...register(`ingredients.${index}.quantity`, {
                      required: "Ingrese una cantidad.",
                      valueAsNumber: true,
                      min: { value: 1, message: "La cantidad debe ser mayor a 0." },
                    })}
                  />
                  {errors.ingredients?.[index]?.quantity && (
                    <span className="text-red-500 text-sm">
                      {errors.ingredients[index].quantity?.message}
                    </span>
                  )}

                  <label className="block text-black font-medium">Unidad de Medida</label>
                  <input
                    className="w-full p-2 border border-black rounded mb-2"
                    {...register(`ingredients.${index}.unitOfMeasure`, {
                      required: "Ingrese una unidad de medida.",
                    })}
                  />
                  {errors.ingredients?.[index]?.unitOfMeasure && (
                    <span className="text-red-500 text-sm">
                      {errors.ingredients[index].unitOfMeasure?.message}
                    </span>
                  )}

                  <label className="block text-black font-medium">Notas Adicionales</label>
                  <textarea
                    className="w-full p-2 border border-black rounded mb-2"
                    {...register(`ingredients.${index}.additionalNotes`)}
                  ></textarea>

                  <button
                    type="button"
                    className="text-red-500 font-medium mt-2"
                    onClick={() => remove(index)}
                  >
                    Eliminar Ingrediente
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="w-full p-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-700"
                onClick={addIngredient}
              >
                Agregar Ingrediente
              </button>
            </section>

            {/* Instrucciones */}
            <section className="mb-4">
              <label className="block text-black font-medium mb-2">Instrucciones</label>
              <textarea
                className="w-full p-2 border border-black rounded"
                {...register("instructions", { required: "Este campo es obligatorio." })}
              ></textarea>
              {errors.instructions && <span className="text-red-500 text-sm">{errors.instructions.message}</span>}
            </section>

            {/* Tiempo de preparación */}
            <section className="mb-4">
              <label className="block text-black font-medium mb-2">Tiempo de preparación (minutos)</label>
              <input
                type="number"
                className="w-full p-2 border border-black rounded"
                {...register("preparationTime", { required: "Este campo es obligatorio." })}
              />
              {errors.preparationTime && (
                <span className="text-red-500 text-sm">{errors.preparationTime.message}</span>
              )}
            </section>

            {/* Porciones */}
            <section className="mb-4">
              <label className="block text-black font-medium mb-2">Porciones</label>
              <input
                type="number"
                className="w-full p-2 border border-black rounded"
                {...register("servings", { required: "Este campo es obligatorio." })}
              />
              {errors.servings && <span className="text-red-500 text-sm">{errors.servings.message}</span>}
            </section>

            {/* Comentarios */}
            <section className="mb-4">
              <label className="block text-black font-medium mb-2">Comentarios</label>
              <textarea
                className="w-full p-2 border border-black rounded"
                {...register("comment")}
              ></textarea>
            </section>

            {/* Fecha de creación */}
            <section className="mb-4">
              <label className="block text-black font-medium mb-2">Fecha de creación</label>
              <input
                type="date"
                className="w-full p-2 border border-black rounded"
                {...register("creationDate", { required: "Este campo es obligatorio." })}
              />
              {errors.creationDate && (
                <span className="text-red-500 text-sm">{errors.creationDate.message}</span>
              )}
            </section>

            {/* Estado */}
            <section className="mb-4">
              <label className="block text-black font-medium mb-2">Estado</label>
              <select
                className="w-full p-2 border border-black rounded"
                {...register("recipeStatus", { required: "Seleccione un estado." })}
              >
                <option value="ACTIVE">Activo</option>
                <option value="INACTIVE">Inactivo</option>
              </select>
              {errors.recipeStatus && (
                <span className="text-red-500 text-sm">{errors.recipeStatus.message}</span>
              )}
            </section>

            {/* Botón Guardar */}
            <section>
              <button
                type="submit"
                className="w-full p-2 bg-black text-white font-medium rounded hover:bg-gray-800"
              >
                Guardar
              </button>
            </section>
          </form>
        </div>
      </div>
    </>
  );
}

export { CreateRecipes };
