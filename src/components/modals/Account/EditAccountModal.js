import React,{useContext, useState, useEffect} from 'react'
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';
import AuthContext from '../../../context/AuthContext';

const EditAccountModal = (props) => {

    const [users, setUsers] = useState([]);
    const [teams, setTeams] = useState([]);

    let {authTokens} = useContext(AuthContext)

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


        const loadTeams = async() => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api-team/`, {
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




    const handleSubmit = async(event) => {
        event.preventDefault();

        const response = await fetch(`http://127.0.0.1:8000/api-account/accounts/${props.accountId}/`,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization' : `Bearer ${authTokens.access}`,
            },
            body:JSON.stringify({
                'account_name': event.target.AccountName.value,
                'account_customer': event.target.AccountCustomer.value,
                'operational_responsable': event.target.OperationalResponsable.value.split(' - ')[1],
                'team_id': event.target.TeamID.value.split(' - ')[1]
            })
        })

        if(response.status === 201 || response.status === 200){
            alert('Account updated successfully!')
        }else{
            alert("Something went wrong")
        }
    }

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
                    Update {props.accountName} account
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>

<Row>
    <Col sm={6}>
        <Form onSubmit={handleSubmit}>

            <Form.Group controlId="AccountName">
                <Form.Label>Account name</Form.Label>
                <Form.Control type="text" name="account_name" required 
                placeholder="Account name"/>
            </Form.Group>

            <Form.Group controlId="AccountCustomer">
                <Form.Label>Account customer</Form.Label>
                <Form.Control type="text" name="account_customer" required 
                placeholder="Account customer"/>
            </Form.Group>

            <Form.Group controlId="OperationalResponsable">
                <Form.Label>Operational Responsable</Form.Label>
                <Form.Control as="select">
                {users.map(user=>
                    <option key={user.id}>{user.name} - {user.id}</option>)}
                </Form.Control>
            </Form.Group>


            <Form.Group controlId="TeamID">
                <Form.Label>Assigned team</Form.Label>
                <Form.Control as="select">
                {teams.map(team=>
                    <option key={team.id}>{team.team_name} - {team.id}</option>)}
                </Form.Control>
            </Form.Group>


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

export default EditAccountModal