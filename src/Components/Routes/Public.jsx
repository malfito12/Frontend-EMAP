import React from 'react'
// import { Route,Redirect } from 'react-router-dom'
import {Route, Redirect } from 'react-router-dom'

const Public = ({ component: Component, ...rest }) => {
    const userLogged = localStorage.getItem('token')
    if(userLogged){
        return <Redirect to='/homeadmin' />
    }
    // if (userLogged && rols==='admin') {
    //     console.log('entra a admin')
    //     return <Redirect to='/homeadmin' />
    // }else if(userLogged && rols==='usuario'){
    //     console.log('entra a user')
    //     return <Redirect to='/homeuser' />
    // }
    return <Route {...rest} component={Component} />
}

export default Public
