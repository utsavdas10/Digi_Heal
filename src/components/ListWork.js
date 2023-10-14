import { Fragment, useRef, useState } from 'react'
const Work = [
    {
      name: 'Pushups',
      duration: '10',
      date: '2021-06-01',
    },
    {
      name: 'Pullups',
      duration: '10',
      date: '2021-06-01',
    },
    {
      name: 'Squats',
      duration: '10',
      date: '2021-06-01',
    },
    {
      name: 'Deadlifts',
      duration: '10',
      date: '2021-06-01',
    },
    {
      name: 'Bench Press',
      duration: '10',
      date: '2021-06-01',
    },
    
]
  
  export default function ListsWork() {
    return (
      <ul role="list" className="divide-y divide-gray-100">
        {Work.map((work) => (
          <li
          key={work.name}
          className="mt-3 mb-3 flex justify-between gap-x-6 py-5 px-4 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-md "
          
        >
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {work.name}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{work.duration}</p>
            <p className="mt-1 text-sm leading-5 text-gray-500">{work.date}</p>
          </div>
        </li>
        ))}
      </ul>
    )
  }