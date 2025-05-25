import { Header } from "../../components"
import { useForm } from "react-hook-form"
import type { registerUser } from "../../types/user"
import { instance } from "../../service/api"

function Register() {
  const { register, handleSubmit } = useForm<registerUser>()
  function registerUser(userRegister: registerUser) {
    // FIX: This add url of register user
    instance.post("", {
      data: {
        nameComple: userRegister.nameComple,
        emailUser: userRegister.emailUser,
        passwordUser: userRegister.passwordUser,
      }
    })
  }
  return (<>
    <Header />
    <div className="bg-gray-200 text-black font-serif">
      <div className="flex justify-self-center items-center h-screen">
        <div className="bg-white rounded-xl w-96 h-112" >
          <form onSubmit={handleSubmit(registerUser)}>
            <section>
              <h1 className="pl-5 py-2 text-black text-lg">Registro</h1>
            </section>
            <section className="pl-10 py-1">
              <p >Bienvenido al restaurante Ilios</p>
            </section>
            <section className="pt-8">
              <label className="flex justify-self-center">Nombre completo</label>
              <section className="flex justify-self-center">
                <input type="text" className="w-72 h-10 border border-color-black rounded-full text-black text-left pl-3"{...register("nameComple", { required: true })} />
              </section>
            </section>
            <section className="pt-8">
              <label className="flex justify-self-center">Correo eléctronico</label>
              <section className="felx justify-self-center">
                <input type="text" className="w-72 h-10 border border-color-black rounded-full text-black text-left pl-3"{...register("emailUser", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })} />
              </section>
            </section>
            <section className="pt-8">
              <label className="flex justify-self-center">Contraseña</label>
              <section className="flex justify-self-center">
                <input type="password" className="w-72 border border-color-black rounded-full h-10 text-left pl-3"{...register("passwordUser", { required: true })} />
              </section>
            </section>
            <section className="flex justify-center pt-10">
              <button className="hover:cursor-pointer" type="submit">Registrarse</button>
            </section>
          </form>
        </div>
      </div>
    </div>
  </>)
}
export { Register }
