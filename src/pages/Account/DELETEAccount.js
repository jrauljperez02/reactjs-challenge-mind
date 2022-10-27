import React, {useState, useContext} from 'react'

import AuthContext from '../../context/AuthContext';

const DELETEAccount = () => {

  const [input, setInput] = useState('');

  let {authTokens} = useContext(AuthContext)

  
  const handleDelete = async(e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/api-account/accounts/${input}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${authTokens.access}`,
      }
    })
    if(response.status === 204){
      alert("Account deleted successfully!")
    }
  }

  return (
    <div className='user_http_method'>
        <div className='account_finder'>
            <h3>Delete accounts by id</h3>
            <input placeholder='Enter ID' onChange={e => setInput(e.target.value)}/>
            <div className=''>
              <button onClick={handleDelete}>Delete account</button>
            </div>
            
      </div>
    </div>
  )
}

export default DELETEAccount