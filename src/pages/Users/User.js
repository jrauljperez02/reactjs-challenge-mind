import React, { useState, useContext } from 'react'
import { Table } from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';

import AuthContext from '../../context/AuthContext';
import AddUserModal from '../../components/modals/User/AddUserModal';
import EditUserModal from '../../components/modals/User/EditUserModal';

const User = () => {

    const [users, setUsers] = useState([])
    const [name, setName] = useState("")
    const [addModalShow, setAddModalShow] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)

    const [userId, setUserId] = useState('')
    const [userName, setUserName] = useState('')

    const {authTokens} = useContext(AuthContext)

    let addModalClose=()=>setAddModalShow(false);
    let editModalClose=()=>setEditModalShow(false);


    const deleteUser = async(userId) => {
        if(window.confirm(`Are you sure you want to delete user with ID ${userId}?`)){
            const response = await fetch(`http://127.0.0.1:8000/api-users-admin/${userId}/`,{
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Authorization' : `Bearer ${authTokens.access}`,
                }
            })
            if(response.status === 204){
                alert("User deleted successfully!")
            }
        }
    }


    const handleClick = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api-users-admin/?name__icontains=${name}`, {
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
      };
    

  return <div className='container'>
  <h3 className="m-3 d-flex justify-content-center">Users page</h3>
    <div style={{paddingBottom: 20}}>
        <h3>Consult users by name</h3>
        <p>(Leave field empty to search for all users)</p>
        <input 
            className='form-control'
            onChange={e => setName(e.target.value)}
            placeholder='Enter name'
        />
        <button 
            style={{marginTop: 20}}
            className='btn btn-primary' onClick = {handleClick}>Search users</button>
      </div>

        <Table className='table'  bordered hover size="sm">
            <thead className='thead-dark'>
                <tr>
                    <th>User ID</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>English level</th>
                    <th>Technical skills</th>
                    <th>Resume link</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => 
                    <tr key = {user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.name}</td>
                        <td>{user.english_level}</td>
                        <td>{user.technical_skills}</td>
                        <td>{user.resume_link}</td>
                        <td>
                            <ButtonToolbar>
                                <Button 
                                    className='mr-3' 
                                    onClick={() => {
                                        setEditModalShow(true); 
                                        setUserId(user.id);
                                        setUserName(user.name);
                                    }}
                                >Edit</Button>
                                <Button 
                                        style = {{marginLeft: 8}}
                                        className='btn btn-danger' 
                                        onClick={() => {deleteUser(user.id)}}
                                >Delete</Button>

                                <EditUserModal 
                                    show = {editModalShow}
                                    onHide = {editModalClose}
                                    userId = {userId}
                                    userName = {userName}
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
                Add user
            </Button>

                <AddUserModal 
                    show = {addModalShow}
                    onHide = {addModalClose}
                   />
        </ButtonToolbar>
    </div>
}

export default User