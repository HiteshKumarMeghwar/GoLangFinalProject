import React from 'react'
import { Link } from 'react-router-dom'

function Navv() {
    return (
        <>
        <section>
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <Link to="/" className="flex items-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-d8t7uANGKHm2xN5PtBAQPkfKJc-UhSjVQLvtS65E&s" className="h-10 mr-3 sm:h-10" alt="Flowbite Logo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">My App</span>
                </Link>
                <button id="hamburger-button" data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 cursor-pointer focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="true">
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <Link to="/login" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</Link>
                    </li>
                    <li>
                        <Link to="/register" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</Link>
                    </li>
                    </ul>
                </div>
            </div>
            </nav>
        </section>
        <section id='mobile-menu' className='absolute top-0 bg-black w-full text-5xl flex-col justify-content-center origin-top animate-open-menu hidden'>
            <button className='text-8xl self-end px-6 text-white'>
            &times;
            </button>
            <nav className='flex flex-col min-h-screen items-center py-8' aria-label='mobile'>
            <Link to="/" className='w-full text-center py-6 hover:opacity-90'>Home</Link>
            <Link to="/register" className='w-full text-center py-6 hover:opacity-90'>Register</Link>
            <Link to="/login" className='w-full text-center py-6 hover:opacity-90'>Login</Link>
            </nav>
        </section>
        </>

    )
}

export default Navv
