import React, {useContext} from 'react'
import '../../styles/Profile.css'
import AuthContext from '../../context/AuthContext'
import Sidebar from '../../components/Sidebar'

const Profile = () => {

    let { user} = useContext(AuthContext)
    return (
        <Sidebar>
            {user &&
                    <div className='profile'>
                        <h3>Your profile!</h3>

                        <div className='profile_elements'>
                            <img  src = 'https://www.mobisafar.com/images/testimonial/dummy-profile.png' width='300px' height='300px' alt='img-profile'/>
                            <div className='profile_elements_text'>
                                <p>User id: {user.user_id}</p>
                                <p>Name: {user.name}</p>
                                <p>Email: {user.email}</p>
                                <p>English level: {user.english_level}</p>
                                <p>Technical skills: {user.technical_skills}</p>
                                <p>Resume link: <a href = {user.resume_link}>{user.resume_link}</a></p>

                                {user.is_staff ? <p>Is staff ✅</p>: null}
                                {user.is_superuser ? <p>Is superuser ✅</p>: null}
                            </div>
                        </div>
                    </div>
            }
        
    </Sidebar>
    )
}

export default Profile