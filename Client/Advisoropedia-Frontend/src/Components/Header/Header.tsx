import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const Header = () => {
  return (
    <header className="shadow sticky z-50 top-0 ">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
                            className="mr-3 h-12"
                            alt="Logo"
                        />
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <Link
                            to="/login"
                            className="text-gray-800 duration-200 
                             hover:text-orange-500 focus:ring-4
                              focus:ring-gray-300 font-medium rounded-lg
                               text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 
                               focus:outline-none"
                        >
                            Log in
                        </Link>
                        <NavLink
                            to="/signup"
                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Signup
                        </NavLink>
                    </div>
                   
                </div>
            </nav>
        </header>
  )
}