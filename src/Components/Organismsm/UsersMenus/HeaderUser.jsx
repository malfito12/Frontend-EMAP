import React from 'react'
import PublicMainMenu from '../PublicMenu/PublicMainMenu'
import DrawerMainUser from './DrawerMainUser'

const HeaderUser = () => {
    return (
        <>
        {
            localStorage.getItem('token')
            ? <DrawerMainUser />
            : <PublicMainMenu />
        }
        </>
    )
}

export default HeaderUser
