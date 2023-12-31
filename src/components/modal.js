import { Fragment, useRef, useState,useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { AuthContext } from '../shared/context/auth-context';
import { useHttpClient } from '../shared/components/hooks/http-hook';
export default function Modal(props) {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [name, setName] = useState('')
    const [calories, setCalories] = useState('')
    const [refresh, setRefresh] = useState(0)
    const [date, setDate] = useState('')
    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleCaloriesChange = (e) => {
        setCalories(e.target.value)
        console.log(calories)
    }
    const handleDateChange = (e) => {
        setDate(e.target.value)
        console.log(date)
    }
    const handleAdd = async() => {
      try {
        const responseData = await sendRequest(
            "http://localhost:8000/api/functional/nutrition-data",
            "POST",
            JSON.stringify({
                email: auth.userId,
                food: name,
                calories: calories,
                date_time: date
                
            }),
            {
                "Content-Type": "application/json"
            }
        )
        console.log(responseData);
        setRefresh(refresh+1)
        localStorage.setItem('refresh', refresh);

    }
    catch(err) {
        console.log(err);
    }
        props.setOpen(false)
    }

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={props.cancelButtonRef} onClose={props.setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                         Add the details of your meal
                      </Dialog.Title>
                      <div className="mt-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleNameChange}
                        value={name}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter name"
                    />
                    <label htmlFor="calories" className="block text-sm font-medium text-gray-700 mt-4">
                        Calories
                    </label>
                    <input
                        type="text"
                        name="calories"
                        id="calories"
                        value={calories}
                        onChange={handleCaloriesChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter calories"
                    />
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mt-4">
                        Date
                    </label>
                    <input
                        type="datetime-local"
                        name="date"
                        id="date"
                        onChange={handleDateChange}
                        value={date}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter date"
                    />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={handleAdd}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => props.setOpen(false)}
                    ref={props.cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}