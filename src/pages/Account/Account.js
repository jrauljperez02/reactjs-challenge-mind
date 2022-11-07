import React, {useState, useContext, useEffect} from 'react'
import { Table } from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import AuthContext from '../../context/AuthContext';

import {convertArrayToObject} from '../../utils/convertArrayToObject'

import AddAccountModal from '../../components/modals/Account/AddAccountModal';
import EditAccountModal from '../../components/modals/Account/EditAccountModal';

const Account = () => {

  let {authTokens} =  useContext(AuthContext)


  const [name, setName] = useState("")
  const [accounts, setAccounts] = useState([])

  const [addModalShow, setAddModalShow] = useState(false)
  const [editModalShow, setEditModalShow] = useState(false)

  const [accountID, setAccountID] = useState('')
  const [accountName, setAccountName] = useState('')
  const [accountCustomer, setAccountCustomer] = useState('')


  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);


  let addModalClose=()=>setAddModalShow(false);
  let editModalClose=()=>setEditModalShow(false);


  const deleteAccount = async(accountID,accountName) => {
    if(window.confirm(`Are you sure you want to delete account ${accountName}?`)){
      const response = await fetch(`http://127.0.0.1:8000/api/account/accounts/${accountID}/`,{
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
      const response = await fetch(`http://127.0.0.1:8000/api/account/accounts/?account_name__icontains=${name}`, {
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


  useEffect(() => {
        
    const loadUsers = async() => {
        try {
            const response = await fetch(`http://localhost:8000/api/user/users/`, {
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
            setUsers(result);
          } catch (err) {
            console.log(err.message);
          }
    }


    const loadTeams = async() => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/team/teams/`, {
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
            setTeams(result);
          } catch (err) {
            console.log(err.message);
          }
    }

    loadUsers();
    loadTeams();

},[authTokens.access])


  const usersObject = convertArrayToObject(users,'id');
  const teamsObject = convertArrayToObject(teams,'id');




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

              {usersObject === {} && null}
                {usersObject !== {} &&
                accounts.map(account => 
                    <tr key = {account.id}>
                        <td>{account.id}</td>
                        <td>{account.account_name}</td>
                        <td>{account.account_customer}</td>
                        <td>{usersObject[account.operational_responsable].name}</td>
                       <td>{teamsObject[account.team_id].team_name}</td>
                        <td>
                            <ButtonToolbar>
                                <Button 
                                    className='mr-3' 
                                    onClick = {() => {
                                      setEditModalShow(true); 
                                      setAccountID(account.id);
                                      setAccountName(account.account_name)
                                      setAccountCustomer(account.account_customer)
                                    }}
                                >Edit</Button>
                                <Button 
                                    style = {{marginLeft: 8}}
                                    className='btn btn-danger' 
                                    onClick={() => {deleteAccount(account.id, account.account_name)}}  
                                >Delete</Button>

                                <EditAccountModal 
                                  show = {editModalShow}
                                  onHide = {editModalClose}
                                  accountId = {accountID}
                                  accountName = {accountName}
                                  accountCustomer = {accountCustomer}
                                />

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