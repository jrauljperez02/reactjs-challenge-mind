import React, {useState , useContext} from 'react'
import AuthContext from '../../context/AuthContext';

const UPDATEAccount = () => {

  let {authTokens} = useContext(AuthContext)


  const [input, setInput] = useState({
    account_name: '',
    account_customer: '',
    operational_responsable: '',
    team_consult: '',
  })

  const [id, setID] = useState('')

  const handleUpdate = async(e) => {
    e.preventDefault();
    
    const response = await fetch(`http://localhost:8000/api-account/accounts/${id}/`,{
      method: 'PATCH',
      body: JSON.stringify(input),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization' : `Bearer ${authTokens.access}`,
      },
    })
    if(response.status === 200){
      alert('Account updated successfully!')
    }
  }

  return (
    <div className='user_http_method'>
        <div className='user_http_method_options'>
            <h3>Update account by id</h3>
            <input 
                onChange={e => setID(e.target.value)}
                placeholder='Enter ID'
            />
        </div>
        <form>
          <input placeholder='Account name' onChange={e => setInput({...input, account_name: e.target.value})}/>
          <input placeholder='Account customer' onChange={e => setInput({...input, account_customer: e.target.value})}/>
          <input placeholder='Operational Responsable' onChange={e => setInput({...input, operational_responsable: e.target.value})}/>
          <input placeholder='Team Consult' onChange={e => setInput({...input, team_consult: e.target.value})}/>
          
          <div className='account_finder'>
            <button onClick={handleUpdate} >Update account</button>
          </div>        
        </form>
    </div>
  )
}

export default UPDATEAccount