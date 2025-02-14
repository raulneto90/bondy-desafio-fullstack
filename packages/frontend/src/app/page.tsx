import { client } from "@/graphql/client";
import { ApolloProvider } from "@apollo/client";


export default function Login() {
  return (
    <ApolloProvider client={client}>
      <main className="w-full bg-slate-100 h-screen">
        <div className="flex flex-col mx-auto my-auto w-full max-w-md h-full">
          <div className="bg-white p-8 rounded-lg shadow-md my-auto">
            <h1 className="font-bold text-3xl">Login</h1>
            <p className="mt-2">Informe suas credenciais e acesse o sistema</p>
            <form>
              <div className="mt-4 flex flex-col">
                <label htmlFor="email">E-mail</label>
                <input type="email" name="email" id="email" className="mt-1 border-2 rounded h-11 pl-2" placeholder="example@example.com" />
              </div>

              <div className="mt-4 flex flex-col">
                <label htmlFor="password">Senha</label>
                <input type="password" name="password" id="password" className="mt-1 border-2 rounded h-11 pl-2" placeholder="Sua senha secreta" />
              </div>

              <div className="mt-4 flex flex-col">
                <button type="submit" className="bg-blue-500 text-white rounded py-2">Login</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </ApolloProvider>
  );
}
