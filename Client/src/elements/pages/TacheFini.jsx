import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TacheFini() {

  const [ Taches, setTaches ] = useState([]);
  const [FiltreDate, setFiltreDate] = useState(true);

  const AffichageTaches = async () =>
  {
    const res = await axios.get('https://gestion-tache.onrender.com/tache');
    setTaches(res.data);
  }
  const SuppressionTache = async (id) =>
  {
    await axios.delete(`https://gestion-tache.onrender.com/tache/${id}`);
    setTaches(Taches.filter(tache => tache.id !== id ));
  }

  
  const RecupTachesFiltres = () =>
  {
    const TacheTerminee = Taches.filter(tache => tache.status === 1)
    return TacheTerminee.sort((a,b)=>
    {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return FiltreDate ? dateA - dateB : dateB - dateA;
    })
  };
  

  useEffect(()=>{
    AffichageTaches();
  },[]);
    return (
      <div className='flex w-full h-screen overflow-hidden transition-all duration-300'>
        <div className='flex flex-col w-full h-screen transition-all duration-300'>
  
          <div className="flex items-center justify-center w-full h-20 ml-6 text-2xl font-bold text-center border-b shadow-md lg:text-3xl lg:ml-0">
            Listes des tâches terminées
          </div>
  
          <div className="w-full p-6 overflow-y-auto">
            <div className="rounded-lg shadow-md">
              <table className="min-w-full ml-12 text-sm text-left text-gray-200 bg-gray-800 border border-gray-700 table-fixed lg:ml-0">
                <thead className="text-xs text-gray-300 uppercase bg-gray-900">
                  <tr className='border-b border-white border-double'>
                    <th className="px-5 py-3 text-xl text-center w-[20%]">Nom</th>
                    <th className="px-5 py-3 text-xl w-[35%]">Description</th>
                    <th className="px-5 py-3 text-xl text-center w-[20%]" onClick={() => setFiltreDate(!FiltreDate)}>Date {FiltreDate ? <i className='fas fa-arrow-down'></i>:<i className="fas fa-arrow-up"></i>}</th>
                    <th className="px-5 py-3 text-xl text-center w-[20%]">Statut</th>
                    <th className="px-5 py-3 text-xl text-center w-[20%]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {RecupTachesFiltres().map((tache) => (
                    <tr key={tache.id} className={`cursor-progress border-b hover:border-double bg-gray-800 ${tache.status === 1 ? 'hover:border-green-500' : 'hover:border-red-500'}`} title='Tâche terminée !'>
                        <td className="px-4 py-4 font-medium text-white w-[20%] break-words whitespace-normal text-center">{tache.nom}</td>
                        <td className="px-4 py-4 w-[35%] break-words whitespace-normal">{tache.description}</td>
                        <td className="px-4 py-4 w-[20%] break-words whitespace-normal text-center">{new Date(tache.date).toLocaleDateString('fr-FR')}</td>
                        <td className="px-4 py-4 w-[20%] break-words whitespace-normal text-center">{tache.status === 1 ? (<i className='text-green-500 fas fa-check'></i>) : (<i className='text-red-500 fas fa-xmark'></i>)}</td>
                        <td className="px-4 py-4 w-[15%] break-words whitespace-normal text-center">
                            <i className="text-2xl text-red-500 cursor-pointer fas fa-trash-can hover:text-red-400" onClick={()=>SuppressionTache(tache.id)} title='Vous êtes sur de vouloir supprimer ?'></i>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
  
        </div>

<div 
  className="bottom-0 z-50 p-3 toast-container position-fixed end-0"
  style={{ zIndex: 1055 }}
>
  <div 
    className="border-0 toast align-items-center show"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    id="myToast"
    data-bs-dismiss="5000"
  >

  <div className="toast-header">
    <div className="toast-title">
     <span><i className="fas fa-circle-info"></i> Le saviez-vous?</span>
    </div>
    <button
      type="button"
      className="m-auto btn-close me-2"
      data-bs-dismiss="toast"
      aria-label="Close"
    ></button>
    </div>
    <div className="toast-header">
      <div>
        <li className='list-none'><i className="p-2 fas fa-trash-can"></i>Vous pouvez supprimer les tâches terminées.</li>
      </div>
    </div>
  </div>
</div>

      </div>
    );
  }
  