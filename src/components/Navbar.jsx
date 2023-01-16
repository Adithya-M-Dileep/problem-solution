import React from 'react';
import './styles/Navbar.css';

function Navbar(){
    return (
        <div className='Navbar'>
        <ul>
            <li><a href='/'>HOME</a></li>
            <li><form>
            <input type='text' placeholder='Search...' />
            </form></li>
            <li style={{float:'right'}}><div className='options'>
            <a href='/' className="nav-options" >5</a>
            <img className="nav-options"  src="/icon.png" alt="coin" style={{width:'20px',height:'20px'}}></img>
            <a style={{marginLeft:'30px'}}  className="nav-options profile" id='profilePic' href='/'><img src="/profile.png" alt="coin" style={{width:'35px',height:'35px',borderRadius:'50%'}}/>
        </a>
            </div></li>
        </ul>
        </div>
    )
}

export default Navbar;