import React from "react";
import { Fragment, useState,useRef } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import nutrition from "./nutrition.png"
import "./Nutritions.css"
import Modal from "../components/modal";
import Lists from "../components/lists";
const Nutritions = () => {
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const handleAdd = () => {
        setOpen(true)
    }
    return (
        <div>
            <Navbar />
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
                Tell us what you ate today.
                <br />
                We'll take care of the rest.
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Add all the details of your meal below
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <div className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                onClick={handleAdd}>
                   Add Meal
                   <Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}/>
                </div>
              </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8">
              <img
                className="img absolute left-auto top-0  max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                src={nutrition}
                alt="App screenshot"
                width={1824}
                height={1080}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="list">
      <Lists />
      </div>
        </div>

    );
}

export default Nutritions;
// name, cal,date,time