import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import 'swiper/css'
import 'swiper/css/free-mode'
import Header from './components/Header'
import Sidebar2 from './components/Sidebar2'
import { TbTrendingUp } from 'react-icons/tb'
import { TbTrendingDown } from 'react-icons/tb'
import worldMap from '../assets/map-world.svg'
import RevenueLinesWithArrows from './components/RevenueLinesWithArrows'
import salesImg from '../assets/sales-img.svg'

export default function AdminHome ({ className = '' }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dark, setDark] = useState(false)

  const [collapsed, setCollapsed] = useState(false)
  const chartData = [15, 22, 15, 28, 12, 25]

  const metrics = [
    {
      id: 'customers',
      name: 'Customers',
      value: '3,781',
      meta: '+11.01%',
      highlight: true,
      icon: <TbTrendingUp />
    },
    {
      id: 'orders',
      name: 'Orders',
      value: '1,219',
      meta: '-0.03%',
      icon: <TbTrendingDown />
    },
    {
      id: 'revenue',
      name: 'Revenue',
      value: '$695',
      meta: '+15.03%',
      icon: <TbTrendingUp />
    },
    {
      id: 'growth',
      name: 'Growth',
      value: '30.1%',
      meta: '+6.08%',
      icon: <TbTrendingUp />
    }
  ]

  // simple SVG bar chart component (responsive)
  function BarChart ({ data = [] }) {
    const max = Math.max(...data, 1)
    const width = 500
    const height = 200
    const padding = 20
    const extraLeft = 30
    const chartWidth = width - padding * 2 - extraLeft
    const barGap = 50
    const barWidth = (chartWidth - barGap * (data.length - 1)) / data.length

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className='w-full h-52'
        role='img'
        aria-label='Projections vs Actuals'
      >
        {/* background */}
        <rect
          x='0'
          y='0'
          width={width}
          height={height}
          rx='8'
          fill='transparent'
        />

        {/* y grid lines (3 lines) */}
        {[0.25, 0.5, 0.75].map((t, i) => {
          const y = padding + (height - padding * 2) * t
          return (
            <line
              key={i}
              x1={padding + extraLeft} // shift grid right
              x2={width - padding}
              y1={y}
              y2={y}
              stroke='#E6E9EE'
              strokeWidth='1'
              opacity='0.8'
            />
          )
        })}

        {/* bars */}
        {data.map((v, i) => {
          const x = padding + extraLeft + i * (barWidth + barGap) // shifted start
          const h = ((v / max) * (height - padding * 2)) | 0
          const y = height - padding - h
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={h}
                rx='4'
                fill='#A8C5DA'
                opacity='0.95'
              />
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={Math.max(2, h * 0.3)}
                rx='4'
                fill='#D8E7FF'
                opacity='0.5'
              />
              <text
                x={x + barWidth / 2}
                y={height - 4}
                textAnchor='middle'
                fontSize='10'
                fill='#98A0AA'
              >
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i] || `M${i + 1}`}
              </text>
            </g>
          )
        })}

        {/* left Y axis labels (same) */}
        <text x={6} y={padding + 4} fontSize='10' fill='#98A0AA'>
          30M
        </text>
        <text x={6} y={height / 2} fontSize='10' fill='#98A0AA'>
          20M
        </text>
        <text x={6} y={height - padding} fontSize='10' fill='#98A0AA'>
          0
        </text>
      </svg>
    )
  }

  const chartSeries = [
    {
      name: 'Previous Week',
      color: '#9FC0E8',
      points: [18, 20, 16, 14, 18, 22]
    },
    {
      name: 'Current Week',
      color: '#111827',
      points: [12, 14, 18, 20, 19, 24],
      dashedFromIndex: 4
    }
  ]

  const locations = [
    { name: 'New York', value: 50000, display: '72K' },
    { name: 'San Francisco', value: 30000, display: '39K' },
    { name: 'Sydney', value: 25000, display: '25K' },
    { name: 'Singapore', value: 35000, display: '61K' }
  ]

  const max = Math.max(...locations.map(l => l.value), 1)

  const DATA = [
    { key: 'Direct', value: 300.56, color: '#111827' },
    { key: 'Affiliate', value: 135.18, color: '#7AE3B6' },
    { key: 'Sponsored', value: 154.02, color: '#BFD7FF' },
    { key: 'E-mail', value: 48.96, color: '#9BB9FF' }
  ]

  const PRODUCTS = [
    { name: 'ASOS Ridley High Waist', price: 79.49, qty: 82 },
    { name: 'Marco Lightweight Shirt', price: 128.5, qty: 37 },
    { name: 'Half Sleeve Shirt', price: 39.99, qty: 64 },
    { name: 'Lightweight Jacket', price: 20.0, qty: 184 },
    { name: 'Marco Shoes', price: 79.49, qty: 64 }
  ]

  function formatMoney (n) {
    return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  }

  return (
    <div
      className={`${
        dark ? 'dark' : ''
      } min-h-screen text-[#1C1C1C] font-inter dark:bg-[#1A1A1A] dark:text-gray-100`}
    >
      <div className='flex'>
        <Sidebar
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          collapsed={collapsed}
        />

        <div
          className={`flex-1 transition-all duration-300
                    ${
                      collapsed ? 'md:pl-0 md:pr-0' : 'md:pl-64 md:pr-64'
                    } w-full`}
        >
          <Header
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
            dark={dark}
            setDark={setDark}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />

          <main className='p-4 space-y-6'>
            <section className=' mx-auto py-6'>
              <div className='mb-4'>
                <h3 className='text-sm font-semibold text-[#1C1C1C] dark:text-gray-100'>
                  eCommerce
                </h3>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 items-start'>
                {/* left: cards (span 2 cols worth on large) */}
                <div className=' grid grid-cols-1 sm:grid-cols-2 h-full gap-4'>
                  {metrics.map((m, idx) => (
                    <div
                      key={m.id}
                      className={`rounded-xl group hover:bg-[#E3F5FF] dark:hover:bg-[#E3F5FF] p-5 shadow-sm dark:border-transparent
                ${
                  m.highlight
                    ? 'bg-[#E3F5FF] dark:bg-[#0f2a4b]'
                    : 'bg-[#F7F9FB] dark:bg-[#FFFFFF0D]'
                }
              `}
                    >
                      <div className='items-center flex-col'>
                        <div>
                          <div className='text-xs text-[#1C1C1C] font-semibold dark:text-gray-100 group-hover:text-[#1C1C1C] my-2'>
                            {m.name}
                          </div>
                        </div>

                        <div className='text-sm mt-4 flex justify-between items-center text-[#1C1C1C] group-hover:text-[#1C1C1C] dark:text-gray-100'>
                          <div className='text-2xl font-bold font-inter '>
                            {m.value}
                          </div>
                          <div className='flex items-center gap-x-2'>
                            <div className='text-xs font-inter'>{m.meta}</div>
                            <span>{m.icon}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* right: chart */}
                <div className='rounded-xl p-5 bg-[#F7F9FB] dark:bg-[#FFFFFF0D] shadow-sm dark:border-transparent'>
                  <div className='flex items-center justify-between mb-4'>
                    <div>
                      <div className='text-sm font-semibold text-[#1C1C1C] dark:text-gray-100'>
                        Projections vs Actuals
                      </div>
                    </div>
                  </div>

                  <BarChart data={chartData} />
                </div>
              </div>
            </section>

            <section className='mx-auto'>
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* left: chart area spanning 2/3 on large screens */}
                <div className='lg:col-span-2 bg-[#F7F9FB] dark:bg-[#FFFFFF0D] rounded-xl p-6 shadow-sm '>
                  <RevenueLinesWithArrows />
                </div>

                <aside className='bg-[#F7F9FB] dark:bg-[#FFFFFF0D] rounded-2xl p-5 shadow-sm dark:border-[#0f1720] w-full lg:max-w-md md:max-w-md'>
                  <h4 className='text-lg font-semibold text-[#1C1C1C] dark:text-gray-100 mb-4'>
                    Revenue by Location
                  </h4>

                  <div className='mb-4'>
                    <div className='w-full h-36 md:h-40 rounded-lg overflow-hidden bg-[#F5F7FA] dark:bg-[#FFFFFF0D]'>
                      <img
                        src={worldMap}
                        alt='world map'
                        className='w-full h-full object-cover object-center'
                        loading='lazy'
                      />
                      <div className='pointer-events-none'>
                        <div className='absolute inset-0'></div>
                      </div>
                    </div>
                  </div>

                  <div className='space-y-4'>
                    {locations.map(l => {
                      const pct = Math.round((l.value / max) * 100)
                      return (
                        <div key={l.name} className='flex flex-col'>
                          <div className='flex items-center justify-between'>
                            <div className='text-sm text-[#1C1C1C] dark:text-gray-100'>
                              {l.name}
                            </div>
                            <div className='text-sm font-medium text-[#1C1C1C] dark:text-gray-100'>
                              {l.display}
                            </div>
                          </div>

                          <div className='mt-2 w-full h-1 bg-[#E6EEF6] dark:bg-[#1C1C1C99] rounded-full overflow-hidden'>
                            <div
                              className='h-full rounded-full bg-gradient-to-r from-[#8FB7D9] to-[#6CA5D6]'
                              style={{
                                width: `${pct}%`,
                                transition: 'width 600ms ease'
                              }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </aside>
              </div>
            </section>

            <section className='mx-auto'>
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* left: chart area spanning 2/3 on large screens */}
                <div className='lg:col-span-2 bg-[#F7F9FB] dark:bg-[#FFFFFF0D] rounded-xl p-6 shadow-sm '>
                  <aside>
                    <div className='flex items-center justify-between mb-4'>
                      <h4 className='text-lg font-semibold text-[#1C1C1C] dark:text-gray-100'>
                        Top Selling Products
                      </h4>
                    </div>

                    <div className='overflow-x-auto'>
                      <table className='min-w-full text-left text-sm'>
                        <thead>
                          <tr className='text-left text-sm text-[#1C1C1C66] dark:text-[#FFFFFF66] border-b border-[#E6EEF6] dark:border-[#FFFFFF1A]'>
                            <th className='py-3 pr-4 pl-0 w-2/5 font-medium'>Name</th>
                            <th className='py-3 pr-4 font-medium'>Price</th>
                            <th className='py-3 pr-4 font-medium'>Quantity</th>
                            <th className='py-3 pr-4 font-medium'>Amount</th>
                          </tr>
                        </thead>

                        <tbody>
                          {PRODUCTS.map((p, idx) => {
                            const amount = p.price * p.qty
                            return (
                              <tr
                                key={p.name}
                                className={`text-[#1C1C1C] text-sm dark:text-gray-100 ${
                                  idx < PRODUCTS.length - 1
                                    ? 'border-b border-[#EEF2F6] dark:border-[#FFFFFF1A]'
                                    : ''
                                }`}
                              >
                                <td className='py-4 pr-4 pl-0 w-2/5'>
                                  <div className='text-sm'>{p.name}</div>
                                </td>
                                <td className='py-4 pr-4'>
                                  {formatMoney(p.price)}
                                </td>
                                <td className='py-4 pr-4'>{p.qty}</td>
                                <td className='py-4 pr-0 font-medium'>
                                  {formatMoney(amount)}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </aside>
                </div>

                <aside
                  className={`bg-[#F7F9FB] dark:bg-[#FFFFFF0D] rounded-2xl p-5 shadow-sm w-full lg:max-w-md ${className}`}
                >
                  <h4 className='text-sm font-semibold text-[#1C1C1C] dark:text-gray-100 mb-4'>
                    Total Sales
                  </h4>

                  <div className='flex flex-col items-start gap-4'>
                    <div className='relative mx-auto w-32 h-32 flex-shrink-0'>
                      <img
                        src={salesImg}
                        alt='donut'
                        className='w-full h-full object-contain'
                      />
                    </div>

                    <div className='flex-1 w-full p-6'>
                      <ul className='space-y-5'>
                        {DATA.map(d => (
                          <li
                            key={d.key}
                            className='flex items-center justify-between'
                          >
                            <div className='flex items-center gap-3'>
                              <span
                                className='inline-block w-3 h-3 rounded-full'
                                style={{ backgroundColor: d.color }}
                              />
                              <span className='text-sm text-[#111827] dark:text-gray-100'>
                                {d.key}
                              </span>
                            </div>
                            <div className='text-sm text-[#6B7280] dark:text-[#9CA3AF]'>
                              ${d.value.toFixed(2)}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </aside>
              </div>
            </section>
          </main>
        </div>

        <Sidebar2 collapsed={collapsed} />
      </div>
    </div>
  )
}
