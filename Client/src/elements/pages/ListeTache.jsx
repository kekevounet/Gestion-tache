import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';

export default function ListeTache() {
  const [Taches, setTaches] = useState([]);
  const [FiltreStatus, setFiltreStatus] = useState(true);
  const [FiltreDate, setFiltreDate] = useState(true);
  const [FiltreNom, setFiltreNom] = useState(true);


  const AffichageTache = async () => {
    try {
      const res = await axios.get('https://gestion-tache.onrender.com/tache');
      setTaches(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const ToggleStatus = async (id, currentStatus) => {
    try {
      await axios.put(`https://gestion-tache.onrender.com/tache/status/${id}`, {
        status: currentStatus === 1 ? 0 : 1,
      });
      AffichageTache()
    } catch (error) {
      console.error('Erreur lors du changement de statut', error);
    }
  };
  
  const RecupTachesFiltres = () => {
    const tachesCopie = [...Taches];
  
    return tachesCopie
      .sort((a, b) => {
        // Filtre nom
        const nomA = a.nom.toLowerCase();
        const nomB = b.nom.toLowerCase();
        if (nomA < nomB) return FiltreNom ? -1 : 1;
        if (nomA > nomB) return FiltreNom ? 1 : -1;
        return 0;
      })
      .sort((a, b) => {
        // Filtree date
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return FiltreDate ? dateA - dateB : dateB - dateA;
      })
      // Filter status
      .sort((a, b) => {
            if (FiltreStatus) {
              return a.status - b.status;
            } else {
              return b.status - a.status;
            }
          });
  };
  
  
  
  useEffect(() => {
    AffichageTache();
  }, []);

  return (
    <div className='flex w-full h-screen transition-all duration-300'>
      <div className='flex flex-col w-full h-screen'>
        <div className="flex items-center justify-center w-full h-20 p-3 text-3xl font-bold border-b shadow-md">
          <span className="ml-6 text-center lg:ml-0">Listes des tâches</span>
          <span className="absolute lg:right-10 right-1">
            <Link to='/Ajouter' className='text-black'>
              <i className="p-3 text-white transition-all duration-100 scale-75 bg-gray-900 border border-black rounded-full cursor-pointer lg:scale-100 color:white fas fa-plus hover:rotate-12 hover:scale-105" title='Voulez-vous en ajoutez?'></i>
            </Link>
          </span>
        </div>

        <div className="w-full p-6 overflow-y-auto">
          <div className="rounded-lg shadow-md">
            <table className="min-w-full ml-12 text-sm text-left text-gray-200 bg-gray-800 border border-gray-700 table-fixed lg:ml-0">
              <thead className="text-xs text-gray-300 uppercase bg-gray-900">
                <tr className="border-b border-white border-double">
                  <th className="px-10 py-3 text-xl text-center w-[20%]" onClick={()=>setFiltreNom(!FiltreNom)}>Nom {FiltreNom ?<i className='fas fa-arrow-down'></i>:<i className="fas fa-arrow-up"></i>}</th>
                  <th className="px-5 py-3 text-xl w-[35%]">Description</th>
                  <th className="px-5 py-3 text-xl text-center w-[20%]" onClick={() => setFiltreDate(!FiltreDate)}>Date {FiltreDate ? <i className="fas fa-arrow-down"></i> : <i className="fas fa-arrow-up"></i>}</th>
                  <th className="px-5 py-3 text-xl text-center w-[15%]" onClick={()=>setFiltreStatus(!FiltreStatus)}>Statut {FiltreStatus ?<i className='fas fa-arrow-down'></i>:<i className="fas fa-arrow-up"></i>}</th>
                  <th className="px-5 py-3 text-xl text-center w-[15%]">Action</th>
                </tr>
              </thead>
              <tbody>
                {RecupTachesFiltres().map((tache) => (
                  <tr key={tache.id} className={`cursor-progress transition-all duration-600 border-b hover:border-double bg-gray-800 ${tache.status === 1 ? 'hover:border-green-500' : 'hover:border-red-500'}`} title={`${tache.status !== 0 ? 'Tâche terminée !' : 'Tâche non terminée !'}`}>
                    <td className="px-4 py-4 text-center break-words">{tache.nom}</td>
                    <td className="px-4 py-4 break-words">{tache.description}</td>
                    <td className="px-4 py-4 text-center">{new Date(tache.date).toLocaleDateString("fr-FR")}</td>
                    <td className="px-4 py-4 text-center">
                      {tache.status === 1 ? (
                        <i className="text-green-500 fas fa-check"></i>
                      ) : (
                        <i className="text-red-500 fas fa-xmark"></i>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <i
                        onClick={() => ToggleStatus(tache.id, tache.status)}
                        title='Basculer le statut ?'
                        className="px-2 py-1 text-lg text-white transition cursor-pointer fas fa-arrow-right-arrow-left"
                      >

                      </i>
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
        <li className='list-none'><i className="p-2 fas fa-right-left"></i>Vous pouvez basculer le statut d'un tâche.</li>
        <li className='list-none'><i className="p-2 fas fa-arrow-down-short-wide"></i>Vous pouvez filtrez les tâches par nom, date ou bien par statut.</li>
      </div>
    </div>
  </div>
</div>


    </div>
  );
}
