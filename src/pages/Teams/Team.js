import React, {useState, useContext, useEffect} from 'react'
import AuthContext from '../../context/AuthContext'

import { Table } from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';

import {convertArrayToObject} from '../../utils/convertArrayToObject'

import AddTeamModal from '../../components/modals/Team/AddTeamModal';
import EditTeamModal from '../../components/modals/Team/EditTeamModal';

const Team = () => {

    let {authTokens} =  useContext(AuthContext)

    const [name, setName] = useState("")
    const [teams, setTeams] = useState([])

    const [users, setUsers] = useState([]);


    const [teamID, setTeamID] = useState('');
    const [teamName, setTeamName] = useState('');

    const [addModalShow, setAddModalShow] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)

    let addModalClose=()=>setAddModalShow(false);
    let editModalClose=()=>setEditModalShow(false);

    const deleteTeam = async(teamID,teamName) => {
        if(window.confirm(`Are you sure you want to delete ${teamName} team?`)){
          const response = await fetch(`http://127.0.0.1:8000/api-team/${teamID}/`,{
              method: 'DELETE',
              headers: {
                  Accept: 'application/json',
                  'Authorization' : `Bearer ${authTokens.access}`,
              }
          })
          if(response.status === 204){
              alert("Team deleted successfully!")
          }
        }
    }

    const handleClick = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api-team/?team_name__icontains=${name}`, {
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
      };

      useEffect(() => {
        
        const loadUsers = async() => {
            try {
                const response = await fetch(`http://localhost:8000/api-users-admin/`, {
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
    
        loadUsers();

    
    },[authTokens.access])


    const usersObject = convertArrayToObject(users,'id');
      
    

  return (
    <div className='container'>
        <h3 className="m-3 d-flex justify-content-center">Teams page</h3>

        <div style={{paddingBottom: 20}}>
        <h3>Consult teams by name</h3>
        <p>(Leave field empty to search for all users)</p>
        <input 
            className='form-control'
            onChange={e => setName(e.target.value)}
            placeholder='Enter name'
        />
        <button 
            style={{marginTop: 20}}
            className='btn btn-primary' onClick = {handleClick}>Search team</button>
        </div>

        <Table className='table'  bordered hover size="sm">
            <thead className='thead-dark'>
                <tr>
                    <th>Team ID</th>
                    <th>Team name</th>
                    <th>Coworkers</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {teams.map(team => 
                    <tr key = {team.id}>
                        <td>{team.id}</td>
                        <td>{team.team_name}</td>
                        <td>
                            <ul className='list-group list-group-flush'>
                            {team.coworkers.map(coworkerID => <li key = {coworkerID} className='list-group-item'>{usersObject[coworkerID].name}</li>)}
                            </ul>
                        </td>
                        <td>
                            <ButtonToolbar>
                                <Button 
                                    className='mr-3' 
                                    onClick = {() => {
                                        setEditModalShow(true); 
                                        setTeamID(team.id);
                                        setTeamName(team.team_name)
                                    }}
                                >Edit</Button>
                                <Button 
                                    style = {{marginLeft: 8}}
                                    className='btn btn-danger' 
                                    onClick={() => {deleteTeam(team.id, team.team_name)}}  
                                >Delete</Button>

                                <EditTeamModal
                                    show = {editModalShow}
                                    onHide = {editModalClose}
                                    teamID = {teamID}
                                    teamName = {teamName}
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
                Add team
            </Button>

                <AddTeamModal 
                    show = {addModalShow}
                    onHide = {addModalClose}
                   />
        </ButtonToolbar>
        
    </div>
  )
}

export default Team