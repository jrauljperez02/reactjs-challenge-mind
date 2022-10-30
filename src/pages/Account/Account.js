import React, {useState, useContext} from 'react'
import { Table } from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import AuthContext from '../../context/AuthContext';


import AddAccountModal from '../../components/modals/Account/AddAccountModal';

const Account = () => {

  let {authTokens} =  useContext(AuthContext)


  const [name, setName] = useState("")
  const [accounts, setAccounts] = useState([])

  const [addModalShow, setAddModalShow] = useState(false)

  const [accountID, setAccountID] = useState('')


  let addModalClose=()=>setAddModalShow(false);


  const deleteAccount = async(accountID,accountName) => {
    if(window.confirm(`Are you sure you want to delete account ${accountName}?`)){
      const response = await fetch(`http://127.0.0.1:8000/api-account/accounts/${accountID}/`,{
          method: 'DELETE',
          headers: {
              Accept: 'application/json',
              'Authorization' : `Bearer ${authTokens.access}`,
          }
      })
      if(response.status === 204){
          alert("Account deleted successfully!")
      }
  }
  }



  const handleClick = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api-account/accounts/?account_name__icontains=${name}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Authorization' : `Bearer ${authTokens.access}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      setAccounts(result);
    } catch (err) {
      console.log(err.message);
    }
  };


  return(
    <div className='container'>
        <h3 className="m-3 d-flex justify-content-center">Account page</h3>

        <div style={{paddingBottom: 20}}>
          <h3>Consult accounts by name</h3>
          <p>(Leave field empty to search for all users)</p>
          <input 
              className='form-control'
              onChange={e => setName(e.target.value)}
              placeholder='Enter name'
          />
          <button 
              style={{marginTop: 20}}
              className='btn btn-primary' onClick = {handleClick}>Search account</button>
        </div>

        <Table className='table'  bordered hover size="sm">
            <thead className='thead-dark'>
                <tr>
                    <th>Account ID</th>
                    <th>Account name</th>
                    <th>Account customer</th>
                    <th>Operational Responsable</th>
                    <th>Team ID</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {accounts.map(account => 
                    <tr key = {account.id}>
                        <td>{account.id}</td>
                        <td>{account.account_name}</td>
                        <td>{account.account_customer}</td>
                        <td>{account.operational_responsable}</td>
                        <td>{account.team_id}</td>
                        <td>
                            <ButtonToolbar>
                                <Button 
                                    className='mr-3' 
                                >Edit</Button>
                                <Button 
                                    style = {{marginLeft: 8}}
                                    className='btn btn-danger' 
                                    onClick={() => {deleteAccount(account.id, account.account_name)}}  
                                >Delete</Button>
                            </ButtonToolbar>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>


        <ButtonToolbar>
            <Button 
                className='btn btn-success'
                onClick={()=>setAddModalShow(true)}>
                Add account
            </Button>

                <AddAccountModal 
                    show = {addModalShow}
                    onHide = {addModalClose}
                   />
        </ButtonToolbar>
    </div>
  )
  
}

export default Account