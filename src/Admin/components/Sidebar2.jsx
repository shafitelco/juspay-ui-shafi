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

export default function Sidebar2 ({ mobileOpen, setMobileOpen,collapsed }) {
  const [openList, setOpenList] = useState('')
  const swiperRef = useRef(null)

  const toggle = key => {
    setOpenList(prev => (prev === key ? '' : key))
    // let Swiper recalc after DOM change
    setTimeout(() => swiperRef.current?.update?.(), 60)
  }

  const notifications = [
    {
      id: 1,
      title: 'You have a bug that needs...',
      subtitle: 'Just now',
      avatar: 'https://i.pravatar.cc/40?img=12'
    },
    {
      id: 2,
      title: 'New user registered',
      subtitle: '59 minutes ago',
      avatar: 'https://i.pravatar.cc/40?img=15'
    },
    {
      id: 3,
      title: 'You have a bug that needs...',
      subtitle: '12 hours ago',
      avatar: 'https://i.pravatar.cc/40?img=20'
    },
    {
      id: 4,
      title: 'Andi Lane subscribed to you',
      subtitle: 'Today, 11:59 AM',
      avatar: 'https://i.pravatar.cc/40?img=32'
    }
  ]

  const activities = [
    {
      id: 1,
      title: 'You have a bug that needs...',
      subtitle: 'Just now',
      avatar: 'https://i.pravatar.cc/40?img=5'
    },
    {
      id: 2,
      title: 'Released a new version',
      subtitle: '59 minutes ago',
      avatar: 'https://i.pravatar.cc/40?img=8'
    },
    {
      id: 3,
      title: 'Submitted a bug',
      subtitle: '12 hours ago',
      avatar: 'https://i.pravatar.cc/40?img=9'
    },
    {
      id: 4,
      title: 'Modified A data in Page X',
      subtitle: 'Today, 11:59 AM',
      avatar: 'https://i.pravatar.cc/40?img=11'
    }
  ]

  const contacts = [
    { id: 1, name: 'Natali Craig', avatar: 'https://i.pravatar.cc/40?img=1' },
    { id: 2, name: 'Drew Cano', avatar: 'https://i.pravatar.cc/40?img=2' },
    { id: 3, name: 'Orlando Diggs', avatar: 'https://i.pravatar.cc/40?img=3' },
    { id: 4, name: 'Andi Lane', avatar: 'https://i.pravatar.cc/40?img=4' },
    { id: 5, name: 'Kate Morrison', avatar: 'https://i.pravatar.cc/40?img=6' },
    { id: 6, name: 'Koray Okumus', avatar: 'https://i.pravatar.cc/40?img=7' }
  ]

  // Sidebar body (shared between desktop + mobile)
  function Item ({ avatar, title, subtitle }) {
    return (
      <div className='flex items-start gap-3'>
        <div className='w-8 h-8 rounded-full overflow-hidden flex-shrink-0'>
          <img src={avatar} alt='' className='w-full h-full object-cover' />
        </div>
        <div className='min-w-0'>
          <div className='text-sm font-medium text-[#1C1C1C] dark:text-gray-100 font-inter truncate'>
            {title}
          </div>
          <div className='text-xs text-[#1C1C1C66] font-inter dark:text-[#ffffff66] mt-0.5'>
            {subtitle}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`fixed inset-y-0 right-0 z-30 bg-white dark:bg-[#1A1A1A] border-l dark:border-[#FFFFFF1A] shadow-sm
          overflow-hidden flex-col transition-[width] duration-300
          ${collapsed ? 'md:w-0' : 'md:w-64 hidden md:flex'}
        `}
      >
        <div className='h-screen pb-0'>
          <Swiper
            direction='vertical'
            slidesPerView='auto'
            freeMode={true}
            mousewheel={true}
            modules={[FreeMode, Mousewheel]}
            breakpoints={{
              640: { slidesOffsetAfter: 40 },
              1024: { slidesOffsetAfter: 20 },
              1440: { slidesOffsetAfter: 20 }
            }}
            className='flex-1 h-full pb-5 md:pb-8 lg:pb-10 overflow-auto'
            style={{ touchAction: 'pan-y', height: '100%' }}
          >
            <SwiperSlide style={{ height: 'auto' }}>
              <div className='bg-white dark:bg-[#1A1A1A] dark:border-gray-700 px-6 pt-[2rem]'>
                <section className='mb-10'>
                <h4 className='text-sm font-semibold mb-3 text-[#1C1C1C] font-inter dark:text-gray-100'>
                    Notifications
                  </h4>
                  <div className='space-y-3'>
                    {notifications.map(n => (
                      <Item
                        key={n.id}
                        avatar={n.avatar}
                        title={n.title}
                        subtitle={n.subtitle}
                      />
                    ))}
                  </div>
                </section>

                <section className='mb-10'>
                <h4 className='text-sm font-semibold mb-3 text-[#1C1C1C] font-inter dark:text-gray-100'>
                    Activities
                  </h4>
                  <div className='space-y-3'>
                    {activities.map(a => (
                      <Item
                        key={a.id}
                        avatar={a.avatar}
                        title={a.title}
                        subtitle={a.subtitle}
                      />
                    ))}
                  </div>
                </section>

                <section className='mb-2'>
                <h4 className='text-sm font-semibold mb-3 text-[#1C1C1C] font-inter dark:text-gray-100'>
                    Contacts
                  </h4>
                  <div className='space-y-3'>
                    {contacts.map(c => (
                      <div key={c.id} className='flex items-center gap-3'>
                        <div className='w-8 h-8 rounded-full overflow-hidden'>
                          <img
                            src={c.avatar}
                            alt={c.name}
                            className='w-full h-full object-cover'
                          />
                        </div>
                        <div className='text-sm text-[1C1C1C] dark:text-gray-100'>
                          {c.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </aside>
    </>
  )
}
