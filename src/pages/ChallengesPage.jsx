import React, { useEffect, useState } from 'react';
import Challenge from '../components/challenge';
import SkeletonChallengeCard from '../components/SkeletonChallengeCard';

const ChallengesPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minParticipants, setMinParticipants] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');

  const filterChallenges = async (filterQuery) => {
      const res = await fetch(`https://ass-10-sigma.vercel.app/api/challenges/filter${filterQuery}`);
      const data = await res.json();
      setChallenges(data);
      setLoading(false)
  };

  useEffect(() => {
    filterChallenges("");
  }, []);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (category) params.append('category', category);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (minParticipants) params.append('minParticipants', minParticipants);
    if (maxParticipants) params.append('maxParticipants', maxParticipants);

    filterChallenges(`?${params.toString()}`);
  };

  return (
    <>
      <form onSubmit={handleFilterSubmit} className="mb-6 p-4 flex gap-4">
        <input
          type="text"
          placeholder="Category (comma separated)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        />
       <div className="relative">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded pl-10"
          />
          <span className="absolute left-2 top-2.5 text-gray-400">Start Date</span>
        </div>
        <div className="relative">
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded pl-10"
          />
          <span className="absolute left-2 top-2.5 text-gray-400">End Date</span>
        </div>
        <input
          type="number"
          placeholder="Min Participants"
          value={minParticipants}
          onChange={(e) => setMinParticipants(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Max Participants"
          value={maxParticipants}
          onChange={(e) => setMaxParticipants(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Filter
        </button>
      </form>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {challenges.length > 0
          ? challenges.map((challenge) => <Challenge key={challenge._id} challenge={challenge} />)
          : Array.from({ length: 4 }).map((_, index) => <SkeletonChallengeCard key={index} />)}
      </div>
    </>
  );
};

export default ChallengesPage;
