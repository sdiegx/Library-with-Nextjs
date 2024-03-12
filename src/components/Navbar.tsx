"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  return (
  	<nav className="bg-gray-800 mb-2">
      <div className="container flex flex-col md:flex-row justify-between items-center py-4">
        <div className="flex items-center">
          <Link href="/" className="text-white mr-4 transition duration-300 ease-in-out transform hover:scale-110 hover:text-gray-300">
            <div className="hover:bg-gray-600 py-8 px-16 rounded">Home</div>
          </Link>
        </div>
        {session?.user ? (
        <div className="flex items-center flex-col md:flex-row">
          <Link href="/dashboard" className="text-white mr-4 transition duration-300 ease-in-out transform hover:scale-110 hover:text-gray-300">
            <div className="hover:bg-gray-600 py-8 px-8 rounded">Dashboard</div>
          </Link>
          <Link href="/loans" className="text-white mr-4 transition duration-300 ease-in-out transform hover:scale-110 hover:text-gray-300">
            <div className="hover:bg-gray-600 py-8 px-8 rounded">Mis préstamos</div>
          </Link>
          <button onClick={() => signOut()} className="text-white transition duration-300 ease-in-out transform hover:scale-110 hover:text-gray-300">
            <div className="hover:bg-gray-600 py-8 px-16 rounded">Signout</div>
          </button>
        </div>
        ) : (
        <div className="flex items-center">
          <Link href="/login" className="text-white mr-4 transition duration-300 ease-in-out transform hover:scale-110 hover:text-gray-300">
            <div className="hover:bg-gray-600 py-8 px-2 rounded">Login</div>
          </Link>
          <Link href="/register" className="text-white transition duration-300 ease-in-out transform hover:scale-110 hover:text-gray-300">
            <div className="hover:bg-gray-600 py-8 px-2 rounded">Register</div>
          </Link>
        </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
