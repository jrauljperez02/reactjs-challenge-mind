import React, {useContext} from 'react'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'
import AuthContext from '../../context/AuthContext'

const AddUserModal = (props) => {

    let {authTokens} = useContext(AuthContext)

    const handleSubmit = async(event) => {   
        event.preventDefault();

        const response = await fetch('http://127.0.0.1:8000/api-users-admin/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization' : `Bearer ${authTokens.access}`,
            },
            body:JSON.stringify({
                'email': event.target.email.value,
                'password': event.target.password.value,
                'name': event.target.name.value,
                'english_level': event.target.english_level.value,
                'technical_skills': event.target.technical_skills.value,
                'resume_link': event.target.resume_link.value
            })
        })

        if(response.status === 201 || response.status === 200){
            alert('User added successfully!')
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
                        Add User
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" name="email" required placeholder="Email"/>


                                <Form.Label>Password</Form.Label>
                                <Form.Control type="text" name="password" required placeholder="Password"/>
                                    

                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" required placeholder="Name"/>

                                <Form.Label>English Level</Form.Label>
                                <Form.Control type="text" name="english_level" required placeholder="English Level"/>
                                
                                <Form.Label>Technical skills</Form.Label>
                                <Form.Control type="text" name="technical_skills" required placeholder="Technical Skills"/>

                                <Form.Label>Resume link</Form.Label>
                                <Form.Control type="text" name="resume_link" required placeholder="Resume Link"/>

                                <Form.Group>
                                    <Button 
                                        style={{marginTop: 10}}
                                        variant="primary" 
                                        type="submit">
                                        Add User
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

export default AddUserModal