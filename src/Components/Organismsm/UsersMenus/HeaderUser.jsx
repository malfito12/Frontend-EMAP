import React from 'react'
import DrawerMainUser from './DrawerMainUser'

const HeaderUser = () => {
    return (
        <>
        {
            localStorage.getItem('token')
            ? <DrawerMainUser />
            // : <PublicMainMenu />
            : null
        }
        </>
    )
}

export default HeaderUser
