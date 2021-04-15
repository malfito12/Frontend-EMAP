import React from 'react'
import { Redirect, Route } from 'react-router'

const Protected = ({component: Component, ...rest}) => {
    const userLogged=localStorage.getItem('token')
    // const userLogged=false
    if(!userLogged){
        return <Redirect to ='/login'/>
    }
    return (
        <Route {...rest} render={Component} />
    )
}

export default Protected