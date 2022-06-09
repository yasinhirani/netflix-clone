import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const {loginWithRedirect, isAuthenticated, logout, user} = useAuth0();
  // console.log(user);
    return (
        <nav className="flex justify-between items-center px-6 md:px-12 py-4 shadow">
        {/* <h1 className="text-2xl text-red-600 tracking-wide">Netflix</h1> */}
        <figure className="w-20">
            <Link to={'/'}><img src="/netflix.png" alt="" /></Link>
        </figure>
        {!isAuthenticated && <button className='text-white' onClick={() => loginWithRedirect()}>Login</button>}
        {isAuthenticated && <div className='flex items-center space-x-3'>
          <figure className='w-8 rounded-full overflow-hidden'>
            <img src={user.picture} alt="" />
          </figure>
          <h4 className='text-white hidden md:block'>{user.nickname}</h4>
        {isAuthenticated && <button className='text-white' onClick={() => logout()}>Logout</button>}
        </div>}
      </nav>
    )
}

export default Navbar
