"use client";
import { useState } from 'react';

interface DocumentTableProps {
  documents: Document[];
  selectedBooks: number[];
  setSelectedBooks: React.Dispatch<React.SetStateAction<number[]>>;
}

const DocumentTable: React.FC<DocumentTableProps> = ({ documents, selectedBooks, setSelectedBooks }) => {
  const [count, setCount] = useState(0);
  
  const handleCheckboxChange = (documentId: number) => {
    // Comprueba si el documento ya está en la lista de libros seleccionados
    const isSelected = selectedBooks.includes(documentId);

    if (isSelected) {
      // Si está seleccionado, lo eliminamos de la lista
      setSelectedBooks(selectedBooks.filter(id => id !== documentId));
    } else {
      // Si no está seleccionado, lo añadimos a la lista
      setSelectedBooks([...selectedBooks, documentId]);
    }
  };

  const handlerIndexPlusDocuments = () => {
		const lengthLoans = documents.length;
		if((count + 4) >= lengthLoans){
			setCount(lengthLoans-4)
		}else if((count + 4) < lengthLoans){
			console.log(count);
			
			setCount(count + 4);
			console.log(count);
		}
	}

	const handlerIndexMinusDocuments = () => {
		if(count - 4 < 0){
			setCount(0)
		}else{
			setCount(count - 4);
		}
	}

  return (
    <div className="container mx-auto max-w-lg p-4 bg-white rounded-t-lg shadow-lg">
      <div className="bg-red-500 rounded-t-lg p-4">
        <h1 className="text-white font-bold text-xl mb-2">Documentos</h1>
      </div>
      <div className="overflow-hidden rounded-b-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 rounded-tl-lg">Seleccionar</th>
              <th className="px-4 py-2 rounded-tl-lg">Documento</th>
              <th className="px-4 py-2">Autor</th>
            </tr>
          </thead>
          <tbody>
            {documents.length !==0  && documents.slice(count, 4+count).map((document, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="px-4 py-2">
                  {/* Casilla de verificación para seleccionar el libro */}
                  <input
                    type="checkbox"
                    checked={selectedBooks.includes(document.id)}
                    onChange={() => handleCheckboxChange(document.id)}
                  />
                </td>
                <td className="px-4 py-2">{document.title}</td>
                <td className="px-4 py-2">
                  {document.authors.map((author, index) => (
                    <span key={index}>
                      {author.firstName} {author.lastName}
                      {index !== document.authors.length - 1 && ', '}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {documents.length > 4 && (
      <>
				<button className="block text-center text-blue-500 font-semibold hover:underline" onClick={handlerIndexPlusDocuments}>
	        +
  	    </button>
				<span>{`De ${count+1} a ${count+4}`}</span>
				<button className="block text-center text-blue-500 font-semibold hover:underline" onClick={handlerIndexMinusDocuments}>
					-
				</button>
			</>
    )}
    </div>
  );
};

export default DocumentTable;
