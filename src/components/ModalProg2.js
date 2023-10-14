import { Fragment, useRef, useState,useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { AuthContext } from '../shared/context/auth-context';
import { useHttpClient } from '../shared/components/hooks/http-hook';
export default function ModalProg2(props) {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [duration,setDuration]=useState('');
    const handleDurationChange = (e) => {
        setDuration(e.target.value)
        console.log(duration)
    }
    const handleAdd = async() => {
      try {
        const responseData = await sendRequest(
            "http://localhost:8000/api/functional/setProgress",
            "POST",
            JSON.stringify({
                email: auth.userId,
                current: duration,
                
            }),
            {
                "Content-Type": "application/json"
            }
        )
        console.log(responseData);
        props.refresh();
    }
    catch(err) {
        console.log(err);
    }
        props.setOpen1(false)
    }

  return (

    <Transition.Root show={props.open1} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={props.cancelButtonRef1} onClose={props.setOpen1}>
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
                         Add the details of your goals
                      </Dialog.Title>
                      <div className="mt-2">
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mt-4">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      name="duration"
                      id="duration"
                      value={duration}
                      onChange={handleDurationChange}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter duration in minutes"
                    />
                    <div className="absolute right-0 top-0 mt-2 mr-2">
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                        />
                        <path
                            fillRule="evenodd"
                            d="M10 0a10 10 0 100 20 10 10 0 000-20zM9 18a1 1 0 112 0v-7.414l3.293 3.293a1 1 0 001.414-1.414l-4-4a1 1 0 00-1.414 0l-4 4a1 1 0 001.414 1.414L9 10.586v7.414z"
                            clipRule="evenodd"
                        />
                        </svg>
                    </div>
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
                    onClick={() => props.setOpen1(false)}
                    ref={props.cancelButtonRef1}
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