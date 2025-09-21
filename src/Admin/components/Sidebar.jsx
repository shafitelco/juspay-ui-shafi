import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa6'

import profileIcon from '../../assets/profile-icon.svg'
import dashIcon1 from '../../assets/ChartPieSlice.svg'
import dashIcon2 from '../../assets/IconSet (1).svg'
import dashIcon3 from '../../assets/IconSet (2).svg'
import dashIcon4 from '../../assets/BookOpen.svg'
import userProfile from '../../assets/user-profile.svg'
import account from '../../assets/account-icon.svg'
import corporate from '../../assets/corporate-icon.svg'
import blog from '../../assets/blog-icon.svg'
import social from '../../assets/social-icon.svg'
import { Link } from 'react-router-dom'

export default function Sidebar ({ mobileOpen, setMobileOpen, collapsed }) {
  const [openList, setOpenList] = useState('')
  const swiperRef = useRef(null)

  const toggle = key => {
    setOpenList(prev => (prev === key ? '' : key))
    // let Swiper recalc after DOM change
    setTimeout(() => swiperRef.current?.update?.(), 60)
  }

  // Sidebar body (shared between desktop + mobile)
  const SidebarBody = () => (
    <div className='h-screen pb-20 '>
      <Swiper
        onSwiper={s => (swiperRef.current = s)}
        direction='vertical'
        slidesPerView='auto'
        freeMode={true}
        mousewheel={true}
        modules={[FreeMode, Mousewheel]}
        breakpoints={{
          640: { slidesOffsetAfter: 40 },
          1024: { slidesOffsetAfter: 120 },
          1440: { slidesOffsetAfter: 120 }
        }}
        className='flex-1 h-full pb-5 md:pb-8 lg:pb-10 overflow-auto'
        style={{ touchAction: 'pan-y', height: '100%' }}
      >
        <SwiperSlide style={{ height: 'auto' }}>
          <div className='pt-[1.5rem]'>
            <div className='flex px-7 gap-5'>
              <div className='text-sm text-[#1C1C1C66] dark:text-[#ffffff66] mb-2'>
                Favorites
              </div>
              <div className='text-sm text-[#1C1C1C33] dark:text-[#ffffff33] mb-2'>
                Recently
              </div>
            </div>
            <ul className='space-y-1 px-5'>
              <li className='flex items-center gap-2 py-2 px-2 rounded-lg group hover:bg-[#1C1C1C0D] dark:hover:bg-[#FFFFFF1A]'>
                <span className='w-1.5 h-1.5 rounded-full bg-[#1C1C1C33] dark:bg-gray-500 ml-1' />
                <span className='block text-sm'>Overview</span>
              </li>
              <li className='flex items-center gap-2 py-2 px-2 rounded-lg group hover:bg-[#1C1C1C0D] dark:hover:bg-[#FFFFFF1A]'>
                <span className='w-1.5 h-1.5 rounded-full bg-[#1C1C1C33] dark:bg-gray-500 ml-1' />
                <span className='block text-sm'>Projects</span>
              </li>
            </ul>

            <div className='px-5 mt-4'>
              <div className='text-sm px-2 text-[#1C1C1C66] dark:text-[#ffffff66] mb-2'>
                Dashboards
              </div>
              <ul className='space-y-1'>
                <Link to={'/'}>
                  <li className='flex items-center gap-2 py-2 px-10 rounded-md bg-[#1C1C1C0D] dark:bg-[#FFFFFF1A]'>
                    <img
                      src={dashIcon1}
                      className='h-6 w-6 dark:invert'
                      alt=''
                    />
                    <span className='block text-sm'>Default</span>
                  </li>
                </Link>

                <li
                  className='flex items-start gap-3 py-2 px-4 rounded-md hover:bg-[#1C1C1C0D] dark:hover:bg-[#FFFFFF1A] cursor-pointer'
                  onClick={() => toggle('ecommerce')}
                >
                  {openList === 'ecommerce' ? (
                    <FaChevronDown className='text-[#1C1C1C33] dark:text-gray-500 text-sm mt-1' />
                  ) : (
                    <FaChevronRight className='text-[#1C1C1C33] dark:text-gray-500 text-sm mt-1' />
                  )}
                  <img src={dashIcon2} className='h-6 w-6 dark:invert' alt='' />
                  <div className='flex-1 pt-0.5'>
                    <span className='block text-sm'>eCommerce</span>
                    <ul
                      className={`${
                        openList === 'ecommerce'
                          ? 'mt-3 text-sm space-y-3'
                          : 'hidden'
                      }`}
                    >
                      <li className='py-0'>
                        <Link to={'/admin-orders'}>Orders</Link>
                      </li>
                      <li className='py-0'>Products</li>
                      <li className='py-0'>Customers</li>
                    </ul>
                  </div>
                </li>

                <li
                  className='flex items-start gap-3 py-2 px-4 rounded-md hover:bg-[#1C1C1C0D] dark:hover:bg-[#FFFFFF1A] cursor-pointer'
                  onClick={() => toggle('projects')}
                >
                  {openList === 'projects' ? (
                    <FaChevronDown className='text-[#1C1C1C33] dark:text-gray-500 text-sm mt-1' />
                  ) : (
                    <FaChevronRight className='text-[#1C1C1C33] dark:text-gray-500 text-sm mt-1' />
                  )}
                  <img src={dashIcon3} className='h-6 w-6 dark:invert' alt='' />
                  <div className='flex-1 pt-0.5'>
                    <span className='block text-sm'>Projects</span>
                    <ul
                      className={`${
                        openList === 'projects'
                          ? 'mt-3 text-sm space-y-3'
                          : 'hidden'
                      }`}
                    >
                      <li className='py-0'>Active</li>
                      <li className='py-0'>Completed</li>
                      <li className='py-0'>Upcoming</li>
                    </ul>
                  </div>
                </li>

                <li
                  className='flex items-start gap-3 py-2 px-4 rounded-md hover:bg-[#1C1C1C0D] dark:hover:bg-[#FFFFFF1A] cursor-pointer'
                  onClick={() => toggle('courses')}
                >
                  {openList === 'courses' ? (
                    <FaChevronDown className='text-[#1C1C1C33] dark:text-gray-500 text-sm mt-1' />
                  ) : (
                    <FaChevronRight className='text-[#1C1C1C33] dark:text-gray-500 text-sm mt-1' />
                  )}
                  <img src={dashIcon4} className='h-6 w-6 dark:invert' alt='' />
                  <div className='flex-1 pt-0.5'>
                    <span className='block text-sm'>Online Courses</span>
                    <ul
                      className={`${
                        openList === 'courses'
                          ? 'mt-3 text-sm space-y-3'
                          : 'hidden'
                      }`}
                    >
                      <li className='py-0'>My Courses</li>
                      <li className='py-0'>Browse</li>
                      <li className='py-0'>Certificates</li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            <div className='px-5 pt-[2rem]'>
              <div className='text-sm px-2 text-[#1C1C1C66] dark:text-[#ffffff66] mb-2'>
                Pages
              </div>
              <ul className='space-y-1'>
                <li
                  className='flex items-start gap-2 py-2 px-2 rounded-md hover:bg-[#1C1C1C0D] dark:hover:bg-[#FFFFFF1A] cursor-pointer'
                  onClick={() => toggle('profile')}
                >
                  {openList === 'profile' ? (
                    <FaChevronDown className='text-[#1C1C1C33] dark:text-gray-500 text-sm mt-1' />
                  ) : (
                    <FaChevronRight className='text-[#1C1C1C33] dark:text-gray-500 text-sm mt-1' />
                  )}
                  <img
                    src={userProfile}
                    className='h-6 w-6 dark:invert'
                    alt=''
                  />
                  <div className='flex-1'>
                    <div className='text-sm'>User Profile</div>
                    <ul
                      className={`${
                        openList === 'profile'
                          ? 'mt-3 text-sm space-y-3'
                          : 'hidden'
                      }`}
                    >
                      <li className='py-0'>Overview</li>
                      <li className='py-0'>Projects</li>
                      <li className='py-0'>Campaigns</li>
                      <li className='py-0'>Documents</li>
                      <li className='py-0'>Followers</li>
                    </ul>
                  </div>
                </li>

                <li
                  className='flex items-start gap-2 py-2 px-2 rounded-md hover:bg-[#1C1C1C0D] dark:hover:bg-[#FFFFFF1A] cursor-pointer'
                  onClick={() => toggle('account')}
                >
                  {openList === 'account' ? (
                    <FaChevronDown className='text-[#1C1C1C33] dark:text-gray-500 text-sm mt-1' />
                  ) : (
                    <FaChevronRight className='text-[#1C1C1C33] dark:text-gray-500 text-sm mt-1' />
                  )}
                  <img src={account} className='h-6 w-6 dark:invert' alt='' />
                  <div className='flex-1'>
                    <span className='block text-sm'>Account</span>
                    <ul
                      className={`${
                        openList === 'account'
                          ? 'mt-3 text-sm space-y-3'
                          : 'hidden'
                      }`}
                    >
                      <li className='py-0'>Settings</li>
                      <li className='py-0'>Billing</li>
                      <li className='py-0'>Security</li>
                      <li className='py-0'>Notifications</li>
                    </ul>
                  </div>
                </li>

                <li
                  className='flex items-start gap-2 py-2 px-2 rounded-md hover:bg-[#1C1C1C0D] dark:hover:bg-[#FFFFFF1A] cursor-pointer'
                  onClick={() => toggle('corporate')}
                >
                  {openList === 'corporate' ? (
                    <FaChevronDown className='text-[#1C1C1C33] dark:text-gray-500 text-sm mt-1' />
                  ) : (
                    <FaChevronRight className='text-[#1C1C1C33] dark:text-gray-500 text-sm mt-1' />
                  )}
                  <img src={corporate} className='h-6 w-6 dark:invert' alt='' />
                  <div className='flex-1'>
                    <span className='block text-sm'>Corporate</span>
                    <ul
                      className={`${
                        openList === 'corporate'
                          ? 'mt-3 text-sm space-y-3'
                          : 'hidden'
                      }`}
                    >
                      <li className='py-0'>Reports</li>
                      <li className='py-0'>Teams</li>
                      <li className='py-0'>Compliance</li>
                    </ul>
                  </div>
                </li>

                <li
                  className='flex items-start gap-2 py-2 px-2 rounded-md hover:bg-[#1C1C1C0D] dark:hover:bg-[#FFFFFF1A] cursor-pointer'
                  onClick={() => toggle('blog')}
                >
                  {openList === 'blog' ? (
                    <FaChevronDown className='text-[#1C1C1C33] dark:text-gray-500 text-sm mt-1' />
                  ) : (
                    <FaChevronRight className='text-[#1C1C1C33] dark:text-gray-500 text-sm mt-1' />
                  )}
                  <img src={blog} className='h-6 w-6 dark:invert' alt='' />
                  <div className='flex-1'>
                    <span className='block text-sm'>Blog</span>
                    <ul
                      className={`${
                        openList === 'blog'
                          ? 'mt-3 text-sm space-y-3'
                          : 'hidden'
                      }`}
                    >
                      <li className='py-0'>Latest Posts</li>
                      <li className='py-0'>Categories</li>
                      <li className='py-0'>Archives</li>
                    </ul>
                  </div>
                </li>

                <li
                  className='flex items-start gap-2 py-2 px-2 rounded-md hover:bg-[#1C1C1C0D] dark:hover:bg-[#FFFFFF1A] cursor-pointer'
                  onClick={() => toggle('social')}
                >
                  {openList === 'social' ? (
                    <FaChevronDown className='text-[#1C1C1C33] dark:text-gray-500 text-sm mt-1' />
                  ) : (
                    <FaChevronRight className='text-[#1C1C1C33] dark:text-gray-500 text-sm mt-1' />
                  )}
                  <img src={social} className='h-6 w-6 dark:invert' alt='' />
                  <div className='flex-1'>
                    <span className='block text-sm'>Social</span>
                    <ul
                      className={`${
                        openList === 'social'
                          ? 'mt-3 text-sm space-y-3'
                          : 'hidden'
                      }`}
                    >
                      <li className='py-0'>Facebook</li>
                      <li className='py-0'>Twitter</li>
                      <li className='py-0'>LinkedIn</li>
                      <li className='py-0'>Instagram</li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 bg-white dark:bg-[#1A1A1A] border-r dark:border-[#FFFFFF1A] shadow-sm
          overflow-hidden flex-col transition-[width] duration-300
          ${collapsed ? 'md:w-0' : 'md:w-64 hidden md:flex'}
        `}
      >
        <div className='px-5 pt-[2rem] pb-2'>
          <div className='flex items-center gap-x-3'>
            <img src={profileIcon} className='w-8 h-8' alt='' />
            <div>
              <div className='text-base font-normal text-[#1C1C1C] dark:text-gray-100 font-inter'>
                ByeWind
              </div>
            </div>
          </div>
        </div>
        <SidebarBody />
      </aside>

      {/* Mobile drawer using same sidebar content */}
      <div
        className={`fixed inset-0 z-40 md:hidden pointer-events-none ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <aside
          className={`absolute left-0 top-0 bottom-0 bg-white dark:bg-[#151414] border-r dark:border-gray-700 p-4 overflow-auto transform ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-500 ease-in-out w-72`}
          style={{ willChange: 'transform' }}
        >
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white'>
              S
            </div>
            <div>
              <div className='text-sm font-semibold'>SHAFI</div>
              <div className='text-xs text-gray-400'>Dashboard</div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className='ml-auto py-1 px-2 text-sm bg-gray-100 dark:bg-[#ffffff1A] rounded-md'
            >
              ✕
            </button>
          </div>

          <SidebarBody />
        </aside>
      </div>
    </>
  )
}
