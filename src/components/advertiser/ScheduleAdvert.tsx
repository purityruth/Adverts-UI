import React, { useState, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useGetSceduleAdvertQuery, useSceduleAdvertMutation } from '../api/apiSlice';
import { Advert } from '../type';

interface ScheduleAdvertProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (formData: ScheduleFormData) => void;
}

export interface ScheduleFormData {
  slot: string;
  no_of_matatus: string;
  route: string;
  advert: string;
  pricing_plan: string
  location: string
  matatus: string;
  restaurants: string
  platform: string
  automated_scheduling: boolean
}

const ScheduleAdvert: React.FC<ScheduleAdvertProps> = ({ isOpen, onClose }) => {
  const [slot, setSlot] = useState<string>('');
  const [no_of_matatus, setNo_of_matatus] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [scheduleAdvert] = useSceduleAdvertMutation();
  const [route, setRoute] = useState<string>('');
  const [advert, setAdvert] = useState<string>('');
  const [pricing_plan, setPricing_plan] = useState<string>('');
  const [location, setLocation] = useState<string>(''); // State to store the selected location
  const [matatus, setMatatus] = useState <string>(''); // State to store selected matatus
  const [restaurants, setRestaurants] = useState<string>('');
  const [platform, setPlatform] = useState<string>('');
  const [automated_scheduling, setAutomated_scheduling] = useState<boolean>(false);

  // Fetch the list of available adverts using useGetSceduleAdvertQuery
  const { data: advertsData, isLoading, isError } = useGetSceduleAdvertQuery([]);
  useEffect(() => {
    if (isLoading) {
      // todo show a loading spinner
    } else if (isError) {
      // todo show an error message
    }
  }, [isLoading, isError]);

  const onSubmit: SubmitHandler<ScheduleFormData> = async (data) => {
    const totalscheduleSize = 100;
    let scheduleedSize = 0;
    const scheduleInterval = setInterval(() => {
      if (scheduleedSize >= totalscheduleSize) {
        clearInterval(scheduleInterval);
        setProgress(100);
        setTimeout(() => {
          setProgress(0);
        }, 3000);
      } else {
        scheduleedSize += 1;
        const newProgress = (scheduleedSize / totalscheduleSize) * 100;
        setProgress(newProgress);
      }
    }, 200);

    try {
      // Include route and advert in your formData
      const formData = new FormData();
      formData.append('slot', data.slot);
      formData.append('no_of_matatus', data.no_of_matatus);
      formData.append('advert', data.advert);
      formData.append('route', data.route);
      formData.append('pricing_plan', data.pricing_plan);
      formData.append('matatus', data.matatus);
      formData.append('location', data.location);
      formData.append('restaurants', data.restaurants);
      formData.append('automated_scheduling', data.automated_scheduling.toString());
      formData.append('platform', data.platform);

console.log(formData)
      const createResponse = await scheduleAdvert(formData);
      console.log('Schedule Advert Response:', createResponse);

      setTimeout(() => {
        clearInterval(scheduleInterval);
        setProgress(100);
      }, 3000);

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleScheduleClick = () => {
    onSubmit({ slot, no_of_matatus, route, advert, pricing_plan, location, matatus, restaurants, platform, automated_scheduling });
  };

  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlatform(e.target.value);
  };

  const handleSchedulingTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAutomated_scheduling(e.target.value === 'true');
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
        onClick={onClose}
      ></div>
      <div className="modal-container rounded-3xl bg-white w-96 md:w-1/2 mx-auto shadow-lg z-50">
        <div
          className="modal-content p-4 text-center justify-center items-center"
          onClick={handleModalClick}
        >
          <h2 className="text-2xl font-semibold mb-4">Schedule Advert</h2>
          <div className="mb-4">
            <select
              id="advert"
              className="w-full px-3 py-2 border-none bg-gray-100 rounded-2xl focus:bg-white focus:border-orange-500"
              value={advert}
              onChange={(e) => setAdvert(e.target.value)}
            >
              <option value="">Select Advert</option>
              {advertsData?.adverts.map((advert: Advert) => (
                <option key={advert.id} value={advert.id}>
                  {advert.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <select
              id="Platfrom"
              className="w-full px-3 py-2 border-none bg-gray-100 rounded-2xl focus:bg-white focus:border-orange-500"
              value={platform}
              onChange={handlePlatformChange}
            >
              <option value="">Select Type</option>
              <option value="matatu">Matatu</option>
              <option value="restaurant">Restaurant</option>
            </select>
          </div>
          {platform === 'matatu' && (
            <div>
              <div className="mb-4">
                <select
                  id="route"
                  className="w-full px-3 py-2 border-none bg-gray-100 rounded-2xl focus-bg-white focus-border-orange-500"
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                >
                  <option value="">Select Route</option>
                  {advertsData?.routes.map((route: Advert) => (
                    <option key={route.id} value={route.id}>
                      {route.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                {/* Display matatus select options here */}
                <select
                  id="matatu"
                  className="w-full px-3 py-2 border-none bg-gray-100 rounded-2xl focus-bg-white focus-border-orange-500"
                  value={automated_scheduling ? 'true' : 'false'}
                  onChange={handleSchedulingTypeChange}
                >
                  <option selected value="">Select Schedule Type</option>
                  <option value='true'>automated</option>
                  <option value='false'>manual</option>
                </select>
              </div>
              {automated_scheduling && platform === 'matatu' ? (
                <>
                  <div>
                    <div className="mb-4">
                      <input
                        type="number"
                        id="number of matatus"
                        className="w-full px-3 py-2 rounded-2xl border-none bg-gray-100 focus-bg-white focus-border-none"
                        placeholder="Number of matatus"
                        value={no_of_matatus}
                        onChange={(e) => setNo_of_matatus(e.target.value)} />
                    </div>
                  </div>
                  
                </>
          ) : (
                  <div className="mb-4">
                    {/* Display matatus select options here */}
                    <select
                      id="matatu"
                      className="w-full px-3 py-2 border-none bg-gray-100 rounded-2xl focus-bg-white focus-border-orange-500"
                      value={matatus}
                      onChange={(e) => setMatatus(e.target.value)}
                    >
                      <option value="">Select Matatu</option>
                      {advertsData?.matatus.map((matatu: Advert) => (
                        <option key={matatu.id} value={matatu.id}>
                          {matatu.name}
                        </option>
                      ))}
                    </select>
                  </div>
          )}
        </div>
          )}
        {automated_scheduling && platform === 'restaurant' ? (
          <>
            <div className="mb-4">
              {/* Display restaurant select options here */}
              <select
                id="restaurant"
                className="w-full px-3 py-2 border-none bg-gray-100 rounded-2xl focus:bg-white focus:border-orange-500"
                value={restaurants}
                onChange={(e) => setRestaurants(e.target.value)}

              >
                <option value="">Select Restaurant</option>
                {advertsData?.restraunts.map((rest: Advert) => (
                  <option key={rest.id} value={rest.id}>
                    {rest.name}
                  </option>
                ))}
              </select>
            </div><div className="mb-4">
              <input
                type="number"
                id="number of restaurant"
                className="w-full px-3 py-2 rounded-2xl border-none bg-gray-100 focus:bg-white focus:border-none"
                placeholder="number of restaurant"
              // value={title}
              // onChange={(e) => setTitle(e.target.value)} 
              />
            </div>
            <div className="mb-4">
              <select
                id="route"
                className="w-full px-3 py-2 border-none bg-gray-100 rounded-2xl focus:bg-white focus:border-orange-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Select Location</option>
                {advertsData?.locations.map((loc: Advert) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : null}
        <div className="mb-4">
          <select
            id="slot"
            className="w-full px-3 py-2 border-none bg-gray-100 rounded-2xl focus:bg-white focus:border-orange-500"
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
          >
            <option value="">Select Slot</option>
            {advertsData?.slots.map((slot: Advert) => (
              <option key={slot.id} value={slot.id}>
                {slot.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <select
            id="slot"
            className="w-full px-3 py-2 border-none bg-gray-100 rounded-2xl focus:bg-white focus:border-orange-500"
            value={pricing_plan}
            onChange={(e) => setPricing_plan(e.target.value)}
          >
            <option value="">Select Plan</option>
            {advertsData?.pricing_plans.map((plan: Advert) => (
              <option key={plan.id} value={plan.id}>
                {plan.name} - Popup: {plan.popup_price}, Scroll: {plan.scroll_price} Squeezeback: {plan.squeezeback_price} Video: {plan.video_price}
              </option>
            ))}
          </select>
        </div>
        <button
          className="mt-4 bg-orange-500 w-60 text-white py-2 px-4 rounded-2xl hover:bg-orange-600"
          onClick={handleScheduleClick}
        >
          Schedule Advert
        </button>
        {progress > 0 && (
          <div className="mt-4 relative w-60 h-6 bg-gray-200 rounded-3xl">
            <div
              className="absolute h-full bg-orange-500 rounded-3xl"
              style={{ width: `${progress}%` }}
            >
              <p className="text-center font-bold z-50 text-sm text-gray-700">
                {progress}%
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
    </div >
  );
};

export default ScheduleAdvert;
