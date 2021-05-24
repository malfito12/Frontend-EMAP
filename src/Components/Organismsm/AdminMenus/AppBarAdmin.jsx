import { AppBar, CssBaseline, IconButton, makeStyles, Toolbar } from '@material-ui/core'
import React from 'react'
import MenuIcon from '@material-ui/icons/Menu'


const useStyles=makeStyles((theme)=>({
    diseño:{
        background:'#141e30'
    }
}))
const AppBarAdmin = (props) => {
    const classes=useStyles()
    return (
        <div>
        <CssBaseline/>
        <AppBar position='fixed' className={classes.diseño}>
            <Toolbar>
                <IconButton
                    color='inherit'
                    aria-label='menu'
                    edge='start'
                    onClick={props.OpenDrawer}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
        </div>
    )
}

export default AppBarAdmin
