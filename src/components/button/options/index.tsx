import { useNavigate } from "react-router"
function Options() {
  const history = useNavigate();
  return (

    <div className="flex justify-center space-x-4">
      <a onClick={() => history("/employee")} className="font-serif text-white hover:text-blue-400 cursor-pointer" > empleados</a>
      <a className="font-serif text-white hover:text-blue-400 cursor-pointer"> | </a>
      <a onClick={() => history("/supplier")} className="font-serif text-white hover:text-blue-400 cursor-pointer"> proveedores</a>
      <a className="font-serif text-white hover:text-blue-400 cursor-pointer"> | </a>
      <a onClick={() => history("/recipe/all")} className="font-serif text-white hover:text-blue-400 cursor-pointer" >Recetas</a>
      <a className="font-serif text-white hover:text-blue-400 cursor-pointer"> | </a>

      <a onClick={() => history("/product")} className="font-serif text-white hover:text-blue-400 cursor-pointer"> Product</a>
      <a className="font-serif text-white hover:text-blue-400 cursor-pointer"> | </a>
      <a onClick={() => history("/sale/login")} className="font-serif text-white hover:text-blue-400 cursor-pointer" > Ventas</a>

    </div>
  );
}
export { Options }
