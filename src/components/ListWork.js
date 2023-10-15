import { Fragment, useRef, useState,useEffect,useContext } from 'react'
import { AuthContext } from '../shared/context/auth-context';
import { useHttpClient } from '../shared/components/hooks/http-hook';

  export default function ListsWork() {
    const storedRefresh = localStorage.getItem('refresh1');
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [workout, setWorkout] = useState([]);
    useEffect(() => {
      const fetchWork = async () => {
        try {
          const responseData = await sendRequest(
            `http://localhost:8000/api/functional/${auth.userId}/workout-data`
          );
          setWorkout  (responseData.workout_data);
        
          console.log(responseData.workout_data[0]);
        } catch (err) {}
      }
      fetchWork();
    }
    , [storedRefresh]);
    return (
      <ul role="list" className="divide-y divide-gray-100">
        {workout.map((work) => (
          <li
          key={work.type}
          className="mt-3 mb-3 flex justify-between gap-x-6 py-5 px-4 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-md "
          
        >
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {work.type}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{work.duration}</p>
            <p className="mt-1 text-sm leading-5 text-gray-500">{new Date(work.date).toLocaleDateString()}</p>
          </div>
        </li>
        ))}
      </ul>
    )
  }