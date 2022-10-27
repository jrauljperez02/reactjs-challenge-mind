import React, {useState} from 'react'

const POSTAccount = () => {

  const [input, setInput] = useState({
    account_name: '',
    account_customer: '',
    operational_responsable: '',
    team_id: '',
  })

  const handleCreate = async(e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api-account/accounts/', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify(input)
    })

    if(response.status === 201){
      alert('Account added successfully!')
    }
  }

  console.log(input)

  return (
    <div className='user_http_method'>
        <h3>Register a new account</h3>
        <form>
          <input placeholder='Account name' onChange={e => setInput({...input, account_name: e.target.value})}/>
          <input placeholder='Account customer' onChange={e => setInput({...input, account_customer: e.target.value})}/>
          <input placeholder='Operational Responsable ID' onChange={e => setInput({...input, operational_responsable: e.target.value})}/>
          <input placeholder='Team ID' onChange={e => setInput({...input, team_id: e.target.value})}/>
          
          <div className='account_finder'>
            <button onClick={handleCreate} >Register account</button>
          </div>
          
        </form>
    </div>
  )
}

export default POSTAccount