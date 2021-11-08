import React from 'react'
import PublicMainMenu from '../PublicMenu/PublicMainMenu'
import DrawerMainAdmin from './DrawerMainAdmin'

const HeaderAdmin = () => {
    return (
        <>
          {localStorage.getItem('token')
            ?<DrawerMainAdmin />
            // :<PublicMainMenu />
            :null
          }  
        </>
    )
}

export default HeaderAdmin
