import {React, useEffect, useState, useContext} from 'react';
import Navbar from '../components/navbar';
import height from "./height.png"
import weight from "./weight.png"
import blood_pressure from "./blood_pressure.png"
import cholesterol from "./cholesterol.png"
import { AuthContext } from '../shared/context/auth-context';
import { useHttpClient } from '../shared/components/hooks/http-hook';
import "./Metrics.css"
const features = [
    { id:0 ,name: 'Height', description: 'Designed by Good Goods, Inc.' },
    { id:1 ,name: 'Weight', description: 'Solid walnut base with rare earth magnets and powder coated steel card cover' },
    { id:2 ,name: 'Blood Pressure', description: '6.25" x 3.55" x 1.15"' },
    { id:3,name: 'Cholesterol', description: 'Hand sanded and finished with natural oil' },
  ]
const Metrics = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [ metrics, setMetrics ] = useState({});
    const [expanded, setExpanded] = useState(false);
    const handleImageClick = (id) => {
      setExpanded((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
    };

    useEffect(() => {
      const fetchMetrics = async () => {
        try {
          const responseData = await sendRequest(
            `http://localhost:8000/api/functional/${auth.userId}/health-metrics`
          );
          setMetrics(responseData.health_metrics[0]);
          console.log(metrics);
        } catch (err) {}
      }
      fetchMetrics();
    }
    , [sendRequest, auth.userId]);

    return (
      <div>
      <Navbar />
      <div className="card ml-20 mr-20 mt-10 mb-20 home-card relative isolate overflow-hidden bg-orange-900/90 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div className=''>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-7xl">Metrics</h2>
            <p className="mt-4 text-white">
              Tap on the images to learn more about the metrics we track.
              
            </p>

            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              <div
                key={features[0].name}
                className={`border-t border-white-200 pt-4 ${
                  expanded[0] ? 'block' : 'hidden'
                }`}
                style={{
                  backgroundColor: '#d38d78',
                  borderRadius: '0.5rem',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  padding: '1rem',
                }}
              >
                <dt
                  className="font-medium text-white-900 cursor-pointer"
                  onClick={() => handleImageClick(0)}
                >
                  {features[0].name}
                </dt>
                <dd className="mt-2 text-sm text-white-500">
                  {features[0].description}
                </dd>
              </div>
              <div
                key={features[1].name}
                className={`border-t border-white-200 pt-4 ${
                  expanded[1] ? 'block' : 'hidden'
                }`}
                style={{
                  backgroundColor: '#d38d78',
                  borderRadius: '0.5rem',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  padding: '1rem',
                }}
              >
                <dt
                  className="font-medium text-white-900 cursor-pointer"
                  onClick={() => handleImageClick(1)}
                >
                  {features[1].name}
                </dt>
                <dd className="mt-2 text-sm text-white-500">
                  {features[1].description}
                </dd>
              </div>
              <div
                key={features[2].name}
                className={`border-t border-white-200 pt-4 ${
                  expanded[2] ? 'block' : 'hidden'
                }`}
                style={{
                  backgroundColor: '#d38d78',
                  borderRadius: '0.5rem',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  padding: '1rem',
                }}
              >
                <dt
                  className="font-medium text-white-900 cursor-pointer"
                  onClick={() => handleImageClick(2)}
                >
                  {features[2].name}
                </dt>
                <dd className="mt-2 text-sm text-white-500">
                  {features[2].description}
                </dd>
              </div>
              <div
                key={features[3].name}
                className={`border-t border-white-200 pt-4 ${
                  expanded[3] ? 'block' : 'hidden'
                }`}
                style={{
                  backgroundColor: '#d38d78',
                  borderRadius: '0.5rem',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  padding: '1rem',
                }}
              >
                <dt
                  className="font-medium text-white-900 cursor-pointer"
                  onClick={() => handleImageClick(3)}
                >
                  {features[3].name}
                </dt>
                <dd className="mt-2 text-sm text-white-500">
                  {features[3].description}
                </dd>
              </div>
            </dl>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            <img
              src={height}
              alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
              className="img_bttn rounded-lg bg-gray-100"
              onClick={() => handleImageClick(0)}
            />
            <img
              src={weight}
              alt="Top down view of walnut card tray with embedded magnets and card groove."
              className="img_bttn rounded-lg bg-gray-100"
              onClick={() => handleImageClick(1)}
            />
            <img
              src={blood_pressure}
              alt="Side of walnut card tray with card groove and recessed card area."
              className="img_bttn rounded-lg bg-gray-100"
              onClick={() => handleImageClick(2)}
            />
            <img
              src={cholesterol}
              alt="Walnut card tray filled with cards and card angled in dedicated groove."
              className="img_bttn rounded-lg bg-gray-100"
              onClick={() => handleImageClick(3)}
            />
          </div>
        </div>
      </div>
    </div>
    );
}
export default Metrics;