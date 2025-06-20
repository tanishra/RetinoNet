import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserHistory = async () => {
      setLoading(true);
      try {
        const data = [
          { id: 1, action: 'Uploaded a new retinal image', date: '2025-05-01' },
          { id: 2, action: 'Predicted Diabetic Retinopathy severity', date: '2025-05-03' },
          { id: 3, action: 'Viewed a report on past predictions', date: '2025-05-04' },
        ];
        setHistoryData(data);
      } catch (error) {
        console.error('Error fetching user history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserHistory();
  }, []);

  return (
    <div className="bg-black min-h-screen relative z-0">
      <div className="container mx-auto px-6 pt-28 pb-6">
        <h1 className="text-3xl font-semibold text-center text-white mb-6">Your History</h1>
        {loading ? (
          <div className="text-center text-lg text-gray-400">Loading...</div>
        ) : (
          <div>
            {historyData.length > 0 ? (
              <ul className="space-y-4">
                {historyData.map((entry) => (
                  <li key={entry.id} className="bg-gray-900 p-4 rounded-lg shadow-md">
                    <strong className="text-xl text-white">{entry.action}</strong>
                    <p className="text-sm text-gray-400 mt-2">{entry.date}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">No history available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
