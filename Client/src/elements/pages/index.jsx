import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import axios from "axios";

export default function Index() {
  const [taches, setTaches] = useState([]);
  const [Chargement, setChargement] = useState(true);

  const initial = {opacity:0, scale:0}
  const animate = {opacity:1,scale:1}
  
  useEffect(() => {
    axios.get("https://gestion-tache.onrender.com/tache")
      .then(res => setTaches(res.data))
      .catch(err => console.error("Erreur lors du chargement des tâches", err));
  }, []);

  useEffect(() =>
  {
      setTimeout(()=>
      {
        setChargement(false)
      },5000);
  });

  if(Chargement)
  {
    return(
      <div className="flex items-center justify-center w-full h-screen bg-gray-900">
          <i className="text-white fas fa-circle-notch animate-spin text-9xl"></i>
      </div>
    )
  };




  const tachesTerminees = taches.filter(t => t.status === 1);
  const tachesNonTerminees = taches.filter(t => t.status === 0);


  const renderTable = (Taches) => (
    <motion.div 
      className="overflow-auto flex-2"
      initial={initial}
      whileInView={animate}
      transition={{duration:0.5, delay:1}}
    >
      <table 
        className="min-w-full text-sm text-left text-gray-200 bg-gray-800 border border-gray-700 table-fixed">
        <thead className="text-xs text-gray-300 uppercase bg-gray-900">
          <tr className="border-b border-white border-double">
            <th className="px-4 py-3 text-center w-[15%]">Nom</th>
            <th className="px-4 py-3 w-[40%]">Description</th>
            <th className="px-4 py-3 text-center w-[20%]">Date</th>
            <th className="px-4 py-3 text-center w-[10%]">Statut</th>
          </tr>
        </thead>
        <tbody>
          {Taches.map((tache) => (
            <tr key={tache.id} className={`cursor-progress border-b hover:border-double bg-gray-800 ${tache.status !== 1 ? 'hover:border-red-500' :'hover:border-green-500'}`} title={`${tache.status ===1 ? 'Tâche terminée !' :'Tâche non terminée !'}`}>
              <td className="px-3 py-3 text-center break-words">{tache.nom}</td>
              <td className="px-3 py-3 break-words">{tache.description}</td>
              <td className="px-3 py-3 text-center">
                {new Date(tache.date).toLocaleDateString("fr-FR")}
              </td>
              <td className="px-3 py-3 text-center">
                {tache.status === 1 ? (
                  <i className="text-green-500 fas fa-check"></i>
                ) : (
                  <i className="text-red-500 fas fa-xmark"></i>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );

  return (
    <div className='flex w-full h-screen overflow-hidden transition-all duration-300'>
      <div className='flex flex-col w-full h-screen transition-all duration-300'>

        <motion.div 
          className="relative flex items-center justify-center w-full h-20 ml-6 text-3xl font-bold text-center border-b shadow-md lg:ml-0"
          initial={{opacity:0.5, translateY:'-100%'}}
          animate={{opacity:1,translateY:0}}
          transition={{duration:0.5, delay:1.5}}
        >
          Dashboard
          {/* <span className='absolute right-3'><i className="text-4xl fas fa-bars" onClick={()=> setSiOuvert(!SiOuvert)}></i></span> */}
        </motion.div>

        <div className="grid w-full h-full grid-cols-1 gap-5 px-2 py-4 overflow-auto lg:px-5 lg:grid-cols-2">

          {/* Liste des tâches */}
          <motion.div 
            className="bg-gray-800 shadow-md rounded-lg text-white h-[41vh] border lg:p-4 flex flex-col ml-12 lg:ml-0"
            initial={initial}
            animate={animate}
            transition={{duration:0.5,delay:1}}
          >
            <div className="p-2 text-base font-semibold text-center border-b border-white">
              Liste des tâches
            </div>
            {renderTable(taches)}
          </motion.div>

          {/* Tâches terminées */}
          <motion.div 
            className="bg-gray-800 shadow-md rounded-lg text-white h-[41vh] border lg:p-4 flex flex-col ml-12 lg:ml-0"
            initial={initial}
            animate={animate}
            transition={{duration:0.5, delay:1.5}}
          >
            <div className="p-2 text-base font-semibold text-center border-b border-white">
              Tâches terminées
            </div>
            {renderTable(tachesTerminees)}
          </motion.div>

          {/* Tâches non terminées */}
          <motion.div 
            className="bg-gray-800 shadow-md rounded-lg text-white h-[41vh] border lg:p-4 flex flex-col ml-12 lg:ml-0"
            initial={initial}
            animate={animate}
            transition={{duration:0.5, delay:2}}
          >
            <div className="p-2 text-base font-semibold text-center border-b border-white">
              Tâches non terminées
            </div>
            {renderTable(tachesNonTerminees)}
          </motion.div>

          {/* Résumé */}
          <motion.div 
            className="bg-gray-800 shadow-md rounded-lg text-white h-[41vh] border flex flex-col justify-center items-center lg:p-10 ml-12 lg:ml-0"
            initial={initial}
            animate={animate}
            transition={{duration:0.5, delay:2.5}}
          >
            <div className="w-full p-3 -mt-24 text-base font-semibold text-center border-b border-white">
              Résumés
            </div>
            <div className="p-6 mt-10 text-lg text-center">
              <p>Total : {taches.length}</p>
              <p className="mt-2 text-green-400">✔️ Terminées : {tachesTerminees.length}</p>
              <p className="mt-2 text-red-400">❌ Non terminées : {tachesNonTerminees.length}</p>
            </div>
          </motion.div>

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
        <li className='list-none'>Vous pouvez tous voir tous les tâches terminées et les tâches non terminées, ainsi, une petite résumé pour l'ensemble</li>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}
