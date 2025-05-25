import { instance } from "../../../service/api";
import type { createRecipe } from "../../../types/recipe";

function saveRecipe(recipe: createRecipe) {
  console.log(recipe);
  let state: string = "INACTIVE";
  if (recipe.recipeStatus.toString() === "1") {
    state = "ACTIVE";
  }
  instance.post("api/recipes/add", {
    name: recipe.name,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    preparationTime: recipe.preparationTime,
    servings: recipe.servings,
    comment: recipe.comment,
    creationDate: recipe.creationDate,
    recipeStatus: state
  })
}
export { saveRecipe }
