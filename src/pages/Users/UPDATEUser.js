import React, { useState } from 'react'

const UPDATEUser = () => {

  const [input, setInput] = useState({
    name: '',
    english_level :'',
    technical_skills: '',
    resume_link: '',
  })

  const [id, setID] = useState('')

  const handleUpdate = async(e) => {
    e.preventDefault();
    
    const response = await fetch(`http://localhost:8000/api-users-admin/${id}/`,{
      method: 'PATCH',
      body: JSON.stringify(input),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    if(response.status === 200){
      alert('User updated successfully!')
    }
  }


  return (
    <div className='user_http_method'>
        <div className='user_http_method_options'>
            <h3>Update users by id</h3>
            <input 
                onChange={e => setID(e.target.value)}
                placeholder='Enter ID'
            />
        </div>
        <form className='user_http_method_form' onSubmit={handleUpdate}>
            <input placeholder='Name' onChange={e => setInput({...input, name: e.target.value})}/>
            <input placeholder='English level' onChange={e => setInput({...input, english_level: e.target.value})}/>
            <input placeholder='Technical Skills' onChange={e => setInput({...input, technical_skills: e.target.value})}/>
            <input placeholder='Resume link' onChange={e => setInput({...input, resume_link: e.target.value})}/>
            <button type='submit'>Update user</button>
        </form>
        

    </div>
  )
}

export default UPDATEUser