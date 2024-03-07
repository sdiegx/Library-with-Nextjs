"use client";
import { useState } from 'react';

interface DocumentTableProps {
  documents: Document[];
  selectedBooks: number[];
  setSelectedBooks: React.Dispatch<React.SetStateAction<number[]>>;
}

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


const DocumentTable: React.FC<DocumentTableProps> = ({ documents, selectedBooks, setSelectedBooks }) => {
  const [showMore, setShowMore] = useState(false);

  const initialDisplay = 13;
  const displayCount = showMore ? documents.length : initialDisplay;
  console.log('aqui estan los documents pasados al componente');
  
  console.log(documents);
  
  
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
            {documents.slice(0, displayCount).map((document, index) => (
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
      {documents.length > initialDisplay && (
        <div className="text-center mt-4">
          <button onClick={() => setShowMore(!showMore)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {showMore ? 'Mostrar menos' : 'Mostrar más'}
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentTable;
