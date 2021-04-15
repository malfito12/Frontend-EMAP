import React, { useState } from 'react'
import AppBarAdmin from './AppBarAdmin'
import DrawerMenuAdmin from './DrawerMenuAdmin'

const DrawerMainAdmin = (props) => {
    const [open, setOpen]=useState(false)
    const OpenDrawer=()=>{
        setOpen(true)
    }
    const CloseDrawer=()=>{
        setOpen(false)
    }
    return (
        <>
            <AppBarAdmin OpenDrawer={OpenDrawer} />
            <DrawerMenuAdmin CloseDrawer={CloseDrawer} open={open} uno={props} />
        </>
    )
}

export default DrawerMainAdmin
