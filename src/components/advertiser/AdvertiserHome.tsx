import { useState } from "react";
import UploadAdvertModal from "./UploadAdvertModal";
import { useGetAllAdvertsQuery } from "../api/apiSlice";
import ScheduleAdvert from "./ScheduleAdvert";

const ActionButton = ({ text, onClick }: { text: string; onClick: () => void; children: React.ReactNode }) => (
    <button className=" flex items-center bg-orange-600 hover:bg-orange-400 px-4 py-1 h-10 rounded-2xl" onClick={onClick}>
        <span className='text-white  font-bold'>{text}</span>
    </button>
);

const ScheduleButton = ({ text, onClick }: { text: string; onClick: () => void; children: React.ReactNode }) => (
    <button className=" flex items-center bg-orange-600 hover:bg-orange-400  p-1 h-6 rounded-lg" onClick={onClick}>
        <span className='text-white'>{text}</span>
    </button>
);

const StatItem = ({ text, children, currentPrice, lastPrice }: { text: string; currentPrice: number; lastPrice: number; children: React.ReactNode }) => {
    const priceDifference = currentPrice - lastPrice;
    const isPriceRise = priceDifference > 0;
    const isPriceDrop = priceDifference < 0;

    return (
        <div className='border py-3 m-2 px-2 rounded-lg w-48 h-28 border-b-gray-200'>
            <p className='text-lg text-slate-600 my-1'>{text}</p>
            <h2 className={`text-xl font-bold ${isPriceRise ? 'text-green-400' : isPriceDrop ? 'text-red-500' : 'text-black'} my-1`}>
                {currentPrice}
            </h2>
            <p className='text-sm text-slate-600 my-1'>
                {children}
            </p>
        </div>
    );
};



const date = new Date('12/12/2021');
function AdvertiserHome() {
    const [isUploadModalOpen, setUploadModalOpen] = useState<boolean>(false);
    const [isScheduleModalOpen, setScheduleModalOpen] = useState<boolean>(false);
    const { data: allAdverts } = useGetAllAdvertsQuery([])

    const handleUploadAdvertClick = () => {
        setUploadModalOpen(true);
    };

    const handleScheduleClick = () => {
        setScheduleModalOpen(true);
    };

    const handleCloseModal = () => {
        setUploadModalOpen(false);
        setScheduleModalOpen(false);
    };


    const handleUpload = (formData: FormData) => {
        console.log('Uploading content...', formData);
        handleCloseModal();
    };
    return (
        <div className="mt-8 h-full">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl text-text-primary font-bold">My Adverts</h2>
            </div>
            <div className='bg-white w-full rounded-xl h-full mx-2 px-2'>
                <div className='my-2'>
                    <div className='flex p-2 items-center justify-between'>
                        <h2 className='text-xl font-bold text-black'>Statistics</h2>
                        <select id="countries" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-text-primary focus:border-text-primary  dark:bg-gray-700 dark:border-text-primary dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Last 30 days</option>
                            <option value="US">Last One week</option>
                            <option value="CA">Ngara road</option>
                        </select>
                    </div>
                    <div className='flex items-center'>
                        <StatItem text='Total Advert' currentPrice={250000} lastPrice={240000}>
                            {/* ... */}
                        </StatItem>
                        <StatItem text='Total Advert Report' currentPrice={19000} lastPrice={220000}>
                            {/* ... */}
                        </StatItem>
                        <StatItem text='Active Advert' currentPrice={16000} lastPrice={15000}>
                            {/* ... */}
                        </StatItem>
                        <StatItem text='Inactive Advert' currentPrice={16000} lastPrice={15000}>
                            {/* ... */}
                        </StatItem>
                    </div>
                </div>
                <div className='my-2'>
                    <h2 className='text-xl font-bold text-black'>Adverts</h2>
                    <div className='bg-gray-200'>
                    </div>
                </div>
                <div className='my-2 rounded-lg w-4/5 bg-gray-100'>
                    <div className='border-b my-9 border-slate-400 p-2'>
                        <div className='mt-4 flex justify-between items-center'>
                            <div className="mt-4">
                                <h2 className='text-xl font-bold mx-3 text-black'>Transaction History</h2>
                                <p className='mx-3 mb-3 text-sm text-slate-400'>History of last 3 month</p>
                            </div>
                            <ActionButton text='Add advert' onClick={handleUploadAdvertClick}>
                                Add Advert
                            </ActionButton>
                        </div>
                    </div>
                    <div className='relative overflow-x-auto'>
                        <table className='w-full border-collapse'>
                            <thead>
                                <tr className='text-left bg-gray-200'>
                                    <th className='px-3 py-2'>Name</th>
                                    <th className='px-3 py-2'>Date</th>
                                    <th className='px-3 py-2'>Transaction ID</th>
                                    <th className='px-3 py-2'>Quantity</th>
                                    <th className='px-3 py-2'>Type</th>
                                    <th className='px-3 py-2'>Status</th>
                                    <th className="px-3 py-2">Schedule</th>
                                </tr>
                            </thead>
                            {
                                allAdverts && allAdverts.map((advert: any) => (
                                    <tbody>
                                        <tr className='text-left'>
                                            <td className='px-3 py-2'>
                                                <img src="https://picsum.photos/200/300" alt="" className="w-10 h-10 rounded-full inline-block object-cover" />
                                                <span>{advert.title}</span>
                                            </td>
                                            <td className='px-3 py-2'>
                                                {new Date(advert.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                            </td>
                                            <td className='px-3 py-2'>
                                                {advert && advert.is_active ? 'active' : 'in active'}
                                            </td>
                                            <td className='px-3 py-2'>{advert.duration}</td>
                                            <td className='px-3 py-2'>{advert.type}</td>
                                            <td className='px-3 py-2 text-green-600'>
                                                {advert && advert.is_approved ? 'approved' : 'in progress'}
                                            </td>
                                            <td>
                                                <ScheduleButton text='schedule' onClick={handleScheduleClick}>
                                                    Schedule
                                                </ScheduleButton>
                                            </td>
                                        </tr>
                                        {/* Add more rows as needed */}
                                    </tbody>
                                ))
                            }
                            <tbody>
                                <tr className='text-left'>
                                    <td className='px-3 py-2'>
                                        <img src="https://picsum.photos/200/300" alt="" className="w-10 h-10 rounded-full inline-block object-cover" />
                                        <span>Telescope Productis</span>
                                    </td>
                                    <td className='px-3 py-2'>{date.toDateString() + ',' + date.toLocaleTimeString()}</td>
                                    <td className='px-3 py-2'>HHGJGI587KF</td>
                                    <td className='px-3 py-2'>Ksh 2000</td>
                                    <td className='px-3 py-2'>withdraw</td>
                                    <td className='px-3 py-2 text-green-600'>Success</td>
                                    <td>
                                        <ScheduleButton text='schedule' onClick={handleScheduleClick}>
                                            Schedule
                                        </ScheduleButton>
                                    </td>
                                </tr>
                                {/* Add more rows as needed */}
                            </tbody>
                        </table>

                    </div>
                </div>
                <UploadAdvertModal isOpen={isUploadModalOpen} onClose={handleCloseModal} onUpload={handleUpload} />
                <ScheduleAdvert isOpen={isScheduleModalOpen} onClose={handleCloseModal} onUpload={handleUpload} />
            </div>
        </div>
    );
}

export default AdvertiserHome;