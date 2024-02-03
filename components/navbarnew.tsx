
import Link from 'next/link'
//import '../styles/globals.css'
import styles from '../styles/Navbar.module.css'
import { FaGuitar } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import Cookies from 'js-cookie';
import { MouseEventHandler, useEffect, useState } from 'react';
import AppContext from '@/components/AppContext'
import { useContext } from 'react'
import { useRouter } from 'next/router';

function Navbar(): JSX.Element {

  const context = useContext(AppContext)
  const contextMe = context.me.data
  console.log('contextMe', contextMe)
  var meCookies = Cookies.get('me')
  console.log('meCookies', meCookies)
  const handleClose = () => {
    const target = document.querySelector('.menuItemsHamburger')
    target.classList.toggle('show')
  }
  const handleLogOut = () => {
    Cookies.remove('authToken')
    console.log('hello')
    context.setMe({})
    Cookies.remove('me')
  }
  const handleHamburger = () => {
    console.log('it clicked')
    const target = document.querySelector('.menuItemsHamburger')
    if (target) {

      target.classList.toggle('show')
    }
  }

  return (
    <nav className='navbar'>
      <Link href='/' className="logo"><FaGuitar />Chordio</Link>
      <div className="menuItems">

        <ul>
          {meCookies && (
            <>
              <li>
                <Link className={"link"} href="/mysongs">Transposer</Link>
              </li>
              <li>
                <Link className={"link"} href="/savedchords">Saved</Link>
              </li>
            </>
          )}
          <li>
            <div className="dropdown">
              <span className='link bubble onlyBubble'>Account</span>
              <div className="dropdownContent">
                {meCookies && (
                  <>
                    <Link onClick={handleLogOut} className='link' href="/">Logout</Link>
                  </>
                )}
                {!meCookies && (
                  <>
                    <Link className='link' href="/login">Login</Link>
                    <Link className='link' href="/register">Register</Link>
                    <Link onClick={handleLogOut} className='link' href="/">Logout</Link>
                  </>
                )}


              </div>
            </div>

          </li>
        </ul>
      </div>

      <div onClick={handleHamburger} className="hamburger">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>

      </div>
      <div className="menuItemsHamburger">
        <div className="menuItemsmobile">
          <ul>
            {meCookies && (
              <><li>
                <Link onClick={handleClose} className={"link"} href="/mysongs">Transposer</Link>
              </li><li>
                  <Link onClick={handleClose} className={"link"} href="/savedchords">Saved</Link>
                </li>
                <Link onClick={handleLogOut} className='link' href="/">Logout</Link>
              </>

            )}
            {!contextMe && (
              <>
                <Link onClick={handleClose} className='link' href="/login">Login</Link>
                <Link onClick={handleClose} className='link' href="/register">Register</Link>
              </>
            )}

            {/* <li>
              <div className="dropdown ">
                <span className='link bubble onlyBubble'>Account</span>
                <div className="dropdown-content">
                  <Link className='link' href="/login">Login</Link>
                  <Link className='link' href="/register">Register</Link>
                  <Link onClick={handleLogOut} className='link' href="/">Logout</Link>
                </div>
              </div>

            </li> */}


          </ul>

        </div>
      </div>
    </nav>
  )
}

export default Navbar;