"use client";
import { useState } from 'react';

interface AuthorsModalProps {
  handlerCreateAuthor: (formAuthorsData: Author, event: React.FormEvent<HTMLFormElement>) => {};
  setShowModalAuthors: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthorsModal: React.FC<AuthorsModalProps> = ({ handlerCreateAuthor, setShowModalAuthors }) => {
  
  const [formAuthorsData, setFormAuthorsData] = useState({
    "firstName": '',
    "lastName": '',
    "college": ''
  });

  const handlerChangeFormAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(formAuthorsData);
    setFormAuthorsData({ ...formAuthorsData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
      <div className="modal-dialog bg-white rounded-lg overflow-hidden">
        <div className="modal-content">
          <div className="modal-header bg-gray-200 p-4">
            <h5 className="modal-title text-xl font-semibold" id="modal-label">Agregar Autor</h5>
            <button type="button" onClick={()=>setShowModalAuthors(false)} className="close text-gray-600 hover:text-gray-800" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form className="modal-form p-4" onSubmit={(e) =>handlerCreateAuthor(formAuthorsData, e)}>
            <input type="text" placeholder='Firstname' name="firstName" id="firstName" className="w-full border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:border-blue-400" value={formAuthorsData.firstName} onChange={handlerChangeFormAuthor} />
            <input type="text" placeholder='Lastname' name="lastName" id="lastName" className="w-full border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:border-blue-400" value={formAuthorsData.lastName} onChange={handlerChangeFormAuthor} />
            <input type="text" placeholder='College' name="college" id="college" className="w-full border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:border-blue-400" value={formAuthorsData.college} onChange={handlerChangeFormAuthor} />
            <button type='submit' className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md">Crear Autor</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthorsModal;