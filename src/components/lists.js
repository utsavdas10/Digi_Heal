import { Fragment, useRef, useState } from 'react'
const foods = [
    {
      name: 'Breakfast',
      calories: '450',
      date: '2021-09-01',
    },
    {
      name: 'Lunch',
      calories: '600',
      date: '2021-09-01',
    },
    {
      name: 'Dinner',
      calories: '750',
      date: '2021-09-01',
    },
    {
      name: 'Snack',
      calories: '100',
      date: '2021-09-01',
    },
]
  
  export default function Lists() {
    return (
      <ul role="list" className="divide-y divide-gray-100">
        {foods.map((food) => (
          <li
          key={food.name}
          className="mt-3 mb-3 flex justify-between gap-x-6 py-5 px-4 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-md "
          
        >
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {food.name}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{food.calories}</p>
            <p className="mt-1 text-sm leading-5 text-gray-500">{food.date}</p>
          </div>
        </li>
        ))}
      </ul>
    )
  }