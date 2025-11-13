import React, { useEffect, useState } from 'react';
import Challenge from '../components/challenge';
import SkeletonChallengeCard from '../components/SkeletonChallengeCard';
import Spinner from '../components/Spinner';


const ChallengesPage = () => {
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);


   useEffect(() => {
       Promise.all([
         fetch("https://ass-10-sigma.vercel.app/challenges").then(res => res.json()),
       ])
         .then(([data]) => {
           setChallenges(data)
         })
         .finally(() => setLoading(false));
     }, []);
if (loading) return <Spinner/>
    return (
    <>
  
    <div className="grid grid-cols-3 gap-3">
        {challenges.length > 0
        ? challenges.map((challenge) => (
            <Challenge key={challenge._id} challenge={challenge} />
          ))
        :
          Array.from({ length: 4 }).map((index) => (
            <SkeletonChallengeCard key={index} />
          ))}
      </div>
      </>
        
    );
};

export default ChallengesPage;