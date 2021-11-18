import { AppBar, Avatar, Button, CssBaseline, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Menu, Toolbar, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import LogoutOutlinedIcon from '@material-ui/icons/ExitToApp'
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    diseño: {
        background: '#424242'
    }
}))
const AppBarUser = (props) => {
    const classes = useStyles()
    const [openMenu, setOpenMenu] = useState(null)

    //----------------MENU------------------------
    const openMenuAvatar = (e) => {
        setOpenMenu(e.currentTarget)
    }
    const closeMenuAvatar = () => {
        setOpenMenu(null)
    }
    //-------------------------------------------
    const removeToken = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('rols')
        localStorage.removeItem('username')
        window.location = '/'
    }
    const nameAvatar = localStorage.getItem('username')
    return (
        <>
            <CssBaseline />
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
                    <Button color='inherit' component={Link} to='/homeuser'>Inicio</Button>
                    <Typography style={{ flexGrow: 1 }}></Typography>
                    <IconButton onClick={openMenuAvatar}>
                        <Avatar style={{ width: 32, height: 32 }}>{nameAvatar[0].toUpperCase()}</Avatar>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Menu
                anchorEl={openMenu}
                open={Boolean(openMenu)}
                onClose={closeMenuAvatar}
                keepMounted
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
            >
                <List style={{padding:'0'}}>
                    <ListItem divider>
                        <ListItemIcon style={{ color: 'red' }}>
                            <Avatar style={{ width: 32, height: 32 }}>{nameAvatar[0].toUpperCase()}</Avatar>
                        </ListItemIcon>
                        <ListItemText primary={nameAvatar} />
                    </ListItem>
                    <ListItem button onClick={removeToken}>
                        <ListItemIcon style={{ color: 'red' }}>
                            <LogoutOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary='Cerrar Sesión' />
                    </ListItem>
                </List>
            </Menu>
        </>
    )
}

export default AppBarUser
