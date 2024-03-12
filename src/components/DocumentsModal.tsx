import React, { useState } from 'react';

interface DocumentsModalProps {
  handlerCreateDocument: (formData: any) => void;
	authors: Author[];
}

const DocumentsModal: React.FC<DocumentsModalProps> = ({ handlerCreateDocument, authors }) => {
  const [formData, setFormData] = useState({
    title: '',
    authors: authors,
    publisher: '',
    publicationDate: '',
    genre: '',
    summary: '',
    language: '',
    pageCount: 0,
    physicalLocation: '',
    available: false,
    numberOfCopies: 0
  });

	const tempAuthors = authors.map((author, i) => ({i: i, index: author.id, status: false}))
	const [selectedAuthors, setSelectedAuthors] = useState(tempAuthors)
	


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
		if(e.target.name === "pageCount" || e.target.name === "numberOfCopies"){
			setFormData({
				...formData,
				[name]: Number(value)
			});
		} else {
			setFormData({
				...formData,
				[name]: value
			});
		}
    
  };

  const handlerPlusAuthors = () => {
		const tempAuthor = selectedAuthors.find(temp => temp.status === false)
		if(tempAuthor){
			const tempAddSelect = selectedAuthors.map(author => {
				if(author.i ===tempAuthor.i) {
					author.status=true 
					return author
				}
				return author
			})
			setSelectedAuthors(tempAddSelect);
		}
	}

	const handlerMinusAuthors = () => {
		const tempAuthor = selectedAuthors.find(temp => temp.status === true)
		if(tempAuthor){
			const tempAddSelect = selectedAuthors.map(author => {
				if(author.i ===tempAuthor.i) {
					author.status=false
					return author
				}
				return author
			})
			setSelectedAuthors(tempAddSelect);
		}
	}

	const handleChangeAuthors = (event: React.ChangeEvent<HTMLSelectElement>) => {
		console.log("Opción seleccionada: "+ event.target.value);
		const tempSelecteds = selectedAuthors.map(selected => {
			if(selected.i === Number(event.target.id)){
				selected.index = Number(event.target.value)
				return selected
			}
			return selected
		})
		setSelectedAuthors(tempSelecteds);
		const postAuthors = authors.filter(author => {
			const tempAuthor = selectedAuthors.filter(selectedAuthor => selectedAuthor.status===true).find(selected => selected.index === author.id);
		  return tempAuthor && author; 
		});
		setFormData({...formData, authors: postAuthors });
		console.log(formData);
		
	}
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
      <div className="modal-dialog bg-white rounded-lg overflow-hidden">
        <div className="modal-content">
          <div className="modal-header bg-gray-200 p-4">
            <h5 className="modal-title text-xl font-semibold">Agregar Documento</h5>
            <button type="button" className="close text-gray-600 hover:text-gray-800" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-form p-4">
            <div className='flex flex-row'>
							<div>
								<input type="text" placeholder="Título" name="title" className="w-full border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:border-blue-400" value={formData.title} onChange={handleInputChange} />
  		          <input type="text" placeholder="Editorial" name="publisher" className="w-full border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:border-blue-400" value={formData.publisher} onChange={handleInputChange} />
      		      <input type="date" placeholder="Fecha de Publicación" name="publicationDate" className="w-full border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:border-blue-400" value={formData.publicationDate} onChange={handleInputChange} />
          		  <input type="text" placeholder="Género" name="genre" className="w-full border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:border-blue-400" value={formData.genre} onChange={handleInputChange} />
								<input type="text" placeholder="Resumen" name="summary" className="w-full border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:border-blue-400" value={formData.summary} onChange={handleInputChange} />
								<input type="text" placeholder="Lenguaje" name="language" className="w-full border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:border-blue-400" value={formData.language} onChange={handleInputChange} />
								<input type="number" placeholder="Cantidad de páginas" name="pageCount" className="w-full border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:border-blue-400" value={formData.pageCount} onChange={handleInputChange} />
								<input type="text" placeholder="Ubicación física" name="physicalLocation" className="w-full border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:border-blue-400" value={formData.physicalLocation} onChange={handleInputChange} />
								<input type="number" placeholder="Número de copias" name="numberOfCopies" className="w-full border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:border-blue-400" value={formData.numberOfCopies} onChange={handleInputChange} />
							</div>
							<div className='flex flex-col'>
								<div className='flex flex-row'>
									<div className='px-8'>
										<button onClick={handlerPlusAuthors}><strong>+</strong></button>
									</div>
									<div className='px-8'>
										<button onClick={handlerMinusAuthors}><strong>-</strong></button>
									</div>
								</div>
								<div>
									{selectedAuthors.length !==0 && 
										selectedAuthors.filter(selectedAuthor => selectedAuthor.status===true).map((selectedAuthor) => (
											<div key={selectedAuthor.i} className="inline-block relative">
											  <select onChange={e => handleChangeAuthors(e)} id={`${selectedAuthor.i}`} className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-10 leading-tight focus:outline-none focus:border-blue-400">
												  <option disabled selected>Seleccione una opción</option>
													{authors.length !== 0 && authors.map(author => (
											      <option key={author.id} value={author.id}>{`${author.firstName} ${author.lastName} from ${author.college}`}</option>
													))}
											  </select>
											  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
											    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
													  <path fillRule="evenodd" d="M9.293 13.707a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414L10 11.586 4.707 6.293a1 1 0 00-1.414 1.414l5 5z" clipRule="evenodd" />
													</svg>
											  </div>
											</div>

										))}
								</div>
							</div>
						</div>
            <button onClick={() => handlerCreateDocument(formData)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md">Crear Documento</button>
          </div>
        </div>
      </div>
    </div>
    );
};

export default DocumentsModal;
