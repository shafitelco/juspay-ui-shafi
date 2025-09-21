import React, { useEffect, useState } from 'react'
import HeaderIcon1 from '../../assets/header-icon-1.svg'
import HeaderIcon2 from '../../assets/header-icon-2.svg'
import HeaderIcon3 from '../../assets/header-icon-3.svg'
import HeaderIcon4 from '../../assets/header-icon-4.svg'
import HeaderIcon5 from '../../assets/header-icon-5.svg'
import HeaderIcon6 from '../../assets/header-icon-6.svg'
import HeaderIcon7 from '../../assets/header-icon-7.svg'
import { FiSun } from 'react-icons/fi'
import { IoMoon } from 'react-icons/io5'
import profileIcon from '../../assets/profile-icon.svg'

export default function Header ({
  mobileOpen,
  setMobileOpen,
  dark,
  setDark,
  collapsed,
  setCollapsed
}) {
  const [rightOpen, setRightOpen] = useState(false)
  useEffect(() => {
    if (localStorage.theme === 'dark') {
      setDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newDark = !dark
    setDark(newDark)
    if (newDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const toggleCollapse = () => {
    setCollapsed(prev => !prev)
  }

  return (
    <>
      <header className='sticky top-0 z-20 bg-white dark:bg-[#1A1A1A] border-b dark:border-[#ffffff1A] px-4 py-4'>
        <div className='max-w-[1400px] mx-auto flex items-center justify-between gap-4'>
          <div className='flex items-center gap-3 min-w-0'>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className='mr-1 py-1 px-2 text-sm rounded-md md:hidden'
              aria-label='Toggle sidebar'
            >
              <img src={HeaderIcon1} alt='' className='dark:invert' />
            </button>

            <div className='flex items-center gap-4 min-w-0'>
              {/* LOGO - clicking this toggles collapse on desktop */}
              <img
                src={HeaderIcon1}
                alt='dash'
                className='w-5 h-5 hidden md:block dark:invert cursor-pointer'
                onClick={toggleCollapse}
              />
              <img
                src={HeaderIcon2}
                alt='star'
                className='w-5 h-5 hidden sm:inline dark:invert'
              />
              <div className='truncate'>
                <div className='flex items-center gap-2 whitespace-nowrap'>
                  <span className='text-[#1C1C1C66] text-sm hidden sm:inline dark:text-[#FFFFFF66]'>
                    Dashboards /
                  </span>
                  <span className='text-[#1C1C1C] font-inter dark:text-gray-200 text-sm truncate'>
                    Default
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='flex items-center gap-3 flex-shrink-0'>
            <div className='hidden md:block'>
              <div className='relative '>
                <input
                  type='text'
                  placeholder='Search'
                  className='bg-gray-100 dark:bg-[#FFFFFF1A] placeholder:text-[#1C1C1C33] dark:placeholder:text-[#FFFFFF1A] font-inter rounded-lg pl-8 py-1 text-sm focus:outline-none'
                />
                <img
                  src={HeaderIcon3}
                  alt='search'
                  className='w-4 h-4 dark:invert absolute left-2 top-1/2 -translate-y-1/2'
                />
                <img
                  src={HeaderIcon4}
                  alt='search'
                  className='w-4 h-4 dark:invert absolute right-2 top-1/2 -translate-y-1/2'
                />
              </div>
            </div>

            <div className='hidden md:flex items-center gap-5'>
              <button onClick={toggleTheme} className='rounded-md'>
                {dark ? <IoMoon /> : <FiSun />}
              </button>
              <button className=''>
                <img
                  src={HeaderIcon6}
                  alt='history'
                  className='w-5 h-5 dark:invert'
                />
              </button>
              <button className=''>
                <img
                  src={HeaderIcon7}
                  alt='bell'
                  className='w-5 h-5 dark:invert'
                />
              </button>

              {/* AVATAR - clicking avatar also toggles collapse */}
              <div className='w-5 h-5 rounded-full overflow-hidden cursor-pointer' onClick={toggleCollapse}>
                <img
                  src={HeaderIcon1}
                  alt='avatar'
                  className='w-full h-full dark:invert'
                />
              </div>
            </div>

            <button
              onClick={() => setRightOpen(true)}
              className='md:hidden py-1 px-2 text-sm rounded-md '
              aria-label='Open menu'
            >
              <img src={HeaderIcon1} alt='' className='dark:invert' />
            </button>
          </div>
        </div>
      </header>

      <div
        onClick={() => setRightOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          rightOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      />
      <aside
        className={`fixed top-0 right-0 w-72 max-w-[80%] h-full bg-white dark:bg-[#151414] shadow-lg z-50 transform transition-transform duration-300 ${
          rightOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex items-center justify-between p-4 border-b dark:border-gray-700'>
          <h3 className='text-sm font-medium'>Menu</h3>
          <button
            onClick={() => setRightOpen(false)}
            className='py-1 px-2 text-sm rounded-md bg-gray-100 dark:bg-[#FFFFFF1A]'
          >
            ✕
          </button>
        </div>

        <div className='p-4 space-y-4'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search'
              className='w-full bg-gray-100 dark:bg-[#FFFFFF1A] rounded-md pl-8 pr-3 py-2 text-sm focus:outline-none'
            />
            <img
              src={HeaderIcon3}
              alt='search'
              className='w-4 h-4 dark:invert absolute left-2 top-1/2 -translate-y-1/2'
            />
          </div>

          <button
            onClick={toggleTheme}
            className='w-full p-2 rounded-md bg-gray-100 dark:bg-[#FFFFFF1A] flex items-center gap-3'
          >
            {dark ? <IoMoon /> : <FiSun />}
            <span className='text-sm'>{dark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          <button className='w-full p-2 rounded-md bg-gray-100 dark:bg-[#FFFFFF1A] flex items-center gap-3'>
            <img
              src={HeaderIcon6}
              alt='history'
              className='w-5 h-5 dark:invert'
            />
            <span className='text-sm'>History</span>
          </button>

          <button className='w-full p-2 rounded-md bg-gray-100 dark:bg-[#FFFFFF1A] flex items-center gap-3'>
            <img
              src={HeaderIcon7}
              alt='notifications'
              className='w-5 h-5 dark:invert'
            />
            <span className='text-sm'>Notifications</span>
          </button>

          <div className='flex items-center gap-3 p-2 rounded-md bg-gray-100 dark:bg-[#FFFFFF1A]'>
            <div className='w-5 h-5 rounded-full overflow-hidden'>
              <img
                src={profileIcon}
                alt='avatar'
                className='w-full h-full object-cover'
              />
            </div>
            <span className='text-sm'>Profile</span>
          </div>
        </div>
      </aside>
    </>
  )
}
