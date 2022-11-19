import React from 'react'
import { Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar-container'>
       <div className="nav-list">
           <Link to="/"> Blogs</Link>
           <Link to="/todo"> Todo</Link>
       </div>
    </div>
  )
}

export default Navbar