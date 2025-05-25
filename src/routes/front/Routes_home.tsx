import {
  ProductHistory, CreateEmployee
  , ProductCards, CreateRecipes
  , SupplierTable,
  RecipeTable,
  RegisterSupplier
} from "../../pages";
import Home_sales from "../../pages/sales/home";
import ProtectedRoute from "../../components/utils/protectedRoute";

export const Routes_home = [
  {
    path: "/productsAdmin",
    Component: () => (
      <ProtectedRoute>
        <ProductHistory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/employee",
    Component: () => (
      <ProtectedRoute>
        <CreateEmployee />
      </ProtectedRoute>
    ),
  },
  {
    path: "/supplier",
    Component: () => (
      <ProtectedRoute>
        <SupplierTable />
      </ProtectedRoute>
    ),
  },
  {
    path: "/product",
    Component: () => (
      <ProtectedRoute>
        <ProductCards />
      </ProtectedRoute>
    ),
  },
  {
    path: "/recipes/all",
    Component: () => (
      <ProtectedRoute>
        <RecipeTable />
      </ProtectedRoute>
    ),
  },
  {
    path: "/recipes",
    Component: () => (
      <ProtectedRoute>
        <CreateRecipes />
      </ProtectedRoute>
    ),
  },
  {
    path: "/home",
    Component: () => (
      <ProtectedRoute>
        <Home_sales />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register/supplier",
    Component: () => (
      <ProtectedRoute>
        <RegisterSupplier />
      </ProtectedRoute>
    ),
  },
]


