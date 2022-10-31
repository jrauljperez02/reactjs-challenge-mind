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

        console.log(arrayOfUsersToPost)
    }

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
                    Add Account
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
                            

                            {/* <Form.Group controlId="coworkers">
                                <Form.Label>Coworkers</Form.Label>
                                <select multiple className="form-select">
                                {users.map(user=>
                                    <option key={user.id}>{user.name} - {user.id}</option>)}
                                </select>
                            </Form.Group> */}
                            <Multiselect 
                                isObject = {false}
                                options={arrayOfUsers}
                                onRemove = {e => e}
                                onSelect = {e => setUsersInput(e)}
                            />



                            <Form.Group>
                                <Button 
                                    style= {{marginTop:15}}
                                    variant="primary" 
                                    type="submit">
                                    Add Account
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