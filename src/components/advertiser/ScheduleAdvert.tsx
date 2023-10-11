import React, { useState, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import {
  useSceduleAdvertMutation,
  useGetSceduleAdvertQuery,
} from '../api/apiSlice';

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
  date: string;
}

const ScheduleAdvert: React.FC<ScheduleAdvertProps> = ({ isOpen, onClose }) => {
  const [slot, setSlot] = useState<string>('');
  const [no_of_matatus, setNo_of_matatus] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [scheduleAdvert] = useSceduleAdvertMutation();
  const [route, setRoute] = useState<string>('');
  const [advert, setAdvert] = useState<string>('');
  const [date, setDate] = useState<string>('');

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
      formData.append('date', data.date);

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

  const handlescheduleClick = () => {
    onSubmit({ slot, no_of_matatus, route, date, advert });
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
              {advertsData?.adverts.map((advert: any) => (
                <option key={advert.id} value={advert.id}>
                  {advert.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <select
              id="route"
              className="w-full px-3 py-2 border-none bg-gray-100 rounded-2xl focus:bg-white focus:border-orange-500"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
            >
              <option value="">Select Route</option>
              {advertsData?.routes.map((route: any) => (
                <option key={route.id} value={route.id}>
                  {route.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <p>cost: should be autogenerated based on the advert</p>
          </div>
          <div className="mb-4">
          <select
              id="slot"
              className="w-full px-3 py-2 border-none bg-gray-100 rounded-2xl focus:bg-white focus:border-orange-500"
              value={slot}
              onChange={(e) => setRoute(e.target.value)}
            >
              <option value="">Select Slot</option>
              {advertsData?.slots.map((slot: any) => (
                <option key={slot.id} value={slot.id}>
                  {slot.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <textarea
              id="matatus"
              className="w-full px-3 py-2 border-none bg-gray-100 rounded-2xl focus:bg-white focus:border-orange-500"
              placeholder="Enter matatus"
              value={no_of_matatus}
              onChange={(e) => setNo_of_matatus(e.target.value)}
            ></textarea>
          </div>
          <button
            className="mt-4 bg-orange-500 w-60 text-white py-2 px-4 rounded-2xl hover:bg-orange-600"
            onClick={handlescheduleClick}
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
    </div>
  );
};

export default ScheduleAdvert;
