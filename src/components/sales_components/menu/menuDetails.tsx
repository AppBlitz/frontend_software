import React, { useState, useEffect } from "react";
import "../css/orderManagement.css";
import ActionButton from "../../generics/button_action";
import Routes_api_java from "../../../routes/Routes_apis_java";
import Combobox from "../../generics/combobox";
import { useLocation } from "react-router-dom";
// Definición de la interfaz para los elementos de pedido
interface MenuItem {
  id: string;
  nombre: string;
  tipo: "producto" | "receta"; // Indica si es un producto o una receta
  price: number;
  cantidad: number;
  categoria: "DRINK" | "BREAKFAST" | "LUNCH" | "FOOD" | "DINNER"
}
interface SelectItem {
  id: string;
  nombre: string;
  tipo: "producto" | "receta"; // Indica si es un producto o una receta
  price: number;
  cantidad: number;
}
// Definición de la interfaz para los elementos de pedido
interface ProductoItem {
  id: string;
  nameProduct: string;
  priceProduct: number;
  stock: number;
}

// Definición de la interfaz para los elementos de pedido
interface PlatilloItem {
  id: string;
  name: string;
  servings: number;
  price: number;
}

interface GuardarMenu {
  name: string;
  idkitchenEmployee: string | null;
  description: string;
  items: {
    recipe: string | null;
    product: string | null;
    categoriItem: string;
  }[];
}
const OrdersManagement: React.FC = () => {
  // Estados para almacenar productos, recetas y elementos seleccionados
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [productos, setProductos] = useState<ProductoItem[]>([]);
  const [recetas, setPlatillos] = useState<PlatilloItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<SelectItem | null>(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<"DRINK" | "BREAKFAST" | "LUNCH" | "FOOD" | "DINNER">("FOOD");

  // Cargar los productos desde la API al montar el componente
  useEffect(() => {
    fetch(Routes_api_java.url_base + Routes_api_java.obtener_productos)
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error("Error al obtener productos:", error));
  }, []);

  // Cargar las recetas desde la API al montar el componente
  useEffect(() => {
    fetch(Routes_api_java.url_base + Routes_api_java.obtener_recetas)
      .then(response => response.json())
      .then(data => setPlatillos(data))
      .catch(error => console.error("Error al obtener recetas:", error));
  }, []);

  // Función para agregar un elemento al menú y eliminarlo de la lista original
  const agregarAlMenu = (categoria2: "DRINK" | "BREAKFAST" | "LUNCH" | "FOOD" | "DINNER") => {
    if (selectedItem) {
      const menu: MenuItem =
      {
        id: selectedItem.id,
        nombre: selectedItem.nombre,
        tipo: selectedItem.tipo,
        price: selectedItem.price,
        cantidad: selectedItem.cantidad,
        categoria: categoria2
      }
      setMenuItems([...menuItems, menu]);

      if (selectedItem.tipo === "producto") {
        setProductos(productos.filter(item => item.id !== selectedItem.id));
      } else {
        setPlatillos(recetas.filter(item => item.id !== selectedItem.id));
      }

      // Resetear el elemento seleccionado
      setSelectedItem(null);
    }
  };
  const moveMenuToProducto = (item: MenuItem) => {
    const producto: ProductoItem =
    {
      id: item.id,
      nameProduct: item.nombre,
      priceProduct: item.price,
      stock: item.cantidad,
    };
    setProductos([...productos, producto]);
  }
  const moveMenuToPlatillo = (item: MenuItem) => {
    const platillo: PlatilloItem =
    {
      id: item.id,
      name: item.nombre,
      price: item.price,
      servings: item.cantidad,
    };
    setPlatillos([...recetas, platillo]);
  }

  const selectProducto = (item: ProductoItem) => {
    const producto: SelectItem =
    {
      id: item.id,
      nombre: item.nameProduct,
      tipo: "producto",
      cantidad: item.stock,
      price: item.priceProduct,
    };
    setSelectedItem(producto);
  }
  const selectPlatillo = (item: PlatilloItem) => {
    const platillo: SelectItem =
    {
      id: item.id,
      nombre: item.name,
      tipo: "receta",
      cantidad: item.servings,
      price: item.price,

    };
    setSelectedItem(platillo);
  }
  // Función para eliminar un elemento del menú y devolverlo a la lista original
  const eliminarDelMenu = (id: string) => {
    const item = menuItems.find(element => element.id === id);
    if (item) {
      if (item.tipo === "producto") {
        moveMenuToProducto(item);
      } else {
        moveMenuToPlatillo(item);
      }
    }
    setMenuItems(menuItems.filter(element => element.id !== id));
  };
  const location = useLocation(); // Inicializamos useNavigate
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("id");

  const guardarMenu = async () => {
    try {
      const menuData: GuardarMenu = {
        name: "prueba2", // Define un valor válido para el nombre
        idkitchenEmployee: userId || null,
        description: "chao mundo", // Define una descripción adecuada
        items: menuItems.map(item => ({
          recipe: item.tipo === "producto" ? null : item.id || null, // Si es producto, recipe es null
          product: item.tipo === "producto" ? item.id || null : null, // Si no es producto, product es null
          categoriItem: item.categoria,
        }))
      };

      const response = await fetch(Routes_api_java.url_base + Routes_api_java.guardar_menu, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menuData) // Enviar el objeto con la estructura correcta
      });

      if (!response.ok) {
        throw new Error("Error al guardar el menú");
      }

      const data = await response.json();
      console.log("Menú guardado correctamente:", data);
      alert("Menú guardado correctamente.");
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Hubo un problema al guardar el menú.");
    }
  };
  return (
    <div className="orders-container">
      <div className="orders-layout">
        {/* Sección de productos */}
        <div className="orders-section">
          <h3>Productos</h3>
          <table className="orders-table">
            <thead>
              <tr><th>Nombre</th><th>Precio</th><th>Cantidad</th></tr>
            </thead>
            <tbody>
              {productos.map(prod => (
                <tr key={prod.id} onClick={() => selectProducto(prod)} className={selectedItem?.id === prod.id ? "selected-row" : ""}>
                  <td>{prod.nameProduct}</td>
                  <td>{prod.priceProduct}</td>
                  <td>{prod.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sección de recetas */}
        <div className="orders-section">
          <h3>Platillos</h3>
          <table className="orders-table">
            <thead>
              <tr><th>Nombre</th><th>Precio</th><th>Cantidad</th></tr>
            </thead>
            <tbody>
              {recetas.map(rec => (
                <tr key={rec.id} onClick={() => selectPlatillo(rec)} className={selectedItem?.id === rec.id ? "selected-row" : ""}>
                  <td>{rec.name}</td>
                  <td>{rec.price}</td>
                  <td>{rec.servings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sección para agregar elementos al menú */}
      {selectedItem && (
        <div className="orders-definition">
          <h3>Agregar al Menú</h3>
          <p><strong>{selectedItem.nombre}</strong></p>

          {/* Combobox para seleccionar categoría */}
          <Combobox
            items={["DRINK", "BREAKFAST", "LUNCH", "FOOD", "DINNER"]}
            onSelect={(categoria: "DRINK" | "BREAKFAST" | "LUNCH" | "FOOD" | "DINNER") => setCategoriaSeleccionada(categoria)}
            renderItem={(categoria) => categoria}
            placeholder="Selecciona una categoría"
          />

          <ActionButton label="Agregar al Menú" onClickAction={() => agregarAlMenu(categoriaSeleccionada)} />
        </div>
      )}

      {/* Sección del menú actual */}
      <div className="orders-menu">
        <h3>Menú</h3>
        <table className="orders-table">
          <thead>
            <tr><th>Nombre</th><th>Tipo</th><th>Categoria</th><th>Precio</th><th>Cantidad</th><th>Acción</th></tr>
          </thead>
          <tbody>
            {menuItems.map(item => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>{item.tipo}</td>
                <td>{item.categoria}</td>
                <td>{item.price}</td>
                <td>{item.cantidad}</td>
                <td><ActionButton label="Eliminar" onClickAction={() => eliminarDelMenu(item.id)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón para guardar el menú si hay elementos */}
      {menuItems.length > 0 && (
        <div className="orders-actions">
          <ActionButton label="Guardar" onClickAction={guardarMenu} />
        </div>
      )}

    </div>
  );
};

export default OrdersManagement;
