import React from 'react'
import useApi from '../../hooks/useApi'
import '../../styles/Profile.css'
// import AuthContext from '../../context/AuthContext'

const Profile = () => {

    const authTokens = {
        access : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY2ODc4NDYzLCJpYXQiOjE2NjY4NzgxNjMsImp0aSI6ImM2NDU3MWY3MmQwMzRkZWZiNjA3M2YwMGMxYjIxODQ1IiwidXNlcl9pZCI6MSwiZW1haWwiOiJqcmF1bGpwZXJlejAyLmRldkBnbWFpbC5jb20iLCJpc19zdGFmZiI6dHJ1ZSwiaXNfc3VwZXJ1c2VyIjp0cnVlLCJuYW1lIjoiSmVzdXMgUmF1bCBKaW1lbmV6IFBlcmV6In0.UHUV19O_-6FxeQCgtpsOmaN2SzE6a_Dzt7q0Jx0BzHY"
    }

    const { data } = useApi(
        {
            url:  'http://localhost:8000/api-user/me/',
            method: 'GET',
            Authorization: `Bearer ${authTokens.access}` ,
            body: null
        }
    );  

    return (
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
    )
}

export default Profile