
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../service/loginSevice";
import ActionButton from "../generics/button_action";
import GenerateToken from "../../service/genearteToken";
import GenerateData from "../../service/generateRoute";
interface LoginFormProps {
  onLoginMessage: (message: string) => void;
}
interface FormData {
  emailUser: string;
  passwordUser: string;
}
export const LoginForm: React.FC<LoginFormProps> = ({ onLoginMessage }) => {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate(); // Inicializa useNavigate
  const onSubmit = async (data: { emailUser: string; passwordUser: string }) => {
    const result = await loginUser(data.emailUser, data.passwordUser);

    if (result.success && result.roll) {
      const token = GenerateToken(result.roll, result.id);

      navigate('/home' + GenerateData(result.roll, result.id, token));

    } else {
      console.warn("Error:", result.message);
    }

    onLoginMessage(result.message);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-black text-lg pl-4 pt-4">Login</h2>
      <p className="text-black text-xs pl-8 pt-2">Inicia sesión para acceder al módulo de ventas</p>

      <div className="pt-10">
        <label className="text-black block text-center">Correo electrónico</label>
        <input
          id="email"
          type="text"
          className="w-70 h-10 border border-black rounded-full text-black text-center"
          placeholder="Email"
          {...register("emailUser", {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          })}
        />
      </div>

      <div className="pt-10">
        <label className="text-black block text-center">Contraseña</label>
        <input
          id="password"
          type="password"
          className="border border-black rounded-full w-70 h-10 text-black text-center"
          placeholder="Password"
          {...register("passwordUser", { required: true })}
        />
      </div>

      <div className="flex justify-center pt-6">
        <ActionButton label="Ingresar" onClickAction={handleSubmit(onSubmit)} />
      </div>
    </form>
  );
};
