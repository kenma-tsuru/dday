import { useEffect, useState } from 'react';

interface Props {
  id: string;
  title: string;
  date: string;
  creationDate: string;
  onRemove: (id: string) => void;
}

export default function DashboardItem({ id, title, date, creationDate, onRemove }: Props) {
  const [daysLeft, setDaysLeft] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateDaysAndProgress = () => {
      const today = new Date();
      const eventDate = new Date(date);
      const creationDateObj = new Date(creationDate);
      
      const totalDays = Math.ceil((eventDate.getTime() - creationDateObj.getTime()) / (1000 * 3600 * 24));
      const daysElapsed = Math.ceil((today.getTime() - creationDateObj.getTime()) / (1000 * 3600 * 24));
      
      const daysDiff = Math.max(0, Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 3600 * 24)));
      setDaysLeft(daysDiff);

      // Calculate progress: 0% when just added, 100% when reaching the date
      const progressPercentage = Math.min(100, Math.max(0, (daysElapsed / totalDays) * 100));
      setProgress(progressPercentage);
    };

    calculateDaysAndProgress();
    const timer = setInterval(calculateDaysAndProgress, 86400000); // Update every 24 hours

    return () => clearInterval(timer);
  }, [date, creationDate]);

  return (
    <div className="mb-4 p-4 border rounded relative">
      <button 
        onClick={() => onRemove(id)} 
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
      >
        ×
      </button>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mb-2">Date: {date}</p>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
              Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-blue-600">
              {daysLeft} days left
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
          <div 
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
          ></div>
        </div>
      </div>
    </div>
  );
}
