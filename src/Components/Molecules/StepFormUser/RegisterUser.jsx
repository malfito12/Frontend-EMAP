import React from 'react'
import { useForm, useStep } from 'react-hooks-helper'
import UserDates from './UserDates'
import UserNames from './UserNames'
import UserReview from './UserReview'
import UserSubmit from './UserSubmit'

const defaultData={
    username:'',
    password:'',
    email:'',
    sexo:'',
    rols:''
}
const steps=[
{id:'names'},
{id:'dates'},
{id:'review'},
{id:'submit'},
]
const RegisterUser = () => {
    const [formData, setFormData]=useForm(defaultData)
    const {step, navigation}=useStep({
        steps,
        initialStep:0,
    })
    const props={formData, setFormData, navigation}
    switch(step.id){
        case 'names':
            return <UserNames {...props} />
        case 'dates':
            return <UserDates {...props} />
        case 'review':
            return <UserReview {...props} />
        case 'submit':
            return <UserSubmit {...props} />
        default:
    }
    return (
        <div>
            <h1>registrar users</h1>
        </div>
    )
}

export default RegisterUser
