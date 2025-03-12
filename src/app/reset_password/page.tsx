"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/services/api";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ResetPasswordContent />
    </Suspense>
  );
}

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = useMemo(() => searchParams.get("token"), [searchParams]);

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirmation, setIsVisibleConfirmation] = useState(false);

  const togglePasswordVisible = () => {
    setIsVisible(!isVisible);
  };
  const togglePasswordConfirmationVisible = () => {
    setIsVisibleConfirmation(!isVisibleConfirmation);
  };

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
            <div className="my-5 gap-2">
              <div className="relative mb-2 flex justify-center items-center w-full">
                <input
                  type={isVisible ? "text" : "password"}
                  className="w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-red-500"
                  placeholder="Nova Senha"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <div
                  onClick={togglePasswordVisible}
                  className="absolute right-4 cursor-pointer"
                >
                  {isVisible ? (
                    <EyeOff className="text-gray-400" />
                  ) : (
                    <Eye className="text-gray-400" />
                  )}
                </div>
              </div>

              <div className="relative flex justify-center items-center w-full">
                <input
                  type={isVisibleConfirmation ? "text" : "password"}
                  className="w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-red-500"
                  placeholder="Confirmar Nova Senha"
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  value={passwordConfirmation}
                  required
                />
                <div
                  onClick={togglePasswordConfirmationVisible}
                  className="absolute right-4 cursor-pointer"
                >
                  {isVisibleConfirmation ? (
                    <EyeOff className="text-gray-400" />
                  ) : (
                    <Eye className="text-gray-400" />
                  )}
                </div>
              </div>
            </div>
            <div className="mt-8">
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

//  Loading
function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-white">Carregando...</p>
    </div>
  );
}
