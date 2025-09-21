import React from 'react'
import revenureLines from '../../assets/revenue-lines.svg'

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  seriesA: [8, 18, 15, 10, 14, 25],
  seriesB: [12, 8, 12, 20, 22, 28]
}

function pointX (i, width, padding) {
  const step = (width - padding * 2) / (data.labels.length - 1)
  return padding + i * step
}

function pointY (value, height, padding, maxVal) {
  const usable = height - padding * 2
  return padding + usable - (value / maxVal) * usable
}

export default function RevenueLinesWithArrows ({ className = '' }) {
  const maxVal = Math.max(...data.seriesA, ...data.seriesB, 1)
  const padding = 36
  const viewWidth = 720
  const viewHeight = 360

  const pointsA = data.seriesA.map((v, i) => [
    pointX(i, viewWidth, padding),
    pointY(v, viewHeight, padding, maxVal)
  ])

  const pointsB = data.seriesB.map((v, i) => [
    pointX(i, viewWidth, padding),
    pointY(v, viewHeight, padding, maxVal)
  ])

  const pathFromPoints = pts =>
    pts
      .map(
        (p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(2)} ${p[1].toFixed(2)}`
      )
      .join(' ')

  const endA = pointsA[pointsA.length - 1]
  const endB = pointsB[pointsB.length - 1]

  return (
    <div className={` ${className}`}>
      <div className='flex flex-col md:flex-row md:items-center md:justify-start gap-x-10 mb-4'>
        <h3 className='text-sm font-semibold text-[#1C1C1C] dark:text-gray-100'>
          Revenue
        </h3>
        <div className='flex flex-col lg:flex-row items-start lg:items-center gap-4 mt-3 md:mt-0'>
          <div className='flex items-center gap-2 text-sm text-[#1C1C1C] dark:text-gray-100'>
            • Current Week
            <span className='font-semibold dark:text-gray-100 ml-1'>
              $58,211
            </span>
          </div>
          <div className='flex items-center gap-2 text-sm text-[#1C1C1C] dark:text-gray-100'>
            • Previous Week
            <span className='font-semibold dark:text-gray-100 ml-1'>
              $68,768
            </span>
          </div>
        </div>
      </div>

      <div className='w-full overflow-hidden rounded-lg'>
        <svg
          viewBox={`0 0 ${viewWidth} ${viewHeight}`}
          className='w-full h-auto'
        >
          <defs>
            <linearGradient id='bgFade' x1='0' x2='0' y1='0' y2='1'>
              <stop offset='0%' stopColor='#E8F2FB' stopOpacity='0.6' />
              <stop offset='100%' stopColor='#E8F2FB' stopOpacity='0' />
            </linearGradient>
            <linearGradient id='lineBlue' x1='0' x2='1'>
              <stop offset='0%' stopColor='#8FB7D9' />
              <stop offset='100%' stopColor='#6CA5D6' />
            </linearGradient>
          </defs>

          {/* horizontal grid lines */}
          <g>
            {[0.75, 0.5, 0.25, 0].map((f, idx) => {
              const y = pointY(maxVal * f, viewHeight, padding, maxVal)
              return (
                <line
                  key={idx}
                  x1={padding}
                  x2={viewWidth - padding}
                  y1={y}
                  y2={y}
                  stroke='#E6EEF6'
                  strokeWidth='1'
                />
              )
            })}
          </g>

          {/* left-axis labels (0,10M,20M,30M) */}
          <g>
            {[0, 10, 20, 30].map((val, idx) => {
              const y = pointY(val, viewHeight, padding, 30) // force 30M scale
              return (
                <text
                  key={idx}
                  x={padding - 10}
                  y={y + 4}
                  fontSize='12'
                  textAnchor='end'
                  fill='#9CA3AF'
                >
                  {val === 0 ? '0' : `${val}M`}
                </text>
              )
            })}
          </g>

          {/* x-axis bottom labels */}
          {data.labels.map((lab, i) => {
            const x = pointX(i, viewWidth, padding)
            const y = viewHeight - padding + 20
            return (
              <text
                key={lab}
                x={x}
                y={y}
                fontSize='12'
                textAnchor='middle'
                fill='#9CA3AF'
              >
                {lab}
              </text>
            )
          })}

          {/* image inside svg */}
          <image
            href={revenureLines}
            className='w-5/6 translate-x-[10%] h-auto translate-y-1/3'
          />
        </svg>
      </div>
    </div>
  )
}
