import React,{useContext, useState} from 'react'
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';
import AuthContext from '../../../context/AuthContext';

const EditUserModal = (props) => {

    let {authTokens} = useContext(AuthContext)

    const [isStaff, setIsStaff] = useState(false)
    const [isSuperUser, setIsSuperUser] = useState(false)

    const handleSubmit = async(event) => {   
        event.preventDefault();

        const response = await fetch(`http://127.0.0.1:8000/api/user/users/${props.userId}/`,{
            method:'PATCH',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization' : `Bearer ${authTokens.access}`,
            },
            body:JSON.stringify({
                'email': event.target.email.value,
                'name': event.target.name.value,
                'english_level': event.target.english_level.value,
                'technical_skills': event.target.technical_skills.value,
                'resume_link': event.target.resume_link.value,
                'is_staff': isStaff,
                'is_superuser': isSuperUser,
            })
        })

        if(response.status === 201 || response.status === 200){
            alert('User updated successfully!')
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
                    Update {props.userName} profile
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={handleSubmit}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" name="email" required placeholder="Email"/>
                                     
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name"  required placeholder="Name"/>

                                <Form.Label>English Level</Form.Label>
                                <Form.Control type="text" name="english_level" required placeholder="English Level"/>
                                
                                <Form.Label>Technical skills</Form.Label>
                                <Form.Control type="text" name="technical_skills"  required placeholder="Technical Skills"/>

                                <Form.Label>Resume link</Form.Label>
                                <Form.Control type="text" name="resume_link"  required placeholder="Resume Link"/>

                                <div className='form-check' style={{paddingTop: 15}}>
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={() => {setIsStaff(!isStaff)}}/>
                                    <label className="form-check-label" for="flexCheckDefault">
                                        Is staff?
                                    </label>
                                </div>

                                <div className='form-check'>
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={() => {setIsSuperUser(!isSuperUser)}}/>
                                    <label className="form-check-label" for="flexCheckDefault">
                                        Is superuser?
                                    </label>
                                </div>
                        
                                <Form.Group>
                                    <Button 
                                        style={{marginTop: 10}}
                                        variant="primary" 
                                        type="submit">
                                        Update User
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

export default EditUserModal