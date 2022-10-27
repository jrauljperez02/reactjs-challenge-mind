import React, { useState } from 'react'

const UPDATETeam = () => {

  const [id, setID] = useState('')
  const [name, setName] = useState('')
  const [coworkersID, setCoworkersID] = useState(null)

  const handleUpdate = async(e) => {
    e.preventDefault();
    console.log(name, coworkersID)
    
    const response = await fetch(`http://localhost:8000/api-team/${id}/`,{
      method: 'PATCH',
      body: JSON.stringify({
        'team_name': name,
        'coworkers': [Number(coworkersID)]
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    if(response.status === 200){
      alert('Team updated successfully!')
    }
  }

  return (
    <div className='user_http_method'>
    <div className='user_http_method_options'>
        <h3>Update team by id</h3>
        <input 
            onChange={e => setID(e.target.value)}
            placeholder='Enter ID'
        />
    </div>
    <form>
        <input placeholder='Team name' onChange={e => setName(e.target.value)}/>
        <input placeholder='Coworkers' onChange={e => setCoworkersID(e.target.value)}/>
      
      <div className='team_finder'>
        <button onClick={handleUpdate} >Update team</button>
      </div>        
    </form>
</div>
  )
}

export default UPDATETeam