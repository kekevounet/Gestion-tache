import { motion } from 'framer-motion';
import Kevin from '../assets/Kevin.JPG';
import { useEffect, useState } from "react";

function Propos()
{
  const [Chargement, setChargement] = useState(true);
  const [SiAffiche, setSiAffiche] = useState(true);
    
  useEffect(()=>
    {
      setTimeout(()=>
        {
          setChargement(false)
        },5000)
      });
      
  if(Chargement)
    {
      return(
        <div className="flex items-center justify-center w-full h-screen bg-gray-900">
        <i className="text-white fas fa-circle-notch animate-spin text-9xl"></i>
      </div>
    )
  };
  
    return(
        <div className="relative w-full h-screen overflow-hidden transition-all duration-300">
           
                <motion.div 
                    className="absolute top-0 flex items-center justify-center w-full h-20 ml-6 text-3xl font-bold border-b shadow-md lg:ml-0"
                    initial={{opacity:0.5, translateY:'-100%'}}
                    animate={{opacity:1, translateY:0}}
                    transition={{duration:0.5, delay:0.5}}
                >
                    À propos
                </motion.div>
                <motion.div initial={{opacity:0, scale:0}} animate={{opacity:1, scale:1}} transition={{duration:0.5, delay:1}} className="absolute flex items-center justify-center w-full h-full">
                    {SiAffiche && <div className="w-full lg:w-1/2 ml-12 lg:ml-0 text-white transition-all duration-500 bg-gray-900 lg:bg-gray-800 cursor-pointer lg:h-1/2 h-[70%]" title='Cliquez, vous verrez !' onClick={()=>setSiAffiche(!SiAffiche)}>
                        <div className="p-3 text-2xl font-semibold text-center border border-b border-white lg:p-4">Gestion des tâches</div>
                        <div className="px-3 py-4 mt-6">L'application web pour la gestion des tâches est une application ayant pour but de faciliser la journée de chaque utilisateurs, et de ne pas oublier toutes les petites choses quotidienne.</div>
                        <div className="px-3 py-4">Meilleur perfomance sur l'utilisation sur un ordinateur.</div>
                        <div className="px-3 py-4">Si vous avez des suggestions ou même un projet à de dire, n'hésitez pas à me contacter.</div>
                        <div className="px-3 py-4">Si vous voulez voir le créateur, cliquez sur cette onglet ou sur le lien en dessous.</div>
                        <a href="https://niavo-kevin.netlify.app" className="px-3 py-5 text-lg">Niavo Kevin</a>
                    </div>}
                    {!SiAffiche && <div className="ml-6 lg:ml-0 transition-all duration-500 flex flex-col items-center w-full lg:w-[30%] text-white bg-gray-900 lg:bg-gray-800 cursor-pointer h-[55%]" title='Cliquez, vous verrez !' onClick={()=>setSiAffiche(!SiAffiche)}>
                        <div className="p-6 overflow-hidden rounded-full w-80 h-80"><motion.img className='object-cover' src={Kevin} alt="Kevin" drag dragConstraints={{top:0,letf:0,bottom:0,right:0}}/></div>
                        <div className="p-4 text-2xl font-semibold">MAMINIRINA Niavo Kevin</div>
                        <div className="flex ">
                            <a href="https://niavo-kevin.netlify.app" className="text-white cursor-pointer"><div className="px-3"><i className="text-4xl fab fa-whatsapp"></i></div></a>
                            <a href="https://niavo-kevin.netlify.app" className="text-white cursor-pointer"><div className="px-3"><i className="text-4xl fas fa-globe"></i></div></a>
                            <a href="https://niavo-kevin.netlify.app" className="text-white cursor-pointer"><div className="px-3"><i className="text-4xl fab fa-linkedin-in"></i></div></a>
                        </div>
                    </div>}
                </motion.div>
                <motion.div 
                    className="absolute bottom-0 flex items-center justify-center w-full h-16 text-2xl font-semibold border-" 
                    style={{boxShadow: '-1px -2px 15px -10px rgba(0,0,0,0.23)'}}
                    initial={{opacity:0.5, translateY:'100%'}}
                    animate={{opacity:1, translateY:0}}
                    transition={{duration:0.5, delay:0.5}}
                >
                    &copy; STILL Development
                </motion.div>


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
        <li className='list-none'><i className="p-2 fas fa-bolt-lightning"></i>Vous pouvez cliquez la mini fenêtre de gestion des tâches, une autre mini fenêtre affichera.</li>
        <li className='list-none'><i className="p-2 fas fa-bolt-lightning"></i>Vous pouvez juste cliquez sur le lien pour voir mon CV ou me contactez.</li>
      </div>
    </div>
  </div>
</div>


        </div>
    );
}
export default Propos;