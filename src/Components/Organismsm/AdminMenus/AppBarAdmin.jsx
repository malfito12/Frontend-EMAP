import { AppBar, Button, CssBaseline, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import {Link} from 'react-router-dom'


const useStyles=makeStyles((theme)=>({
    diseño:{
        background:'#141e30'
    }
}))
const AppBarAdmin = (props) => {
    const classes=useStyles()
    const removeToken=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('rols')
        window.location='/login'
    }
    return (
        <div>
        <CssBaseline/>
        <AppBar position='fixed' className={classes.diseño}>
        {/* <AppBar position='relative' className={classes.diseño}> */}
            <Toolbar>
                <IconButton
                    color='inherit'
                    aria-label='menu'
                    edge='start'
                    onClick={props.OpenDrawer}
                >
                    <MenuIcon />
                </IconButton>
                <Typography style={{flexGrow:1}}></Typography>
                <Button color='inherit' style={{marginRight:'1rem'}} component={Link} to='/homeadmin'>Home</Button>
                <Button color='inherit' onClick={removeToken}>Cerrar Sesion</Button>
            </Toolbar>
        </AppBar>
        </div>
    )
}

export default AppBarAdmin
