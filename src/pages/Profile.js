import React, {useContext} from 'react'
import '../styles/Profile.css'
import AuthContext from '../context/AuthContext'
import Sidebar from '../components/Sidebar'

const Profile = () => {

    let { user} = useContext(AuthContext)

    return (
        <Sidebar>
            {user &&
                <section className="vh-100">
                    <div className="container py-5 h-100">
                      <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-6 mb-4 mb-lg-0">
                          <div className="card mb-3">
                            <div className="row g-0">
                              <div className="col-md-4 gradient-custom text-center text-white">
                                <img src="https://syscap.com.mx/_nuxt/img/img-profile-1.3c1c60f.webp"
                                  alt="Avatar" className="img-fluid my-5" />
                                <h6>{user.name}</h6>
                                <p></p>
                                <i className="far fa-edit mb-5"></i>
                              </div>
                              <div className="col-md-8">
                                <div className="card-body p-4">
                                  <h6>Information</h6>
                                  <hr className="mt-0 mb-4"/>
                                  <div className="row pt-1">
                                    <div className="col-6 mb-3">
                                      <h6>Email</h6>
                                      <p className="text-muted">{user.email}</p>
                                    </div>
                                    <div className="col-6 mb-3">
                                      <h6>English level</h6>
                                      <p className="text-muted">{user.english_level}</p>
                                    </div>
                                  </div>
                                  <h6>Resume link</h6>
                                  <a href={user.resume_link} style ={{color: 'steelblue'}}>{user.resume_link}</a>
                                  <hr className="mt-0 mb-4"/>
                                  <div className="row pt-1">
                                    <div className="col-6 mb-3">
                                      <h6>Technical Skills</h6>
                                      <p className="text-muted">{user.technical_skills}</p>
                                    </div>
                                    <div className="col-7 mb-3">
                                      <h6>Staff / superuser status</h6>
                                      {user.is_staff && <p className="text-muted">Is staff ✅</p>}
                                      {user.is_superuser && <p className="text-muted">Is superuser ✅</p>}                                      
                                    </div>                               
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
            }
        
    </Sidebar>
    )
}

export default Profile