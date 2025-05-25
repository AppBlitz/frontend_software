import Navbar from "../../../components/sales_components/navbars/navbar_home_admin";
import { useState, useEffect } from "react";
import type { Products } from "../../../types/Product";
import { MovementForm } from "../../../pages/product/movement/index"
import type { Movementsconsult } from "../../../types/movementProduct";
import { instance } from "../../../service/api";
import type { Employee } from "../../../types/employee";
import { useNavigate, useLocation } from "react-router";


const ProductHistory = () => {
  const [products, setProducts] = useState<Products[] | null>([]);
  const [selectedProduct, setSelectedProduct] = useState<Products | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [productToMove, setProductToMove] = useState<Products | null>(null);

  const [showQueryModal, setShowQueryModal] = useState(false);
  const [queryResults, setQueryResults] = useState<Movementsconsult[] | null>(null);

  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [employeeMovements, setEmployeeMovements] = useState<Movementsconsult[] | null>(null);

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


  const handleRegisterMovement = (product: Products) => {
    setProductToMove(product);
    setShowModal(true);

  };

  useEffect(() => {
    instance.get("product/allProducts")
      .then((response) => {
        const formattedProducts = response.data.map((product: Products) => ({
          ...product,
          images: product.images || [],
        }));
        setProducts(formattedProducts);
      })
      .catch((error) => {
        console.error("Error al cargar los productos:", error);
        setProducts([]);
      });
  }, []);

  useEffect(() => {
    instance.get("/employees/getAll").then((res) => {
      setEmployees(res.data);
    }).catch((err) => {
      console.error("Error al obtener empleados", err);
    });
  }, []);

  const handleSelectProduct = (product: Products) => {
    setSelectedProduct(selectedProduct?.id === product.id ? null : product);
  };

  const handleEditProduct = (product: Products) => {
    console.log("Editar producto:", product);
    setSelectedProduct(product);
  };

  const handleDeleteProduct = (product: Products) => {
    if (window.confirm(`¿Deseas eliminar el producto "${product.nameProduct}"?`)) {
      setProducts(products ? products.filter((p) => p.id !== product.id) : []);
      setSelectedProduct(null);
    }
  };


  return (
    <>
      <Navbar userRole={userRole || ""} userId={userId || ""} token={token || ""} />
      <div className="bg-gray-200 text-black font-serif min-h-screen flex flex-col items-center p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Lista de Productos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {Array.isArray(products) && products.map((product) => (
            <div
              key={product.id}
              className={`bg-white border rounded-xl shadow-md p-4 hover:shadow-lg transition ${selectedProduct?.id === product.id ? "border-violet-500" : "border-gray-300"}`}
            >
              <div onClick={() => handleSelectProduct(product)} className="cursor-pointer">
                <h2 className="text-lg font-semibold">{product.nameProduct}</h2>
                <p className="text-gray-500 text-sm">Stock: {product.stock}</p>
                <p className="text-gray-500 text-sm">Precio: ${product.priceProduct}</p>
              </div>

              {selectedProduct?.id === product.id && (
                <div className="mt-4 text-sm">
                  <h3 className="font-medium">Detalles</h3>
                  <p>Fechas de Expiración:</p>
                  <ul className="list-disc list-inside">
                    {product.dateExpiration?.map((date, index) => (
                      <li key={index}>
                        {date} ({product.controldateExpiration?.[index] ?? "N/A"} días restantes)
                      </li>
                    )) || "No disponible"}
                  </ul>

                  {product.images.length > 0 && (
                    <div className="mt-2">
                      <h4 className="font-medium">Imágenes:</h4>
                      <div className="flex gap-2 overflow-x-auto">
                        {product.images.map((img, index) => (
                          <img key={index} src={img} alt={`Producto ${product.nameProduct} - ${index + 1}`} className="w-16 h-16 rounded object-cover" />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-4 gap-2 flex-wrap">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600" onClick={(e) => {
                      e.stopPropagation();
                      handleEditProduct(product);
                    }}>Editar</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600" onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProduct(product);
                    }}>Eliminar</button>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600" onClick={(e) => {
                      e.stopPropagation();
                      handleRegisterMovement(product);
                    }}>Registrar Movimiento</button>
                  </div>

                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {showModal && productToMove && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <MovementForm productId={productToMove.id} onClose={() => setShowModal(false)} />
            <div className="mt-4 text-right">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                onClick={() => setShowModal(false)}>
                Cerrar </button>
            </div>
          </div>
        </div>
      )
      }
      <button className="fixed bottom-6 right-6 bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-700 transition"
        onClick={() => setShowQueryModal(true)} > Consultar movimientos en el inventario </button>

      {showQueryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Consultar Movimientos</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const date = (form.elements.namedItem("date") as HTMLInputElement).value;
                const startHour = (form.elements.namedItem("startHour") as HTMLInputElement).value;
                const endHour = (form.elements.namedItem("endHour") as HTMLInputElement).value;

                try {

                  if (startHour && endHour) {
                    const res = await instance.get(`product/movementByRangeHour`, {
                      params: {
                        date,
                        startHour: parseInt(startHour),
                        endHour: parseInt(endHour),
                      },
                    });
                    setQueryResults(res.data);
                  } else {
                    const res = await instance.get(`product/movementByDate`, {
                      params: { date },
                    });
                    setQueryResults(res.data);
                  }

                } catch (error) {
                  console.error("Error al consultar movimientos:", error);
                }
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block font-medium">Fecha:</label>
                  <input type="date" name="date" required className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block font-medium">Hora inicio (opcional):</label>
                  <input type="number" name="startHour" className="w-full border rounded px-3 py-2" min={0} max={23} />
                </div>
                <div>
                  <label className="block font-medium">Hora fin (opcional):</label>
                  <input type="number" name="endHour" className="w-full border rounded px-3 py-2" min={0} max={23} />
                </div>
                <div className="flex justify-end gap-2">
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Consultar
                  </button>
                  <button onClick={() => { setShowQueryModal(false); setQueryResults(null); }} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                    Cerrar
                  </button>
                </div>
              </div>
            </form>

            {queryResults && (
              <div className="mt-6 max-h-60 overflow-y-auto">
                <h3 className="font-semibold mb-2">Resultados:</h3>
                <ul className="list-disc list-inside text-sm">
                  {queryResults.length > 0 ? (
                    queryResults.map((m, i) => (
                      <li key={i}>
                        <span className="font-medium"> {m.action}</span> - [{m.nameProduct}] cantidad : {m.amount} - ({m.reason})
                      </li>
                    ))
                  ) : (
                    <li>No se encontraron movimientos.</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      <button
        className="fixed bottom-6 left-6 bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition"
        onClick={() => setShowEmployeeModal(true)}
      >
        Historial por Empleado
      </button>

      {showEmployeeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Historial por Empleado</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              if (!selectedEmployee || !selectedDate) return;

              try {
                const res = await instance.get("/product/historyEmployee", {
                  params: {
                    employeeId: selectedEmployee,
                    date: selectedDate
                  }
                });
                setEmployeeMovements(res.data);
              } catch (error) {
                console.error("Error al consultar historial del empleado:", error);
              }
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block font-medium">Empleado:</label>
                  <select
                    value={selectedEmployee ?? ""}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    required
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Seleccione un empleado</option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>{emp.nameEmployee}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-medium">Fecha:</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                    Consultar
                  </button>
                  <button
                    onClick={() => { setShowEmployeeModal(false); setEmployeeMovements(null); }}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    type="button"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </form>

            {employeeMovements && (
              <div className="mt-6 max-h-60 overflow-y-auto">
                <h3 className="font-semibold mb-2">Movimientos realizados:</h3>
                <ul className="list-disc list-inside text-sm">
                  {employeeMovements.length > 0 ? (
                    employeeMovements.map((m, i) => (
                      <li key={i}>
                        <span className="font-medium">{m.action}</span> - [{m.nameProduct}] cantidad: {m.amount} - ({m.reason})
                      </li>
                    ))
                  ) : (
                    <li>No trabajó ese día o no hubo movimientos.</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}


    </>
  );
}

export { ProductHistory };
