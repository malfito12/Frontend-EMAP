import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const Public = ({component: Component, ...rest}) => {
    const userLogged=localStorage.getItem('token')
    // const userLogged=false
    if(userLogged){
        return <Redirect to='/homeadmin' />
    }
    return (
        <Route {...rest} render={Component} />
    )
}

export default Public
