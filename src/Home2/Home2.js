import {React, useContext, useEffect, useState} from 'react';
import Navbar from '../components/navbar';
import { AuthContext } from '../shared/context/auth-context';
import { useHttpClient } from '../shared/components/hooks/http-hook';


import './Home2.css';


const Home2 = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [ loadedUser, setLoadedUser ] = useState([]);
  const [ extra, setExtra ] = useState([]);
    const auth = useContext(AuthContext);
    console.log(auth.userId);
    
    
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const responseData = await sendRequest(
            `http://localhost:8000/api/functional/${auth.userId}`
          );
          setLoadedUser(responseData.user);
          console.log(responseData.user);
        } catch (err) {
          console.log(err);
        }
        try {
          const responseData = await sendRequest(
            `http://localhost:8000/api/functional/${auth.userId}/health-metrics`
          );
          setExtra(responseData.health_metrics[0]);
          console.log(responseData.health_metrics[0]);
        } catch (err) {
          console.log(err);
        }
      }
       
      fetchUser();
      
    }
    , []);
    // console.log(loadedUser);

    return (
        <div>
        <Navbar />
        <div className="pg bg-orange-900/90"style={{ borderRadius: '16px' }}>
        <div className="flex justify-center items-start overflow-hidden">
        <img
          className="h-40 w-40 rounded-full ring-2 ring-white mt-20"
          src={
            'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
          alt="Patient image"
        />
        </div>
        <div className="ml-5 mr-5 mt-5 mb-5 shadow-lg rounded-lg overflow-hidden p-4 ">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 headtext texts">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 texts2">{loadedUser.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 headtext texts">Sex</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 texts2">Female</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 headtext texts">Age</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 texts2">20</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 headtext texts">Height</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 texts2">{extra.height} ft</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 headtext texts">Weight</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 texts2">{extra.weight} kg</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 headtext texts">Email address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 texts2">{loadedUser.email}</dd>
          </div>
          </dl>
        </div>
        <div className="flex justify-center">
    
      </div>
    </div>
    </div>
    )
};

export default Home2;