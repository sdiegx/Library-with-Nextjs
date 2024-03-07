"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      }
    );

    const responseAPI = await res.json();

    if (!res.ok) {
      setErrors(responseAPI.message);
      return;
    }

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto flex items-center justify-center h-screen">
  <div className="bg-white bg-opacity-50 p-6 rounded-md">
    <h1 className="text-3xl font-bold text-center mb-12">Regístrate!</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        name="firstName"
        className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 mb-6 w-full"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
      />
      <input
        type="text"
        placeholder="Apellido"
        name="lastName"
        className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 mb-6 w-full"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
      />
      <input
        type="email"
        placeholder="test@test.com"
        name="email"
        className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 mb-6 w-full"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 mb-12 w-full"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
      >
        Register
      </button>
    </form>

    {errors.length > 0 && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
        <ul className="list-disc list-inside mb-0">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
</div>

  );
};
export default RegisterPage;
