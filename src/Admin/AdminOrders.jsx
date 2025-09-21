import React, { useMemo, useState } from 'react'
import Sidebar from './components/Sidebar'
import 'swiper/css'
import 'swiper/css/free-mode'
import Header from './components/Header'
import Sidebar2 from './components/Sidebar2'
import arrowIcon from '../assets/arrow-icon.svg'

export default function AdminHOrders () {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dark, setDark] = useState(false)

  const initialOrders = [
    {
      id: '#CM9801',
      user: 'Natali Craig',
      avatar: 'https://i.pravatar.cc/40?img=1',
      project: 'Landing Page',
      address: 'Meadow Lane Oakland',
      date: 'Just now',
      status: 'In Progress'
    },
    {
      id: '#CM9802',
      user: 'Kate Morrison',
      avatar: 'https://i.pravatar.cc/40?img=2',
      project: 'CRM Admin pages',
      address: 'Larry San Francisco',
      date: 'A minute ago',
      status: 'Complete'
    },
    {
      id: '#CM9803',
      user: 'Drew Cano',
      avatar: 'https://i.pravatar.cc/40?img=3',
      project: 'Client Project',
      address: 'Bogwell Avenue Ocala',
      date: '1 hour ago',
      status: 'Pending'
    },
    {
      id: '#CM9804',
      user: 'Orlando Diggs',
      avatar: 'https://i.pravatar.cc/40?img=4',
      project: 'Admin Dashboard',
      address: 'Washburn Baton Rouge',
      date: 'Yesterday',
      status: 'Approved'
    },
    {
      id: '#CM9805',
      user: 'Andi Lane',
      avatar: 'https://i.pravatar.cc/40?img=5',
      project: 'App Landing Page',
      address: 'Nest Lane Olivette',
      date: 'Feb 2, 2023',
      status: 'Rejected'
    },
    {
      id: '#CM9806',
      user: 'Natali Craig',
      avatar: 'https://i.pravatar.cc/40?img=6',
      project: 'Landing Page',
      address: 'Meadow Lane Oakland',
      date: 'Just now',
      status: 'In Progress'
    },
    {
      id: '#CM9807',
      user: 'Kate Morrison',
      avatar: 'https://i.pravatar.cc/40?img=7',
      project: 'CRM Admin pages',
      address: 'Larry San Francisco',
      date: 'A minute ago',
      status: 'Complete'
    },
    {
      id: '#CM9808',
      user: 'Drew Cano',
      avatar: 'https://i.pravatar.cc/40?img=8',
      project: 'Client Project',
      address: 'Bogwell Avenue Ocala',
      date: '1 hour ago',
      status: 'Pending'
    },
    {
      id: '#CM9809',
      user: 'Orlando Diggs',
      avatar: 'https://i.pravatar.cc/40?img=9',
      project: 'Admin Dashboard',
      address: 'Washburn Baton Rouge',
      date: 'Yesterday',
      status: 'Approved'
    },
    {
      id: '#CM9810',
      user: 'Andi Lane',
      avatar: 'https://i.pravatar.cc/40?img=10',
      project: 'App Landing Page',
      address: 'Nest Lane Olivette',
      date: 'Feb 2, 2023',
      status: 'Rejected'
    }
  ]

  /* ---------- helper ---------- */
  const STATUS_STYLES = {
    'In Progress': 'text-[#8A8CD9]',
    Complete: 'text-[#4AA785]',
    Pending: 'text-[#59A8D4]',
    Approved: 'text-[#FFC555]',
    Rejected: 'text-[#1C1C1C66] dark:text-[#ffffff66]'
  }

  const [orders, setOrders] = useState(initialOrders)
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState({ key: 'id', dir: 'asc' })
  const [selected, setSelected] = useState({})
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(5)

  /* derived data: search + sort */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = orders.filter(o => {
      if (!q) return true
      return (
        o.id.toLowerCase().includes(q) ||
        o.user.toLowerCase().includes(q) ||
        o.project.toLowerCase().includes(q) ||
        o.address.toLowerCase().includes(q) ||
        o.status.toLowerCase().includes(q)
      )
    })

    const dir = sortBy.dir === 'asc' ? 1 : -1
    list.sort((a, b) => {
      const A = (a[sortBy.key] || '').toString().toLowerCase()
      const B = (b[sortBy.key] || '').toString().toLowerCase()
      if (A < B) return -1 * dir
      if (A > B) return 1 * dir
      return 0
    })

    return list
  }, [orders, query, sortBy])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const pageData = filtered.slice((page - 1) * perPage, page * perPage)

  /* actions */
  const toggleSort = key => {
    setSortBy(prev => {
      if (prev.key === key) {
        return { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
      }
      return { key, dir: 'asc' }
    })
  }

  const toggleRow = id => {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const selectAllOnPage = checked => {
    const newSel = { ...selected }
    pageData.forEach(r => {
      newSel[r.id] = checked
    })
    setSelected(newSel)
  }

  const bulkDelete = () => {
    const toDelete = Object.keys(selected).filter(k => selected[k])
    if (!toDelete.length) return alert('No rows selected')
    if (!confirm(`Delete ${toDelete.length} selected order(s)?`)) return
    setOrders(prev => prev.filter(o => !toDelete.includes(o.id)))
    setSelected({})
    setPage(1)
  }

  // const deleteRow = id => {
  //   if (!confirm(`Delete ${id}?`)) return
  //   setOrders(prev => prev.filter(o => o.id !== id))
  //   setSelected(prev => {
  //     const np = { ...prev }
  //     delete np[id]
  //     return np
  //   })
  // }

  const editRow = id => {
    alert('Edit action for ' + id + ' (implement your edit flow)')
  }

  /* small helpers for pagination */
  const goto = p => setPage(Math.min(Math.max(1, p), totalPages))

  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={`${
        dark ? 'dark' : ''
      } min-h-screen text-[#1C1C1C] font-inter dark:bg-[#1A1A1A] dark:text-gray-100`}
    >
      <div className='flex'>
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} collapsed={collapsed} />


        <div className={`flex-1 transition-all duration-300
            ${collapsed ? 'md:pl-0 md:pr-0' : 'md:pl-64 md:pr-64'} w-full`}>
          <Header
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
            dark={dark}
            setDark={setDark}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />

          <main>
            <div className='p-6'>
              <div className=''>
                {/* header controls */}
                <div className=''>
                  <h2 className='text-sm font-semibold mb-3'>Order List</h2>

                  <div className='flex items-center justify-between bg-[#F7F9FB] dark:bg-[#FFFFFF0D] rounded-md px-3 py-2'>
                    <div className='flex items-center gap-3 text-[#1c1c1c] dark:text-gray-300'>
                      <button
                        onClick={() => {
                          const newId =
                            '#CM' + (Math.floor(Math.random() * 9000) + 1000)
                          const sample = {
                            id: newId,
                            user: 'New User',
                            avatar: 'https://i.pravatar.cc/40',
                            project: 'New Project',
                            address: 'Unknown',
                            date: 'Just now',
                            status: 'Pending'
                          }
                          setOrders(prev => [sample, ...prev])
                          setPage(1)
                        }}
                        className='p-1 hover:text-indigo-600'
                        aria-label='Add'
                      >
                        <svg
                          className='w-3 h-3 sm:w-5 sm:h-5'
                          viewBox='0 0 24 24'
                          fill='none'
                        >
                          <path
                            d='M12 5v14M5 12h14'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </button>

                      <button
                        className='p-1 hover:text-indigo-600'
                        aria-label='Filter'
                      >
                        <svg
                          className='w-3 h-3 sm:w-5 sm:h-5'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <path
                            d='M3 5h18M6 12h12M10 19h4'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                          />
                        </svg>
                      </button>

                      <button
                        onClick={() => toggleSort('id')}
                        className='p-1 hover:text-indigo-600'
                        aria-label='Sort'
                      >
                        <img
                          src={arrowIcon}
                          alt=''
                          className='w-3 h-3 sm:w-5 sm:h-5 dark:invert shrink-0 max-w-none'
                        />
                      </button>
                    </div>

                    <div className='relative'>
                      <input
                        value={query}
                        onChange={e => {
                          setQuery(e.target.value)
                          setPage(1)
                        }}
                        placeholder='Search'
                        className='pl-8 pr-3 w-5/6 sm:w-full py-1.5 rounded-md border border-gray-200 dark:border-[#ffffff33] text-sm bg-white placeholder:text-[#1C1C1C33] dark:placeholder:text-[#ffffff33] dark:bg-[#FFFFFF0D] focus:outline-none'
                      />
                      <svg
                        className='w-3 h-3 sm:w-4 sm:h-4 absolute left-2 top-1/2 -translate-y-1/2 text-[#1C1C1C33] dark:text-[#ffffff66]'
                        viewBox='0 0 24 24'
                        fill='none'
                      >
                        <path
                          d='M21 21l-4.35-4.35'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                        />
                        <circle
                          cx='11'
                          cy='11'
                          r='7'
                          stroke='currentColor'
                          strokeWidth='2'
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* table header */}
                <div className='overflow-x-auto pt-[1rem]'>
                  <table className='min-w-full table-auto'>
                    <thead className='text-sm text-left text-[#1C1C1C66] dark:text-[#ffffff66] font-inter font-normal border-[#1C1C1C0D] dark:border-[#FFFFFF1A] border-b-2 '>
                      <tr>
                        <th className='px-4 py-3'>
                          <input
                            type='checkbox'
                            onChange={e => selectAllOnPage(e.target.checked)}
                            checked={
                              pageData.every(r => selected[r.id]) &&
                              pageData.length > 0
                            }
                            aria-label='Select all'
                          />
                        </th>
                        <th
                          className='px-4 py-3 cursor-pointer font-normal'
                          onClick={() => toggleSort('id')}
                        >
                          Order ID
                        </th>
                        <th
                          className='px-4 py-3 cursor-pointer font-normal'
                          onClick={() => toggleSort('user')}
                        >
                          User
                        </th>
                        <th
                          className='px-4 py-3 cursor-pointer font-normal'
                          onClick={() => toggleSort('project')}
                        >
                          Project
                        </th>
                        <th className='px-4 py-3 font-normal'>Address</th>
                        <th
                          className='px-4 py-3 cursor-pointer font-normal'
                          onClick={() => toggleSort('date')}
                        >
                          Date
                        </th>
                        <th
                          className='px-4 py-3 cursor-pointer font-normal'
                          onClick={() => toggleSort('status')}
                        >
                          Status
                        </th>
                        <th className='px-4 py-3' />
                      </tr>
                    </thead>

                    <tbody className='text-sm divide-y divide-[#1C1C1C0D] dark:divide-[#FFFFFF1A]'>
                      {pageData.length === 0 && (
                        <tr>
                          <td
                            colSpan={8}
                            className='p-6 text-center text-gray-500 dark:text-gray-100'
                          >
                            No results
                          </td>
                        </tr>
                      )}

                      {pageData.map(order => (
                        <tr
                          key={order.id}
                          className={`${
                            selected[order.id]
                              ? 'bg-[#F7F9FB] dark:bg-[#FFFFFF0D]'
                              : ''
                          }`}
                        >
                          <td className='px-4 py-3'>
                            <input
                              type='checkbox'
                              checked={!!selected[order.id]}
                              onChange={() => toggleRow(order.id)}
                            />
                          </td>

                          <td className='px-4 py-3 font-medium text-[#1C1C1C] dark:text-gray-100'>
                            {order.id}
                          </td>

                          <td className='px-4 py-3'>
                            <div className='flex items-center gap-3'>
                              <div className='w-8 h-8 rounded-full overflow-hidden'>
                                <img
                                  src={order.avatar}
                                  alt={order.user}
                                  className='w-full h-full object-cover'
                                />
                              </div>
                              <div className='truncate'>
                                <div className='text-sm text-[#1C1C1C] dark:text-gray-100'>
                                  {order.user}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className='px-4 py-3 text-[#1C1C1C] dark:text-gray-100'>
                            {order.project}
                          </td>

                          <td className='px-4 py-3 text-[#1C1C1C] dark:text-gray-100 truncate max-w-[220px]'>
                            {order.address}
                          </td>

                          <td className='px-4 py-3 text-[#1C1C1C] dark:text-gray-100'>
                            {order.date}
                          </td>

                          <td className='px-4 py-3'>
                            <span
                              className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-sm ${
                                STATUS_STYLES[order.status] ||
                                'text-gray-600 bg-gray-50 dark:bg-[#ffffff66]'
                              }`}
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  order.status === 'Rejected'
                                    ? 'dark:invert'
                                    : ''
                                }`}
                                style={{
                                  backgroundColor:
                                    (order.status === 'Complete' &&
                                      '#A1E3CB') ||
                                    (order.status === 'Pending' && '#B1E3FF') ||
                                    (order.status === 'Approved' &&
                                      '#FFE999') ||
                                    (order.status === 'Rejected' &&
                                      '#1C1C1C66') ||
                                    '#95A4FC'
                                }}
                              />
                              {order.status}
                            </span>
                          </td>

                          {/* <td className='px-4 py-3 text-right'>
                            <div className='inline-flex items-center gap-2'>
                              <button
                                onClick={() => editRow(order.id)}
                                className='text-sm text-indigo-600 hover:underline'
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteRow(order.id)}
                                className='text-sm text-red-600 hover:underline'
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => alert('More actions')}
                                aria-label='more'
                                className='ml-2 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700'
                              >
                                <svg
                                  className='w-4 h-4 text-gray-400'
                                  viewBox='0 0 24 24'
                                  fill='none'
                                >
                                  <circle cx='5' cy='12' r='1.5' />
                                  <circle cx='12' cy='12' r='1.5' />
                                  <circle cx='19' cy='12' r='1.5' />
                                </svg>
                              </button>
                            </div>
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* pagination */}
                <div className='flex items-center justify-end gap-3 p-4 border-t dark:border-[#FFFFFF1A]'>
                  <div className='flex items-center gap-2'>
                    <button
                      onClick={() => goto(page - 1)}
                      disabled={page === 1}
                      className='p-1 rounded text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40'
                      aria-label='Previous'
                    >
                      <svg className='w-4 h-4' viewBox='0 0 20 20' fill='none'>
                        <path
                          d='M12 16L6 10L12 4'
                          stroke='currentColor'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </button>

                    {/* page numbers (smart window with ellipses) */}
                    <nav
                      className='flex items-center gap-1'
                      aria-label='Pagination'
                    >
                      {(() => {
                        // compute visible page range (max 5 buttons)
                        const maxButtons = 5
                        let start = Math.max(
                          1,
                          page - Math.floor(maxButtons / 2)
                        )
                        let end = start + maxButtons - 1
                        if (end > totalPages) {
                          end = totalPages
                          start = Math.max(1, end - maxButtons + 1)
                        }

                        const nodes = []

                        // first page + ellipsis if needed
                        if (start > 1) {
                          nodes.push(
                            <button
                              key={1}
                              onClick={() => goto(1)}
                              className={`px-3 py-1 rounded-full text-sm ${
                                page === 1
                                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                  : 'text-gray-500'
                              }`}
                            >
                              1
                            </button>
                          )
                          if (start > 2) {
                            nodes.push(
                              <div
                                key='left-ell'
                                className='px-2 text-gray-400'
                              >
                                …
                              </div>
                            )
                          }
                        }

                        // range
                        for (let p = start; p <= end; p++) {
                          nodes.push(
                            <button
                              key={p}
                              onClick={() => goto(p)}
                              className={`px-3 py-1 rounded-lg text-sm ${
                                p === page
                                  ? 'bg-gray-100 dark:bg-gray-700 text-[#1C1C1C] dark:text-white'
                                  : 'text-[#1C1C1C] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                              }`}
                              aria-current={p === page ? 'page' : undefined}
                            >
                              {p}
                            </button>
                          )
                        }

                        // last page + ellipsis if needed
                        if (end < totalPages) {
                          if (end < totalPages - 1) {
                            nodes.push(
                              <div
                                key='right-ell'
                                className='px-2 text-gray-400'
                              >
                                …
                              </div>
                            )
                          }
                          nodes.push(
                            <button
                              key={totalPages}
                              onClick={() => goto(totalPages)}
                              className={`px-3 py-1 rounded-sm text-sm ${
                                page === totalPages
                                  ? 'bg-gray-100 text-gray-900 dark:text-white'
                                  : 'text-gray-500'
                              }`}
                            >
                              {totalPages}
                            </button>
                          )
                        }

                        return nodes
                      })()}
                    </nav>

                    <button
                      onClick={() => goto(page + 1)}
                      disabled={page === totalPages}
                      className='p-1 rounded text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40'
                      aria-label='Next'
                    >
                      <svg className='w-4 h-4' viewBox='0 0 20 20' fill='none'>
                        <path
                          d='M8 4L14 10L8 16'
                          stroke='currentColor'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        <Sidebar2 collapsed={collapsed} />
      </div>
    </div>
  )
}
