import React, { useState, useContext } from 'react';
import {
    FaTeamspeak,
    FaBars,
    FaCommentAlt,
}from "react-icons/fa";
import {CgProfile} from 'react-icons/cg'
import {FiUsers} from 'react-icons/fi'
import {BiLogOut} from 'react-icons/bi'

import {  NavLink } from 'react-router-dom';


import AuthContext from '../context/AuthContext'


const Sidebar = ({children}) => {

    let {user, logoutUser} = useContext(AuthContext)

    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/profile/",
            name:"Your profile",
            icon:<CgProfile/>
        },
        {
            path:"/users/",
            name:"Users",
            icon:<FiUsers/>
        },
        {
            path:"/teams/",
            name:"Teams",
            icon:<FaTeamspeak/>
        },
        {
            path:"/accounts/",
            name:"Accounts",
            icon:<FaCommentAlt/>
        },
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Mind</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" >
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
               {user ? 
                    <NavLink to = '/login/' className='link' onClick={logoutUser}>
                        <div className='icon'><BiLogOut/></div>
                        <div style={{display: isOpen ? "block" : "none"}} className="link_text">Logout</div>
                    </NavLink>: null
                }
              
               
           </div>

           
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;