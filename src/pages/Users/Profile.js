import React, {useContext} from 'react'
import useApi from '../../hooks/useApi'
import '../../styles/Profile.css'
import AuthContext from '../../context/AuthContext'
import Sidebar from '../../components/Sidebar'

const Profile = () => {

    let {authTokens, user} = useContext(AuthContext)

    const { data } = useApi(
        {
            url:  'http://localhost:8000/api-user/me/',
            method: 'GET',
            Authorization: `Bearer ${authTokens.access}` ,
            body: null
        }
    );  

    return (
        <Sidebar>
            {user ? 
                (
                    <div className='profile'>
            <h3>Your profile!</h3>
            {data === null ? null : (
                <div className='profile_elements'>
                    <img  src = 'https://www.mobisafar.com/images/testimonial/dummy-profile.png' width='300px' height='300px' alt='img-profile'/>
                    <div className='profile_elements_text'>
                        <p>ID: {data.id}</p>
                        <p>Name: {data.name}</p>
                        <p>Email: {data.email}</p>
                        <p>English level: {data.english_level}</p>
                        <p>Technical skills: {data.technical_skills}</p>
                        <p>Resume link: <a href = {data.resume_link}>{data.resume_link}</a></p>

                        {data.is_staff ? <p>Is staff ✅</p>: null}
                        {data.is_superuser ? <p>Is superuser ✅</p>: null}
                    </div>
                </div>
            )}
        
         </div>
                ): null
            }
        
    </Sidebar>
    )
}

export default Profile