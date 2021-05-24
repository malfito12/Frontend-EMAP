import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import AppAdmin from './Components/Routes/RouterAdmin/AppAdmin';
import AppPublic from './Components/Routes/RouterPublic/AppPublic';
import AppUsers from './Components/Routes/RouterUser/AppUsers';
import './index.css'

function App() {
  let roles=localStorage.getItem('rols')

  // const cambio=()=>{
  //   let roles=localStorage.getItem('rols')
  //   if(roles==='admin'){
  //       <HeaderAdmin />
  //       console.log('soy el admin')
  //   }else if(roles==='usuario'){
  //     <HeaderUser />
  //     console.log('soy el usuario')
  //   }
  // }
  return (<>
    <Router>
      {roles==='admin'? <AppAdmin /> : roles==='usuario' ?<AppUsers />: <AppPublic />}
    </Router>
    </>
  );
}

export default App;
