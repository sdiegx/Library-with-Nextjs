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

  return (<>
		<div className="flex justify-center items-center h-screen">
  <div className="max-w-md p-8 bg-gray-100 shadow-md rounded-md overflow-y-auto">
    <h2 className="text-lg font-semibold mb-4">Lista de Objetos</h2>
    {loans.slice(count, 3+count).map(loan => (
      <div key={loan.id} className="mb-4">
        <ul>
          <li><span className="font-semibold">Inicio:</span> {loan.start_date}</li>
          <li><span className="font-semibold">Fin:</span> {loan.end_date}</li>
          <li><span className="font-semibold">Libros: </span> 
            <ul>
              {loan.books.map(book => (
                <li key={book.id}>{book.title}</li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    ))}
    {loans.length > 4 && (
      <>
				<button className="block text-center text-blue-500 font-semibold hover:underline" onClick={handlerIndexPlusLoans}>
	        +
  	    </button>
				<span>{`De ${count+1} a ${count+3}`}</span>
				<button className="block text-center text-blue-500 font-semibold hover:underline" onClick={handlerIndexMinusLoans}>
					-
				</button>
			</>
    )}
  </div>
</div>

	</>)
}
export default Loans