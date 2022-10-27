import React, {useState} from 'react'

const DELETETeam = () => {

  const [input, setInput] = useState('');
  
  const handleDelete = async(e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/api-team/${input}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if(response.status === 204){
      alert("Team deleted successfully!")
    }
  }

  return (
    <div className='user_http_method'>
        <div className='team_finder'>
            <h3>Delete teams by id</h3>
            <input placeholder='Enter ID' onChange={e => setInput(e.target.value)}/>
            <div className=''>
              <button onClick={handleDelete}>Delete team</button>
            </div>
            
      </div>
    </div>
  )
}

export default DELETETeam