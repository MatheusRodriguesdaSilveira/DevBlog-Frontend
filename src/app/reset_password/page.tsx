"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { api } from "@/services/api";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extraindo o token de forma segura
  const token = useMemo(() => searchParams.get("token"), [searchParams]);

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await api.post("/reset", { token, password, passwordConfirmation });
      router.push("/");
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      alert("Erro ao redefinir senha. Tente novamente.");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-lg w-full">
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-center text-3xl font-extrabold text-white">
              Redefinir Senha
            </h2>
            <div className="flex mt-4 justify-center text-center gap-1 text-gray-400">
              Token: <p className="text-white font-bold">{token}</p>
            </div>
            <div className="mt-8 space-y-6">
              <input
                type="password"
                className="w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-red-500"
                placeholder="Nova Senha"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirmar Nova Senha"
                className="w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-red-500 mt-4"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
              <button
                className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-zinc-200 rounded-md"
                onClick={handleSubmit}
              >
                Redefinir Senha
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
