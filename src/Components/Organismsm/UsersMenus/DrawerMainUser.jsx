import React, { useState } from 'react'
import AppBarUser from './AppBarUser'
import DrawerMenuUser from './DrawerMenuUser'

const DrawerMainUser = (props) => {
    const [open, setOpen]=useState(false)
    const OpenDrawer=()=>{
        setOpen(true)
    }
    const CloseDrawer=()=>{
        setOpen(false)
    }
    return (
        <>
            <AppBarUser OpenDrawer={OpenDrawer} />
            <DrawerMenuUser CloseDrawer={CloseDrawer} open={open} uno={props} />
        </>
    )
}

export default DrawerMainUser
