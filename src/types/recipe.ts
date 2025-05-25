export type createRecipe = {
  id: string
  name: string
  instructions: string
  preparationTime: number
  servings: number
  comment: string
  creationDate: Date
  recipeStatus: string
  ingredients: Ingredient[]
}
export type Ingredient = {
  productId: string
  quantity: number
  unitOfMeasure: string
  additionalNotes: string
}
export type Estate = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE"
}

export type Recipesconsult = {
  Action: string
  time: string
  details: string
}
