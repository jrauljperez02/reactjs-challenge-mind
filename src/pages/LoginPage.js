import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import '../styles/LoginPage.css'

const LoginPage = () => {
    let {loginUser} = useContext(AuthContext)
    return (
        <form className='login_form' onSubmit={loginUser}>
            <h1>Login</h1>
            <label>Email:</label>
            <input 
                type="text" 
                name="email" 
                className='login-input_field'
                placeholder="Enter email" />

            <label>Password:</label>   
            <input 
                type="password" 
                name="password"    
                className='login-input_field'
                placeholder="Enter Password" />
            <button type='submit'>Sig in</button>
        </form>
    )
}

export default LoginPage