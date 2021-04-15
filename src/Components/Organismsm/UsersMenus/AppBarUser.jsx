import { AppBar, CssBaseline, IconButton, makeStyles, Toolbar } from '@material-ui/core'
import React from 'react'
import MenuIcon from '@material-ui/icons/Menu'


const useStyles=makeStyles((theme)=>({
    diseño:{
        background:'#00796b'
    }
}))
const AppBarUser = (props) => {
    const classes=useStyles()
    return (
        <div>
        <CssBaseline/>
        <AppBar position='static' className={classes.diseño}>
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

export default AppBarUser
