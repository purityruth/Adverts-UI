
import React from 'react';

const AdvertReport: React.FC = () => {
 
  const date = new Date();

  return (
    <div className='relative overflow-x-auto'>
      <table className='w-full border-collapse'>
        <thead>
          <tr className='text-left bg-gray-200'>
            <th className='px-3 py-2'>No.</th>
            <th className='px-3 py-2'>Advert</th>
            <th className='px-3 py-2'>Type</th>
            <th className='px-3 py-2'>Time Played</th>
            <th className='px-3 py-2'>View</th>
            <th className='px-3 py-2'>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className='text-left'>
            <td className='px-3 py-2'>
              <img
                src="https://picsum.photos/200/300"
                alt=""
                className="w-10 h-10 rounded-full inline-block object-cover"
              />
              <span>Telescope Productis</span>
            </td>
            <td className='px-3 py-2'>
              {date.toDateString() + ', ' + date.toLocaleTimeString()}
            </td>
            <td className='px-3 py-2'>HHGJGI587KF</td>
            <td className='px-3 py-2'>Ksh 2000</td>
            <td className='px-3 py-2'>withdraw</td>
            <td className='px-3 py-2 text-green-600'>Schedule</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdvertReport;
