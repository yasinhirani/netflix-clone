import { useAuth0 } from "@auth0/auth0-react";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

const Navbar = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  // console.log(user);
  return (
    <nav className="flex justify-between items-center px-6 md:px-12 py-3 shadow">
      <figure className="w-16">
        <Link to={"/"}>
          <img src="/netflix.png" alt="" />
        </Link>
      </figure>
      {!isAuthenticated && (
        <button className="text-white" onClick={() => loginWithRedirect()}>
          Login
        </button>
      )}
      {isAuthenticated && (
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center items-center space-x-2 w-full rounded-md text-sm font-medium text-white">
              <figure className="w-6 rounded-full overflow-hidden">
                <img src={user.picture} alt="" />
              </figure>
              <span className="text-white hidden md:block">
                {user.nickname}
              </span>
              <ChevronDownIcon className="w-4" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  <button className="px-4 py-2" onClick={() => logout()}>
                    Logout
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </nav>
  );
};

export default Navbar;
