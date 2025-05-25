import Form_login from "../../components/sales_components/sections/form_login";
import Navbar_login from "../../components/sales_components/navbars/navbar_login";
import { Footer } from "../../components/sales_components/footer_sales";
import { useNavigate, useLocation } from "react-router-dom";
export function Login_ventas() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userRole = queryParams.get("role");
  //const token = queryParams.get("token");
  //const userId = queryParams.get("id");

  const navigate = useNavigate();
  if (!userRole || userRole == "") {
    navigate("/");
  }
  return (
    <div>

      <Navbar_login />

      <div className="bg-gray-200 text-white font-serif flex items-center justify-center h-screen">
        <div className="bg-white rounded-xl w-96 h-122 p-6 shadow-lg">
          <Form_login />
        </div>
      </div>
      <Footer />
    </div>
  );
}
