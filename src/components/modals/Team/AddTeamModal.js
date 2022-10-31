import React, { useEffect, useState, useContext } from 'react'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'
import AuthContext from '../../../context/AuthContext';

import Multiselect from 'multiselect-react-dropdown'



const AddTeamModal = (props) => {

    const {authTokens} = useContext(AuthContext);

    const [users, setUsers] = useState([]);
    const [usersInput, setUsersInput] = useState([]);


    const handleSubmit = async(event) => {
        event.preventDefault();
        const arrayOfUsersToPost = usersInput.map(user => user.split(' - ')[1])

        const response = await fetch('http://127.0.0.1:8000/api/team/teams/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization' : `Bearer ${authTokens.access}`,
            },
            body:JSON.stringify({
                'team_name': event.target.team_name.value,
                'coworkers': arrayOfUsersToPost,
            })
        })

        if(response.status === 201 || response.status === 200){
            alert('Team added successfully!')
        }else{
            alert("Something went wrong")
        }
        
    }

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

        loadUsers();

    },[authTokens.access])

    const arrayOfUsers = users.map(user =>  {
        return `${user.name} - ${user.id}`
    })

    

  return (
    <div className='container'>
        <Modal 
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Header clooseButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Team
                </Modal.Title>
            </Modal.Header>


            <Modal.Body>

                <Row>
                    <Col sm={6}>
                        <Form onSubmit={handleSubmit}>

                            <Form.Group controlId="TeamName">
                                <Form.Label>Team name</Form.Label>
                                <Form.Control type="text" name="team_name" required 
                                placeholder="Team name"/>
                            </Form.Group>
                            

                            <Form.Group controlId="coworkers">
                                <Form.Label>Coworkers</Form.Label>
                                <Multiselect 
                                    isObject = {false}
                                    options={arrayOfUsers}
                                    onRemove = {e => e}
                                    onSelect = {e => setUsersInput(e)}
                                />
                            </Form.Group>
                            



                            <Form.Group>
                                <Button 
                                    style= {{marginTop:15}}
                                    variant="primary" 
                                    type="submit">
                                    Add Team
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>




            <Modal.Footer>
                 <Button variant="danger" onClick={props.onHide}>Close</Button>
            </Modal.Footer>

        </Modal>
    </div>
  )
}

export default AddTeamModal