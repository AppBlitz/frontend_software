import { instance } from "./api";
import Routes_api_java from "../routes/Routes_apis_java";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await instance.post(`${Routes_api_java.url_base}${Routes_api_java.login}`, {
      email,
      password,
    });

    if (response.status === 200) {
      return { success: true, roll: response.data.roll, id: response.data.id, phoneNumber: response.data.phoneNumber };
    } else {
      return { success: false, message: response.data.error || "Ocurrió un problema" };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.error || "No se pudo conectar con el servidor",
    };
  }
};
