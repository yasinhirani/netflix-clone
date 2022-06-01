import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const {loginWithRedirect, isAuthenticated, logout, user} = useAuth0();
  console.log(user);
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
          <h4 className='text-white'>{user.nickname}</h4>
        {isAuthenticated && <button className='text-white' onClick={() => logout()}>Logout</button>}
        </div>}
        {/* <div className="flex items-center space-x-4">
          <input
            type="text"
            className="outline-none focus:ring-0 px-2 py-1 rounded-md border border-gray-400"
            name="movie_name"
            id="movie_name"
            placeholder="Search..."
            autoComplete="off"
          />
          <button className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div> */}
      </nav>
    )
}

export default Navbar
