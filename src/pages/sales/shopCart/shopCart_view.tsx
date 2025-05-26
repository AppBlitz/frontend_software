import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Routes_api_java from "../../../routes/Routes_apis_java";
import Navbar from "../../../components/sales_components/navbars/navbar_shopCart";
import { Footer } from "../../../components/sales_components/footer_sales";
interface Order {
  id: string;
  dateCreation: string;
  stateCart: "PENDING" | "PAID" | "INACTIVE";
  items: Items[];
  total: number;
}

interface Items {
  menuItem: {
    recipe: string;
    product: string;
    categoriItem: string;
  };
  amountServings: number;
  restServings: number;
}

const ShopCart_new: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const userRole = queryParams.get("role");
  const token = queryParams.get("token");
  const userId = queryParams.get("id");
  const pedidoId = queryParams.get("id_carrito");
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!userRole || userRole === "") {
      navigate("/sale/login");
    }
  }, [userRole, navigate]);

  useEffect(() => {
    if (pedidoId) {
      fetch(`${Routes_api_java.url_base}${Routes_api_java.obtener_pedido}${pedidoId}`)
        .then((response) => response.json())
        .then((data) => setOrder(data))
        .catch((error) => console.error("Error al obtener pedido:", error));
    }
  }, [pedidoId]);

  return (
    <div>
      <Navbar userRole={userRole || ""} userId={userId || ""} token={token || ""} />
      <div style={styles.shopcartContainer}>
        <h2 style={styles.title}>Pedido #{order?.id}</h2>

        {order ? (
          <div style={styles.orderDetails}>
            <p><strong>Fecha de Creación:</strong> {order.dateCreation}</p>
            <p><strong>Estado:</strong> <span style={getStatusStyle(order.stateCart)}>{order.stateCart}</span></p>
            <p><strong>Total:</strong> <span style={styles.totalPrice}>${order.total}</span></p>

            {/* Items del pedido */}
            <h3 style={styles.sectionTitle}>Items del Pedido</h3>
            <div style={styles.itemsGrid}>
              {order.items.map((item, index) => (
                <div key={index} style={styles.itemCard}>
                  <h4 style={styles.itemTitle}>{item.menuItem.categoriItem}</h4>
                  <p><strong>Producto:</strong> {item.menuItem.product || "N/A"}</p>
                  <p><strong>Receta:</strong> {item.menuItem.recipe || "N/A"}</p>
                  <p><strong>Cantidad:</strong> {item.amountServings}</p>
                  <p><strong>Restante:</strong> {item.restServings}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p style={styles.loadingMessage}>Cargando pedido...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

// 🎨 Función para definir los estilos de estado correctamente
const getStatusStyle = (state: "PENDING" | "PAID" | "INACTIVE"): React.CSSProperties => {
  switch (state) {
    case "PENDING":
      return { fontWeight: "bold", color: "#ffc107" };
    case "PAID":
      return { fontWeight: "bold", color: "#28a745" };
    case "INACTIVE":
      return { fontWeight: "bold", color: "#dc3545" };
    default:
      return {};
  }
};

// 🎨 Estilos embebidos con tipado correcto
const styles: { [key: string]: React.CSSProperties } = {
  shopcartContainer: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    maxWidth: "800px",
    margin: "auto",
  },
  title: {
    color: "#007bff",
    borderBottom: "2px solid #ddd",
    paddingBottom: "8px",
    textAlign: "center",
  },
  orderDetails: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  sectionTitle: {
    marginTop: "20px",
    fontSize: "18px",
  },
  totalPrice: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#28a745",
  },
  itemsGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  itemCard: {
    background: "#f8f9fa",
    padding: "15px",
    borderRadius: "6px",
    width: "45%",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  itemTitle: {
    color: "#007bff",
    marginBottom: "8px",
  },
  loadingMessage: {
    textAlign: "center",
    fontSize: "18px",
    color: "#777",
  },
};

export default ShopCart_new;
