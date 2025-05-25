import { useNavigate } from "react-router"
function BackPrincipal() {
  const history = useNavigate()
  return (
    <div className="flex space-x-4">
      <button onClick={() => history("/")} className="bg-black font-serif text-white hover:text-blue-400 cursor-pointer">Regresar</button>
    </div>
  )
}
export { BackPrincipal }
