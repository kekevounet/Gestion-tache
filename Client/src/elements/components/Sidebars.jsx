import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function Sidebars ({SiOuvert, setSiOuvert}) {
// Etat
const initial = {opacity:0, scale:0};
const animate = {opacity:1, scale:1};
const isMobile = useIsMobile();

function useIsMobile () {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile;
}


  // Affichage
  
  return (
    <motion.div
      className={`flex flex-col lg:h-screen h-full bg-gray-900 text-white lg:relative transition-all duration-300 shadow fixed z-50   ${
        SiOuvert ? 'lg:w-[20%] w-full' : 'lg:w-[5%] w-14'}`}
      initial= {{translateX:'-100%'}}
      animate = {{translateX:0}}
      transition={{duration:0.5}}
    >

        <div>
            <div className={`items-start text-center p-3 transition-all duration-300 ${
            SiOuvert ? 'text-3xl' : 'text-xl'
            }`}
            onClick={()=>setSiOuvert(true)}
            >
                {SiOuvert ? <motion.div initial={initial} animate={animate} duration={{duration:0.5, delay:1}} className='font-bold underline underline-offset-4'>Menu</motion.div> : <motion.i title='Ouvrir ?' initial={initial} animate={animate} transition={{duration:0.5, delay:0.3}} className="text-2xl cursor-pointer lg:text-5xl fas fa-bars"></motion.i>}
                <hr />
            </div>
            <span className='absolute right-3 top-5' title='Fermer ?' onClick={() => setSiOuvert(false)}>{SiOuvert && <i className='text-3xl cursor-pointer fas fa-xmark'></i>}</span>
        </div>

        {<motion.div 
          className="flex flex-col items-center justify-center w-full h-full"
          initial={initial}
          animate={animate}
          transition={{duration:0.5, delay:1.5}}
          >
            <Link to='/' title={`${SiOuvert ? '' : 'Dashboard'}`} onClick={() => {if (isMobile) {setSiOuvert(false)}}} className="relative w-full p-3 mb-4 text-xl text-center text-white no-underline rounded-lg cursor-pointer hover:bg-gray-700"><div><i className={`fas fa-chart-line lg:text-2xl ${SiOuvert ? 'left-8 absolute lg:left-4' : 'text-center'}`}></i> {SiOuvert && <span>Dashboard</span>}</div></Link>
            <Link to='/Ajouter' title={`${SiOuvert ? '' : 'Ajouter des tâches'}`} onClick={() => {if (isMobile) {setSiOuvert(false)}}} className="relative w-full p-3 mb-4 text-xl text-center text-white no-underline rounded-lg cursor-pointer hover:bg-gray-700"><div><i className={`fas fa-folder-plus lg:text-2xl ${SiOuvert ? 'left-8 absolute lg:left-4' : 'text-center'}`}></i> {SiOuvert && <span>Ajouter des tâches</span>}</div></Link>
            <Link to='/Liste' title={`${SiOuvert ? '' : 'Listes des tâches'}`} onClick={() => {if (isMobile) {setSiOuvert(false)}}} className="relative w-full p-3 mb-4 text-xl text-center text-white no-underline rounded-lg cursor-pointer hover:bg-gray-700"><div><i className={`fas fa-list-check lg:text-2xl ${SiOuvert ? 'left-8 absolute lg:left-4' : 'text-center'}`}></i> {SiOuvert && <span>Listes des tâches</span>}</div></Link>
            <Link to='/Fini' title={`${SiOuvert ? '' : 'Tâche terminée'}`} onClick={() => {if (isMobile) {setSiOuvert(false)}}} className="relative w-full p-3 mb-4 text-xl text-center text-white no-underline rounded-lg cursor-pointer hover:bg-gray-700"><div><i className={`fas fa-clipboard lg:text-2xl ${SiOuvert ? 'left-8 absolute lg:left-4' : 'text-center'}`}></i> {SiOuvert && <span>Tâche terminée</span>}</div></Link>
            <Link to='/NonFini'title={`${SiOuvert ? '' : 'Tâche non terminée'}`} onClick={() => {if (isMobile) {setSiOuvert(false)}}} className="relative w-full p-3 mb-4 text-xl text-center text-white no-underline rounded-lg cursor-pointer hover:bg-gray-700"><div><i className={`fas fa-clipboard-question lg:text-2xl ${SiOuvert ? 'left-8 absolute lg:left-4' : 'text-center'}`}></i> {SiOuvert && <span>Tâche non terminée</span>}</div></Link>
        </motion.div>}

        <motion.div 
          className="items-end justify-center"
          initial={initial}
          animate={animate}
          transition={{duration:0.5, delay:2}}
        >
            <Link to='/Propos' title={`${SiOuvert ? '' : 'À propos'}`} onClick={() => {if (isMobile) {setSiOuvert(false)}}} className='text-white no-underline'><div className="relative w-full p-3 mb-4 text-xl text-center rounded-lg cursor-pointer hover:bg-gray-700"><i className={`fas fa-circle-question lg:text-2xl ${SiOuvert ? 'absolute left-4' : 'text-center'}`}></i> {SiOuvert && <span>À propos</span>}</div></Link>
            <div className="relative w-full p-3 mb-1 text-xl text-center rounded-lg cursor-not-allowed hover:bg-gray-700"><i className={`fas fa-arrow-right-to-bracket lg:text-2xl ${SiOuvert ? 'absolute left-4' : 'text-center'}`}></i> {SiOuvert && <span>Quitter</span>}</div>
        </motion.div>

        
    
    </motion.div>
  )
}
export default Sidebars;
