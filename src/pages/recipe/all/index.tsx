
import { useState, useEffect } from "react";
import Navbar from "../../../components/sales_components/navbars/navbar_home_admin";
import { instance } from "../../../service/api";
import type { createRecipe, Ingredient } from "../../../types/recipe";
import { useNavigate, useLocation } from "react-router";
import GenerateData from "../../../service/generateRoute";

function RecipeTable() {
  const [recipes, setRecipes] = useState<createRecipe[]>([])
  const [selectedRecipe, setSelectedRecipe] = useState<createRecipe | null>(null);
  const [editingRecipe, setEditingRecipe] = useState<createRecipe | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const userRole = queryParams.get("role");
  const token = queryParams.get("token");
  const userId = queryParams.get("id");
  useEffect(() => {
    if (!userRole || userRole == "") {
      navigate("/");
    }
  }, [userRole, navigate]);


  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await instance.get("api/recipes/all");
        const data = response.data.map((recipe: createRecipe) => ({
          ...recipe,
          creationDate: new Date(recipe.creationDate),
        }));
        setRecipes(data);
      } catch (error) {
        console.error("Error al cargar recetas:", error);
      }
    };

    fetchRecipes();
  });

  const handleSelectRecipe = (recipe: createRecipe) => {
    setSelectedRecipe(recipe);
    setEditingRecipe(null);
  };

  const handleUpdateRecipe = (recipe: createRecipe) => {
    setEditingRecipe({ ...recipe });
    setSelectedRecipe(null);
  };

  const handleSaveChanges = async (updatedRecipe: createRecipe) => {
    try {
      const recipeStatus =
        updatedRecipe.recipeStatus ? "ACTIVE" : "INACTIVE";

      await instance.put(`api/recipes/update/${updatedRecipe.id}`, {
        id: updatedRecipe.id,
        name: updatedRecipe.name,
        ingredientes: updatedRecipe.ingredients,
        instructions: updatedRecipe.instructions,
        preparationTime: updatedRecipe.preparationTime,
        servings: updatedRecipe.servings,
        comment: updatedRecipe.comment,
        creationDate: updatedRecipe.creationDate,
        recipeStatus: recipeStatus,
      });

      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        )
      );
      console.log("Receta actualizada:", updatedRecipe);
      setEditingRecipe(null);
    } catch (error) {
      console.error("Error al actualizar receta:", error);
    }
  };

  const handleDeleteRecipe = async (id: string) => {
    try {
      await instance.delete(`api/recipes/delete/${id}`);
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== id)
      );
      console.log("Receta eliminada:", id);
    } catch (error) {
      console.error("Error al eliminar receta:", error);
    }
  };

  const handleAddRecipe = () => {
    navigate("/recipes" + GenerateData(userRole || "", userId || "", token || ""))
    console.log("Agregar nueva receta");
  };



  const renderStatus = (status: string): React.ReactNode => {
    if (status == "ACTIVE") {
      return status;
    }
    else {
      return status;
    }
  };

  return (
    <>
      <Navbar userRole={userRole || ""} userId={userId || ""} token={token || ""} />
      <div className="bg-gray-200 text-black font-serif">
        <div className="flex justify-center items-center h-screen">
          {/* <div className="bg-white rounded-xl w-full md:w-3/4 lg:w-2/3 p-6"> */}
          <div className="h-screen overflow-y-auto p-6 bg-white">
            <h2 className="text-lg text-black">Lista de Recetas</h2>
            <div className="overflow-y-auto max-h-[400px] border rounded-lg mb-6">
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr className="bg-gray-300">
                    <th className="border px-4 py-2 text-left">Nombre</th>
                    <th className="border px-4 py-2 text-left">Tiempo de Preparación</th>
                    <th className="border px-4 py-2 text-left">Porciones</th>
                    <th className="border px-4 py-2 text-left">Estado</th>
                    <th className="border px-4 py-2 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {recipes.map((recipe) => (
                    <tr
                      key={recipe.id}
                      className="hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectRecipe(recipe)}
                    >
                      <td className="border px-4 py-2">{recipe.name}</td>
                      <td className="border px-4 py-2">{recipe.preparationTime} min</td>
                      <td className="border px-4 py-2">{recipe.servings}</td>
                      <td className="border px-4 py-2">{renderStatus(recipe.recipeStatus)}</td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateRecipe(recipe);
                          }}
                          className="bg-blue-500 text-white px-3 py-1 rounded-full mr-2"
                        >
                          Editar
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteRecipe(recipe.id);
                          }}
                          className="bg-red-500 text-white px-3 py-1 rounded-full"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedRecipe && !editingRecipe && (
              <div className="mt-6 p-4 border bg-gray-100 rounded-lg">
                <h3 className="text-lg text-black">Detalles de la Receta</h3>
                <p><strong>Nombre:</strong> {selectedRecipe.name}</p>
                <p><strong>Tiempo de Preparación:</strong> {selectedRecipe.preparationTime} min</p>
                <p><strong>Porciones:</strong> {selectedRecipe.servings}</p>
                <p><strong>Ingredientes:</strong></p>
                <ul>
                  {selectedRecipe.ingredients.map((ingredient: Ingredient, index: number) => (
                    <li key={index}>
                      {ingredient.quantity} {ingredient.unitOfMeasure} de {ingredient.productId}{" "}
                      {ingredient.additionalNotes && `(${ingredient.additionalNotes})`}
                    </li>
                  ))}
                </ul>
                <p><strong>Estado:</strong> {renderStatus(selectedRecipe.recipeStatus)}</p>
              </div>
            )}

            {editingRecipe && (
              <div className="mt-6 p-4 border bg-gray-100 rounded-lg">
                <h3 className="text-lg text-black">Editar Receta</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveChanges(editingRecipe);
                  }}
                >
                  {/* Formulario de edición */}
                  <label className="block mt-2">Nombre:</label>
                  <input
                    type="text"
                    value={editingRecipe.name}
                    onChange={(e) =>
                      setEditingRecipe({ ...editingRecipe, name: e.target.value })
                    }
                    className="border rounded px-4 py-2 w-full"
                  />

                  <label className="block mt-4">Tiempo de Preparación (min):</label>
                  <input
                    type="number"
                    value={editingRecipe.preparationTime}
                    onChange={(e) =>
                      setEditingRecipe({
                        ...editingRecipe,
                        preparationTime: Number(e.target.value),
                      })
                    }
                    className="border rounded px-4 py-2 w-full"
                  />

                  <label className="block mt-4">Porciones:</label>
                  <input
                    type="number"
                    value={editingRecipe.servings}
                    onChange={(e) =>
                      setEditingRecipe({
                        ...editingRecipe,
                        servings: Number(e.target.value),
                      })
                    }
                    className="border rounded px-4 py-2 w-full"
                  />

                  <label className="block mt-4">Ingredientes:</label>
                  {editingRecipe.ingredients.map((ingredient, index: number) => (
                    <div key={index} className="mt-2">
                      <input
                        type="text"
                        value={ingredient.productId}
                        placeholder="Producto"
                        onChange={(e) => {
                          const updatedIngredients = [...editingRecipe.ingredients];
                          updatedIngredients[index] = {
                            ...updatedIngredients[index],
                            productId: e.target.value,
                          };
                          setEditingRecipe({ ...editingRecipe, ingredients: updatedIngredients });
                        }}
                        className="border rounded px-4 py-2 mr-2"
                      />
                      <input
                        type="number"
                        value={ingredient.quantity}
                        placeholder="Cantidad"
                        onChange={(e) => {
                          const updatedIngredients = [...editingRecipe.ingredients];
                          updatedIngredients[index] = {
                            ...updatedIngredients[index],
                            quantity: Number(e.target.value),
                          };
                          setEditingRecipe({ ...editingRecipe, ingredients: updatedIngredients });
                        }}
                        className="border rounded px-4 py-2 mr-2"
                      />
                      <input
                        type="text"
                        value={ingredient.unitOfMeasure}
                        placeholder="Unidad"
                        onChange={(e) => {
                          const updatedIngredients = [...editingRecipe.ingredients];
                          updatedIngredients[index] = {
                            ...updatedIngredients[index],
                            unitOfMeasure: e.target.value,
                          };
                          setEditingRecipe({ ...editingRecipe, ingredients: updatedIngredients });
                        }}
                        className="border rounded px-4 py-2"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updatedIngredients = [...editingRecipe.ingredients];
                          updatedIngredients.splice(index, 1);
                          setEditingRecipe({ ...editingRecipe, ingredients: updatedIngredients });
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded-full ml-2"
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setEditingRecipe({
                        ...editingRecipe,
                        ingredients: [
                          ...editingRecipe.ingredients,
                          { productId: "", quantity: 0, unitOfMeasure: "", additionalNotes: "" },
                        ],
                      });
                    }}
                    className="bg-green-500 text-white px-4 py-2 rounded-full mt-2"
                  >
                    Agregar Ingrediente
                  </button>

                  <label className="block mt-4">Estado:</label>
                  <select
                    value={editingRecipe.recipeStatus}
                    onChange={(e) =>
                      setEditingRecipe({
                        ...editingRecipe,
                        recipeStatus: e.target.value === "ACTIVE" ? "ACTIVE" : "INACTIVE",
                      })
                    }
                    className="border rounded px-4 py-2 w-full"
                  >
                    <option value="ACTIVE">Activo</option>
                    <option value="INACTIVE">Inactivo</option>
                  </select>

                  <div className="flex justify-end mt-6">
                    <button
                      type="button"
                      onClick={() => setEditingRecipe(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-full mr-2"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-full"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="flex justify-center mt-6">
              <button
                onClick={handleAddRecipe}
                className="bg-green-500 text-white px-6 py-2 rounded-full"
              >
                Agregar Receta
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { RecipeTable };
