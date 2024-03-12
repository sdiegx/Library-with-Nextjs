"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import LogoEagle from "../../assets/img_aguila_espe_login.png"

const LoginPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log(responseNextAuth);
    

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    router.push("/dashboard");
  };

  const handleRegister = () => {
    router.push('/register')
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen relative bottom-72 left-0 right-0">
        <Image src={LogoEagle} alt="Logo espe" className="object-cover w-56 sm:w-64" />
      </div>

      <div className="container flex flex-col justify-center items-center mx-auto max-w-lg p-4 bg-green-800 absolute bottom-20 left-0 right-0 rounded-tl-3xl">
      
  <div className="flex flex-col items-center justify-center space-y-4 w-screen">
    <form onSubmit={handleSubmit}>
    <div className="bg-blue-500 w-11/12 rounded-lg mb-12 mt-4 px-3 py-2">
        <h1 className="text-xl text-center text-white font-bold ">Biblioteca en Línea</h1>
      </div>
    <div className="w-11/12 mb-4">
      <input
        type="email"
        placeholder="test@test.com"
        name="email"
        className="border border-gray-300 rounded px-3 py-2 w-full"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
    </div>
    <div className="w-11/12 mb-4">
      <input
        type="password"
        placeholder="123123"
        name="password"
        className="border border-gray-300 rounded px-3 py-2 w-full"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
    </div>
    <div className="w-11/12 mb-4">
      <button
        type="submit"
        className="bg-blue-700 text-white rounded w-full px-4 py-2 hover:bg-blue-600"
      >
        Ingresar
      </button>
    </div>
    <div className="w-11/12 mb-4 ">
      <span className="text-white text-center w-full font-bold cursor-pointer" onClick={handleRegister}>Regístrate!</span>
    </div>
    </form>
  </div>

  {errors.length > 0 && (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mt-4">
      <ul className="list-disc pl-5">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  )}
</div>
    </>
  );
};

export default LoginPage;
