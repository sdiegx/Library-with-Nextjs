"use client";
import DatePicker from "@/components/DatePicker";
import DocumentTable from "@/components/DocumentTable";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Document {
  id: number;
  title: string;
  publisher: string;
  publicationDate: string;
  genre: string;
  summary: string;
  language: string;
  pageCount: number;
  physicalLocation: string;
  available: boolean;
  numberOfCopies: number;
  deletedAt: string | null;
  authors: Author[];
}

interface Author {
  id: number;
  firstName: string;
  lastName: string;
  college: string;
  deletedAt: string | null;
}

interface Loan {
  id: number;
  start_date: string;
  end_date: string;
  books: Document[];
}

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isSelected, setIsSelected] = useState(false);
  const [count, setCount] = useState(1);
  const [start_date, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [end_date, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loans, setLoans] = useState<Loan[]>([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user?.token}`,
          },
        });
        const data = await res.json();
        setDocuments(data)
      } catch (error) {
        console.error('no me preguntes se daño :c'+ error)
      }
    }
    getBooks();
  }, [count])
  
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  
  const handlerCreateLoan = async () =>{
    setCount(count + 1)
    const completDocumentsSelected = documents.filter(document => selectedBooks.includes(document.id))
    
    if (count % 2 === 0){
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/loans`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user?.token}`,
          },
          body: JSON.stringify({
            start_date,
            end_date,
            status: false,
            books: completDocumentsSelected
          })
        });
        const data = await res.json();
        console.log(data);
        setIsSelected(false);
      } catch (error) {
        console.log(error);
        
      }
      return
    }
    setIsSelected(true);
  }

  const handleOpenModal = async () => {
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
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <button onClick={handlerCreateLoan}><strong>+</strong></button>
      <button onClick={handleOpenModal}>Abrir Modal</button>
      {isSelected && <DatePicker start_date={start_date} end_date={end_date} setStartDate={setStartDate} setEndDate={setEndDate}/>}
      <DocumentTable documents={documents} selectedBooks={selectedBooks} setSelectedBooks={setSelectedBooks} />
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg w-96">
          <h2 className="text-lg font-bold mb-4">Lista de Objetos</h2>
          {loans.map(loan => (
            <div key={loan.id} className="mb-4">
              <ul>
                <li><span className="font-bold">Inicio:</span> {loan.start_date}</li>
                <li><span className="font-bold">Fin:</span> {loan.end_date}</li>
                <li><span className="font-bold">Cuadernos:</span> 
                  <ul>
                    {loan.books.map(book => (
                      <li key="{book.id}">{book.title}</li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          ))}
          <button onClick={handleCloseModal} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Cerrar</button>
        </div>
      </div>
      
      )}
    </div>
  );
};
export default Dashboard;
