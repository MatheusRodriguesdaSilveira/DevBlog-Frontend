import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import { api } from "@/services/api"
import { useState } from "react"

export function ForgotPassword() {
const [email, setEmail] = useState("");
const [url, setUrl] = useState('');
const [loading, setLoading] = useState(false);

const handleSubmitLink = async () => {
  setLoading(true);
  try {
    const response = await api.post("/forgot", {email})
    const url = response.data.user.url;

    setUrl(url);
  } catch (error) {
    console.log(error)
  }
}

function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
  setEmail(e.target.value);
}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sm hover:underline">Esqueceu a senha?</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="items-center justify-center flex">
        <div className="border-2 p-3 border-gray-200 rounded-full">
            <Lock className="size-14 text-gray-200" />
        </div>
        </div>
        <DialogHeader>
          <DialogTitle>Problemas para entrar?</DialogTitle>
          <DialogDescription>
          Insira o seu email e enviaremos um link para você voltar a acessar a sua conta.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">        
          <div className="grid items-center gap-4">
            <Input
              className="w-full dark:border-zinc-700 border-zinc-900"
              type="email"
              placeholder="ex: user@gmail.com"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button onClick={handleSubmitLink} disabled={loading}>{loading ? "Enviando..." : "Enviar"}</Button>
          <div className="flex justify-between">
            {(url !== "") && <a href={url} target="_blank" className="text-blue-500 text-sm underline">Resetar Senha</a>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
