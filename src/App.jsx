import React from 'react'
import AppAdmin from './Components/Routes/RouterAdmin/AppAdmin';
import AppPublic from './Components/Routes/RouterPublic/AppPublic';
import AppUsers from './Components/Routes/RouterUser/AppUsers';
import './index.css'

function App() {
  let roles = localStorage.getItem('rols')

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
  return (
    <>
      {roles === 'admin' ? <section id='admin'><AppAdmin /></section> : roles === 'usuario' ? <section id='user'><AppUsers /></section> : <section id='public'><AppPublic /></section>}
      {/* {roles==='admin'? <AppAdmin id='admin' /> : roles==='usuario' ?<AppUsers id='user'/>:<AppPublic id='public' />} */}
    </>
  );
}

export default App;
