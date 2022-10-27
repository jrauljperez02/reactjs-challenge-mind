import React, { useState } from 'react'

const DELETEUser = () => {

  const [input, setInput] = useState('');
  
  const handleDelete = async(e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/api-users-admin/${input}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if(response.status === 204){
      alert("User deleted successfully!")
    }
  }


  return (
    <div className='user_http_method'>
        <div>
            <h3>Delet users by id</h3>
            <input placeholder='Enter ID' onChange={e => setInput(e.target.value)}/>
            <button onClick={handleDelete}>Delete user</button>
      </div>
    </div>
  )
}

export default DELETEUser