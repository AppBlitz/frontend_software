import { useNavigate } from "react-router"
function User() {
  const history = useNavigate()
  return (
    <div className="flex space-x-4">
      <a className="font-serif text-white hover:text-blue-400 cursor-pointer " 
      onClick={() => history("/about")}>sobre nosotros</a>
    </div>
  )
}
export { User }
