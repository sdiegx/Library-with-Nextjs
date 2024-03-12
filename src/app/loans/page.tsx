"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Loans = () => {
	const { data: session, status } = useSession();
  const [loans, setLoans] = useState<Loan[]>([]);
	const [count, setCount] = useState(0);

	const getLoans = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/loans`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.token}`,
        },
      });
      const data = await res.json();
      setLoans(data)
      console.log("aquie estan loans");
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  };

	useEffect(() => {
    if (session?.user?.token) {
      getLoans()
    } else {
      // Handle the case where the user is not logged in
      console.log('No hay sesion activa');
    
    }
  }, [session]);

	if (status === "loading") {
    return <p>Loading...</p>;
  }

	const handlerIndexPlusLoans = () => {
		const lengthLoans = loans.length;
		if((count + 3) >= lengthLoans){
			setCount(lengthLoans-3)
		}else if((count + 3) < lengthLoans){
			console.log(count);
			
			setCount(count + 3);
			console.log(count);
		}
	}

	const handlerIndexMinusLoans = () => {
		if(count - 3 < 0){
			setCount(0)
		}else{
			setCount(count - 3);
		}
	}

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
  return (
    <>
  <div className="flex justify-center items-center h-screen w-screen">
    <div className=" w-11/12 md:w-6/12 p-8 bg-gray-100 shadow-md rounded-md overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Lista de Préstamos</h2>
      {loans.slice(count, 3 + count).map(loan => (
        <div key={loan.id} className="mb-4 bg-green-800 bg-opacity-25 p-4 rounded-md">
          <ul>
            <li><span className="font-semibold">Inicio:</span> {formatDate(loan.start_date)}</li>
            <li><span className="font-semibold">Fin:</span> {formatDate(loan.end_date)}</li>
            <li><span className="font-semibold">Libros: </span>
              <ul>
                {loan.books.map(book => (
                  <li key={book.id}><span className="font-semibold ml-6">{book.id}.</span> {book.title}</li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      ))}
      {loans.length > 4 && (
        <div className="relative bottom-0 left-0 flex items-center mb-4 ml-4 w-full">
          <button className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded-md ml-2" onClick={handlerIndexMinusLoans}>
            -
          </button>
          <span>{`De ${count + 1} a ${count + 3}`}</span>
          <button className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded-md mr-2" onClick={handlerIndexPlusLoans}>
            +
          </button>
        </div>
      )}
    </div>
  </div>
</>

  )
}
export default Loans