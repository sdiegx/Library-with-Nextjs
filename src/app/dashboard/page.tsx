"use client";
import DatePicker from "@/components/DatePicker";
import DocumentTable from "@/components/DocumentTable";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"
import AuthorsModal from "@/components/AuthorsModal";
import DocumentsModal from "@/components/DocumentsModal";


interface JwtPayload {
  role: string;
}

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [authors, setAuthors] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [count, setCount] = useState(1);
  const [start_date, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [end_date, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
  const [showModalAuthors, setShowModalAuthors] = useState(false);
  const [showModalBooks, setShowModalBooks] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false);

	const handlerCreateAuthor = async (formAuthorsDataLocal: Author, event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    const {firstName, lastName, college} = formAuthorsDataLocal;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/authors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          college
        })
      });
      const data = await res.json();
      console.log(data);      
      setShowModalAuthors(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handlerCreateDocument = async (formDocumentsDataLocal: Document) =>{
    // event.preventDefault()
    const { title, 
      publisher,
      publicationDate,
      genre,
      summary,
      language,
      pageCount,
      physicalLocation,
      numberOfCopies,
      authors,
    } = formDocumentsDataLocal;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify({
          title, 
          publisher,
          publicationDate,
          genre,
          summary,
          language,
          pageCount,
          physicalLocation,
          available: false,
          numberOfCopies,
          authors,
        })
      });
      const data = await res.json();
      console.log(data);
      
      // setShowModalBooks(false);
    } catch (error) {
      console.log(error);
    }
  }

  let decoded: JwtPayload;
  if(session){
    decoded = jwtDecode(session.user.token);
    console.log(session);
    
  }
  

  const getBooks = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.token}`, // Add the token here
        },
      });
      const data = await res.json();
      setDocuments(data)
    } catch (error) {
      console.error(error);
    }
  };

  const getAuthors = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/authors`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.token}`, // Add the token here
        },
      });
      const data = await res.json();
      setAuthors(data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (session?.user?.token) {
      getBooks();
      getAuthors();
      setIsAdmin(decoded.role === "admin")
    } else {
      // Handle the case where the user is not logged in
      console.log('No hay sesion activa');
    
    }
  }, [session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const handlerCreateLoan = async () =>{
    setCount(count + 1)
    const completDocumentsSelected = documents.filter(document => selectedBooks.includes(document.id))
    if (count % 2 === 0){
      if(!completDocumentsSelected) return
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

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
  <div className="flex flex-col md:flex-row justify-end w-full">
    <div >
      <button onClick={handlerCreateLoan} className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded  md:mb-4">
        <strong>+</strong>
      </button>
    </div>
    <div className="flex flex-col md:flex-row"> {/* Contenedor para el segundo div */}
      {isAdmin && (
        <>
          <button onClick={() => setShowModalAuthors(true)} className="bg-cyan-800 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded md:mb-4">
            Agregar Autor
          </button>
          <button onClick={() => setShowModalBooks(true)} className="bg-teal-800 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mb-4 md:mr-16">
            Agregar Documentos
          </button>
        </>
      )}
    </div>
  </div>
  {isSelected && <DatePicker start_date={start_date} end_date={end_date} setStartDate={setStartDate} setEndDate={setEndDate} />}
  <div className="mt-1 py-1 w-screen"> {/* Ajuste de espacio superior y padding */}
    <DocumentTable documents={documents} selectedBooks={selectedBooks} setSelectedBooks={setSelectedBooks} />
  </div>
  {showModalAuthors && <AuthorsModal handlerCreateAuthor={handlerCreateAuthor} />}
  {showModalBooks && <DocumentsModal handlerCreateDocument={handlerCreateDocument} authors={authors} />}
</div>


  );
};
export default Dashboard;
