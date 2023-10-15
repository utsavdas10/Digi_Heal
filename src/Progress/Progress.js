import React from "react";
import { Fragment, useState,useRef, useContext, useEffect  } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import "./Progress.css"
import ModalProg from "../components/ModalProg";
import ModalProg2 from "../components/ModalProg2";
import VisibilitySensor from "react-visibility-sensor";
// import ListsWork from "../components/ListWork";
import progress from "./Progress.png"
import { AuthContext } from '../shared/context/auth-context';
import { useHttpClient } from '../shared/components/hooks/http-hook';
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// const stats = [
//   { id: 1, name: 'Total Goal' },
//   { id: 2, name: 'Current Progress' },
//   { id: 3, name: 'Remaining Goal' },
// ]
const Progress = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const [percentage, setPercentage] = useState(0)
    const handleAdd = () => {
        setOpen(true)
    }
    const [open1, setOpen1] = useState(false)
    const cancelButtonRef1 = useRef(null)
    const handleAdd1 = () => {
        setOpen1(true)
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
          const responseData = await sendRequest(
            `http://localhost:8000/api/functional/${auth.userId}/progress`
          );
          setData(responseData.progress[0]);
          setPercentage((responseData.progress[0].current/responseData.progress[0].goal)*100);
        } catch (err) {}
      }
      fetchData();
    }
    , [sendRequest]);

    const refresh = () => {
      const fetchData = async () => {
        try {
          const responseData = await sendRequest(
            `http://localhost:8000/api/functional/${auth.userId}/progress`
          );
          setData(responseData.progress[0]);
          setPercentage((responseData.progress[0].current/responseData.progress[0].goal)*100);
        } catch (err) {}
      }
      fetchData();
      
    }
    const stats = [
      { id: 1, name: 'Total Goal' , value: data.goal},
      { id: 2, name: 'Current Progress', value: data.current },
      { id: 3, name: 'Remaining Goal', value: data.remaining_goal },
    ];

  return (
    <div>
        <Navbar/>
        <div className="mt-20">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-10 lg:px-8">
          <div className="home-card relative isolate overflow-hidden bg-orange-900/90 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
              aria-hidden="true"
            >
              <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#FFA500" />
                  <stop offset={1} stopColor="#FF8C00" />
                </radialGradient>
              </defs>
            </svg>
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Set your goals.
                <br />
                And keep track of your progress.
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Making it easier for you to achieve your goals.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <div className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                onClick={handleAdd}>
                   Add Goal
                   <ModalProg open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}/>
                </div>
              </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8">
              <img
                className="img absolute left-auto top-0  max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                src={progress}
                alt="App screenshot"
                width={1824}
                height={1080}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden mt-3 ml-20 mr-20 mb-10">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Check your goal progress
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Add your goal progress and keep track of it.
            </p>
          </div>
          <div>
            <div className="mt-10">
              
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div className="curprog overflow-hidden h-32 w-32 mb-4 flex rounded-full ">
                  
                      <VisibilitySensor>
                    {({ isVisible }) => { 
                      const per = isVisible ? percentage : 0;
                      return (
                        <CircularProgressbar
                        className="mt-8 mb-8 ml-8 mr-8"
                          value={per}
                          strokeWidth={13}
                          styles={buildStyles({
                            pathColor: '#783108',
                            trailWidth: 8,
                            trailColor: '#ffb38a',
                            strokeLinecap: 'round',
                            pathTransitionDuration: 0.5,
                          })}

                        >
                        </CircularProgressbar>
                      );
                    }}
                  </VisibilitySensor>
                    </div>
                    </div>
                    
            
                  </div>
                </div>
              </div>
              <div  className="inline-block rounded-md border border-transparent bg-orange-900/90 px-8 py-3 text-center font-medium text-white hover:bg-orange-700"
              onClick={handleAdd1}>
              Update Current Progress
              <ModalProg2 open1={open1} setOpen1={setOpen1} cancelButtonRef1={cancelButtonRef1} refresh = {refresh}/>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  <div className=" py-24 sm:py-32">
      <div className=" mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3 ">
          {stats.map((stat) => (
            <div key={data.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
              <dd
                className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl hover:text-7xl transition-all duration-300"
                style={{ transitionProperty: 'font-size' }}
              >
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
    </div>
  );
};

export default Progress;