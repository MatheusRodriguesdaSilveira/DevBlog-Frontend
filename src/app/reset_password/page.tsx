"use client";

import { useToast } from "@/hooks/use-toast";
import { api } from "@/services/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, [searchParams]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await api.post("/reset", { token, password, passwordConfirmation });
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      alert("Erro ao redefinir senha. Tente novamente.");
    } finally {
      router.push("/");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-lg w-full">
          <div
            style={{
              boxShadow:
                "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            className="bg-gray-800 rounded-lg shadow-xl overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-center text-3xl font-extrabold text-white">
                Redefinir Senha
              </h2>
              <div className="flex mt-4 justify-center text-center gap-1 text-gray-400">
                Token: <p className="text-white font-bold">{token}</p>
              </div>
              <div className="mt-8 space-y-6">
                <div className="rounded-md shadow-sm">
                  <div>
                    <input
                      type="password"
                      className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                      placeholder="Nova Senha"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mt-4">
                    <input
                      type="password"
                      placeholder="Confirmar Nova Senha"
                      className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <button
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-zinc-200 bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleSubmit}
                  >
                    Redefinir Senha
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-1 items-center justify-center px-8 py-4 bg-gray-700 text-center">
              <span className="text-gray-400 flex">
                equipe<p className="text-red-500">@</p>devblog.com.br{" | "}
              </span>{" "}
              <p className="text-gray-400">All rights reserved{" | "} </p>
              <a
                className="font-medium text-red-500 hover:text-red-400"
                href="https://www.linkedin.com/in/matheus-rodrigues-da-silveira/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
