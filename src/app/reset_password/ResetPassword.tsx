import { api } from "@/services/api";
import FormData from "form-data";
import { useState } from "react";

export const ResetPasswordPage = () => {
  
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("token", token);
    formData.append("password", password);
    formData.append("passwordConfirmation", passwordConfirmation);

    try {

      await api.post("/reset", formData); 

    } catch (error) {
      console.error("Erro ao criar post:", error);
      alert("Erro ao criar post. Verifique os dados e tente novamente.");
    } finally {
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Redefinir Senha</h1>
      <p className="mt-4">Token do usuário: {token}</p>
      <div>
        <input
          type="password"
          placeholder="Nova Senha"
          className="border border-gray-300 rounded px-4 py-2 mt-4"
        />
        <input
          type="password"
          placeholder="Confirmar Nova Senha"
          className="border border-gray-300 rounded px-4 py-2 mt-4"
        />
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Redefinir Senha
        </button>
      </div>
    </div>
  );
};
