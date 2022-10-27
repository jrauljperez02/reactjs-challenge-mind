import React, { useState, useContext } from 'react'
import AuthContext from '../../context/AuthContext'

const POSTUser = () => {

  const {authTokens} = useContext(AuthContext)

  const [input, setInput] = useState({
    email: '',
    password: '',
    name: '',
    english_level: '',
    technical_skills: '',
    resume_link: '',
  })

  const handleCreate = async(e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api-users-admin/', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization' : `Bearer ${authTokens.access}`,
      },
      body: JSON.stringify(input)
    })

    if(response.status === 201){
      alert('User added successfully!')
    }
  }

  return (
    <div className='user_http_method'>
        <h3>Register a new user</h3>
        <form onSubmit={handleCreate}>
          <input placeholder='Email' onChange={e => setInput({...input, email: e.target.value})}/>
          <input placeholder='Password' onChange={e => setInput({...input, password: e.target.value})}/>
          <input placeholder='Name' onChange={e => setInput({...input, name: e.target.value})}/>
          <input placeholder='English level' onChange={e => setInput({...input, english_level: e.target.value})}/>
          <input placeholder='Technical Skills' onChange={e => setInput({...input, technical_skills: e.target.value})}/>
          <input placeholder='Resume link' onChange={e => setInput({...input, resume_link: e.target.value})}/>
        
          <button type='submit'>Register user</button>
        </form>
    </div>
  )
}

export default POSTUser