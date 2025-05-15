import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Index from './elements/pages/index.jsx';
import AjoutTache from './elements/pages/AjoutTache.jsx';
import ListeTache from './elements/pages/ListeTache.jsx';
import TacheFini from './elements/pages/TacheFini.jsx';
import TacheNonFini from './elements/pages/TacheNonFini.jsx';
import Propos from './elements/pages/Propos.jsx';
import Sidebars from './elements/components/Sidebars.jsx';
function App(){
    const [SiOuvert, setSiOuvert] = useState(false);
    useEffect(()=>
        {
            alert('Le saviez-vous? cette application est en cours de production. Un système d\'authentification sera disponible dans ci peu de temps.')
        },[]);
    return(
            <Router>
            {/* <div className="fixed w-full h-20 bg-gray-900">GMLGKJG</div> */}
            <div className="absolute right-0 w-full lg:flex">
            <Sidebars SiOuvert={SiOuvert} setSiOuvert={setSiOuvert} />
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path='/Ajouter' element={ <AjoutTache/> } />
                <Route path='/Liste' element={ <ListeTache/> } />
                <Route path='/Fini' element={ <TacheFini/> } />
                <Route path='/NonFini' element={ <TacheNonFini/> } />
                <Route path='/Propos' element={ <Propos/> } />
            </Routes>
          </div>
      </Router>
    )
}
export default App;

