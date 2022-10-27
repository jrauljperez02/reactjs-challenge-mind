import React, {useState} from 'react'

const POSTTeam = () => {

  const [name, setName] = useState('')
  const [coworkersID, setCoworkersID] = useState(null)

  const handleCreate = async(e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api-team/', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        'team_name': name,
        'coworkers': [Number(coworkersID)]
      })
    })

    if(response.status === 201){
      alert('Team added successfully!')
    }
  }


  return (
    <div className='user_http_method'>
        <h3>Register a new team</h3>
        <form>
          <input placeholder='Team name' onChange={e => setName(e.target.value)}/>
          <input placeholder='Coworkers' onChange={e => setCoworkersID(e.target.value)}/>
         
          
          <div className='team_finder'>
            <button onClick={handleCreate} >Register account</button>
          </div>
          
        </form>
    </div>
  )
}

export default POSTTeam