import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function AjoutTache () {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [Chargement, setChargement] = useState(true);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://gestion-tache.onrender.com/tache", {
        nom: nom,
        description: description
      });
      setMessage("Tâche ajoutée avec succès !");
      setAlertType("success");
      setNom('');
      setDescription('');
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      setMessage("Une erreur est survenue.");
      setAlertType("danger");
    }
  };
  
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
        <div className="flex items-center justify-center w-full h-screen transition-all duration-500 bg-gray-900">
            <i className="text-white fas fa-circle-notch animate-spin text-9xl"></i>
        </div>
      )
    };

  return (
    <div className='flex w-full h-screen overflow-hidden transition-all duration-300'>
      <div className='flex flex-col w-full transition-all duration-300'>
        <motion.div 
          className="relative flex items-center justify-center w-full h-20 ml-6 text-3xl font-bold text-center border-b shadow-md lg:ml-0"
          initial={{opacity:0.5, translateY:'-100%'}}
          animate={{opacity:1, translateY:0}}
          transition={{duration:0.5, delay:0.5}}
          >
            Ajouter des tâches
          </motion.div>
            {/* Bootstrap Alert */}
            {message && (
              <div className={` text-center lg:mx-14 ml-10 alert alert-${alertType} mt-4`} role="alert">
                {message}<span className="ml-2">Cliquez <Link to='/NonFini'> ici</Link> pour le voir</span>
                <span className="absolute right-5"><div className="cursor-pointer btn-close" data-bs-dismiss="alert"></div></span>
              </div>
            )}

        <motion.div 
          className="flex items-center justify-center w-full h-full ml-7 lg:ml-0"
          initial={{opacity:0, scale:0}}
          animate={{opacity:1, scale:1}}
          transition={{duration:0.5, delay:1}}
        >
          <div className="lg:w-[40%] w-[85%] h-[65%] bg-gray-800 rounded-lg text-white lg:p-4 p-2">
            <div className="p-3 text-lg font-semibold text-center border-b border-white">Une nouvelle tâche</div>
            <div className="h-[90%] w-full flex items-center p-2 lg:p-5 mt-10">
              <form className="flex flex-col w-full mb-32" onSubmit={handleSubmit}>
                <label className="p-1 text-base font-bold lg:p-4 lg:text-lg">Entrez le nom de la nouvelle tâche :</label>
                <input title="Obligatoire !" type="text" className="p-3 text-white input" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
                <label className="p-1 mt-5 text-base font-bold lg:p-4 lg:text-lg">Entrez les descriptions liées à cette tâche :</label>
                <input title="Obligatoire !" type="text" className="p-3 text-white input" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input title="Vous pouvez le modifier après." type="submit" className="p-3 mt-20 bg-gray-600 rounded-lg hover:bg-gray-500" value='Valider' />
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
