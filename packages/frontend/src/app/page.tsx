'use client'
import { client } from "@/graphql/client";

import { useState } from "react";
import { loginValidationSchema } from "./validations/login.validation";
import { ZodIssue } from "zod";
import { toast, ToastContainer } from "react-toastify";
import { LOGIN } from "@/graphql/mutations/login";
import { ApolloProvider } from "@apollo/client/react";
import { useRouter } from 'next/navigation'


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ZodIssue[]>([]);

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = loginValidationSchema.safeParse({ email, password });
    if (!data.success) {
      setErrors(data.error.issues);
    }


    try {
      const response = await client.mutate({
        mutation: LOGIN,
        variables: {
          email,
          password,
        },
      });

      if (response.data) {
        router.push('/home')
      }

    } catch (error: any) {
      toast.error(error.message)
    }



  }


  return (
    <ApolloProvider client={client}>
      <main className="w-full bg-slate-100 h-screen">
        <div className="flex flex-col mx-auto my-auto w-full max-w-md h-full">
          <div className="bg-white p-8 rounded-lg shadow-md my-auto">
            <h1 className="font-bold text-3xl">Login</h1>
            <p className="mt-2">Informe suas credenciais e acesse o sistema</p>
            <form onSubmit={handleSubmit}>
              <div className="mt-4 flex flex-col">
                <label htmlFor="email">E-mail</label>
                <input type="email" name="email" id="email" className="mt-1 border-2 rounded h-11 pl-2" placeholder="example@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                {errors.find((error) => error.path[0] === "email") && <p className="text-red-500 mt-1">{errors.find((error) => error.path[0] === "email")?.message}</p>}
              </div>

              <div className="mt-4 flex flex-col">
                <label htmlFor="password">Senha</label>
                <input type="password" name="password" id="password" className="mt-1 border-2 rounded h-11 pl-2" placeholder="Sua senha secreta" value={password} onChange={(e) => setPassword(e.target.value)} />
                {errors.find((error) => error.path[0] === "password") && <p className="text-red-500 mt-1">{errors.find((error) => error.path[0] === "password")?.message}</p>}
              </div>

              <div className="mt-4 flex flex-col">
                <button type="submit" className="bg-blue-500 text-white rounded py-2">Login</button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer theme="colored" />
      </main>
    </ApolloProvider>
  );
}
