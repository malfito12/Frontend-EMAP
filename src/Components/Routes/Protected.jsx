import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const Protected = ({component: Component, ...rest}) => {
    const userLogged=localStorage.getItem('token')
    // const userLogged=false
    if(!userLogged){
        // return <Redirect to ="/login"/>
        return <Redirect to ="/homepublic"/>
    }
    return (
        <Route {...rest} component={Component} />
    )
}

export default Protected